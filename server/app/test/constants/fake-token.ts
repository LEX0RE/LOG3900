import { ALGORITHM, JWT_EXPIRES_IN, JWT_SECRET } from '@app/constants/database';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { sign } from 'jsonwebtoken';

export const FAKE_TOKEN = (): string =>
    sign(FAKE_USER_1(), JWT_SECRET, {
        algorithm: ALGORITHM,
        expiresIn: JWT_EXPIRES_IN,
    });

export const FAKE_BEARER_TOKEN = (): string => `Bearer ${FAKE_TOKEN()}`;
