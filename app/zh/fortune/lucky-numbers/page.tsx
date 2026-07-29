import type { Metadata } from 'next';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';

export const metadata: Metadata = {
  title: '今日幸运数字 — 由出生日期生成的 6 个数字',
  description: '根据出生日期与当天日期，从 1~45 中生成 6 个幸运数字，并附幸运方位、幸运日与幸运时段。免费，仅供娱乐。',
  alternates: {
    canonical: '/zh/fortune/lucky-numbers',
    languages: { 'zh': '/zh/fortune/lucky-numbers', 'en': '/en/fortune/lucky-numbers', 'ko': '/fortune/lucky-lotto', 'x-default': '/en/fortune/lucky-numbers' },
  },
};

export default function ZhLuckyNumbersPage() {
  return <LuckyNumbers lang="zh" />;
}
