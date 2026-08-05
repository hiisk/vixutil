import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Expression from '@/components/snap/Expression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('de', 'expression');

export default function DeExpressionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: snapHubCopy('de').title, path: '/de/snap' },
        { name: snapToolCopy('de', 'expression').title, path: '/de/snap/expression' },
      ])} />
      <Expression lang="de" />
    </>
  );
}
