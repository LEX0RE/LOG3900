import { PublishSubscribeManager } from '@app/classes/publish-subscribe-manager/publish-subscribe-manager';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import { assert, restore, SinonSpy, SinonStub, spy, stub } from 'sinon';

describe('PublishSubscribeManager', () => {
    let publishSubscribeManager: PublishSubscribeManager<null>;
    let stubs: ServiceStubHelper;
    let contentGetter: SinonStub<unknown[], null>;
    let onSub: SinonStub<unknown[], unknown>;
    let onUnSub: SinonStub<unknown[], unknown>;
    const PUB_EVENT_ID = 'test_pub';
    const SUB_EVENT_ID = 'test_sub';
    const UNSUB_EVENT_ID = 'test_unsub';
    let spySendPrivate: SinonSpy<[event: string, socketId: string, data?: unknown], void>;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        spySendPrivate = spy(stubs.socketManager, 'sendPrivate');
        contentGetter = stub().returns(null);
        onSub = stub();
        onUnSub = stub();

        publishSubscribeManager = new PublishSubscribeManager({
            publishContentGetter: contentGetter,
            publishEventId: PUB_EVENT_ID,
            subEventId: SUB_EVENT_ID,
            unSubEventId: UNSUB_EVENT_ID,
            onSubEvent: onSub,
            onUnSubEvent: onUnSub,
        });
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => restore());

    it('should be created', () => {
        expect(publishSubscribeManager).to.not.be.eql(undefined);
    });

    it('should call on sub when sub', () => {
        stubs.clientSocket.emit(SUB_EVENT_ID);
        assert.calledWith(spySendPrivate, PUB_EVENT_ID, FAKE_USER_1().id, null);
        assert.called(onSub);
    });

    it('should call on unsub when unsub', () => {
        stubs.clientSocket.emit(SUB_EVENT_ID);
        stubs.clientSocket.emit(UNSUB_EVENT_ID);
        assert.called(onUnSub);
    });

    it('should send content when publish', () => {
        stubs.clientSocket.emit(SUB_EVENT_ID);
        assert.calledWith(spySendPrivate, PUB_EVENT_ID, FAKE_USER_1().id, null);
        publishSubscribeManager.publish();
        assert.calledTwice(spySendPrivate);
    });

    it('should not send content when publish if unsub', () => {
        stubs.clientSocket.emit(SUB_EVENT_ID);
        stubs.clientSocket.emit(UNSUB_EVENT_ID);
        publishSubscribeManager.publish();
        assert.calledOnce(spySendPrivate);
    });

    it('should unsub when disconnect', () => {
        stubs.clientSocket.emit(SUB_EVENT_ID);
        stubs.clientSocket.disconnect();
        assert.called(onUnSub);
    });
});
