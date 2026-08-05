import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import LivedTool from '@/components/time/LivedTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '살아온 시간 - 태어나서 지금까지 일·시간·초',
  description: '생년월일을 넣으면 지금까지 몇 년 몇 개월 며칠인지, 그리고 그것이 몇 시간·몇 분·몇 초인지 보여줍니다. 10000일처럼 기념할 만한 날이 언제인지도 함께 알려줍니다.',
  alternates: {
    canonical: '/time/lived',
    languages: alternateLanguages10('/time/lived'),
  },
});

export default function Page() {
  return (
    <TimeShell slug="lived">
      <LivedTool />
    </TimeShell>
  );
}
