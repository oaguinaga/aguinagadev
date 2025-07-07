import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import React from "react";

type BlogPost = {
  slug: string;
  publishedOn?: string;
  title: string;
  abstract: string;
};

export async function getBlogPostList(): Promise<BlogPost[]> {
  const fileNames = await readDirectory("/content");
  const blogPosts: BlogPost[] = [];

  for (const fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);
    const { data: frontmatter } = matter(rawContent);
    blogPosts.push({
      slug: fileName.replace(/\.mdx$/, ""),
      ...frontmatter,
    } as BlogPost);
  }

  return blogPosts.sort((a, b) => {
    if (a.publishedOn && b.publishedOn) {
      return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
    }
    return 0;
  });
}

export const loadBlogPost = React.cache(async (postSlug: string) => {
  const rawContent = await readFile(`/content/${postSlug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return {
    frontmatter,
    content,
  };
});

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf-8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
