const { Given, When, Then, Before } = require('@cucumber/cucumber');
const todoPage = require('../pages/todoPage');

Before(async function () {
  console.log('Resetting the app state before the scenario...');
  await todoPage.navigateToApp();
  await browser.execute(() => {
    localStorage.clear(); // Clear local storage to ensure a fresh state
  });
  await browser.pause(2000); // Pause to observe reset
});

// Scenario: Add a new task
Given('I open the To-Do app', async function () {
  console.log('Navigating to the To-Do app...');
  await todoPage.navigateToApp();
  await browser.pause(2000); // Pause to observe app load
});

When('I enter {string} in the "Add a new task..." input field', async function (taskText) {
  console.log(`Entering task: "${taskText}"`);
  await todoPage.enterTask(taskText);
  await browser.pause(1000); // Pause to observe input
});

When('I click the "Add Task" button', async function () {
  console.log('Clicking the Add Task button');
  await todoPage.clickAddTaskButton();
  await browser.pause(2000); // Pause to observe addition
});

Then('I should see {string} in the task list', async function (taskText) {
  console.log(`Verifying task "${taskText}" is in the task list...`);
  await todoPage.verifyTaskInList(taskText);
  await browser.pause(2000); // Pause to observe verification
});

// Scenario: Edit an existing task
Given('I add a task {string} to the task list', async function (taskText) {
  console.log(`Adding task "${taskText}" to the task list`);
  await todoPage.enterTask(taskText);
  await todoPage.clickAddTaskButton();
  await browser.pause(2000); // Pause to observe addition
});

When('I click the "Edit" button for the task {string}', async function (taskText) {
  console.log(`Clicking Edit button for task "${taskText}"`);
  await todoPage.clickEditButton(taskText);
  await browser.pause(2000); // Pause to observe editing
});

When('I update the text to {string}', async function (newText) {
  console.log(`Updating task text to "${newText}"`);
  await todoPage.updateTaskText(newText);
  await browser.pause(2000); // Pause to observe update
});

// Scenario: Delete a task
When('I click the "Delete" button for the task {string}', async function (taskText) {
  console.log(`Clicking Delete button for task "${taskText}"`);
  await todoPage.clickDeleteButton(taskText);
  await browser.pause(2000); // Pause to observe deletion
});

Then('the task {string} should no longer appear in the task list', async function (taskText) {
  console.log(`Verifying task "${taskText}" is not in the task list.`);
  await todoPage.verifyTaskNotInList(taskText);
  await browser.pause(2000); // Pause to observe verification
});

// Scenario: Add multiple tasks
When('I add multiple tasks {string} and {string} to the task list', async function (task1, task2) {
  console.log(`Adding multiple tasks "${task1}" and "${task2}" to the task list`);
  await todoPage.enterTask(task1);
  await todoPage.clickAddTaskButton();
  await browser.pause(1000); // Pause to observe first task addition

  await todoPage.enterTask(task2);
  await todoPage.clickAddTaskButton();
  await browser.pause(2000); // Pause to observe second task addition
});

Then('I should see {string} and {string} in the task list', async function (task1, task2) {
  console.log(`Verifying tasks "${task1}" and "${task2}" are in the task list...`);
  await todoPage.verifyTaskInList(task1);
  await todoPage.verifyTaskInList(task2);
  await browser.pause(2000); // Pause to observe verification
});

// Scenario: Ensure empty input is not allowed
When('I leave the "Add a new task..." input field empty', async function () {
  console.log('Clearing the input field');
  await todoPage.clearInputField();
  await browser.pause(1000); // Pause to observe cleared input
});

Then('I should see an error message {string}', async function (errorMessage) {
  console.log(`Verifying error message: "${errorMessage}"`);
  await todoPage.verifyErrorMessage(errorMessage);
  await browser.pause(2000); // Pause to observe error
});
