"use strict";
import { test, expect } from "@playwright/test";

test("Print text of all links", async ({ page }) => {
  await page.goto("https://demoblaze.com/index.html");

  // wait for selector
  page.waitForSelector("a");

  const anchorElements = await page.$$("a");
  for (const anchor of anchorElements) {
    const linkText = await anchor.textContent();
    console.log(linkText);
  }
});
