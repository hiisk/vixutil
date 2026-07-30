import type { Metadata } from 'next';
import Biorhythm from '@/components/fortune/Biorhythm';

export const metadata: Metadata = {
  title: 'Biorhythm Calculator — Physical, Emotional & Intellectual',
  description: 'Free biorhythm calculator: enter your date of birth to chart your 23-day physical, 28-day emotional and 33-day intellectual cycles, with critical days marked.',
  alternates: {
    canonical: '/en/fortune/biorhythm',
    languages: { 'en': '/en/fortune/biorhythm', 'ko': '/fortune/biorhythm', 'x-default': '/en/fortune/biorhythm' },
  },
};

export default function EnBiorhythmPage() {
  return <Biorhythm lang="en" />;
}
