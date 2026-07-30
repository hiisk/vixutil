import type { Metadata } from 'next';
import TarotSpreadIntl from '@/components/fortune/TarotSpreadIntl';

export const metadata: Metadata = {
  title: 'Tarot Reading Online — Free 78-Card Spreads',
  description: 'Draw a free tarot reading from the full 78-card deck: one card, past-present-future, a relationship spread or the full Celtic cross. Upright and reversed meanings for every card.',
  alternates: {
    canonical: '/en/fortune/tarot',
    languages: { 'en': '/en/fortune/tarot', 'zh': '/zh/fortune/tarot', 'ko': '/fortune/tarot', 'x-default': '/en/fortune/tarot' },
  },
};

export default function EnTarotSpreadPage() {
  return <TarotSpreadIntl lang="en" />;
}
