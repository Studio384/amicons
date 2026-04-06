export function formatSvg(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;

  const indent = (node: ChildNode, depth: number): void => {
    const indentStr = "\n" + "  ".repeat(depth);
    const nextIndentStr = "\n" + "  ".repeat(depth - 1);

    const children = Array.from(node.childNodes);
    if (!children.length) return;

    children.forEach((child, index) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        node.insertBefore(doc.createTextNode(indentStr), child);
        indent(child, depth + 1);
        if (index === children.length - 1) {
          node.appendChild(doc.createTextNode(nextIndentStr));
        }
      }
    });
  };

  indent(svg, 1);

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}
