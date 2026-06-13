import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        아직 작성된 글이 없습니다.<br />
        <code>npm run generate</code>로 첫 글을 생성해보세요.
      </div>
    );
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`} className="post-card">
            <p className="post-card-date">{post.date}</p>
            <h2 className="post-card-title">{post.title}</h2>
            <p className="post-card-desc">{post.description}</p>
            {post.tags?.length > 0 && (
              <div className="tag-list">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
