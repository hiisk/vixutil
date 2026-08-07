import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import ReverseTool from '@/components/text/ReverseTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "글자 뒤집기 - 글자·낱말·줄 단위로 거꾸로",
  description: "글을 거꾸로 뒤집습니다. 글자 단위, 낱말 단위, 줄 단위 중에서 고를 수 있습니다. 이모지가 쪼개져 깨지지 않도록 코드포인트 단위로 처리합니다.",
  alternates: {
    canonical: '/text/reverse',
    languages: alternateLanguages10('/text/reverse'),
  },
});

export default function Page() {
  return (
    <TextShell slug="reverse">
      <ReverseTool />
    </TextShell>
  );
}
