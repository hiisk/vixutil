import type { Metadata } from 'next';
import AsciiHubPage from '@/components/ascii/AsciiHubPage';
import { hubMetadata } from '@/lib/ascii/route';

export const metadata: Metadata = hubMetadata('de');

export default function AsciiHub() {
  return <AsciiHubPage lang="de" />;
}
