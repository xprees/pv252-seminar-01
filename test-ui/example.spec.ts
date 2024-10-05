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
