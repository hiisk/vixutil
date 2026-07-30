import type { Metadata } from 'next';
import BirthStone from '@/components/fortune/BirthStone';

export const metadata: Metadata = {
  title: 'Birthstone & Birth Flower by Month — Meanings',
  description: 'Find your birthstone and birth flower by birth month, from garnet in January to turquoise in December, with what each one traditionally stands for.',
  alternates: {
    canonical: '/en/fortune/birth-stone',
    languages: { 'en': '/en/fortune/birth-stone', 'ko': '/fortune/birth-stone', 'x-default': '/en/fortune/birth-stone' },
  },
};

export default function EnBirthStonePage() {
  return <BirthStone lang="en" />;
}
