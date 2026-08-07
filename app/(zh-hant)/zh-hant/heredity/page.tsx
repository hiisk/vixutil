import type { Metadata } from 'next';
import HeredityHubPage from '@/components/heredity/HeredityHubPage';
import { hubMetadata } from '@/lib/heredity/route';

export const metadata: Metadata = hubMetadata('tw');

export default function HeredityHub() {
  return <HeredityHubPage lang="tw" />;
}
