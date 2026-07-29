'use client';
import CopyPicker from './CopyPicker';
import { CHAR_GROUPS } from '@/lib/special-chars';

export default function SpecialCharTool() {
  return (
    <CopyPicker
      groups={CHAR_GROUPS}
      storageKey="vixutil:recent-chars"
      hint="누르면 클립보드에 복사됩니다. 붙여 넣을 곳의 글꼴이 그 기호를 갖고 있지 않으면 네모(□)로 보일 수 있는데, 이때는 다른 기호를 쓰거나 글꼴을 바꿔야 합니다."
    />
  );
}
