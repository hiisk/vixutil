import type { Metadata } from 'next';
import TimesHubPage from '@/components/times/TimesHubPage';
import { hubMetadata } from '@/lib/times/route';

export const metadata: Metadata = hubMetadata('en');

export default function TimesHub() {
  return <TimesHubPage lang="en" />;
}
