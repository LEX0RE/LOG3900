/* eslint-disable no-console  -- on se sert de la console pour debugger ce dont on profile*/
import { memory } from '@app/classes/utils/memory/memory';
import { MEGA } from '@app/constants/miscellaneous';

const checkMaxUsedMemoryByProcess = (): void => {
    let maxMemoryConsumption = 0;

    process.nextTick(() => {
        const memUsage = process.memoryUsage();

        if (memUsage.rss > maxMemoryConsumption) maxMemoryConsumption = memUsage.rss;
    });

    process.on('exit', () => {
        console.log(`Max memory consumption: ${maxMemoryConsumption / MEGA / MEGA} MB`);
    });
};

// eslint-disable-next-line max-lines-per-function -- sert de holder pour ce que l'on veut profile
export const profiling = async (): Promise<void> => {
    checkMaxUsedMemoryByProcess();
    console.log('Memory Already used', memory(), 'MB');

    // endroit ou mettre le code qui est sous inspection

    console.log('Memory used', memory(), 'MB');
};
