import { redirect } from 'next/navigation';

export default async function LegacyCategoryRedirect({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(resolvedSearchParams)) {
    if (v) search.set(k, v);
  }
  const qs = search.toString();
  redirect(`/category/${resolvedParams.slug}${qs ? `?${qs}` : ''}`);
}
