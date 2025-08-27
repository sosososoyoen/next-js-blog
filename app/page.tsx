import { BlogPosts } from 'app/components/posts';
import AnimatedImage from './components/animated-image';

export default function Page() {
  return (
    <section>
      <AnimatedImage />
      <div>
        <h1 className="text-2xl font-bubbles tracking-tighter mb-4 text-blue-400">
          oh Bubbles, my Bubbles!
        </h1>
      </div>
      <h6 className="font-semibold">Hi there 🐬 🐬 🐬</h6>
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
