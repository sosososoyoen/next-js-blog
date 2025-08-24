import { neon } from '@neondatabase/serverless';

export async function getViewsCount(): Promise<
  {
    slug: string;
    count: number;
  }[]
> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  const sql = neon(`${process.env.DATABASE_URL}`);

  const views = await sql`SELECT slug, count FROM views`;

  return views.map(view => ({
    slug: view.slug,
    count: Number(view.count),
  }));
}

export const incrementViewCount = async (slug: string) => {
  if (!process.env.DATABASE_URL) {
    return;
  }

  const sql = neon(`${process.env.DATABASE_URL}`);

  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET count = views.count + 1;
  `;
};
