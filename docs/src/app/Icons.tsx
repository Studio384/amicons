import { useMemo } from 'react';

import categories from '@/data/categories';
import icons from '@/data/icons';
import { Button } from '@/design/components/Button';
import { IconCard } from '@/design/components/IconCard';
import { Pagination } from '@/design/components/Pagination';
import { Search } from '@/design/components/Search';
import Header from '@/design/layout/LayoutElements/Header';
import { useFilters } from '@/hooks/useFilters';
import useSearch from '@/hooks/useSearch';
import { ILibraryIcon } from '@/types';

import Amicon, { aiFilterXmark, aiXmark } from '@studio384/amicons';
import clsx from 'clsx';

export default function Icons() {
  const filters = useFilters();

  const searchableList = useMemo(() => {
    if (filters.query.categories.length >= 1) {
      return icons.filter((icon) => filters.query.categories.every((_searchCategory) => icon.categories.includes(_searchCategory as never)));
    }

    return icons;
  }, [filters.query.categories]);

  console.log(searchableList);

  const { result } = useSearch(searchableList, ['slug', 'tags'], filters.query.search);

  return (
    <>
      <Header>
        <h1 className="font-display py-2 text-5xl font-medium text-black">Icons</h1>
      </Header>
      <div className="container m-auto my-8 max-w-7xl px-4">
        <div className="grid grid-cols-[220px_auto] gap-4">
          <div className="sticky top-18.5 max-h-[calc(100dvh-74px)] self-start overflow-auto">
            <div className="my-2 flex flex-col gap-0.5">
              {categories.map((_category) => {
                const categoryIcons = searchableList.filter((icon) => icon.categories.includes(_category.slug as never));

                return (
                  <button
                    key={_category.slug}
                    onClick={() => filters.toggleCategory(_category.slug)}
                    data-selected={filters.query.categories.includes(_category.slug) || undefined}
                    data-noicons={categoryIcons.length === 0 ? true : undefined}
                    className={clsx(
                      'group grid h-8 grid-cols-[min-content_auto_min-content] items-center gap-2 rounded-sm px-2.5 text-start text-sm hover:cursor-pointer hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500 data-selected:focus-visible:outline-violet-700',
                      {
                        'bg-violet-500 text-white hover:bg-violet-600': filters.query.categories.includes(_category.slug)
                      }
                    )}
                  >
                    <Amicon icon={_category.icon} className="text-violet-600 group-data-noicons:opacity-50 group-data-selected:text-white" />
                    <span className="truncate group-data-noicons:opacity-50">{_category.title}</span>
                    <span className="font-display text-violet-600 group-data-noicons:opacity-50 group-data-selected:text-white">{categoryIcons.length}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <h2 className="font-display text-3xl font-medium">{result.length} icons</h2>
                <span className="text-zinc-600">
                  Page {filters.query.page} of {Math.ceil(result.length / 96)}
                </span>
              </div>

              <div className="flex gap-1">
                <Search placeholder="Search" value={filters.searchValue} onValueChange={(value) => filters.setSearch(value)} />
                <Button
                  icon
                  variant="secondary"
                  disabled={filters.searchValue === '' && filters.query.categories.length === 0}
                  onClick={() => filters.resetQuery()}
                >
                  <Amicon icon={aiFilterXmark} />
                </Button>
              </div>
            </div>
            {(filters.query.search || filters.query.categories.length >= 1) && (
              <div className="flex gap-1">
                {filters.query.search && (
                  <div className="font-display flex items-center gap-1 rounded-full bg-zinc-100 py-1 ps-2.5 pe-1 text-sm">
                    "{filters.query.search}"
                    <button
                      className="text-md flex size-6 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-zinc-300"
                      onClick={() => filters.setSearch('')}
                    >
                      <Amicon icon={aiXmark} /> <span className="sr-only">Delete category</span>
                    </button>
                  </div>
                )}
                {filters.query.categories.map((category) => (
                  <div key={category} className="font-display flex items-center gap-1 rounded-full bg-zinc-100 py-1 ps-2.5 pe-1 text-sm">
                    {category}
                    <button
                      className="text-md flex size-6 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-zinc-300"
                      onClick={() => filters.toggleCategory(category)}
                    >
                      <Amicon icon={aiXmark} /> <span className="sr-only">Delete category</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(9rem,100%),1fr))] gap-2">
              {result.slice((filters.query.page - 1) * 96, filters.query.page * 96).map((icon: ILibraryIcon) => (
                <IconCard key={icon.slug} icon={icon} />
              ))}
            </div>

            {result.length > 0 && <Pagination count={Math.ceil(result.length / 96)} page={filters.query.page} onChange={(_, page) => filters.setPage(page)} />}
          </div>
        </div>
      </div>
    </>
  );
}
