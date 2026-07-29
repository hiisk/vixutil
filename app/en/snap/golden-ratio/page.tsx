import type { Metadata } from 'next';
import GoldenRatio from '@/components/snap/GoldenRatio';

export const metadata: Metadata = {
  title: 'Golden Ratio Face Test — How Close to φ 1.618',
  description: 'Measure four facial proportions against the golden ratio from one photo. Real landmark coordinates, calculated in your browser — nothing is uploaded.',
  alternates: {
    canonical: '/en/snap/golden-ratio',
    languages: { 'en': '/en/snap/golden-ratio', 'zh': '/zh/snap/golden-ratio', 'ko': '/snap/golden-ratio', 'x-default': '/en/snap/golden-ratio' },
  },
};

export default function EnGoldenRatioPage() {
  return <GoldenRatio lang="en" />;
}
