/* eslint-disable max-lines-per-function -- ces tests prennent bcp de lignes */
import { MAX_CHARACTERS_EMAIL, MAX_CHARACTERS_USERNAME } from '@app/constants/borders-user-profile';
import { expect } from '@client/playwright/utils/electron-page';
import { UsersLogin } from '@common/interfaces/user/user-login';
import { Page } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

export class TestHelper {
    async goToManScreen(page: Page, userLogin: UsersLogin | null = null): Promise<RegExp> {
        if (!userLogin) return this.register(page);
        await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

        await page.getByLabel('Pseudonyme :').fill(userLogin.userName);
        await page.getByLabel('Mot de passe :').fill(userLogin.password);
        await page.getByRole('button', { name: 'Connexion' }).click();
        return RegExp(userLogin.userName);
    }

    async register(page: Page): Promise<RegExp> {
        await page.getByRole('link', { name: 'Créez-en un !' }).click();
        const prefix = 'Test';
        const username = prefix + uuidv4().substring(0, MAX_CHARACTERS_USERNAME - prefix.length);
        const suffixe = '@polymtl.ca';

        await page.getByLabel('Pseudonyme :').fill(username);
        await page.getByLabel('Courriel :').fill(uuidv4().substring(0, MAX_CHARACTERS_EMAIL - suffixe.length) + suffixe);
        await page.getByLabel('Mot de passe :').fill('12345678');
        await page.getByRole('button', { name: /Jouer/ }).click();
        return RegExp(username);
    }

    async testTheme(page: Page): Promise<void> {
        await page.getByRole('combobox').selectOption('default');
        await page.getByRole('button', { name: 'Soumettre' }).click();

        const body = page.locator('body');
        let initialColor = await body.evaluate((element) => {
            return getComputedStyle(element).backgroundColor;
        });

        await page.getByRole('combobox').selectOption('dark');
        await page.getByRole('button', { name: 'Soumettre' }).click();

        let newColor = await body.evaluate((element) => {
            return getComputedStyle(element).backgroundColor;
        });

        expect(initialColor).not.toBe(newColor);
        initialColor = newColor;
        await page.getByRole('combobox').selectOption('under the sea');
        await page.getByRole('button', { name: 'Soumettre' }).click();

        newColor = await body.evaluate((element) => {
            return getComputedStyle(element).backgroundColor;
        });
        expect(initialColor).not.toBe(newColor);
        initialColor = newColor;

        await page.getByRole('combobox').selectOption('default');
        await page.getByRole('button', { name: 'Soumettre' }).click();

        newColor = await body.evaluate((element) => {
            return getComputedStyle(element).backgroundColor;
        });
        expect(initialColor).not.toBe(newColor);
    }

    async testReplayPlusMinusButton(page: Page) {
        const minusButton = page.getByRole('button', { name: /^-$/ });
        const plusButton = page.getByRole('button', { name: /^\+$/ });

        await expect(minusButton).toBeDisabled();
        await plusButton.click();
        await expect(plusButton).toBeEnabled();
        await minusButton.click();
        await expect(minusButton).toBeDisabled();
        await plusButton.click();
        await plusButton.click();
        await plusButton.click();
        await plusButton.click();
        await expect(plusButton).toBeDisabled();
        await minusButton.click();
        await expect(plusButton).toBeEnabled();
        await minusButton.click();
        await minusButton.click();
        await minusButton.click();
    }
}
