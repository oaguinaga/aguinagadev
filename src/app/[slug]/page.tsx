import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import BlogHero from "@/components/blog-hero/blog-hero";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDX_COMPONENT_MAP } from "@/helpers/mdx-components";
import styles from "./slug.module.css";

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await loadBlogPost(slug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        publishedOn={post.frontmatter.publishedOn}
        updatedOn={post.frontmatter.updatedOn}
        category={post.frontmatter.category}
      />

      <div className={`${styles.page} ${post.frontmatter.category} ${slug === "hello-world" ? styles.helloWorld : ""}`}>
        <MDXRemote
          source={post.content}
          components={MDX_COMPONENT_MAP}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
