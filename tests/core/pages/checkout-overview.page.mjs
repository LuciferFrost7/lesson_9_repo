export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;

        this.orderInformation = {
            paymentInfo: this.page.locator('[data-test="payment-info-value"]'),
            shippingInfo: this.page.locator('[data-test="shipping-info-value"]'),
            itemTotal: this.page.locator('[data-test="subtotal-label"]'),
            tax: this.page.locator('[data-test="tax-label"]'),
        };
        this.totalAmount = this.page.locator('[data-test="total-label"]');
        this.finishButton = this.page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
