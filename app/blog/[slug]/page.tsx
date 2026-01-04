import { getBlogPosts } from 'app/blog/server-utils';
import { CustomMDX } from 'app/components/mdx';
import { baseUrl } from 'app/sitemap';
import { notFound } from 'next/navigation';
import { formatDate } from 'app/blog/client-utils';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../types';

export async function generateStaticParams() {
  let posts: BlogPost[] = getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  let post = getBlogPosts().find(post => post.slug === resolvedParams.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const resolvedParams = await params;
  const post: BlogPost | undefined = getBlogPosts().find(
    post => post.slug === resolvedParams.slug
  );

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'soyeon',
            },
          }),
        }}
      />
      <p className="text-xs mb-1 text-neutral-600 dark:text-neutral-400">
        {formatDate(post.metadata.publishedAt)}
      </p>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-2 text-sm"></div>
      {post.metadata.tags && post.metadata.tags.length > 0 && (
        <div>
          {post.metadata.tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-block bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors px-3 py-1 mr-2 mb-2 rounded-full text-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <article className="prose">
        {post.metadata.thumbnail && (
          <div className="flex justify-center mb-6">
            <Image
              src={`/thumbnails/${post.metadata.thumbnail}`}
              alt={`${post.metadata.title} thumbnail`}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                maxWidth: 800,
                height: 'auto',
              }}
              className="w-full"
            />
          </div>
        )}
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
