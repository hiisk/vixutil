import type { Metadata } from 'next';
import PersonalColor from '@/components/snap/PersonalColor';

export const metadata: Metadata = {
  title: "Personal Colour Analysis — Find Your Seasonal Type",
  description: "Your cheek tone is sampled and white-balanced in your browser to place you in one of twelve seasonal colour types, with a palette generated from your own measurements.",
  alternates: {
    canonical: '/en/snap/personal-color',
    languages: { 'en': '/en/snap/personal-color', 'zh': '/zh/snap/personal-color', 'ko': '/snap/personal-color', 'x-default': '/en/snap/personal-color' },
  },
};

export default function EnPersonalColorPage() {
  return <PersonalColor lang="en" />;
}
