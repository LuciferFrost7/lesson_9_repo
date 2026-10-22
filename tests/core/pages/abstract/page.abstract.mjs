//@ts-check
export class AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this._page = page;
        this.name = this.constructor.name;
    }

    /**
     * Return page locator by his data-test attribute
     * @param {string} locatorName
     */
    _getLocator(locatorName) {
        return this._page.locator(`[data-test="${locatorName}"]`);
    }
}
