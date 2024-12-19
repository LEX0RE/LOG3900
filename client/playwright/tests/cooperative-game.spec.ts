import { findActivePlayer, findNonActivePlayer, getKeyboardKeyWithLetter, getLetterInEasel } from '@client/playwright/utils';
import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('CooperativeGame', () => {
    test('Active player can propose a letter placement and other players can approve it', async ({ page, helper, createPage }) => {
        const page1 = await createPage();
        const page2 = await createPage();
        const page3 = await createPage();

        const player1Name = await helper.goToManScreen(page);

        await helper.goToManScreen(page1);
        await helper.goToManScreen(page2);
        await helper.goToManScreen(page3);

        const coopText = 'Coopératif';

        await page.getByRole('button', { name: coopText }).click();
        await page.getByRole('button', { name: 'Créer une nouvelle partie' }).click();
        await page.getByRole('button', { name: 'Créer une partie' }).click();
        await page1.getByRole('button', { name: coopText }).click();
        await page1.getByRole('img', { name: 'joinButton' }).click();
        await page2.getByRole('button', { name: coopText }).click();
        await page2.getByRole('img', { name: 'joinButton' }).click();
        await page3.getByRole('button', { name: coopText }).click();
        await page3.getByRole('img', { name: 'joinButton' }).click();
        await expect(page.getByText(player1Name)).toBeVisible();
        await page.getByRole('button', { name: 'Démarrer la partie' }).click();
        await expect(page.getByText('Chargement de la partie')).toBeHidden();
        await expect(page1.getByText('Chargement de la partie')).toBeHidden();
        await expect(page2.getByText('Chargement de la partie')).toBeHidden();
        await expect(page3.getByText('Chargement de la partie')).toBeHidden();
        const activePlayer = await findActivePlayer([page, page1, page2, page3]);
        const easelLetters = await getLetterInEasel(activePlayer);
        const nonActivePlayers = findNonActivePlayer([page, page1, page2, page3], activePlayer);

        await activePlayer.locator('#canvas').click({
            position: {
                x: 289,
                y: 278,
            },
        });
        await activePlayer.locator('#canvas').press(getKeyboardKeyWithLetter(easelLetters[0]));
        await activePlayer.locator('#canvas').press(getKeyboardKeyWithLetter(easelLetters[1]));
        await activePlayer.getByRole('button', { name: 'Proposer' }).click();
        for (const nonActivePlayer of nonActivePlayers) await nonActivePlayer.getByRole('button', { name: 'Approuver' }).click();
    });
});
