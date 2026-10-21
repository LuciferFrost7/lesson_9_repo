export class CartPage {
    constructor(page) {
        this.page = page;

        this.productList = this.page.locator('[data-test="cart-list"]');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
