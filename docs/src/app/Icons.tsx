import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import categories from '@/data/categories';
import icons from '@/data/icons';
import Header from '@/design/layout/LayoutElements/Header';
import useSearch from '@/hooks/useSearch';
import { ILibraryIcon } from '@/types';

import Amicon, { aiFilterXmark, aiXmark } from '@studio384/amicons';
import clsx from 'clsx';

import { Button } from './Components/Button';
import IconCard from './Components/IconCard';
import Pagination from './Components/Pagination';
import { Search } from './Components/Search';

export default function Icons() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchCategories, searchQuery, searchPage]: [string[], string, number] = useMemo(() => {
    const categories = searchParams.get('category');
    const query = searchParams.get('search');
    const page = Number(searchParams.get('page') ?? 1);

    return [categories?.split(',').filter((item) => item !== '') ?? [], query ?? '', page ?? 1];
  }, [searchParams]);

  const searchableList = useMemo(() => {
    if (searchCategories.length >= 1) {
      return icons.filter((icon) => searchCategories.every((_searchCategory) => icon.categories.includes(_searchCategory as never)));
    }

    return icons;
  }, [searchCategories]);

  const { result } = useSearch(searchableList, ['slug', 'tags'], searchQuery);

  // c: categories
  // q: query
  // p: page
  const setSearchQuery = useCallback(
    (type: 'q' | 'c' | 'p', value: string | number) => {
      let search = searchParams.get('search');
      let page = Number(searchParams.get('page'));
      let category =
        searchParams
          .get('category')
          ?.split(',')
          .filter((item) => item !== '') ?? [];

      switch (type) {
        case 'c': {
          if (typeof value === 'number') return;

          if (category.includes(value)) {
            category = category.filter((item) => item !== value);
          } else {
            category.push(value);
          }

          page = 1; // Always reset page
          break;
        }
        case 'q': {
          if (typeof value === 'number') return;

          search = value;
          page = 1; // Always reset page
          break;
        }
        case 'p': {
          if (typeof value === 'string') return;

          page = value;
          break;
        }
      }

      setSearchParams({
        page: (page || 1).toString(),
        search: search ?? '',
        category: category.join(',') ?? ''
      });
    },
    [searchParams, setSearchParams]
  );

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
                    onClick={() => setSearchQuery('c', _category.slug)}
                    data-selected={searchCategories.includes(_category.slug) || undefined}
                    data-noicons={categoryIcons.length === 0 ? true : undefined}
                    className={clsx(
                      'group grid h-8 grid-cols-[min-content_auto_min-content] items-center gap-2 rounded-sm px-2.5 text-start text-sm hover:cursor-pointer hover:bg-indigo-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 data-selected:focus-visible:outline-indigo-700',
                      {
                        'bg-indigo-500 text-white hover:bg-indigo-600': searchCategories.includes(_category.slug)
                      }
                    )}
                  >
                    <Amicon icon={_category.icon} className="text-indigo-600 group-data-noicons:opacity-50 group-data-selected:text-white" />
                    <span className="truncate group-data-noicons:opacity-50">{_category.title}</span>
                    <span className="font-display text-indigo-600 group-data-noicons:opacity-50 group-data-selected:text-white">{categoryIcons.length}</span>
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
                  Page {searchPage} of {Math.ceil(result.length / 96)}
                </span>
              </div>

              <div className="flex gap-1">
                <Search placeholder="Search" value={searchQuery} onValueChange={(value) => setSearchQuery('q', value)} />
                <Button
                  icon
                  variant="secondary"
                  disabled={searchQuery === '' && searchCategories.length === 0}
                  onClick={() => {
                    setSearchParams({
                      search: '',
                      category: ''
                    });
                  }}
                >
                  <Amicon icon={aiFilterXmark} />
                </Button>
              </div>
            </div>
            {(searchQuery || searchCategories.length >= 1) && (
              <div className="flex gap-1">
                {searchQuery && (
                  <div className="font-display flex items-center gap-1 rounded-full bg-zinc-200 py-1 ps-2 pe-1 text-sm">
                    "{searchQuery}"
                    <button
                      className="text-md flex size-6 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-zinc-300"
                      onClick={() => setSearchQuery('q', '')}
                    >
                      <Amicon icon={aiXmark} /> <span className="sr-only">Delete category</span>
                    </button>
                  </div>
                )}
                {searchCategories.map((category) => (
                  <div key={category} className="font-display flex items-center gap-1 rounded-full bg-zinc-200 py-1 ps-2 pe-1 text-sm">
                    {category}
                    <button
                      className="text-md flex size-6 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-zinc-300"
                      onClick={() => setSearchQuery('c', category)}
                    >
                      <Amicon icon={aiXmark} /> <span className="sr-only">Delete category</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(9rem,100%),1fr))] gap-2">
              {result.slice((searchPage - 1) * 96, searchPage * 96).map((icon: ILibraryIcon) => (
                <IconCard key={icon.slug} icon={icon} />
              ))}
            </div>

            {result.length > 0 && <Pagination count={Math.ceil(result.length / 96)} page={searchPage} onChange={(_, page) => setSearchQuery('p', page)} />}
          </div>
        </div>
      </div>
    </>
  );
}
