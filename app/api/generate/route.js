import { fetchRelevantNews } from "../../../scripts/fetchNews.js";
import { generateArticle } from "../../../scripts/generateArticle.js";
import { buildMarkdown } from "../../../lib/markdown.js";
import { commitFileToGitHub } from "../../../lib/github.js";

export const maxDuration = 60;

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const news = await fetchRelevantNews({ maxItems: 5 });
  if (news.length === 0) {
    return Response.json({ message: "관련 뉴스가 없어 건너뜀" });
  }

  const article = await generateArticle(news);
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${date}-${article.slug}.md`;
  const markdown = buildMarkdown(article, date);

  await commitFileToGitHub(
    `content/posts/${filename}`,
    markdown,
    `Daily post ${date}: ${article.title}`
  );

  return Response.json({ title: article.title, filename });
}
