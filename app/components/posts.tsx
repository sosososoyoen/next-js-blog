import { getBlogPosts } from 'app/blog/server-utils';
import { PostItem } from './post-item';
import { BlogPost } from '../blog/types';


interface BlogPostsProps {
  showTags?: boolean;
  blogPosts?: BlogPost[];
}

export function BlogPosts({ showTags = false, blogPosts }: BlogPostsProps) {
  const posts = blogPosts ? blogPosts : getBlogPosts();

  // 기존 방식대로 포스트 목록 표시 (필터링 없이)
  return (
    <div>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <PostItem key={post.slug} post={post} showTags={showTags} />
        ))}
    </div>
  );
}
