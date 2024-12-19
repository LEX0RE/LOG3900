import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { translationModule } from '@app/app.module';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { IdentityService } from '@app/services/identity/identity.service';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { DELETE_CHAT, ID, JOIN_CHAT, LEAVE_CHAT, MESSAGE, NEED_CHAT } from '@common/constants/communication';
import { AllChat } from '@common/interfaces/chat/all-chat';
import { Chat } from '@common/interfaces/chat/chat';
import { ChatName } from '@common/interfaces/chat/chat-name';
import { MessageFromChat } from '@common/interfaces/chat/messages';
import { Socket } from 'socket.io-client';

describe('MessageSenderService', () => {
    let service: MessageSenderService;
    let socketServiceMock: SocketClientServiceMock;
    let socketHelper: SocketTestHelper;
    let testMessage: string;
    let routerMock: jasmine.SpyObj<Router>;
    let chatBoxInteractionService: ChatBoxInteractionService;
    let identityMock: jasmine.SpyObj<IdentityService>;

    beforeEach(() => {
        routerMock = jasmine.createSpyObj('Router', ['navigate']);
        identityMock = jasmine.createSpyObj('IdentityService', ['getUser']);
        socketHelper = new SocketTestHelper();
        socketServiceMock = new SocketClientServiceMock();

        chatBoxInteractionService = new ChatBoxInteractionService(identityMock);
        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'] = socketHelper as unknown as Socket;
        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'].connected = true;
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule.withRoutes([]), translationModule, HttpClientTestingModule],
            providers: [{ provide: SocketClientService, useValue: socketServiceMock }],
            declarations: [],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(MessageSenderService);

        localStorage.clear();

        testMessage = 'test message';
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('connect should call socketServer.isSocketAlive', () => {
        const spy = spyOn(service.socketService, 'isSocketAlive');

        service = new MessageSenderService(socketServiceMock, routerMock, chatBoxInteractionService);

        expect(spy).toHaveBeenCalled();
    });

    it('connect should not call socketServer.connect when already connected', () => {
        // eslint-disable-next-line dot-notation -- Propriété privée
        service.socketService['socket'].connected = true;

        const connectSpy = spyOn(service.socketService, 'connect').and.callThrough();

        service = new MessageSenderService(socketServiceMock, routerMock, chatBoxInteractionService);

        expect(connectSpy).not.toHaveBeenCalled();
    });

    it('disconnect should call socketServer.disconnect and localStorage.clear', () => {
        const disconnectSpy = spyOn(service.socketService, 'disconnect');
        const clearSpy = spyOn(localStorage, 'clear');

        service.disconnect();

        expect(disconnectSpy).toHaveBeenCalled();
        expect(clearSpy).toHaveBeenCalled();
    });

    it('should called updateChat from chatBoxInteractionService when receive MESSAGE', () => {
        const message: MessageFromChat = {
            chatId: 'test',
            messages: [],
        };
        const updateChatSpy = spyOn(service.chatBoxInteractionService, 'updateChat');

        socketHelper.peerSideEmit(MESSAGE, message);

        expect(updateChatSpy).toHaveBeenCalledWith(message);
    });

    it('should called updateAllChat from chatBoxInteractionService when receive NEED_CHAT', () => {
        const allChat: AllChat = {
            chatJoined: [],
            otherChat: [],
        };

        const updateAllChatSpy = spyOn(service.chatBoxInteractionService, 'updateAllChat');

        socketHelper.peerSideEmit(NEED_CHAT, allChat);

        expect(updateAllChatSpy).toHaveBeenCalledWith(allChat);
    });

    it('should called deleteChat from chatBoxInteractionService when receive DELETE_CHAT', () => {
        const deleteChat: ChatName = {
            id: '',
            name: '',
            creator: {
                id: '123456',
                name: 'user',
            },
        };

        const deleteChatSpy = spyOn(service.chatBoxInteractionService, 'deleteChat');

        socketHelper.peerSideEmit(DELETE_CHAT, deleteChat);

        expect(deleteChatSpy).toHaveBeenCalledWith(deleteChat);
    });

    it('should add Chat in chatJoined from chatBoxInteractionService when receive JOIN_CHAT', () => {
        const chatTest: Chat = {
            serverMessage: [],
            id: 'test',
            name: 'test_name',
            creator: {
                id: 'user_id',
                name: 'user_name',
            },
        };

        service.chatBoxInteractionService.othersChat = [chatTest];

        socketHelper.peerSideEmit(JOIN_CHAT, chatTest);
        expect(service.chatBoxInteractionService.chatJoined).toEqual([chatTest]);
        expect(service.chatBoxInteractionService.othersChat).toEqual([]);
    });

    it('should add Chat in othersChat from chatBoxInteractionService when receive LEAVE_CHAT', () => {
        const chatTest: Chat = {
            serverMessage: [],
            id: 'test',
            name: 'test_name',
            creator: {
                id: 'user_id',
                name: 'user_name',
            },
        };

        const actualChat: Chat = {
            serverMessage: [],
            id: '123',
            name: 'name',
            creator: {
                id: '456',
                name: 'user',
            },
        };

        service.chatBoxInteractionService.actualChat = actualChat;
        service.chatBoxInteractionService.chatJoined = [chatTest];

        socketHelper.peerSideEmit(LEAVE_CHAT, chatTest);

        expect(service.chatBoxInteractionService.chatJoined).toEqual([]);
        expect(service.chatBoxInteractionService.othersChat).toEqual([chatTest]);
    });

    it('sendToServer should send message to socketService', () => {
        const spy = spyOn(service.socketService, 'send');
        const fakeEvent = 'test event';

        service.sendToServer(fakeEvent, testMessage);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(fakeEvent, jasmine.objectContaining({ content: testMessage }));
    });

    it('sendToServer should not send message to socketService if message empty', () => {
        const spy = spyOn(service.socketService, 'send');
        const fakeEvent = 'test event';
        const emptyMessage = '';

        service.sendToServer(fakeEvent, emptyMessage);

        expect(spy).not.toHaveBeenCalled();
    });

    it('should call setItem in localStorage and put communication ID with socket Id when reloading page ', () => {
        const socketId = '1234';

        Object.defineProperty(socketServiceMock, 'socketId', { value: socketId });
        service = new MessageSenderService(socketServiceMock, routerMock, chatBoxInteractionService);
        // Object.defineProperty(service.socketService, 'socketId', { value: socketId });
        const spy = spyOn(localStorage, 'setItem');

        window.onbeforeunload = jasmine.createSpy();

        // eslint-disable-next-line dot-notation -- Méthode privée
        service['saveSocket']();
        window.dispatchEvent(new Event('beforeunload'));
        expect(spy).toHaveBeenCalledWith(ID, socketId);
    });
});
