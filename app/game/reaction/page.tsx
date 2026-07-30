import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import ReactionGame from '@/components/game/ReactionGame';

export const metadata: Metadata = {
  title: '반응속도 테스트 - 내 반응 시간 밀리초로 측정',
  description: '화면이 초록으로 바뀌는 순간 누르세요. 다섯 번을 재서 평균과 최고 기록을 밀리초로 알려주고, 사람의 평균 반응속도와 견줘 어느 정도인지 보여줍니다.',
  alternates: {
    canonical: '/game/reaction',
    languages: alternateLanguages('/game/reaction'),
  },
};

export default function Page() {
  return (
    <GameShell slug="reaction">
      <ReactionGame />
    </GameShell>
  );
}
