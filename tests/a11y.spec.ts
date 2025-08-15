import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Touch Target Size (Desktop)', () => {
  test('should have no WCAG 2.5.8 violations', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules('target-size')
      .analyze();

    expect(accessibilityScanResults.violations.length).toBe(0);
  });
});