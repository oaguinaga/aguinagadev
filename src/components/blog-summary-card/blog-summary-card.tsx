import type { CategoryKey } from "@/constants/constants";
import type { BlogPost } from "@/helpers/file-helpers";
import Link from "next/link";
import * as React from "react";
import { CATEGORIES } from "@/constants/constants";
import Icon from "../icon";
import styles from "./blog-summary-card.module.css";

function BlogSummaryCard({
  slug,
  title,
  subtitle,
  abstract,
  category = "GENERAL" as CategoryKey,
}: BlogPost) {
  const category_label = CATEGORIES[category];

  return (
    <div className={styles.wrapper}>
      <Link href={`/${slug}`} className={styles.title}>
        <span>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </Link>
      <p>{abstract}</p>
      {category && <p className={styles.category}>{category_label}</p>}

      <Link href={`/${slug}`} className={styles.readMore}>
        Read more
        <Icon id="arrow-right" />
      </Link>

    </div>
  );
}

export default BlogSummaryCard;
