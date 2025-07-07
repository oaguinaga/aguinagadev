import Link from "next/link";
import { getBlogPostList } from "@/helpers/file-helpers";
import styles from "./homepage.module.css";

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <div>
      <div className={styles.wrapper}>
        <h1>Blog</h1>
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
