import { Tournament } from '@app/classes/tournament/tournament';
import { ON_CHANGE } from '@app/constants/events';
import { BRACKET_FORCE_START } from '@app/constants/events/tournament-events';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TournamentManager } from '@app/services/tournament-manager/tournament-manager.service';
import {
    END_TOURNAMENT,
    LEAVE_TOURNAMENT,
    SURRENDER_EVENT,
    SURRENDER_TOURNAMENT_EVENT,
    TOURNAMENT_CONTINUE_EVENT,
    TOURNAMENT_UPDATE,
} from '@common/constants/communication';
import { CommonEndTournament } from '@common/interfaces/tournament/common-end-tournament';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class EndTournamentManager {
    chatManager: ChatManager2;
    private socketManager: SocketManager;
    private tournamentManager: TournamentManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.tournamentManager = Container.get(TournamentManager);
        this.chatManager = Container.get(ChatManager2);
        this.configureSocket();
    }

    deleteFromTournamentManager(tournament: Tournament) {
        this.tournamentManager.deleteTournament(tournament.tournamentId);
    }

    async sendEndTournament(user: User, tournament: CommonEndTournament) {
        this.socketManager.sendPrivate(END_TOURNAMENT, user.id, tournament);
    }

    async sendTournamentContinue(user: User) {
        this.socketManager.sendPrivate(TOURNAMENT_CONTINUE_EVENT, user.id);
    }

    private configureSocket(): void {
        this.socketManager.on(SURRENDER_EVENT, (user: User) => async () => this.removePlayerInBracket(user));
        this.socketManager.on(SURRENDER_TOURNAMENT_EVENT, (user: User) => async () => this.removePlayerInBracket(user));
        this.socketManager.onDisconnect((user: User) => async () => this.removePlayerInBracket(user));
        this.socketManager.on(LEAVE_TOURNAMENT, (user: User) => async () => this.removeObserver(user));
    }

    private async removePlayerInTournament(user: User): Promise<void> {
        const tournament = this.tournamentManager.getTournamentByPlayerId(user.id);

        if (tournament) {
            tournament.playersIn = tournament.playersIn.filter((player) => player.user.id !== user.id);
            this.tournamentManager.eventEmitter.emit(ON_CHANGE);
            await this.chatManager.leaveChat(user, tournament.gameConfig.chatId);
        }
    }

    private async removePlayerInBracket(user: User): Promise<void> {
        const bracket = this.tournamentManager.getBracketByPlayerId(user.id);

        if (bracket) {
            const surrenderPlayer = bracket.currentPlayers.find((player) => player.user.id === user.id);

            if (surrenderPlayer) {
                if (!bracket.losersId.includes(surrenderPlayer.id)) bracket.losersId.push(surrenderPlayer.id);
                this.removePlayerInTournament(user);
                if (bracket.currentPlayersIn.length === 1) bracket.events.emit(BRACKET_FORCE_START);

                bracket.tournamentEvents.emit(TOURNAMENT_UPDATE);
                const game = bracket.gameManager.getGame(bracket.gameId);

                if (game) await this.chatManager.leaveChat(user, game.gameConfig.chatId);
            }
        }
    }

    private async removeObserver(user: User): Promise<void> {
        const tournament = this.tournamentManager.getTournamentByPlayerId(user.id);

        if (tournament) {
            tournament.observers = tournament.observers.filter((observer) => observer.id !== user.id);
            await this.chatManager.leaveChat(user, tournament.gameConfig.chatId);
        }
    }
}
