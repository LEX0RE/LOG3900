import { FAILED_GET_REPLAY } from '@app/constants/error/error-messages';
import { ReplayDatabaseManager } from '@app/services/replay-manager/replay-database-manager/replay-database-manager.service';
import { Replay } from '@common/interfaces/replay/replay';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class ReplayController {
    router!: Router;
    private readonly replayDatabaseManager: ReplayDatabaseManager;

    constructor() {
        this.replayDatabaseManager = Container.get(ReplayDatabaseManager);
        this.configureRouter();
    }

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
         * /api/replay:gameId:
         *   get:
         *     description: Retourne le replay de la partie
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         */
        this.router.get('/:gameId', async (request: Request, response: Response) => {
            this.replayDatabaseManager
                .getReplay(request.params.gameId)
                .then((replay: Replay | null) => {
                    if (!replay) return response.status(StatusCodes.NOT_FOUND).send(FAILED_GET_REPLAY);

                    return response.json(replay);
                })
                .catch(() => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_GET_REPLAY));
        });
    }
}
