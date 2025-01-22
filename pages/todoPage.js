const locators = require('../locators/todoLocators');

class TodoPage {
  async navigateToApp() {
    console.log('Navigating to the To-Do app...');
    await browser.url(locators.appUrl); // Use locators for app URL
    console.log('Successfully navigated to the app.');
  }

  async enterTask(taskText) {
    console.log(`Entering task: "${taskText}"`);
    await browser.waitForElementVisible(locators.inputField, 5000);
    await browser.setValue(locators.inputField, taskText);
  }

  async clickAddTaskButton() {
    console.log('Clicking the Add Task button...');
    await browser.waitForElementVisible(locators.addButton, 5000);
    await browser.click(locators.addButton);
    console.log('Task added successfully.');
  }

  async verifyTaskInList(taskText) {
    console.log(`Verifying task "${taskText}" is in the list...`);
  
    // Wait for the task list to be visible
    await browser.waitForElementVisible(locators.taskItem, 5000);
  
    // Use `elements` to find all tasks matching the locator
    const tasks = await browser.elements('css selector', locators.taskItem);
  
    let taskFound = false;
  
    // Loop through the tasks and check each one
    for (let i = 0; i < tasks.length; i++) {
      const taskSelector = `${locators.taskItem}:nth-of-type(${i + 1}) ${locators.taskText}`;
      const isVisible = await browser.isVisible(taskSelector);
  
      if (isVisible) {
        const text = await browser.getText(taskSelector);
  
        if (text.trim() === taskText) {
          console.log(`Task "${taskText}" successfully found in the list.`);
          taskFound = true;
          break;
        }
      }
    }
  
    if (!taskFound) {
      throw new Error(`Task "${taskText}" was not found in the task list.`);
    }
  }
  
  
  
  async clickEditButton(taskText) {
    console.log(`Clicking Edit button for task "${taskText}"...`);
  
    // Wait for the task list to be visible
    await browser.waitForElementVisible(locators.taskItem, 5000);
  
    let editButtonFound = false;
  
    // Use a direct approach with indexed selectors
    const tasks = await browser.elements('css selector', locators.taskItem);
  
    for (let i = 0; i < tasks.length; i++) {
      const taskSelector = `${locators.taskItem}:nth-of-type(${i + 1}) ${locators.taskText}`;
      const editButtonSelector = `${locators.taskItem}:nth-of-type(${i + 1}) ${locators.editButton}`;
  
      const taskVisible = await browser.isVisible(taskSelector);
  
      if (taskVisible) {
        const text = await browser.getText(taskSelector);
  
        if (text.trim() === taskText) {
          const editButtonVisible = await browser.isVisible(editButtonSelector);
  
          if (editButtonVisible) {
            await browser.click(editButtonSelector);
            console.log(`Edit button for task "${taskText}" clicked successfully.`);
            editButtonFound = true;
            break;
          }
        }
      }
    }
  
    if (!editButtonFound) {
      throw new Error(`Edit button for task "${taskText}" not found.`);
    }
  }

  
  async updateTaskText(newText) {
    console.log(`Updating task text to "${newText}" using the alert box...`);
  
    // Verify the alert is present
    const alertText = await browser.alerts.getText();
    console.log(`Alert text before update: "${alertText}"`);
  
    // Set the new text in the alert box and accept it
    await browser.alerts.setText(newText);
    await browser.alerts.accept();
  
    console.log(`Task text successfully updated to "${newText}".`);
  }
  
  

  async clickDeleteButton(taskText) {
    console.log(`Clicking Delete button for task "${taskText}"...`);
  
    // Wait for the task list to be visible
    await browser.waitForElementVisible(locators.taskItem, 5000);
  
    let deleteButtonFound = false;
  
    // Use a direct approach with indexed selectors
    const tasks = await browser.elements('css selector', locators.taskItem);
  
    for (let i = 0; i < tasks.length; i++) {
      const taskSelector = `${locators.taskItem}:nth-of-type(${i + 1}) ${locators.taskText}`;
      const deleteButtonSelector = `${locators.taskItem}:nth-of-type(${i + 1}) ${locators.deleteButton}`;
  
      const taskVisible = await browser.isVisible(taskSelector);
  
      if (taskVisible) {
        const text = await browser.getText(taskSelector);
  
        if (text.trim() === taskText) {
          const deleteButtonVisible = await browser.isVisible(deleteButtonSelector);
  
          if (deleteButtonVisible) {
            await browser.click(deleteButtonSelector);
            console.log(`Delete button for task "${taskText}" clicked successfully.`);
            deleteButtonFound = true;
            break;
          }
        }
      }
    }
  
    if (!deleteButtonFound) {
      throw new Error(`Delete button for task "${taskText}" not found.`);
    }
  }
  

  async verifyTaskNotInList(taskText) {
    console.log(`Verifying task "${taskText}" is not in the task list...`);
  
    // Check if the task list container exists
    const containerExists = await browser.element('css selector', locators.taskListContainer)
      .then(result => result.status !== -1) // Check if the container exists
      .catch(() => false); // Handle any errors gracefully
  
    if (!containerExists) {
      console.log("Task list container does not exist. Assuming no tasks exist. Verification successful.");
      return; // If the container does not exist, there are no tasks
    }
  
    // Check if any tasks are visible
    const taskListHasEntries = await browser.isVisible(locators.taskItem)
      .catch(() => false); // Handle missing elements gracefully
  
    if (!taskListHasEntries) {
      console.log("Task list is empty. Verification successful.");
      return; // If no tasks are visible, the list is empty
    }
  
    // Loop through tasks and check for the specified task
    let index = 1;
    while (true) {
      const taskSelector = `${locators.taskItem}:nth-of-type(${index}) ${locators.taskText}`;
  
      // Check if the task exists
      const taskExists = await browser.element('css selector', taskSelector)
        .then(result => result.status !== -1)
        .catch(() => false);
  
      if (!taskExists) {
        break; // No more tasks in the list
      }
  
      // Get the text of the task
      const text = await browser.getText(taskSelector);
  
      if (text.trim() === taskText) {
        throw new Error(`Task "${taskText}" was found in the task list but should not exist.`);
      }
  
      index++;
    }
  
    console.log(`Task "${taskText}" is not in the task list.`);
  }
  
  
  
  
  async clearInputField() {
    console.log('Clearing the input field...');
    await browser.waitForElementVisible(locators.inputField, 5000);
    await browser.clearValue(locators.inputField);
  }

  async verifyErrorMessage(errorMessage) {
    console.log(`Verifying error message: "${errorMessage}"...`);
    await browser.waitForElementVisible(locators.errorMessage, 5000);
    await browser.assert.textContains(locators.errorMessage, errorMessage);
    console.log(`Error message "${errorMessage}" verified successfully.`);
  }
}

module.exports = new TodoPage();
