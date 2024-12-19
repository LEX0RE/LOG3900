import { GamePossibility } from '@common/enums/game-possibility';

export const mockMessageSenderService = () =>
    jasmine.createSpyObj('MessageSenderService', ['disconnect', 'surrender', 'configureSocket', 'sendToServer'], {
        message: [],
        decision: GamePossibility.NotFinish,
    });
