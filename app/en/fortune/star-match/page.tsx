import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: 'Star Sign Compatibility — All 12 Zodiac Pairings',
  description: 'Check star sign compatibility for any two signs based on their elements — fire, earth, air and water — with a score, what it means and advice.',
  alternates: {
    canonical: '/en/fortune/star-match',
    languages: { 'en': '/en/fortune/star-match', 'ko': '/fortune/star-match', 'zh': '/zh/fortune/star-match', 'x-default': '/en/fortune/star-match' },
  },
};

export default function EnStarMatchPage() {
  return <MatchFortune kind="star" lang="en" />;
}
