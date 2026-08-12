import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import SudokuGame from '@/components/game/SudokuGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '스도쿠 - 답이 하나뿐인 문제를 난이도별로',
  description: '가로줄·세로줄·3×3 상자마다 1부터 9까지 한 번씩 들어가게 채웁니다. 문제는 완성판에서 한 칸씩 지우면서 그때마다 답이 하나로 남는지 확인해 만들기 때문에, 어느 판이든 답이 정확히 하나입니다. 난이도는 빈칸 수가 아니라 푸는 데 필요한 기법으로 갈립니다.',
  alternates: {
    canonical: '/game/sudoku',
    languages: alternateLanguages10('/game/sudoku'),
  },
});

export default function Page() {
  return (
    <GameShell slug="sudoku">
      <SudokuGame />
    </GameShell>
  );
}
