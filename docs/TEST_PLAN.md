# UI Test Plan - Airalo Website

## Scope

This test plan covers **UI automation testing** of the Airalo website (`https://www.airalo.com`), including:

- Homepage navigation and search functionality
- Country-specific eSIM package listing
- Package selection and tab navigation
- Price verification and consistency

### Test Types Covered

| Type | Description |
|------|-------------|
| Functional (Happy Path) | Verify the search, navigation, and package selection flow works end-to-end |
| UI Validation | Verify correct elements render, tabs switch content, and prices display correctly |
| Data Consistency | Verify price shown on the package card matches the price at checkout (Buy now) |

### Out of Scope

| Type | Reason |
|------|--------|
| Purchase Flow | Exercise does not require completing a purchase |
| Authentication | No login/account flow required |
| Multi-browser Testing | Single browser sufficient for exercise scope |
| Performance / Load | Not required by the exercise |
| Accessibility | Beyond exercise scope |
| Mobile Responsive | Not specified in requirements |

---

## 1. Open Airalo's Website

### Happy Path

| # | Test Case | Expected |
|---|-----------|----------|
| 1.1 | Navigate to Airalo's website | Page loads successfully, homepage is displayed |
| 1.2 | Verify search field is visible on homepage | Search input element is present and interactable |

---

## 2. Search for Japan

### Happy Path

| # | Test Case | Expected |
|---|-----------|----------|
| 2.1 | Type "Japan" in the search field | Search suggestions/results appear |
| 2.2 | Click on the result with the Japanese flag | Navigates to Japan eSIM country page |
| 2.3 | Verify Japan country page loaded | Page title or heading contains "Japan" |

### Negative Tests

| # | Test Case | Expected |
|---|-----------|----------|
| 2.4 | Search for non-existent country (e.g., "Xyzland") | No results or appropriate message displayed |
| 2.5 | Submit empty search | No navigation occurs, search remains on homepage |

---

## 3. Select an Unlimited eSIM Package

### Happy Path

| # | Test Case | Expected |
|---|-----------|----------|
| 3.1 | Verify data plan tabs are visible | Tabs for different plan types are displayed |
| 3.2 | Click on the unlimited data plan tab | Tab becomes active, unlimited packages are displayed |
| 3.3 | Verify 7 days unlimited package is visible | Package card shows "7 days" and "Unlimited" data |
| 3.4 | Select the 7 days unlimited package | Package detail/modal opens or package is highlighted |

### Negative Tests

| # | Test Case | Expected |
|---|-----------|----------|
| 3.5 | Verify non-unlimited tabs show different packages | Switching tabs changes displayed packages |

---

## 4. Verify Package Price

### Happy Path

| # | Test Case | Expected |
|---|-----------|----------|
| 4.1 | Read the price from the 7-day unlimited package card | Price is visible and in USD format (e.g., "$22.12 USD") |
| 4.2 | Read the price next to the Buy now button | Total price is displayed next to Buy now |
| 4.3 | Verify package card price matches Buy now price | Both prices are identical |

### Additional Validations

| # | Test Case | Expected |
|---|-----------|----------|
| 4.4 | Verify original (strikethrough) price is higher than discounted price | Discount is correctly applied |
| 4.5 | Verify currency is displayed as USD | Price shows "USD" denomination |

---

## Test Execution Strategy

1. **Setup:** Launch browser and navigate to Airalo homepage
2. **Search:** Type "Japan" and select the country result
3. **Navigate:** Switch to unlimited data plan tab
4. **Select:** Choose the 7 days unlimited package
5. **Verify:** Assert price on package card equals price at Buy now button
6. **Teardown:** Close browser

## Technical Considerations

| Area | Notes |
|------|-------|
| Wait strategy | Use explicit waits for dynamic content loading (search results, tab switching) |
| Selectors | Prefer data-testid attributes; fall back to stable CSS selectors |
| Price parsing | Strip currency symbols and whitespace before comparing numeric values |
| Flakiness | Account for animations, lazy loading, and cookie/popup banners |
