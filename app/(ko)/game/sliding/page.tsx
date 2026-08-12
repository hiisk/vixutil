import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import SlidingGame from '@/components/game/SlidingGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '슬라이딩 퍼즐 - 15 퍼즐을 3×3·4×4·5×5로 바로',
  description: '빈 칸으로 숫자를 밀어 왼쪽 위부터 차례대로 놓는 퍼즐입니다. 이 퍼즐은 늘어놓는 방법의 절반이 아무리 옮겨도 완성되지 않아서, 섞을 때마다 짝치환 개수로 풀 수 있는 판인지 먼저 셈해 봅니다. 그래서 여기서 나오는 판은 언제나 풀립니다.',
  alternates: {
    canonical: '/game/sliding',
    languages: alternateLanguages10('/game/sliding'),
  },
});

export default function Page() {
  return (
    <GameShell slug="sliding">
      <SlidingGame />
    </GameShell>
  );
}
