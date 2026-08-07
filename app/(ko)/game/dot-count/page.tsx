import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import DotCountGame from '@/components/game/DotCountGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "개수 어림 테스트 - 순간적으로 개수를 가늠하는 능력",
  description: "점이 잠깐 나타났다 사라집니다. 몇 개였는지 세지 말고 어림해 보세요. 단계가 오르면 점이 늘고 보이는 시간은 줄어들어, 결국 하나씩 셀 수 없는 지점이 옵니다. 오차를 정답 대비 비율로 재기 때문에 뒷단계가 후해지지 않습니다.",
  alternates: {
    canonical: '/game/dot-count',
    languages: alternateLanguages10('/game/dot-count'),
  },
});

export default function Page() {
  return (
    <GameShell slug="dot-count">
      <DotCountGame />
    </GameShell>
  );
}
