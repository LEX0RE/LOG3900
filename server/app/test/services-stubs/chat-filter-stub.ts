import { CommandService } from '@app/services/command/command.services';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

export const stubChatFilter = (): SinonStubbedInstance<CommandService> => {
    const service = createStubInstance(CommandService);

    return service;
};
