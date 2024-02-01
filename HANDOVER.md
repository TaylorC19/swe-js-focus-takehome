## Task 1

I have determined that one issue is caused by a disconnect between the server-rendered html and the render attempted to be hydrated client-side. 

Current cause starts in `src\client\index.tsx` where the 'store' object is not being collected by the `context.hydrate` function in `src\client\App\hydration.ts`.

Note: the store data is being included in the html from the server-side render. There seems to be an issue causing that to not be selected by the `context.hydrate` function. 

Current issues: 
1. The data-preloaded id is not the same between the server-side render and the client. Needs investigation.
  Due to the context initiation using `Math.random()` to make the id, it creates a different value between the server-side render and the client hydration. 
  Current solutions: 
  set that id to a static number in `src\client\App\hydration.ts`. ✔ Works but I have concerns with this solution

  Other ideas: 
  Send the context id to the client. Might need redesign of how backend send html to client
  Create a new invisible html element that stores the id from the server-side render to keep the random element to the id.


2. Even with the selector fixed in `context.hydrate`, hydration still has a problem with `isCTAOpen` in `src\client\Pages\ShopBookingPage\useController.tsx`
  solution: renderModal was using `this` statements when it should have been using state/api.