'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Generator } from '@/lib/types';
import ShareButtons from './ShareButtons';

function generateResult(gen: Generator): string {
  switch (gen.type) {
    case 'combine': {
      if (!gen.pools) return '';
      const parts = gen.pools.map(p => p[Math.floor(Math.random() * p.length)]);
      return parts.join(gen.separator ?? ' ');
    }
    case 'pick': {
      if (!gen.items) return '';
      const count = gen.count ?? 1;
      const shuffled = [...gen.items].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count).join('\n');
    }
    case 'password': {
      const len = gen.count ?? 16;
      const upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
      const lower = 'abcdefghjkmnpqrstuvwxyz';
      const nums = '23456789';
      const syms = '!@#$%&*';
      const all = upper + lower + nums + syms;
      const pw = [
        upper[Math.floor(Math.random() * upper.length)],
        nums[Math.floor(Math.random() * nums.length)],
        syms[Math.floor(Math.random() * syms.length)],
        ...Array.from({ length: len - 3 }, () => all[Math.floor(Math.random() * all.length)]),
      ].sort(() => Math.random() - 0.5).join('');
      return pw;
    }
    case 'number': {
      const min = gen.min ?? 1;
      const max = gen.max ?? 100;
      const count = gen.count ?? 1;
      return Array.from({ length: count }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
      ).join(', ');
    }
    default: return '';
  }
}

export default function GeneratorEngine({ gen }: { gen: Generator }) {
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  function generate() {
    setResult(generateResult(gen));
    setCopied(false);
    setAnimKey(k => k + 1);
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/generator" className="text-sm text-slate-400 hover:text-emerald-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 생성기
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 truncate">{gen.title}</span>
        </div>
      </header>

      <div className="flex-1 px-4 py-10 max-w-lg mx-auto w-full">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl shadow-md mx-auto mb-4">
            {gen.icon}
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{gen.category}</span>
          <h1 className="text-2xl font-black text-slate-900 mt-3 mb-2">{gen.title}</h1>
          <p className="text-slate-500 text-sm">{gen.desc}</p>
        </div>

        {/* Result card */}
        {result !== null && (
          <div key={animKey}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white text-center mb-5 shadow-lg animate-fade-in">
            <span className="absolute -top-4 -right-4 text-[80px] opacity-10 select-none">{gen.icon}</span>
            <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-3">✨ 생성 결과</p>
            <p className="text-2xl font-black whitespace-pre-line leading-relaxed">{result}</p>
            <button onClick={copyResult}
              className="mt-4 text-xs text-emerald-200 hover:text-white font-semibold transition-colors">
              {copied ? '✅ 복사됨' : '📋 복사하기'}
            </button>
          </div>
        )}

        {/* Generate button */}
        <button onClick={generate}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-2xl py-4 font-black text-base transition-colors shadow-md shadow-emerald-200 mb-3">
          {result === null ? `✨ ${gen.title} 시작` : '🔄 다시 생성하기'}
        </button>

        {result !== null && (
          <ShareButtons
            title={gen.title}
            description={`${gen.title} 결과: ${result.substring(0, 60)}`}
          />
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.35s ease-out; }
      `}</style>
    </div>
  );
}
