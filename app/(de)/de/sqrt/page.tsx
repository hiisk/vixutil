import type { Metadata } from 'next';
import SqrtHubPage from '@/components/sqrt/SqrtHubPage';
import { hubMetadata } from '@/lib/sqrt/route';

export const metadata: Metadata = hubMetadata('de');

export default function SqrtHub() {
  return <SqrtHubPage lang="de" />;
}
