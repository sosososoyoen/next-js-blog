import { BlogPosts } from 'app/components/posts';
import TypingText from './components/typing-text';

export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <img
          width={250}
          className="bubbles-3d max-w-64 dark:hidden"
          src="/images/bubbles_2d.png"
          alt="Profile picture - light mode"
        />
        <img
          width={250}
          className="bubbles-3d-mouse max-w-64 hidden dark:block"
          src="/images/complainer_2d.webp"
          alt="Profile picture - dark mode"
        />
      </div>
      <div>
        <TypingText text={'oh Bubbles, my Bubbles!'} />
      </div>
      <p className="font-galmuri tracking-tight text-sm mb-2">IT, 개발에 대해 자유롭게 기록하는 공간입니다.</p>
    </section>
  );
}
