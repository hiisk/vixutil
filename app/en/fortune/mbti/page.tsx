import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: 'MBTI Daily Horoscope — All 16 Personality Types',
  description: 'Today’s free horoscope for all 16 MBTI types: love, money, work and health, plus a lucky colour, number and item. Updated every day.',
  alternates: {
    canonical: '/en/fortune/mbti',
    languages: { 'en': '/en/fortune/mbti', 'ko': '/fortune/mbti', 'x-default': '/en/fortune/mbti' },
  },
};

export default function EnMbtiFortunePage() {
  return <SubjectFortune kind="mbti" lang="en" />;
}
