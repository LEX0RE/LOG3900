import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { LetterComponent } from '@app/components/letter/letter.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { Socket } from 'socket.io-client';

describe('AppComponent', () => {
    let socketServiceMock: SocketClientServiceMock;
    let socketHelper: SocketTestHelper;
    let routerMock: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        socketHelper = new SocketTestHelper();
        socketServiceMock = new SocketClientServiceMock();

        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'] = socketHelper as unknown as Socket;
        await TestBed.configureTestingModule({
            imports: [AppRoutingModule],
            declarations: [AppComponent, LetterComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        expect(app).toBeTruthy();
    });

    it('notOnAuthenticatePage should return false if route login', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        routerMock = jasmine.createSpyObj('Router', {}, { url: '/login' });

        app.router = routerMock;

        const notOnAuthenticatePage = app.notOnAuthenticatePage();

        expect(notOnAuthenticatePage).toBeFalsy();
    });

    it('notOnAuthenticatePage should return false if route registration', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        routerMock = jasmine.createSpyObj('Router', {}, { url: '/registration' });

        app.router = routerMock;

        const notOnAuthenticatePage = app.notOnAuthenticatePage();

        expect(notOnAuthenticatePage).toBeFalsy();
    });
});
