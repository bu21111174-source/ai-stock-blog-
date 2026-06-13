import "dotenv/config";
import { fetchRelevantNews } from "./fetchNews.js";
import { generateArticle } from "./generateArticle.js";
import { saveArticle } from "./saveArticle.js";

async function main() {
  console.log("1) 뉴스 수집 중...");
  const news = await fetchRelevantNews({ maxItems: 5 });
  if (news.length === 0) {
    console.log("관련 뉴스가 없어 종료합니다.");
    return;
  }
  console.log(`   -> ${news.length}건 수집 완료`);

  console.log("2) 글 생성 중...");
  const article = await generateArticle(news);
  console.log(`   -> 제목: ${article.title}`);

  console.log("3) 마크다운으로 저장 중...");
  const filePath = saveArticle(article);
  console.log(`   -> 저장 완료: ${filePath}`);
  console.log("\ngit add/commit/push 후 Vercel이 자동 배포합니다.");
}

main().catch((err) => {
  console.error("파이프라인 실행 중 오류:", err);
  process.exit(1);
});
