Task 2:

Currently in `e2e.spec.ts` on lines 92-104. They regularly fail to upload the menu itmes to `/shops/:id/menu`. I have yet to find the cause. It was working find one day, then the next morning all I can get for the menu is an empty array. 

I have confirmed with console logs that the two elements generated with `client["get /shops/:shop/menu 200"]` are correct and have no issues. The issue seems to be in saving that to `/shops/:id/menu`. When running only the second test starting on line 83, it is more likely to save the menu.

When it does add the items correctly, each menu item is rendered in the pop up and each item follows minimum and maximum quantity. It also limits items based on party size.