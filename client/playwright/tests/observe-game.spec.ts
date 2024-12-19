import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('Observe', () => {
    test('ObserveCoop', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();
        const player4 = await createPage();

        const player1Name = await helper.goToManScreen(player1);

        await helper.goToManScreen(player2);
        await helper.goToManScreen(player3);
        await helper.goToManScreen(player4);

        await player1.getByRole('button', { name: /Coopératif$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.getByRole('button', { name: /Créer une partie/ }).click();

        await player2.getByRole('button', { name: /Coopératif$/ }).click();
        await player3.getByRole('button', { name: /Coopératif$/ }).click();
        await player4.getByRole('button', { name: /Coopératif$/ }).click();

        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();
        await player1.getByRole('button', { name: 'Démarrer la partie' }).click();

        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);
        await expect(player3).toHaveURL(/observe/);

        await player4.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();
        await expect(player4).toHaveURL(/observe/);
    });

    test('ObserveTournament', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();
        const player4 = await createPage();

        const player1Name = await helper.goToManScreen(player1);
        const player2Name = await helper.goToManScreen(player2);

        await helper.goToManScreen(player3);

        // joinable tournament page must be empty
        await player2.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await expect(player2.getByText(player1Name)).toBeHidden();

        // create tournament
        await player1.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player1.getByRole('button', { name: 'Créer un tournoi' }).click();
        await player1.getByRole('button', { name: 'Créer un tournoi', exact: true }).click();

        // player 2 joins tournament
        await expect(player2.getByText(player1Name)).toBeVisible();
        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        // player 3 observe tournament
        await player3.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();

        // start tournament
        await expect(player1.getByRole('button', { name: 'Démarrer le tournoi', exact: true })).toBeVisible();
        await player1.getByRole('button', { name: 'Démarrer le tournoi' }).click();

        await expect(player1).toHaveURL(/bracket/);
        await expect(player2).toHaveURL(/bracket/);
        await expect(player3).toHaveURL(/bracket/);

        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);
        await player3.locator('app-bracket-node').filter({ hasText: player1Name }).getByRole('button', { name: 'Observer' }).click();
        await expect(player3).toHaveURL(/observe/);

        // player 4 observe tournament after it started
        await helper.goToManScreen(player4);
        await player4.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player4.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();
        await expect(player4).toHaveURL(/bracket/);
        await player4.locator('app-bracket-node').filter({ hasText: player2Name }).getByRole('button', { name: 'Observer' }).click();
        await expect(player4).toHaveURL(/observe/);
    });

    test('ObserveLobby', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();

        const player1Name = await helper.goToManScreen(player1);

        await helper.goToManScreen(player2);
        await helper.goToManScreen(player3);

        await player1.getByRole('button', { name: /Classique$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.getByRole('button', { name: /Créer une partie/ }).click();

        await player2.getByRole('button', { name: /Classique$/ }).click();
        await player3.getByRole('button', { name: /Classique$/ }).click();

        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();
        await player1.getByRole('button', { name: 'Démarrer la partie' }).click();

        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);
        await expect(player3).toHaveURL(/observe/);
    });

    test('ObserveGame', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();

        const player1Name = await helper.goToManScreen(player1);

        await helper.goToManScreen(player2);
        await helper.goToManScreen(player3);

        await player1.getByRole('button', { name: /Classique$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.getByRole('button', { name: /Créer une partie/ }).click();

        await player2.getByRole('button', { name: /Classique$/ }).click();
        await player3.getByRole('button', { name: /Classique$/ }).click();

        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await player1.getByRole('button', { name: 'Démarrer la partie' }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();

        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);
        await expect(player3).toHaveURL(/observe/);
    });

    test('ObserveGameWithPassword', async ({ page, helper, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();

        const player1Name = await helper.goToManScreen(player1);

        await helper.goToManScreen(player2);
        await helper.goToManScreen(player3);

        await player1.getByRole('button', { name: /Classique$/ }).click();
        await player1.getByRole('button', { name: /Créer une nouvelle partie/ }).click();
        await player1.locator('#passwordCheckbox').check();
        await player1.locator('.passwordInput').fill('password');
        await player1.getByRole('button', { name: /Créer une partie/ }).click();

        await player2.getByRole('button', { name: /Classique$/ }).click();
        await player3.getByRole('button', { name: /Classique$/ }).click();

        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await player2.locator('input').fill('password');
        await player2.getByRole('button', { name: /Allez à la partie/ }).click();
        await player1.getByRole('button', { name: 'Démarrer la partie' }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'observeButton' }).click();
        await player3.locator('input').fill('password');
        await player3.getByRole('button', { name: /Allez à la partie/ }).click();

        await expect(player1).toHaveURL(/game/);
        await expect(player2).toHaveURL(/game/);
        await expect(player3).toHaveURL(/observe/);
    });
});
