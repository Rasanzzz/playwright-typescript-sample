import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;
  readonly logo: Locator;
  readonly searchBox: Locator;
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly communityLink: Locator;
  readonly getStartedLink: Locator;
  readonly sidebarLink: Locator;
  readonly heading: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.logo = page.getByRole('link', { name: 'Playwright' });
    this.searchBox = page.locator('input[type="search"]');
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.apiLink = page.getByRole('link', { name: 'API' });
    this.communityLink = page.getByRole('link', { name: 'Community' });
    this.getStartedLink = page.getByRole('link', { name: 'Get Started' });
    this.sidebarLink = page.locator('.menu__list-item a').first();
    this.heading = page.locator('main h1');
    this.mobileMenuButton = page.getByRole('button', { name: 'Toggle navigation bar' });
  }

  async navigateToURL() { await this.page.goto('https://playwright.dev/'); }
  async assertTitle() { await expect(this.page).toHaveTitle(/Playwright/); }
  async clickGetStarted() { await this.getStartedLink.click(); }
  async clickDocs() { await this.docsLink.click(); }
  async clickApi() { await this.apiLink.click(); }
  async clickCommunity() { await this.communityLink.click(); }
  async assertDocsUrl() { await expect(this.page).toHaveURL(/.*docs/); }
  async assertApiUrl() { await expect(this.page).toHaveURL(/.*api/); }
  async goBack() { await this.page.goBack(); }
  async goForward() { await this.page.goForward(); }
  async checkHeaderVisible() { await expect(this.header).toBeVisible(); }
  async checkFooterVisible() { await expect(this.footer).toBeVisible(); }
  async checkLogoVisible() { await expect(this.logo).toBeVisible(); }
  async verifyHeaderLinks() {
    await expect(this.docsLink).toBeVisible();
    await expect(this.apiLink).toBeVisible();
    await expect(this.communityLink).toBeVisible();
  }
  async openFirstSidebarLink() {
    const text = await this.sidebarLink.innerText();
    await this.sidebarLink.click();
    await expect(this.heading).toHaveText(text);
  }
  async resizeToMobile() {
    await this.page.setViewportSize({ width: 500, height: 800 });
    await expect(this.mobileMenuButton).toBeVisible();
    await this.mobileMenuButton.click();
    await expect(this.docsLink).toBeVisible();
  }
}
