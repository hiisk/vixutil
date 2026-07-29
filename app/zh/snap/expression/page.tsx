import type { Metadata } from 'next';
import Expression from '@/components/snap/Expression';

export const metadata: Metadata = {
  title: "表情分析 — 一张照片读出七种情绪",
  description: "训练好的神经网络会在你的浏览器内推断七种情绪的概率。真实的模型输出，照片不会上传到服务器。",
  alternates: {
    canonical: '/zh/snap/expression',
    languages: { 'en': '/en/snap/expression', 'zh': '/zh/snap/expression', 'ko': '/snap/expression', 'x-default': '/en/snap/expression' },
  },
};

export default function ZhExpressionPage() {
  return <Expression lang="zh" />;
}
