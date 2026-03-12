import { RouterProvider } from 'react-router';

import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';

import joyTheme from './design/joyTheme';
import { router } from './Router';

export default function App() {
  return (
    <CssVarsProvider theme={joyTheme} defaultMode="light">
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            scrollBehavior: 'smooth'
          }
        }}
      />
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
}
