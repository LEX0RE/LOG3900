import { expect, test } from '@client/playwright/utils/electron-page';

test('JoinPrivateGame', async ({ page, helper, createPage }) => {
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
    await player1.locator('span').first().click();
    await player1.getByRole('button', { name: /Créer une partie/ }).click();

    await player2.getByRole('button', { name: /Classique$/ }).click();
    await player3.getByRole('button', { name: /Classique$/ }).click();
    await player4.getByRole('button', { name: /Classique$/ }).click();

    // accept second player
    await expect(player1.getByText('veut rejoindre la partie')).toBeHidden();
    await expect(player2.getByText("En attente de l'approbation du créateur.")).toBeHidden();
    await player2.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
    await expect(player1.getByText('veut rejoindre la partie')).toBeVisible();
    await expect(player2.getByText("En attente de l'approbation du créateur.")).toBeVisible();
    await player1.getByRole('button', { name: 'Accepter' }).click();
    await expect(player1.getByText('veut rejoindre la partie')).toBeHidden();
    await expect(player2.getByText("En attente de l'approbation du créateur.")).toBeHidden();
    await expect(player1.getByText(player2Name)).toBeVisible();
    await expect(player2.getByText(player2Name)).toBeVisible();

    // refuse third player
    await expect(player1.getByText('veut rejoindre la partie')).toBeHidden();
    await expect(player3.getByText("En attente de l'approbation du créateur.")).toBeHidden();
    await player3.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
    await expect(player1.getByText('veut rejoindre la partie')).toBeVisible();
    await expect(player3.getByText("En attente de l'approbation du créateur.")).toBeVisible();
    await player1.getByRole('button', { name: 'Refuser' }).click();
    await expect(player1.getByText('veut rejoindre la partie')).toBeHidden();
    await expect(player3.getByText("En attente de l'approbation du créateur.")).toBeHidden();
    await expect(player3.getByText('Vous avez été rejeté par le créateur.')).toBeVisible();
    await expect(player1.getByText(player3Name)).toBeHidden();
    await player3.getByRole('button', { name: 'Ok' }).click();

    // cancel fourth player
    await expect(player1.getByText('veut rejoindre la partie')).toBeHidden();
    await expect(player4.getByText("En attente de l'approbation du créateur.")).toBeHidden();
    await player4.locator('app-lobby-classic-item').filter({ hasText: player1Name }).getByRole('img', { name: 'joinButton' }).click();
    await expect(player1.getByText('veut rejoindre la partie')).toBeVisible();
    await expect(player4.getByText("En attente de l'approbation du créateur.")).toBeVisible();
    await player4.getByRole('button', { name: 'Annuler' }).click();
    await expect(player1.getByText('veut rejoindre la partie')).toBeHidden();
    await expect(player4.getByText("En attente de l'approbation du créateur.")).toBeHidden();
    await expect(player1.getByText(player4Name)).toBeHidden();
});
