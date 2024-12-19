import { Player } from '@app/classes/players/player-abstract';
import { Tournament } from '@app/classes/tournament/tournament';
import { EndTournamentManager } from '@app/services/end-tournament-manager/end-tournament-manager.service';
import { TournamentPlayService } from '@app/services/tournament-play/tournament-play.service';
import { TournamentStatisticService } from '@app/services/tournament-statistic/tournament-statistic.service';
import { CommonEndTournament } from '@common/interfaces/tournament/common-end-tournament';
import { User } from '@common/interfaces/user/user';
import { Container } from 'typedi';

export class TournamentWatchTower {
    tournament: Tournament;
    tournamentPlay: TournamentPlayService;
    endTournament: EndTournamentManager;
    private tournamentStatisticService: TournamentStatisticService;

    constructor(tournament: Tournament) {
        this.tournament = tournament;
        this.tournamentPlay = Container.get(TournamentPlayService);
        this.endTournament = Container.get(EndTournamentManager);
        this.tournamentStatisticService = Container.get(TournamentStatisticService);
    }

    async sendEndTournament(): Promise<void> {
        await this.tournamentStatisticService.updateTournamentStatistic(this.tournament);

        this.update();

        this.tournament.observers.forEach(async (user: User) => this.endTournament.sendEndTournament(user, this.ranking()));

        this.endTournament.deleteFromTournamentManager(this.tournament);
        await this.endTournament.chatManager.deleteChat(this.tournament.gameConfig.chatId);
        this.endTournament.deleteFromTournamentManager(this.tournament);
    }

    sendTournamentContinue(player: Player) {
        if (player.requiredUpdates) this.endTournament.sendTournamentContinue(player.user);
        this.tournament.observers.forEach(async (user: User) => this.endTournament.sendTournamentContinue(user));
    }

    update() {
        const brackets = this.tournament.brackets.map((bracket) => bracket.toCommonBracket());

        this.tournament.playersIn.forEach((player: Player) => {
            if (player.requiredUpdates) this.tournamentPlay.sendTournamentInfo(player.user, { brackets });
        });
        this.tournament.observers.forEach(async (user: User) => this.tournamentPlay.sendTournamentInfo(user, { brackets }));
    }

    ranking(): CommonEndTournament {
        const result: CommonEndTournament = { players: [] };
        const brackets = this.tournament.brackets;
        const order = [];

        for (const bracket of brackets) {
            if (bracket.winners.length) order.push(bracket.winners);
            if (bracket.losers.length) order.push(bracket.losers);
        }

        for (let i = 1; i <= order.length; i++) order[i - 1].forEach((player) => result.players.push({ rank: i, user: player.user }));

        return result;
    }
}
