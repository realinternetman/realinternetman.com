import path from 'path';

import {
  contentDir,
  fetchContentList,
  fetchContentDetails,
} from '@/lib/content';

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
  const posts: Post[] = await fetchContentList(postsDir);
  posts.sort((a: Post, b: Post) => {
    return params.orderBy === 'date:asc'
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime();
  });

  return posts;
}

// export async function getPost(slug: string): Promise<Post> {
//   return await loadPostData(`${slug}.md`);
// }
