import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import PomodoroTool from '@/components/time/PomodoroTool';

export const metadata: Metadata = {
  title: '뽀모도로 타이머 - 25분 집중 5분 휴식',
  description: '25분 집중하고 5분 쉬는 것을 네 번 반복한 뒤 길게 쉬는 방법입니다. 지금이 집중 시간인지 휴식 시간인지 화면 색으로 바로 알 수 있고, 몇 번째인지도 세어 줍니다.',
  alternates: {
    canonical: '/time/pomodoro',
    languages: alternateLanguages10('/time/pomodoro'),
  },
};

export default function Page() {
  return (
    <TimeShell slug="pomodoro">
      <PomodoroTool />
    </TimeShell>
  );
}
