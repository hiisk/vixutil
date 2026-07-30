import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import LoremTool from '@/components/text/LoremTool';

export const metadata: Metadata = {
  title: '더미 텍스트 생성 - 한글 로렘입숨',
  description: '디자인 시안이나 화면을 만들 때 채워 넣을 예시 문장을 만듭니다. 영문 로렘입숨은 한글 화면에서 줄 길이와 글자 밀도가 실제와 달라 보이므로, 한글 문장으로도 만들 수 있게 했습니다.',
  alternates: {
    canonical: '/text/lorem',
    languages: alternateLanguages('/text/lorem'),
  },
};

export default function Page() {
  return (
    <TextShell slug="lorem">
      <LoremTool />
    </TextShell>
  );
}
