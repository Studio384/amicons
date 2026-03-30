import Codeblock from "@/design/components/Codeblock";

export default function PageInstallation() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-3xl font-medium">Install Amicons</h2>
      <p>Get started with Amicons by running the following command in your project.</p>
      <Codeblock>npm install @studio384/amicons</Codeblock>
    </div>
  );
}
