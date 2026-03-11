import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return (
    <div className="border-b border-indigo-200 bg-indigo-100 pt-23 pb-4">
      <div className="container m-auto max-w-7xl px-4">{children}</div>
    </div>
  );
}
