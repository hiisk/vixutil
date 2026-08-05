import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import StopwatchTool from '@/components/time/StopwatchTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '스톱워치 - 온라인 랩타임 측정',
  description: '시작한 순간부터 흐른 시간을 100분의 1초까지 잽니다. 랩 버튼으로 구간을 나눠 기록할 수 있어 운동 세트나 반복 작업 시간을 비교할 때 씁니다.',
  alternates: {
    canonical: '/time/stopwatch',
    languages: alternateLanguages10('/time/stopwatch'),
  },
});

export default function Page() {
  return (
    <TimeShell slug="stopwatch">
      <StopwatchTool />
    </TimeShell>
  );
}
