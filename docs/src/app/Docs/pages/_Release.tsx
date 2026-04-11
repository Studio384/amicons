import { type ReactNode } from "react";

import Amicon, {
  aiAmicons,
  aiArrowRight,
  aiBook,
  aiBug,
  aiPen,
  aiPlus,
  aiTrashCan,
  type IAmicon,
} from "@studio384/amicons";

import Code from "@/design/components/Code";

import IconGrid from "./_IconGrid";

// Types
type ChangeSectionProps = {
  title: string;
  icon: IAmicon;
  items: string[];
};

type ReleaseProps = {
  name: string;
  date: string;
  version: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
  removed?: string[];
  docs?: string[];
  newIcons?: string[];
  updatedIcons?: string[];
  renamedIcons?: { old: string; new: string }[];
  removedIcons?: string[];
};

// Release component
export default function Release({
  name,
  date,
  version,
  added,
  changed,
  fixed,
  removed,
  docs,
  newIcons,
  updatedIcons,
  renamedIcons,
  removedIcons,
}: ReleaseProps) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-md shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-zinc-950">
      <div className="align-center flex flex-row gap-4">
        <div className="flex size-12 items-center justify-center rounded-sm border border-violet-600 bg-violet-500 text-2xl text-white">
          <Amicon icon={aiAmicons} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-3xl/6 font-medium">{name}</h2>
          <p className="text-base/5">
            {date} <span className="text-zinc-600">&middot; Version {version}</span>
          </p>
        </div>
      </div>
      {added && <ChangeSection title="Added" icon={aiPlus} items={added} />}
      {changed && <ChangeSection title="Changed" icon={aiPen} items={changed} />}
      {fixed && <ChangeSection title="Fixed" icon={aiBug} items={fixed} />}
      {removed && <ChangeSection title="Removed" icon={aiTrashCan} items={removed} />}
      {docs && <ChangeSection title="Documentation" icon={aiBook} items={docs} />}
      {newIcons && (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl/6 font-medium">
            New icons &middot; {newIcons?.length}
          </h3>
          <IconGrid icons={newIcons} />
        </div>
      )}
      {updatedIcons && (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl/6 font-medium">
            Updated icons &middot; {updatedIcons?.length}
          </h3>
          <IconGrid icons={updatedIcons} />
        </div>
      )}
      {renamedIcons && (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl/6 font-medium">
            Renamed icons &middot; {renamedIcons?.length}
          </h3>
          <ul className="list-disc ps-6">
            {renamedIcons.map((icon: { new: string; old: string }) => (
              <li key={icon.new} className="not-first:mt-1.5">
                <Code>{icon.old}</Code>{" "}
                <Amicon
                  icon={aiArrowRight}
                  style={{ marginInline: 8, position: "relative", top: 2 }}
                />{" "}
                <Code>{icon.new}</Code>
              </li>
            ))}
          </ul>
        </div>
      )}
      {removedIcons && (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl/6 font-medium">
            Removed icons &middot; {removedIcons?.length}
          </h3>
          <ul className="list-disc ps-6">
            {removedIcons.map((icon: string) => (
              <li key={icon} className="not-first:mt-1.5">
                <Code>{icon}</Code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChangeSection({ title, icon, items }: ChangeSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-2xl/6 font-medium">{title}</h3>
      <ul className="list-none">
        {items.map((item: string, index: number) => (
          <li className="flex flex-row gap-2 not-first:mt-1.5" key={index}>
            <Amicon icon={icon} className="mt-1" />
            <p>{parseMarkdownCode(item)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Utility function to parse markdown-style backticks and convert to Code components
function parseMarkdownCode(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add Code component for the match
    parts.push(<Code key={`code-${match.index}`}>{match[1]}</Code>);
    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
