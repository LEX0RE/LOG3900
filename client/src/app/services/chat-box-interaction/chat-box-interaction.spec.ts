import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { translationModule } from '@app/app.module';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { Socket } from 'socket.io-client';

describe('ChatBoxInteractionService', () => {
    let service: ChatBoxInteractionService;
    let socketServiceMock: SocketClientServiceMock;
    let socketHelper: SocketTestHelper;

    beforeEach(async () => {
        socketHelper = new SocketTestHelper();
        socketServiceMock = new SocketClientServiceMock();

        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'] = socketHelper as unknown as Socket;
        await TestBed.configureTestingModule({
            imports: [FormsModule, translationModule, HttpClientTestingModule],
            providers: [{ provide: SocketClientService, useValue: socketServiceMock }],
            declarations: [],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(ChatBoxInteractionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
