import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: 'Blood Type Compatibility — A, B, O and AB Pairings',
  description: 'Check blood type compatibility for any two of A, B, O and AB, with a score, what drives the pairing, how it plays out in a relationship and advice.',
  alternates: {
    canonical: '/en/fortune/blood-match',
    languages: { 'en': '/en/fortune/blood-match', 'ko': '/fortune/blood-match', 'x-default': '/en/fortune/blood-match' },
  },
};

export default function EnBloodMatchPage() {
  return <MatchFortune kind="blood" lang="en" />;
}
