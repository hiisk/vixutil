import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: 'MBTI Compatibility — Match Any Two of the 16 Types',
  description: 'Check MBTI compatibility between any two of the 16 types. See how the E/I, N/S, T/F and J/P axes line up, with a score and practical advice.',
  alternates: {
    canonical: '/en/fortune/mbti-match',
    languages: { 'en': '/en/fortune/mbti-match', 'ko': '/fortune/mbti-match', 'x-default': '/en/fortune/mbti-match' },
  },
};

export default function EnMbtiMatchPage() {
  return <MatchFortune kind="mbti" lang="en" />;
}
