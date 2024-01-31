import { hydrateRoot } from "react-dom/client";
import { Store } from "../types";
import { App } from "./App/App";
import { context } from "./App/hydration";

const store = context.hydrate<Store>();
// console.log('store', store)

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <App store={store} />
);
