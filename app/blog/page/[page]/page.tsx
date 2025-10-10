import { BlogPosts } from 'app/components/posts';
import { getBlogPosts } from 'app/blog/server-utils';
import { notFound } from 'next/navigation';
import Pagination from 'app/components/pagination';
import { POSTS_PER_PAGE } from 'app/lib/constants';

interface BlogPageProps {
  params: Promise<{
    page: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const currentPage = parseInt((await params).page);
  const posts = getBlogPosts();
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // 유효하지 않은 페이지 번호 처리
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <section>
      <BlogPosts blogPosts={currentPosts} showTags showThumbnail />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog/page"
      />
    </section>
  );
}
