'use client';
import { useEffect, useState } from 'react';

/**
 * 내 기기 정보 — 브라우저가 알려주는 값을 그대로 모아 보여준다.
 *
 * 값은 전부 클라이언트에만 있다. 서버에서 렌더할 때 아무것도 모르므로,
 * 마운트 후에 한 번 채운다(그 전에 그리면 서버 HTML과 달라져 하이드레이션이 깨진다).
 *
 * UA 문자열은 브라우저마다 서로를 흉내 내는 역사가 있어 정확한 판별이 어렵다.
 * 순서를 뒤에서부터 좁히고(엣지 → 크롬), 확신이 없으면 "알 수 없음"이라고 적는다.
 */
type Row = { label: string; value: string; hint?: string };

/*
  순서가 중요하다. 엣지·웨일·오페라·삼성 인터넷은 모두 UA에 Chrome을 함께 달고
  있어서, 크롬을 먼저 검사하면 전부 크롬으로 뭉개진다. 좁은 것부터 본다.
*/
const BROWSERS: [name: string, re: RegExp][] = [
  ['엣지', /Edg\/([\d.]+)/],
  ['오페라', /OPR\/([\d.]+)/],
  ['삼성 인터넷', /SamsungBrowser\/([\d.]+)/],
  ['웨일', /Whale\/([\d.]+)/],
  ['파이어폭스', /Firefox\/([\d.]+)/],
  ['크롬', /Chrome\/([\d.]+)/],
  ['사파리', /Version\/([\d.]+).*Safari/],
];

function detectBrowser(ua: string): string {
  for (const [name, re] of BROWSERS) {
    const m = re.exec(ua);
    if (m) return `${name} ${m[1].split('.')[0]}`;
  }
  return '알 수 없음';
}

function detectOS(ua: string): string {
  if (/Windows NT 10/.test(ua)) return 'Windows 10 또는 11';
  if (/Windows NT ([\d.]+)/.test(ua)) return `Windows (NT ${/Windows NT ([\d.]+)/.exec(ua)![1]})`;
  if (/Android ([\d.]+)/.test(ua)) return `Android ${/Android ([\d.]+)/.exec(ua)![1]}`;
  if (/(iPhone|iPad).*OS ([\d_]+)/.test(ua)) return `iOS ${/OS ([\d_]+)/.exec(ua)![1].replace(/_/g, '.')}`;
  if (/Mac OS X ([\d_]+)/.test(ua)) return `macOS ${/Mac OS X ([\d_]+)/.exec(ua)![1].replace(/_/g, '.')}`;
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Linux/.test(ua)) return 'Linux';
  return '알 수 없음';
}

function collect(): { groups: { title: string; rows: Row[] }[]; ua: string } {
  const ua = navigator.userAgent;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const w = window;

  return {
    ua,
    groups: [
      {
        title: '화면',
        rows: [
          { label: '모니터 해상도', value: `${w.screen.width} × ${w.screen.height}`, hint: '운영체제가 보고하는 논리 해상도' },
          { label: '브라우저 창 크기', value: `${w.innerWidth} × ${w.innerHeight}` },
          { label: '작업 영역', value: `${w.screen.availWidth} × ${w.screen.availHeight}`, hint: '작업표시줄 등을 뺀 크기' },
          { label: '픽셀 배율(DPR)', value: `${w.devicePixelRatio}×`, hint: '2 이상이면 고해상도(레티나) 화면' },
          {
            label: '실제 픽셀 추정',
            value: `${Math.round(w.screen.width * w.devicePixelRatio)} × ${Math.round(w.screen.height * w.devicePixelRatio)}`,
          },
          { label: '색 심도', value: `${w.screen.colorDepth}비트` },
          { label: '화면 방향', value: w.screen.orientation?.type ?? '알 수 없음' },
        ],
      },
      {
        title: '브라우저',
        rows: [
          { label: '브라우저', value: detectBrowser(ua) },
          { label: '운영체제', value: detectOS(ua) },
          { label: '언어', value: navigator.language },
          { label: '쿠키 사용', value: navigator.cookieEnabled ? '허용됨' : '차단됨' },
          { label: '네트워크 상태', value: navigator.onLine ? '온라인' : '오프라인' },
          { label: '시간대', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
        ],
      },
      {
        title: '하드웨어',
        rows: [
          { label: 'CPU 논리 코어', value: `${navigator.hardwareConcurrency ?? '–'}개`, hint: '브라우저가 쓸 수 있는 스레드 수' },
          {
            label: '메모리(대략)',
            value: nav.deviceMemory ? `${nav.deviceMemory}GB 이상` : '브라우저가 알려주지 않음',
            hint: '크롬 계열만 제공하며 값이 반올림돼 있다',
          },
          { label: '동시 터치 점수', value: `${navigator.maxTouchPoints ?? 0}개`, hint: '0이면 터치 지원 없음' },
        ],
      },
    ],
  };
}

export default function DeviceInfo() {
  const [data, setData] = useState<ReturnType<typeof collect> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(collect());
    const onResize = () => setData(collect());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  const copy = async () => {
    if (!data) return;
    const text = [
      ...data.groups.flatMap(g => [`[${g.title}]`, ...g.rows.map(r => `${r.label}: ${r.value}`), '']),
      `User-Agent: ${data.ua}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!data) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-5 py-12 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">기기 정보를 읽는 중…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.groups.map(g => (
        <div key={g.title} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          <p className="px-4 py-2.5 text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
            {g.title}
          </p>
          <dl>
            {g.rows.map(r => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-4 px-4 py-3 border-b border-slate-50 dark:border-slate-800 last:border-0"
              >
                <dt className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
                  {r.label}
                  {r.hint && <span className="block text-[11px] text-slate-300 dark:text-slate-600 mt-0.5">{r.hint}</span>}
                </dt>
                <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right font-mono tabular-nums break-all">
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
        <p className="text-xs font-black text-slate-500 dark:text-slate-400 mb-2">User-Agent</p>
        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 break-all leading-relaxed">{data.ua}</p>
      </div>

      <button
        onClick={copy}
        className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        {copied ? '✅ 복사했습니다' : '📋 전체 정보 복사하기'}
      </button>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
        여기 있는 값은 브라우저가 알려주는 것뿐이며 어디로도 전송되지 않습니다.
        <br />
        개인정보(IP·위치·계정)는 수집하지도, 표시하지도 않습니다.
      </p>
    </div>
  );
}
