//ts-check
import { AbstractPage } from "./abstract/page.abstract.mjs";

export class LoginPage extends AbstractPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        super(page);

        this.usernameInput = this._getLocator("username");
        this.passwordInput = this._getLocator("password");
        this.loginButton = this._getLocator("login-button");
        //// Unused
        this.errorMessage = this._getLocator("error");
    }

    async open() {
        await this._page.goto("https://www.saucedemo.com/");
    }

    /**
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
}
