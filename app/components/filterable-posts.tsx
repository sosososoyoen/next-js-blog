'use client';

import { useState, useEffect } from 'react';
import { PostItem } from './post-item';
import TagFilter from './tag-filter';
import type { BlogPost } from 'app/blog/types';

interface FilterableBlogPostsProps {
  posts: BlogPost[];
  tags: string[];
}

export function FilterableBlogPosts({ posts, tags }: FilterableBlogPostsProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // 선택된 태그에 따라 포스트 필터링
  useEffect(() => {
    if (selectedTag) {
      setFilteredPosts(
        posts.filter(post =>
          post.metadata.tags?.includes(selectedTag)
        )
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedTag, posts]);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <div>
      <TagFilter
        tags={tags}
        onTagSelect={handleTagSelect}
        selectedTag={selectedTag}
      />

      {filteredPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
    </div>
  );
}
