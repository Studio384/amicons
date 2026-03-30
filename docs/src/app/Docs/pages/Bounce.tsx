import { aiArrowUp, aiMusic, aiValkyrieSword } from "@studio384/amicons";

import Code from "@/design/components/Code";

import ApiTable from "../playground/ApiTable";
import Playground, { type IIconCssVariables, type IPlaygroundConfig } from "../playground/Playground";

export default function PageBounce() {
  const playgroundConfig: IPlaygroundConfig = {
    icons: [aiValkyrieSword, aiMusic, aiArrowUp],
    properties: [
      {
        label: "Bounce",
        type: "chip",
        name: "bounce",
        values: [true, false],
        default: true,
      },
    ],
    cssVariables: [
      {
        name: "--ai-animation-duration",
        default: "1s",
        description: "Time for a full play through of the animation.",
      },
      {
        name: "--ai-animation-iteration-count",
        default: "infinite",
        description: "Number of times the animation is repeated.",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-3xl font-medium">Bounce</h2>
      <p>
        With the <Code>fade</Code> property gives you a basic fade animation.
      </p>

      <Playground config={playgroundConfig} />

      <h3 className="font-display text-2xl font-medium">API</h3>

      <ApiTable cssVariables={playgroundConfig.cssVariables as IIconCssVariables[]} />
    </div>
  );
}
