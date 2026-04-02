import Codeblock from "@/design/components/Codeblock";

export default function PageInstallation() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-3xl font-medium">Install Amicons</h2>

      <h3 className="font-display text-2xl/6 font-medium">Get the npm package</h3>
      <p>Get started with Amicons by running the following command in your project.</p>
      <Codeblock>npm install @studio384/amicons</Codeblock>

      <h3 className="font-display text-2xl/6 font-medium">Add the sytle</h3>

      <p>
        When the package is installed, you can add the styles to your project by importing it in
        your JavaScript or TypeScript file.
      </p>
      <Codeblock>import "@studio384/amicons/amicons.css";</Codeblock>
      <p>Alternatively, you can add it in your CSS.</p>
      <Codeblock>@import "@studio384/amicons/amicons.css";</Codeblock>
    </div>
  );
}
