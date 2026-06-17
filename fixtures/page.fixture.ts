import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CountryPage } from "../pages/CountryPage";
import { PackageDetailPage } from "../pages/PackageDetailPage";

type Pages = {
  homePage: HomePage;
  countryPage: CountryPage;
  packageDetailPage: PackageDetailPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  countryPage: async ({ page }, use) => {
    await use(new CountryPage(page));
  },
  packageDetailPage: async ({ page }, use) => {
    await use(new PackageDetailPage(page));
  },
});

export { expect } from "@playwright/test";
