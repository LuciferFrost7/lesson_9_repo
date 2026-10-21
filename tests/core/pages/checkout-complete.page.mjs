export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;

        this.thanksHeader = this.page.locator('[data-test="complete-header"]');
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return await this.thanksHeader.innerText();
    }
}
