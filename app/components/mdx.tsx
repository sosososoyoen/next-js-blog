import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React from 'react';
import { MDXImage } from './mdx-image';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks'; // import 추가

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
      className={`relative rounded font-mono text-sm ${
        props.className?.includes('language-')
          ? ''
          : 'inline-block bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5'
      }`}
    />
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function getTextFromChildren(children) {
  if (children == null) return '';
  if (typeof children === 'string' || typeof children === 'number')
    return String(children);
  if (Array.isArray(children))
    return children.map(getTextFromChildren).join('');
  if (typeof children === 'object') {
    if (children.props && children.props.children)
      return getTextFromChildren(children.props.children);
    return '';
  }
  return '';
}

function createHeading(level) {
  const levelClassMap = {
    1: 'text-3xl font-bold leading-tight tracking-tight',
    2: 'text-2xl font-bold leading-tight tracking-tight',
    3: 'text-xl font-bold leading-snug',
    4: 'text-lg font-bold leading-snug',
    5: 'text-base font-bold leading-snug',
    6: 'text-sm font-bold leading-snug',
  };

  const Heading = ({ children, className = '', ...props }) => {
    const text = getTextFromChildren(children);
    const slug = slugify(text || '');
    const Tag = `h${level}`;
    const contentClass = `${levelClassMap[level] ?? ''} inline`.trim();

    return React.createElement(
      Tag,
      {
        id: slug,
        className: `group scroll-mt-20 ${className}`.trim(),
        ...props,
      },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className:
            'anchor mr-2 text-gray-400 hover:text-gray-600 transition-opacity opacity-0 group-hover:opacity-100',
          'aria-hidden': 'true',
        }),
        React.createElement(
          'span',
          { key: `content-${slug}`, className: contentClass },
          children
        ),
      ]
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: MDXImage,
  img: MDXImage, // 마크다운 문법의 이미지도 MDXImage로 처리
  a: CustomLink,
  code: Code,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkBreaks],
          format: 'mdx',
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
