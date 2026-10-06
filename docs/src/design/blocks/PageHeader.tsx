import { type PropsWithChildren } from "react";

const widthClasses = {
  md: "max-w-4xl",
  lg: "max-w-7xl",
} as const;

type PageHeaderWidth = keyof typeof widthClasses;

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
  width?: PageHeaderWidth;
} & PropsWithChildren & {
    className?: string;
  }) {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <h1 className="font-display text-5xl/4 leading-tight font-bold">{title}</h1>
      {subtitle && (
        <p className="font-display -mt-2 text-lg/4 font-medium text-violet-700 dark:text-violet-500">{subtitle}</p>
      )}
    </div>
  );
}
