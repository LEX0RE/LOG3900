import { ConnectionStatus } from '@common/enums/connection-status';

export interface UserConnectionInfo {
    date: Date;
    status: ConnectionStatus;
}
