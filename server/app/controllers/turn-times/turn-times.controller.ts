import { ERROR } from '@app/constants/error/controller';
import { TurnTimesService } from '@app/services/turn-times/turn-times.service';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class TurnTimesController {
    router!: Router;
    private readonly turnTimesService: TurnTimesService;

    constructor() {
        this.turnTimesService = Container.get(TurnTimesService);
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
         * /api/turnTimes:
         *   get:
         *     description: Retourne les CommonTimer pour les parties
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         schema:
         *           $ref: '#/definitions/Message'
         */
        this.router.get('/', (req: Request, res: Response) => {
            this.turnTimesService
                .getTurnTimes()
                .then((turnTimes: CommonTimer[]) => res.json(turnTimes))
                .catch((reason: unknown) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ title: ERROR, body: reason as string }));
        });
    }
}
