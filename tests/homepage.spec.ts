import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Playwright.dev Homepage Interactive Suite', () => {

  test('01 - homepage should have correct title', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.assertTitle();
  });

  test('02 - Get Started link should navigate to Docs', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickGetStarted();
    await home.assertDocsUrl();
  });

  test('03 - navigate to Docs then go back to Home', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickDocs();
    await home.assertDocsUrl();
    await home.goBack();
    await home.assertTitle();
  });

  test('04 - navigate to Docs then forward again', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickDocs();
    await home.assertDocsUrl();
    await home.goBack();
    await home.goForward();
    await home.assertDocsUrl();
  });

  test('05 - API link should navigate to API page', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickApi();
    await home.assertApiUrl();
  });


  test('06 - header should contain Docs, API, and Community links', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.verifyHeaderLinks();
  });

  test('07 - navigation bar should collapse on small viewport', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.resizeToMobile();
  });

  test('08 - footer should be visible after scrolling', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.footer.scrollIntoViewIfNeeded();
    await home.checkFooterVisible();
  });

  test('06 - end-to-end flow: Home → Docs → API → back Home', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.clickDocs();
    await home.assertDocsUrl();

    await home.goBack();
    await home.clickApi();
    await home.assertApiUrl();

    await home.goBack();
    await home.assertTitle();
  });
});
