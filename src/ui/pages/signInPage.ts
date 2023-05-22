import { CommonPage } from "../pages/commonPage";
import { Page, expect } from "@playwright/test";

const signInTap = "//a[@class='nav-link' and text()='Sign in']";
const emailBox = "Email";
const passwordBox = "Password";
const signInButton = "//button[text()='Sign in']";
const messageEmailPassInvalid = "//ul/li[text()='email or password']";
const tabYourFeedOnHomepage = "//a[text()='Your Feed']";
const tabGlobalFeedOnHomepage = "//a[text()='Global Feed']";
const textOnHomePage = "//div[text() = 'No articles are here... yet.']";

export const signInPage = {
    signInTap,
    emailBox,
    passwordBox,
    signInButton,
    tabYourFeedOnHomepage,
    tabGlobalFeedOnHomepage,
    textOnHomePage,
};

export async function signInUser(page: Page, email: string, password: string, wrongEmail?: boolean, wrongPass?: boolean) {
    const commonPage = new CommonPage(page);
    await commonPage.getSignInPage();
    await page.getByPlaceholder(signInPage.emailBox).fill(email);
    await page.getByPlaceholder(signInPage.passwordBox).fill(password);
    await page.locator(signInPage.signInButton).click();
    await page.waitForLoadState();
    if (wrongEmail) {
        await expect(page.locator(messageEmailPassInvalid)).toBeVisible();
    } else if (wrongPass) {
        await expect(page.locator(messageEmailPassInvalid)).toBeVisible();
    } else {
        await expect(page.locator(tabYourFeedOnHomepage)).toBeVisible();
        await expect(page.locator(tabGlobalFeedOnHomepage)).toBeVisible();
        await expect(page.locator(textOnHomePage)).toHaveText("No articles are here... yet.");
    }   
}