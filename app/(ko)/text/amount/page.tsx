import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import AmountTool from '@/components/text/AmountTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '한글 금액 변환 - 숫자를 일금 삼백만원정으로',
  description: '3500000을 "일금 삼백오십만원정"으로 바꿉니다. 계약서·영수증·경조사 봉투에 쓰는 정식 표기와 읽기 편한 간략 표기를 함께 보여주고, 억·만 단위로 끊어 읽는 형태도 알려줍니다.',
  alternates: { canonical: '/text/amount' },
});

export default function Page() {
  return (
    <TextShell slug="amount">
      <AmountTool />
    </TextShell>
  );
}
