import { MDXRemote } from "next-mdx-remote/rsc";
import BlogHero from "@/components/blog-hero/blog-hero";
import { loadBlogPost } from "@/helpers/file-helpers";
import styles from "./slug.module.css";

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await loadBlogPost(slug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
        updatedOn={post.frontmatter.updatedOn}
        category={post.frontmatter.category}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}

export default BlogPost;
