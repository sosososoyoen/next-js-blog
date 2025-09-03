import { BlogPosts } from 'app/components/posts';

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
};

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Posts</h1>
      <BlogPosts showTag={true} filterByTag={true} />
    </section>
  );
}
