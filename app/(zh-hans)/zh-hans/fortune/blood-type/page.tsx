import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hans', 'blood-type');

export default function ZhHansBloodTypePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: fortuneHubCopy('zh-hans').title, path: '/zh-hans/fortune' },
        { name: fortuneToolCopy('zh-hans', 'blood-type').title, path: '/zh-hans/fortune/blood-type' },
      ])} />
      <SubjectFortune kind="blood" lang="zh-hans" />
    </>
  );
}
