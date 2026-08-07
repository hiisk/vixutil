import type { Metadata } from 'next';
import DrinkHubPage from '@/components/drink/DrinkHubPage';
import { hubMetadata } from '@/lib/drink/route';

export const metadata: Metadata = hubMetadata('ja');

export default function DrinkHub() {
  return <DrinkHubPage lang="ja" />;
}
