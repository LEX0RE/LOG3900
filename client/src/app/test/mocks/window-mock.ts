/* eslint-disable no-unused-vars -- pour les tests */
/* eslint-disable @typescript-eslint/no-empty-function -- pour les tests */
export class MockWindow {
    document = { body: {} };
    listeners: Record<string, EventListenerOrEventListenerObject[]> = {};
    dispatchEvent = (event: Event) => true;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        if (!this.listeners[type]) this.listeners[type] = [];

        this.listeners[type].push(listener);
    }

    open() {}
    close() {}

    triggerEvent(type: string) {
        const event = new Event(type);

        if (this.listeners[type]) {
            this.listeners[type].forEach((listener) => {
                if (typeof listener === 'function') listener(event);
                else listener.handleEvent(event);
            });
        }
    }
}
