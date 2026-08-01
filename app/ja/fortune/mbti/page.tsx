import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('ja', 'mbti');

export default function JaMbtiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: fortuneHubCopy('ja').title, path: '/ja/fortune' },
        { name: fortuneToolCopy('ja', 'mbti').title, path: '/ja/fortune/mbti' },
      ])} />
      <SubjectFortune kind="mbti" lang="ja" />
    </>
  );
}
