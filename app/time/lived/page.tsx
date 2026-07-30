import type { Metadata } from 'next';
import TimeShell from '@/components/TimeShell';
import LivedTool from '@/components/time/LivedTool';

export const metadata: Metadata = {
  title: '살아온 시간 - 태어나서 지금까지 일·시간·초',
  description: '생년월일을 넣으면 지금까지 몇 년 몇 개월 며칠인지, 그리고 그것이 몇 시간·몇 분·몇 초인지 보여줍니다. 10000일처럼 기념할 만한 날이 언제인지도 함께 알려줍니다.',
  alternates: {
    canonical: '/time/lived',
    languages: { 'ko': '/time/lived', 'en': '/en/time/lived', 'x-default': '/en/time/lived' },
  },
};

export default function Page() {
  return (
    <TimeShell slug="lived">
      <LivedTool />
    </TimeShell>
  );
}
