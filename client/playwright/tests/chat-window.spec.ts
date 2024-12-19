import { expect, test } from '@client/playwright/utils/electron-page';

test.describe('ChatWindow', () => {
    test('User can use the external window', async ({ page, helper }) => {
        await helper.goToManScreen(page, { userName: 'playwrighttest', password: 'hello123' });

        // open external window of chat
        await page.locator('#chat-button').click();
        const popupPromise = page.waitForEvent('popup');

        await page.locator('#screenButton').click();

        // Wait for the new page to open
        const newPopup = await popupPromise;

        // sending a new message
        await newPopup.locator('input[placeholder="Taper un message"]').fill('Test réussi.');
        await newPopup.locator('.sendingButtonContainer').click();
        await expect(newPopup.locator('#message:last-of-type li:last-of-type div')).toHaveText(' Test réussi. ');

        // check if the button for looking up chat appears
        await newPopup.locator('.gg-menu-round').click();
        await expect(newPopup.getByRole('button', { name: '+' })).toBeVisible();

        await newPopup.close();
    });
});
