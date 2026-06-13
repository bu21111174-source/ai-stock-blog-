import Link from "next/link";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import Comments from "../../components/Comments";

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
    <article className="post-article">
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>
      <h1>{post.title}</h1>
      <p className="post-meta">{post.date}</p>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      {post.tags?.length > 0 && (
        <div className="tag-list">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
      <Comments />
    </article>
  );
}
