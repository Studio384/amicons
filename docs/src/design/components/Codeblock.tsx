import { type PropsWithChildren } from "react";

export default function Codeblock({ children, ...props }: PropsWithChildren) {
  return (
    <pre
      className="rounded-sm border border-violet-200 bg-violet-100 px-2 py-1.5 font-mono text-sm text-violet-600"
      {...props}
    >
      <code>{children}</code>
    </pre>
  );
}
