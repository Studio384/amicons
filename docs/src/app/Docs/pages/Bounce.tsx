import { Stack, Typography } from '@mui/joy';

import Code from '@/design/components/Code';

import { aiArrowUp, aiMusic, aiValkyrieSword } from '@studio384/amicons';

import ApiTable from '../playground/ApiTable';
import Playground, { IIconCssVariables, IPlaygroundConfig } from '../playground/Playground';

export default function PageBounce() {
  const playgroundConfig: IPlaygroundConfig = {
    icons: [aiValkyrieSword, aiMusic, aiArrowUp],
    properties: [
      {
        label: 'Bounce',
        type: 'chip',
        name: 'bounce',
        values: [true, false],
        default: true
      }
    ],
    cssVariables: [
      {
        name: '--ai-animation-duration',
        default: '1s',
        description: 'Time for a full play through of the animation.'
      },
      {
        name: '--ai-animation-iteration-count',
        default: 'infinite',
        description: 'Number of times the animation is repeated.'
      }
    ]
  };

  return (
    <Stack gap={2}>
      <Typography level="h2">Fade</Typography>
      <Typography>
        With the <Code>fade</Code> property gives you a basic fade animation.
      </Typography>

      <Playground config={playgroundConfig} />

      <Typography level="h3">API</Typography>

      <ApiTable cssVariables={playgroundConfig.cssVariables as IIconCssVariables[]} />
    </Stack>
  );
}
