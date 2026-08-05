import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import CpsGame from '@/components/game/CpsGame';

export const metadata: Metadata = {
  title: '클릭 속도 테스트 - 초당 클릭 수(CPS) 측정',
  description: '정해진 시간 동안 최대한 빠르게 클릭해 초당 클릭 수(CPS)를 잽니다. 5초·10초·30초 중에 고를 수 있고, 휴대폰에서는 터치로도 같은 방식으로 측정됩니다.',
  alternates: {
    canonical: '/game/cps',
    languages: alternateLanguages10('/game/cps'),
  },
};

export default function Page() {
  return (
    <GameShell slug="cps">
      <CpsGame />
    </GameShell>
  );
}
