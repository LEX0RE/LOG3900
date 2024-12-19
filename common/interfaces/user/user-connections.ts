import { UserConnectionInfo } from '@common/interfaces/user/user-connection-info';

export interface UserConnections {
    userId: string;
    connections: UserConnectionInfo[];
}
