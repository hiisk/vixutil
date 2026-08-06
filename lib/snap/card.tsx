/**
 * 새 스냅테스트의 공유 카드.
 *
 * 그림은 lib/og-cards/<언어>.tsx의 대응표가 부른다. 도구마다 카드를 손으로
 * 적지 않고 여기서 만든다 — 제목·설명은 목록과 같은 것을 써야 목록에서 보고
 * 눌렀을 때 같은 도구로 읽힌다.
 */
import type { ReactElement } from 'react';

import { ogCard } from '../og-template.tsx';
import { TOOL_TEXT, type NewSnapSlug } from './tool-text.ts';
import type { SnapLang } from '@/components/snap/SnapShell';

const LOOK: Record<NewSnapSlug, { icon: string; eyebrow: string; from: string; to: string }> = {
  'id-photo': { icon: '🪪', eyebrow: 'ID Photo', from: '#0ea5e9', to: '#4f46e5' },
  'head-pose': { icon: '🧭', eyebrow: 'Head Angle', from: '#10b981', to: '#0d9488' },
  'real-smile': { icon: '😄', eyebrow: 'Real Smile', from: '#fbbf24', to: '#f43f5e' },
  'eye-open': { icon: '👁️', eyebrow: 'Eye Openness', from: '#8b5cf6', to: '#c026d3' },
  framing: { icon: '🖼️', eyebrow: 'Framing', from: '#6366f1', to: '#0ea5e9' },
  lighting: { icon: '💡', eyebrow: 'Lighting', from: '#f59e0b', to: '#78350f' },
  sharpness: { icon: '🔍', eyebrow: 'Sharpness', from: '#0891b2', to: '#1e3a8a' },
  'white-balance': { icon: '🎚️', eyebrow: 'White Balance', from: '#14b8a6', to: '#7c3aed' },
  distance: { icon: '📏', eyebrow: 'Distance', from: '#65a30d', to: '#166534' },
  mirror: { icon: '🪞', eyebrow: 'Mirror Faces', from: '#a855f7', to: '#1e1b4b' },
};

/** 데바나가리는 카드 글꼴에서 정형되지 않는다 — 앞선 섹션들과 같은 처리다 */
const cardLang = (lang: SnapLang): SnapLang => (lang === 'hi' ? 'en' : lang);

export function newSnapCard(lang: SnapLang, slug: NewSnapSlug): ReactElement {
  const t = TOOL_TEXT[cardLang(lang)].tools[slug];
  const look = LOOK[slug];
  return ogCard({ icon: look.icon, eyebrow: look.eyebrow, title: t.title, desc: t.desc, from: look.from, to: look.to });
}
