import { type PropsWithChildren } from "react";

export default function Codeblock({ children, ...props }: PropsWithChildren) {
  return (
    <pre
      className="rounded-sm border border-violet-200 bg-violet-100 px-2 py-1.5 font-mono text-sm text-violet-600 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-200"
      {...props}
    >
      <code>{children}</code>
    </pre>
  );
}
