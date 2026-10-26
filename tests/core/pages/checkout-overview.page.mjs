//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CheckoutOverviewPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.finishButton = this._getLocator("finish");
        //// Unused
        this.orderInformation = {
            paymentInfo: this._getLocator("payment-info-value"),
            shippingInfo: this._getLocator("shipping-info-value"),
            itemTotal: this._getLocator("subtotal-label"),
            tax: this._getLocator("tax-label"),
        };
        this.totalAmount = this._getLocator("total-label");
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
