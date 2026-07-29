'use client';
import { useState } from 'react';

function parse(text: string): string[] {
  return text.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 자기 자신에게 배정되지 않는 순열(교란순열)을 만든다. */
function derange(names: string[]): Record<string, string> {
  const n = names.length;
  for (let attempt = 0; attempt < 1000; attempt++) {
    const idx = shuffle([...names.keys()]);
    if (idx.every((t, i) => t !== i)) {
      const map: Record<string, string> = {};
      names.forEach((g, i) => { map[g] = names[idx[i]]; });
      return map;
    }
  }
  // 안전장치: 한 칸씩 밀기(항상 자기 자신 제외)
  const map: Record<string, string> = {};
  names.forEach((g, i) => { map[g] = names[(i + 1) % n]; });
  return map;
}

export default function SecretSanta({ lang = 'ko' }: { lang?: 'ko' | 'en' | 'zh' }) {
  const ko = lang === 'ko';
  const zh = lang === 'zh';
  const [text, setText] = useState(ko ? '철수\n영희\n민수\n지연\n현우' : zh ? '张三\n李四\n王五\n赵六\n小明' : 'Alex\nSam\nJordan\nTaylor\nJamie');
  const [assign, setAssign] = useState<Record<string, string> | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const names = parse(text);
  const dupWarning = new Set(names).size !== names.length;

  function run() {
    if (names.length < 3 || dupWarning) return;
    setAssign(derange(names));
    setOrder(names);
    setSeen(new Set());
    setOpenFor(null);
    setRevealed(false);
  }

  function open(name: string) {
    setOpenFor(name);
    setRevealed(false);
  }
  function close() {
    if (openFor) setSeen(prev => new Set(prev).add(openFor));
    setOpenFor(null);
    setRevealed(false);
  }

  return (
    <div>
      {!assign && (
        <>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            placeholder={ko ? '참가자 이름을 한 줄에 하나씩 (3명 이상)' : zh ? '每行一个名字（3 人以上）' : 'One name per line (3 or more)'}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-y"
          />
          <div className="mt-2 mb-4 text-xs text-slate-400">{ko ? `총 ${names.length}명` : zh ? `共 ${names.length} 人` : `${names.length} people`}</div>
          {dupWarning && <p className="text-xs text-rose-500 mb-3">{ko ? '이름이 겹쳐요. 구분되게 입력해 주세요(예: 김철수, 이철수).' : zh ? '有重复名字，请改成不同的（例：小明A、小明B）。' : 'Duplicate names — make them unique (e.g. John S, John K).'}</p>}
          <button
            onClick={run}
            disabled={names.length < 3 || dupWarning}
            className="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-lg rounded-2xl py-4 shadow-lg shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {ko ? '🎁 마니또 뽑기' : zh ? '🎁 抽取神秘圣诞人' : '🎁 Draw Secret Santa'}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
            {ko ? '뽑은 뒤 폰을 돌려가며 각자 자기 마니또만 몰래 확인하세요.' : zh ? '抽取后传阅手机，每人只查看自己的对象。' : 'After drawing, pass the phone around so each person privately checks their own match.'}
          </p>
        </>
      )}

      {assign && (
        <>
          <div className="text-center mb-4">
            <div className="text-sm font-black text-rose-600">{ko ? '배정 완료! 🎁' : zh ? '分配完成！🎁' : 'All matched! 🎁'}</div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{ko ? '이름을 눌러 각자 자기 마니또를 확인하세요' : zh ? '点击你的名字查看你的对象' : 'Tap your name to see your match'}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {order.map(name => (
              <button
                key={name}
                onClick={() => open(name)}
                className={`relative rounded-xl py-3 px-2 text-sm font-bold border transition-all ${seen.has(name)
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-rose-200 dark:border-rose-900/50 hover:-translate-y-0.5 hover:shadow'}`}
              >
                {seen.has(name) && <span className="absolute top-1 right-1.5 text-[11px]">✅</span>}
                {name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setAssign(null)}
            className="w-full border-2 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 font-bold rounded-2xl py-3 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            {ko ? '🔄 새로 뽑기' : zh ? '🔄 重新抽取' : '🔄 Draw again'}
          </button>

          {/* 확인 패널 (인라인 카드, 오버레이 아님) */}
          {openFor && (
            <div className="ss-pop mt-5 rounded-2xl border-2 border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20 p-6 text-center">
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-rose-600 font-black">{openFor}</span> {ko ? '님만 보세요 🤫' : zh ? '专属查看 🤫' : 'only 🤫'}
              </div>
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-black rounded-xl py-3.5 hover:shadow-lg transition-all"
                >
                  {ko ? '🎁 내 마니또 확인하기' : zh ? '🎁 查看我的对象' : '🎁 Reveal my match'}
                </button>
              ) : (
                <>
                  <div className="text-xs text-slate-400 mb-1">{ko ? '당신의 마니또는' : zh ? '你的对象是' : 'Your match is'}</div>
                  <div className="text-3xl font-black text-rose-600 dark:text-rose-300 mb-4">{assign[openFor]}</div>
                  <button
                    onClick={close}
                    className="w-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold rounded-xl py-2.5 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    {ko ? '확인했어요, 닫기' : zh ? '已确认，关闭' : 'Got it, close'}
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes ssPop { 0% { opacity: 0; transform: translateY(8px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .ss-pop { animation: ssPop 0.3s ease-out; }
      `}</style>
    </div>
  );
}
