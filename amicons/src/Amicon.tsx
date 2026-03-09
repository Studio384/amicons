import { IAmicon, aiCircleQuestion } from ".";
import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface AmiconProps {
  icon?: IAmicon;
  rotate?: number | false;
  flip?: true | "x" | "y" | false;
  spin?: boolean | "pulse";
  beat?: boolean;
  fade?: boolean;
  bounce?: boolean;
}

export default function AmiconIcon({
  flip = undefined,
  icon,
  rotate = undefined,
  spin = undefined,
  beat = undefined,
  fade = undefined,
  bounce = undefined,
  className,
  style,
  ...props
}: AmiconProps & ComponentPropsWithoutRef<"span">) {
  // Use fallback icon if icon is not provided or invalid
  const resolvedIcon = icon && icon.data ? icon : aiCircleQuestion;
  const isFallback = !icon || !icon.data;

  const rotateStyle =
    rotate !== undefined && rotate !== false
      ? ({ "--ai-rotate": `${rotate}deg` } as React.CSSProperties)
      : {};

  return (
    <span
      className={clsx(className, "ai-icon", {
        ["ai-flip-x"]: flip === "x",
        ["ai-flip-y"]: flip === "y",
        ["ai-flip"]: flip === true,
        ["ai-spin"]: spin === true,
        ["ai-spin ai-spin-pulse"]: spin === "pulse",
        ["ai-beat"]: beat,
        ["ai-fade"]: isFallback || fade,
        ["ai-bounce"]: bounce,
      })}
      style={{ ...rotateStyle, ...style }}
      dangerouslySetInnerHTML={{ __html: resolvedIcon.data }}
      {...props}
    />
  );
}
