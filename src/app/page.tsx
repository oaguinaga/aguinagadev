import BlogSummaryCard from "@/components/blog-summary-card";

import { HeaderClouds } from "@/components/clouds";
import GithubButton from "@/components/github-button/github-button";
import Icon from "@/components/icon";
import { getBlogPostList } from "@/helpers/file-helpers";
import styles from "./homepage.module.css";

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <div>
      <HeaderClouds />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={`${styles.banner} ${styles.gradient}`}>
            <a href="https://pianopal.io" target="_blank" rel="noopener noreferrer"><span>Pianopal.io</span></a>
            <div className={styles.bannerContent}>
              <div>
                <p>
                  <b>PianoPal</b>
                  {" "}
                  is your cheerful scales companion — a beginner-friendly, app that helps users
                  {" "}
                  <b>learn, visualize, and practice</b>
                  {" "}
                  piano scales with color, sound, and joy.
                </p>
              </div>
              <img src="/pianopal/pianopal.png" alt="Pianopal App Screenshot" className={styles.bannerImage} />

            </div>

            <div className={styles.bannerButtons}>
              <GithubButton href="https://github.com/oaguinaga/pianopal">
                GitHub
              </GithubButton>
              <a href="https://pianopal.io" target="_blank" rel="noopener noreferrer" className={styles.liveButton}>
                <Icon id="rocket" />
                Visit
              </a>

            </div>

          </div>
        </div>

        <div className={styles.main}>
          {posts.map(post => (
            <BlogSummaryCard
              key={post.slug}
              {...post}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
