import type { Metadata } from 'next';
import TodayColor from '@/components/fortune/TodayColor';

export const metadata: Metadata = {
  title: 'Today’s Lucky Colour — Free Daily Colour Reading',
  description: 'Find today’s lucky colour and the colour to skip, with what each one means and a tip for the day. Free, instant, updated daily.',
  alternates: {
    canonical: '/en/fortune/today-color',
    languages: { 'en': '/en/fortune/today-color', 'ko': '/fortune/today-color', 'zh': '/zh/fortune/today-color', 'x-default': '/en/fortune/today-color' },
  },
};

export default function EnTodayColorPage() {
  return <TodayColor lang="en" />;
}
