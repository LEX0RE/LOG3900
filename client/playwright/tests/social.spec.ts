import { expect, test } from '@client/playwright/utils/electron-page';
test.describe('Social', () => {
    test('social1', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player1Name = await helper.goToManScreen(player1);
        const player2Name = await helper.goToManScreen(player2);

        await player1.getByRole('button', { name: 'Mon profil' }).click();
        await player1.getByRole('button', { name: 'Voir vos Amis' }).click();
        await player2.getByRole('button', { name: 'Mon profil' }).click();
        await player2.getByRole('button', { name: 'Voir vos Amis' }).click();

        await player1.getByPlaceholder('Rechercher un joueur').click();
        await player1.getByPlaceholder('Rechercher un joueur').fill(player2Name.source);
        await expect(player1.getByText(player2Name)).toBeVisible();
        await player1.locator('.fa').first().click();
        await player2.locator('#friend-message-list').click();
        await expect(player2.locator('#friend-message-list').getByText(player1Name)).toBeVisible();

        await player1.locator('#friend-list').click();
        await player2.locator('#friend-message-list').click();
        await player2.getByRole('img', { name: 'accept-friend' }).click();
        await player2.locator('#friend-tab').click();
        await player1.locator('#friend-tab').click();
        await expect(player2.locator('#friend-list').getByText(player1Name)).toBeVisible();

        await player2.locator('#refuse-friend').click();
        await player2.getByPlaceholder('Rechercher un joueur').fill(player1Name.source);
        await player2.getByRole('img').nth(1).click();
        await player2.locator('#friend-list').click();
        await player2.locator('#block-tab').click();
        await expect(player2.locator('#block-list').getByText(player1Name)).toBeVisible();
    });
});
