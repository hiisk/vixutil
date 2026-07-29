import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';

export const metadata: Metadata = {
  title: 'Click Speed Test — Measure Your CPS (Clicks Per Second)',
  description: 'Click as fast as you can for a set time to measure clicks per second. Choose 5, 10 or 30 seconds; on a phone, tapping is measured exactly the same way.',
  alternates: {
    canonical: '/en/game/cps',
    languages: { 'en': '/en/game/cps', 'zh': '/zh/game/cps', 'ko': '/game/cps', 'x-default': '/en/game/cps' },
  },
};

export default function EnGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="en">
      <CpsGame lang="en" />
    </GameShellIntl>
  );
}
