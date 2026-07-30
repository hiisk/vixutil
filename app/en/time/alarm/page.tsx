import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';

export const metadata: Metadata = {
  title: "Online Alarm Clock — Free, Set Any Time",
  description: "Set an hour and minute and the alarm sounds at that time, with the remaining wait shown alongside.",
  alternates: {
    canonical: '/en/time/alarm',
    languages: { 'en': '/en/time/alarm', 'ko': '/time/alarm', 'x-default': '/en/time/alarm' },
  },
};

export default function EnAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="en">
      <AlarmTool lang="en" />
    </TimeShellIntl>
  );
}
