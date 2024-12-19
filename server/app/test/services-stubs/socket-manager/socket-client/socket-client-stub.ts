import { SocketManagerStub } from '@app/test/services-stubs/socket-manager/socket-manager/socket-manager-stub';

export class SocketClientStub {
    id!: string;
    private manager: SocketManagerStub;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pour recevoir n'importe quel objet
    private _events: Map<string, (data: any) => void>;

    constructor(socketId: string, manager: SocketManagerStub) {
        this.id = socketId;
        this.manager = manager;
        // eslint-disable-next-line no-underscore-dangle -- Pour initialiser la propriété privée _events
        this._events = new Map();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pour permettre de recevoir n'importe quel objet
    executeFunction<T>(event: string, data?: T): void {
        // eslint-disable-next-line no-underscore-dangle -- Pour stub le clientSocket
        const func = this._events.get(event);

        if (func) func(data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pour permettre de recevoir n'importe quel objet
    emit<T>(event: string, data?: T): void {
        this.manager.executeFunction(event, this, data);
    }

    connect(): void {
        this.manager.connectClient(this);
    }

    disconnect(): void {
        this.manager.disconnectClient(this);
    }
}
