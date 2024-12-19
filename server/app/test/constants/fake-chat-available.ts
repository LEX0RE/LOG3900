import { FAKE_USER_1, FAKE_USER_2 } from '@app/test/constants/fake-user';
import { ChatAvailable } from '@common/interfaces/chat/chat-available';
import { ChatDatabase } from '@common/interfaces/chat/database-chat';

export const FAKE_CHAT_2_NAME = 'fake_chat_2_name';

export const FAKE_CHAT_1 = (): ChatDatabase => {
    return {
        id: 'fake_chat_id',
        serverMessage: [{ time: new Date(), user: FAKE_USER_1(), profilePicture: '', content: 'salut!' }],
        creator: FAKE_USER_1(),
        name: FAKE_CHAT_2_NAME,
        userIdJoined: [FAKE_USER_1().id],
    };
};

export const FAKE_CHAT_2 = (): ChatDatabase => {
    return { id: 'fake_chat_id', serverMessage: [], creator: FAKE_USER_2(), name: FAKE_CHAT_2_NAME, userIdJoined: [FAKE_USER_2().id] };
};

export const FAKE_CHAT_3 = (): ChatDatabase => {
    return {
        id: 'fake_chat_id',
        serverMessage: [],
        creator: FAKE_USER_1(),
        name: FAKE_CHAT_2_NAME,
        userIdJoined: [FAKE_USER_1().id, FAKE_USER_2().id],
    };
};

export const FAKE_CHAT_AVAILABLE = (): ChatAvailable => {
    return { id: FAKE_CHAT_2().id, name: FAKE_CHAT_2().name };
};
