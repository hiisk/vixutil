import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('hi', 'blood-type');

export default function HiBloodTypePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: fortuneHubCopy('hi').title, path: '/hi/fortune' },
        { name: fortuneToolCopy('hi', 'blood-type').title, path: '/hi/fortune/blood-type' },
      ])} />
      <SubjectFortune kind="blood" lang="hi" />
    </>
  );
}
