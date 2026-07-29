import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';

export const metadata: Metadata = {
  title: 'Hearing Test Online — How Many Hz Can You Hear',
  description: 'Steps the frequency up bit by bit to find where you stop hearing it. The upper limit of human hearing drops with age, so the frequency you reach gives a rough sense of your ear age.',
  alternates: {
    canonical: '/en/game/hearing',
    languages: { 'en': '/en/game/hearing', 'zh': '/zh/game/hearing', 'ko': '/game/hearing', 'x-default': '/en/game/hearing' },
  },
};

export default function EnGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="en">
      <HearingGame lang="en" />
    </GameShellIntl>
  );
}
