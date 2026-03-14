import { RouterProvider } from 'react-router';

import { router } from './Router';

export default function App() {
  return <RouterProvider router={router} />;
}
