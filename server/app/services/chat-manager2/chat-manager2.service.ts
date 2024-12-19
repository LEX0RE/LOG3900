import { DATABASE_COLLECTION_CHAT } from '@app/constants/database';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { DatabaseService } from '@app/services/database/database.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { CREATE_CHAT, DELETE_CHAT, JOIN_CHAT, LEAVE_CHAT, MESSAGE, NEED_CHAT } from '@common/constants/communication';
import { GAME_USER } from '@common/constants/game-user';
import { AllChat } from '@common/interfaces/chat/all-chat';
import { Chat } from '@common/interfaces/chat/chat';
import { ChatName } from '@common/interfaces/chat/chat-name';
import { ClientPushMessage } from '@common/interfaces/chat/client-push-message';
import { ChatDatabase } from '@common/interfaces/chat/database-chat';
import { DEFAULT_CHAT } from '@common/interfaces/chat/default-chat';
import { MessageFromChat } from '@common/interfaces/chat/messages';
import { ServerMessage } from '@common/interfaces/chat/server-message';
import { User } from '@common/interfaces/user/user';
import { Collection, WithId } from 'mongodb';
import { Container, Service } from 'typedi';

@Service()
export class ChatManager2 {
    private socketManager: SocketManager;
    private databaseService: DatabaseService;
    private databaseCollection: string;
    private usersManager: UsersManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.databaseService = Container.get(DatabaseService);
        this.databaseCollection = DATABASE_COLLECTION_CHAT;
        this.usersManager = Container.get(UsersManager);
        this.configureSocket();
    }

    get collection(): Collection<ChatDatabase> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    async createChatForGame(chatName: string, creator: User): Promise<string> {
        const chat: ChatDatabase = {
            name: chatName,
            serverMessage: [],
            creator: GAME_USER,
            userIdJoined: [creator.id],
            id: '',
        };

        const chatId = await this.collection.insertOne(chat);

        await this.collection.updateOne({ _id: chatId.insertedId }, { $set: { id: chatId.insertedId.toString() } });

        chat.id = chatId.insertedId.toString();

        this.socketManager.sendPrivate(JOIN_CHAT, creator.id, chat);

        return chatId.insertedId.toString();
    }

    async createChatForGameInTournament(chatName: string, players: string[]): Promise<string> {
        const chat: ChatDatabase = {
            name: chatName,
            serverMessage: [],
            creator: GAME_USER,
            userIdJoined: players,
            id: '',
        };

        const chatId = await this.collection.insertOne(chat);

        await this.collection.updateOne({ _id: chatId.insertedId }, { $set: { id: chatId.insertedId.toString() } });

        chat.id = chatId.insertedId.toString();

        players.map(async (playerId) => this.socketManager.sendPrivate(JOIN_CHAT, playerId, chat));

        return chatId.insertedId.toString();
    }

    async joinChat(user: User, chatId: string): Promise<void> {
        const chat = await this.getChat(chatId);

        if (!chat) return;

        chat.userIdJoined.push(user.id);
        this.updateUserIdJoined(chatId, chat.userIdJoined);
        this.socketManager.sendPrivate(JOIN_CHAT, user.id, chat);
    }

    async leaveChat(user: User, chatId: string): Promise<void> {
        const chat = await this.getChat(chatId);

        if (!chat) return;
        const index = chat.userIdJoined.indexOf(user.id);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (index !== INDEX_NOT_FOUND) {
            chat.userIdJoined.splice(index, 1);
            this.updateUserIdJoined(chatId, chat.userIdJoined);
            const otherChat: ChatName = { name: chat.name, id: chat.id, creator: chat.creator };

            this.socketManager.sendPrivate(LEAVE_CHAT, user.id, otherChat);
        }
    }

    async deleteChat(chatId: string): Promise<void> {
        await this.collection.deleteOne({ id: chatId });
        const deleteChat: ChatName = { name: '', id: chatId, creator: { id: '', name: '' } };

        this.socketManager.send(DELETE_CHAT, deleteChat);
    }

    // eslint-disable-next-line max-lines-per-function
    private configureSocket(): void {
        this.socketManager.on(MESSAGE, (user: User) => async (message: ClientPushMessage) => {
            this.handlerOnMessage(user, message);
        });

        this.socketManager.on(CREATE_CHAT, (user: User) => async (chatName: ClientPushMessage) => {
            await this.createChat(chatName.content, user);
        });

        this.socketManager.on(JOIN_CHAT, (user: User) => async (message: ClientPushMessage) => {
            await this.joinChat(user, message.chatId);
        });

        this.socketManager.on(LEAVE_CHAT, (user: User) => async (message: ClientPushMessage) => {
            await this.leaveChat(user, message.chatId);
        });

        this.socketManager.on(DELETE_CHAT, () => async (message: ClientPushMessage) => {
            await this.deleteChat(message.chatId);
        });

        this.socketManager.on(NEED_CHAT, (user: User) => async () => {
            await this.sendChats(user);
        });
    }

    private async createChat(chatName: string, creator: User): Promise<void> {
        const chat: ChatDatabase = {
            name: chatName,
            serverMessage: [],
            creator,
            userIdJoined: [creator.id],
            id: '',
        };

        const chatId = await this.collection.insertOne(chat);

        await this.collection.updateOne({ _id: chatId.insertedId }, { $set: { id: chatId.insertedId.toString() } });

        this.socketManager.sendPrivate(NEED_CHAT, creator.id, await this.getAllChat(creator.id));

        const newChat: ChatName = { id: chatId.insertedId.toString(), name: chatName, creator: chat.creator };

        this.socketManager.broadcast(CREATE_CHAT, creator.id, newChat);
    }

    private async createDefaultChat() {
        const mainChatId = await this.getDefaultChatId();

        if (!mainChatId) {
            const chat: ChatDatabase = {
                name: DEFAULT_CHAT.name,
                serverMessage: [],
                creator: DEFAULT_CHAT.creator,
                userIdJoined: [],
                id: DEFAULT_CHAT.id,
            };

            await this.collection.insertOne(chat);
        }
    }

    private async getDefaultChatId(): Promise<string | undefined> {
        return this.collection
            .findOne({ creator: DEFAULT_CHAT.creator, name: DEFAULT_CHAT.name })
            .then((chat: WithId<ChatDatabase> | null) => chat?.id);
    }

    private async getAllChat(userId: string): Promise<AllChat | null> {
        await this.createDefaultChat();
        const mainChat: WithId<ChatDatabase> | null = await this.getChat(DEFAULT_CHAT.id);

        if (!mainChat) return null;

        const chatJoined = await this.createChatJoinedList(mainChat, userId);

        const searchChat: ChatName[] = await this.createOthersChatList(userId);

        return { chatJoined, otherChat: searchChat };
    }

    private async createChatJoinedList(mainChat: WithId<ChatDatabase>, userId: string): Promise<Chat[]> {
        const chatJoined: Chat[] = [
            {
                name: mainChat.name,
                serverMessage: mainChat.serverMessage,
                creator: mainChat.creator,
                id: mainChat.id,
            },
        ];

        const joinedChatDatabase: ChatDatabase[] = await this.getJoinedChat(userId);
        let joinedChat: Chat[] = [];

        if (joinedChatDatabase)
            joinedChat = joinedChatDatabase.map((chat) => {
                return {
                    serverMessage: chat.serverMessage,
                    id: chat.id,
                    name: chat.name,
                    creator: chat.creator,
                };
            });

        return chatJoined.concat(joinedChat);
    }

    private async createOthersChatList(userId: string): Promise<ChatName[]> {
        const value: WithId<ChatDatabase>[] = await this.getOthersChat(userId);

        if (value)
            return value.map((chat) => {
                return { id: chat.id, name: chat.name, creator: chat.creator };
            });
        return [];
    }

    private async sendChats(user: User, communication: string = NEED_CHAT) {
        const chats = await this.getAllChat(user.id);

        if (!chats) return;

        this.socketManager.sendPrivate(communication, user.id, chats);
    }

    private async handlerOnMessage(user: User, message: ClientPushMessage) {
        const profilePicture = await this.usersManager.getProfilePicture(user.name);

        await this.addMessageToChat(message.chatId, {
            time: new Date(),
            content: message.content,
            user: { id: user.id, name: user.name },
            profilePicture: profilePicture ? profilePicture : '',
        });
    }

    private async addMessageToChat(chatId: string, message: ServerMessage) {
        if (message.content.trim() === '') return;
        const chat: WithId<ChatDatabase> | null = await this.getChat(chatId);

        if (!chat) return;
        chat.serverMessage.push(message);

        await this.updateServerMessage(chatId, chat.serverMessage);
        const messageFromChat: MessageFromChat = { chatId, messages: chat.serverMessage };

        if (chat.id === DEFAULT_CHAT.id) this.socketManager.send(MESSAGE, messageFromChat);
        else
            chat.userIdJoined.forEach((userId: string) => {
                this.socketManager.sendPrivate(MESSAGE, userId, messageFromChat);
            });
    }

    private async updateServerMessage(chaId: string, serverMessage: ServerMessage[]): Promise<void> {
        this.collection.updateOne({ id: chaId }, { $set: { serverMessage } });
    }

    private async updateUserIdJoined(chaId: string, userIdJoined: string[]): Promise<void> {
        this.collection.updateOne({ id: chaId }, { $set: { userIdJoined } });
    }

    private async getJoinedChat(userId: string): Promise<WithId<ChatDatabase>[]> {
        return this.collection.find({ userIdJoined: { $in: [userId] } }).toArray();
    }

    private async getOthersChat(userId: string): Promise<WithId<ChatDatabase>[]> {
        return this.collection
            .find(
                { userIdJoined: { $not: { $elemMatch: { $eq: userId } } }, id: { $ne: DEFAULT_CHAT.id }, creator: { $ne: GAME_USER } },
                { projection: { name: 1, id: 1, creator: 1 } },
            )
            .toArray();
    }

    private async getChat(chatId: string): Promise<WithId<ChatDatabase> | null> {
        return this.collection.findOne({ id: chatId }).then((chat: WithId<ChatDatabase> | null) => chat);
    }
}
