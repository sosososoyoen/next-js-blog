'use client';

import { formatDate } from 'app/blog/client-utils';
import type { BlogPost } from 'app/blog/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PostItemProps {
  post: BlogPost;
  showTags?: boolean;
  showThumbnail?: boolean;
}

export function PostItem({
  post,
  showTags = true,
  showThumbnail = true,
}: PostItemProps) {
  const router = useRouter();

  const handleTagClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tag: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/tags/${encodeURIComponent(tag)}`);
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      onClick={() => router.push(`/blog/${post.slug}`)}
    >
      {/* 썸네일 영역*/}
      {showThumbnail && post.metadata.thumbnail && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={`/thumbnails/${post.metadata.thumbnail}`}
            alt={`${post.metadata.title} thumbnail`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* 컨텐츠 영역 */}
      <div className="flex flex-col flex-grow p-4">
        {/* 날짜 */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          {formatDate(post.metadata.publishedAt, false)}
        </p>

        {/* 제목 */}
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
          {post.metadata.title}
        </h2>

        {/* 요약 */}
        {post.metadata.summary && (
          <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-2">
            {post.metadata.summary}
          </p>
        )}

        {/* 태그 */}
        {showTags && post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {post.metadata.tags.map(tag => (
              <a
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                onClick={e => handleTagClick(e, tag)}
                className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
