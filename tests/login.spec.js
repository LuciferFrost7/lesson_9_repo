// @ts-check
import { expect, test } from "@playwright/test";

const SITE_URL = "https://www.saucedemo.com/";

test("Successfully user login", async ({ page }) => {
    await page.goto(SITE_URL);

    await page.locator('[id="user-name"]').fill("standard_user");
    await page.locator('[id="password"]').fill("secret_sauce");
    await page.locator('[id="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
