'use client';
import { DEVICE_INFO_UI, type DeviceLang } from '@/lib/device-ui-intl';
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
  ['edge', /Edg\/([\d.]+)/],
  ['opera', /OPR\/([\d.]+)/],
  ['samsung', /SamsungBrowser\/([\d.]+)/],
  ['whale', /Whale\/([\d.]+)/],
  ['firefox', /Firefox\/([\d.]+)/],
  ['chrome', /Chrome\/([\d.]+)/],
  ['safari', /Version\/([\d.]+).*Safari/],
];

function detectBrowser(ua: string, ui: Ui): string {
  for (const [key, re] of BROWSERS) {
    const m = re.exec(ua);
    if (m) return `${ui.browsers[key] ?? key} ${m[1].split('.')[0]}`;
  }
  return ui.unknown;
}

function detectOS(ua: string, ui: Ui): string {
  if (/Windows NT 10/.test(ua)) return ui.windows10or11;
  if (/Windows NT ([\d.]+)/.test(ua)) return `Windows (NT ${/Windows NT ([\d.]+)/.exec(ua)![1]})`;
  if (/Android ([\d.]+)/.test(ua)) return `Android ${/Android ([\d.]+)/.exec(ua)![1]}`;
  if (/(iPhone|iPad).*OS ([\d_]+)/.test(ua)) return `iOS ${/OS ([\d_]+)/.exec(ua)![1].replace(/_/g, '.')}`;
  if (/Mac OS X ([\d_]+)/.test(ua)) return `macOS ${/Mac OS X ([\d_]+)/.exec(ua)![1].replace(/_/g, '.')}`;
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Linux/.test(ua)) return 'Linux';
  return ui.unknown;
}

type Ui = (typeof DEVICE_INFO_UI)['ko'];

function collect(ui: Ui): { groups: { title: string; rows: Row[] }[]; ua: string } {
  const ua = navigator.userAgent;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const w = window;

  return {
    ua,
    groups: [
      {
        title: ui.screenTitle,
        rows: [
          { label: ui.monitorRes, value: `${w.screen.width} × ${w.screen.height}`, hint: ui.monitorResHint },
          { label: ui.windowSize, value: `${w.innerWidth} × ${w.innerHeight}` },
          { label: ui.workArea, value: `${w.screen.availWidth} × ${w.screen.availHeight}`, hint: ui.workAreaHint },
          { label: ui.dpr, value: `${w.devicePixelRatio}×`, hint: ui.dprHint },
          {
            label: ui.realPixels,
            value: `${Math.round(w.screen.width * w.devicePixelRatio)} × ${Math.round(w.screen.height * w.devicePixelRatio)}`,
          },
          { label: ui.colorDepth, value: ui.bitSuffix(w.screen.colorDepth) },
          { label: ui.orientation, value: w.screen.orientation?.type ?? ui.unknown },
        ],
      },
      {
        title: ui.browserTitle,
        rows: [
          { label: ui.browser, value: detectBrowser(ua, ui) },
          { label: ui.os, value: detectOS(ua, ui) },
          { label: ui.language, value: navigator.language },
          { label: ui.cookies, value: navigator.cookieEnabled ? ui.cookiesOn : ui.cookiesOff },
          { label: ui.network, value: navigator.onLine ? ui.online : ui.offline },
          { label: ui.timezone, value: Intl.DateTimeFormat().resolvedOptions().timeZone },
        ],
      },
      {
        title: ui.hardwareTitle,
        rows: [
          { label: ui.cores, value: ui.countSuffix(navigator.hardwareConcurrency ?? '–'), hint: ui.coresHint },
          {
            label: ui.memory,
            value: nav.deviceMemory ? ui.memoryValue(nav.deviceMemory) : ui.memoryUnknown,
            hint: ui.memoryHint,
          },
          { label: ui.touchPoints, value: ui.countSuffix(navigator.maxTouchPoints ?? 0), hint: ui.touchHint },
        ],
      },
    ],
  };
}

export default function DeviceInfo({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = DEVICE_INFO_UI[lang];
  const [data, setData] = useState<ReturnType<typeof collect> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(collect(ui));
    const onResize = () => setData(collect(ui));
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
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-5 py-12 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">{ui.loading}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.groups.map(g => (
        <div key={g.title} className="rounded-lg border chip-off overflow-hidden">
          <p className="px-4 py-2.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
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
                  {r.hint && <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{r.hint}</span>}
                </dt>
                <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right font-mono tabular-nums break-all">
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      <div className="rounded-lg border chip-off p-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">User-Agent</p>
        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 break-all leading-relaxed">{data.ua}</p>
      </div>

      <button
        onClick={copy}
        className="w-full rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        {copied ? ui.copied : ui.copy}
      </button>

      <p className="text-center note-xs">
        {ui.privacy1}
        <br />
        {ui.privacy2}
      </p>
    </div>
  );
}
