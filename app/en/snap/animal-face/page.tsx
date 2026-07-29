import type { Metadata } from 'next';
import AnimalFace from '@/components/snap/AnimalFace';

export const metadata: Metadata = {
  title: "Animal Face Test — Which of 12 Animals Do You Match",
  description: "Four facial ratios are measured from your photo and matched against twelve animal archetypes. Runs in your browser; nothing is uploaded.",
  alternates: {
    canonical: '/en/snap/animal-face',
    languages: { 'en': '/en/snap/animal-face', 'zh': '/zh/snap/animal-face', 'ko': '/snap/animal-face', 'x-default': '/en/snap/animal-face' },
  },
};

export default function EnAnimalFacePage() {
  return <AnimalFace lang="en" />;
}
