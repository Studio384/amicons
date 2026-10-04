type HastNode = {
  type: string;
  tagName?: string;
  value?: unknown;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function isElement(node: HastNode | undefined | null): node is HastNode & { tagName: string; children: HastNode[] } {
  return Boolean(node) && node!.type === "element" && typeof node!.tagName === "string";
}

function getClassNames(node: HastNode): string[] {
  const className = node.properties?.className;

  if (Array.isArray(className)) {
    return className.filter((value): value is string => typeof value === "string");
  }

  if (typeof className === "string") {
    return className.split(/\s+/).filter(Boolean);
  }

  return [];
}

function collectText(node: HastNode): string {
  if (node.type === "text" && typeof node.value === "string") return node.value;

  if (Array.isArray(node.children)) {
    return node.children.map(collectText).join("");
  }

  return "";
}

/**
 * A rehype plugin that turns fenced code blocks into `<CodeBlock />` elements, so
 * MDX pages get the same TanStack Highlight output and copy button as the rest
 * of the documentation.
 *
 * The document must import `CodeBlock`; documents that don't are left alone so
 * a missing import degrades gracefully instead of breaking the page.
 */
export function rehypeCodeBlocks() {
  return function transformer(tree: HastNode, file: { value?: string }): void {
    if (file.value && !/\bimport\s+CodeBlock\b/.test(file.value)) return;

    visit(tree);
  };
}

function visit(node: HastNode | undefined | null): void {
  const children = node?.children;

  if (!Array.isArray(children)) return;

  for (let index = 0; index < children.length; index++) {
    const child = children[index];

    if (isElement(child) && child.tagName === "pre") {
      const code = child.children.find((entry) => isElement(entry) && entry.tagName === "code");

      if (code) {
        children[index] = toCodeBlock(code);
        continue;
      }
    }

    visit(child);
  }
}

function toCodeBlock(code: HastNode): HastNode {
  const lang = getClassNames(code)
    .find((value) => value.startsWith("language-"))
    ?.slice("language-".length);

  return {
    type: "mdxJsxFlowElement",
    name: "CodeBlock",
    attributes: [
      { type: "mdxJsxAttribute", name: "code", value: collectText(code) },
      { type: "mdxJsxAttribute", name: "lang", value: lang ?? "plaintext" },
    ],
    children: [],
  } as HastNode;
}
