import type { Metadata } from 'next';
import CidrHubPage from '@/components/cidr/CidrHubPage';
import { hubMetadata } from '@/lib/cidr/route';

export const metadata: Metadata = hubMetadata('de');

export default function CidrHub() {
  return <CidrHubPage lang="de" />;
}
