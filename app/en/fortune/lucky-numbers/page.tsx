import type { Metadata } from 'next';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';

export const metadata: Metadata = {
  title: 'Today’s Lucky Numbers — Six Numbers From Your Birth Date',
  description: 'Get six lucky numbers from 1–45 generated from your date of birth and today’s date, plus a lucky direction, day and time. Free and for fun.',
  alternates: {
    canonical: '/en/fortune/lucky-numbers',
    languages: { 'en': '/en/fortune/lucky-numbers', 'ko': '/fortune/lucky-lotto', 'zh': '/zh/fortune/lucky-numbers', 'x-default': '/en/fortune/lucky-numbers' },
  },
};

export default function EnLuckyNumbersPage() {
  return <LuckyNumbers lang="en" />;
}
