import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TodayColor from '@/components/fortune/TodayColor';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('en', 'today-color');

export default function EnTodayColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: fortuneHubCopy('en').title, path: '/en/fortune' },
        { name: fortuneToolCopy('en', 'today-color').title, path: '/en/fortune/today-color' },
      ])} />
      <TodayColor lang="en" />
    </>
  );
}
