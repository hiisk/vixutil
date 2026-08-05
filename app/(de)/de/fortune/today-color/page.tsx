import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TodayColor from '@/components/fortune/TodayColor';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('de', 'today-color');

export default function DeTodayColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: fortuneHubCopy('de').title, path: '/de/fortune' },
        { name: fortuneToolCopy('de', 'today-color').title, path: '/de/fortune/today-color' },
      ])} />
      <TodayColor lang="de" />
    </>
  );
}
