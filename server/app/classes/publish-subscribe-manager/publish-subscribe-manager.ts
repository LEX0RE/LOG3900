import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { User } from '@common/interfaces/user/user';
import { Container } from 'typedi';

// doit rester dans ce fichier pour que le type generic soit bien pris en compte
interface PubAndSubManagerOptions<PublishContentType> {
    subEventId: string;
    unSubEventId: string;
    publishEventId: string;
    publishContentGetter: () => PublishContentType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- type any is required for the data
    onSubEvent?: (user: User, data: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- type any is required for the data
    onUnSubEvent?: (user: User, data: any | null) => void;
}

export class PublishSubscribeManager<PublishContentType> {
    socketManager: SocketManager;
    subscribers: Map<string, User>;
    options: PubAndSubManagerOptions<PublishContentType>;

    constructor(options: PubAndSubManagerOptions<PublishContentType>) {
        this.socketManager = Container.get(SocketManager);
        this.subscribers = new Map<string, User>();
        this.options = options;
        this.configureSocketListeners();
    }

    publish(): void {
        const publishContent = this.options.publishContentGetter();

        this.subscribers.forEach((user: User) => this.socketManager.sendPrivate(this.options.publishEventId, user.id, publishContent));
    }

    addSubscriber(user: User, data: unknown): void {
        this.subscribe(user, data);
    }

    private subscribe(user: User, data: unknown): void {
        if (this.subscribers.has(user.id)) return;
        this.subscribers.set(user.id, user);
        if (this.options.onSubEvent) this.options.onSubEvent(user, data);

        this.socketManager.sendPrivate(this.options.publishEventId, user.id, this.options.publishContentGetter());
    }

    private unsubscribe(user: User, data: unknown | null): void {
        this.subscribers.delete(user.id);
        if (this.options.onUnSubEvent) this.options.onUnSubEvent(user, data);
    }

    private configureSocketListeners(): void {
        this.socketManager.on(this.options.subEventId, (user: User) => (data: unknown) => this.subscribe(user, data));
        this.socketManager.on(this.options.unSubEventId, (user: User) => (data: unknown) => this.unsubscribe(user, data));
        this.socketManager.onDisconnect((user: User) => () => this.unsubscribe(user, null));
    }
}
