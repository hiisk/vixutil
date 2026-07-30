'use client';
import { EMOTICON_GROUP_INTL, emoticonsFor } from '@/lib/text-intl';
import { SYMBOL_TOOL_UI, type TextLang } from '@/lib/text-ui-intl';
import CopyPicker from './CopyPicker';
import { EMOTICON_GROUPS } from '@/lib/emoticons';

export default function EmoticonTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  // 한글 자모로 만든 이모티콘은 한국어 화면에만 둔다 — 다른 언어에서는 뜻이 없다
  const groups = EMOTICON_GROUPS.map(g => ({
    ...g,
    label: EMOTICON_GROUP_INTL[lang][g.id] ?? g.label,
    items: emoticonsFor(g.items, lang),
  }));
  return (
    <CopyPicker
      groups={groups.map(g => ({ ...g, items: g.items.map(ch => ({ ch })) }))}
      storageKey="vixutil:recent-emoticons"
      searchable={false}
      large
      hint={SYMBOL_TOOL_UI[lang].emoticonHint}
      lang={lang}
    />
  );
}
