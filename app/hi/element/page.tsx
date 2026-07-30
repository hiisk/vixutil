import type { Metadata } from 'next';
import ElementHubPage from '@/components/element/ElementHubPage';
import { hubMetadata } from '@/lib/element/route';

export const metadata: Metadata = hubMetadata('hi');

export default function ElementHub() {
  return <ElementHubPage lang="hi" />;
}
