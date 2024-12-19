// inspire de https://dmitripavlutin.com/javascript-queue/
export class Queue<T> {
    private items: { [key: number]: T };
    private headIndex;
    private tailIndex;

    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    enqueue(item: T) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }

    dequeue(): T | undefined {
        const item = this.items[this.headIndex];

        if (!item) return;
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }

    get length() {
        return this.tailIndex - this.headIndex;
    }
}
