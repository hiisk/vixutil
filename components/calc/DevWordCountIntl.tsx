'use client';
import { useMemo, useState } from 'react';
import { Card, Label } from '@/components/CalcShell';
import { DEV_WORD_COUNT } from '@/lib/calc-l10n/dev-tools3';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function DevWordCountIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_WORD_COUNT[lang].ui;
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = [...text].length;
    const charsNoSpace = [...text.replace(/\s/g, '')].length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? (text.match(/[.!?。！？]+/g)?.length ?? 0) : 0;
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const bytes = new TextEncoder().encode(text).length;
    return { chars, charsNoSpace, words, sentences, paragraphs, lines, bytes };
  }, [text]);

  const fmt = (n: number) => n.toLocaleString(localeTag(lang));

  const rows: [string, number, string?][] = [
    [c.chars, stats.chars],
    [c.charsNoSpace, stats.charsNoSpace],
    [c.words, stats.words, c.byWhitespace],
    [c.sentences, stats.sentences, c.byPunct],
    [c.paragraphs, stats.paragraphs, c.byBlank],
    [c.lines, stats.lines, c.byNewline],
    [c.bytes, stats.bytes],
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.text} <span className="font-normal text-slate-400 dark:text-slate-500">{c.live}</span></Label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={10}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      <Card className="p-5">
        <p className="label-caps mb-3">{c.detail}</p>
        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map(([label, value, note]) => (
            <div key={label} className="flex justify-between items-baseline gap-3 py-2.5">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {label}
                {note && <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">{note}</span>}
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(value)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
