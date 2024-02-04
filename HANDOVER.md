## Task 4:

I implemented the teardown endpoint in cypress (it already existed in openAPI server.ts but wasn't added to cypress api or in the test).

  - test are now repeatable without restarting cypress
  - new describe block that test if the menu items respect the min and max quantities.

## Next

  - Submission handler: it currently checks the people count, it should check the meal count as well
  - Make the menu ordering a second step on a separate page after selecting the party size
  - optional menu item image display
  - add icons for adult, senior, child, and baby, and clean up the label and input row.