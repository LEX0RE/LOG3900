import { FAILED_TO_GET_USER_CONNECTIONS, FAILED_TO_UPDATE_USER } from '@app/constants/error/error-messages';
import { ConnectionManager } from '@app/services/connection-manager/connection-manager';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { User } from '@common/interfaces/user/user';
import { UserConnections } from '@common/interfaces/user/user-connections';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class UserController {
    router!: Router;
    private readonly userManager: UsersManager;
    private readonly userConnectionsManager: ConnectionManager;

    constructor() {
        this.userManager = Container.get(UsersManager);
        this.userConnectionsManager = Container.get(ConnectionManager);
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
         * /api/user:
         *   patch:
         *     description: Sert pour mettre a jour un user
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         schema:
         *           $ref: '#/definitions/Message'
         */
        this.router.patch('/', async (request: Request, response: Response) => {
            const user: User = request['user'];

            this.userManager
                .updateUser(user, request.body)
                .then(async () => response.status(StatusCodes.OK).send(await this.userManager.getUserById(user.id)))
                .catch((error) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_TO_UPDATE_USER + error));
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
         * /api/user:
         *   get:
         *     description: Sert a obtenir les connexions
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         schema:
         *           $ref: '#/definitions/Message'
         */
        this.router.get('/connections', async (request: Request, response: Response) => {
            const user: User = request['user'];

            this.userConnectionsManager
                .getConnections(user)
                .then((connections: UserConnections | null) => {
                    if (connections === null) connections = { userId: user.id, connections: [] };
                    response.status(StatusCodes.OK).send({ ...connections, connections: connections.connections.reverse() });
                })
                .catch(() => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FAILED_TO_GET_USER_CONNECTIONS));
        });
    }
}
