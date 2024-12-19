import { Hint } from '@app/interface/hint';

export interface HintUsed {
    wasUsed: boolean;
    hintInProgress: boolean;
    hint: Hint[];
}
