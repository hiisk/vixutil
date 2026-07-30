import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: 'Chinese Zodiac Compatibility — All 12 Animal Pairings',
  description: 'Check Chinese zodiac compatibility for any two animals using the traditional Six Harmonies, Three Harmonies and clash relationships, with a score and advice.',
  alternates: {
    canonical: '/en/fortune/zodiac-match',
    languages: { 'en': '/en/fortune/zodiac-match', 'ko': '/fortune/zodiac-match', 'x-default': '/en/fortune/zodiac-match' },
  },
};

export default function EnZodiacMatchPage() {
  return <MatchFortune kind="zodiac" lang="en" />;
}
