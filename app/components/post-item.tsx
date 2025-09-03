'use client';

import Link from 'next/link';
import { formatDate } from 'app/blog/client-utils';
import type { BlogPost } from 'app/blog/types';

interface PostItemProps {
  post: BlogPost;
  showTags?: boolean;
}

export function PostItem({ post, showTags = true }: PostItemProps) {
  return (
    <div className="flex flex-col space-y-1 mb-4" key={post.slug}>
      <Link href={`/blog/${post.slug}`}>
        <div className="w-full flex flex-col md:items-center md:flex-row space-x-0 md:space-x-2">
          <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums text-sm">
            {formatDate(post.metadata.publishedAt, false)}
          </p>
          <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
            {post.metadata.title}
          </p>
        </div>
      </Link>
      {showTags && post.metadata.tags && post.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 ml-0 md:ml-[150px]">
          {post.metadata.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
