import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: 'Chinese Zodiac Horoscope — Today’s Reading for All 12 Animals',
  description: 'Today’s free Chinese zodiac horoscope for Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig — love, money, work and health.',
  alternates: {
    canonical: '/en/fortune/animal',
    languages: { 'en': '/en/fortune/animal', 'ko': '/fortune/animal', 'x-default': '/en/fortune/animal' },
  },
};

export default function EnAnimalPage() {
  return <SubjectFortune kind="animal" lang="en" />;
}
