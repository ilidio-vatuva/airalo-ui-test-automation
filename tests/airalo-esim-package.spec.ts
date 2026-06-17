import { test, expect } from "../fixtures/page.fixture";
import { TestData } from "../constants/test-data";

const { country: COUNTRY, packageDuration: PACKAGE_DURATION } = TestData;

test.describe("Airalo eSIM Package - Japan", () => {
  test.describe("1. Open Airalo Website", () => {
    test("1.1 - Should load the homepage successfully", async ({
      page,
      homePage,
    }) => {
      await homePage.navigate();

      await expect(page).toHaveURL(/airalo\.com/);
    });

    test("1.2 - Should display the search field on homepage", async ({
      homePage,
    }) => {
      await homePage.navigate();

      expect(await homePage.isSearchFieldVisible()).toBe(true);
    });
  });

  test.describe("2. Search for Japan", () => {
    test("2.1 - Should show search results when typing Japan", async ({
      homePage,
    }) => {
      await homePage.navigate();
      await homePage.searchForCountry(COUNTRY);

      const count = await homePage.getSearchResultsCount();
      expect(count).toBeGreaterThan(0);
    });

    test("2.2 - Should navigate to Japan country page", async ({
      page,
      homePage,
    }) => {
      await homePage.navigate();
      await homePage.searchForCountry(COUNTRY);
      await homePage.selectCountryResult(COUNTRY);

      await expect(page).toHaveURL(/japan-esim/);
    });

    test("2.3 - Should display Japan in the page heading", async ({
      homePage,
      countryPage,
    }) => {
      await homePage.navigate();
      await homePage.searchForCountry(COUNTRY);
      await homePage.selectCountryResult(COUNTRY);

      const heading = await countryPage.getPageHeading();
      expect(heading).toContain("Japan");
    });
  });

  test.describe("3. Select Unlimited eSIM Package", () => {
    test("3.1 - Should display data plan tabs", async ({ countryPage }) => {
      await countryPage.navigateDirect();

      expect(await countryPage.areDataTabsVisible()).toBe(true);
    });

    test("3.2 - Should have unlimited tab active by default", async ({
      countryPage,
    }) => {
      await countryPage.navigateDirect();

      expect(await countryPage.isUnlimitedTabActive()).toBe(true);
    });

    test("3.3 - Should display 7-day unlimited package", async ({
      countryPage,
    }) => {
      await countryPage.navigateDirect();

      const packageButton =
        await countryPage.getPackageButtonByDuration(PACKAGE_DURATION);
      await expect(packageButton).toBeVisible();
    });

    test("3.4 - Should open package detail on selection", async ({
      countryPage,
      packageDetailPage,
    }) => {
      await countryPage.navigateDirect();
      await countryPage.selectPackage(PACKAGE_DURATION);

      expect(await packageDetailPage.isBuyNowButtonVisible()).toBe(true);
    });
  });

  test.describe("4. Verify Package Price", () => {
    test("4.1 - Should display price on the package card", async ({
      countryPage,
    }) => {
      await countryPage.navigateDirect();

      const cardPrice =
        await countryPage.getPackageCardPrice(PACKAGE_DURATION);
      expect(cardPrice).toMatch(/[\d.]+/);
    });

    test("4.2 - Should display price next to Buy now button", async ({
      countryPage,
      packageDetailPage,
    }) => {
      await countryPage.navigateDirect();
      await countryPage.selectPackage(PACKAGE_DURATION);

      const buyNowPrice = await packageDetailPage.getBuyNowPrice();
      expect(buyNowPrice).toMatch(/[\d.]+/);
    });

    test("4.3 - Package card price should match Buy now price", async ({
      countryPage,
      packageDetailPage,
    }) => {
      await countryPage.navigateDirect();

      const cardPrice =
        await countryPage.getPackageCardPrice(PACKAGE_DURATION);
      await countryPage.selectPackage(PACKAGE_DURATION);
      const buyNowPrice = await packageDetailPage.getBuyNowPrice();

      expect(cardPrice).toBe(buyNowPrice);
    });
  });
});
