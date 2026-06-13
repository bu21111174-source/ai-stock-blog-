import fs from "fs";
import path from "path";
import { buildMarkdown } from "../lib/markdown.js";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

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

  fs.writeFileSync(filePath, buildMarkdown(article, date));

  return filePath;
}
