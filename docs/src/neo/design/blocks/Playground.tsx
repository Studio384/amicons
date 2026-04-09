import { type ReactNode, useEffect, useMemo, useState } from "react";

import { Field, Toggle, ToggleGroup } from "@base-ui/react";
import Amicon, { aiBroom, type IAmicon } from "@studio384/amicons";
import clsx from "clsx";
import { codeToHtml } from "shiki";

export interface IPlaygroundConfig {
  icons: IAmicon[];
  properties?: IIconProperties[];
  cssVariables?: IIconCssVariables[];
}

export interface IIconProperties {
  label: string;
  type: "chip";
  name: string;
  values: unknown[];
  default: unknown;
}

export interface IIconCssVariables {
  name: string;
  default: string | number | boolean;
  description: ReactNode;
}

interface IPlaygroundProps {
  config: IPlaygroundConfig;
}

export default function Playground({ config }: IPlaygroundProps) {
  const [playgroundIcon, setPlaygroundIcon] = useState<string[]>([config.icons[0].name]);
  const [html, setHtml] = useState<string>("");

  // Get the icon name
  function getIconName(icon: string): string {
    return `ai${icon
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")}`;
  }

  const icon = config.icons.find((icon) => icon.name === playgroundIcon[0]) ?? config.icons[0];

  const iconName = useMemo(() => {
    return getIconName(icon.name);
  }, [icon]);

  // Properties
  const [playgroundProps, setPlaygroundProps] = useState<{ [index: string]: string | number }>({});

  const iconProperties: { [index: string]: string | number | boolean } = useMemo(() => {
    const props: { [index: string]: string | number | boolean } = {};

    config.properties?.map((property) => {
      props[property.name] = playgroundProps?.[property.name] ?? property.default;
    });

    return props;
  }, [config.properties, playgroundProps]);

  const propertyParser: string = useMemo(() => {
    let exampleString = "";

    Object.keys(iconProperties).map((propName) => {
      if (iconProperties[propName] === true) {
        exampleString += `\n  ${propName}`;
        return;
      } else if (iconProperties[propName] === false) {
        return;
      } else if (typeof iconProperties[propName] === "number") {
        exampleString += `\n  ${propName}={${iconProperties[propName]}}`;
      } else if (typeof iconProperties[propName] === "string") {
        exampleString += `\n  ${propName}="${iconProperties[propName]}"`;
      }
    });

    return exampleString;
  }, [iconProperties]);

  // CSS Variables
  const [playgroundCssVariable, setPlaygroundCssVariable] = useState<{ [cssVar: string]: string }>(
    {},
  );

  const iconVariables: { [index: string]: string | number | boolean } = useMemo(() => {
    const props: { [index: string]: string | number | boolean } = {};

    config.cssVariables?.map((variable) => {
      props[variable.name] = playgroundCssVariable?.[variable.name as string] ?? variable.default;
    });

    return props;
  }, [config.cssVariables, playgroundCssVariable]);

  const variableParser = useMemo(() => {
    let exampleString = "";
    let hasProperty = false;

    Object.keys(iconVariables).map((varName) => {
      const variableProperties = config.cssVariables?.find((variable) => variable.name === varName);

      if (iconVariables[varName] === variableProperties?.default) return;

      hasProperty = true;

      if (typeof iconVariables[varName] === "number" || !isNaN(Number(iconVariables[varName]))) {
        exampleString += `\n    "${varName}": ${iconVariables[varName]},`;
      } else if (typeof iconVariables[varName] === "string") {
        exampleString += `\n    "${varName}": "${iconVariables[varName]}",`;
      }
    });

    return hasProperty ? exampleString : "";
  }, [config.cssVariables, iconVariables]);

  const importCode = `<Amicon
  icon={${iconName}}${propertyParser}${
    variableParser !== ""
      ? `
  style={{${variableParser}
  }}`
      : ""
  }
/>`;

  useEffect(() => {
    codeToHtml(importCode, {
      lang: "javascript",
      theme: "slack-ochin",
    }).then((result) => setHtml(result));
  }, [importCode]);

  return (
    <div className="grid grid-cols-[auto_280px] rounded-sm border border-zinc-200 bg-white">
      <div className="flex flex-col p-4">
        <div className="flex grow items-center justify-center text-4xl">
          <Amicon icon={icon} {...iconProperties} style={playgroundCssVariable} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className="border-s border-zinc-200">
        <div className="flex flex-row items-center justify-between border-b border-zinc-200 p-4">
          <span className="font-display text-md font-semibold">Playground</span>
          <button
            onClick={() => {
              setPlaygroundIcon([config.icons[0].name]);
              setPlaygroundProps({});
              setPlaygroundCssVariable({});
            }}
            className="flex size-8 items-center justify-center rounded-sm hover:cursor-pointer hover:bg-violet-500 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
          >
            <Amicon icon={aiBroom} /> <span className="sr-only">Clear playground</span>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <Field.Root className="flex w-full max-w-64 flex-col items-start gap-1">
            <Field.Label className="text-sm font-medium">Icon</Field.Label>

            <ToggleGroup
              value={playgroundIcon}
              onValueChange={setPlaygroundIcon}
              className="flex gap-0.5 rounded-md border border-zinc-200 bg-zinc-50 p-0.5"
            >
              {config.icons.map((icon) => (
                <Toggle
                  key={icon.name}
                  value={icon.name}
                  className="flex size-8 items-center justify-center rounded-sm select-none hover:bg-violet-200 focus-visible:bg-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-violet-800 active:bg-violet-600 active:text-white data-pressed:bg-violet-500 data-pressed:text-white"
                >
                  <Amicon icon={icon} />
                </Toggle>
              ))}
            </ToggleGroup>
          </Field.Root>

          {config.properties?.map((property) => {
            switch (property.type) {
              case "chip": {
                return (
                  <Field.Root
                    className="flex w-full max-w-64 flex-col items-start gap-1"
                    key={property.type}
                  >
                    <Field.Label className="text-sm font-medium">{property.label}</Field.Label>

                    <div className="flex flex-row flex-wrap gap-1">
                      {property.values.map((value, key) => (
                        <button
                          key={key}
                          onClick={() =>
                            setPlaygroundProps((prev) => ({
                              ...prev,
                              [property.name as string]: value as string | number,
                            }))
                          }
                          className={clsx(
                            "flex rounded-full border border-zinc-200 px-2 py-0.75 text-sm/4 select-none hover:cursor-pointer hover:border-violet-300 hover:bg-violet-200 focus-visible:bg-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-violet-800 active:bg-violet-600 active:text-white",
                            {
                              "border-violet-600! bg-violet-500 text-white hover:bg-violet-500":
                                iconProperties?.[property.name] === value,
                            },
                          )}
                        >
                          {value?.toString()}
                        </button>
                      ))}
                    </div>
                  </Field.Root>
                );
              }
            }
          })}

          {config.cssVariables?.map((variable) => (
            <Field.Root
              className="flex w-full max-w-64 flex-col items-start gap-1"
              key={variable.name}
            >
              <Field.Label className="text-sm font-medium">{variable.name}</Field.Label>
              <Field.Control
                required
                placeholder={variable.default.toString()}
                onChange={(e) =>
                  setPlaygroundCssVariable((prev) => ({ ...prev, [variable.name]: e.target.value }))
                }
                className="h-9 w-full rounded-md border border-zinc-200 pl-2 focus:outline-2 focus:-outline-offset-1 focus:outline-violet-600"
              />
            </Field.Root>
          ))}
        </div>
      </div>
    </div>
  );
}
