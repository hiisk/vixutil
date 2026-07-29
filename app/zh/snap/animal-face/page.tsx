import type { Metadata } from 'next';
import AnimalFace from '@/components/snap/AnimalFace';

export const metadata: Metadata = {
  title: "动物脸测试 — 你最像十二种动物中的哪一种",
  description: "从照片实测四项五官比例，与十二种动物基准向量做匹配。全部在浏览器内完成，照片不会上传。",
  alternates: {
    canonical: '/zh/snap/animal-face',
    languages: { 'en': '/en/snap/animal-face', 'zh': '/zh/snap/animal-face', 'ko': '/snap/animal-face', 'x-default': '/en/snap/animal-face' },
  },
};

export default function ZhAnimalFacePage() {
  return <AnimalFace lang="zh" />;
}
