import { type Page, type Locator } from "@playwright/test";
import { Selectors } from "../constants/selectors";

export class PackageDetailPage {
  private readonly page: Page;
  private readonly buyNowButton: Locator;
  private readonly buyNowPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyNowButton = page.getByTestId(Selectors.packageDetail.buyNowButton);
    this.buyNowPrice = page
      .getByTestId(Selectors.packageDetail.cartContainer)
      .getByTestId(Selectors.packageDetail.priceAmount);
  }

  async getBuyNowPrice(): Promise<string> {
    await this.buyNowPrice.waitFor({ state: "visible" });
    return (await this.buyNowPrice.textContent())?.trim() ?? "";
  }

  async isBuyNowButtonVisible(): Promise<boolean> {
    try {
      await this.buyNowButton.waitFor({ state: "visible", timeout: 10_000 });
      return true;
    } catch {
      return false;
    }
  }
}
