import { ERROR } from '@app/constants/error/controller';
import { ClientDictionary, DictionaryWithWords } from '@app/interface/dictionary-interface';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';

@Service()
export class DictionariesController {
    router!: Router;
    private readonly dictionariesService: DictionaryService;

    constructor() {
        this.dictionariesService = Container.get(DictionaryService);
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
         * /api/dictionaries:
         *   get:
         *     description: Retourne le dictionnaire correspondant au titre
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         schema:
         *           $ref: '#/definitions/Message'
         */
        this.router.get('/:title', (request: Request, response: Response) => {
            this.dictionariesService
                .getDictionaryDownload(request.params.title)
                .then((dictionary: DictionaryWithWords) => response.json(dictionary))
                .catch((error: Error) => response.status(StatusCodes.NOT_FOUND).send(error.message));
        });

        /**
         * @swagger
         *
         * /api/dictionaries:
         *   get:
         *     description: Retourne les dictionnaires et leur description
         *     tags:
         *       - Time
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         schema:
         *           $ref: '#/definitions/Message'
         */
        this.router.get('/', (_request: Request, response: Response) => {
            this.dictionariesService
                .getDictionaries()
                .then((dictionaries: ClientDictionary[]) => response.json(dictionaries))
                .catch((reason: unknown) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ title: ERROR, body: reason as string }));
        });
    }
}
