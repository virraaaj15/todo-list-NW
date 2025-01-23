const reporter = require('cucumber-html-reporter');

reporter.generate({
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json', // Path to the JSON report file
  output: 'reports/testReport.html', // Path for the generated HTML report
  reportSuiteAsScenarios: true,
  launchReport: true, // Automatically open the report in the default browser
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Local",
    "Browser": "Chrome 89",
    "Platform": "MacOS",
    "Parallel": "Scenarios",
    "Executed": "Local",
  },
});
