import { UsersManager } from '@app/services/users-manager/users-manager';
import { Profile } from '@common/interfaces/profile';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class AuthenticationController {
    router!: Router;
    private readonly usersManager: UsersManager;

    constructor() {
        this.usersManager = Container.get(UsersManager);
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        /**
         * @swagger
         *
         * /api/authentication/register:
         *   post:
         *     description: Ajoute un utilisateur à la base de données
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
         *       201:
         *         description: Created
         *       409:
         *         description: User already exist
         */
        this.router.post('/register', async (req: Request, res: Response) => {
            this.usersManager
                .addUser(req.body)
                .then((user: Profile | null) => res.status(StatusCodes.CREATED).json(user))
                .catch((error) => res.status(StatusCodes.CONFLICT).send(error));
        });

        /**
         * @swagger
         *
         * /api/authentication/login:
         *   post:
         *     description: Valide que le pseudonyme et mot de passe sont correctes.
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
         *         description: Return user with token
         *       400:
         *         description: Invalid credentials
         */
        this.router.post('/login', async (req: Request, res: Response) => {
            this.usersManager
                .validateUser(req.body)
                .then((user: Profile | null) => res.status(StatusCodes.OK).json(user))
                .catch((error) => res.status(StatusCodes.BAD_REQUEST).send(error));
        });
    }
}
