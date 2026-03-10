import { NavLink } from 'react-router';

import { ILibraryIcon } from '@/types';

import Amicon from '@studio384/amicons';

export default function IconCard({ icon }: { icon: ILibraryIcon }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 rounded-md bg-neutral-100 p-4 text-black focus-within:bg-violet-200 focus-within:text-violet-700 hover:bg-violet-200 hover:text-violet-700">
      <Amicon icon={icon.icon} className="mt-1 text-3xl" />
      <NavLink to={`/icons/${icon.slug}`} className="max-w-full text-inherit">
        <div className="truncate font-mono text-xs text-nowrap text-neutral-700">{icon.slug}</div>
      </NavLink>
    </div>
  );
}
