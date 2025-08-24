'use client';

import { useEffect } from 'react';
import { incrementViewCount } from 'queries/db';

interface ViewCounterProps {
  slug: string;
  initialCount: number;
}

export default function ViewCounter({ slug, initialCount }: ViewCounterProps) {
  useEffect(() => {
    // 페이지 방문 시 조회수 증가
    incrementViewCount(slug);
  }, [slug]);

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {initialCount.toLocaleString()} views
    </p>
  );
}
