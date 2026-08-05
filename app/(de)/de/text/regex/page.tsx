import type { Metadata } from 'next';
import RegexHubPage from '@/components/regex/RegexHubPage';
import { hubMetadata } from '@/lib/regex/route';

export const metadata: Metadata = hubMetadata('de');

export default function RegexHub() {
  return <RegexHubPage lang="de" />;
}
