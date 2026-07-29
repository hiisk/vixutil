import type { Metadata } from 'next';
import PhotoMood from '@/components/snap/PhotoMood';

export const metadata: Metadata = {
  title: "Photo Mood Analyser — Read Any Photo's Colour Mood",
  description: "Upload any photo and measure its brightness, saturation, warmth and contrast from the pixels, with the dominant colour palette. No face needed, nothing uploaded.",
  alternates: {
    canonical: '/en/snap/photo-mood',
    languages: { 'en': '/en/snap/photo-mood', 'zh': '/zh/snap/photo-mood', 'ko': '/snap/photo-mood', 'x-default': '/en/snap/photo-mood' },
  },
};

export default function EnPhotoMoodPage() {
  return <PhotoMood lang="en" />;
}
