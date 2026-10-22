//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CheckoutStepOnePage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.firstNameField = this._page.locator('[data-test="firstName"]');
        this.lastNameField = this._page.locator('[data-test="lastName"]');
        this.postalCodeField = this._page.locator('[data-test="postalCode"]');
        this.continueButton = this._page.locator('[data-test="continue"]');
    }

    /**
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} postalCode
     */
    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);

        await this.continueButton.click();
    }
}
