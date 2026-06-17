import { type Page, type Locator } from "@playwright/test";
import { Selectors } from "../constants/selectors";

export class CountryPage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly level1Tabs: Locator;
  private readonly unlimitedTab: Locator;
  private readonly durationTitles: Locator;
  private readonly packageButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId(Selectors.country.pageTitle);
    this.level1Tabs = page.getByTestId(Selectors.country.level1Tabs);
    this.unlimitedTab = page.getByTestId(Selectors.country.unlimitedTab);
    this.durationTitles = page.getByTestId(Selectors.country.durationTitle);
    this.packageButtons = page.getByTestId(Selectors.country.packageButton);
  }

  async waitForPackagesLoaded() {
    await this.packageButtons.first().waitFor({ state: "visible" });
  }

  async getPageHeading(): Promise<string> {
    await this.pageTitle.waitFor({ state: "visible" });
    return (await this.pageTitle.textContent()) ?? "";
  }

  async areDataTabsVisible(): Promise<boolean> {
    await this.waitForPackagesLoaded();
    return this.level1Tabs.isVisible();
  }

  async clickUnlimitedTab() {
    await this.unlimitedTab.waitFor({ state: "visible" });
    await this.unlimitedTab.click();
  }

  async isUnlimitedTabActive(): Promise<boolean> {
    await this.unlimitedTab.waitFor({ state: "visible" });
    const ariaSelected = await this.unlimitedTab.getAttribute("aria-selected");
    return ariaSelected === "true";
  }

  async getPackageButtonByDuration(days: string): Promise<Locator> {
    await this.waitForPackagesLoaded();
    const container = this.durationTitles
      .filter({ hasText: `${days} days` })
      .locator("..")
      .locator(
        `[data-testid="${Selectors.country.packageButton}"]`
      );
    await container.waitFor({ state: "visible" });
    return container;
  }

  async getPackageCardPrice(days: string): Promise<string> {
    const button = await this.getPackageButtonByDuration(days);
    const priceElement = button.locator(
      `[data-testid="${Selectors.country.priceAmount}"]`
    );
    return (await priceElement.textContent())?.trim() ?? "";
  }

  async selectPackage(days: string) {
    const button = await this.getPackageButtonByDuration(days);
    await button.click();
    await this.page.waitForURL(/.*esim\/.+/);
  }
}
