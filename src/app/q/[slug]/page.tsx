import { redirect } from 'next/navigation';

export default async function LegacyQuestionRedirect({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/question/${resolvedParams.slug}`);
}
