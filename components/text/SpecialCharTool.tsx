'use client';
import { CHAR_GROUP_INTL, CHAR_NAME_INTL } from '@/lib/text-intl';
import { SYMBOL_TOOL_UI, type TextLang } from '@/lib/text-ui-intl';
import CopyPicker from './CopyPicker';
import { CHAR_GROUPS } from '@/lib/special-chars';

export default function SpecialCharTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  // 기호 자체는 그대로 두고 분류 라벨과 검색용 이름만 갈아 끼운다
  const groups = CHAR_GROUPS.map(g => ({
    ...g,
    label: CHAR_GROUP_INTL[lang][g.id] ?? g.label,
    items: lang === 'ko' ? g.items : g.items.map(i => ({ ...i, name: CHAR_NAME_INTL[lang][i.name] ?? i.name })),
  }));
  return (
    <CopyPicker
      groups={groups}
      storageKey="vixutil:recent-chars"
      hint={SYMBOL_TOOL_UI[lang].specialHint}
      lang={lang}
    />
  );
}
