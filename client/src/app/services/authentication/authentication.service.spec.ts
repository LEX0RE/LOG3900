import { TestBed } from '@angular/core/testing';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { FAKE_PROFILE } from '@app/test/constants/fake-profile';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { Socket } from 'socket.io-client';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LOGIN } from '@app/constants/router-path';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { DELAY } from '@app/test/constants/delay';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';

describe('AuthenticationService', () => {
    const REFRESH_DELAY = 300;
    let service: AuthenticationService;
    let socketServiceMock: SocketClientServiceMock;
    let socketHelper: SocketTestHelper;

    beforeEach(() => {
        socketHelper = new SocketTestHelper();
        socketServiceMock = new SocketClientServiceMock();

        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'] = socketHelper as unknown as Socket;
        TestBed.configureTestingModule({
            imports: [ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE(), HttpClientTestingModule],
            providers: [{ provide: SocketClientService, useValue: socketServiceMock }],
            declarations: [],
        });
        service = TestBed.inject(AuthenticationService);
    });

    beforeEach(() => {
        service = TestBed.inject(AuthenticationService);
        // eslint-disable-next-line dot-notation -- Propriété privée
        service['socketService'] = socketServiceMock;

        service.user = FAKE_PROFILE();

        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('setSession should reset localStorage', async () => {
        const removeSpy = spyOn(localStorage, 'removeItem');
        const setSpy = spyOn(localStorage, 'setItem');
        // eslint-disable-next-line dot-notation -- Propriété privée
        const connectSpy = spyOn(service['socketService'], 'connect');

        service.setSession();
        await DELAY(REFRESH_DELAY);

        expect(removeSpy).toHaveBeenCalled();
        expect(setSpy).toHaveBeenCalled();
        expect(connectSpy).toHaveBeenCalled();
    });

    it('logout should call removeItem', async () => {
        const removeSpy = spyOn(localStorage, 'removeItem');
        // eslint-disable-next-line dot-notation -- Propriété privée

        spyOnProperty(service['socketService'], 'socketId').and.returnValue('1');

        service.logout();
        await DELAY(REFRESH_DELAY);

        expect(removeSpy).toHaveBeenCalled();
    });

    it('logout should not call removeItem if on authenticatePage', async () => {
        const removeSpy = spyOn(localStorage, 'removeItem');
        // eslint-disable-next-line dot-notation -- Propriété privée
        const closeSpy = spyOn(service['socketService'], 'close');

        await service['router'].navigate([LOGIN]);

        service.logout();
        await DELAY(REFRESH_DELAY);
        expect(removeSpy).not.toHaveBeenCalled();
        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should call logout when reloading page', async () => {
        const spyLogout = spyOn(service, 'logout');

        window.onbeforeunload = jasmine.createSpy();

        // eslint-disable-next-line dot-notation -- Méthode privée
        service['logoutWindowClose']();

        window.dispatchEvent(new Event('beforeunload'));
        await DELAY(REFRESH_DELAY);
        expect(spyLogout).toHaveBeenCalled();
    });

    it('imageToBase64 should set chosenAvatar', () => {
        const testImagePath = 'https://example.com/image.png';
        const okResponse = new Response(JSON.stringify({}), { status: 200, statusText: 'OK' });

        const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(okResponse));

        service.imageToBase64(testImagePath);

        expect(fetchSpy).toHaveBeenCalledWith(testImagePath);
        expect(service.errorImage).toBe(false);
    });

    it('errorImage should be true if imageToBase64 causes error', async () => {
        const testImagePath = 'https://example.com/image.png';

        const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.reject());

        service.imageToBase64(testImagePath);

        setTimeout(() => {
            expect(fetchSpy).toHaveBeenCalledWith(testImagePath);
            expect(service.errorImage).toBe(true);
        });
        await DELAY(REFRESH_DELAY);
    });
});
