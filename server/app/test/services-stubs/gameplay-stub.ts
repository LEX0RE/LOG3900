import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

export const stubGameplay = (): SinonStubbedInstance<Gameplay> => {
    const service = createStubInstance(Gameplay);

    service.invalidRuleError = '';
    service.playerTurnsQueue = [];
    return service;
};
