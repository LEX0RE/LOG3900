import { FAILED_GET_HISTORY, FAILED_GET_STATISTICS } from '@app/constants/error/error-messages';
import { GameHistoryDatabase } from '@app/services/game-history-manager/game-history-database/game-history-database.service';
import { TournamentStatisticService } from '@app/services/tournament-statistic/tournament-statistic.service';
import { GameHistories } from '@common/interfaces/replay/game-histories';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { User } from '@common/interfaces/user/user';
import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class GameHistoryController {
    router!: Router;
    private readonly gameHistoryService: GameHistoryDatabase;
    private readonly tournamentsStatisticService: TournamentStatisticService;

    constructor() {
        this.gameHistoryService = Container.get(GameHistoryDatabase);
        this.tournamentsStatisticService = Container.get(TournamentStatisticService);
        this.configureRouter();
    }

    // eslint-disable-next-line max-lines-per-function
    private configureRouter(): void {
        this.router = Router();

        /**
         * @swagger
         *
         * definitions:
         *   Message:
         *     type: object
         *     properties:
         *       title:
         *         type: string
         *       body:
         *         type: string
         */

        /**
         * @swagger
         * tags:
         *   - name: Time
         *     description: Time endpoints
         */

        /**
         * @swagger
         *
         * /api/gameHistory:
         *   get:
         *     description: Retourne l'historique des parties
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         */
        this.router.get('/', async (request: Request, response: Response) => {
            const user: User = request['user'];

            this.gameHistoryService
                .getHistory(user)
                .then((gameInfoHistory: GameInfoHistory[]) => {
                    const gameHistories: GameHistories = {
                        gameHistories: gameInfoHistory,
                    };

                    response.json(gameHistories);
                })
                .catch(() => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_GET_HISTORY));
        });

        /**
         * @swagger
         *
         * definitions:
         *   Message:
         *     type: object
         *     properties:
         *       title:
         *         type: string
         *       body:
         *         type: string
         */

        /**
         * @swagger
         * tags:
         *   - name: Time
         *     description: Time endpoints
         */

        /**
         * @swagger
         *
         * /api/gameHistory/statistic:
         *   get:
         *     description: Retourne les statistiques des parties
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         */
        this.router.get('/statistic', async (request: Request, response: Response) => {
            const user: User = request['user'];

            this.gameHistoryService
                .getUserGameStatistic(user)
                .then((statistic: UserGameStatistic) => response.status(StatusCodes.OK).json(statistic))
                .catch(() => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_GET_STATISTICS));
        });

        /**
         * @swagger
         *
         * definitions:
         *   Message:
         *     type: object
         *     properties:
         *       title:
         *         type: string
         *       body:
         *         type: string
         */

        /**
         * @swagger
         * tags:
         *   - name: Time
         *     description: Time endpoints
         */

        /**
         * @swagger
         *
         * /api/gameHistory/statistic/tournament:
         *   get:
         *     description: Retourne les statistiques des tournois
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         */
        this.router.get('/statistic/tournament', async (request: Request, response: Response) => {
            const user: User = request['user'];

            if (!user) return response.status(StatusCodes.UNAUTHORIZED).send(FAILED_GET_STATISTICS);
            return this.tournamentsStatisticService
                .getStatisticForUser(user.id)
                .then((statistic: UserTournamentStatistic) => response.status(StatusCodes.OK).json(statistic))
                .catch(() => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_GET_STATISTICS));
        });
    }
}
