import { Outlet } from 'react-router';

import { Box, Stack } from '@mui/joy';

import Header from '@/design/layout/LayoutElements/Header';

import DocsNavigation from './Docs/Navigation';

export default function Docs() {
  return (
    <>
      <Header>
        <h1 className="font-display py-2 text-5xl font-medium text-black">Documentation</h1>
      </Header>
      <div className="container m-auto my-8 max-w-7xl px-4">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '220px auto',
            gap: 3
          }}
        >
          <Box sx={{ position: 'sticky', top: 58 + 32, overflow: 'auto', maxHeight: 'calc(100dvh - 58px - 32px)', alignSelf: 'flex-start' }}>
            <DocsNavigation />
          </Box>
          <Stack gap={4}>
            <Outlet />
          </Stack>
        </Box>
      </div>
    </>
  );
}
