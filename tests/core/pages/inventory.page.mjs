//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class InventoryPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.pageTitle = this._getLocator("title");
        this.cartIcon = this._getLocator("shopping-cart-link");
        this.productList = this._getLocator("inventory-item");
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
        return await this.pageTitle.innerText();
    }

    async getHighestCostItemName() {
        const products = await this.productList.all();

        let maxPrice;
        let productIndex = 0;
        for (let i = 0; i < products.length; i++) {
            const productPrice = Number(
                (await products[i].locator('[data-test="inventory-item-price"]').innerText()).slice(
                    1
                )
            );

            if (!maxPrice || productPrice > maxPrice) {
                maxPrice = productPrice;
                productIndex = i;
            }
        }

        return await products[productIndex]
            .locator('[data-test="inventory-item-name"]')
            .innerText();
    }
}
