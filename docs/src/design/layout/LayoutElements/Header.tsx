import { type PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return (
    <div className="-mt-23 border-b border-violet-200 bg-violet-100 pt-23 pb-4 dark:border-violet-900 dark:bg-violet-950">
      <div className="container m-auto max-w-7xl px-4">{children}</div>
    </div>
  );
}
