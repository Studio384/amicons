import Amicon from "@studio384/amicons";

export default function NeoError() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="max-w-120">
        <Amicon className="text-8xl text-violet-600 pb-4" />
        <h1 className="font-display text-lg font-medium text-zinc-500 tracking-tight">Error 404</h1>
        <p className="font-semibold text-4xl">
          And we still haven't found what you're looking for...
        </p>
      </div>
    </div>
  );
}
