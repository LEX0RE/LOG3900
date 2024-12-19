// Fichier tiré des notes de cours
import { Injectable } from '@angular/core';
import { ID_TOKEN } from '@common/constants/authentication';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SocketClientService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic handlers
    onHandlers = new Map<string, ((data: any) => void)[]>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic handlers
    onceHandlers = new Map<string, ((data: any) => void)[]>();
    private socket: Socket;

    get socketId(): string {
        return this.socket && this.socket.id ? this.socket.id : '';
    }

    isSocketAlive(): boolean {
        return this.socket && this.socket.connected;
    }

    connect(): void {
        this.socket = io(environment.socketUrl, {
            transports: ['websocket'],
            upgrade: false,
            forceNew: true,
            auth: { key: localStorage.getItem(ID_TOKEN) },
        });
        this.onHandlers.forEach((actions, event) => {
            actions.forEach((action) => this.socket.on(event, action));
        });
        this.onceHandlers.forEach((actions, event) => {
            actions.forEach((action) => this.socket.once(event, action));
        });
        this.socket.connect();
    }

    close(): void {
        this.socket.close();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

    on<T>(event: string, action: (data: T) => void): void {
        if (!this.onHandlers.has(event)) this.onHandlers.set(event, []);
        this.onHandlers.get(event)?.push(action);
        if (this.isSocketAlive()) this.socket.on(event, action);
    }

    once<T>(event: string, action: (data: T) => void): void {
        if (!this.onceHandlers.has(event)) this.onceHandlers.set(event, []);
        this.onceHandlers.get(event)?.push(action);
        if (this.isSocketAlive()) this.socket.once(event, action);
    }

    send<T>(event: string, data?: T): void {
        if (this.socket) {
            if (data) this.socket.emit(event, data);
            else this.socket.emit(event);
        }
    }
}
