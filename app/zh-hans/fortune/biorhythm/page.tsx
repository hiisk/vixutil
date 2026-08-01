import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Biorhythm from '@/components/fortune/Biorhythm';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hans', 'biorhythm');

export default function ZhHansBiorhythmPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: fortuneHubCopy('zh-hans').title, path: '/zh-hans/fortune' },
        { name: fortuneToolCopy('zh-hans', 'biorhythm').title, path: '/zh-hans/fortune/biorhythm' },
      ])} />
      <Biorhythm lang="zh-hans" />
    </>
  );
}
