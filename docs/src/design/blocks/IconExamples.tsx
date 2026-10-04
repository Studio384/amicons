import Amicon, { type IAmicon } from "@studio384/amicons";

interface IconExamplesProps {
  icon: IAmicon;
}

const heading = "font-display text-base font-medium text-zinc-600 dark:text-zinc-200";

const card =
  "flex flex-col items-center justify-center gap-3 rounded-sm border border-zinc-950/5 bg-zinc-50 p-6 text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300";

export default function IconExamples({ icon }: IconExamplesProps) {
  const animations = [
    { label: "Bounce", props: { bounce: true } },
    { label: "Beat", props: { beat: true } },
    { label: "Fade", props: { fade: true } },
    { label: "Spin", props: { spin: true } },
    { label: "Pulse", props: { spin: "pulse" as const } },
  ];

  const rotations = [0, 90, 180, 270];

  const flips = [
    { label: "Both", value: true as const },
    { label: "X axis", value: "x" as const },
    { label: "Y axis", value: "y" as const },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h4 className={heading}>Animations</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {animations.map(({ label, props }) => (
            <div key={label} className={card}>
              <Amicon icon={icon} {...props} className="text-3xl" />
              <span className="text-sm/4 lowercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h4 className={heading}>Rotation</h4>
        <div className="grid grid-cols-4 gap-1.5">
          {rotations.map((degrees) => (
            <div key={degrees} className={card}>
              <Amicon icon={icon} rotate={degrees} className="text-3xl" />
              <span className="text-sm/4 lowercase">{degrees}&deg;</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h4 className={heading}>Flip</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {flips.map(({ label, value }) => (
            <div key={label} className={card}>
              <Amicon icon={icon} flip={value} className="text-3xl" />
              <span className="text-sm/4 lowercase">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
