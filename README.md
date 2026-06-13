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

## 7. 매일 자동 실행 (Vercel Cron, 노트북과 무관하게 동작)

Vercel의 Cron Jobs 기능으로 매일 한국시간 08:00에 `/api/generate`를 자동 호출해
글을 생성하고 GitHub에 직접 커밋합니다 (커밋되면 Vercel이 자동 재배포).

### 설정 방법

1. **GitHub Personal Access Token 발급**
   - https://github.com/settings/tokens → "Generate new token (classic)"
   - 권한(scope): `repo` 체크
   - 생성된 토큰 복사 (한 번만 표시됨)

2. **CRON_SECRET 생성**
   - 임의의 랜덤 문자열 생성 (예: `openssl rand -hex 16` 실행 결과)

3. **Vercel 프로젝트 → Settings → Environment Variables**에 아래 값 추가:
   | Key | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | Anthropic API 키 |
   | `GH_TOKEN` | 위에서 발급한 GitHub 토큰 |
   | `GITHUB_OWNER` | GitHub 계정명 (예: `bu21111174-source`) |
   | `GITHUB_REPO` | 저장소명 (예: `ai-stock-blog-`) |
   | `CRON_SECRET` | 위에서 생성한 랜덤 문자열 |

4. 환경변수 추가 후 **Redeploy** (Settings → Deployments → 최신 배포 → Redeploy)

5. `vercel.json`의 `crons` 설정에 따라 매일 UTC 23:00(한국시간 08:00)에 자동 실행됩니다.

### 수동 테스트

배포 후 아래 명령으로 직접 호출해 테스트할 수 있습니다 (CRON_SECRET 필요):

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" https://ai-stock-blog.vercel.app/api/generate
```

> Vercel Hobby(무료) 플랜은 Cron Job이 하루 1회로 제한됩니다 - 일 1편 발행에 적합합니다.

## 8. 댓글 기능 (Giscus)

GitHub Discussions를 댓글 저장소로 사용하는 무료 댓글 위젯입니다.

1. 저장소가 **Public**이어야 합니다 (Private면 giscus가 동작하지 않음)
2. 저장소 → Settings → General → Features → **Discussions** 체크박스 활성화
3. https://github.com/apps/giscus 접속 → 해당 저장소에 giscus 앱 설치(Install)
4. https://giscus.app 접속 → 저장소 이름 입력 → 페이지 하단에 자동 생성된
   `data-repo-id`, `data-category`, `data-category-id` 값 확인
5. Vercel 프로젝트 → Settings → Environment Variables에 추가:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_GISCUS_REPO` | `bu21111174-source/ai-stock-blog-` |
   | `NEXT_PUBLIC_GISCUS_REPO_ID` | giscus.app에서 확인한 값 |
   | `NEXT_PUBLIC_GISCUS_CATEGORY` | `General` (또는 선택한 카테고리명) |
   | `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | giscus.app에서 확인한 값 |
6. Redeploy 하면 글 상세 페이지 하단에 댓글창이 표시됩니다.

## 9. RSS 피드/키워드 커스터마이징

`scripts/fetchNews.js`의 `FEEDS`와 `KEYWORDS` 배열을 수정해
다루고 싶은 주제(니치)에 맞게 조정할 수 있습니다.

## 10. 도메인 연결 (나중에)

`aisemitrend.com` 구매 후:
1. Vercel 프로젝트 → Settings → Domains → 도메인 추가
2. 안내에 따라 도메인 등록처(Cloudflare 등)에서 DNS 레코드(A/CNAME) 설정
3. 연결 완료되면 자동으로 HTTPS 인증서 발급됨

이후 콘텐츠가 20~30개 이상 쌓이고 About/Privacy Policy 페이지가 준비되면 애드센스 신청을 진행합니다.

## 주의사항

- 생성된 글은 반드시 검토 후 게시하세요. 사실관계 오류, 저작권 이슈(원문 과도한 인용 등)가
  없는지 확인이 필요합니다.
