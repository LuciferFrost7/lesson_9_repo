//@ts-check
import { expect, test } from "@playwright/test";
import {
    CartPage,
    CheckoutCompletePage,
    CheckoutOverviewPage,
    CheckoutStepOnePage,
    InventoryPage,
    LoginPage,
} from "./core/pages/index.mjs";

test("User login, create order, complete order & see finish message", async ({ page }) => {
    const USER = {
        USERNAME: "standard_user",
        PASSWORD: "secret_sauce",
        FIRST_NAME: "Test",
        LAST_NAME: "User",
        POSTAL_CODE: "12345",
    };
    const INVENTORY_TITLE = "Products";
    const COMPLETION_GREET = "Thank you for your order!";

    //? 1
    const loginPage = new LoginPage(page);

    await loginPage.open();

    //? 2
    await loginPage.login(USER.USERNAME, USER.PASSWORD);

    //? 3
    const inventoryPage = new InventoryPage(page);
    const inventoryPageTitle = await inventoryPage.getPageTitle();
    expect(inventoryPageTitle).toBe(INVENTORY_TITLE);

    //! 4 - HARDCORED
    //TODO: Create getHighestCostItemName()
    const itemName = "Sauce Labs Fleece Jacket";
    await inventoryPage.addItemToCart(itemName);

    //? 5
    await inventoryPage.openCart();

    //? 6
    const cartPage = new CartPage(page);
    const containsResult = await cartPage.isItemContains(itemName);
    expect(containsResult).toBeTruthy();

    //? 7
    await cartPage.goToCheckout();

    //? 8
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.fillUserInfo(USER.FIRST_NAME, USER.LAST_NAME, USER.POSTAL_CODE);

    //? 9
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishCheckout();

    //? 10
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const resultMessage = await checkoutCompletePage.getCompletionMessage();

    //? 11
    expect(resultMessage).toEqual(COMPLETION_GREET);

    await page.pause();
});
