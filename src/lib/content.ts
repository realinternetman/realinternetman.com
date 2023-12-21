import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'content');
const postsDir = path.join(contentDir, 'posts');

export interface Post {
  fileName: string;
  contentHtml: string;
  title: string;
  date: Date;
  category: string;
  tags: string[];
  slug: string;
}
type PostOrderBy = 'date:desc' | 'date:asc';

export async function fetchPosts(params: {
  page: number;
  limit: number;
  orderBy: PostOrderBy;
}) {
  const fileNames = fs.readdirSync(postsDir);

  const posts: Post[] = await Promise.all(
    fileNames.map(async (fileName: string) => {
      return await getPost(fileName);
    }),
  );

  posts.sort((a: Post, b: Post) => {
    return params.orderBy === 'date:asc'
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime();
  });

  const start = (params.page - 1) * params.limit;
  const end = params.page * params.limit;
  return posts.slice(start, end);
}

export async function getPost(fileName: string): Promise<Post> {
  const fullPath = path.join(postsDir, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    fileName,
    contentHtml,
    ...matterResult.data,
  } as Post;
}
