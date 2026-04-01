import { IAmicon, aiCircleQuestion } from ".";
import { ComponentPropsWithoutRef } from "react";

interface AmiconProps {
  icon?: IAmicon;
  rotate?: number | false;
  flip?: true | "x" | "y" | false;
  spin?: boolean | "pulse";
  beat?: boolean;
  fade?: boolean;
  bounce?: boolean;
}

export default function Amicon({
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

  const classes = [
    className,
    "ai-icon",
    (!!rotate || rotate === 0) && "ai-rotate",
    flip === "x" && "ai-flip-x",
    flip === "y" && "ai-flip-y",
    flip === true && "ai-flip",
    spin === true && "ai-spin",
    spin === "pulse" && "ai-spin ai-spin-pulse",
    beat && "ai-beat",
    (isFallback || fade) && "ai-fade",
    bounce && "ai-bounce",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      style={{ ...rotateStyle, ...style }}
      dangerouslySetInnerHTML={{ __html: resolvedIcon.data }}
      {...props}
    />
  );
}
