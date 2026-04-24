import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('https://www.demoblaze.com');
  }

  async selectItem(item: string) {
    await this.page.click(`text=${item}`);
  }
}