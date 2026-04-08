import { createHashRouter, Navigate } from "react-router";

import Blog from "./app/blog/Blog";
import BlogPost from "./app/blog/BlogPost";
import Docs from "./app/Docs";
import PageAbout from "./app/Docs/pages/About.mdx";
import PageBeat from "./app/Docs/pages/Beat.mdx";
import PageBounce from "./app/Docs/pages/Bounce.mdx";
import PageFade from "./app/Docs/pages/Fade.mdx";
import PageFlip from "./app/Docs/pages/Flip.mdx";
import PageInstallation from "./app/Docs/pages/Installation.mdx";
import Releases from "./app/Docs/pages/Releases.mdx";
import PageRotate from "./app/Docs/pages/Rotate.mdx";
import PageSpin from "./app/Docs/pages/Spin.mdx";
import Error from "./app/Error";
import Icon from "./app/Icon";
import Icons from "./app/Icons";
import Layout from "./design/layout/Layout";
import NeoIcons from "./neo/app/Icons";
import NeoLayout from "./neo/design/layouts/Layout";

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
          { path: "about", Component: PageAbout },
          { path: "installation", Component: PageInstallation },
          { path: "spin", Component: PageSpin },
          { path: "bounce", Component: PageBounce },
          { path: "rotate", Component: PageRotate },
          { path: "flip", Component: PageFlip },
          { path: "beat", Component: PageBeat },
          { path: "fade", Component: PageFade },
          { path: "releases", Component: Releases },
        ],
      },
      {
        path: "/blog",
        errorElement: <Error />,
        children: [
          { index: true, Component: Blog },
          { path: ":slug", Component: BlogPost },
        ],
      },
      {
        path: "/releases",
        Component: Docs,
        errorElement: <Error />,
        children: [{ index: true, Component: Releases }],
      },
    ],
  },
  {
    path: "/neo",
    Component: NeoLayout,
    children: [
      { index: true, Component: NeoIcons },
      { path: "icons", Component: NeoIcons },
    ],
  },
]);
