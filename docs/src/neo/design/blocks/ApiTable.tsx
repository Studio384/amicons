import { type IIconCssVariables } from "@/app/Docs/playground/Playground";

import Code from "../components/Code";

interface IApiTableProps {
  cssVariables: IIconCssVariables[];
}

export default function ApiTable({ cssVariables }: IApiTableProps) {
  return (
    <div className="rounded-sm border border-zinc-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-zinc-200">
            <th className="text-md/4 py-1.75 ps-2 pe-2 text-start first:ps-4 last:pe-4" style={{ width: "30%" }}>
              Property name
            </th>
            <th className="text-md/4 py-1.75 ps-2 pe-2 text-start first:ps-4 last:pe-4" style={{ width: "15%" }}>
              Default
            </th>
            <th className="text-md/4 py-1.75 ps-2 pe-2 text-start first:ps-4 last:pe-4" style={{ width: "55%" }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {cssVariables.map((variable, key) => (
            <tr key={key} className="border-t border-zinc-200">
              <td className="py-2 ps-2 pe-2 text-start text-sm/4 first:ps-4 last:pe-5">
                <Code>{variable.name}</Code>
              </td>
              <td className="py-2 ps-2 pe-2 text-start text-sm/4 first:ps-4 last:pe-5">
                <Code>{variable.default}</Code>
              </td>
              <td className="py-2 ps-2 pe-2 text-start text-sm/4 first:ps-4 last:pe-5">{variable.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
