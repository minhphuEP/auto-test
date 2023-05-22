import { Locator, Page } from "@playwright/test";
import { homePage } from "./homePage";
import { signInPage } from "./signInPage";
import { signUpPage } from "./signUpPage";

export class CommonPage {
    readonly page: Page;
    readonly homePage: Locator;
    readonly signInPage: Locator;
    readonly signUpPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePage = page.locator(homePage.homeTap);
        this.signInPage = page.locator(signInPage.signInTap);
        this.signUpPage = page.locator(signUpPage.signUpTap);
    }

    async goto() {
        await this.page.goto("/");
    }

    async getHomePage() {
        await this.homePage.click();
    }
    
    async getSignInPage() {
        await this.signInPage.click();
    }

    async getSignUpPage() {
        await this.signUpPage.click();
    }
};

