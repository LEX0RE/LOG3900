import { HttpException } from '@app/classes/httpException/http.exception';
import { BLOCKED_PATH_DOCS, BLOCKED_PATH_EMPTY, BLOCKED_PATH_LOGIN, BLOCKED_PATH_REGISTER } from '@app/constants/blocked-path';
import { ALGORITHM, JWT_SECRET } from '@app/constants/database';
import { AuthenticationController } from '@app/controllers/authentication/authentication.controller';
import { DictionariesController } from '@app/controllers/dictionaries/dictionaries.controller';
import { GameHistoryController } from '@app/controllers/game-history/game-history.controller';
import { GameModesController } from '@app/controllers/game-modes/game-modes.controller';
import { LobbyController } from '@app/controllers/lobby/lobby.controller';
import { ReplayController } from '@app/controllers/replay/replay.controller';
import { TurnTimesController } from '@app/controllers/turn-times/turn-times.controller';
import { UserController } from '@app/controllers/user/user-controller';
import { VisibilityController } from '@app/controllers/visibility/visibility.controller';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as logger from 'morgan';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Container, Service } from 'typedi';

@Service()
export class Application {
    app: express.Application;
    private readonly internalError: number;
    private readonly swaggerOptions: swaggerJSDoc.Options;
    private dictionariesController!: DictionariesController;
    private turnTimesController!: TurnTimesController;
    private gameHistoryController!: GameHistoryController;
    private authenticationController!: AuthenticationController;
    private lobbyController!: LobbyController;
    private gameModesController!: GameModesController;
    private replayController!: ReplayController;
    private visibilityController!: VisibilityController;
    private userController!: UserController;

    constructor() {
        this.internalError = StatusCodes.INTERNAL_SERVER_ERROR;
        this.app = express();

        this.swaggerOptions = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'Cadriciel Serveur',
                    version: '1.0.0',
                },
            },
            apis: ['**/*.ts'],
        };
    }

    init() {
        this.dictionariesController = Container.get(DictionariesController);
        this.turnTimesController = Container.get(TurnTimesController);
        this.gameHistoryController = Container.get(GameHistoryController);
        this.authenticationController = Container.get(AuthenticationController);
        this.lobbyController = Container.get(LobbyController);
        this.gameModesController = Container.get(GameModesController);
        this.replayController = Container.get(ReplayController);
        this.visibilityController = Container.get(VisibilityController);
        this.userController = Container.get(UserController);
        this.config();
        this.bindRoutes();
    }

    bindRoutes(): void {
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(this.swaggerOptions)));
        this.app.use('/api/dictionaries', this.dictionariesController.router);
        this.app.use('/api/turnTimes', this.turnTimesController.router);
        this.app.use('/api/gameHistory', this.gameHistoryController.router);
        this.app.use('/api/authentication', this.authenticationController.router);
        this.app.use('/api/lobby', this.lobbyController.router);
        this.app.use('/api/gameModes', this.gameModesController.router);
        this.app.use('/api/replay', this.replayController.router);
        this.app.use('/api/visibility', this.visibilityController.router);
        this.app.use('/api/user', this.userController.router);
        this.app.use('/', (req, res) => {
            res.redirect('/api/docs');
        });
        this.errorHandling();
    }

    // eslint-disable-next-line max-lines-per-function
    private config(): void {
        this.app.use(logger('dev'));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const expectPaths: RegExp[] = [BLOCKED_PATH_LOGIN, BLOCKED_PATH_REGISTER, BLOCKED_PATH_DOCS, BLOCKED_PATH_EMPTY];

                if (!expectPaths.some((path) => path.test(req.path))) {
                    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
                        req['user'] = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, { algorithms: [ALGORITHM] });
                }

                next();
            } catch (error) {
                res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized' });
            }
        });
    }

    private errorHandling(): void {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: HttpException = new HttpException('Not Found');

            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use((err: HttpException, req: express.Request, res: express.Response) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        this.app.use((err: HttpException, req: express.Request, res: express.Response) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
