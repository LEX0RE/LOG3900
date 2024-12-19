import { FAILED_TO_CREATE_LOBBY } from '@app/constants/error/error-messages';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class LobbyController {
    router!: Router;
    private readonly service: LobbyManager;

    constructor() {
        this.service = Container.get(LobbyManager);
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
         * /api/lobby:
         *   post:
         *     description: Sert pour cree un lobby
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       201:
         */
        this.router.post('/', async (request: Request, response: Response) => {
            this.service
                .createLobby(request.body, request['user'])
                .then(() => response.status(StatusCodes.CREATED).send())
                .catch(() => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_TO_CREATE_LOBBY));
        });
    }
}
