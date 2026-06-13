export const metadata = {
  title: "AI반도체 트렌드 | aisemitrend",
  description: "AI반도체·코스피 시황을 매일 정리하는 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 1rem",
          lineHeight: 1.7,
        }}
      >
        <header style={{ padding: "1.5rem 0", borderBottom: "1px solid #eee" }}>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 style={{ fontSize: "1.5rem", margin: 0 }}>AI반도체 트렌드</h1>
          </a>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            AI반도체 · 코스피 시황 매일 정리
          </p>
        </header>
        <main style={{ padding: "1.5rem 0" }}>{children}</main>
        <footer style={{ padding: "2rem 0", color: "#999", fontSize: "0.85rem", borderTop: "1px solid #eee" }}>
          본 사이트의 콘텐츠는 정보 제공을 목적으로 하며, 투자 권유가 아닙니다.
        </footer>
      </body>
    </html>
  );
}
