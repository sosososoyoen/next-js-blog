import { getViewsCount } from 'queries/db';
import ViewCounter from './view-counter';

interface ViewsDisplayProps {
  slug: string;
}

export default async function ViewsDisplay({ slug }: ViewsDisplayProps) {
  const views = await getViewsCount();
  const count = views.find(view => view.slug === slug)?.count ?? 0;

  return <ViewCounter slug={slug} initialCount={count} />;
}
