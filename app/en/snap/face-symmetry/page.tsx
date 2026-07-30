import type { Metadata } from 'next';
import FaceSymmetry from '@/components/snap/FaceSymmetry';

export const metadata: Metadata = {
  title: 'Face Symmetry Test — Left vs Right, Feature by Feature',
  description: 'Measure the left–right balance of your eyes, eyebrows, mouth and jawline from a single photo. Runs in your browser; nothing is uploaded to a server.',
  alternates: {
    canonical: '/en/snap/face-symmetry',
    languages: { 'en': '/en/snap/face-symmetry', 'ko': '/snap/face-symmetry', 'x-default': '/en/snap/face-symmetry' },
  },
};

export default function EnFaceSymmetryPage() {
  return <FaceSymmetry lang="en" />;
}
