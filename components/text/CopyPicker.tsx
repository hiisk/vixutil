'use client';
import { useEffect, useMemo, useState } from 'react';
import { CARD, useCopy } from './ui';
import { COPY_PICKER_UI, type TextLang } from '@/lib/text-ui-intl';

/**
 * 눌러서 복사하는 격자 — 특수문자와 이모티콘이 같은 화면을 쓴다.
 *
 * {ui.recentTitle}을 맨 위에 남긴다. 이런 도구는 같은 사람이 같은 기호를 반복해서
 * 찾는 일이 대부분이라, 그 몇 개만 위에 있어도 매번 목록을 훑지 않아도 된다.
 * localStorage를 쓰므로 이 브라우저 안에만 남는다.
 */
export interface PickerItem {
  ch: string;
  name?: string;
}

export interface PickerGroup {
  id: string;
  label: string;
  icon: string;
  items: PickerItem[];
}

export default function CopyPicker({
  groups,
  storageKey,
  searchable = true,
  large = false,
  hint,
  lang = 'ko',
}: {
  groups: PickerGroup[];
  storageKey: string;
  searchable?: boolean;
  /** 카오모지처럼 폭이 넓은 것은 큰 칸에 넣는다 */
  large?: boolean;
  hint?: string;
  lang?: TextLang;
}) {
  const ui = COPY_PICKER_UI[lang];
  const { copied, copy } = useCopy();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setRecent(JSON.parse(saved).slice(0, 12));
    } catch { /* 저장소를 못 쓰는 브라우저면 최근 목록만 없다 */ }
  }, [storageKey]);

  const pick = (ch: string) => {
    copy(ch);
    setRecent(prev => {
      const next = [ch, ...prev.filter(c => c !== ch)].slice(0, 12);
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* 무시 */ }
      return next;
    });
  };

  const found = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return groups
      .flatMap(g => g.items)
      .filter(item => item.ch === q || (item.name ?? '').toLowerCase().includes(q));
  }, [query, groups]);

  const cell = (item: PickerItem, key: string) => (
    <button
      key={key}
      onClick={() => pick(item.ch)}
      title={item.name}
      className={`group relative flex items-center justify-center rounded-xl border transition-colors ${
        large ? 'px-2 py-3 min-h-[3.25rem]' : 'h-12'
      } ${
        copied === item.ch
          ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40'
          : 'chip-off hover:border-slate-300 dark:hover:border-slate-700 hover:bg-sec-soft '
      }`}
    >
      <span className={`${large ? 'text-xs' : 'text-lg'} text-slate-800 dark:text-slate-100 break-all leading-tight`}>
        {item.ch}
      </span>
      {copied === item.ch && (
        <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-500/90 text-[11px] font-bold text-white">
          {ui.copied}
        </span>
      )}
    </button>
  );

  const gridClass = large ? 'grid grid-cols-2 sm:grid-cols-3 gap-2' : 'grid grid-cols-6 sm:grid-cols-8 gap-2';

  return (
    <div>
      {searchable && (
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={ui.searchPlaceholder}
          className="w-full rounded-lg border chip-off px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 transition-colors mb-4"
        />
      )}

      {recent.length > 0 && !found && (
        <div className="mb-5">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">{ui.recentTitle}</p>
          <div className={gridClass}>{recent.map((ch, i) => cell({ ch }, `recent-${ch}-${i}`))}</div>
        </div>
      )}

      {found ? (
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
            {ui.foundCount(found.length)}
          </p>
          {found.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">
              {ui.notFound}
            </p>
          ) : (
            <div className={gridClass}>{found.map((item, i) => cell(item, `found-${item.ch}-${i}`))}</div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map(g => (
            <section key={g.id}>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
                {g.icon} {g.label}
              </p>
              <div className={gridClass}>{g.items.map((item, i) => cell(item, `${g.id}-${item.ch}-${i}`))}</div>
            </section>
          ))}
        </div>
      )}

      {hint && (
        <div className={`${CARD} mt-6`}>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{hint}</p>
        </div>
      )}
    </div>
  );
}
