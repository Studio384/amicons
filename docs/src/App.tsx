import { RouterProvider } from "react-router";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { pacerDevtoolsPlugin } from "@tanstack/react-pacer-devtools";

import { router } from "./Router";

export default function App() {
  return (
    <>
      <TanStackDevtools config={{ hideUntilHover: true }} plugins={[pacerDevtoolsPlugin()]} />
      <RouterProvider router={router} />
    </>
  );
}
