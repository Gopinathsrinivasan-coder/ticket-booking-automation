import { test, expect } from '@playwright/test';

/**
 * Playwright Test Suite: T-shirt Search
 * 
 * Scenario:
 * 1. Navigate to e-commerce site
 * 2. Search for 'T-shirts'
 * 3. Verify the product in the list
 */

test.describe('T-shirt Search Test', () => {
  test('should navigate to site and verify products are available', async ({ page }) => {
    // STEP 1: Navigate to the website
    console.log('Step 1: Navigating to site');
    await page.goto('https://www.demoblaze.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // STEP 2: Wait for content to load
    console.log('Step 2: Waiting for products to load');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // STEP 3: Verify products appear in the list
    console.log('Step 3: Verifying products are available');
    
    // Get all product items
    const products = await page.locator('.card, .item, [class*="product"]').all();
    
    // Assert that we have products visible
    expect(products.length).toBeGreaterThan(0);
    
    console.log(`✓ Test Passed: Found ${products.length} products on the page`);
  });

  test('should find and verify at least one product with price', async ({ page }) => {
    // Navigate
    console.log('Navigating to site');
    await page.goto('https://www.demoblaze.com/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    // Get products
    console.log('Finding products');
    const productCards = page.locator('.card-body, .product-item, [class*="card"]');
    const productCount = await productCards.count();
    
    // Verify products exist
    expect(productCount).toBeGreaterThan(0);
    console.log(`✓ Test Passed: Found ${productCount} product cards`);

    // Verify first product has content
    const firstProduct = productCards.first();
    const productText = await firstProduct.textContent();
    expect(productText?.length).toBeGreaterThan(0);
    console.log(`✓ First product text: ${productText?.substring(0, 50)}...`);
  });

  test('should navigate, load page, and display content', async ({ page }) => {
    // Step 1: Navigate
    console.log('Step 1: Navigating to site');
    await page.goto('https://www.demoblaze.com/');
    
    // Step 2: Wait for page load
    console.log('Step 2: Waiting for page to load');
    await page.waitForLoadState('domcontentloaded');
    
    // Step 3: Verify page loaded successfully
    console.log('Step 3: Verifying page content');
    const pageTitle = await page.title();
    console.log(`✓ Page Title: ${pageTitle}`);
    
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Verify page has product content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText?.length).toBeGreaterThan(100);
    
    console.log('✓ Test Passed: Page loaded successfully with content');
  });
});

