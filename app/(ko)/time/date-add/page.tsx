import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import DateAddTool from '@/components/time/DateAddTool';

export const metadata: Metadata = {
  title: '날짜 더하기·빼기 - 며칠 뒤가 언제인지 계산',
  description: '기준 날짜에 일·주·개월·년을 더하거나 빼서 언제인지 알려줍니다. 계약 만료일, 유통기한, 100일처럼 세다가 틀리기 쉬운 날짜를 정확히 계산합니다.',
  alternates: {
    canonical: '/time/date-add',
    languages: alternateLanguages10('/time/date-add'),
  },
};

export default function Page() {
  return (
    <TimeShell slug="date-add">
      <DateAddTool />
    </TimeShell>
  );
}
