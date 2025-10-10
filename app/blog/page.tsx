import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Posts</h1>
      <BlogPosts showTags={true} showThumbnail={true} />
    </section>
  );
}

export async function generateMetadata() {
  return {
    title: 'Posts | 포스트',
    description: 'IT, 개발에 대해 자유롭게 기록하는 공간입니다.'
  };
}
