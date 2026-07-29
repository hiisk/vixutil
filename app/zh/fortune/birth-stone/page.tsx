import type { Metadata } from 'next';
import BirthStone from '@/components/fortune/BirthStone';

export const metadata: Metadata = {
  title: '诞生石与诞生花 — 12个月份查询与含义',
  description: '按出生月份查询诞生石与诞生花：从一月石榴石到十二月绿松石，附各自的传统寓意与花语。免费查询。',
  alternates: {
    canonical: '/zh/fortune/birth-stone',
    languages: { 'zh': '/zh/fortune/birth-stone', 'en': '/en/fortune/birth-stone', 'ko': '/fortune/birth-stone', 'x-default': '/en/fortune/birth-stone' },
  },
};

export default function ZhBirthStonePage() {
  return <BirthStone lang="zh" />;
}
