import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Expression from '@/components/snap/Expression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('pt-br', 'expression');

export default function PtBrExpressionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: snapHubCopy('pt-br').title, path: '/pt-br/snap' },
        { name: snapToolCopy('pt-br', 'expression').title, path: '/pt-br/snap/expression' },
      ])} />
      <Expression lang="pt-br" />
    </>
  );
}
