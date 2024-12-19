import { FAKE_PROFILE } from '@app/test/constants/fake-profile';

export const mockAuthenticationService = () =>
    jasmine.createSpyObj('AuthenticationService', ['setSession', 'imageToBase64'], {
        user: FAKE_PROFILE(),
        chosenAvatar: '',
    });
