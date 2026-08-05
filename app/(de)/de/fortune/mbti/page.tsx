import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('de', 'mbti');

export default function DeMbtiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: fortuneHubCopy('de').title, path: '/de/fortune' },
        { name: fortuneToolCopy('de', 'mbti').title, path: '/de/fortune/mbti' },
      ])} />
      <SubjectFortune kind="mbti" lang="de" />
    </>
  );
}
