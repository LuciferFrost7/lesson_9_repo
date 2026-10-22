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
    //? 1
    const loginPage = new LoginPage(page);

    await loginPage.open();

    //? 2
    await loginPage.login("standard_user", "secret_sauce");

    //? 3
    const inventoryPage = new InventoryPage(page);
    const inventoryPageTitle = await inventoryPage.getPageTitle();
    await expect(page).toHaveTitle(inventoryPageTitle);

    //! 4 - HARDCORED
    await inventoryPage.addItemToCart("Sauce Labs Fleece Jacket");

    //? 5
    await inventoryPage.openCart();

    //? 6
    //TODO: Add verifying cart
    const cartPage = new CartPage(page);

    //? 7
    await cartPage.goToCheckout();

    //? 8
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");

    //? 9
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishCheckout();

    //? 10
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const resultMessage = await checkoutCompletePage.getCompletionMessage();

    //? 11
    expect(resultMessage).toEqual("Thank you for your order!");
    console.log(resultMessage);

    await page.pause();
});
