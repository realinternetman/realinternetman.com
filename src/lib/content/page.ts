import path from 'path';
import fs from 'fs';

import { contentDir, loadMarkdown } from '@/lib/content';

const pagesDir = path.join(contentDir, 'pages');

export interface Page {
  fileName: string;
  contentHtml: string;
  title: string;
  date: Date;
  body: string;
  slug: string;
}

async function loadPageData(fileName: string): Promise<Page> {
  const fullPath = path.join(pagesDir, fileName);
  const post = await loadMarkdown(fullPath);
  return { fileName, ...post } as Page;
}

export async function listAllPages() {
  const fileNames = fs.readdirSync(pagesDir);

  const posts: Page[] = await Promise.all(
    fileNames.map(async (fileName: string) => {
      return await loadPageData(fileName);
    }),
  );

  return posts;
}

export async function getPage(slug: string): Promise<Page> {
  return await loadPageData(`${slug}.md`);
}
