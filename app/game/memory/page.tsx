import type { Metadata } from 'next';
import GameShell from '@/components/GameShell';
import MemoryGame from '@/components/game/MemoryGame';

export const metadata: Metadata = {
  title: '순서 기억 게임 - 색 순서 따라하기로 기억력 측정',
  description: '색깔 단추가 하나씩 켜지는 순서를 기억했다가 그대로 눌러야 합니다. 맞힐 때마다 순서가 한 칸씩 길어지므로, 몇 단계까지 갔는지가 곧 단기 기억력 점수가 됩니다.',
  alternates: {
    canonical: '/game/memory',
    languages: { 'ko': '/game/memory', 'en': '/en/game/memory', 'zh': '/zh/game/memory', 'x-default': '/en/game/memory' },
  },
};

export default function Page() {
  return (
    <GameShell slug="memory">
      <MemoryGame />
    </GameShell>
  );
}
