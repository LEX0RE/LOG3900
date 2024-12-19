import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('Replay', () => {
    test('replay1', async ({ page, helper }) => {
        await helper.goToManScreen(page, { userName: 'ReplayTester', password: '12345678' });

        await page.getByRole('button', { name: 'Mon profil' }).click();

        await page.getByRole('button', { name: 'Historique' }).click();

        for (let i = 0; i < 2; i++) {
            await expect(page.getByRole('heading', { name: 'Historique des parties jouées' })).toBeVisible();
            await page.locator('.horizontalContainer > div:nth-child(4)').first().click();
            await expect(page).toHaveURL(/replay/);

            await helper.testReplayPlusMinusButton(page);

            await expect(page.getByRole('button', { name: 'ReplayTester' })).toBeDisabled();
            await page.getByRole('button', { name: 'Testb1cff104-dc' }).click();
            await expect(page.getByRole('button', { name: 'ReplayTester' })).toBeEnabled();
            await expect(page.getByRole('button', { name: 'Testb1cff104-dc' })).toBeDisabled();

            await page.getByRole('button', { name: '← Retour' }).click();
            await expect(page).toHaveURL(/history/);
        }
    });
});
