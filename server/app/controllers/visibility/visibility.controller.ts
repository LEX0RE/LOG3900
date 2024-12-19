import { VisibilityManagerPublicPass } from '@app/services/lobby/visibility-manager/public-with-password/public-with-password-manager.service';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class VisibilityController {
    router!: Router;
    private readonly visibilityManager: VisibilityManagerPublicPass;

    constructor() {
        this.visibilityManager = Container.get(VisibilityManagerPublicPass);
        this.configureRouter();
    }

    // eslint-disable-next-line max-lines-per-function -- Dans le but de bien faire l'ensemble des routes
    private configureRouter(): void {
        this.router = Router();

        /**
         * @swagger
         *
         * /api/visibility:
         *   post:
         *     description: Vérifie que si le mot de passe est correct
         *     tags:
         *       - Example
         *       - Message
         *     requestBody:
         *         description: message object
         *         required: true
         *         content:
         *           application/json:
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: ok
         */

        this.router.post('/', (req: Request, res: Response) => {
            try {
                const passwordValid = this.visibilityManager.verifyPassword(req.body);

                res.status(StatusCodes.OK).json(passwordValid);
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
            }
        });
    }
}
