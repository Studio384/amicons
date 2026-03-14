import { cn } from '@/utils/cn';

import { Input as InputPrimitive } from '@base-ui/react/input';
import Amicon, { aiMagnifyingGlass } from '@studio384/amicons';

export function Search({ className, ...props }: InputPrimitive.Props) {
  return (
    <div className="flex h-9 w-56 flex-row items-center justify-center rounded-md border border-zinc-200 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-violet-600">
      <Amicon icon={aiMagnifyingGlass} className="ms-2.5" />
      <InputPrimitive className={cn('h-9 w-56 px-2 text-base outline-0', className)} {...props} />
    </div>
  );
}
