import type { Metadata } from 'next';
import TimeShell from '@/components/TimeShell';
import AlarmTool from '@/components/time/AlarmTool';

export const metadata: Metadata = {
  title: '알람 - 지정한 시각에 울리는 온라인 알람',
  description: '시각을 정해 두면 그때 소리로 알려줍니다. 타이머와 달리 "몇 분 뒤"가 아니라 "몇 시 몇 분"으로 맞추므로, 회의 시작이나 약 먹을 시간처럼 정해진 시각에 씁니다.',
  alternates: {
    canonical: '/time/alarm',
    languages: { 'ko': '/time/alarm', 'en': '/en/time/alarm', 'x-default': '/en/time/alarm' },
  },
};

export default function Page() {
  return (
    <TimeShell slug="alarm">
      <AlarmTool />
    </TimeShell>
  );
}
