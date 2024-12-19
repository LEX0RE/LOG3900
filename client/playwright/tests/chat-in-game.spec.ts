import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('ChatInGame', () => {
    test('chatInGame', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();

        const player1Name = await helper.goToManScreen(player1);
        const player2Name = await helper.goToManScreen(player2);

        await player1.getByRole('button', { name: /Classique$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.getByRole('button', { name: /Créer une partie/ }).click();
        await expect(player1.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();
        await expect(player1).toHaveURL(/lobby/);

        // Ouvrir le chat
        await player1.locator('#chat-button').click();

        // Cliquer sur le bouton d'options pour voir les chats joints
        await player1.click('#MessageAndOption button:nth-child(2)');

        // Vérifier que le player1 a bien rejoint le chat de la partie
        await expect(player1.getByRole('button', { name: `${player1Name.toString().replace(/\//g, '')}'s game` })).toBeVisible();

        await expect(player1.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();

        await player2.getByRole('button', { name: /Classique$/ }).click();

        await expect(player2.getByText(player1Name)).toBeVisible();
        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await expect(player2.getByText(player1Name)).toBeVisible();
        await expect(player2.getByText(player2Name)).toBeVisible();
        await expect(player2.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();
        await expect(player1.getByRole('button', { name: 'Démarrer la partie' })).toBeVisible();

        // Ouvrir le chat
        await player2.locator('#chat-button').click();

        // Cliquer sur le bouton d'options pour voir les chats joints
        await player2.click('#MessageAndOption button:nth-child(2)');

        // Vérifier que le player2 a bien rejoint le chat de la partie
        await expect(player2.getByRole('button', { name: `${player1Name.toString().replace(/\//g, '')}'s game` })).toBeVisible();

        // start game
        await player1.getByRole('button', { name: 'Démarrer la partie' }).click();
        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);

        await expect(player1.locator('span').filter({ hasText: player1Name }).nth(0)).toBeVisible();
        await expect(player1.locator('span').filter({ hasText: player2Name }).nth(0)).toBeVisible();
        await expect(player2.locator('span').filter({ hasText: player1Name }).nth(0)).toBeVisible();
        await expect(player2.locator('span').filter({ hasText: player2Name }).nth(0)).toBeVisible();

        // Vérifier que le player1 et le player2 sont toujours dans le chat après le début de la partie
        await expect(player1.getByRole('button', { name: `${player1Name.toString().replace(/\//g, '')}'s game` })).toBeVisible();
        await expect(player2.getByRole('button', { name: `${player1Name.toString().replace(/\//g, '')}'s game` })).toBeVisible();
    });
});
