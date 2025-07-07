import BlogSummaryCard from "@/components/blog-summary-card";
import { getBlogPostList } from "@/helpers/file-helpers";

import styles from "./homepage.module.css";

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      {posts.map(post => (
        <BlogSummaryCard
          key={post.slug}
          {...post}
        />
      ))}
    </div>
  );
}
