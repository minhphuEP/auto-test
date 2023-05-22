import { test } from "@playwright/test";
import { CommonPage } from "../pages/commonPage";
import { readFileExcel } from "../utils/common";
import { filePath } from "../utils/const";
import { signUpUser } from "../pages/signUpPage";
import { signInUser } from "../pages/signInPage";

test.beforeEach(async ({ page }) => {
    const commonPage = new CommonPage(page);
    await commonPage.goto();
});

test.describe('Authentication for User', async () => {

    const getData = readFileExcel(filePath.AuthenDataFile, "authen");

    test('Verify that the user can create an account successfully', async ({ page }) => {
        await signUpUser(page, getData.data[0].userName, getData.data[0].email, getData.data[0].password);      
    });

    test('Verify that the user cannot create an account successfully due to user name already been taken', async ({ page }) => {
        await signUpUser(page, getData.data[1].userName, getData.data[1].email, getData.data[1].password, true, false);      
    });

    test('Verify that the user cannot create an account successfully due to email already been taken', async ({ page }) => {
        await signUpUser(page, getData.data[2].userName, getData.data[2].email, getData.data[2].password, false, true);      
    });
    
    test('Verify that a user can login successfully with a corrected email and password', async ({ page }) => {
        await signInUser(page, getData.data[3].email, getData.data[3].password);
    });

    test('Verify that a user cannot log in when entering a wrong email address', async ({ page }) => {
        await signInUser(page, getData.data[4].email, getData.data[4].password, true);
    });

    test('Verify that a user cannot log in when entering a wrong password', async ({ page }) => {
        await signInUser(page, getData.data[5].email, getData.data[5].password, false, true);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    })
});