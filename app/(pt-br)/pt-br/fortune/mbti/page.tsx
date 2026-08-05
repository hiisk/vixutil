import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('pt-br', 'mbti');

export default function PtBrMbtiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: fortuneHubCopy('pt-br').title, path: '/pt-br/fortune' },
        { name: fortuneToolCopy('pt-br', 'mbti').title, path: '/pt-br/fortune/mbti' },
      ])} />
      <SubjectFortune kind="mbti" lang="pt-br" />
    </>
  );
}
