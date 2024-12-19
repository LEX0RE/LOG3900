import { ERROR } from '@app/constants/error/controller';
import { GameModesService } from '@app/services/game-modes/game-modes.service';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class GameModesController {
    router!: Router;
    private readonly gameModesService: GameModesService;

    constructor() {
        this.gameModesService = Container.get(GameModesService);
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
         *   - name: Game Modes
         *     description: Games modes endpoints
         */
        /**
         * @swagger
         *
         * /api/gameModes:
         *   get:
         *     description: Retourne les types de partie disponibles
         *     tags:
         *       - Game Modes
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         schema:
         *           $ref: '#/definitions/Message'
         */
        this.router.get('/', (_request: Request, response: Response) => {
            this.gameModesService
                .getGameModes()
                .then((modes: string[]) => response.json(modes))
                .catch((reason: unknown) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ title: ERROR, body: reason as string }));
        });
    }
}
