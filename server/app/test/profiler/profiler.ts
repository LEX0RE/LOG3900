// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- utilisation d'une librairie sans type
const moduleAlias = require('module-alias');

moduleAlias(__dirname + '../../../../../../package.json');
import { ONE_SECOND } from '@app/constants/miscellaneous';
import { profiling } from '@app/test/profiler/under-profile';
import * as http from 'http';
import { AddressInfo } from 'net';
import { exit } from 'process';

export const profiler = (): void => {
    const httpServer = http.createServer();

    httpServer.listen(() => {
        // eslint-disable-next-line no-console -- sert a marquer le debut du serveur
        console.log(`Server is listening on port ${(httpServer.address() as AddressInfo).port}`);
    });

    setTimeout(async () => {
        // eslint-disable-next-line no-console -- sert a marquer le debut du profiling
        console.log('Profiling is starting');
        await profiling();
        // eslint-disable-next-line no-console -- sert a marquer la fin du profiling
        console.log('Profiling done');
        exit(1);
    }, 3 * ONE_SECOND);
};

profiler();
