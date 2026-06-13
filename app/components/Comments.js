"use client";

import { useEffect, useRef } from "react";

/**
 * Giscus(GitHub Discussions 기반) 댓글 위젯.
 * 아래 환경변수가 모두 설정되어 있어야 표시됩니다 (README 참고):
 * NEXT_PUBLIC_GISCUS_REPO, NEXT_PUBLIC_GISCUS_REPO_ID,
 * NEXT_PUBLIC_GISCUS_CATEGORY, NEXT_PUBLIC_GISCUS_CATEGORY_ID
 */
export default function Comments() {
  const ref = useRef(null);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!repo || !repoId || !category || !categoryId) return;
    if (!ref.current || ref.current.querySelector("iframe.giscus-frame")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ko");

    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId]);

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return <div className="comments-section" ref={ref} />;
}
