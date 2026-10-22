//@ts-check
export class AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this._page = page;
        this.name = this.constructor.name;
    }
}
