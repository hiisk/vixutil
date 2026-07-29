import type { Metadata } from 'next';
import PersonalColor from '@/components/snap/PersonalColor';

export const metadata: Metadata = {
  title: "个人色彩分析 — 找出你的四季型",
  description: "在浏览器内取样脸颊肤色并做白平衡校正，判定你属于十二种四季型中的哪一种，并根据实测生成专属色板。",
  alternates: {
    canonical: '/zh/snap/personal-color',
    languages: { 'en': '/en/snap/personal-color', 'zh': '/zh/snap/personal-color', 'ko': '/snap/personal-color', 'x-default': '/en/snap/personal-color' },
  },
};

export default function ZhPersonalColorPage() {
  return <PersonalColor lang="zh" />;
}
