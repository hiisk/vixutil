import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import NBackGame from '@/components/game/NBackGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "엔백 테스트 - 작업기억을 재는 N-back 과제",
  description: "칸에 불이 하나씩 들어옵니다. 지금 것이 n칸 앞과 같은 자리면 누르세요. 방금 것을 기억하면서 계속 갱신해야 해서 작업기억을 재는 데 널리 쓰입니다. 잘못 누른 것을 점수에서 빼기 때문에 전부 누르는 것으로는 점수가 안 나옵니다.",
  alternates: {
    canonical: '/game/nback',
    languages: alternateLanguages10('/game/nback'),
  },
});

export default function Page() {
  return (
    <GameShell slug="nback">
      <NBackGame />
    </GameShell>
  );
}
