//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class InventoryPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.pageTitle = this._page.title();
        this.cartIcon = this._page.locator('[data-test="shopping-cart-link"]');
        this.productList = this._page.locator(".inventory_item");
        this.addToCartButtons = this._page.locator(".inventory_item button");
    }

    /**
     * @param {string} itemName
     */
    async addItemToCart(itemName) {
        const products = await this.productList.all();

        for (let i = 0; i < products.length; i++) {
            const productName = await products[i].innerText();

            if (productName.includes(itemName)) {
                const addButtons = await this.addToCartButtons.all();
                await addButtons[i].click();
            }
        }
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async getPageTitle() {
        return await this.pageTitle;
    }
}
