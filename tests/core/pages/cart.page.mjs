//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CartPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.productList = this._page.locator('[data-test="cart-list"]');
        this.checkoutButton = this._page.locator('[data-test="checkout"]');
        this.continueShoppingButton = this._page.locator('[data-test="continue-shopping"]');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
