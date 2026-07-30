import type { Metadata } from 'next';
import MetroHub from '@/components/MetroHub';
import { metroAlternates } from '@/lib/metro/ui';

export const metadata: Metadata = {
  title: 'Metro Station Name Quiz — Seoul, Tokyo, London, New York',
  description: 'Name the stations on Seoul Lines 1–9, the Tokyo Yamanote Line, the London Victoria line, the New York 7 train and more. The map pans towards the next station as a hint.',
  alternates: { canonical: '/en/metro', languages: metroAlternates() },
};

export default function MetroHubPageEN() {
  return <MetroHub lang="en" />;
}
