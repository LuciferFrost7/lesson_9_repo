//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CheckoutOverviewPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.orderInformation = {
            paymentInfo: this._page.locator('[data-test="payment-info-value"]'),
            shippingInfo: this._page.locator('[data-test="shipping-info-value"]'),
            itemTotal: this._page.locator('[data-test="subtotal-label"]'),
            tax: this._page.locator('[data-test="tax-label"]'),
        };
        this.totalAmount = this._page.locator('[data-test="total-label"]');
        this.finishButton = this._page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
