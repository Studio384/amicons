import { Outlet } from "react-router";

export default function NeoDocumentation() {
  return (
    <div className="neo-docs container m-auto max-w-6xl px-4">
      <Outlet />
    </div>
  );
}
