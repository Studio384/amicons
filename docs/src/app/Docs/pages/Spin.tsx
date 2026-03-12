import { Stack, Typography } from '@mui/joy';

import Code from '@/design/components/Code';

import { aiGear, aiLoader, aiSpinner, aiSpinnerThird } from '@studio384/amicons';

import ApiTable from '../playground/ApiTable';
import Playground, { IIconCssVariables, IPlaygroundConfig } from '../playground/Playground';

export default function PageSpin() {
  const playgroundConfig: IPlaygroundConfig = {
    icons: [aiSpinnerThird, aiSpinner, aiGear, aiLoader],
    properties: [
      {
        label: 'Spin',
        type: 'chip',
        name: 'spin',
        values: [true, 'pulse', false],
        default: true
      }
    ],
    cssVariables: [
      {
        name: '--ai-animation-duration',
        default: '2s',
        description: (
          <>
            Time for a full play through of the animation. Defaults to <Code>1s</Code> when using <Code>pulse</Code>.
          </>
        )
      },
      {
        name: '--ai-animation-timing-function',
        default: 'linear',
        description: 'The timing function used for the animation.'
      },
      {
        name: '--ai-animation-iteration-count',
        default: 'infinite',
        description: 'Number of times the animation is repeated.'
      },
      {
        name: '--ai-animation-pulse-steps',
        default: 8,
        description: (
          <>
            Number of steps when the spin property is set to <Code>pulse</Code>.
          </>
        )
      }
    ]
  };

  return (
    <Stack gap={2}>
      <Typography level="h2">Spin</Typography>
      <Typography>
        With the <Code>spin</Code> property you can make your icons play a rotation animation.
      </Typography>

      <Playground config={playgroundConfig} />

      <Typography level="h3">API</Typography>

      <Typography>
        When setting the property to <Code>pulse</Code>, some additional variables are available while some defaults are changed.
      </Typography>

      <ApiTable cssVariables={playgroundConfig.cssVariables as IIconCssVariables[]} />
    </Stack>
  );
}
