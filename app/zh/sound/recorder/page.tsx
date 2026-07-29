import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';

export const metadata: Metadata = {
  title: '在线录音机 — 在浏览器里直接录音并保存',
  description: '无需安装即可录音，马上回放并下载文件。录音只在浏览器内处理，不会传到服务器，所以会议记录或发音练习都可以放心用。',
  alternates: {
    canonical: '/zh/sound/recorder',
    languages: { 'en': '/en/sound/recorder', 'zh': '/zh/sound/recorder', 'ko': '/sound/recorder', 'x-default': '/en/sound/recorder' },
  },
};

export default function ZhSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="zh">
      <RecorderTool lang="zh" />
    </SoundShellIntl>
  );
}
