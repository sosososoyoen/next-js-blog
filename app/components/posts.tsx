import Link from 'next/link';
import { getBlogPosts, getAllTags } from 'app/blog/server-utils';
import { formatDate } from 'app/blog/client-utils';
import { FilterableBlogPosts } from './filterable-posts';
import { PostItem } from './post-item';

export function BlogPosts({showTag = false, filterByTag = false}) {
  const allBlogs = getBlogPosts();
  const allTags = getAllTags();

  // filterByTag가 true이면 FilterableBlogPosts 컴포넌트 사용
  if (filterByTag) {
    return <FilterableBlogPosts posts={allBlogs} tags={allTags} />;
  }

  // 기존 방식대로 포스트 목록 표시 (필터링 없이)
  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <PostItem key={post.slug} post={post} showTags={showTag} />
        ))}
    </div>
  );
}
