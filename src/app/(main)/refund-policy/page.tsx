import { Metadata } from 'next';
import prisma from '@/lib/db';
import { PolicyPageLayout } from '@/components/PolicyPageLayout';
import { getDefaultPage } from '@/lib/defaultPages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Refund Policy | PrimeTaxi & Tours',
  description: 'Our cancellation and refund policy for airport transfers, private tours, and taxi services in Iceland.',
};

const SLUG = 'refund-policy';

export default async function RefundPolicyPage() {
  const dbPage = await prisma.page.findUnique({ where: { slug: SLUG } }).catch(() => null);
  const fallback = getDefaultPage(SLUG)!;

  const title = dbPage?.title ?? fallback.title;
  const content = dbPage?.content ?? fallback.content;
  const updatedAt = dbPage?.updatedAt ?? null;

  return <PolicyPageLayout title={title} slug={SLUG} updatedAt={updatedAt} content={content} />;
}
