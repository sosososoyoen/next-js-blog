import fs from 'fs';
import path from 'path';
import { Metadata } from './types';

export function getBaseUrl(): URL {
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    return new URL('http://localhost:3000');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_URL?.trim();

  let raw = 'http://localhost:3000';

  if (siteUrl) {
    raw = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;
  } else if (vercel) {
    raw = `https://${vercel}`;
  }

  try {
    return new URL(raw);
  } catch {
    return new URL('http://localhost:3000');
  }
}

/** 마지막 슬래시 제거한 문자열 */
export function baseUrlString(): string {
  return getBaseUrl().toString().replace(/\/$/, '');
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach(line => {
    let [key, ...valueArr] = line.split(': ');
    key = key.trim();
    let value = valueArr.join(': ').trim();

    if (key === 'tags') {
      // 태그 배열 파싱 ['tag1', 'tag2'] 형식
      try {
        const tagsString = value.replace(/^\[|\]$/g, '').trim();
        if (tagsString) {
          // 문자열에서 태그 추출 - 쉼표로 구분되고 따옴표로 둘러싸인 태그들
          const tags = tagsString
            .split(',')
            .map(tag => tag.trim().replace(/^['"]|['"]$/g, ''));
          metadata.tags = tags;
        } else {
          metadata.tags = [];
        }
      } catch (e) {
        console.error('태그 파싱 오류:', e);
        metadata.tags = [];
      }
    } else {
      value = value.replace(/^['"](.*)['"]$/, '$1');
      // @ts-ignore
      metadata[key as keyof Metadata] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map(file => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'posts'));
}

export function getAllTags() {
  const posts = getBlogPosts();
  const tagsSet = new Set<string>();

  posts.forEach(post => {
    const tags = post.metadata.tags || [];
    tags.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
