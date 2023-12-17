import { attributes, react as HomeContent } from '#/home.md';

import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function Home() {
  let { title, cats } = attributes;
  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <article>
        <h1>{title}</h1>
        <HomeContent />
        <ul>
          {cats.map((cat: { name: string; description: string }, k: string) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
