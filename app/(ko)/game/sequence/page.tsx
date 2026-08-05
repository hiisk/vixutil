import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import SequenceGame from '@/components/game/SequenceGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '패턴 기억 게임 - 격자 위치 기억력 측정',
  description: '격자에서 몇 칸이 잠깐 켜졌다가 꺼집니다. 어디였는지 기억해 그 칸들을 누르세요. 단계가 오를수록 켜지는 칸이 늘고 격자도 넓어집니다.',
  alternates: {
    canonical: '/game/sequence',
    languages: alternateLanguages10('/game/sequence'),
  },
});

export default function Page() {
  return (
    <GameShell slug="sequence">
      <SequenceGame />
    </GameShell>
  );
}
