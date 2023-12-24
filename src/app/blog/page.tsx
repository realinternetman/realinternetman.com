import { Post, listPosts } from '@/lib/content/post';

export default async function Home() {
  const posts = await listPosts({ page: 1, limit: 5, orderBy: 'date:desc' });
  // console.log(posts);
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
