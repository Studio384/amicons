import { type PropsWithChildren } from "react";

export default function Code(props: PropsWithChildren) {
  return <span className="rounded-sm bg-violet-100 px-0.75 py-px font-mono text-sm text-violet-600" {...props} />;
}
