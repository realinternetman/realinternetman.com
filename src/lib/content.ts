import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

async function query(query: string) {
  const response = await fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();
  return json;
}

async function formatContent(entry: GitHubEntry) {
  let content = { name: entry.name } as Content;
  if (entry?.object?.text !== undefined) {
    content = {
      ...content,
      ...(await loadMarkdown(entry.object.text)),
    };
  }
  if (entry?.object?.byteSize !== undefined) {
    content.byteSize = entry.object.byteSize;
  }
  return content;
}

interface GitHubEntry {
  name: string;
  object: { text?: string; byteSize?: Number };
}
interface Content {
  name: string;
  contentHtml?: string;
  byteSize?: Number;
}

export async function fetchContentList(
  filePath: string,
  fields: string[] = ['name', 'text'],
) {
  const hasObjectFields =
    fields.includes('text') || fields.includes('byteSize');
  const result = await query(`
  query list {
    repository(owner: "${process.env.GITHUB_OWNER}", name: "${
      process.env.GITHUB_CONTENT_REPO
    }") {
      object(expression: "${process.env.GITHUB_CONTENT_BRANCH}:${filePath}") {
        ... on Tree {
          entries {
            name
            ${
              hasObjectFields
                ? `
            object {
              ... on Blob {
                ${fields.includes('text') ? 'text' : ''}
                ${fields.includes('byteSize') ? 'byteSize' : ''}
              }
            }
            `
                : ''
            }
          }
        }
      }
    }
  }
`);
  return Promise.all(
    result.data.repository.object.entries.map(
      async (entry: GitHubEntry) => await formatContent(entry),
    ),
  );
}

export async function fetchContentDetails(
  filePath: string,
  fields: string[] = ['name', 'text'],
) {
  const result = await query(`
  query list {
    repository(owner: "${process.env.GITHUB_OWNER}", name: "${process.env.GITHUB_CONTENT_REPO}") {
      object(expression: "${process.env.GITHUB_CONTENT_BRANCH}:${filePath}") {
        ... on Blob {
          text
          byteSize
        }
      }
    }
  }
`);
  return await formatContent({
    name: path.basename(filePath),
    object: result.data.repository.object,
  });
}

export const contentDir = 'content';

export async function loadMarkdown(fileContents: string) {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data,
  };
}
