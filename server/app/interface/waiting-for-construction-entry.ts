import { QueueEntry } from '@app/interface/queue-entry';

export interface WaitingForConstructionEntry extends QueueEntry {
    suffix: string;
}
