import type { Metadata } from 'next';
import NumberHubPage from '@/components/number/NumberHubPage';
import { hubMetadata } from '@/lib/number/route';

export const metadata: Metadata = hubMetadata('tw');

export default function NumberHub() {
  return <NumberHubPage lang="tw" />;
}
