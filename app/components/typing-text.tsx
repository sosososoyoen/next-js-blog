'use client';

import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);
export default function TypingText({ text }: { text: string }) {
  const scope = useRef<HTMLDivElement | null>(null);
  const tl = useRef<any>(null);
  const cursorTl = useRef<any>(null);

  useGSAP(() => {
    if (!text) return;
    tl.current = gsap.timeline({
      id: 'scramble-text',
      defaults: { ease: 'none' },
    });

    gsap.set('.scramble-text-original', {
      opacity: 0,
    });

    cursorTl.current = gsap
      .timeline({ repeat: -1 })
      .to('.blinking-cursor', {
        opacity: 0,
        duration: 0.5,
        ease: 'steps(1)',
        delay: 0.2,
      })
      .to('.blinking-cursor', {
        opacity: 1,
        duration: 0.5,
        ease: 'steps(1)',
        delay: 0.2,
      });

    tl.current.to('#scramble-text', {
      scrambleText: {
        text: text,
        chars: 'oO',
        revealDelay: 0.5,
        speed: 0.3,
      },
      duration: 1,
    });
  }, [text]);

  return (
    <div className="w-full flex" ref={scope}>
      <h1
        id="scramble-text"
        className="tracking-tight text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
        aria-hidden={true}
      ></h1>
      <span
        className="blinking-cursor text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
        aria-hidden={true}
      >
        |
      </span>
      <h1 className="scramble-text-original text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 hidden">
        {text}
      </h1>
    </div>
  );
}
