import { Outlet } from "react-router";

import DocsPager from "../design/components/DocsPager";

export default function NeoDocumentation() {
  return (
    <div className="neo-docs container mx-auto max-w-6xl">
      <Outlet />
      <DocsPager />
    </div>
  );
}
