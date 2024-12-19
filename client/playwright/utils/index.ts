import { MAX_CHARACTERS_EMAIL, MAX_CHARACTERS_USERNAME } from '@app/constants/borders-user-profile';
import { EASEL_SIZE } from '@client/src/app/constants/game-page';
import { Page, expect } from '@playwright/test';
import { v4 as uuid } from 'uuid';

export interface User {
    username: string;
    email: string;
    password: string;
}

export const getAuthentication = (): User => {
    const usernamePrefix = 'Test';
    const emailSuffix = '@polymtl.ca';

    const username = usernamePrefix + uuid().substring(0, MAX_CHARACTERS_USERNAME - usernamePrefix.length);
    const email = uuid().substring(0, MAX_CHARACTERS_EMAIL - emailSuffix.length) + emailSuffix;
    const password = '12345678';

    return { username, email, password };
};

export const goToMainScreen = async (page: Page): Promise<User> => {
    const auth = getAuthentication();

    await page.getByRole('link', { name: 'Créez-en un !' }).click();
    await page.getByLabel('Pseudonyme :').fill(auth.username);
    await page.getByLabel('Courriel :').fill(auth.email);
    await page.getByLabel('Mot de passe :').fill(auth.password);
    await page.getByRole('button', { name: 'Jouer au Scrabble', exact: true }).click();
    return auth;
};

export const skipIfTurn = async (page: Page) => {
    if (await page.getByRole('button', { name: /Passer/ }).isEnabled()) await page.getByRole('button', { name: /Passer/ }).click();
};

export const skipAllTurn = async (pages: Page[]) => {
    for (const page of pages) await skipIfTurn(page);
};

export const getLetterInEasel = async (page: Page) => {
    await expect(page.locator('.container-rack-letter >> #letter')).toHaveCount(EASEL_SIZE);
    return page.locator('.container-rack-letter >> #letter').allTextContents();
};

export const findActivePlayer = async (pages: Page[]) => {
    for (const page of pages) {
        if (await page.getByRole('button', { name: /Passer/ }).isEnabled()) return page;
    }
    return pages[0];
};

export const findNonActivePlayer = (pages: Page[], activePlayer: Page) => {
    const nonActivePlayer = [];

    for (const page of pages) {
        if (page === activePlayer) continue;
        nonActivePlayer.push(page);
    }
    return nonActivePlayer;
};

export const isBlankLetter = (letter: string) => {
    return letter === 'ㅤ';
};

export const getKeyboardKeyWithLetter = (letter: string) => {
    return isBlankLetter(letter) ? 'A' : letter.toLowerCase();
};
