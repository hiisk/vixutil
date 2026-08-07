import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

export const metadata: Metadata = newSnapMetadata('ko', 'lips');

export default function LipsKoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/' },
        { name: newSnapHubTitle('ko'), path: '/snap' },
        { name: TOOL_TEXT['ko'].tools['lips'].title, path: '/snap/lips' },
      ])} />
      <MeasuredTest lang="ko" slug="lips" />
      {/* 기존 스냅 낱장과 같이 라우트에서 그린다 — MeasuredTest는 도구 화면만 맡는다 */}
      <div className="bg-white dark:bg-slate-900">
        <div className="max-w-lg mx-auto px-4 pb-10 w-full">
          <Faq items={SECTION_FAQ['snap/lips']} />
        </div>
      </div>
    </>
  );
}
