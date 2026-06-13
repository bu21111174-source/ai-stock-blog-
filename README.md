# AI반도체 트렌드 블로그 (aisemitrend)

매일 AI반도체·코스피 관련 최신 뉴스를 수집해, Claude로 분석 글을 작성하고
정적 블로그(Next.js)에 마크다운 글로 추가하는 파이프라인입니다.
Vercel에 무료로 배포하고, 추후 `aisemitrend.com` 도메인을 연결할 예정입니다.

## 1. 준비물

1. **Anthropic API 키** - https://console.anthropic.com 에서 발급
2. **GitHub 계정** (무료)
3. **Vercel 계정** (무료, GitHub로 가입 가능)

## 2. 설치

```bash
npm install --cache /tmp/npm-cache
cp .env.example .env
```

`.env` 파일을 열어 Anthropic API 키만 입력하면 됩니다:

```
ANTHROPIC_API_KEY=sk-ant-...
```

## 3. 글 자동 생성

```bash
npm run generate
```

실행하면:
1. RSS 피드에서 AI반도체/코스피 관련 최신 뉴스 5건을 수집
2. Claude가 종합 분석 글(제목/본문/태그/메타description) 생성
3. `content/posts/`에 마크다운 파일로 저장

생성된 글은 `content/posts/`에서 직접 검토/수정할 수 있습니다.

## 4. 로컬 미리보기

```bash
npm run dev
```

http://localhost:3000 에서 사이트를 확인할 수 있습니다.

## 5. GitHub + Vercel로 무료 배포

1. GitHub에 새 저장소 생성 (예: `ai-stock-blog`)
2. 로컬에서 푸시:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <깃허브 저장소 URL>
   git push -u origin main
   ```
3. https://vercel.com 에서 "Add New Project" → 방금 만든 GitHub 저장소 선택 → Deploy
   - 빌드 명령/설정은 Next.js 프로젝트로 자동 인식되므로 별도 설정 불필요
4. 배포 완료 후 `https://<프로젝트명>.vercel.app` 주소로 사이트 접속 가능

## 6. 새 글 추가 후 배포

```bash
npm run generate   # 새 글 생성
git add content/
git commit -m "Add new post"
git push
```

푸시하면 Vercel이 자동으로 다시 빌드/배포합니다.

## 7. 매일 자동 실행 (선택)

macOS의 `launchd` 또는 cron으로 매일 정해진 시간에
`npm run generate && git add content/ && git commit -m "Daily post" && git push`를
실행하도록 등록하면 완전 자동화가 가능합니다. 필요하면 설정을 도와드릴게요.

## 8. RSS 피드/키워드 커스터마이징

`scripts/fetchNews.js`의 `FEEDS`와 `KEYWORDS` 배열을 수정해
다루고 싶은 주제(니치)에 맞게 조정할 수 있습니다.

## 9. 도메인 연결 (나중에)

`aisemitrend.com` 구매 후:
1. Vercel 프로젝트 → Settings → Domains → 도메인 추가
2. 안내에 따라 도메인 등록처(Cloudflare 등)에서 DNS 레코드(A/CNAME) 설정
3. 연결 완료되면 자동으로 HTTPS 인증서 발급됨

이후 콘텐츠가 20~30개 이상 쌓이고 About/Privacy Policy 페이지가 준비되면 애드센스 신청을 진행합니다.

## 주의사항

- 생성된 글은 반드시 검토 후 게시하세요. 사실관계 오류, 저작권 이슈(원문 과도한 인용 등)가
  없는지 확인이 필요합니다.
