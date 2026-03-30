import { createHashRouter, Navigate } from "react-router";

import Docs from "./app/Docs";
import PageBeat from "./app/Docs/pages/Beat";
import PageBounce from "./app/Docs/pages/Bounce";
import Changelog from "./app/Docs/pages/Changelog";
import PageFade from "./app/Docs/pages/Fade";
import PageFlip from "./app/Docs/pages/Flip";
import PageInstallation from "./app/Docs/pages/Installation";
import PageRotate from "./app/Docs/pages/Rotate";
import PageSpin from "./app/Docs/pages/Spin";
import Error from "./app/Error";
import Icon from "./app/Icon";
import Icons from "./app/Icons";
import Layout from "./design/layout/Layout";

export const router = createHashRouter([
  {
    Component: Layout,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
    children: [
      { path: "/", Component: Icons },
      { path: "/icons", Component: Icons },
      { path: "/icons/:slug", Component: Icon },
      {
        path: "/docs",
        Component: Docs,
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="installation" replace /> },
          { path: "installation", Component: PageInstallation },
          { path: "spin", Component: PageSpin },
          { path: "bounce", Component: PageBounce },
          { path: "rotate", Component: PageRotate },
          { path: "flip", Component: PageFlip },
          { path: "beat", Component: PageBeat },
          { path: "fade", Component: PageFade },
          { path: "changelog", Component: Changelog },
        ],
      },
      {
        path: "/changelog",
        Component: Docs,
        errorElement: <Error />,
        children: [{ index: true, Component: Changelog }],
      },
    ],
  },
]);
