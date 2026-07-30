import type { Metadata } from 'next';
import TimeShell from '@/components/TimeShell';
import TimerTool from '@/components/time/TimerTool';

export const metadata: Metadata = {
  title: '타이머 - 온라인 카운트다운 알람',
  description: '분·초를 정해 두면 남은 시간이 크게 표시되고 끝나면 소리로 알려줍니다. 라면 3분, 스트레칭 10분처럼 자주 쓰는 시간은 버튼 하나로 맞출 수 있습니다.',
  alternates: {
    canonical: '/time/timer',
    languages: { 'ko': '/time/timer', 'en': '/en/time/timer', 'zh': '/zh/time/timer', 'x-default': '/en/time/timer' },
  },
};

export default function Page() {
  return (
    <TimeShell slug="timer">
      <TimerTool />
    </TimeShell>
  );
}
