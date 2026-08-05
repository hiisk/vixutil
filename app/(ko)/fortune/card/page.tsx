import type { Metadata } from 'next';
import TarotHubPage from '@/components/tarot/TarotHubPage';
import { hubMetadata } from '@/lib/tarot/route';

export const metadata: Metadata = hubMetadata('ko');

export default function TarotHub() {
  return <TarotHubPage lang="ko" />;
}
