import ToolIcon from '@/components/ToolIcon';
import { ALL_LOCALES10 } from '@/lib/locales';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import ChecklistEngine from '@/components/ChecklistEngine';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ_INTL } from '@/lib/section-faq-intl';
import { checklistFaqIntl } from '@/lib/content-faq-intl';
import { CHECKLISTS_INTL, CHECKLISTS_INTL_MAP, type ChecklistIntlLang } from '@/lib/checklist-l10n/index';
import { localeTag } from '@/lib/locales';
import { localeAlternates, hubAlternates } from '@/lib/locale-alternates';
import type { Checklist } from '@/lib/types';

/**
 * 한국어를 뺀 아홉 언어의 체크리스트 허브와 개별 페이지.
 *
 * 심리테스트·퀴즈와 같은 이유로 화면은 한 벌만 둔다([[components/TestIntlPage.tsx]]).
 * 한국어(app/checklist)는 128종이라 목록 구조부터 달라서 자기 화면을 쓴다.
 *
 * 카드 제목에서 "체크리스트"라는 낱말을 떼는 것은 언어마다 다르다 — 영어는
 * ' Checklist'가 뒤에 붙지만 스페인어는 'Lista para …'처럼 앞에 온다. 그래서
 * 잘라낼 문자열을 언어별로 적어 두고, 없으면 제목을 그대로 쓴다.
 */

const CARD_GRADIENTS = [
  'from-sky-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600',
  'from-amber-400 to-orange-500', 'from-rose-500 to-pink-600', 'from-cyan-500 to-sky-600',
];

const UI: Record<ChecklistIntlLang, {
  eyebrow: string; nav: string; h1: string; leadA: string; leadB: string; leadC: string;
  foot: string; more: string; metaTitle: string; metaDesc: string; home: string; crumb: string;
  /** 카드 제목에서 떼어낼 낱말. 없으면 제목 그대로 */
  trim?: string;
  detailTitle: (t: string, n: number) => string;
  detailDesc: (d: string, n: number) => string;
}> = {
  'en': {
    eyebrow: 'Checklists', nav: 'Checklists', h1: 'Free Checklists',
    leadA: 'Tick things off as you go — ', leadB: 'progress saves in your browser', leadC: ', no account needed.',
    foot: 'Free interactive checklists', more: 'More checklists', home: 'Home', crumb: 'Checklists',
    trim: ' Checklist',
    metaTitle: 'Free Checklists — Moving, Travel, Work, Health & More',
    metaDesc: 'Free interactive checklists for moving house, international travel, job interviews, camping, weddings and more. Tick items off, progress saves automatically.',
    detailTitle: (t, n) => `${t} — ${n} Things to Tick Off`,
    detailDesc: (d, n) => `${d}. ${n} items, progress saved in your browser. Free, no sign-up.`,
  },
  'es': {
    eyebrow: 'Listas', nav: 'Listas', h1: 'Listas de comprobación gratis',
    leadA: 'Ve marcando lo que haces — ', leadB: 'el progreso se guarda en tu navegador', leadC: ', sin cuenta.',
    foot: 'Listas interactivas gratis', more: 'Más listas', home: 'Inicio', crumb: 'Listas',
    trim: 'Lista para ',
    metaTitle: 'Listas de comprobación gratis — mudanza, viajes, trabajo, salud y más',
    metaDesc: 'Listas interactivas gratis para la mudanza, viajar al extranjero, entrevistas de trabajo, acampada, bodas y más. Ve marcando: el progreso se guarda solo.',
    detailTitle: (t, n) => `${t} — ${n} cosas que marcar`,
    detailDesc: (d, n) => `${d}. ${n} puntos, el progreso se guarda en tu navegador. Gratis, sin registro.`,
  },
  'pt-br': {
    eyebrow: 'Checklists', nav: 'Checklists', h1: 'Checklists grátis',
    leadA: 'Vá marcando conforme avança — ', leadB: 'o progresso fica salvo no navegador', leadC: ', sem conta.',
    foot: 'Checklists interativos grátis', more: 'Mais checklists', home: 'Início', crumb: 'Checklists',
    trim: 'Checklist de ',
    metaTitle: 'Checklists grátis — mudança, viagem, trabalho, saúde e mais',
    metaDesc: 'Checklists interativos grátis para mudança, viagem internacional, entrevista de emprego, acampamento, casamento e mais. Vá marcando: o progresso salva sozinho.',
    detailTitle: (t, n) => `${t} — ${n} itens para marcar`,
    detailDesc: (d, n) => `${d}. ${n} itens, progresso salvo no navegador. Grátis, sem cadastro.`,
  },
  'ja': {
    eyebrow: 'チェックリスト', nav: 'チェックリスト', h1: '無料のチェックリスト',
    leadA: '進めながらチェックを入れてください。', leadB: '進み具合はブラウザに保存されます', leadC: '。登録は不要です。',
    foot: '無料のチェックリスト', more: 'ほかのチェックリスト', home: 'ホーム', crumb: 'チェックリスト',
    trim: 'チェックリスト',
    metaTitle: '無料のチェックリスト — 引っ越し・旅行・仕事・健康ほか',
    metaDesc: '引っ越し、海外旅行、面接、キャンプ、結婚式などの無料チェックリスト。チェックを入れるだけで進み具合が自動保存されます。',
    detailTitle: (t, n) => `${t} — 確認する${n}項目`,
    detailDesc: (d, n) => `${d}。全${n}項目、進み具合はブラウザに保存。登録不要で無料です。`,
  },
  'de': {
    eyebrow: 'Checklisten', nav: 'Checklisten', h1: 'Kostenlose Checklisten',
    leadA: 'Hak ab, was erledigt ist — ', leadB: 'der Fortschritt bleibt im Browser gespeichert', leadC: ', ohne Konto.',
    foot: 'Kostenlose interaktive Checklisten', more: 'Mehr Checklisten', home: 'Start', crumb: 'Checklisten',
    trim: '-Checkliste',
    metaTitle: 'Kostenlose Checklisten — Umzug, Reise, Arbeit, Gesundheit und mehr',
    metaDesc: 'Kostenlose interaktive Checklisten für Umzug, Auslandsreise, Vorstellungsgespräch, Camping, Hochzeit und mehr. Abhaken genügt, der Fortschritt speichert sich automatisch.',
    detailTitle: (t, n) => `${t} — ${n} Punkte zum Abhaken`,
    detailDesc: (d, n) => `${d}. ${n} Punkte, Fortschritt im Browser gespeichert. Kostenlos, ohne Anmeldung.`,
  },
  'fr': {
    eyebrow: 'Checklists', nav: 'Checklists', h1: 'Checklists gratuites',
    leadA: 'Coche au fur et à mesure — ', leadB: 'la progression est enregistrée dans ton navigateur', leadC: ', sans compte.',
    foot: 'Checklists interactives gratuites', more: 'Plus de checklists', home: 'Accueil', crumb: 'Checklists',
    trim: 'Checklist de ',
    metaTitle: 'Checklists gratuites — déménagement, voyage, travail, santé et plus',
    metaDesc: 'Checklists interactives gratuites pour le déménagement, un voyage à l’étranger, un entretien d’embauche, le camping, un mariage et plus. Coche : la progression se sauvegarde toute seule.',
    detailTitle: (t, n) => `${t} — ${n} points à cocher`,
    detailDesc: (d, n) => `${d}. ${n} points, progression enregistrée dans ton navigateur. Gratuit, sans inscription.`,
  },
  'hi': {
    eyebrow: 'चेकलिस्ट', nav: 'चेकलिस्ट', h1: 'मुफ़्त चेकलिस्ट',
    leadA: 'जैसे-जैसे काम हो, टिक करते जाइए — ', leadB: 'प्रगति आपके ब्राउज़र में सेव रहती है', leadC: ', खाता बनाने की ज़रूरत नहीं।',
    foot: 'मुफ़्त इंटरैक्टिव चेकलिस्ट', more: 'और चेकलिस्ट', home: 'होम', crumb: 'चेकलिस्ट',
    trim: ' की चेकलिस्ट',
    metaTitle: 'मुफ़्त चेकलिस्ट — घर बदलना, यात्रा, काम, सेहत और बहुत कुछ',
    metaDesc: 'घर बदलने, विदेश यात्रा, नौकरी के इंटरव्यू, कैंपिंग, शादी और बहुत कुछ के लिए मुफ़्त इंटरैक्टिव चेकलिस्ट। टिक करते जाइए, प्रगति अपने आप सेव होती है।',
    detailTitle: (t, n) => `${t} — टिक करने के लिए ${n} बातें`,
    detailDesc: (d, n) => `${d}। ${n} बिंदु, प्रगति ब्राउज़र में सेव। मुफ़्त, बिना रजिस्ट्रेशन।`,
  },
  'zh-hans': {
    eyebrow: '清单', nav: '清单', h1: '免费清单',
    leadA: '边做边打勾 — ', leadB: '进度保存在你的浏览器里', leadC: '，不用注册账号。',
    foot: '免费的互动清单', more: '别的清单', home: '首页', crumb: '清单',
    trim: '清单',
    metaTitle: '免费清单 — 搬家、旅行、工作、健康等',
    metaDesc: '搬家、出国旅行、求职面试、露营、婚礼等的免费互动清单。打勾即可，进度自动保存。',
    detailTitle: (t, n) => `${t} — ${n}项要确认`,
    detailDesc: (d, n) => `${d}。共${n}项，进度保存在浏览器里。免费，不用注册。`,
  },
  'zh-hant': {
    eyebrow: '清單', nav: '清單', h1: '免費清單',
    leadA: '邊做邊打勾 — ', leadB: '進度保存在你的瀏覽器裡', leadC: '，不用註冊帳號。',
    foot: '免費的互動清單', more: '別的清單', home: '首頁', crumb: '清單',
    trim: '清單',
    metaTitle: '免費清單 — 搬家、旅行、工作、健康等',
    metaDesc: '搬家、出國旅行、求職面試、露營、婚禮等的免費互動清單。打勾即可，進度自動儲存。',
    detailTitle: (t, n) => `${t} — ${n}項要確認`,
    detailDesc: (d, n) => `${d}。共${n}項，進度保存在瀏覽器裡。免費，不用註冊。`,
  },
};

/*
 * 허브는 열 언어, 상세는 아홉 언어다.
 *
 * 항목 목록을 언어마다 따로 썼기 때문에 한국어와 번역판은 겹치는 슬러그가
 * 하나도 없다 — 상세에서 한국어를 띄우면 전부 404다. 하지만 허브 자체는
 * 열 언어에 다 있으므로, 여기까지 아홉 개로 두면 한국어에서 건너간 사람이
 * 돌아올 길이 없어진다. 실제로 그 상태였다.
 */
const HUB_LANGS = ALL_LOCALES10;
const INTL_LANGS = Object.keys(CHECKLISTS_INTL) as ChecklistIntlLang[];
const countOf = (c: Checklist) => c.sections.reduce((s, sec) => s + sec.items.length, 0);

/** 카드에 넣을 짧은 제목. 떼어낼 낱말이 없으면 제목 그대로 둔다. */
function shortTitle(title: string, trim?: string) {
  if (!trim) return title;
  const cut = title.replace(trim, '').trim();
  return cut.length >= 2 ? cut : title;
}

export function checklistIntlMeta(lang: ChecklistIntlLang) {
  const ui = UI[lang];
  return {
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: {
      canonical: `/${lang}/checklist`,
      // 한국어 허브까지 넣는다 — 상호 선언이 아니면 구글이 무시한다
      languages: hubAlternates('checklist'),
    },
  };
}

export function ChecklistIntlHub({ lang }: { lang: ChecklistIntlLang }) {
  const ui = UI[lang];
  const lists = CHECKLISTS_INTL[lang];
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      {/* 한국어 허브가 내던 구조화 데이터를 아홉 언어에도 낸다 — 목록 페이지는
          CollectionPage와 ItemList가 있어야 검색 결과에서 목록으로 읽힌다 */}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}` },
          { name: ui.crumb, path: `/${lang}/checklist` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          ui.crumb,
          `/${lang}/checklist`,
          CHECKLISTS_INTL[lang].map(x => ({ name: x.title, path: `/${lang}/checklist/${x.slug}` })),
        )}
      />
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}/checklist`} className="font-black text-sky-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.nav}</span>
          <span className="ml-auto flex items-center gap-2">
            <LangPicker current={lang} route="/checklist" available={HUB_LANGS} />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.h1}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          {ui.leadA}<strong className="text-slate-700 dark:text-slate-200">{ui.leadB}</strong>{ui.leadC}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {lists.map((c, i) => (
            <Link key={c.slug} href={`/${lang}/checklist/${c.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between">
                <ToolIcon emoji={c.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{countOf(c)}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{shortTitle(c.title, ui.trim)}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 한국어 허브에만 있던 FAQ를 아홉 언어에도 붙인다 — FAQPage 구조화 데이터가
            함께 나가야 검색 결과에서 접힘 항목을 받을 수 있다 */}
        <Faq items={SECTION_FAQ_INTL[lang].checklist} lang={lang} />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-sky-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </div>
  );
}

export function checklistIntlDetailMeta(lang: ChecklistIntlLang, slug: string) {
  const checklist = CHECKLISTS_INTL_MAP[lang][slug];
  if (!checklist) return {};
  const ui = UI[lang];
  const n = countOf(checklist);
  return {
    title: ui.detailTitle(checklist.title, n),
    description: ui.detailDesc(checklist.desc, n),
    alternates: {
      canonical: `/${lang}/checklist/${slug}`,
      // 한국어에 같은 슬러그가 있으면 그것까지 넣는다 — 상호 선언이 아니면
      // 구글이 무시한다. 어느 언어에 실제로 있는지는 이 함수가 안다.
      languages: localeAlternates('checklist', slug),
    },
  };
}

export function ChecklistIntlDetail({ lang, checklist }: { lang: ChecklistIntlLang; checklist: Checklist }) {
  const ui = UI[lang];
  const others = CHECKLISTS_INTL[lang].filter(c => c.slug !== checklist.slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}/checklist` },
          { name: ui.crumb, path: `/${lang}/checklist` },
          { name: checklist.title, path: `/${lang}/checklist/${checklist.slug}` },
        ])}
      />
      <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
        <LangPicker current={lang} route={`/checklist/${checklist.slug}`} available={INTL_LANGS} />
      </div>
      <ChecklistEngine checklist={checklist} lang={lang} />
      <div className="max-w-lg mx-auto px-4 w-full">
        {/* 상세 FAQ도 한국어에만 있었다. 데이터에서 만들어 페이지마다 답이 달라진다 */}
        <Faq items={checklistFaqIntl(lang, checklist)} lang={lang} className="" />
      </div>
      <div className="max-w-lg mx-auto px-4 w-full pb-10 pt-8">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">{ui.more}</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/${lang}/checklist/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={`/${lang}/checklist`} className="text-sm font-black text-sky-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </>
  );
}
