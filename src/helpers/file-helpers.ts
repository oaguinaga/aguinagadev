import type { CategoryKey } from "@/constants/constants";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import React from "react";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  abstract: string;
  category: CategoryKey;
  updatedOn?: string;
  publishedOn?: string;
};

export async function getBlogPostList(): Promise<BlogPost[]> {
  const file_names = await readDirectory("/content");
  const blog_posts: BlogPost[] = [];

  for (const file_name of file_names) {
    const raw_content = await readFile(`/content/${file_name}`);
    const { data: frontmatter } = matter(raw_content);
    blog_posts.push({
      slug: file_name.replace(/\.mdx$/, ""),
      ...frontmatter,
    } as BlogPost);
  }

  return blog_posts.sort((a, b) => {
    if (a.publishedOn && b.publishedOn) {
      return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
    }
    return 0;
  });
}

export const loadBlogPost = React.cache(async (post_slug: string) => {
  const raw_content = await readFile(`/content/${post_slug}.mdx`);

  const { data: frontmatter, content } = matter(raw_content);

  return {
    frontmatter,
    content,
  };
});

function readFile(local_path: string) {
  return fs.readFile(path.join(process.cwd(), local_path), "utf-8");
}

function readDirectory(local_path: string) {
  return fs.readdir(path.join(process.cwd(), local_path));
}
