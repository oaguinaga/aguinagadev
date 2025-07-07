import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import styles from "./slug.module.css";

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await loadBlogPost(slug);

  return (
    <article className={styles.wrapper}>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.abstract}</p>
      <div className={styles.page}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}

export default BlogPost;
