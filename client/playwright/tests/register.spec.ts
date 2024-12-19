import { getAuthentication } from '@client/playwright/utils';
import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('Register', () => {
    test('User can register in the app', async ({ page }) => {
        const auth = getAuthentication();

        // QUAND l'utilisateur entre sur l'application
        // ALORS l'utilisateur devrait voir la page de connexion
        await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

        // QUAND l'utilisateur appuie sur le lien "Créez-en un !"
        await page.getByText('Créez-en un !', { exact: true }).click();
        // ALORS l'utilisateur est navigué vers le répertoire /registration
        await expect(page).toHaveURL(/registration/);

        // QUAND l'utilisateur entre correctement son identifiant
        await page.getByLabel('Pseudonyme :').fill(auth.username);
        // ET l'utilisateur entre correctement son courriel
        await page.getByLabel('Courriel :').fill(auth.email);
        // ET l'utilisateur entre correctement son mot de passe
        await page.getByLabel('Mot de passe :').fill(auth.password);
        // ET l'utilisateur appuie sur le bouton "Connexion"
        await page.getByRole('button', { name: 'Jouer au Scrabble', exact: true }).click();
        // ALORS l'utilisateur devrait voir la page principale
        await expect(page.getByRole('heading', { name: 'Scrabble' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Classique' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Tournoi' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Coopératif' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Mon profil' })).toBeVisible();
    });
});
