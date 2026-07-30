import type { Metadata } from 'next';
import MetroHub from '@/components/MetroHub';
import { metroAlternates } from '@/lib/metro/ui';

export const metadata: Metadata = {
  title: '地铁车站名挑战 — 首尔、东京、伦敦、纽约',
  description: '从首尔1至9号线、东京山手线、伦敦Victoria线、纽约7号线等线路中任选一条，说出它的车站名。线路图会朝下一站移动作为提示。',
  alternates: { canonical: '/zh/metro', languages: metroAlternates() },
};

export default function MetroHubPageZH() {
  return <MetroHub lang="zh" />;
}
