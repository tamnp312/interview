import { redirect } from 'next/navigation';

export default async function LegacyFlashcardsRedirect({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/category/${resolvedParams.slug}/flashcards`);
}
