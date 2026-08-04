import type { Metadata } from 'next';
import PaceHubPage from '@/components/pace/PaceHubPage';
import { hubMetadata } from '@/lib/pace/route';

export const metadata: Metadata = hubMetadata('tw');

export default function PaceHub() {
  return <PaceHubPage lang="tw" />;
}
