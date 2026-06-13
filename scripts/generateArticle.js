import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 한국 경제/주식/AI반도체 전문 블로그의 기자입니다.
주어진 최신 뉴스 목록을 바탕으로, 검색 유입(SEO)에 최적화된 블로그 글 1편을 작성합니다.

작성 원칙:
- 단순 번역/요약이 아니라, 여러 기사를 종합해 독자에게 유용한 시각(시사점, 투자자 관점 정리 등)을 더한다.
- 제목은 클릭을 유도하면서도 과장/낚시성 표현은 피한다.
- 본문은 HTML(워드프레스 본문용)로 작성하고 <h2>, <p>, <ul> 등을 활용해 가독성을 높인다.
- 마지막에 "본 콘텐츠는 정보 제공을 목적으로 하며, 투자 권유가 아닙니다." 안내문을 포함한다.
- 출처 뉴스 링크를 본문 하단에 "참고 기사" 목록으로 정리한다.

반드시 아래 JSON 형식으로만 응답하세요(다른 텍스트 없이):
{
  "title": "글 제목",
  "slug": "url-friendly-slug-in-english",
  "metaDescription": "검색결과에 노출될 150자 이내 요약",
  "tags": ["태그1", "태그2", "태그3"],
  "contentHtml": "<h2>...</h2><p>...</p>..."
}`;

export async function generateArticle(newsItems) {
  const newsText = newsItems
    .map(
      (item, i) =>
        `${i + 1}. [${item.source}] ${item.title}\n요약: ${item.summary ?? "(없음)"}\n링크: ${item.link}`
    )
    .join("\n\n");

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `다음은 오늘의 AI반도체/주식 관련 뉴스입니다. 이를 바탕으로 블로그 글을 작성해주세요.\n\n${newsText}`,
      },
    ],
  });

  const text = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  // 모델이 코드블록(```json ... ```)으로 감쌀 경우 제거
  const cleaned = text.trim().replace(/^```json\s*/, "").replace(/```$/, "");

  return JSON.parse(cleaned);
}

// 단독 실행 시 테스트 (fetchNews 결과를 사용)
if (import.meta.url === `file://${process.argv[1]}`) {
  const { fetchRelevantNews } = await import("./fetchNews.js");
  const news = await fetchRelevantNews();
  const article = await generateArticle(news);
  console.log(JSON.stringify(article, null, 2));
}
