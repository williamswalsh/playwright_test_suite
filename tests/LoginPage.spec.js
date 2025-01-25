// @ts-check
"use strict";
import { test, expect } from "@playwright/test";

test.only("has title", async ({ page }) => {
  await page.goto("https://app-moccona.letsweel.com/app/business-signup");
  await expect(page).toHaveTitle("Sign up for a free trial | Weel");
  await page.close();
});

test("has no redirects", async ({ page }) => {
  await page.goto("https://app-moccona.letsweel.com/app/business-signup");
  await expect(page).toHaveURL(
    "https://app-moccona.letsweel.com/app/business-signup"
  );
  await page.close();
});

// test("has title", async ({ page }) => {

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// await page.close();
// });
