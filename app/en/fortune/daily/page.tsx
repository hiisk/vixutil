import type { Metadata } from 'next';
import DailyFortune from '@/components/fortune/DailyFortune';

export const metadata: Metadata = {
  title: 'Today’s Horoscope by Birth Date — Free Daily Reading',
  description: 'Enter your date of birth for today’s free reading: overall, love, money, work and health, plus a lucky colour, number, direction and item. Updated daily.',
  alternates: {
    canonical: '/en/fortune/daily',
    languages: { 'en': '/en/fortune/daily', 'ko': '/fortune/daily', 'x-default': '/en/fortune/daily' },
  },
};

export default function EnDailyFortunePage() {
  return <DailyFortune lang="en" />;
}
