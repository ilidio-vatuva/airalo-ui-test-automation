# Airalo UI Test Automation

Automated end-to-end tests for the Airalo website, verifying the eSIM package discovery and purchase flow for Japan.

## Tech Stack

- TypeScript
- Playwright 1.50
- Allure (reporting)
- Node.js 22

## Project Structure

```
├── config/
│   └── test.config.ts        # Centralized timeouts and base URL
├── constants/
│   ├── selectors.ts          # data-testid and CSS selectors
│   └── test-data.ts          # Test parameters (country, duration)
├── fixtures/
│   └── page.fixture.ts       # Custom Playwright fixtures (page objects)
├── pages/
│   ├── HomePage.ts           # Search, cookie/overlay dismissal
│   ├── CountryPage.ts        # Package listing, tabs, direct navigation
│   └── PackageDetailPage.ts  # Buy now button, price verification
├── tests/
│   └── airalo-esim-package.spec.ts
└── playwright.config.ts
```

## Test Coverage

| Section | Tests | Description |
|---------|-------|-------------|
| 1. Open Website | 2 | Homepage loads, search field visible |
| 2. Search for Japan | 3 | Search results, navigation, heading |
| 3. Select Package | 4 | Tabs, unlimited filter, 7-day package, detail view |
| 4. Verify Price | 3 | Card price, Buy Now price, price consistency |

**Total: 12 tests** (all pass locally; 8 pass on CI, 4 skipped due to bot detection)

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
git clone https://github.com/ilidio-vatuva/airalo-ui-test-automation.git
cd airalo-ui-test-automation
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm test

# Run headed (visible browser)
npm run test:headed

# Run in debug mode
npm run test:debug

# Run with specific reporter
npx playwright test --reporter=list
```

## Allure Reporting

```bash
# Results are generated automatically in allure-results/
npx playwright test

# Generate and view report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## CI/CD

Tests run via GitHub Actions (`workflow_dispatch`). No secrets required — tests target the public Airalo website.

On CI:
- 2 parallel workers
- 60s test timeout with 1 retry
- Screenshots on all tests, traces/video on failure
- Allure report uploaded as artifact

## Architecture Decisions

- **Page Object Model**: Each page has its own class with locators and actions.
- **Custom fixtures**: Page objects are injected via Playwright's fixture system — no manual instantiation in tests.
- **Direct navigation**: Tests in sections 3-4 navigate directly to `/japan-esim` instead of going through the search flow, making them independent and faster.
- **Selector strategy**: Uses `data-testid` attributes for stable, refactor-resistant selectors.
- **CI resilience**: User-Agent and Accept-Language headers configured to reduce bot detection.

## Known Limitations

**Bot detection on CI**: Airalo.com blocks or serves different content to GitHub Actions runners. The homepage search field (`data-testid="search-input_text-field"`) is not rendered for datacenter IPs. Tests 1.2 and 2.1–2.3 are skipped on CI with a clear annotation. These tests pass locally.

Workaround: Sections 3 and 4 use `countryPage.navigateDirect()` which navigates to `/japan-esim` directly, bypassing the search flow entirely. This works reliably on CI.

## Configuration

All configurable values are centralized:

| File | Purpose |
|------|---------|
| `playwright.config.ts` | Timeouts, workers, browser, viewport |
| `config/test.config.ts` | Navigation/element timeouts, typing delay |
| `constants/test-data.ts` | Country name, URL slug, package duration |
| `constants/selectors.ts` | All `data-testid` and CSS selectors |
