import { useCallback, useMemo, useState } from "react";

import Amicon, { aiCheck, aiCopy } from "@studio384/amicons";

import { cn } from "@/utils/cn";

import { highlightToTokens } from "./highlight";

interface CodeblockProps {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}

export default function Codeblock({ code, lang = "plaintext", title, className }: CodeblockProps) {
  const [copied, setCopied] = useState(false);

  const markup = useMemo(() => highlightToTokens(code, lang), [code, lang]);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-sm border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      {title && (
        <figcaption className="flex items-center border-b border-zinc-200 px-4 py-2.5 font-mono text-xs/4 text-zinc-600 dark:border-zinc-800 dark:text-zinc-200">
          {title}
        </figcaption>
      )}
      <pre className="th-code overflow-hidden p-4 text-sm/6">
        <code dangerouslySetInnerHTML={{ __html: markup }} />
      </pre>
      <button
        onClick={copy}
        type="button"
        aria-label="Copy code"
        className="absolute top-1 right-1 flex size-7 items-center justify-center rounded-sm bg-zinc-100 text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-200 hover:text-zinc-900 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      >
        <Amicon icon={copied ? aiCheck : aiCopy} className="text-sm" />
      </button>
    </figure>
  );
}
