import type { Metadata } from 'next';
import DreamIntl from '@/components/fortune/DreamIntl';

export const metadata: Metadata = {
  title: "周公解梦 — 20个常见梦境意象解析",
  description: "坠落、掉牙、飞翔、被追赶等 20 个常见梦境意象在传统上被怎么解读，以及它们常出现在什么处境。",
  alternates: {
    canonical: '/zh/fortune/dream',
    languages: { 'en': '/en/fortune/dream', 'zh': '/zh/fortune/dream', 'ko': '/fortune/dream', 'x-default': '/en/fortune/dream' },
  },
};

export default function ZhDreamPage() {
  return <DreamIntl lang="zh" />;
}
