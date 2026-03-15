import { Outlet } from 'react-router';

import Header from '@/design/layout/LayoutElements/Header';

import DocsNavigation from './Docs/Navigation';

export default function Docs() {
  return (
    <>
      <Header>
        <h1 className="font-display py-2 text-5xl font-medium text-black">Documentation</h1>
      </Header>
      <div className="container m-auto my-8 max-w-7xl px-4">
        <div className="grid grid-cols-[220px_auto] gap-4">
          <div className="max-h-[calc(100dvh-90px) sticky top-22.5 self-start overflow-auto">
            <DocsNavigation />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
