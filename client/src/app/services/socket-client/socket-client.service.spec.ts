/* eslint-disable dot-notation -- Propriété/Méthode privée*/
// Fichier tiré des notes de cours
import { TestBed } from '@angular/core/testing';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { DO_NOTHING } from '@app/test/constants/do-nothing-function';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { Socket } from 'socket.io-client';

describe('SocketClientService', () => {
    let service: SocketClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SocketClientService);

        service['socket'] = new SocketTestHelper() as unknown as Socket;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should disconnect', () => {
        const spy = spyOn(service['socket'], 'disconnect');

        service.disconnect();
        expect(spy).toHaveBeenCalled();
    });

    it('should close', () => {
        const spy = spyOn(service['socket'], 'close');

        service.close();
        expect(spy).toHaveBeenCalled();
    });

    it('isSocketAlive should return true if the socket is still connected', () => {
        service['socket'].connected = true;
        const isAlive = service.isSocketAlive();

        expect(isAlive).toBeTruthy();
    });

    it('isSocketAlive should return false if the socket is no longer connected', () => {
        service['socket'].connected = false;
        const isAlive = service.isSocketAlive();

        expect(isAlive).toBeFalsy();
    });

    it('isSocketAlive should return false if the socket is not defined', () => {
        (service['socket'] as unknown) = undefined;
        const isAlive = service.isSocketAlive();

        expect(isAlive).toBeFalsy();
    });

    it('should call socket.on with an event', () => {
        const event = 'test event';
        const spy = spyOn(service['socket'], 'on');

        service['socket'].connected = true;

        service.on(event, DO_NOTHING);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(event, DO_NOTHING);
    });

    it('send should call emit with data', () => {
        const event = 'test event';
        const data = 1234;

        const spy = spyOn(service['socket'], 'emit');

        service.send(event, data);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(event, data);
    });

    it('send should call emit without data if data is undefined', () => {
        const event = 'test event';

        const spy = spyOn(service['socket'], 'emit');

        service.send(event);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(event);
    });

    it('should return socketId if connected', () => {
        service.connect();

        expect(service.socketId).not.toBeUndefined();
    });

    it('socketId should return empty string if socket is undefined', () => {
        service['socket'] = undefined as unknown as Socket;
        expect(service.socketId).toEqual('');
    });

    it('socketId should return empty string if socket is undefined', () => {
        const socketId = '123';

        service['socket'] = { id: socketId } as unknown as Socket;
        expect(service.socketId).toEqual(socketId);
    });

    it('send should not call emit without data if socket is undefined', () => {
        const event = 'test event';

        const spy = spyOn(service['socket'], 'emit');

        service['socket'] = undefined as unknown as Socket;

        service.send(event);
        expect(spy).not.toHaveBeenCalled();
    });
});
