import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "AI반도체 트렌드 | aisemitrend",
  description: "AI반도체·코스피 시황을 매일 정리하는 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          <header className="site-header">
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <h1 className="site-title">AI반도체 트렌드</h1>
            </a>
            <p className="site-tagline">AI반도체 · 코스피 시황 매일 정리</p>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            본 사이트의 콘텐츠는 정보 제공을 목적으로 하며, 투자 권유가 아닙니다.
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
