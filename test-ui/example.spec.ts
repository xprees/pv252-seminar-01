import { expect } from "@playwright/test";
import { test } from "./coverage_wrapper";

test("find-watman", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByAltText("This is watman")).toBeInViewport();
});

test("find-settings", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("settings")).toBeInViewport();
});

test("test-my-page-loading-img", async ({ page }) => {
  await page.goto("https://xprees.com");
  const img = page.getByAltText("Hero Image");
  await expect(img).toBeInViewport();
  await expect(img).toBeVisible();
});

test("test-my-page-index-title", async ({ page }) => {
  await page.goto("https://xprees.com/");
  await expect(page).toHaveTitle(/xprees.*/);
});

test("test-my-page-projects-title", async ({ page }) => {
  await page.goto("https://xprees.com/projects");
  await expect(page).toHaveTitle(/[Pp]rojects.*/);
});
