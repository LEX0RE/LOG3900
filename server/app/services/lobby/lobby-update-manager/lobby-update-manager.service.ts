import { Game } from '@app/classes/game/game';
import { LobbyClassic } from '@app/classes/lobby/classic/classic-lobby';
import { LobbyCooperative } from '@app/classes/lobby/cooperative/cooperative-lobby';
import { Lobby } from '@app/classes/lobby/lobby-abstract';
import { LobbyTournament } from '@app/classes/lobby/tournament/tournament-lobby';
import { PublishSubscribeManager } from '@app/classes/publish-subscribe-manager/publish-subscribe-manager';
import { Tournament } from '@app/classes/tournament/tournament';
import { ON_CHANGE } from '@app/constants/events/lobby-manager-events';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { TournamentManager } from '@app/services/tournament-manager/tournament-manager.service';
import {
    PUBLISH_CLASSIC_GAMES,
    PUBLISH_CLASSIC_LOBBIES,
    PUBLISH_COOPERATIVE_GAMES,
    PUBLISH_COOPERATIVE_LOBBIES,
    PUBLISH_TOURNAMENT_GAMES,
    PUBLISH_TOURNAMENT_LOBBIES,
    SUBSCRIBE_CLASSIC_GAMES,
    SUBSCRIBE_CLASSIC_LOBBIES,
    SUBSCRIBE_COOPERATIVE_GAMES,
    SUBSCRIBE_COOPERATIVE_LOBBIES,
    SUBSCRIBE_TOURNAMENT_GAMES,
    SUBSCRIBE_TOURNAMENT_LOBBIES,
    UNSUBSCRIBE_CLASSIC_GAMES,
    UNSUBSCRIBE_CLASSIC_LOBBIES,
    UNSUBSCRIBE_COOPERATIVE_GAMES,
    UNSUBSCRIBE_COOPERATIVE_LOBBIES,
    UNSUBSCRIBE_TOURNAMENT_GAMES,
    UNSUBSCRIBE_TOURNAMENT_LOBBIES,
} from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { AvailableClassicGames, AvailableClassicLobbies } from '@common/interfaces/lobby/available-classic-lobbies';
import { AvailableCooperativeGames, AvailableCooperativeLobbies } from '@common/interfaces/lobby/available-cooperative-lobbies';
import { AvailableTournamentGames, AvailableTournamentLobbies } from '@common/interfaces/lobby/available-tournament-lobbies';
import { Container, Service } from 'typedi';

@Service()
export class LobbyUpdateManager {
    lobbyManager: LobbyManager;
    gameManager: GameManager;
    tournamentManager: TournamentManager;
    classicPubSubManager: PublishSubscribeManager<AvailableClassicLobbies>;
    classicGamePubSubManager: PublishSubscribeManager<AvailableClassicGames>;
    tournamentPubSubManager: PublishSubscribeManager<AvailableTournamentLobbies>;
    tournamentGamePubSubManager: PublishSubscribeManager<AvailableTournamentGames>;
    cooperativePubSubManager: PublishSubscribeManager<AvailableCooperativeLobbies>;
    cooperativeGamePubSubManager: PublishSubscribeManager<AvailableCooperativeGames>;

    // eslint-disable-next-line max-lines-per-function -- Construction du service
    constructor() {
        this.lobbyManager = Container.get(LobbyManager);
        this.gameManager = Container.get(GameManager);
        this.tournamentManager = Container.get(TournamentManager);
        this.classicPubSubManager = new PublishSubscribeManager<AvailableClassicLobbies>({
            subEventId: SUBSCRIBE_CLASSIC_LOBBIES,
            unSubEventId: UNSUBSCRIBE_CLASSIC_LOBBIES,
            publishEventId: PUBLISH_CLASSIC_LOBBIES,
            publishContentGetter: () => this.getAvailableClassicLobbies(),
        });
        this.classicGamePubSubManager = new PublishSubscribeManager<AvailableClassicGames>({
            subEventId: SUBSCRIBE_CLASSIC_GAMES,
            unSubEventId: UNSUBSCRIBE_CLASSIC_GAMES,
            publishEventId: PUBLISH_CLASSIC_GAMES,
            publishContentGetter: () => this.getAvailableClassicGames(),
        });
        this.cooperativePubSubManager = new PublishSubscribeManager<AvailableCooperativeLobbies>({
            subEventId: SUBSCRIBE_COOPERATIVE_LOBBIES,
            unSubEventId: UNSUBSCRIBE_COOPERATIVE_LOBBIES,
            publishEventId: PUBLISH_COOPERATIVE_LOBBIES,
            publishContentGetter: () => this.getAvailableCooperativeLobbies(),
        });
        this.cooperativeGamePubSubManager = new PublishSubscribeManager<AvailableCooperativeGames>({
            subEventId: SUBSCRIBE_COOPERATIVE_GAMES,
            unSubEventId: UNSUBSCRIBE_COOPERATIVE_GAMES,
            publishEventId: PUBLISH_COOPERATIVE_GAMES,
            publishContentGetter: () => this.getAvailableCooperativeGames(),
        });
        this.tournamentPubSubManager = new PublishSubscribeManager<AvailableTournamentLobbies>({
            subEventId: SUBSCRIBE_TOURNAMENT_LOBBIES,
            unSubEventId: UNSUBSCRIBE_TOURNAMENT_LOBBIES,
            publishEventId: PUBLISH_TOURNAMENT_LOBBIES,
            publishContentGetter: () => this.getAvailableTournamentLobbies(),
        });
        this.tournamentGamePubSubManager = new PublishSubscribeManager<AvailableTournamentGames>({
            subEventId: SUBSCRIBE_TOURNAMENT_GAMES,
            unSubEventId: UNSUBSCRIBE_TOURNAMENT_GAMES,
            publishEventId: PUBLISH_TOURNAMENT_GAMES,
            publishContentGetter: () => this.getAvailableTournamentGames(),
        });
        this.lobbyManager.eventEmitter.addListener(ON_CHANGE, () => {
            this.classicPubSubManager.publish();
            this.tournamentPubSubManager.publish();
            this.cooperativePubSubManager.publish();
        });
        this.gameManager.eventEmitter.addListener(ON_CHANGE, () => {
            this.classicGamePubSubManager.publish();
            this.cooperativeGamePubSubManager.publish();
        });
        this.tournamentManager.eventEmitter.addListener(ON_CHANGE, () => {
            this.tournamentGamePubSubManager.publish();
        });
    }

    private getAvailableClassicLobbies(): AvailableClassicLobbies {
        const available: AvailableClassicLobbies = {
            availableLobbies: [],
        };

        this.lobbyManager.lobbies.forEach((lobby: Lobby) => {
            if (lobby instanceof LobbyClassic) available.availableLobbies.push(lobby.getInfo());
        });

        return available;
    }

    private getAvailableCooperativeLobbies(): AvailableCooperativeLobbies {
        const available: AvailableCooperativeLobbies = {
            availableLobbies: [],
        };

        this.lobbyManager.lobbies.forEach((lobby: Lobby) => {
            if (lobby instanceof LobbyCooperative) available.availableLobbies.push(lobby.getInfo());
        });

        return available;
    }

    private getAvailableTournamentLobbies(): AvailableTournamentLobbies {
        const available: AvailableTournamentLobbies = {
            availableLobbies: [],
        };

        this.lobbyManager.lobbies.forEach((lobby: Lobby) => {
            if (lobby instanceof LobbyTournament) available.availableLobbies.push(lobby.getInfo());
        });

        return available;
    }

    private getAvailableClassicGames(): AvailableClassicGames {
        const availableClassicGames: AvailableClassicGames = {
            availableGames: [],
        };

        this.gameManager.games.forEach((game: Game) => {
            if (game.gameConfig.gameModeName === GameModes.Classic) availableClassicGames.availableGames.push(game.getInfo());
        });

        return availableClassicGames;
    }

    private getAvailableCooperativeGames(): AvailableCooperativeGames {
        const availableCooperativeGames: AvailableCooperativeGames = {
            availableGames: [],
        };

        this.gameManager.games.forEach((game: Game) => {
            if (game.gameConfig.gameModeName === GameModes.Cooperative) availableCooperativeGames.availableGames.push(game.getInfo());
        });

        return availableCooperativeGames;
    }

    private getAvailableTournamentGames(): AvailableTournamentGames {
        const availableClassicTournaments: AvailableTournamentGames = {
            availableGames: [],
        };

        this.tournamentManager.tournaments.forEach((tournament: Tournament) => {
            if (tournament.gameConfig.gameModeName === GameModes.Tournament) availableClassicTournaments.availableGames.push(tournament.getInfo());
        });

        return availableClassicTournaments;
    }
}
