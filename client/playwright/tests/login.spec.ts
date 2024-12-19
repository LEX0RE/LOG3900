import { expect, test } from '@client/playwright/utils/electron-page';

const auth = {
    username: 'Voltix',
    password: '789Terre',
};

test.describe('Login', () => {
    test('User can login in the app', async ({ page }) => {
        // QUAND l'utilisateur entre sur l'application
        // ALORS l'utilisateur devrait voir la page de connexion
        await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

        // QUAND l'utilisateur entre correctement son identifiant
        await page.getByLabel('Pseudonyme :').fill(auth.username);
        // ET l'utilisateur entre correctement son mot de passe
        await page.getByLabel('Mot de passe :').fill(auth.password);
        // ET l'utilisateur appuie sur le bouton "Connexion"
        await page.getByRole('button', { name: 'Connexion' }).click();
        // ALORS l'utilisateur devrait voir la page principale
        await expect(page.getByRole('heading', { name: 'Scrabble' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Classique' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Tournoi' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Coopératif' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Mon profil' })).toBeVisible();
    });
});
