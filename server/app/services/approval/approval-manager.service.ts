import { Game } from '@app/classes/game/game';
import { CooperativePlayer } from '@app/classes/players/cooperative-player/cooperative-player';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { ActionToApprove } from '@app/interface/action-to-approve';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import {
    ACTION_APPROVAL,
    ACTION_APPROVED_BY_ALL,
    ACTION_CANCELLATION,
    ACTION_CONFIRMATION,
    ACTION_HAS_BEEN_CANCELLED,
    ACTION_REJECTION,
    ACTION_SUGGESTION,
    APPROVALS_LIST_UPDATE,
    NEW_ACTION_TO_APPROVE,
} from '@common/constants/communication';
import { ApprovalsListUpdate } from '@common/interfaces/approvals-list-update';
import { NewActionToApprove } from '@common/interfaces/new-action-to-approve';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class ApprovalManager {
    socketManager: SocketManager;
    gameManager: GameManager;
    actionsToApprove: ActionToApprove[];

    constructor() {
        this.gameManager = Container.get(GameManager);
        this.socketManager = Container.get(SocketManager);
        this.actionsToApprove = [];
        this.configureSocket();
    }

    private configureSocket(): void {
        this.socketManager.on(ACTION_SUGGESTION, (user: User) => (command: string) => this.handleActionSuggestion(user, command));
        this.socketManager.on(ACTION_APPROVAL, (user: User) => () => this.handleActionResponse(user, true));
        this.socketManager.on(ACTION_REJECTION, (user: User) => () => this.handleActionResponse(user, false));
        this.socketManager.on(ACTION_CANCELLATION, (user: User) => () => this.removeActionToApprove(user, true));
    }

    private handleActionResponse(respondingUser: User, isApproving: boolean): void {
        const game = this.gameManager.getGameByPlayerId(respondingUser.id);
        const player: CooperativePlayer = game?.getPlayer(respondingUser) as CooperativePlayer;
        const actionToApprove = this.actionsToApprove.find((action: ActionToApprove) => action.gameId === game?.gameId) || null;

        if (!game || !player || !actionToApprove) return;
        if (player.id === actionToApprove.actionPlayer.id) return;
        const listToAddUserTo = isApproving ? actionToApprove.approvalsFromPlayers : actionToApprove.rejectionsFromPlayers;
        const listToRemoveUserFrom = isApproving ? actionToApprove.rejectionsFromPlayers : actionToApprove.approvalsFromPlayers;

        if (listToAddUserTo.includes(player)) return;
        listToAddUserTo.push(player);
        this.removePlayerFromList(listToRemoveUserFrom, player);
        this.removePlayerFromList(actionToApprove.noResponsePlayers, player);
        this.sendUpdatedApprovalsList(game, actionToApprove);
        this.verifyHasAllRequiredApproval(actionToApprove);
    }

    private handleActionSuggestion(user: User, command: string) {
        const game = this.gameManager.getGameByPlayerId(user.id);
        const player: CooperativePlayer = game?.getPlayer(user) as CooperativePlayer;

        if (!game || !player) return;

        if (this.isNoActionForGame(game)) {
            const actionToApprove = this.addActionToApprove(command, game, player);
            const newActionToSend: NewActionToApprove = {
                command,
                actionPlayerName: player.name,
            };

            game.players.forEach((playerToSendTo) => {
                if (player.id !== playerToSendTo.id) this.socketManager.sendPrivate(NEW_ACTION_TO_APPROVE, playerToSendTo.id, newActionToSend);
            });
            this.sendUpdatedApprovalsList(game, actionToApprove);
        }
    }

    private isNoActionForGame(game: Game): boolean {
        let noActionForGame = true;

        this.actionsToApprove.forEach((action) => {
            if (action.gameId === game.gameId) noActionForGame = false;
        });
        return noActionForGame;
    }

    private addActionToApprove(actionToApprove: string, game: Game, actionPlayer: CooperativePlayer): ActionToApprove {
        const newActionToApprove = {
            action: actionToApprove,
            gameId: game.gameId,
            actionPlayer,
            approvalsFromPlayers: [],
            rejectionsFromPlayers: [],
            noResponsePlayers: this.initializeNoResponsePlayers(game, actionPlayer.id),
        };

        this.actionsToApprove.push(newActionToApprove);
        return newActionToApprove;
    }

    private verifyHasAllRequiredApproval(actionToApprove: ActionToApprove): void {
        const game = this.gameManager.getGame(actionToApprove.gameId);

        if (!game) return;
        if (this.isApprovedByAll(game, actionToApprove)) {
            this.removeActionToApprove(actionToApprove.actionPlayer, false);
            game.players.forEach((player) =>
                this.socketManager.sendPrivate(
                    player.id === actionToApprove.actionPlayer.id ? ACTION_CONFIRMATION : ACTION_APPROVED_BY_ALL,
                    player.id,
                ),
            );
        }
    }

    private isApprovedByAll(game: Game, actionToApprove: ActionToApprove): boolean {
        return (
            actionToApprove.approvalsFromPlayers.length === game.players.length - 1 &&
            actionToApprove.rejectionsFromPlayers.length === 0 &&
            actionToApprove.noResponsePlayers.length === 0
        );
    }

    private removeActionToApprove(cancellingActionPlayer: User, isCancelled: boolean): void {
        const game = this.gameManager.getGameByPlayerId(cancellingActionPlayer.id);
        const actionPlayer: CooperativePlayer = game?.getPlayer(cancellingActionPlayer) as CooperativePlayer;
        const actionToRemove = this.actionsToApprove.find((action: ActionToApprove) => action.actionPlayer === actionPlayer) || null;

        if (!game || !actionPlayer || !actionToRemove) return;
        const actionIndex = this.actionsToApprove.indexOf(actionToRemove);

        this.actionsToApprove.splice(actionIndex, 1);
        const messageToSend = isCancelled ? ACTION_HAS_BEEN_CANCELLED : ACTION_APPROVED_BY_ALL;

        game.players.forEach((player) => {
            if (player.id !== cancellingActionPlayer.id) this.socketManager.sendPrivate(messageToSend, player.id);
        });
    }

    private initializeNoResponsePlayers(game: Game, actionPlayerId: string): CooperativePlayer[] {
        const noResponsePlayers: CooperativePlayer[] = [];

        game.players.forEach((player) => {
            if (player.id !== actionPlayerId) noResponsePlayers.push(player as CooperativePlayer);
        });
        return noResponsePlayers;
    }

    private sendUpdatedApprovalsList(game: Game, updatedAction: ActionToApprove): void {
        const approvalsFromPlayersNames: string[] = [];
        const rejectionsFromPlayersNames: string[] = [];
        const noResponsePlayersNames: string[] = [];

        updatedAction.approvalsFromPlayers.forEach((player: CooperativePlayer) => approvalsFromPlayersNames.push(player.name));
        updatedAction.rejectionsFromPlayers.forEach((player: CooperativePlayer) => rejectionsFromPlayersNames.push(player.name));
        updatedAction.noResponsePlayers.forEach((player: CooperativePlayer) => noResponsePlayersNames.push(player.name));

        const approvalsListUpdate: ApprovalsListUpdate = {
            approvingPlayersNames: approvalsFromPlayersNames,
            rejectingPlayersNames: rejectionsFromPlayersNames,
            noResponsePlayersNames,
        };

        game.players.forEach((player) => this.socketManager.sendPrivate(APPROVALS_LIST_UPDATE, player.id, approvalsListUpdate));
    }

    private removePlayerFromList(list: CooperativePlayer[], player: CooperativePlayer): void {
        const index = list.indexOf(player);

        if (index !== INDEX_NOT_FOUND) list.splice(index, 1);
    }
}
