import type { Metadata } from 'next';
import Handwriting from '@/components/snap/Handwriting';

export const metadata: Metadata = {
  title: "Handwriting Analysis — Slant and Pressure From a Photo",
  description: "Photograph handwriting and measure the stroke slant with a structure tensor plus the pressure from stroke darkness. Runs in your browser; nothing is uploaded.",
  alternates: {
    canonical: '/en/snap/handwriting',
    languages: { 'en': '/en/snap/handwriting', 'zh': '/zh/snap/handwriting', 'ko': '/snap/handwriting', 'x-default': '/en/snap/handwriting' },
  },
};

export default function EnHandwritingPage() {
  return <Handwriting lang="en" />;
}
