import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hant', 'blood-type');

export default function ZhHantBloodTypePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: fortuneHubCopy('zh-hant').title, path: '/zh-hant/fortune' },
        { name: fortuneToolCopy('zh-hant', 'blood-type').title, path: '/zh-hant/fortune/blood-type' },
      ])} />
      <SubjectFortune kind="blood" lang="zh-hant" />
    </>
  );
}
