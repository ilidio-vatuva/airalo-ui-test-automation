import { type Page, type Locator } from "@playwright/test";
import { Selectors } from "../constants/selectors";
import { TestConfig } from "../config/test.config";
import { TestData } from "../constants/test-data";

export class HomePage {
  private readonly page: Page;
  private readonly searchInput: Locator;
  private readonly searchResultsList: Locator;
  private readonly searchResultLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId(Selectors.home.searchInput);
    this.searchResultsList = page.locator(Selectors.home.searchResultsList);
    this.searchResultLinks = page.locator(Selectors.home.searchResultLinks);
  }

  async navigate() {
    await this.page.goto("/");
    await this.dismissCookieBanner();
    await this.dismissOverlays();
  }

  async isSearchFieldVisible(): Promise<boolean> {
    return this.searchInput.isVisible();
  }

  async searchForCountry(country: string) {
    await this.searchInput.click();
    await this.searchInput.pressSequentially(country, {
      delay: TestConfig.timeouts.typing,
    });
    await this.searchResultsList.waitFor({
      state: "visible",
      timeout: TestConfig.timeouts.element,
    });
  }

  async selectCountryResult(country: string) {
    const result = this.searchResultLinks.filter({ hasText: country });
    await result.first().click();
  }

  async getSearchResultsCount(): Promise<number> {
    return this.searchResultLinks.count();
  }

  private async dismissCookieBanner() {
    const acceptButton = this.page.locator(Selectors.home.cookieBanner);
    try {
      await acceptButton.waitFor({
        state: "visible",
        timeout: TestConfig.timeouts.overlay,
      });
      await acceptButton.click();
      await acceptButton.waitFor({ state: "hidden", timeout: 3000 });
      console.log("[HomePage] Cookie banner dismissed");
    } catch {
      console.log("[HomePage] Cookie banner not found, skipping");
    }
  }

  private async dismissOverlays() {
    const dontAllow = this.page.getByRole("button", {
      name: TestData.pushNotificationButton,
    });
    try {
      await dontAllow.waitFor({
        state: "visible",
        timeout: TestConfig.timeouts.overlay,
      });
      await dontAllow.click();
      console.log("[HomePage] Push notification overlay dismissed");
    } catch {
      console.log("[HomePage] Push notification overlay not found, skipping");
    }
  }
}
