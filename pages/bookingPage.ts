import { Page, expect } from '@playwright/test';

export class BookingPage {
  constructor(private page: Page) {}

  async openSite() {
    await this.page.goto('https://www.demoblaze.com');
  }

  async selectProduct() {
    await this.page.click('text=Samsung galaxy s6');
  }

  async addToCart() {
    this.page.on('dialog', async dialog => await dialog.accept());
    await this.page.click('text=Add to cart');
  }

  async goToCart() {
    await this.page.click('#cartur');
  }

  async openOrderForm() {
    const btn = this.page.getByRole('button', { name: 'Place Order' });
    await btn.waitFor({ state: 'visible' });
    await btn.click();
  }

  async fillForm(data: any) {
    await this.page.fill('#name', data.name);
    await this.page.fill('#country', data.country);
    await this.page.fill('#city', data.city);
    await this.page.fill('#card', data.card);
    await this.page.fill('#month', data.month);
    await this.page.fill('#year', data.year);
  }

  async purchase() {
    await this.page.click('text=Purchase');
  }

  async validateSuccess() {
    await expect(this.page.locator('.sweet-alert')).toContainText('Thank you');
  }
}