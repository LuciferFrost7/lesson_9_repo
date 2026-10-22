//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class CheckoutStepOnePage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.firstNameField = this._getLocator("firstName");
        this.lastNameField = this._getLocator("lastName");
        this.postalCodeField = this._getLocator("postalCode");
        this.continueButton = this._getLocator("continue");
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
