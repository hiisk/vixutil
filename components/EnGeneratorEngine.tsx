'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import { useState } from 'react';
import Link from 'next/link';
import type { Generator } from '@/lib/types';
import type { GeneratorIntlLang } from '@/lib/generator-l10n';
import PageGlow from './PageGlow';
import { thumbSurface } from '@/lib/thumbnail';

function pickFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeOne(gen: Generator): string {
  if (gen.type === 'combine' && gen.pools) {
    return gen.pools.map(p => pickFrom(p)).join(gen.separator ?? '');
  }
  if (gen.type === 'pick' && gen.items) {
    return pickFrom(gen.items);
  }
  return '';
}

function makeBatch(gen: Generator, n = 6): string[] {
  const out: string[] = [];
  let tries = 0;
  while (out.length < n && tries < n * 40) {
    const r = makeOne(gen);
    if (r && !out.includes(r)) out.push(r);
    tries++;
  }
  return out;
}

/**
 * 화면 문구 — 한국어를 뺀 아홉 언어.
 *
 * other/otherHref는 "한국어판으로" 링크다. 어느 언어에서든 한국어를 가리키므로
 * 값이 같지만, 언어마다 적어 두면 나중에 다른 언어를 가리키게 바꾸기 쉽다.
 */
const KO = { other: '한국어', otherLang: 'ko' as const, otherHref: (s: string) => `/generator/${s}` };

const STR: Record<GeneratorIntlLang | 'en', {
  back: string; other: string; otherLang: 'ko'; otherHref: (s: string) => string;
  again: string; go: string; reroll: string; copy: string; copiedAll: string; copyAll: string;
}> = {
  en: { ...KO, back: 'All generators', again: '🔄 Generate again', go: '✨ Generate names', reroll: 'Reroll this one', copy: 'Copy', copiedAll: '✓ All copied', copyAll: 'Copy all' },
  es: { ...KO, back: 'Todos los generadores', again: '🔄 Generar otra vez', go: '✨ Generar nombres', reroll: 'Cambiar este', copy: 'Copiar', copiedAll: '✓ Todo copiado', copyAll: 'Copiar todo' },
  'pt-br': { ...KO, back: 'Todos os geradores', again: '🔄 Gerar de novo', go: '✨ Gerar nomes', reroll: 'Trocar este', copy: 'Copiar', copiedAll: '✓ Tudo copiado', copyAll: 'Copiar tudo' },
  ja: { ...KO, back: 'ジェネレーター一覧', again: '🔄 もう一度', go: '✨ 名前を作る', reroll: 'これだけ引き直す', copy: 'コピー', copiedAll: '✓ すべてコピーしました', copyAll: 'すべてコピー' },
  de: { ...KO, back: 'Alle Generatoren', again: '🔄 Nochmal generieren', go: '✨ Namen generieren', reroll: 'Diesen neu würfeln', copy: 'Kopieren', copiedAll: '✓ Alles kopiert', copyAll: 'Alle kopieren' },
  fr: { ...KO, back: 'Tous les générateurs', again: '🔄 Générer encore', go: '✨ Générer des noms', reroll: 'Relancer celui-ci', copy: 'Copier', copiedAll: '✓ Tout copié', copyAll: 'Tout copier' },
  hi: { ...KO, back: 'सभी जनरेटर', again: '🔄 फिर से बनाएँ', go: '✨ नाम बनाएँ', reroll: 'इसे बदलें', copy: 'कॉपी', copiedAll: '✓ सब कॉपी हो गया', copyAll: 'सब कॉपी करें' },
  'zh-hans': { ...KO, back: '全部生成器', again: '🔄 再来一次', go: '✨ 生成名字', reroll: '只换这个', copy: '复制', copiedAll: '✓ 已全部复制', copyAll: '全部复制' },
  'zh-hant': { ...KO, back: '全部產生器', again: '🔄 再來一次', go: '✨ 產生名字', reroll: '只換這個', copy: '複製', copiedAll: '✓ 已全部複製', copyAll: '全部複製' },
};

export default function EnGeneratorEngine({ gen, lang = 'en' }: { gen: Generator; lang?: GeneratorIntlLang | 'en' }) {
  const t = STR[lang];
  const hubHref = `/${lang}/generator`;
  const [results, setResults] = useState<string[]>([]);
  const [animKey, setAnimKey] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const hasResults = results.length > 0;

  function generate() {
    setResults(makeBatch(gen));
    setAnimKey(k => k + 1);
  }
  function refreshOne(idx: number) {
    setResults(prev => {
      const next = [...prev];
      let r = makeOne(gen), tries = 0;
      while (next.includes(r) && tries < 20) { r = makeOne(gen); tries++; }
      next[idx] = r;
      return next;
    });
  }
  async function copyOne(text: string, idx: number) {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  }
  async function copyAll() {
    await navigator.clipboard.writeText(results.join('\n')).catch(() => {});
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.back}
          </Link>
          <span className="text-slate-200">·</span>
          <span className="row-name">{gen.title}</span>
          <Link href={t.otherHref(gen.slug)} className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600" hrefLang={t.otherLang}>{t.other}</Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        <div className="text-center mb-7">
          {/* 96px 아이콘 판이 화면 위쪽을 차지했다 — 칩 하나로 줄인다 */}
          <span className="bg-sec-soft mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <ToolIcon emoji={gen.icon} className="h-5 w-5" />
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">{gen.category}</span>
          <div className="hero-band">
            <PageHero title={gen.title} desc={gen.desc} />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-lg py-4 font-bold text-base transition-all shadow-sm shadow-emerald-200 dark:shadow-none mb-5"
        >
          {hasResults ? t.again : t.go}
        </button>

        {hasResults && (
          <div key={animKey} className="space-y-2.5 mb-4 animate-in">
            {results.map((r, i) => (
              <div key={`${r}-${i}`} className="group flex items-center gap-3 bg-white dark:bg-slate-900 rounded-lg px-4 py-3.5 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all">
                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <p className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100 min-w-0">{r}</p>
                <button onClick={() => refreshOne(i)} title={t.reroll} className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors p-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button onClick={() => copyOne(r, i)} className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors shrink-0 w-12 text-right">
                  {copiedIdx === i ? '✓' : t.copy}
                </button>
              </div>
            ))}
            <button onClick={copyAll} className="w-full text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 py-2 transition-colors">
              {copiedAll ? t.copiedAll : t.copyAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
