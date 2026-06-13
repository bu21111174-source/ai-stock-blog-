export function buildMarkdown(article, date) {
  const tags = (article.tags ?? []).map((t) => `"${t}"`).join(", ");
  const frontMatter = `---
title: "${article.title.replace(/"/g, '\\"')}"
date: "${date}"
description: "${(article.metaDescription ?? "").replace(/"/g, '\\"')}"
tags: [${tags}]
slug: "${article.slug}"
---

`;
  return frontMatter + article.contentHtml + "\n";
}
