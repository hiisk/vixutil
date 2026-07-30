import type { Metadata } from 'next';
import PropHubPage from '@/components/css/PropHubPage';
import { hubMetadata } from '@/lib/css/route';

export const metadata: Metadata = hubMetadata('pt');

export default function CssHub() {
  return <PropHubPage lang="pt" />;
}
