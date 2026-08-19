'use client';
import { useMemo, useState } from 'react';
import {
  encodeQr, maxCapacity, pickMode, qrPath, qrToSvg,
  QrTooLongError, type Ecl, type QrCode,
} from '@/lib/qr';
import {
  emailPayload, geoPayload, normalizeUrl, phonePayload, smsPayload,
  vcardPayload, wifiPayload, QR_FORMATS, type QrFormat, type WifiAuth,
} from '@/lib/qr-format';
import { QR_UI } from '@/lib/qr-ui';
import { CARD, CopyBox, InputArea, Stat } from './ui';
import type { TextLang } from '@/lib/text-intl';

/**
 * QR 코드 생성기.
 *
 * 계산은 전부 lib/qr.ts에 있고 여기는 입력을 모아 문자열 하나로 만들어 넘기는
 * 일만 한다. 그래야 "이 입력에서 이 QR이 나온다"를 검사가 물을 수 있다.
 *
 * ── 그리는 방법 ────────────────────────────────────────────
 * SVG로 그린다. QR은 칸 경계가 흐려지면 못 읽히는데, PNG를 늘리면 정확히 그
 * 일이 일어난다. 미리 보기와 내려받는 파일이 같은 path 문자열을 쓴다.
 *
 * PNG도 낸다 — 카톡·문서에 붙일 때는 그쪽이 편하다. canvas에 칸을 그대로
 * 칠하므로 SVG를 이미지로 바꾸는 단계가 없다(그 단계는 브라우저마다 다르게
 * 실패한다).
 *
 * ── 절대 하지 않는 것 ──────────────────────────────────────
 * 길어서 안 들어갈 때 **잘라서 만들지 않는다.** 잘린 QR은 화면에 멀쩡한
 * 사각형으로 나오고 스캐너만 조용히 실패한다 — 인쇄해 붙인 뒤에 알게 된다.
 * 그래서 얼마가 넘쳤는지 숫자로 말하고 그림을 내지 않는다.
 */

const ECL_LIST: readonly Ecl[] = ['L', 'M', 'Q', 'H'];
/** 칸 하나를 몇 픽셀로 낼지 — 내려받는 그림의 크기가 여기서 정해진다 */
const SCALES = [4, 8, 12, 16];
const MARGINS = [0, 2, 4, 8];

const FIELD =
  'w-full rounded-xl border chip-off px-3 py-2.5 ' +
  'text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 ' +
  'focus:outline-none focus:border-indigo-400 transition-colors';

const PICK_ON =
  'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300';
const PICK_OFF =
  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200';

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={FIELD}
      />
    </label>
  );
}

/** 버튼 한 줄 — 꼴·등급·크기·여백이 같은 모양을 쓴다 */
function Picker<T extends string | number>({
  title, options, labels, value, onChange, cols,
}: {
  title: string;
  options: readonly T[];
  labels: readonly string[];
  value: T;
  onChange: (next: T) => void;
  cols: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{title}</p>
      <div className={`grid gap-2 ${cols}`}>
        {options.map((option, i) => (
          <button
            key={String(option)}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`rounded-xl border py-2.5 px-1 text-sm font-bold transition-colors ${
              value === option ? PICK_ON : PICK_OFF
            }`}
          >
            {labels[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 두 색이 스캐너가 가를 수 있을 만큼 다른가.
 *
 * 사람 눈에는 갈라져 보여도 스캐너는 밝기만 본다. 상대 휘도(relative
 * luminance)의 차이가 작으면 어두운 칸을 밝은 칸으로 읽어 통째로 실패한다.
 * 0.4는 넉넉한 쪽으로 잡은 값이다 — 경고만 하고 막지는 않는다.
 */
function luminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return 0;
  const n = parseInt(m[1], 16);
  const channel = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 0xff) + 0.7152 * channel((n >> 8) & 0xff) + 0.0722 * channel(n & 0xff);
}

interface WifiState { ssid: string; password: string; auth: WifiAuth; hidden: boolean }
interface CardState {
  lastName: string; firstName: string; org: string; title: string;
  phone: string; email: string; url: string; address: string;
}

export default function QrTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = QR_UI[lang];

  const [format, setFormat] = useState<QrFormat>('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [wifi, setWifi] = useState<WifiState>({ ssid: '', password: '', auth: 'WPA', hidden: false });
  const [card, setCard] = useState<CardState>({
    lastName: '', firstName: '', org: '', title: '', phone: '', email: '', url: '', address: '',
  });
  const [mail, setMail] = useState({ to: '', subject: '', body: '' });
  const [tel, setTel] = useState('');
  const [sms, setSms] = useState({ number: '', message: '' });
  const [geo, setGeo] = useState({ lat: '', lon: '' });

  const [ecl, setEcl] = useState<Ecl>('M');
  const [scale, setScale] = useState(8);
  const [margin, setMargin] = useState(4);
  const [dark, setDark] = useState('#0f172a');
  const [light, setLight] = useState('#ffffff');

  /** 고른 꼴을 실제로 QR에 담는 문자열 한 개로 */
  const payload = useMemo(() => {
    switch (format) {
      case 'text': return text;
      case 'url': return normalizeUrl(url);
      case 'wifi': return wifi.ssid.trim() ? wifiPayload(wifi) : '';
      case 'vcard': {
        const filled = Object.values(card).some(v => v.trim());
        return filled ? vcardPayload(card) : '';
      }
      case 'email': return mail.to.trim() ? emailPayload({ to: mail.to, subject: mail.subject, body: mail.body }) : '';
      case 'phone': return tel.trim() ? phonePayload(tel) : '';
      case 'sms': return sms.number.trim() ? smsPayload(sms) : '';
      case 'geo': return geo.lat.trim() && geo.lon.trim() ? geoPayload(geo) : '';
    }
  }, [format, text, url, wifi, card, mail, tel, sms, geo]);

  /*
   * 담을 수 없으면 QrTooLongError가 온다. 그 밖의 오류는 인코더의 자기 검사가
   * 걸린 것이라 있어서는 안 되지만, 화면을 통째로 날리는 대신 그 자리에 적는다 —
   * 조용히 빈 칸으로 두면 무엇이 잘못됐는지 아무도 모른다.
   */
  const made = useMemo((): { qr: QrCode } | { problem: string } | null => {
    if (!payload) return null;
    try {
      return { qr: encodeQr(payload, { ecl }) };
    } catch (error) {
      if (error instanceof QrTooLongError) {
        return { problem: ui.tooLong(error.needed, error.limit) };
      }
      return { problem: error instanceof Error ? error.message : String(error) };
    }
  }, [payload, ecl, ui]);

  const qr = made && 'qr' in made ? made.qr : null;
  const span = qr ? qr.size + margin * 2 : 0;
  const path = qr ? qrPath(qr, margin) : '';
  const weakContrast = Math.abs(luminance(dark) - luminance(light)) < 0.4;

  /** 내려받기 — a 태그를 만들어 누른다. 서버로 나가는 것은 없다 */
  const save = (href: string, name: string): void => {
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    a.click();
  };

  const saveSvg = (): void => {
    if (!qr) return;
    const svg = qrToSvg(qr, { scale, margin, dark, light });
    save(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, `qr-${format}.svg`);
  };

  const savePng = (): void => {
    if (!qr) return;
    const px = span * scale;
    const canvas = document.createElement('canvas');
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, px, px);
    ctx.fillStyle = dark;
    for (let row = 0; row < qr.size; row++) {
      for (let col = 0; col < qr.size; col++) {
        if (qr.modules[row][col]) ctx.fillRect((col + margin) * scale, (row + margin) * scale, scale, scale);
      }
    }
    save(canvas.toDataURL('image/png'), `qr-${format}.png`);
  };

  const capacity = maxCapacity(ecl, pickMode(payload));

  return (
    <div>
      <div className={CARD}>
        <Picker
          title={ui.formatTitle}
          options={QR_FORMATS}
          labels={QR_FORMATS.map(f => ui.formats[f])}
          value={format}
          onChange={setFormat}
          cols="grid-cols-4"
        />
      </div>

      <div className={`${CARD} mt-4 space-y-3`}>
        {format === 'text' && (
          <InputArea value={text} onChange={setText} rows={4} label={ui.textLabel} lang={lang} placeholder={ui.textPlaceholder} />
        )}

        {format === 'url' && <Field label={ui.urlLabel} value={url} onChange={setUrl} placeholder="vixutil.com/text/qr" />}

        {format === 'wifi' && (
          <>
            <Field label={ui.ssid} value={wifi.ssid} onChange={v => setWifi({ ...wifi, ssid: v })} />
            <Picker
              title={ui.authTitle}
              options={['WPA', 'WEP', 'nopass'] as const}
              labels={ui.auths}
              value={wifi.auth}
              onChange={v => setWifi({ ...wifi, auth: v })}
              cols="grid-cols-3"
            />
            {wifi.auth !== 'nopass' && (
              <Field label={ui.password} value={wifi.password} onChange={v => setWifi({ ...wifi, password: v })} />
            )}
            <label className="flex items-center gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={wifi.hidden}
                onChange={e => setWifi({ ...wifi, hidden: e.target.checked })}
                className="w-4 h-4 accent-indigo-500 shrink-0"
              />
              <span className="text-sm text-slate-700 dark:text-slate-200">{ui.hidden}</span>
            </label>
          </>
        )}

        {format === 'vcard' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label={ui.lastName} value={card.lastName} onChange={v => setCard({ ...card, lastName: v })} />
              <Field label={ui.firstName} value={card.firstName} onChange={v => setCard({ ...card, firstName: v })} />
              <Field label={ui.org} value={card.org} onChange={v => setCard({ ...card, org: v })} />
              <Field label={ui.jobTitle} value={card.title} onChange={v => setCard({ ...card, title: v })} />
            </div>
            <Field label={ui.phone} value={card.phone} onChange={v => setCard({ ...card, phone: v })} type="tel" />
            <Field label={ui.email} value={card.email} onChange={v => setCard({ ...card, email: v })} type="email" />
            <Field label={ui.website} value={card.url} onChange={v => setCard({ ...card, url: v })} />
            <Field label={ui.address} value={card.address} onChange={v => setCard({ ...card, address: v })} />
          </>
        )}

        {format === 'email' && (
          <>
            <Field label={ui.email} value={mail.to} onChange={v => setMail({ ...mail, to: v })} type="email" />
            <Field label={ui.subject} value={mail.subject} onChange={v => setMail({ ...mail, subject: v })} />
            <Field label={ui.body} value={mail.body} onChange={v => setMail({ ...mail, body: v })} />
          </>
        )}

        {format === 'phone' && <Field label={ui.phone} value={tel} onChange={setTel} type="tel" />}

        {format === 'sms' && (
          <>
            <Field label={ui.phone} value={sms.number} onChange={v => setSms({ ...sms, number: v })} type="tel" />
            <Field label={ui.message} value={sms.message} onChange={v => setSms({ ...sms, message: v })} />
          </>
        )}

        {format === 'geo' && (
          <div className="grid grid-cols-2 gap-3">
            <Field label={ui.lat} value={geo.lat} onChange={v => setGeo({ ...geo, lat: v })} placeholder="37.5665" />
            <Field label={ui.lon} value={geo.lon} onChange={v => setGeo({ ...geo, lon: v })} placeholder="126.9780" />
          </div>
        )}
      </div>

      <div className={`${CARD} mt-4 space-y-4`}>
        <div>
          <Picker
            title={ui.eclTitle}
            options={ECL_LIST}
            labels={ECL_LIST}
            value={ecl}
            onChange={setEcl}
            cols="grid-cols-4"
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            {ui.ecls[ECL_LIST.indexOf(ecl)]} · {ui.eclHint}
          </p>
        </div>

        <Picker
          title={ui.sizeTitle}
          options={SCALES}
          labels={SCALES.map(s => `${s}px`)}
          value={scale}
          onChange={setScale}
          cols="grid-cols-4"
        />

        <Picker
          title={ui.marginTitle}
          options={MARGINS}
          labels={MARGINS.map(String)}
          value={margin}
          onChange={setMargin}
          cols="grid-cols-4"
        />

        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.colorTitle}</p>
          <div className="grid grid-cols-2 gap-3">
            {([[ui.darkColor, dark, setDark], [ui.lightColor, light, setLight]] as const).map(([label, value, set]) => (
              <label key={label} className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 cursor-pointer">
                <input
                  type="color"
                  value={value}
                  onChange={e => set(e.target.value)}
                  className="w-7 h-7 rounded border-0 bg-transparent p-0 cursor-pointer shrink-0"
                  aria-label={label}
                />
                <span className="min-w-0">
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500">{label}</span>
                  <span className="block text-xs font-mono text-slate-600 dark:text-slate-300">{value}</span>
                </span>
              </label>
            ))}
          </div>
          {weakContrast && (
            <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-2 leading-relaxed">{ui.lowContrast}</p>
          )}
        </div>
      </div>

      {made && 'problem' in made && (
        <div className="mt-4 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 px-4 py-3 text-sm text-rose-800 dark:text-rose-200 leading-relaxed">
          {made.problem}
        </div>
      )}

      {qr && (
        <>
          <div className={`${CARD} mt-4 flex justify-center`}>
            <svg
              viewBox={`0 0 ${span} ${span}`}
              width={span * scale}
              height={span * scale}
              shapeRendering="crispEdges"
              role="img"
              aria-label={ui.formats[format]}
              className="h-auto max-w-full"
            >
              <rect width={span} height={span} fill={light} />
              <path d={path} fill={dark} />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            <Stat label={ui.version} value={qr.version} accent="text-indigo-600" />
            <Stat label={ui.size} value={`${qr.size}×${qr.size}`} />
            <Stat label={ui.mode} value={ui.modes[qr.mode]} />
            <Stat label={ui.mask} value={qr.mask} />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={savePng}
              className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/30 py-2.5 text-sm font-bold text-indigo-700 dark:text-indigo-300 hover:border-indigo-300 transition-colors"
            >
              {ui.savePng}
            </button>
            <button
              type="button"
              onClick={saveSvg}
              className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/30 py-2.5 text-sm font-bold text-indigo-700 dark:text-indigo-300 hover:border-indigo-300 transition-colors"
            >
              {ui.saveSvg}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">{ui.note}</p>

          <CopyBox
            value={payload}
            label={`${ui.payloadTitle} — ${qr.used}/${capacity}`}
            rows={3}
            mono
            lang={lang}
          />
        </>
      )}

      {!made && (
        <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-10 text-center text-sm text-slate-300 dark:text-slate-600">
          {ui.empty}
        </div>
      )}
    </div>
  );
}
