import { FAKE_BRACKET_1, FAKE_CONSOLATION_BRACKET_1 } from '@app/test/constants/fake-bracket';

export const bracketUpdaterStub = () =>
    jasmine.createSpyObj('BracketUpdaterService', ['reset'], {
        brackets: [FAKE_BRACKET_1(), FAKE_CONSOLATION_BRACKET_1()],
    });
