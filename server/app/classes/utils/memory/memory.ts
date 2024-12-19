import { MEGA } from '@app/constants/miscellaneous';
import { memoryUsage } from 'process';

export const memory = (): number => {
    return memoryUsage().heapUsed / MEGA / MEGA;
};
