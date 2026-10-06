import { createHashRouter, Navigate } from "react-router";

import PageAbout from "./app/docs/About.mdx";
import PageBeat from "./app/docs/Beat.mdx";
import PageBounce from "./app/docs/Bounce.mdx";
import PageFade from "./app/docs/Fade.mdx";
import PageFlip from "./app/docs/Flip.mdx";
import PageInstallation from "./app/docs/Installation.mdx";
import PageRotate from "./app/docs/Rotate.mdx";
import PageSpin from "./app/docs/Spin.mdx";
import Documentation from "./app/Documentation";
import Error from "./app/Error";
import Icon from "./app/Icon";
import Icons from "./app/Icons";
import ReleasePage from "./app/Release";
import Releases from "./app/Releases";
import Layout from "./design/layouts/Layout";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Icons },
      {
        path: "icons",
        Component: Icons,
        children: [{ path: ":slug", Component: Icon }],
      },
      {
        path: "releases",
        errorElement: <Error />,
        children: [
          { index: true, Component: Releases },
          { path: ":slug", Component: ReleasePage },
        ],
      },
      {
        path: "documentation",
        Component: Documentation,
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="installation" replace /> },
          { path: "about", Component: PageAbout },
          { path: "installation", Component: PageInstallation },
          { path: "spin", Component: PageSpin },
          { path: "bounce", Component: PageBounce },
          { path: "rotate", Component: PageRotate },
          { path: "flip", Component: PageFlip },
          { path: "beat", Component: PageBeat },
          { path: "fade", Component: PageFade },
        ],
      },
      { path: "*", Component: Error },
    ],
  },
  // The legacy routes have been retired, so send anything else back home
  { path: "*", element: <Navigate to="/" replace /> },
]);
