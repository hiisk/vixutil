import type { Metadata } from 'next';
import InsulHubPage from '@/components/insul/InsulHubPage';
import { hubMetadata } from '@/lib/insul/route';

export const metadata: Metadata = hubMetadata('tw');

export default function InsulHub() {
  return <InsulHubPage lang="tw" />;
}
