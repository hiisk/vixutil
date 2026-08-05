import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DreamIntl from '@/components/fortune/DreamIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('hi', 'dream');

export default function HiDreamPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: fortuneHubCopy('hi').title, path: '/hi/fortune' },
        { name: fortuneToolCopy('hi', 'dream').title, path: '/hi/fortune/dream' },
      ])} />
      <DreamIntl lang="hi" />
    </>
  );
}
