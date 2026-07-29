import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: 'Blood Type Horoscope — A, B, O and AB Today',
  description: 'Today’s free blood type horoscope for A, B, O and AB — love, money, work and health, plus a lucky colour, number and item. Updated daily.',
  alternates: {
    canonical: '/en/fortune/blood-type',
    languages: { 'en': '/en/fortune/blood-type', 'ko': '/fortune/blood-type', 'zh': '/zh/fortune/blood-type', 'x-default': '/en/fortune/blood-type' },
  },
};

export default function EnBloodTypePage() {
  return <SubjectFortune kind="blood" lang="en" />;
}
