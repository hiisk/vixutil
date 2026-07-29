import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';

export const metadata: Metadata = {
  title: 'Typing Speed Test — Measure WPM and Accuracy Free',
  description: 'Type the sentence you are given to measure words per minute and accuracy. Mistakes are marked as you go, and the sentence changes each round so you cannot memorise your way through it.',
  alternates: {
    canonical: '/en/game/typing',
    languages: { 'en': '/en/game/typing', 'zh': '/zh/game/typing', 'ko': '/game/typing', 'x-default': '/en/game/typing' },
  },
};

export default function EnGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="en">
      <TypingGame lang="en" />
    </GameShellIntl>
  );
}
