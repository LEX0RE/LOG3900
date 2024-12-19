import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TournamentManager } from '@app/services/tournament-manager/tournament-manager.service';
import { TOURNAMENT_UPDATE } from '@common/constants/communication';
import { CommonTournament } from '@common/interfaces/tournament/common-tournament';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class TournamentPlayService {
    socketManager: SocketManager;
    tournamentManager: TournamentManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.tournamentManager = Container.get(TournamentManager);
    }

    async sendTournamentInfo(user: User, bracket: CommonTournament): Promise<void> {
        this.socketManager.sendPrivate(TOURNAMENT_UPDATE, user.id, bracket);
    }
}
