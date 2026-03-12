import Code from '@/design/components/Code';

import { aiAmicons, aiArrowUp, aiMessageSmile } from '@studio384/amicons';

import ApiTable from '../playground/ApiTable';
import Playground, { IIconCssVariables, IPlaygroundConfig } from '../playground/Playground';

export default function PageRotate() {
  const playgroundConfig: IPlaygroundConfig = {
    icons: [aiMessageSmile, aiAmicons, aiArrowUp],
    properties: [
      {
        label: 'Rotate',
        type: 'chip',
        name: 'rotate',
        values: [0, 45, 90, 135, 180, 225, 270, 315, false],
        default: 90
      }
    ],
    cssVariables: [
      {
        name: '--ai-transition-duration',
        default: '0.2s',
        description: 'Time for a full play through of the animation.'
      },
      {
        name: '--ai-animation-timing-function',
        default: 'ease-in-out',
        description: 'The timing function used for the animation.'
      }
    ]
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-3xl font-medium">Rotate</h2>
      <p>
        With the <Code>rotate</Code> property you can change the default rotation of your icon. You can pass any numeric degree value for full flexibility.
      </p>

      <Playground config={playgroundConfig} />

      <h3 className="font-display text-2xl font-medium">API</h3>

      <ApiTable cssVariables={playgroundConfig.cssVariables as IIconCssVariables[]} />
    </div>
  );
}
