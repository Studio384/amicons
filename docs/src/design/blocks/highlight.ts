import { createHighlighter } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { json } from "@tanstack/highlight/languages/json";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { yaml } from "@tanstack/highlight/languages/yaml";

export const highlighter = createHighlighter({
  languages: [shell, css, html, js, json, jsx, ts, tsx, yaml],
  fallbackLanguage: "plaintext",
});

const CODE_BODY = /^<pre[^>]*><code>([\s\S]*)<\/code><\/pre>$/;

export function highlightToTokens(code: string, lang = "plaintext"): string {
  const { htmlMarkup } = highlighter.renderCodeBlockData({ code, lang });

  return CODE_BODY.exec(htmlMarkup)?.[1] ?? "";
}
