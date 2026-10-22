//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CheckoutCompletePage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.thanksHeader = this._getLocator("complete-header");
        //// Unused
        this.backHomeButton = this._getLocator("back-to-products");
    }

    async getCompletionMessage() {
        return await this.thanksHeader.innerText();
    }
}
