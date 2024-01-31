## Task 1

I have determined that one issue is caused by a disconnect between the server-rendered html and the render attempted to be hydrated client-side. 

Current cause starts in `src\client\index.tsx` where the 'store' object is not being collected by the `context.hydrate` function in `src\client\App\hydration.ts`.

Note: the store data is being included in the html from the server-side render. There seems to be an issue causing that to not be selected by the `context.hydrate` function. 

Current issues: 
1. The data-preloaded id is not the same between the server-side render and the client. Needs investigation.

2. Even with the selector fixed in `context.hydrate`, hydration still has a problem with `isCTAOpen` in `src\client\Pages\ShopBookingPage\useController.tsx`