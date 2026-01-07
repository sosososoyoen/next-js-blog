import { ImageResponse } from 'next/og';
import { baseUrl } from 'app/sitemap';

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get('title') || 'oh Bubbles, my Bubbles!';
  let date = url.searchParams.get('date') || '';
  let tags = url.searchParams.get('tags') || '';
  const tagWithHash = tags
    ? tags
        .split(',')
        .map(tag => `#${tag.trim()}`)
        .join(' ')
    : '';

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          backgroundImage:
            'linear-gradient(to bottom right, #eff6ff, #ffffff, #faf5ff)',
        }}
        tw="flex flex-col w-full h-full justify-between p-16"
      >
        {/* Header with tags */}
        <div tw="flex items-start">
          {tagWithHash && (
            <div tw="flex items-center bg-white text-gray-900 px-6 py-3 rounded-full text-xl font-semibold shadow-lg">
              {tagWithHash}
            </div>
          )}
        </div>

        {/* Main title */}
        <div tw="flex flex-col max-w-[1000px]">
          <h1 tw="text-7xl font-black text-gray-900 leading-tight mb-0">
            {title}
          </h1>
        </div>

        {/* Footer with date and site */}
        <div tw="flex items-center justify-between w-full">
          <div tw="flex flex-col">
            <span tw="text-2xl font-bold text-gray-900">bubbles.dev</span>
            {date && <span tw="text-xl text-gray-600 mt-1">{date}</span>}
          </div>
          <div tw="flex items-center justify-center w-20 h-20 rounded-full shadow-xl">
            <span tw="text-4xl">💭</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
