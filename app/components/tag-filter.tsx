'use client';

import { cn } from 'app/lib/utils';

interface TagFilterProps {
  tags: string[];
  onTagSelect: (tag: string | null) => void;
  selectedTag: string | null;
}

export default function TagFilter({ tags, onTagSelect, selectedTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onTagSelect(null)}
        className={cn(
          'px-3 py-1 text-sm rounded-full transition-colors',
          selectedTag === null
            ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
        )}
      >
        전체
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={cn(
            'px-3 py-1 text-sm rounded-full transition-colors',
            selectedTag === tag
              ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
