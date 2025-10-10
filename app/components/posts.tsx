import { getBlogPosts } from 'app/blog/server-utils';
import { PostItem } from './post-item';
import { BlogPost } from '../blog/types';


interface BlogPostsProps {
  showTags?: boolean;
  showThumbnail?: boolean;
  blogPosts?: BlogPost[];
}

export function BlogPosts({ showTags = true, showThumbnail = true, blogPosts }: BlogPostsProps) {
  const posts = blogPosts ? blogPosts : getBlogPosts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {posts
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <PostItem
            key={post.slug}
            post={post}
            showTags={showTags}
            showThumbnail={showThumbnail}
          />
        ))}
    </div>
  );
}
