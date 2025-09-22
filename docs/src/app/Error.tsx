import { useNavigate } from 'react-router';

import { Container, IconButton, Stack, Typography } from '@mui/joy';

import Amicon, { aiArrowLeft } from '@studio384/amicons';

export default function Error() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack sx={{ textAlign: 'center' }} alignItems="center">
        <IconButton variant="outlined" onClick={() => navigate('/')} sx={{ mb: 2 }}>
          <Amicon icon={aiArrowLeft} />
        </IconButton>
        <Typography level="h1">Welp, nothing to see here.</Typography>
        <Typography level="body-sm">Error 404</Typography>
      </Stack>
    </Container>
  );
}
