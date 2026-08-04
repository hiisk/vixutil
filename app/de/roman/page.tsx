import type { Metadata } from 'next';
import RomanHubPage from '@/components/roman/RomanHubPage';
import { hubMetadata } from '@/lib/roman/route';

export const metadata: Metadata = hubMetadata('de');

export default function RomanHub() {
  return <RomanHubPage lang="de" />;
}
