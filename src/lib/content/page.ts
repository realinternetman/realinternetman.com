import path from 'path';

import {
  contentDir,
  loadMarkdown,
  fetchContentList,
  fetchContentDetails,
} from '@/lib/content';

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
  const pages: Page[] = await fetchContentList(pagesDir);
  return pages;
}

export async function getPage(slug: string): Promise<Page> {
  const page = await fetchContentDetails(path.join(pagesDir, `${slug}.md`));
  console.log(page);
  return page as unknown as Page;
}
