import type { Metadata } from 'next';
import TarotIntl from '@/components/fortune/TarotIntl';

export const metadata: Metadata = {
  title: "今日塔罗 — 每日一张，免费",
  description: "从 22 张大阿尔卡纳中抽出今日塔罗。依当天日期选出，一整天都一样。免费，附正位与逆位解读。",
  alternates: {
    canonical: '/zh/fortune/daily-tarot',
    languages: { 'en': '/en/fortune/daily-tarot', 'zh': '/zh/fortune/daily-tarot', 'ko': '/fortune/daily-tarot', 'x-default': '/en/fortune/daily-tarot' },
  },
};

export default function ZhDailyTarotPage() {
  return <TarotIntl mode="daily" lang="zh" />;
}
