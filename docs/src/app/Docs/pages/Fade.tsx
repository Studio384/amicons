import { Stack, Typography } from '@mui/joy';

import Code from '@/design/components/Code';

import { aiAmicons, aiCircleHalfInner, aiMusic } from '@studio384/amicons';

import ApiTable from '../playground/ApiTable';
import Playground, { IIconCssVariables, IPlaygroundConfig } from '../playground/Playground';

export default function PageFade() {
  const playgroundConfig: IPlaygroundConfig = {
    icons: [aiAmicons, aiMusic, aiCircleHalfInner],
    properties: [
      {
        label: 'Fade',
        type: 'chip',
        name: 'fade',
        values: [true, false],
        default: true
      }
    ],
    cssVariables: [
      {
        name: '--ai-animation-duration',
        default: '1.5s',
        description: 'Time for a full play through of the animation.'
      },
      {
        name: '--ai-animation-timing-function',
        default: 'ease-in-out',
        description: 'The timing function used for the animation.'
      },
      {
        name: '--ai-animation-iteration-count',
        default: 'infinite',
        description: 'Number of times the animation is repeated.'
      },
      {
        name: '--ai-animation-opacity',
        default: '.4',
        description: 'The lowest opacity of the icon.'
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
