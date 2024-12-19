import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('PlayGame', () => {
    test('playGame', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();
        const player4 = await createPage();

        const player1Name = await helper.goToManScreen(player1);
        const player2Name = await helper.goToManScreen(player2);
        const player3Name = await helper.goToManScreen(player3);
        const player4Name = await helper.goToManScreen(player4);

        await player1.getByRole('button', { name: /Classique$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.getByRole('button', { name: /Créer une partie/ }).click();
        await expect(player1.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();

        await player2.getByRole('button', { name: /Classique$/ }).click();
        await player3.getByRole('button', { name: /Classique$/ }).click();
        await player4.getByRole('button', { name: /Classique$/ }).click();

        await expect(player2.getByText(player1Name)).toBeVisible();
        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await expect(player2.getByText(player1Name)).toBeVisible();
        await expect(player2.getByText(player2Name)).toBeVisible();
        await expect(player2.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();
        await expect(player1.getByRole('button', { name: 'Démarrer la partie' })).toBeVisible();

        const lobbyLine = player3.locator('.lobby-line').filter({ hasText: player1Name });
        await expect(lobbyLine.getByText(player1Name)).toBeVisible();
        await expect(lobbyLine.locator('.column-item').nth(3).filter({ hasText: '2' })).toBeVisible();
        await expect(lobbyLine.locator('.column-item').nth(4).filter({ hasText: '2' })).toBeVisible();
        await expect(lobbyLine.getByText('1:00')).toBeVisible();
        await expect(lobbyLine.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();

        // go check if lobby get destroyed
        await player1.getByRole('button', { name: /Retour$/ }).click();
        await expect(player3.getByText(player2Name)).toBeVisible();
        await player2.getByRole('button', { name: /Retour$/ }).click();
        await expect(player3.getByText(player2Name)).toBeHidden();

        // create game again
        await player1.getByRole('button', { name: /Classique$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.getByRole('button', { name: /Créer une partie/ }).click();

        // player 2 join
        await player2.getByRole('button', { name: /Classique$/ }).click();
        await expect(player2.getByText(player1Name)).toBeVisible();
        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await expect(player2.getByText(player1Name)).toBeVisible();
        await expect(player2.getByText(player2Name)).toBeVisible();

        // player 3 join
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await expect(player3.getByText(player1Name)).toBeVisible();
        await expect(player3.getByRole('button', { name: 'Démarrer la partie' })).toBeHidden();
        await expect(player3.getByText(player1Name)).toBeVisible();
        await expect(player3.getByText(player2Name)).toBeVisible();
        await expect(player3.getByText(player3Name)).toBeVisible();
        await expect(player2.getByText(player1Name)).toBeVisible();
        await expect(player2.getByText(player2Name)).toBeVisible();
        await expect(player2.getByText(player3Name)).toBeVisible();

        // player 4 join
        await expect(player4.getByText(player1Name)).toBeVisible();
        await player4.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        const everyBodySeeEveryBody = async () => {
            await expect(player1.getByText(player1Name)).toBeVisible();
            await expect(player1.getByText(player2Name)).toBeVisible();
            await expect(player1.getByText(player3Name)).toBeVisible();
            await expect(player1.getByText(player4Name)).toBeVisible();
            await expect(player2.getByText(player1Name)).toBeVisible();
            await expect(player2.getByText(player2Name)).toBeVisible();
            await expect(player2.getByText(player3Name)).toBeVisible();
            await expect(player2.getByText(player4Name)).toBeVisible();
            await expect(player3.getByText(player1Name)).toBeVisible();
            await expect(player3.getByText(player2Name)).toBeVisible();
            await expect(player3.getByText(player3Name)).toBeVisible();
            await expect(player3.getByText(player4Name)).toBeVisible();
            await expect(player4.getByText(player1Name)).toBeVisible();
            await expect(player4.getByText(player2Name)).toBeVisible();
            await expect(player4.getByText(player3Name)).toBeVisible();
            await expect(player4.getByText(player4Name)).toBeVisible();
        };

        await everyBodySeeEveryBody();

        // start game
        await player1.getByRole('button', { name: 'Démarrer la partie' }).click();
        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);
        await expect(player3).toHaveURL(/game/);
        await expect(player4).toHaveURL(/game/);

        await everyBodySeeEveryBody();

        // player 4 abandon
        await player4.getByRole('button', { name: /Abandonner/ }).click();
        await player4.getByRole('button', { name: /Non/ }).click();
        await expect(player4).toHaveURL(/game/);
        await player4.getByRole('button', { name: /Abandonner/ }).click();
        await player4.getByRole('button', { name: /Oui/ }).click();
        await expect(player4).toHaveURL(/home/);
        await expect(player3.getByText(player4Name)).toBeHidden();

        const skip = async () => {
            if (await player1.getByRole('button', { name: /Passer/ }).isEnabled()) await player1.getByRole('button', { name: /Passer/ }).click();
            if (await player2.getByRole('button', { name: /Passer/ }).isEnabled()) await player2.getByRole('button', { name: /Passer/ }).click();
            if (await player3.getByRole('button', { name: /Passer/ }).isEnabled()) await player3.getByRole('button', { name: /Passer/ }).click();
        };

        await skip();
        await skip();
        await skip();
        await skip();
        await skip();
    });
});
