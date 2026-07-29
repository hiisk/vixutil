import type { Metadata } from 'next';
import SajuIntl from '@/components/fortune/SajuIntl';

export const metadata: Metadata = {
  title: "BaZi Chart Reader — Four Pillars From Your Birth Date",
  description: "Cast your BaZi four pillars from date and time of birth: heavenly stems, earthly branches, five-element balance, ten gods and luck pillars. Free, calculated in your browser.",
  alternates: {
    canonical: '/en/fortune/saju',
    languages: { 'en': '/en/fortune/saju', 'zh': '/zh/fortune/saju', 'ko': '/fortune/saju', 'x-default': '/en/fortune/saju' },
  },
};

export default function EnSajuPage() {
  return <SajuIntl lang="en" />;
}
