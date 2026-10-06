import Amicon, { aiArrowLeft, aiArrowRight, aiEllipsisH } from "@studio384/amicons";

import { cn } from "cn";

type PageItem = number | "ellipsis";

/**
 * Builds the visible page list, always keeping the first and last page
 * reachable and collapsing long runs into an ellipsis.
 */
function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");

  for (let page = start; page <= end; page++) {
    items.push(page);
  }

  if (end < total - 1) items.push("ellipsis");

  items.push(total);

  return items;
}

const buttonClassName = cn(
  "font-display grid size-8 shrink-0 place-items-center rounded-sm text-sm font-medium tabular-nums",
  "outline-0 -outline-offset-2 outline-violet-600 transition-all",
  "hover:cursor-pointer hover:bg-violet-600 hover:text-white hover:shadow-sm focus-visible:outline-2",
  "disabled:pointer-events-none disabled:opacity-40",
);

export function Pagination({
  page,
  count,
  onChange,
  className,
}: {
  page: number;
  count: number;
  onChange: (page: number) => void;
  className?: string;
}) {
  if (count <= 1) return null;

  return (
    <nav aria-label="Pagination" className={cn("flex flex-row items-center justify-center gap-1", className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        title="Previous page"
        className={buttonClassName}
      >
        <Amicon icon={aiArrowLeft} />
        <span className="sr-only">Previous page</span>
      </button>

      {getPageItems(page, count).map((item, key) =>
        item === "ellipsis" ? (
          <span key={key} className="font-display grid size-8 place-items-center text-sm text-zinc-500">
            <Amicon icon={aiEllipsisH} />
          </span>
        ) : (
          <button
            key={key}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            aria-label={`Page ${item}`}
            className={cn(buttonClassName, item === page && "bg-violet-600 text-white shadow-sm")}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= count}
        title="Next page"
        className={buttonClassName}
      >
        <span className="sr-only">Next page</span>
        <Amicon icon={aiArrowRight} />
      </button>
    </nav>
  );
}
