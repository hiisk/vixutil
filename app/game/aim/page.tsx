import type { Metadata } from 'next';
import GameShell from '@/components/GameShell';
import AimGame from '@/components/game/AimGame';

export const metadata: Metadata = {
  title: '표적 클릭 게임 - 마우스 정확도·에임 연습',
  description: '무작위 위치에 나타나는 과녁을 제한 시간 안에 최대한 많이 맞히세요. 명중 수와 놓친 클릭으로 정확도를 계산해 주므로 마우스 조작 연습에도 쓸 수 있습니다.',
  alternates: { canonical: '/game/aim' },
};

export default function Page() {
  return (
    <GameShell slug="aim">
      <AimGame />
    </GameShell>
  );
}
