import { Queue } from '@app/classes/queue/queue';
import { expect } from 'chai';

describe('QueueClass', () => {
    let queue: Queue<string>;

    beforeEach(() => {
        queue = new Queue<string>();
    });

    it('should be defined', () => expect(queue).to.exist);

    it('should be empty', () => {
        expect(queue.length).to.be.eql(0);
        expect(queue.dequeue()).to.be.eql(undefined);
    });

    it('should enqueue en dequeue element', () => {
        queue.enqueue('a');
        expect(queue.length).to.be.eql(1);
        expect(queue.dequeue()).to.be.eql('a');
        expect(queue.length).to.be.eql(0);
    });
});
