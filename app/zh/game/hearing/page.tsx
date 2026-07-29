import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';

export const metadata: Metadata = {
  title: '在线听力测试 — 你能听到多少 Hz',
  description: '一级一级往上调频率，找出你听不到的那一点。人的听觉上限随年龄下降，所以能听到的频率大致能反映耳朵的「年龄」。',
  alternates: {
    canonical: '/zh/game/hearing',
    languages: { 'en': '/en/game/hearing', 'zh': '/zh/game/hearing', 'ko': '/game/hearing', 'x-default': '/en/game/hearing' },
  },
};

export default function ZhGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="zh">
      <HearingGame lang="zh" />
    </GameShellIntl>
  );
}
