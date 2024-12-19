// Fichier tiré des notes de cours
type CallbackSignature = (params: unknown) => void;

export class SocketTestHelper {
    on(event: string, callback: CallbackSignature): void {
        if (!this.callbacks.has(event)) {
            this.callbacks.set(event, []);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- sert a des tests
        this.callbacks.get(event)!.push(callback);
    }

    // eslint-disable-next-line no-unused-vars  -- sert a des tests
    emit(event: string, ...params: unknown[]): void {
        return;
    }

    disconnect(): void {
        return;
    }

    close(): void {
        return;
    }

    peerSideEmit(event: string, params?: unknown): void {
        if (!this.callbacks.has(event)) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- sert a des tests
        this.callbacks.get(event)!.forEach((callback) => callback(params));
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering  -- sert a des tests
    private callbacks = new Map<string, CallbackSignature[]>();
}
