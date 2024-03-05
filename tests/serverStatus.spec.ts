import { test, expect } from '@playwright/test';

test('Server response', async ({page}) =>{
    const responseValue = await page.request.get('http://localhost:3000');
    await expect(responseValue).toBeOK();
});
