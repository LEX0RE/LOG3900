/* eslint-disable @typescript-eslint/no-explicit-any -- pour les tests */
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChatBoxComponent } from '@app/components/chat/chat-box/chat-box.component';
import { ChatWindowComponent } from '@app/components/chat/chat-window/chat-window.component';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { MockDomPortalOutlet } from '@app/test/mocks/dom-portal-outlet-mock';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { MockWindow } from '@app/test/mocks/window-mock';
import { Socket } from 'socket.io-client';

describe('ChatWindowComponent', () => {
    let component: ChatWindowComponent;
    let fixture: ComponentFixture<ChatWindowComponent>;
    let chatBoxInteractionServiceMock: jasmine.SpyObj<ChatBoxInteractionService>;
    let messageSenderServiceMock: jasmine.SpyObj<MessageSenderService>;
    let socketServiceMock: SocketClientServiceMock;
    let socketHelper: SocketTestHelper;
    let componentFactoryResolver: ComponentFactoryResolver;
    let applicationRef: ApplicationRef;
    let injector: Injector;

    beforeEach(async () => {
        socketHelper = new SocketTestHelper();
        socketServiceMock = new SocketClientServiceMock();
        chatBoxInteractionServiceMock = jasmine.createSpyObj('ChatBoxInteractionService', [], {
            showPortal: true,
            showChat: false,
            actualChat: {
                serverMessage: [],
                id: 'default',
                name: 'default',
                creator: {
                    id: '12345678',
                    name: 'user',
                },
            },
        });
        socketServiceMock['socket'] = socketHelper as unknown as Socket;
        Object.defineProperty(socketServiceMock, 'socketId', {
            get: () => '12345',
        });
        messageSenderServiceMock = jasmine.createSpyObj('MessageSenderService', ['sendServer']);
        messageSenderServiceMock.socketService = socketServiceMock;
        // eslint-disable-next-line dot-notation -- Propriété privée
        await TestBed.configureTestingModule({
            imports: [PortalModule, FormsModule],
            declarations: [ChatWindowComponent],
            providers: [
                { provide: ChatBoxInteractionService, useValue: chatBoxInteractionServiceMock },
                { provide: MessageSenderService, useValue: messageSenderServiceMock },
                { provide: ComponentFactoryResolver, useValue: componentFactoryResolver },
                { provide: ApplicationRef, useValue: applicationRef },
                { provide: Injector, useValue: injector },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
        applicationRef = TestBed.inject(ApplicationRef);
        injector = TestBed.inject(Injector);
        fixture = TestBed.createComponent(ChatWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const mockPortal = new MockDomPortalOutlet();

        component.chatBox = mockPortal as any as ComponentPortal<ChatBoxComponent>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call window open and close after ngAfterViewInit', () => {
        const spyWindowOpen = spyOn(window, 'open');
        const spyWindowClose = spyOn(component, 'windowClose' as any);

        component.ngAfterViewInit();

        expect(spyWindowOpen).toHaveBeenCalled();
        expect(spyWindowClose).toHaveBeenCalled();
    });

    it('should close window after ngOnDestroy', () => {
        component['externalWindow'] = new MockWindow() as any as Window;
        const spyCloseWindow = spyOn(component['externalWindow'] as any, 'close');

        component.ngOnDestroy();

        expect(spyCloseWindow).toHaveBeenCalled();
    });

    it('should change showChat to true and showPortal to false when reloading page', () => {
        component['externalWindow'] = new MockWindow() as any as Window;

        component['externalWindow'].addEventListener('beforeunload', () => {
            expect(component.chatBoxInteractionService.isChatShow).toBeTrue();
            expect(component.chatBoxInteractionService.isPortalShow).toBeFalse();
        });

        component['windowClose']();
        component['externalWindow'] as any as MockWindow['triggerEvent'];
    });
});
