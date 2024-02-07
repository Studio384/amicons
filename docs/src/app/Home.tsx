import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { Box, Button, Container, IconButton, Input, Sheet, Stack, Typography } from '@mui/joy';

import icons from '@/data/icons';
import Codeblock from '@/design/components/Codeblock';
import Header from '@/design/layout/LayoutElements/Header';

import AmaranthIcon, { aiAGum, aiAmicons, aiBook, aiCircleInfo, aiFlag, aiLockOpen, aiMagnifyingGlass, aiPatreon } from '@studio384/amaranth';

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  function onSearchSubmit() {
    const searchParams = { search };
    const searchQuery = `?${createSearchParams(searchParams)}`;
    navigate({ pathname: '/icons', search: searchQuery });
  }

  return (
    <>
      <Header>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={5} sx={{ my: 7 }}>
          <Stack gap={5} sx={{ flexGrow: 1 }}>
            <Box>
              <Typography level="h1" fontWeight="xl" fontSize={48}>
                <Typography color="primary">{icons.length}</Typography> amicable icons
                <br />
                to delight <Typography color="primary">your</Typography> designs
              </Typography>
            </Box>

            <form onSubmit={onSearchSubmit}>
              <Input
                startDecorator={
                  <IconButton type="submit" color="primary" sx={{ borderRadius: 'md' }}>
                    <AmaranthIcon icon={aiMagnifyingGlass} />
                  </IconButton>
                }
                size="lg"
                placeholder="Find your icon"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  px: 4,
                  py: 2,
                  background: 'rgba(var(--joy-palette-background-channel) / .5)',
                  borderRadius: 'xl',
                  boxShadow: 'lg',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(var(--joy-palette-background-channel) / .5)'
                }}
              />
            </form>
          </Stack>
          <Box
            sx={{
              '--Amicon-scale': '16px',
              p: 4,
              background: 'rgba(var(--joy-palette-background-channel) / .5)',
              borderRadius: 'xl',
              boxShadow: 'lg',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(var(--joy-palette-background-channel) / .5)'
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                // Icon display
                '--Amicon-scale': '16px',
                color: 'text.primary',
                borderColor: 'var(--joy-palette-primary-600)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'calc(var(--Amicon-scale) * 16)',
                height: 'calc(var(--Amicon-scale) * 16)',
                borderRadius: 'sm',
                backgroundColor: 'transparent',
                backgroundSize: 'var(--Amicon-scale) var(--Amicon-scale)',
                backgroundPosition: '-1px -1px',
                backgroundImage:
                  'linear-gradient(to right, var(--joy-palette-primary-600) 1px, transparent 1px), linear-gradient(to bottom, var(--joy-palette-primary-600) 1px, transparent 1px)'
              }}
            >
              <AmaranthIcon icon={aiAmicons} style={{ fontSize: 'calc(var(--Amicon-scale) * 16)' }} />
            </Sheet>
          </Box>
        </Stack>
      </Header>
      <Container>
        <Stack gap={10} sx={{ my: 5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Stack gap={1} justifyContent="center">
              <Typography level="h2">Get started</Typography>
              <Typography>Get started with Amicons by installing the npm package.</Typography>
              <Codeblock>npm install @studio384/amaranth</Codeblock>
              <Stack direction="row" gap={1} sx={{ mt: 3 }}>
                <Button startDecorator={<AmaranthIcon icon={aiBook} />} onClick={() => navigate('/docs')}>
                  Documentation
                </Button>
              </Stack>
            </Stack>
            <Box
              sx={{
                p: 3,
                borderRadius: 'xl',
                backgroundImage:
                  'radial-gradient(49% 81% at 45% 47%, #032CFF26 0%, #0309FF00 100%),radial-gradient(113% 91% at 17% -2%, #00FFEC1C 0%, #00FFEC00 100%),radial-gradient(142% 91% at 83% 7%, #008BFF36 0%, #00C9FF00 100%),radial-gradient(142% 91% at -6% 74%, #0045FF1C 0%, #0045FF00 100%),radial-gradient(142% 91% at 111% 84%, #007BFF26 0%, #007BFF12 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                fontSize: 'xl4',
                border: '1px solid var(--joy-palette-primary-outlinedBorder)',
                height: 300
              }}
            >
              <AmaranthIcon icon={aiFlag} />
              <AmaranthIcon icon={aiAmicons} />
            </Box>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 'xl',
                backgroundImage:
                  'radial-gradient(49% 81% at 45% 47%, #5EFFAC21 0%, #073AFF00 100%),radial-gradient(113% 91% at 81% 41%, #8BFF5E1F 0%, #FF000000 100%),radial-gradient(142% 91% at 83% 7%, #B8FF001A 0%, #FF000000 100%),radial-gradient(142% 91% at -6% 74%, #5EFF6700 0%, #5EFF6C2B 100%),radial-gradient(142% 91% at 111% 84%, #FFFFFF00 0%, #FFFFFF00 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                fontSize: 'xl4',
                border: '1px solid var(--joy-palette-success-outlinedBorder)',
                height: 300
              }}
            >
              <AmaranthIcon icon={aiAGum} />
              <AmaranthIcon icon={aiCircleInfo} />
            </Box>
            <Stack gap={1} justifyContent="center">
              <Typography level="h2">Made by hand</Typography>
              <Typography>The only "AI" in Amicons are these 2 icons. We may do a full alphabet later.</Typography>
              <Stack direction="row" gap={1} sx={{ mt: 3 }}>
                <Button startDecorator={<AmaranthIcon icon={aiAmicons} />} onClick={() => navigate('/icons')}>
                  Full library
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Stack gap={1} justifyContent="center">
              <Typography level="h2">Open source. Powered by you.</Typography>
              <Typography>Amicons is open source, and funded by you.</Typography>
              <Stack direction="row" gap={1} sx={{ mt: 3 }}>
                <Button startDecorator={<AmaranthIcon icon={aiPatreon} />} onClick={() => navigate('/icons')}>
                  Support us at Patreon
                </Button>
              </Stack>
            </Stack>
            <Box
              sx={{
                p: 3,
                borderRadius: 'xl',
                backgroundImage:
                  'radial-gradient(49% 81% at 45% 47%, #FFE20326 0%, #FFE20300 100%),radial-gradient(113% 91% at 17% -2%, #FF5A0021 0%, #FF5A0000 100%),radial-gradient(142% 91% at 83% 7%, #FFDB0036 0%, #FFDB0000 100%),radial-gradient(142% 91% at -6% 74%, #FF004917 0%, #FF004900 100%),radial-gradient(142% 91% at 111% 84%, #FF700026 0%, #FF000014 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                fontSize: 'xl4',
                border: '1px solid var(--joy-palette-danger-outlinedBorder)',
                height: 300
              }}
            >
              <AmaranthIcon icon={aiLockOpen} />
              <AmaranthIcon icon={aiPatreon} />
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
