import BlogSummaryCard from "@/components/blog-summary-card";
import { HeaderClouds } from "@/components/clouds";

import { getBlogPostList } from "@/helpers/file-helpers";
import styles from "./homepage.module.css";

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <div>
      <HeaderClouds />
      <div className={styles.wrapper}>
        {posts.map(post => (
          <BlogSummaryCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </div>
  );
}
