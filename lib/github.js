const GITHUB_API = "https://api.github.com";

/**
 * GitHub Contents API로 파일을 생성/커밋한다 (새 파일 전용).
 * @param {string} filePath - 저장소 내 경로 (예: "content/posts/2026-06-14-foo.md")
 * @param {string} content - 파일 내용 (텍스트)
 * @param {string} message - 커밋 메시지
 */
export async function commitFileToGitHub(filePath, content, message) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GH_TOKEN;

  if (!owner || !repo || !token) {
    throw new Error(
      "GITHUB_OWNER, GITHUB_REPO, GH_TOKEN 환경변수가 필요합니다."
    );
  }

  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub 커밋 실패 (${res.status}): ${errText}`);
  }

  return res.json();
}
