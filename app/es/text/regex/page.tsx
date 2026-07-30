import type { Metadata } from 'next';
import RegexHubPage from '@/components/regex/RegexHubPage';
import { hubMetadata } from '@/lib/regex/route';

export const metadata: Metadata = hubMetadata('es');

export default function RegexHub() {
  return <RegexHubPage lang="es" />;
}
