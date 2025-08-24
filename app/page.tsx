import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <div className="flex align-items">
          <img
            src="/images/bubbles_3d_1.png"
            alt="Profile picture"
            width={300}
          />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bubbles tracking-tighter mb-4 text-blue-600">
          oh Bubbles, my Bubbles🐬🐬🐬
        </h1>
      </div>
      <p className="mb-4">
        I mainly write about web development, but I also share my thoughts on
        various topics. Enjoy reading! 😊
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
