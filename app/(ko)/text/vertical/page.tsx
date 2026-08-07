import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import VerticalTool from '@/components/text/VerticalTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "세로쓰기 변환 - 가로 글을 세로로 세우기",
  description: "가로로 쓴 글을 한 글자씩 세로로 세웁니다. 여러 줄을 넣으면 줄마다 한 세로줄이 되고, 오른쪽에서 왼쪽으로 읽는 전통 차례로도 낼 수 있습니다. 글자 수가 다른 줄이 있어도 세로 정렬이 어긋나지 않습니다.",
  alternates: {
    canonical: '/text/vertical',
    languages: alternateLanguages10('/text/vertical'),
  },
});

export default function Page() {
  return (
    <TextShell slug="vertical">
      <VerticalTool />
    </TextShell>
  );
}
