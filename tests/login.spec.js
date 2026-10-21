// @ts-check
import { expect, test } from "@playwright/test";

const SITE_URL = "https://www.saucedemo.com/";

test.describe("User login test", () => {
    test("User should successfully login in", async ({ page }) => {
        await page.goto(SITE_URL);

        await page.locator('[id="user-name"]').fill("standard_user");
        await page.locator('[id="password"]').fill("secret_sauce");
        await page.locator('[id="login-button"]').click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("User should fail to login in & see error message", async ({ page }) => {
        await page.goto(SITE_URL);

        await page.locator('[id="user-name"]').fill("locked_out_user");
        await page.locator('[id="password"]').fill("secret_sauce");
        await page.locator('[id="login-button"]').click();

        const errorElement = await page.getByText(
            "Epic sadface: Sorry, this user has been locked out."
        );
        await expect(errorElement).toBeDefined();
        await expect(errorElement).toBeVisible();

        await expect(page).not.toHaveURL("https://www.saucedemo.com/inventory.html");
    });
});
