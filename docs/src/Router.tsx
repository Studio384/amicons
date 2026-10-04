import { createHashRouter, Navigate } from "react-router";

import NeoPageAbout from "./neo/app/docs/About.mdx";
import NeoPageBeat from "./neo/app/docs/Beat.mdx";
import NeoPageBounce from "./neo/app/docs/Bounce.mdx";
import NeoPageFade from "./neo/app/docs/Fade.mdx";
import NeoPageFlip from "./neo/app/docs/Flip.mdx";
import NeoPageInstallation from "./neo/app/docs/Installation.mdx";
import NeoPageRotate from "./neo/app/docs/Rotate.mdx";
import NeoPageSpin from "./neo/app/docs/Spin.mdx";
import NeoDocumentation from "./neo/app/Documentation";
import NeoError from "./neo/app/Error";
import NeoIcon from "./neo/app/Icon";
import NeoIcons from "./neo/app/Icons";
import NeoReleasePage from "./neo/app/Release";
import NeoReleases from "./neo/app/Releases";
import NeoLayout from "./neo/design/layouts/Layout";

export const router = createHashRouter([
  {
    path: "/neo",
    Component: NeoLayout,
    children: [
      { index: true, Component: NeoIcons },
      {
        path: "icons",
        Component: NeoIcons,
        children: [{ path: ":slug", Component: NeoIcon }],
      },
      {
        path: "releases",
        errorElement: <NeoError />,
        children: [
          { index: true, Component: NeoReleases },
          { path: ":slug", Component: NeoReleasePage },
        ],
      },
      {
        path: "documentation",
        Component: NeoDocumentation,
        errorElement: <NeoError />,
        children: [
          { index: true, element: <Navigate to="installation" replace /> },
          { path: "about", Component: NeoPageAbout },
          { path: "installation", Component: NeoPageInstallation },
          { path: "spin", Component: NeoPageSpin },
          { path: "bounce", Component: NeoPageBounce },
          { path: "rotate", Component: NeoPageRotate },
          { path: "flip", Component: NeoPageFlip },
          { path: "beat", Component: NeoPageBeat },
          { path: "fade", Component: NeoPageFade },
        ],
      },
      { path: "*", Component: NeoError },
    ],
  },
  // The legacy routes have been retired, so send anything else back home
  { path: "*", element: <Navigate to="/neo" replace /> },
]);
