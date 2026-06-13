import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <p>
        아직 작성된 글이 없습니다. <code>npm run generate</code>로 첫 글을
        생성해보세요.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {posts.map((post) => (
        <li key={post.slug} style={{ marginBottom: "1.5rem" }}>
          <Link href={`/posts/${post.slug}`} style={{ fontSize: "1.2rem", fontWeight: 600 }}>
            {post.title}
          </Link>
          <p style={{ color: "#666", margin: "0.25rem 0" }}>{post.date}</p>
          <p style={{ margin: 0 }}>{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
