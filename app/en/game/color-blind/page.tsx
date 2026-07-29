import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';

export const metadata: Metadata = {
  title: 'Colour Discrimination Test — Spot the Subtle Difference',
  description: 'Among identical squares, exactly one is a different colour. Each level shrinks the difference until you can no longer tell — and that point is the limit of your colour discrimination.',
  alternates: {
    canonical: '/en/game/color-blind',
    languages: { 'en': '/en/game/color-blind', 'zh': '/zh/game/color-blind', 'ko': '/game/color-blind', 'x-default': '/en/game/color-blind' },
  },
};

export default function EnGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="en">
      <ColorBlindGame lang="en" />
    </GameShellIntl>
  );
}
