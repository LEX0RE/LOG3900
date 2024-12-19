import { GameManager } from '@app/services/game-manager/game-manager.service';
import { createStubInstance, SinonStubbedInstance } from 'sinon';
import { EventEmitter } from 'stream';

export const stubGameManager = (): SinonStubbedInstance<GameManager> => {
    const service = createStubInstance(GameManager);

    service.eventEmitter = new EventEmitter();

    return service;
};
