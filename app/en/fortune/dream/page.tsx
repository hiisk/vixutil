import type { Metadata } from 'next';
import DreamIntl from '@/components/fortune/DreamIntl';

export const metadata: Metadata = {
  title: "Dream Dictionary — 20 Common Dream Symbols Explained",
  description: "What falling, losing teeth, flying, being chased and 16 other common dream symbols are traditionally read as, and which situations they tend to be reported in.",
  alternates: {
    canonical: '/en/fortune/dream',
    languages: { 'en': '/en/fortune/dream', 'ko': '/fortune/dream', 'x-default': '/en/fortune/dream' },
  },
};

export default function EnDreamPage() {
  return <DreamIntl lang="en" />;
}
