Feature: Manage tasks in the To-Do app

  Scenario: Add a new task
    Given I open the To-Do app
    When I enter "Test Task 1" in the "Add a new task..." input field
    And I click the "Add Task" button
    Then I should see "Test Task 1" in the task list

  Scenario: Edit an existing task
    Given I open the To-Do app
    And I add a task "Test Task 1" to the task list
    When I click the "Edit" button for the task "Test Task 1"
    And I update the text to "Updated Task 1"
    Then I should see "Updated Task 1" in the task list

  Scenario: Delete a task
    Given I open the To-Do app
    And I add a task "Test Task 1" to the task list
    When I click the "Delete" button for the task "Test Task 1"
    Then the task "Test Task 1" should no longer appear in the task list

  Scenario: Add multiple tasks
    Given I open the To-Do app
    When I enter "Task 1" in the "Add a new task..." input field
    And I click the "Add Task" button
    And I enter "Task 2" in the "Add a new task..." input field
    And I click the "Add Task" button
    Then I should see "Task 1" and "Task 2" in the task list

  Scenario: Ensure empty input is not allowed
    Given I open the To-Do app
    When I leave the "Add a new task..." input field empty
    And I click the "Add Task" button
    Then I should see an error message "Please enter an action item first!"
