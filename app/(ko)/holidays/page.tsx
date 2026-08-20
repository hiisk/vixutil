import type { Metadata } from 'next';
import HolidaysHubPage from '@/components/holidays/HolidaysHubPage';
import { hubMetadata } from '@/lib/holidays/route';

export const metadata: Metadata = hubMetadata('ko');

export default function HolidaysHub() {
  /* 굽는 시점의 해다 — 배포마다 다시 구우므로 따라온다. 「다음 공휴일」은
     손님 쪽에서 세니 여기서 굳어도 안 틀린다(components/holidays/NextHoliday) */
  return <HolidaysHubPage lang="ko" now={new Date().getFullYear()} />;
}
