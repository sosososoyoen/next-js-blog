import { BlogPosts } from 'app/components/posts';
import TypingText from './components/typing-text';

export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <img
          className="bubbles-3d max-w-64 dark:hidden"
          src="/images/bubbles_2d.png"
          alt="Profile picture - light mode"
        />
        <img
          className="bubbles-3d-mouse max-w-64 hidden dark:block"
          src="/images/bubbles_2d_2.png"
          alt="Profile picture - dark mode"
        />
      </div>
      <div>
        <TypingText text={'oh Bubbles, my Bubbles!'} />
      </div>
      <h6 className="font-galmuri font-semibold tracking-tight text-gray-800 dark:text-gray-100 mb-2">하이🐬 🐬 🐬</h6>
      <p className="font-galmuri tracking-tight text-sm mb-2">IT, 개발에 대해 자유롭게 기록하는 공간입니다. <br />엔터테인먼트 B2C 서비스를 개발하고 있습니다.</p>
      <p className="text-sm">
        🌊 Angular, NestJS, NodeJS, TypeScript
      </p>
      <div className="mt-11">
        <BlogPosts />
      </div>
    </section>
  );
}
