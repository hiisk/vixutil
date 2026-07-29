import type { Metadata } from 'next';
import SmileScore from '@/components/snap/SmileScore';

export const metadata: Metadata = {
  title: 'Smile Score — Measure Your Smile From One Photo',
  description: 'Upload a photo and measure how far your mouth corners lift, how open the smile is and how balanced it looks. Runs entirely in your browser — nothing is uploaded.',
  alternates: {
    canonical: '/en/snap/smile-score',
    languages: { 'en': '/en/snap/smile-score', 'zh': '/zh/snap/smile-score', 'ko': '/snap/smile-score', 'x-default': '/en/snap/smile-score' },
  },
};

export default function EnSmileScorePage() {
  return <SmileScore lang="en" />;
}
