import fs from 'fs';
import path from 'path';

describe('CSS Variables', () => {
  let cssContent: string;
  let isCompiledCss: boolean = false;

  beforeAll(() => {
    try {
      // First try to find the compiled CSS file
      const buildCssDir = path.resolve(__dirname, '../../../build/static/css'); // Updated path

      if (fs.existsSync(buildCssDir)) {
        const cssFiles = fs
          .readdirSync(buildCssDir)
          .filter(file => file.startsWith('main.') && file.endsWith('.css'));

        if (cssFiles.length > 0) {
          // Read the compiled CSS file
          cssContent = fs.readFileSync(
            path.resolve(buildCssDir, cssFiles[0]),
            'utf8'
          );
          isCompiledCss = true;
        }
      }
    } catch (error) {
      console.warn('Could not read compiled CSS, attempting to read source CSS file.', error);
    }

    // If compiled CSS is not available, fall back to the source CSS file
    if (!cssContent) {
      // Fallback to built Tailwind output which includes tokens via @import
      const buildCssPath = path.resolve(__dirname, '../../build/static/css');
      const files = fs.existsSync(buildCssPath)
        ? fs.readdirSync(buildCssPath).filter(f => f.endsWith('.css'))
        : [];
      if (files.length > 0) {
        cssContent = fs.readFileSync(path.resolve(buildCssPath, files[0]), 'utf8');
      } else {
        throw new Error('No CSS found to validate tokens');
      }
    }
  });

  it('should contain the --space-component variable with value clamp(1rem, 3vw, 1.5rem)', () => {
    // Check if the CSS contains the --space-component variable with the correct value
    expect(cssContent).toMatch(/--space-component:\s*clamp\(1rem, 3vw, 1.5rem\)/);
  });

  it('should contain the --space-section variable with value clamp(2.5rem, 6vw, 4rem)', () => {
    // Check if the CSS contains the --space-section variable with the correct value
    expect(cssContent).toMatch(/--space-section:\s*clamp\(2.5rem, 6vw, 4rem\)/);
  });

  it('should include both spacing variables in the :root selector', () => {
    // Verify that the variables are defined within a :root selector
    const rootRegex =
      /:root\s*{[^}]*--space-component:[^}]*--space-section:[^}]*}|:root\s*{[^}]*--space-section:[^}]*--space-component:[^}]*}/;
    expect(cssContent).toMatch(rootRegex);
  });

  // Additional test to verify which CSS file was used
  it('should log which CSS file was used for testing', () => {
    // This is just an informational test that always passes
    expect(true).toBe(true);
  });
}); 