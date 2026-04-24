import { test, expect } from '@playwright/test';

test('Ticket booking flow simulation', async ({ page }) => {

  // 1. Open site
  await page.goto('https://www.demoblaze.com');

  // 2. Select product (acts like ticket/event selection)
  await page.click('text=Samsung galaxy s6');

  // 3. Handle alert BEFORE triggering action
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // 4. Add to cart
  await page.click('text=Add to cart');

  // 5. Go to cart
  await page.click('#cartur');

  // 6. Wait for Place Order button (stable UI wait)
  const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
  await placeOrderBtn.waitFor({ state: 'visible' });

  // 7. Click Place Order
  await placeOrderBtn.click();

  // 8. Fill booking form
  await page.fill('#name', 'Test User');
  await page.fill('#country', 'India');
  await page.fill('#city', 'Chennai');
  await page.fill('#card', '1234567890123456');
  await page.fill('#month', '12');
  await page.fill('#year', '2026');

  // 9. Purchase booking
  await page.click('text=Purchase');

  // 10. Validate success message
  await expect(page.locator('.sweet-alert')).toContainText('Thank you');
});