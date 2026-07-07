import { type ReactNode } from "react";

import Amicon, { aiArrowRight } from "@studio384/amicons";

import Code from "../components/Code";
import IconGrid from "./IconGrid";

type ReleaseProps = {
  excerpt?: string;
  children?: ReactNode;
  newIcons?: string[];
  updatedIcons?: string[];
  renamedIcons?: { old: string; new: string }[];
  removedIcons?: string[];
};

export default function ReleaseCard({
  excerpt,
  children,
  newIcons,
  updatedIcons,
  renamedIcons,
  removedIcons,
}: ReleaseProps) {
  return (
    <div className="neo-docs">
      {excerpt ? <p className="mb-4 max-w-xl text-xl">{excerpt}</p> : null}
      {children}
      {newIcons && (
        <>
          <h2>New icons &middot; {newIcons?.length}</h2>
          <IconGrid icons={newIcons} />
        </>
      )}
      {updatedIcons && (
        <>
          <h2>Updated icons &middot; {updatedIcons?.length}</h2>
          <IconGrid icons={updatedIcons} />
        </>
      )}
      {renamedIcons && (
        <>
          <h2>Renamed icons &middot; {renamedIcons?.length}</h2>
          <ul className="list-disc ps-6">
            {renamedIcons.map((icon: { new: string; old: string }) => (
              <li key={icon.new} className="not-first:mt-1.5">
                <span className="flex flex-row items-center justify-start gap-2">
                  <Code>{icon.old}</Code>
                  <Amicon icon={aiArrowRight} />
                  <Code>{icon.new}</Code>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      {removedIcons && (
        <>
          <h2>Removed icons &middot; {removedIcons?.length}</h2>
          <ul className="list-disc ps-6">
            {removedIcons.map((icon: string) => (
              <li key={icon} className="not-first:mt-1.5">
                <Code>{icon}</Code>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
