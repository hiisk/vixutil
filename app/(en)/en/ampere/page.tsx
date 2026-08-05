import type { Metadata } from 'next';
import AmpereHubPage from '@/components/ampere/AmpereHubPage';
import { hubMetadata } from '@/lib/ampere/route';

export const metadata: Metadata = hubMetadata('en');

export default function AmpereHub() {
  return <AmpereHubPage lang="en" />;
}
