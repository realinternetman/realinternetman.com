import { Page, listAllPages, getPage } from '@/lib/content/page';

export async function generateStaticParams() {
  const pages = await listAllPages();
  // console.log(pages);
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  return <div dangerouslySetInnerHTML={{ __html: page.contentHtml }}></div>;
}
