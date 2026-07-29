import type { Metadata } from 'next';
import TimeShell from '@/components/TimeShell';
import WorldClockTool from '@/components/time/WorldClockTool';

export const metadata: Metadata = {
  title: '세계 시계 - 주요 도시 현재 시각',
  description: '서울·뉴욕·런던·도쿄 등 주요 도시의 현재 시각과 날짜를 함께 보여줍니다. 지금이 그곳의 새벽인지 업무 시간인지 색으로 구분해, 연락해도 되는 시간인지 바로 알 수 있습니다.',
  alternates: { canonical: '/time/worldclock' },
};

export default function Page() {
  return (
    <TimeShell slug="worldclock">
      <WorldClockTool />
    </TimeShell>
  );
}
