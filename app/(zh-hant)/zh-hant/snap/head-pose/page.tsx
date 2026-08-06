import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('zh-hant', 'head-pose');

export default function HeadPoseZhhantPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: newSnapHubTitle('zh-hant'), path: '/zh-hant/snap' },
        { name: TOOL_TEXT['zh-hant'].tools['head-pose'].title, path: '/zh-hant/snap/head-pose' },
      ])} />
      <MeasuredTest lang="zh-hant" slug="head-pose" />
    </>
  );
}
