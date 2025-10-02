import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"
test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //getting sign in button. Name prop has the text to be found on page
  await page.getByRole("link", {name : "Sign in"}).click();
  //checking if link redirected to sign in page
  await expect(page.getByRole("heading", {name : "Login"})).toBeVisible();
  //check if we can fill email and password fields
  await page.locator("[name=email]").fill("1@1.com")
  await page.locator("[name=password]").fill("password")
  //click on login
  await page.getByRole("button", {name: "Login"}).click();

  //now 4 different checks of changes once user is logged in
  //checks toast context
  await expect(page.getByText("Successfully logged in")).toBeVisible();
  //checks isLoggedIn context
  await expect(page.getByRole("link", {name : "My hotels"})).toBeVisible();
  await expect(page.getByRole("link", {name : "My bookings"})).toBeVisible();
  await expect(page.getByRole("button", {name : "Sign Out"})).toBeVisible();
});



test('should allow user to register', async ({page}) => {
  const testMail = `test_register_${Math.floor(Math.random() * 90000 + 10000)}@test.com`;
  // const testMail = "1@1.com"
  await page.goto(UI_URL)

  //navigate to sign up page
  await page.getByRole("link", {name : "Sign in"}).click();
  await page.getByRole("link", {name : "Create an account here"}).click();

  await expect(page.getByRole("heading", {name : "Create an account"})).toBeVisible();

  //fill up registration form
  await page.locator("[name=fName]").fill("test_fname");
  await page.locator("[name=lName]").fill("test_lname")
  await page.locator("[name=email]").fill(testMail)
  await page.locator("[name=password]").fill("password")
  await page.locator("[name=confirmPassword]").fill("password")

  await page.getByRole("button", {name : "Create Account"}).click();

  //expect changes to occur as per registration
  await expect(page.getByText("Registration Successful")).toBeVisible();
  await expect(page.getByRole("link", {name : "My hotels"})).toBeVisible();
  await expect(page.getByRole("link", {name : "My bookings"})).toBeVisible();
  await expect(page.getByRole("button", {name : "Sign Out"})).toBeVisible();
})

