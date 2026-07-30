import type { Metadata } from 'next';
import FirstImpression from '@/components/snap/FirstImpression';

export const metadata: Metadata = {
  title: "First Impression Analyser — Which of Six Do You Read As",
  description: "Eye size, face proportion and mouth lift are measured from one photo to place you in one of six first impressions. Runs in your browser, nothing uploaded.",
  alternates: {
    canonical: '/en/snap/first-impression',
    languages: { 'en': '/en/snap/first-impression', 'ko': '/snap/first-impression', 'x-default': '/en/snap/first-impression' },
  },
};

export default function EnFirstImpressionPage() {
  return <FirstImpression lang="en" />;
}
