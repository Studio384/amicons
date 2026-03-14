import { PaginationProps } from '@mui/material';
import usePagination from '@mui/material/usePagination';

import { Separator } from '@base-ui/react';
import Amicon, { aiArrowLeft, aiArrowRight, aiEllipsisH } from '@studio384/amicons';

import { Button } from './Button';

export default function Pagination(props: PaginationProps) {
  const { items } = usePagination(props);

  return (
    <div className="flex items-center justify-center gap-1">
      {items.map(({ page, selected, type, disabled, ...props }, key) => {
        switch (type) {
          case 'page':
            return (
              <Button size="sm" icon variant={selected ? 'primary' : 'secondary'} plain={!selected} disabled={disabled} {...props} key={key}>
                {page}
              </Button>
            );
          case 'previous':
            return (
              <Button size="sm" variant="secondary" plain disabled={disabled} {...props} key={key}>
                <Amicon icon={aiArrowLeft} /> Prev
              </Button>
            );
          case 'next':
            return (
              <Button size="sm" variant="secondary" plain disabled={disabled} {...props} key={key}>
                Next <Amicon icon={aiArrowRight} />
              </Button>
            );
          case 'start-ellipsis':
          case 'end-ellipsis':
            return (
              <Button size="sm" icon variant={selected ? 'primary' : 'secondary'} plain={!selected} disabled={disabled} {...props} key={key}>
                <Amicon icon={aiEllipsisH} />
              </Button>
            );
        }

        return <Separator orientation="vertical" className="w-px bg-zinc-300" key={key} />;
      })}
    </div>
  );
}
