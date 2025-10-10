'use client';

import Image from 'next/image';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  className?: string;
}

export function MDXImage({ src, alt, width = 800, className }: MDXImageProps) {
  const isExternal = src.startsWith('http');
  const imageSrc = isExternal ? src : `/posts/${src}`;

  return (
    <div className={`relative ${className || ''}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={0}
        sizes="100vw"
        style={{
          width: '100%',
          maxWidth: width,
          height: 'auto'
        }}
        className="rounded-lg"
        quality={100}
      />
    </div>
  );
}
