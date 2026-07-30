import type { Metadata } from 'next';
import ElementHubPage from '@/components/element/ElementHubPage';
import { hubMetadata } from '@/lib/element/route';

export const metadata: Metadata = hubMetadata('ja');

export default function ElementHub() {
  return <ElementHubPage lang="ja" />;
}
