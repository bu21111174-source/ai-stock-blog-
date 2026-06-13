import { getAllPosts, getPostBySlug } from "../../../lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | aisemitrend`,
    description: post.description,
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return <p>글을 찾을 수 없습니다.</p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p style={{ color: "#666" }}>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      {post.tags?.length > 0 && (
        <p style={{ color: "#999", fontSize: "0.85rem" }}>
          태그: {post.tags.join(", ")}
        </p>
      )}
    </article>
  );
}
