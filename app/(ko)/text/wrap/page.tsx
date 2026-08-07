import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import WrapTool from '@/components/text/WrapTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "줄바꿈 정리 - 폭 맞춰 접기, 끊긴 줄 이어 붙이기",
  description: "PDF나 메일에서 복사한 글은 문단 중간에서 줄이 끊겨 있습니다. 끊긴 줄을 이어 문단으로 되돌리거나, 반대로 정해진 글자 수에 맞춰 접습니다. 낱말 중간에서 자르지 않게 할 수 있습니다.",
  alternates: {
    canonical: '/text/wrap',
    languages: alternateLanguages10('/text/wrap'),
  },
});

export default function Page() {
  return (
    <TextShell slug="wrap">
      <WrapTool />
    </TextShell>
  );
}
