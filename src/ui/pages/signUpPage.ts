import { CommonPage } from "../pages/commonPage";
import { Page, expect } from "@playwright/test";

const signUpTap = "//a[@class='nav-link' and text()='Sign up']";
const userNameBox = "Username";
const emailBox = "Email";
const passwordBox = "Password";
const signUpButton = "//button[text()='Sign in']";
const errorMessageEmail = "//ul/li[text()='email']";
const errorMessageUserName = "//ul/li[text()='username']";
const tabYourFeedOnHomepage = "//a[text()='Your Feed']";
const tabGlobalFeedOnHomepage = "//a[text()='Global Feed']";
const textOnHomePage = "//div[text() = 'No articles are here... yet.']";

export const signUpPage = {
    signUpTap,
    userNameBox,
    emailBox,
    passwordBox,
    signUpButton,
    errorMessageEmail,
    errorMessageUserName,
    tabYourFeedOnHomepage,
    tabGlobalFeedOnHomepage,
    textOnHomePage
};

export async function signUpUser(page: Page, username: string, email: string, password: string, userExisting?: boolean, emailExisting?: boolean) {
    const commonPage = new CommonPage(page);
    await commonPage.getSignUpPage();
    await page.getByPlaceholder(signUpPage.userNameBox).fill(username);
    await page.getByPlaceholder(signUpPage.emailBox).fill(email);
    await page.getByPlaceholder(signUpPage.passwordBox).fill(password);
    await page.locator(signUpPage.signUpButton).click();
    await page.waitForLoadState();
    if (userExisting) {
        await expect(page.locator(errorMessageUserName)).toBeVisible();
    } else if (emailExisting) {
        await expect(page.locator(errorMessageEmail)).toBeVisible();
    } else {
        await expect(page.locator(tabYourFeedOnHomepage)).toBeVisible();
        await expect(page.locator(tabGlobalFeedOnHomepage)).toBeVisible();
        await expect(page.locator(textOnHomePage)).toHaveText("No articles are here... yet.");
    }
}