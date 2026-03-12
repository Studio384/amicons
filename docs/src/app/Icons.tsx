import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Box, Chip, ChipDelete, IconButton, Input, Stack, Typography } from '@mui/joy';

import categories from '@/data/categories';
import icons from '@/data/icons';
import Header from '@/design/layout/LayoutElements/Header';
import useSearch from '@/hooks/useSearch';
import { ILibraryIcon } from '@/types';

import Amicon, { aiFilterXmark, aiMagnifyingGlass } from '@studio384/amicons';
import clsx from 'clsx';

import IconCard from './Components/IconCard';
import Pagination from './Components/Pagination';

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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '220px auto',
            gap: 3
          }}
        >
          <Box sx={{ position: 'sticky', top: 58 + 16, overflow: 'auto', maxHeight: 'calc(100dvh - 58px - 16px)', alignSelf: 'flex-start' }}>
            <div className="flex flex-col gap-0.5">
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
          </Box>
          <Stack gap={2} sx={{ my: 2 }}>
            <Stack direction="row" gap={1} justifyContent="space-between" alignItems="center">
              <Stack direction="row" gap={1} alignItems="baseline">
                <Typography level="h2">{result.length} icons</Typography>
                <Typography color="neutral">
                  Page {searchPage} of {Math.ceil(result.length / 96)}
                </Typography>
              </Stack>

              <Stack direction="row" gap={0.5} alignItems="baseline">
                <Input
                  startDecorator={<Amicon icon={aiMagnifyingGlass} />}
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery('q', e.target.value)}
                />
                <IconButton
                  variant="outlined"
                  disabled={searchQuery === '' && searchCategories.length === 0}
                  onClick={() => {
                    setSearchParams({
                      search: '',
                      category: ''
                    });
                  }}
                >
                  <Amicon icon={aiFilterXmark} />
                </IconButton>
              </Stack>
            </Stack>
            {(searchQuery || searchCategories.length >= 1) && (
              <Stack direction="row" gap={0.5} sx={{ '--_Chip-minHeight': '2rem' }}>
                {searchQuery && (
                  <Chip
                    size="lg"
                    sx={{ fontSize: 'sm', fontWeight: '300', gap: 1.25, fontFamily: 'display', '--_Chip-minHeight': '2rem' }}
                    endDecorator={<ChipDelete onClick={() => setSearchQuery('q', '')} />}
                  >
                    "{searchQuery}"
                  </Chip>
                )}
                {searchCategories.map((category) => (
                  <Chip
                    key={category}
                    size="lg"
                    sx={{ fontSize: 'sm', fontWeight: '300', gap: 1.25, fontFamily: 'display', '--_Chip-minHeight': '2rem' }}
                    endDecorator={<ChipDelete onClick={() => setSearchQuery('c', category)} />}
                  >
                    {category}
                  </Chip>
                ))}
              </Stack>
            )}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(9rem, 100%), 1fr))',
                gap: { xs: 1 }
              }}
            >
              {result.slice((searchPage - 1) * 96, searchPage * 96).map((icon: ILibraryIcon) => (
                <IconCard key={icon.slug} icon={icon} />
              ))}
            </Box>

            {result.length > 0 && <Pagination count={Math.ceil(result.length / 96)} page={searchPage} onChange={(_, page) => setSearchQuery('p', page)} />}
          </Stack>
        </Box>
      </div>
    </>
  );
}
