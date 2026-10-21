export class InventoryPage {
    constructor(page) {
        this.page = page;

        this.pageTitle = page.title();
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.productList = page.locator(".inventory_item");
        this.addToCartButtons = page.locator(".inventory_item button");
    }

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
