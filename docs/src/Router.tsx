import { createHashRouter, Navigate } from 'react-router';

import Docs from './app/Docs';
import PageBeat from './app/Docs/pages/Beat';
import PageBounce from './app/Docs/pages/Bounce';
import Changelog from './app/Docs/pages/Changelog';
import PageFade from './app/Docs/pages/Fade';
import PageFlip from './app/Docs/pages/Flip';
import PageInstallation from './app/Docs/pages/Installation';
import PageRotate from './app/Docs/pages/Rotate';
import PageSpin from './app/Docs/pages/Spin';
import Error from './app/Error';
import Icon from './app/Icon';
import Icons from './app/Icons';
import Layout from './design/layout/Layout';

const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Icons />
      },
      {
        path: '/icons',
        element: <Icons />
      },
      {
        path: '/icons/:slug',
        element: <Icon />
      },
      {
        path: '/docs',
        element: <Docs />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Navigate to="installation" replace />
          },
          {
            path: 'installation',
            element: <PageInstallation />
          },
          {
            path: 'spin',
            element: <PageSpin />
          },
          {
            path: 'bounce',
            element: <PageBounce />
          },
          {
            path: 'rotate',
            element: <PageRotate />
          },
          {
            path: 'flip',
            element: <PageFlip />
          },
          {
            path: 'beat',
            element: <PageBeat />
          },
          {
            path: 'fade',
            element: <PageFade />
          },
          {
            path: 'changelog',
            element: <Changelog />
          }
        ]
      },
      {
        path: '/changelog',
        element: <Docs />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Changelog />
          }
        ]
      }
    ]
  }
]);

export default router;
