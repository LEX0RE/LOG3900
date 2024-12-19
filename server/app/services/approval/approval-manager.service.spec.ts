import { ApprovalManager } from '@app/services/approval/approval-manager.service';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import { afterEach } from 'mocha';
import * as Sinon from 'sinon';

describe('ApprovalManagerService', () => {
    let stubs: ServiceStubHelper;
    let service: ApprovalManager;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        service = new ApprovalManager();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => Sinon.restore());

    it('should create approvalManager', () => {
        expect(service).to.not.be.eql(undefined);
    });
});
