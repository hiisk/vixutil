import type { Metadata } from 'next';
import TarotIntl from '@/components/fortune/TarotIntl';

export const metadata: Metadata = {
  title: "Today’s Tarot Card — One Card, Free, Daily",
  description: "Draw today's tarot card from the 22 major arcana. Chosen from the date, so it stays the same all day. Free, with upright and reversed readings.",
  alternates: {
    canonical: '/en/fortune/daily-tarot',
    languages: { 'en': '/en/fortune/daily-tarot', 'ko': '/fortune/daily-tarot', 'x-default': '/en/fortune/daily-tarot' },
  },
};

export default function EnDailyTarotPage() {
  return <TarotIntl mode="daily" lang="en" />;
}
