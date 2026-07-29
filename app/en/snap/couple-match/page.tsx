import type { Metadata } from 'next';
import CoupleMatch from '@/components/snap/CoupleMatch';

export const metadata: Metadata = {
  title: "Couple Face Match — Compare Two Photos",
  description: "Upload two photos and compare six measured facial proportions to get a similarity score. Both photos are analysed in your browser and never uploaded.",
  alternates: {
    canonical: '/en/snap/couple-match',
    languages: { 'en': '/en/snap/couple-match', 'zh': '/zh/snap/couple-match', 'ko': '/snap/couple-match', 'x-default': '/en/snap/couple-match' },
  },
};

export default function EnCoupleMatchPage() {
  return <CoupleMatch lang="en" />;
}
