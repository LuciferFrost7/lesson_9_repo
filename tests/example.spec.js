// @ts-check
import { test } from "@playwright/test";
import { InventoryPage } from "./core/pages/inventory.page.mjs";
import { LoginPage } from "./core/pages/login.page.mjs";

test("example", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCart("Sauce Labs Fleece Jacket");
    await inventoryPage.openCart();

    await page.pause();
});
