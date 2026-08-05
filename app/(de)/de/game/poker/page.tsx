import type { Metadata } from 'next';
import PokerHubPage from '@/components/poker/PokerHubPage';
import { hubMetadata } from '@/lib/poker/route';

export const metadata: Metadata = hubMetadata('de');

export default function PokerHub() {
  return <PokerHubPage lang="de" />;
}
