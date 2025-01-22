const { setDefaultTimeout, After, Before } = require('@cucumber/cucumber');
const fs = require('fs');

// Set default timeout for steps
setDefaultTimeout(60 * 1000); // 1 minute

// Before hook: Run before each scenario
Before(function () {
  console.log('Starting a new scenario...');
});

// After hook: Cleanup actions after each scenario
After(async function (scenario) {
  if (scenario.result.status === 'failed') {
    const screenshotPath = `reports/screenshots/${Date.now()}-failed.png`;
    await this.driver.saveScreenshot(screenshotPath);
    console.log(`Screenshot saved to: ${screenshotPath}`);
  }
});

// Cucumber options
module.exports = {
  default: {
    format: [
      'summary', // Prints a summary report to the console
      'json:report/cucumber_report.json', // Generates a JSON report
    ],
    paths: {
      features: 'test/features/**/*.feature', // Path to feature files
      stepDefinitions: 'test/step_definitions/**/*.js', // Path to step definitions
    },
    environment: 'default', // Name of the environment (default is fine for most setups)
    browser: 'chrome', // Browser for running tests
  },
};
