import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function toFrontMatter(article, date) {
  const tags = (article.tags ?? []).map((t) => `"${t}"`).join(", ");
  return `---
title: "${article.title.replace(/"/g, '\\"')}"
date: "${date}"
description: "${(article.metaDescription ?? "").replace(/"/g, '\\"')}"
tags: [${tags}]
slug: "${article.slug}"
---

`;
}

/**
 * 생성된 글을 content/posts/에 마크다운 파일로 저장한다.
 * @param {object} article - generateArticle()의 결과물
 * @returns {string} 저장된 파일 경로
 */
export function saveArticle(article) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });

  const date = new Date().toISOString().slice(0, 10);
  const filename = `${date}-${article.slug}.md`;
  const filePath = path.join(POSTS_DIR, filename);

  const frontMatter = toFrontMatter(article, date);
  fs.writeFileSync(filePath, frontMatter + article.contentHtml + "\n");

  return filePath;
}
