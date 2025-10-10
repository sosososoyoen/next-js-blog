import { BlogPosts } from 'app/components/posts';
import { getBlogPosts } from './server-utils';
import Pagination from 'app/components/pagination';
import { POSTS_PER_PAGE } from 'app/lib/constants';

export default function BlogPage() {
  const posts = getBlogPosts();
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const currentPosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts blogPosts={currentPosts} showTags showThumbnail />
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        basePath="/blog/page"
      />
    </section>
  );
}
