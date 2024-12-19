/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_CHAT } from '@app/constants/default/default-chat';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { DatabaseStub } from '@app/test/classes-stubs/database-stub';
import { FAKE_CHAT_1, FAKE_CHAT_2 } from '@app/test/constants/fake-chat-available';
import { FAKE_CLIENT_MESSAGE_1, FAKE_SERVER_MESSAGE_1 } from '@app/test/constants/fake-chat-message';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { delay } from '@app/test/delay';
import { doNothing } from '@app/test/do-nothing-function';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { CREATE_CHAT, DELETE_CHAT, JOIN_CHAT, LEAVE_CHAT, MESSAGE, NEED_CHAT } from '@common/constants/communication';
import { ClientPushMessage } from '@common/interfaces/chat/client-push-message';
import { ChatDatabase } from '@common/interfaces/chat/database-chat';
import { ServerMessage } from '@common/interfaces/chat/server-message';
import { User } from '@common/interfaces/user/user';
import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import { WithId } from 'mongodb';
import { assert, restore, spy, stub } from 'sinon';

describe('ChatManager2', () => {
    let service: ChatManager2;
    let stubs: ServiceStubHelper;
    let fakeClientMessage: ClientPushMessage;
    let fakeServerMessage: ServerMessage;
    let chat1: ChatDatabase;
    let chat2: ChatDatabase;
    let user1: User;
    let timer: number;

    before(() => chai.use(chaiAsPromised));

    beforeEach(async () => {
        stubs = new ServiceStubHelper();
        const database = new DatabaseStub<ChatDatabase>();

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        timer = 100;
        stub(stubs.databaseService, 'database').get(() => database);
        stubs.socketManager.connectClient(stubs.clientSocket);
        chat1 = FAKE_CHAT_1();
        chat2 = FAKE_CHAT_2();
        user1 = FAKE_USER_1();
        fakeClientMessage = FAKE_CLIENT_MESSAGE_1();
        fakeServerMessage = FAKE_SERVER_MESSAGE_1();
        service = new ChatManager2();

        service.collection.insertOne(chat1);
    });

    afterEach(() => restore());

    it('should be able to create chat', async () => {
        const createChat: ClientPushMessage = {
            chatId: '',
            content: chat1.name,
            time: fakeServerMessage.time,
        };

        const spyBroadcast = spy(stubs.socketManager, 'broadcast');
        const spySendPrivate = spy(stubs.socketManager, 'sendPrivate');

        stubs.clientSocket.emit(CREATE_CHAT, createChat);

        await delay(timer);
        assert.calledOnce(spySendPrivate);
        assert.calledOnce(spyBroadcast);
    });

    it('should be able to save Message in mongoDB', async () => {
        const message: ClientPushMessage = {
            chatId: chat1.id,
            content: fakeClientMessage.content,
            time: fakeServerMessage.time,
        };

        const fakeProfilePicture = 'abc';

        stubs.usersManager.getProfilePicture.returns(Promise.resolve(fakeProfilePicture));
        stub(service, 'getChat' as any).resolves(chat1);
        stub(service.collection, 'updateOne').resolves(doNothing);
        const spySendPrivate = spy(stubs.socketManager, 'sendPrivate');

        stubs.clientSocket.emit(MESSAGE, message);
        await delay(timer);
        assert.calledOnce(spySendPrivate);
    });

    it('should be able to send the message to everyone if is DEFAULT_CHAT', async () => {
        const message: ClientPushMessage = {
            chatId: DEFAULT_CHAT.id,
            content: fakeClientMessage.content,
            time: fakeServerMessage.time,
        };

        chat1.id = DEFAULT_CHAT.id;
        const fakeProfilePicture = 'abc';

        stubs.usersManager.getProfilePicture.returns(Promise.resolve(fakeProfilePicture));
        stub(service, 'getChat' as any).resolves(chat1);
        stub(service.collection, 'updateOne').resolves(doNothing);
        const spySend = spy(stubs.socketManager, 'send');

        stubs.clientSocket.emit(MESSAGE, message);
        await delay(timer);
        assert.calledOnce(spySend);
    });

    it('should be able to handle incoming chat messages with id', async () => {
        const message: ClientPushMessage = {
            chatId: chat1.id,
            content: fakeClientMessage.content,
            time: fakeServerMessage.time,
        };
        const newServerMessage: ServerMessage[] = chat1.serverMessage.map((mess) => mess);

        const fakeProfilePicture = 'abc';

        stubs.usersManager.getProfilePicture.returns(Promise.resolve(fakeProfilePicture));
        stub(service, 'getChat' as any).resolves(chat1);
        stub(service, 'updateServerMessage' as any).resolves(doNothing);

        newServerMessage.push({
            time: new Date(),
            user: user1,
            profilePicture: fakeProfilePicture,
            content: fakeClientMessage.content,
        });
        stubs.clientSocket.emit(MESSAGE, message);
        await delay(timer);
        assert.called(stubs.usersManager.getProfilePicture);
        const chat: WithId<ChatDatabase> | null = await service['getChat'](chat1.id);
        const lastMessage: ServerMessage | undefined = chat?.serverMessage[chat?.serverMessage.length - 1];

        expect(lastMessage?.content).to.be.equal(fakeClientMessage.content);
        expect(lastMessage?.user.id).to.be.equal(user1.id);
        expect(lastMessage?.user.name).to.be.equal(user1.name);
        expect(lastMessage?.profilePicture).to.be.equal(fakeProfilePicture);
    });

    it('should be able to join chat', async () => {
        const message: ClientPushMessage = {
            chatId: chat2.id,
            content: fakeClientMessage.content,
            time: fakeServerMessage.time,
        };
        const expected = user1.id;
        const spySendPrivate = spy(stubs.socketManager, 'sendPrivate');

        stub(service, 'getChat' as any).resolves(chat2);
        stub(service, 'updateUserIdJoined' as any).resolves(doNothing);
        stubs.clientSocket.emit(JOIN_CHAT, message);
        await delay(timer);

        assert.calledOnce(spySendPrivate);
        expect(chat2.userIdJoined[chat2.userIdJoined.length - 1]).to.be.equal(expected);
    });

    it('should be able to leave chat', async () => {
        const message: ClientPushMessage = {
            chatId: chat2.id,
            content: fakeClientMessage.content,
            time: fakeServerMessage.time,
        };
        const notExpected = user1.id;
        const spySendPrivate = spy(stubs.socketManager, 'sendPrivate');

        chat2.userIdJoined.push(notExpected);
        stub(service, 'getChat' as any).resolves(chat2);
        stub(service, 'updateUserIdJoined' as any).resolves(doNothing);
        stubs.clientSocket.emit(LEAVE_CHAT, message);
        await delay(timer);

        assert.calledOnce(spySendPrivate);
        expect(chat2.userIdJoined.includes(notExpected)).to.be.equal(false);
    });

    it('should be able to get all-chat', async () => {
        const spySendPrivate = spy(stubs.socketManager, 'sendPrivate');

        stub(service, 'getDefaultChatId' as any).resolves(doNothing);
        stubs.clientSocket.emit(NEED_CHAT, '');
        await delay(timer);

        assert.calledOnce(spySendPrivate);
    });

    it('should delete chat', async () => {
        const message: ClientPushMessage = {
            chatId: chat1.id,
            content: '',
            time: new Date(),
        };
        const spySendPrivate = spy(stubs.socketManager, 'send');

        stubs.clientSocket.emit(DELETE_CHAT, message);
        await delay(timer);

        assert.calledOnce(spySendPrivate);
    });
});
