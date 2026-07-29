'use client';
import CopyPicker from './CopyPicker';
import { EMOTICON_GROUPS } from '@/lib/emoticons';

export default function EmoticonTool() {
  return (
    <CopyPicker
      groups={EMOTICON_GROUPS.map(g => ({ ...g, items: g.items.map(ch => ({ ch })) }))}
      storageKey="vixutil:recent-emoticons"
      searchable={false}
      large
      hint="문자로 만든 이모티콘이라 이미지가 아닙니다. 닉네임·상태 메시지처럼 그림 이모지를 못 쓰는 곳에도 들어가고, 어떤 기기에서 봐도 같은 모양으로 보입니다."
    />
  );
}
