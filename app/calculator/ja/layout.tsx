import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: '生活計算機まとめ', template: '%s | 生活計算機まとめ' },
  description:
    '給与・税金・金融・不動産など日常生活に役立つ計算機をまとめたサイト — 2026年韓国基準',
  alternates: {
    canonical: '/calculator/ja',
    // ko는 뺐다. /calculator는 자기 영어판으로 /en/calculator를 지목하므로
    // 여기서 /calculator를 가리키면 돌아오지 않는 한쪽 선언이 되고, 구글은 그걸 무시한다.
    languages: { 'en': '/calculator/en', 'ja': '/calculator/ja', 'x-default': '/calculator/en' },
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
