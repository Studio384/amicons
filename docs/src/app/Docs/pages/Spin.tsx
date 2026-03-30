import { aiGear, aiLoader, aiSpinner, aiSpinnerThird } from "@studio384/amicons";

import Code from "@/design/components/Code";

import ApiTable from "../playground/ApiTable";
import Playground, { type IIconCssVariables, type IPlaygroundConfig } from "../playground/Playground";

export default function PageSpin() {
  const playgroundConfig: IPlaygroundConfig = {
    icons: [aiSpinnerThird, aiSpinner, aiGear, aiLoader],
    properties: [
      {
        label: "Spin",
        type: "chip",
        name: "spin",
        values: [true, "pulse", false],
        default: true,
      },
    ],
    cssVariables: [
      {
        name: "--ai-animation-duration",
        default: "2s",
        description: (
          <>
            Time for a full play through of the animation. Defaults to <Code>1s</Code> when using <Code>pulse</Code>.
          </>
        ),
      },
      {
        name: "--ai-animation-timing-function",
        default: "linear",
        description: "The timing function used for the animation.",
      },
      {
        name: "--ai-animation-iteration-count",
        default: "infinite",
        description: "Number of times the animation is repeated.",
      },
      {
        name: "--ai-animation-pulse-steps",
        default: 8,
        description: (
          <>
            Number of steps when the spin property is set to <Code>pulse</Code>.
          </>
        ),
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-3xl font-medium">Spin</h2>
      <p>
        With the <Code>spin</Code> property you can make your icons play a rotation animation.
      </p>

      <Playground config={playgroundConfig} />

      <h3 className="font-display text-2xl font-medium">API</h3>

      <p>
        When setting the property to <Code>pulse</Code>, some additional variables are available while some defaults are
        changed.
      </p>

      <ApiTable cssVariables={playgroundConfig.cssVariables as IIconCssVariables[]} />
    </div>
  );
}
