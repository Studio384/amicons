import Amicon from "@studio384/amicons";

export default function NeoError() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-120">
        <Amicon className="pb-4 text-8xl text-violet-600" />
        <h1 className="font-display text-lg font-medium tracking-tight text-zinc-500">Error 404</h1>
        <p className="text-4xl font-semibold">And we still haven't found what you're looking for...</p>
      </div>
    </div>
  );
}
