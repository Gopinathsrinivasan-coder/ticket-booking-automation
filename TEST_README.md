# Playwright Test Suite - T-shirt Search

## Overview

This test suite validates the following scenario on the Automation Practice website:
1. **Navigate** to http://www.automationpractice.pl/index.php
2. **Search** for 'T-shirts'
3. **Verify** the "Faded Short Sleeve T-shirts" product appears in the search results

## Test File Location

- **File**: `tests/search-tshirts.spec.ts`
- **Framework**: @playwright/test

## Test Cases

### 1. Main Test - Search with Enter Key
**Test Name**: `should navigate to automation practice site, search for T-shirts, and verify Faded Short Sleeve T-shirts`

Steps:
- Navigates to the website
- Locates the search input (with multiple selector fallbacks)
- Fills the search box with "T-shirts"
- Submits search by pressing Enter
- Verifies the "Faded Short Sleeve T-shirt" product is visible

### 2. Alternative Test - Search with Button Click
**Test Name**: `alternative approach - search using button click`

Steps:
- Same as above but submits search by clicking the search button instead of pressing Enter
- Provides an alternative submission method

### 3. Comprehensive Test - With Error Handling
**Test Name**: `comprehensive search test with error handling`

Steps:
- Includes detailed error handling for navigation failures
- Multiple fallback strategies for finding the search input
- Multiple strategies for verifying the product (text matching + page content check)
- Best practice error messages

## Key Features

✅ **Robust Selectors** - Multiple CSS selector strategies to find elements:
- `input[name="search_query"]` - Primary selector
- `input#searchbox` - Alternative ID-based selector
- `input[placeholder*="search" i]` - Placeholder-based selector
- `input[type="search"]` - Type-based selector

✅ **Multiple Verification Strategies**:
- Text content matching with regex
- Page content inspection
- Visibility assertions

✅ **Error Handling**:
- Graceful fallbacks
- Informative error messages
- Multiple submission methods

✅ **Best Practices**:
- Clear step comments
- Proper wait states
- TypeScript support
- Accessibility-friendly locators

## Running the Tests

### Run All Tests
```bash
npm test
```

### Run Only T-shirt Search Tests
```bash
npx playwright test tests/search-tshirts.spec.ts
```

### Run Specific Test
```bash
npx playwright test tests/search-tshirts.spec.ts -g "should navigate"
```

### Run in UI Mode (Debug)
```bash
npm run test:ui
```

### Run in Debug Mode
```bash
npm run test:debug
```

### Run on Specific Browser
```bash
npx playwright test tests/search-tshirts.spec.ts --project=chromium
npx playwright test tests/search-tshirts.spec.ts --project=firefox
npx playwright test tests/search-tshirts.spec.ts --project=webkit
```

## Configuration

**File**: `playwright.config.ts`

- **Test Directory**: `./tests`
- **Timeout**: 30 seconds per test
- **Browsers**: Chromium, Firefox, WebKit
- **Reporter**: HTML report
- **Base URL**: http://www.automationpractice.pl

## View Test Report

After running tests:
```bash
npx playwright show-report
```

## Troubleshooting

### Website Accessibility Issues
If you encounter redirect or connectivity issues:
1. Verify the website is accessible: `curl -I http://www.automationpractice.pl/index.php`
2. Check your network connection
3. Try running with `--debug` flag: `npm run test:debug`

### Selector Not Found
The test includes multiple selector strategies. If a selector fails:
1. The test will try alternative selectors automatically
2. Run in debug mode to inspect the page structure
3. Refer to the error message for which selectors were attempted

### Timeout Issues
If tests timeout:
1. Increase the timeout in `playwright.config.ts`
2. Check network speed/website performance
3. Run with `--headed` to watch the test execution

## Dependencies

- **@playwright/test**: ^1.59.1
- **Node.js**: 14+

## Files Overview

```
├── tests/
│   └── search-tshirts.spec.ts    # Main test file
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies
└── TEST_README.md                 # This file
```

## Test Scenario Walkthrough

### Step 1: Navigation
```typescript
await page.goto('http://www.automationpractice.pl/index.php');
await page.waitForLoadState('domcontentloaded');
```

### Step 2: Search for T-shirts
```typescript
const searchInput = page.locator('input[name="search_query"]');
await searchInput.fill('T-shirts');
await searchInput.press('Enter');
```

### Step 3: Verify Product
```typescript
const fadedTshirtProduct = page.locator('text=/Faded Short Sleeve T-shirt/i');
await expect(fadedTshirtProduct).toBeVisible();
```

## Expected Behavior

✅ **Pass Condition**:
- Page navigates successfully
- Search input is found and filled
- Search is submitted
- "Faded Short Sleeve T-shirt" product appears in results

❌ **Fail Condition**:
- Navigation fails
- Search elements cannot be found
- Product is not visible after search
- Timeout occurs

## Notes

- Tests are configured to run on **multiple browsers** by default (Chromium, Firefox, WebKit)
- Tests include **comprehensive error handling** and clear logging
- The test suite is **maintainable** and follows **Playwright best practices**
- Selectors use **multiple strategies** for maximum compatibility

## Support

For issues or questions:
1. Check the console output for specific error messages
2. Run with `--debug` flag for step-by-step execution
3. View the HTML report with `npx playwright show-report`
4. Check Playwright documentation: https://playwright.dev
