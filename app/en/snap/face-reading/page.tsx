import type { Metadata } from 'next';
import FaceReading from '@/components/snap/FaceReading';

export const metadata: Metadata = {
  title: "Face Reading — Seven Features Read in the Traditional Style",
  description: "Seven facial proportions are measured from your photo and read in the traditional physiognomy style. Real measurements, entertainment interpretation, nothing uploaded.",
  alternates: {
    canonical: '/en/snap/face-reading',
    languages: { 'en': '/en/snap/face-reading', 'ko': '/snap/face-reading', 'x-default': '/en/snap/face-reading' },
  },
};

export default function EnFaceReadingPage() {
  return <FaceReading lang="en" />;
}
