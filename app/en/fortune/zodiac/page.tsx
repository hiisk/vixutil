import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: 'Daily Horoscope — All 12 Star Signs, Free',
  description: 'Read today’s free horoscope for all 12 star signs: love, money, work and health, with a lucky colour, number and item. Updated every day.',
  alternates: {
    canonical: '/en/fortune/zodiac',
    languages: { 'en': '/en/fortune/zodiac', 'ko': '/fortune/zodiac', 'x-default': '/en/fortune/zodiac' },
  },
};

export default function EnZodiacPage() {
  return <SubjectFortune kind="zodiac" lang="en" />;
}
