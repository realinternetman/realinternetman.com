import fs from 'fs';
import path from 'path';

import { contentDir, loadMarkdown } from '@/lib/content';

const postsDir = path.join(contentDir, 'posts');

export interface Post {
  fileName: string;
  contentHtml: string;
  title: string;
  date: Date;
  tags: string[];
  slug: string;
}
type PostOrderBy = 'date:desc' | 'date:asc';

async function loadPostData(fileName: string): Promise<Post> {
  const fullPath = path.join(postsDir, fileName);
  const post = await loadMarkdown(fullPath);
  return { fileName, ...post } as Post;
}

export async function listPosts(params: {
  page: number;
  limit: number;
  orderBy: PostOrderBy;
}) {
  const posts = await listAllPosts({ orderBy: params.orderBy });
  const start = (params.page - 1) * params.limit;
  const end = params.page * params.limit;
  return posts.slice(start, end);
}

export async function listAllPosts(params: { orderBy: PostOrderBy }) {
  const fileNames = fs.readdirSync(postsDir);

  const posts: Post[] = await Promise.all(
    fileNames.map(async (fileName: string) => {
      return await loadPostData(fileName);
    }),
  );

  posts.sort((a: Post, b: Post) => {
    return params.orderBy === 'date:asc'
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime();
  });

  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  return await loadPostData(`${slug}.md`);
}
