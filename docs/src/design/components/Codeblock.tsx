import { PropsWithChildren } from 'react';

export default function Codeblock({ children, ...props }: PropsWithChildren) {
  return (
    <pre className="rounded-sm border border-indigo-200 bg-indigo-100 px-2 py-1.5 font-mono text-sm text-indigo-600" {...props}>
      <code>{children}</code>
    </pre>
  );
}
