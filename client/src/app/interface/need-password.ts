import { JoiningType } from '@client/src/app/enum/joining-type';

export interface NeedPassword {
    needPassword: boolean;
    lobbyId?: string;
    joiningType?: JoiningType;
    isGame?: boolean;
    isTournament?: boolean;
}
