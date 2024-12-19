import { goToMainScreen } from '@client/playwright/utils';
import { expect, test } from '@client/playwright/utils/electron-page';
import { Page } from '@playwright/test';

const willPlayGame = async (page: Page) => {
    const currentNode = page.locator('#current-node').filter({ has: page.locator('.self') });

    return !(await currentNode.locator('.mdiv').isVisible());
};

test.describe('Tournament', () => {
    test('Users can use tournament lobby', async ({ page, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();

        const player1Name = new RegExp((await goToMainScreen(player1)).username);
        const player2Name = new RegExp((await goToMainScreen(player2)).username);
        const player3Name = new RegExp((await goToMainScreen(player3)).username);

        await player1.getByRole('button', { name: 'Tournoi', exact: true }).click();

        await player2.getByRole('button', { name: 'Tournoi', exact: true }).click();

        await player1.getByRole('button', { name: 'Créer un tournoi' }).click();
        await player1.getByRole('button', { name: 'Créer un tournoi', exact: true }).click();
        await expect(player1.getByRole('button', { name: 'Démarrer le tournoi', exact: true })).toBeHidden();

        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        await expect(player2.getByText(player1Name)).toBeVisible();
        await expect(player2.getByText(player2Name)).toBeVisible();
        await expect(player1.getByText(player1Name)).toBeVisible();
        await expect(player1.getByText(player2Name)).toBeVisible();

        await player3.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        for (const player of [player1, player2, player3]) {
            for (const playerName of [player1Name, player2Name, player3Name]) {
                await expect(player.getByText(playerName)).toBeVisible();
            }
        }

        await expect(player1.getByRole('button', { name: 'Démarrer le tournoi', exact: true })).toBeVisible();
        await expect(player2.getByRole('button', { name: 'Démarrer le tournoi', exact: true })).toBeHidden();
        await expect(player3.getByRole('button', { name: 'Démarrer le tournoi', exact: true })).toBeHidden();

        await player3.getByRole('button', { name: '← Retour', exact: true }).click();
        for (const player of [player1, player2]) {
            await expect(player.getByText(player3Name)).toBeHidden();
        }
        await player3.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await expect(player3.getByRole('button', { name: 'Créer un tournoi' })).toBeVisible();
    });

    test('Users can see current open tournament lobby', async ({ page, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();

        const player1Name = new RegExp((await goToMainScreen(player1)).username);
        const player2Name = new RegExp((await goToMainScreen(player2)).username);
        const player3Name = new RegExp((await goToMainScreen(player3)).username);

        await player1.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player2.getByRole('button', { name: 'Tournoi', exact: true }).click();

        await player1.getByRole('button', { name: 'Créer un tournoi', exact: true }).click();
        await player1.getByRole('button', { name: 'Créer un tournoi', exact: true }).click();
        await expect(player1.getByRole('button', { name: 'Démarrer le tournoi', exact: true })).toBeHidden();

        await expect(player2.getByText(player1Name)).toBeVisible();
        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await expect(player2.getByText(player1Name)).toBeVisible();
        await expect(player2.getByText(player2Name)).toBeVisible();
        await expect(player1.getByText(player1Name)).toBeVisible();
        await expect(player1.getByText(player2Name)).toBeVisible();

        await player3.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        for (const player of [player1, player2, player3]) {
            for (const playerName of [player1Name, player2Name, player3Name]) {
                await expect(player.getByText(playerName)).toBeVisible();
            }
        }

        await player3.getByRole('button', { name: '← Retour', exact: true }).click();
        for (const player of [player1, player2]) {
            await expect(player.getByText(player3Name)).toBeHidden();
        }
        await player3.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await expect(player3.getByRole('button', { name: 'Créer un tournoi', exact: true })).toBeVisible();
    });

    test('Users play tournament mode', async ({ page, createPage }) => {
        const player1 = page;
        const player2 = await createPage();
        const player3 = await createPage();
        const player4 = await createPage();

        const player1Name = new RegExp((await goToMainScreen(player1)).username);

        await goToMainScreen(player2);
        await goToMainScreen(player3);
        await goToMainScreen(player4);

        await player1.getByRole('button', { name: 'Tournoi', exact: true }).click();

        await player2.getByRole('button', { name: 'Tournoi', exact: true }).click();

        await player1.getByRole('button', { name: 'Créer un tournoi', exact: true }).click();
        await player1.getByRole('button', { name: 'Créer un tournoi', exact: true }).click();

        await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        await player3.getByRole('button', { name: 'Tournoi', exact: true }).click();
        await player4.getByRole('button', { name: 'Tournoi', exact: true }).click();

        await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
        await player4.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();

        await expect(player1.getByRole('button', { name: 'Démarrer le tournoi' })).toBeVisible();

        await player1.getByRole('button', { name: 'Démarrer le tournoi' }).click();

        await player4.getByRole('button', { name: 'Abandonner' }).click();
        await player4.getByRole('button', { name: 'Oui' }).click();
        await expect(player4.getByRole('button', { name: 'Tournoi', exact: true })).toBeVisible();

        const players: Page[] = [];
        const remainingPlayers: Page[] = [];

        for (const player of [player1, player2, player3]) {
            if (await willPlayGame(player)) players.push(player);
            else remainingPlayers.push(player);
        }

        for (const player of players) {
            await expect(player.getByRole('button', { name: 'Passer' })).toBeVisible();
        }

        await players[0].getByRole('button', { name: 'Abandonner' }).click();
        await players[0].getByRole('button', { name: 'Oui' }).click();

        await players[1].getByRole('button', { name: 'OK' }).click();
        await players[1].getByRole('button', { name: 'Quitter' }).click();
    });
});
