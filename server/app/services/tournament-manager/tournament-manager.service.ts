import { Bracket } from '@app/classes/bracket/bracket';
import { Player } from '@app/classes/players/player-abstract';
import { Tournament } from '@app/classes/tournament/tournament';
import { ON_CHANGE } from '@app/constants/events';
import { ON_ADD_TOURNAMENT, ON_REMOVE_TOURNAMENT } from '@app/constants/events/tournament-manager-event';
import { User } from '@common/interfaces/user/user';
import { EventEmitter } from 'stream';
import { Service } from 'typedi';
import { v4 as idGenerator } from 'uuid';

@Service()
export class TournamentManager {
    eventEmitter: EventEmitter;
    readonly tournaments: Map<string, Tournament>;

    constructor() {
        this.tournaments = new Map<string, Tournament>();
        this.eventEmitter = new EventEmitter();
    }

    addTournament(tournament: Tournament): void {
        this.tournaments.set(tournament.tournamentId, tournament);
        this.eventEmitter.emit(ON_ADD_TOURNAMENT, tournament);
        this.eventEmitter.emit(ON_CHANGE);
    }

    deleteTournament(tournamentId: string): boolean {
        const tournament = this.tournaments.get(tournamentId);

        if (!tournament) return false;
        this.eventEmitter.emit(ON_REMOVE_TOURNAMENT, tournament);
        const success = this.tournaments.delete(tournamentId);

        this.eventEmitter.emit(ON_CHANGE);
        return success;
    }

    getTournament(tournamentId: string): Tournament | null {
        return this.tournaments.get(tournamentId) ?? null;
    }

    getTournaments(): Tournament[] {
        return Array.from(this.tournaments.values());
    }

    getTournamentByPlayerId(playerId: string): Tournament | null {
        let tournamentFound: Tournament | null = null;

        this.tournaments.forEach((tournament: Tournament) => {
            if (tournament.playersIn.find((player: Player) => player.user.id === playerId)) tournamentFound = tournament;
        });

        return tournamentFound;
    }

    getBracketByPlayerId(playerId: string): Bracket | null {
        const tournament = this.getTournamentByPlayerId(playerId);

        if (!tournament) return null;

        for (let i = tournament.brackets.length - 1; i >= 0; i--) {
            const bracketFound = this.searchUpperBracket(tournament.brackets[i], playerId);

            if (bracketFound) return bracketFound;
        }

        return null;
    }

    isGameInTournament(gameId: string): boolean {
        for (const tournament of this.tournaments.values()) {
            for (const bracket of tournament.brackets) {
                if (this.isGameInBracket(gameId, bracket)) return true;
            }
        }

        return false;
    }

    isGameInBracket(gameId: string, bracket: Bracket): boolean {
        if (bracket.gameId === gameId) return true;

        for (const child of bracket.children) {
            if (this.isGameInBracket(gameId, child)) return true;
        }

        return false;
    }

    nextId(): string {
        return idGenerator();
    }

    observeTournament(user: User, tournamentId: string): void {
        const tournament = this.getTournament(tournamentId);

        if (!tournament) return;
        tournament.addObserver(user);
        this.eventEmitter.emit(ON_CHANGE);
    }

    removeObserver(user: User, tournamentId: string) {
        const tournament = this.getTournament(tournamentId);

        if (!tournament) return;
        tournament.removeObserver(user);
        this.eventEmitter.emit(ON_CHANGE, tournamentId);
    }

    private searchUpperBracket(bracket: Bracket, playerId: string): Bracket | null {
        if (bracket.currentPlayersIn.find((currentPlayer) => currentPlayer.user.id === playerId)) return bracket;

        for (const child of bracket.children) if (this.searchUpperBracket(child, playerId)) return child;

        return null;
    }
}
