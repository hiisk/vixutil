import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import InitialTool from '@/components/text/InitialTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '초성 변환기 - 초성 퀴즈 만들기',
  description: '"안녕하세요"를 "ㅇㄴㅎㅅㅇ"로 바꿔 초성 퀴즈나 힌트를 만듭니다. 띄어쓰기와 문장부호는 그대로 두거나 함께 지울 수 있어, 노래 제목·영화 제목 맞히기 문제를 몇 초 만에 만들 수 있습니다.',
  alternates: { canonical: '/text/initial' },
});

export default function Page() {
  return (
    <TextShell slug="initial">
      <InitialTool />
    </TextShell>
  );
}
