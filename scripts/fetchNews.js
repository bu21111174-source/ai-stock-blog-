import Parser from "rss-parser";

const parser = new Parser();

// 한국 경제 뉴스 RSS 피드 목록
const FEEDS = [
  "https://www.hankyung.com/feed/economy",
  "https://www.mk.co.kr/rss/30100041/", // 매경 증권
  "https://rss.etnews.com/Section901.xml", // 전자신문 - 반도체/IT
];

// 필터링 키워드 (이 중 하나라도 제목/요약에 포함되면 채택)
const KEYWORDS = [
  "반도체",
  "AI",
  "인공지능",
  "코스피",
  "삼성전자",
  "SK하이닉스",
  "HBM",
  "엔비디아",
  "TSMC",
];

function isRelevant(item) {
  const text = `${item.title ?? ""} ${item.contentSnippet ?? ""}`;
  return KEYWORDS.some((kw) => text.includes(kw));
}

export async function fetchRelevantNews({ maxItems = 5 } = {}) {
  const feeds = await Promise.all(
    FEEDS.map(async (url) => {
      try {
        return await parser.parseURL(url);
      } catch (err) {
        console.error(`피드 수집 실패: ${url}`, err.message);
        return null;
      }
    })
  );

  const results = [];
  for (const feed of feeds) {
    if (!feed) continue;
    for (const item of feed.items) {
      if (isRelevant(item)) {
        results.push({
          title: item.title,
          link: item.link,
          summary: item.contentSnippet,
          pubDate: item.pubDate,
          source: feed.title,
        });
      }
    }
  }

  // 최신순 정렬 후 상위 N개만 반환
  results.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return results.slice(0, maxItems);
}

// 단독 실행 시 결과를 콘솔에 출력 (테스트용)
if (import.meta.url === `file://${process.argv[1]}`) {
  const news = await fetchRelevantNews();
  console.log(JSON.stringify(news, null, 2));
}
