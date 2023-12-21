// import { attributes, react as HomeContent } from '#/home.md';
// import {
//   attributes,
//   react as HomeContent,
// } from '#/posts/2020-02-16_netlify-netlify-cms-gatsbyjsでブログを構築した.md';
import { Post, fetchPosts } from '@/lib/content';

import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function Home() {
  const posts = await fetchPosts({ page: 1, limit: 3, orderBy: 'date:desc' });
  console.log(posts);
  // let { title, cats } = attributes;
  return (
    <>
      <article>
        <h1>My blog</h1>
        <ul>
          {posts.map((post: Post, index) => (
            <li key={index}>
              <h2>{post.title}</h2>
              <p>{post.slug}</p>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
