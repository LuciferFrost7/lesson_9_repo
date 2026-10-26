//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CartPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.productList = this._getLocator("cart-list");
        this.checkoutButton = this._getLocator("checkout");
        //// Unused
        this.continueShoppingButton = this._getLocator("continue-shopping");
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    /**
     * @param {string} itemName
     */
    async isItemContains(itemName) {
        return (await (await this.productList).innerText()).includes(itemName);
    }
}
