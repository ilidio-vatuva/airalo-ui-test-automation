export const Selectors = {
  home: {
    searchInput: "search-input_text-field",
    cookieBanner: "#onetrust-accept-btn-handler",
    searchResultsList: 'ul[role="listbox"]',
    searchResultLinks: 'ul[role="listbox"] li a',
  },
  country: {
    pageTitle: "package-location-header_title",
    level1Tabs: "store-location_level-1-segmented-control",
    unlimitedTab: "segmented-control_tab-unlimited",
    durationTitle: "package-grouped-packages_duration-title",
    packageButton: "package-grouped-packages_package-button",
    priceAmount: "price_amount",
  },
  packageDetail: {
    cartContainer: "cart-navigation_container",
    buyNowButton: "cart-navigation_select-package-cta",
    priceAmount: "price_amount",
  },
} as const;
