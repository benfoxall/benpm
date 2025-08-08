import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Benpm/);
});

test("shows methods package", async ({ page }) => {
  await page.goto("/package/methods");

  // Check for header with class and h1 text
  const header = page.locator("header");
  await expect(header).toBeVisible();
  await expect(header.locator("h1")).toHaveText("methods");

  // Check for file contents
  const nav = page.locator("nav");
  await expect(nav).toBeVisible();
  const expectedFiles = [
    "HISTORY.md",
    "index.js",
    "LICENSE",
    "package.json",
    "README.md",
  ];
  for (const file of expectedFiles) {
    await expect(nav.locator(`a:has-text(\"${file}\")`)).toBeVisible();
  }

  // Click on "index.js" and check file contents
  await nav.locator('a:has-text("index.js")').click();
  let fileContent = page.locator("pre code");
  await expect(fileContent).toContainText("'use strict';");

  // Click on "LICENSE" and check file contents
  await nav.locator('a:has-text("LICENSE")').click();
  fileContent = page.locator("pre code");
  await expect(fileContent).toContainText("(The MIT License)");
});
