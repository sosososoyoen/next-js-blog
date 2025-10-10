'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const router = useRouter();

  // 페이지 범위 계산 (현재 페이지 주변 2페이지씩 표시)
  const getPageRange = () => {
    const range = [];
    const showPages = 5; // 표시할 페이지 수
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + showPages - 1);

    // 시작 페이지 조정
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* 첫 페이지로 */}
      {currentPage > 1 && (
        <Link
          href={`${basePath}/1`}
          className="px-3 py-1 rounded-md text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          처음
        </Link>
      )}

      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <Link
          href={`${basePath}/${currentPage - 1}`}
          className="px-3 py-1 rounded-md text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
      )}

      {/* 페이지 번호들 */}
      {getPageRange().map((page) => (
        <Link
          key={page}
          href={`${basePath}/${page}`}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === page
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="px-3 py-1 rounded-md text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>

        </Link>
      )}

      {/* 마지막 페이지로 */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${totalPages}`}
          className="px-3 py-1 rounded-md text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          마지막
        </Link>
      )}
    </div>
  );
}
