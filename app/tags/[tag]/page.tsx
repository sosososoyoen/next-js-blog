import { getBlogPosts } from 'app/blog/server-utils';
import { notFound } from 'next/navigation';
import { BlogPosts } from 'app/components/posts';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const allPosts = getBlogPosts();

  // 해당 태그를 가진 포스트만 필터링
  const filteredPosts = allPosts.filter(post =>
    post.metadata.tags && post.metadata.tags.includes(decodeURIComponent(tag))
  );

  // 해당 태그를 가진 포스트가 없으면 404 페이지로 이동
  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        #{decodeURIComponent(tag)} 태그 포스트
      </h1>
      <BlogPosts blogPosts={filteredPosts} />
    </section>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const tags = new Set<string>();

  posts.forEach(post => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).map(tag => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} 태그`,
    description: `${decodedTag} 태그가 있는 블로그 포스트들을 확인하세요.`,
  };
}
