'use client';
import { ContextSafeFunc, useGSAP } from '@gsap/react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function AnimatedImage() {
  const container = useRef<HTMLDivElement | null>(null);
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  const { context, contextSafe } = useGSAP(() => {
    xTo.current = gsap.quickTo('.bubbles-3d-mouse', 'x', { duration: 0.8, ease: 'power3' }),
      yTo.current = gsap.quickTo('.bubbles-3d-mouse', 'y', { duration: 0.8, ease: 'power3' });
  }, { scope: container });

  const moveShape = contextSafe((e) => {
    // console.log(e.clientX, e.clientY);
    // xTo.current(e.clientX);
    // yTo.current(e.clientY);
  });


  return (
    <div className="mb-8">
      <div className="grid grid-cols-3" ref={container} onMouseMove={(e) => moveShape(e)}>
        {/*<img*/}
        {/*  className="block bubbles-3d-mouse"*/}
        {/*  src="/images/bubbles_3d_1.png"*/}
        {/*  alt="Profile picture"*/}
        {/*  width={150}*/}
        {/*/>*/}
        <div className="width-full flex items-center justify-center">
          <img
            className="bubbles-3d"
            src="/images/bubbles_3d_1.png"
            alt="Profile picture"
            width={150}
          />
        </div>
        <div className="width-full flex items-center justify-center">
          <img
            className="bubbles-3d"
            src="/images/bubbles_2d_2.png"
            alt="Profile picture"
            width={150}
          />
        </div>
        <div className="width-full flex items-center justify-center">
          <img
            className="bubbles-3d"
            src="/images/bubbles_2d.png"
            alt="Profile picture"
            width={150}
          />
        </div>


      </div>
    </div>
  );
}
