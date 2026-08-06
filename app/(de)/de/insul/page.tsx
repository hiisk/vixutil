import type { Metadata } from 'next';
import InsulHubPage from '@/components/insul/InsulHubPage';
import { hubMetadata } from '@/lib/insul/route';

export const metadata: Metadata = hubMetadata('de');

export default function InsulHub() {
  return <InsulHubPage lang="de" />;
}
