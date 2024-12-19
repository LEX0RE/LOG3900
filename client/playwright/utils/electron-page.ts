/* eslint-disable no-empty-pattern -- Pour pouvoir utiliser les fixtures*/
import { TestHelper } from '@client/playwright/utils/helper';
import { ElectronApplication, Page, test as base, _electron as electron, expect } from '@playwright/test';

type ElectronInstance = {
    index: number;
    page: Page;
    app: ElectronApplication;
};

export type TestOptions = {
    page: Page;
    instances: ElectronInstance[];
    helper: TestHelper;
    createPage: () => Promise<Page>;
};

const startElectron = async (savePath: string, index: number): Promise<ElectronInstance> => {
    // Création de la fixture.
    const electronApp = await electron.launch({
        args: ['--disable_splash_screen', 'main.js'],
        recordVideo: { dir: savePath },
    });

    await electronApp.context().tracing.start({ screenshots: true, snapshots: true, sources: true });
    const page = await electronApp.firstWindow();

    // Pour s'assurer que la page est stable
    expect(electronApp.windows().length).toBe(1);
    await page.getByText('Scrabble', { exact: true }).waitFor({ state: 'visible' });

    await page.screenshot({ path: `${savePath}/test-start.png` });

    return { index, page, app: electronApp } as ElectronInstance;
};

export const test = base.extend<TestOptions>({
    instances: [[], { option: true }],
    page: [
        async ({ instances }, use, testInfo) => {
            const electronInstance = await startElectron(testInfo.outputDir, 0);

            // Utilisation de la fixture dans le test
            await use(electronInstance.page);

            // Suppression des autres pages créées
            while (instances.length) {
                const savePath = `${testInfo.outputDir}/createdPage-${instances[0].index}`;

                await instances[0].page.screenshot({ path: `${savePath}/test-finished.png` });
                await instances[0].app.context().tracing.stop({ path: `${savePath}/trace.zip` });
                await instances[0].app.close();
                instances.shift();
            }

            // Suppression de la fixture
            await electronInstance.page.screenshot({ path: `${testInfo.outputDir}/test-finished.png` });
            await electronInstance.app.context().tracing.stop({ path: `${testInfo.outputDir}/trace.zip` });
            await electronInstance.app.close();
        },
        { scope: 'test', timeout: 0 },
    ],
    helper: async ({}, use) => {
        use(new TestHelper());
    },
    createPage: [
        async ({ instances }, use, testInfo) => {
            await use(async () => {
                const savePath = `${testInfo.outputDir}/createdPage-${instances.length + 1}`;
                const electronInstance = await startElectron(savePath, instances.length + 1);

                instances.push(electronInstance);

                return electronInstance.page;
            });
        },
        { scope: 'test', timeout: 0 },
    ],
});

export { expect } from '@playwright/test';
