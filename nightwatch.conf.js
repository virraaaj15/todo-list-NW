// const chromedriver = require('chromedriver');

// module.exports = {
//   src_folders: ['step_definitions'], // Path to your step definitions
//   page_objects_path: ['pages'], // Path to your page objects
//   custom_commands_path: '', // Add custom commands path if needed
//   custom_assertions_path: '', // Add custom assertions path if needed
//   globals_path: '', // Add globals path if needed

//   test_runner: {
//     type: 'cucumber',
//     options: {
//       feature_path: 'features/todo.feature', // Path to the feature file
//       auto_start_session: false,
//       additional_config: '',
//     },
//   },
//   test_settings: {
//     default: {
//       launch_url: '/Users/virajyadav/Desktop/todo-list/todo_list.html', // Replace with your app URL
//       webdriver: {
//         start_process: true,
//         server_path: chromedriver.path,
//         port: 9515,
//       },
//       desiredCapabilities: {
//         browserName: 'chrome', // Use Chrome as the default browser
//         chromeOptions: {
//           args: [
//             '--headless', // Run tests in headless mode
//             '--disable-gpu',
//             '--window-size=1280,800',
//           ],
//         },
//       },
//     },
//   },

//   cucumber: {
//     options: {
//       feature_path: 'features/**/*.feature', // Path to feature files
//       parallel: 0, // Disable parallel execution
//       format: [
//         'pretty', // Human-readable console output
//         'json:reports/cucumber_report.json', // JSON report for test results
//       ],
//     },
//   },
  
// };
const chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['step_definitions'], // Path to your step definitions
  page_objects_path: ['pages'], // Path to your page objects

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features/**/*.feature', // Match all feature files
      auto_start_session: true, // Automatically start a browser session
      format: [
        'json:reports/cucumber_report.json', // JSON report for test results
        'html:reports/cucumber_report.html', // HTML report for test results
      ],
    },
  },

  test_settings: {
    default: {
      launch_url: 'file:///Users/virajyadav/Desktop/todo-list/todo_list.html', // Local file path as URL
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 9515,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            // '--headless', // Run in headless mode
            // '--disable-gpu',
            '--window-size=1280,800',
          ],
        },
      },
    },
  },
};
