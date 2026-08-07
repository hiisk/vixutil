import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import EnGeneratorEngine from '@/components/EnGeneratorEngine';
import ReferralCards from '@/components/ReferralCards';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { thumbGradient } from '@/lib/thumbnail';
import { GENERATORS_INTL, GENERATORS_INTL_MAP, type GeneratorIntlLang } from '@/lib/generator-l10n';
import { alternateLanguages10 } from '@/lib/locales';
import type { Generator } from '@/lib/types';

/**
 * 한국어·영어를 뺀 여덟 언어의 생성기 허브와 개별 페이지.
 *
 * 영어는 이미 `app/en/generator/*`가 손으로 쓰여 있어 그대로 둔다 — 그 페이지에는
 * 영어 전용 SEO 문단이 붙어 있어서 옮겨 담으면 오히려 잃는 것이 있다.
 * 나머지 여덟은 여기 한 벌을 공유한다.
 */

const UI: Record<GeneratorIntlLang, {
  eyebrow: string; nav: string; h1: string; lead: string; foot: string; more: string;
  metaTitle: string; metaDesc: string; home: string; crumb: string;
  detailTitle: (t: string) => string; detailDesc: (d: string) => string;
  about: (t: string) => string; aboutBody: (t: string) => string;
  faq: (g: { title: string; count: number }) => { q: string; a: string }[];
}> = {
  es: {
    eyebrow: 'Generadores', nav: 'Generadores', h1: 'Generadores de nombres gratis',
    lead: 'Pulsa una vez y salen ideas listas para usar. Sin registro y sin límite.',
    foot: 'Generadores de nombres gratis', more: 'Más generadores', home: 'Inicio', crumb: 'Generadores',
    metaTitle: 'Generadores de nombres gratis — fantasía, ciencia ficción y más',
    metaDesc: 'Generadores de nombres en línea y gratis: fantasía, ciencia ficción, dragones, superhéroes, villanos, gremios, piratas y más. Al instante, sin límite y sin registro.',
    detailTitle: t => `${t} — gratis y al instante`,
    detailDesc: d => `${d} Genera ideas únicas con un clic: gratis y sin registro.`,
    about: t => `Sobre este ${t.toLowerCase()}`,
    aboutBody: t => `Este ${t.toLowerCase()} gratuito crea ideas únicas al momento. Pulsa Generar tantas veces como quieras, cambia cualquier resultado suelto y copia los que te gusten. Va bien para juegos, relatos, personajes, nombres de usuario y construcción de mundos. Sin registro y sin límites.`,
    faq: g => [
      { q: `¿Cuántos nombres salen de una vez?`, a: `${g.count} por pulsación, y puedes volver a pulsar sin límite. También puedes cambiar solo uno sin perder los demás.` },
      { q: '¿Los nombres se repiten?', a: 'Dentro de una misma tanda no se repiten. Entre tandas puede coincidir alguno, porque se combinan a partir de las mismas listas.' },
      { q: '¿Puedo usarlos para algo comercial?', a: 'Sí. Son combinaciones generadas, no obras protegidas. Aun así, comprueba que el nombre no esté ya registrado como marca antes de usarlo en un producto.' },
    ],
  },
  'pt-br': {
    eyebrow: 'Geradores', nav: 'Geradores', h1: 'Geradores de nomes grátis',
    lead: 'Um toque e saem ideias prontas para usar. Sem cadastro e sem limite.',
    foot: 'Geradores de nomes grátis', more: 'Mais geradores', home: 'Início', crumb: 'Geradores',
    metaTitle: 'Geradores de nomes grátis — fantasia, ficção científica e mais',
    metaDesc: 'Geradores de nomes online e grátis: fantasia, ficção científica, dragões, super-heróis, vilões, guildas, piratas e mais. Na hora, sem limite e sem cadastro.',
    detailTitle: t => `${t} — grátis e na hora`,
    detailDesc: d => `${d} Gere ideias únicas com um clique: grátis, sem cadastro.`,
    about: t => `Sobre este ${t.toLowerCase()}`,
    aboutBody: t => `Este ${t.toLowerCase()} gratuito cria ideias únicas na hora. Toque em Gerar quantas vezes quiser, troque qualquer resultado sozinho e copie os que gostar. Bom para jogos, histórias, personagens, nomes de usuário e construção de mundos. Sem cadastro e sem limites.`,
    faq: g => [
      { q: 'Quantos nomes saem de uma vez?', a: `${g.count} por toque, e dá para repetir sem limite. Também dá para trocar só um sem perder os outros.` },
      { q: 'Os nomes se repetem?', a: 'Dentro da mesma rodada não. Entre rodadas pode coincidir, porque tudo é combinado a partir das mesmas listas.' },
      { q: 'Posso usar comercialmente?', a: 'Pode. São combinações geradas, não obras protegidas. Ainda assim, confira se o nome já não é uma marca registrada antes de usar num produto.' },
    ],
  },
  ja: {
    eyebrow: 'ジェネレーター', nav: 'ジェネレーター', h1: '無料の名前ジェネレーター',
    lead: '一度押すだけで、そのまま使える案が出ます。登録も上限もありません。',
    foot: '無料の名前ジェネレーター', more: 'ほかのジェネレーター', home: 'ホーム', crumb: 'ジェネレーター',
    metaTitle: '無料の名前ジェネレーター — ファンタジー・SFほか',
    metaDesc: '無料のオンライン名前ジェネレーター。ファンタジー、SF、ドラゴン、ヒーロー、悪役、ギルド、海賊などの名前をその場で、回数制限なく、登録不要で作れます。',
    detailTitle: t => `${t} — 無料ですぐ`,
    detailDesc: d => `${d} ワンクリックで重ならない案を作ります。登録不要で無料です。`,
    about: t => `${t}について`,
    aboutBody: t => `この${t}は無料で、押すたびに新しい案を作ります。何度でも押せますし、気に入らない一つだけを引き直すことも、気に入ったものをコピーすることもできます。ゲーム、物語、キャラクター、ハンドルネーム、世界観づくりに向いています。登録も上限もありません。`,
    faq: g => [
      { q: '一度に何個出ますか。', a: `1回で${g.count}個です。回数の制限はありません。ほかを残したまま一つだけ引き直すこともできます。` },
      { q: '同じ名前が出ることはありますか。', a: '同じ回の中では重複しません。回をまたぐと同じものが出ることはあります — 同じ語の組み合わせから作っているためです。' },
      { q: '商用に使えますか。', a: '使えます。組み合わせで作られたもので、著作物ではありません。ただし商品名にする前に、その名前が商標として登録されていないかは確かめてください。' },
    ],
  },
  de: {
    eyebrow: 'Generatoren', nav: 'Generatoren', h1: 'Kostenlose Namensgeneratoren',
    lead: 'Einmal tippen und es kommen brauchbare Vorschläge. Ohne Anmeldung, ohne Limit.',
    foot: 'Kostenlose Namensgeneratoren', more: 'Mehr Generatoren', home: 'Start', crumb: 'Generatoren',
    metaTitle: 'Kostenlose Namensgeneratoren — Fantasy, Sci-Fi und mehr',
    metaDesc: 'Kostenlose Online-Namensgeneratoren: Fantasy, Sci-Fi, Drachen, Superhelden, Schurken, Gilden, Piraten und mehr. Sofort, unbegrenzt und ohne Anmeldung.',
    detailTitle: t => `${t} — kostenlos und sofort`,
    detailDesc: d => `${d} Mit einem Klick eigene Vorschläge erzeugen — kostenlos, ohne Anmeldung.`,
    about: t => `Über diesen ${t}`,
    aboutBody: t => `Dieser kostenlose ${t} erzeugt sofort eigene Vorschläge. Tippe so oft auf Generieren, wie du magst, würfle einzelne Ergebnisse neu und kopiere deine Favoriten. Gut für Spiele, Geschichten, Figuren, Nicknames und Worldbuilding. Ohne Anmeldung, ohne Limit.`,
    faq: g => [
      { q: 'Wie viele Namen kommen auf einmal?', a: `${g.count} pro Klick, und du kannst beliebig oft neu klicken. Einzelne lassen sich auch neu würfeln, ohne die anderen zu verlieren.` },
      { q: 'Wiederholen sich Namen?', a: 'Innerhalb eines Durchgangs nicht. Über mehrere Durchgänge kann sich etwas wiederholen, weil alles aus denselben Wortlisten kombiniert wird.' },
      { q: 'Darf ich die Namen kommerziell nutzen?', a: 'Ja. Es sind erzeugte Kombinationen, keine geschützten Werke. Prüfe vor einer Produktverwendung trotzdem, ob der Name bereits als Marke eingetragen ist.' },
    ],
  },
  fr: {
    eyebrow: 'Générateurs', nav: 'Générateurs', h1: 'Générateurs de noms gratuits',
    lead: 'Un clic et des idées utilisables sortent. Sans inscription, sans limite.',
    foot: 'Générateurs de noms gratuits', more: 'Plus de générateurs', home: 'Accueil', crumb: 'Générateurs',
    metaTitle: 'Générateurs de noms gratuits — fantasy, science-fiction et plus',
    metaDesc: 'Générateurs de noms en ligne et gratuits : fantasy, science-fiction, dragons, super-héros, méchants, guildes, pirates et plus. Instantané, illimité, sans inscription.',
    detailTitle: t => `${t} — gratuit et instantané`,
    detailDesc: d => `${d} Génère des idées uniques en un clic : gratuit, sans inscription.`,
    about: t => `À propos de ce ${t.toLowerCase()}`,
    aboutBody: t => `Ce ${t.toLowerCase()} gratuit crée des idées uniques à la volée. Appuie sur Générer autant de fois que tu veux, relance un résultat isolé et copie ceux que tu préfères. Pratique pour les jeux, les récits, les personnages, les pseudos et la création d’univers. Sans inscription ni limite.`,
    faq: g => [
      { q: 'Combien de noms sortent d’un coup ?', a: `${g.count} par clic, et tu peux relancer autant que tu veux. Tu peux aussi n’en relancer qu’un sans perdre les autres.` },
      { q: 'Les noms se répètent-ils ?', a: 'Pas au sein d’un même tirage. D’un tirage à l’autre, une répétition est possible : tout vient des mêmes listes de mots.' },
      { q: 'Puis-je les utiliser commercialement ?', a: 'Oui. Ce sont des combinaisons générées, pas des œuvres protégées. Vérifie tout de même que le nom n’est pas déjà déposé comme marque avant de l’utiliser pour un produit.' },
    ],
  },
  hi: {
    eyebrow: 'जनरेटर', nav: 'जनरेटर', h1: 'मुफ़्त नाम जनरेटर',
    lead: 'एक बार दबाइए और काम लायक़ नाम निकल आते हैं। न रजिस्ट्रेशन, न कोई सीमा।',
    foot: 'मुफ़्त नाम जनरेटर', more: 'और जनरेटर', home: 'होम', crumb: 'जनरेटर',
    metaTitle: 'मुफ़्त नाम जनरेटर — फैंटेसी, साइ-फ़ाई और बहुत कुछ',
    metaDesc: 'मुफ़्त ऑनलाइन नाम जनरेटर: फैंटेसी, साइ-फ़ाई, ड्रैगन, सुपरहीरो, विलेन, गिल्ड, समुद्री डाकू और बहुत कुछ। तुरंत, बिना सीमा, बिना रजिस्ट्रेशन।',
    detailTitle: t => `${t} — मुफ़्त और तुरंत`,
    detailDesc: d => `${d} एक क्लिक में अलग-अलग नाम बनाइए — मुफ़्त, बिना रजिस्ट्रेशन।`,
    about: t => `${t} के बारे में`,
    aboutBody: t => `यह मुफ़्त ${t} तुरंत नए नाम बना देता है। जितनी बार चाहें दबाइए, किसी एक नतीजे को अलग से बदलिए, और जो पसंद आए उसे कॉपी कर लीजिए। खेल, कहानियाँ, किरदार, यूज़रनेम और दुनिया गढ़ने में काम आता है। न रजिस्ट्रेशन, न कोई सीमा।`,
    faq: g => [
      { q: 'एक बार में कितने नाम आते हैं?', a: `हर क्लिक पर ${g.count}, और जितनी बार चाहें दोबारा कर सकते हैं। बाक़ी को बिना छेड़े सिर्फ़ एक को भी बदला जा सकता है।` },
      { q: 'क्या नाम दोहराए जाते हैं?', a: 'एक ही बार में नहीं। अलग-अलग बार में कोई नाम दोहरा सकता है, क्योंकि सब उन्हीं शब्द-सूचियों से जुड़कर बनते हैं।' },
      { q: 'क्या इन्हें व्यावसायिक रूप से इस्तेमाल कर सकते हैं?', a: 'हाँ। ये बनाए गए मेल हैं, कोई कॉपीराइट वाली रचना नहीं। फिर भी किसी उत्पाद पर लगाने से पहले देख लें कि वह नाम पहले से ट्रेडमार्क तो नहीं है।' },
    ],
  },
  'zh-hans': {
    eyebrow: '生成器', nav: '生成器', h1: '免费名字生成器',
    lead: '点一下就出能直接用的名字。不用注册，也没有次数限制。',
    foot: '免费名字生成器', more: '别的生成器', home: '首页', crumb: '生成器',
    metaTitle: '免费名字生成器 — 奇幻、科幻等',
    metaDesc: '免费在线名字生成器：奇幻、科幻、巨龙、超级英雄、反派、公会、海盗等。即时出结果，不限次数，不用注册。',
    detailTitle: t => `${t} — 免费即时`,
    detailDesc: d => `${d} 一键生成不重样的名字，免费且不用注册。`,
    about: t => `关于这个${t}`,
    aboutBody: t => `这个免费的${t}点一下就出新名字。想点几次就点几次，可以单独重摇某一个，也可以把喜欢的复制下来。做游戏、写故事、取角色名、起用户名、搭设定都好用。不用注册，没有上限。`,
    faq: g => [
      { q: '一次出几个？', a: `每点一次出${g.count}个，次数不限。也可以只重摇其中一个，其余保持不变。` },
      { q: '会出重复的名字吗？', a: '同一次里不会重复。多点几次之后可能碰上一样的，因为都是从同一批词里组合出来的。' },
      { q: '可以商用吗？', a: '可以。这些是组合生成的结果，不是受版权保护的作品。不过用在产品上之前，最好确认这个名字没有被注册成商标。' },
    ],
  },
  'zh-hant': {
    eyebrow: '產生器', nav: '產生器', h1: '免費名字產生器',
    lead: '按一下就出能直接用的名字。不用註冊，也沒有次數限制。',
    foot: '免費名字產生器', more: '別的產生器', home: '首頁', crumb: '產生器',
    metaTitle: '免費名字產生器 — 奇幻、科幻等',
    metaDesc: '免費線上名字產生器：奇幻、科幻、巨龍、超級英雄、反派、公會、海盜等。即時出結果，不限次數，不用註冊。',
    detailTitle: t => `${t} — 免費即時`,
    detailDesc: d => `${d} 一鍵產生不重複的名字，免費且不用註冊。`,
    about: t => `關於這個${t}`,
    aboutBody: t => `這個免費的${t}按一下就出新名字。想按幾次就按幾次，可以單獨重擲某一個，也可以把喜歡的複製下來。做遊戲、寫故事、取角色名、起帳號名、建設定都好用。不用註冊，沒有上限。`,
    faq: g => [
      { q: '一次出幾個？', a: `每按一次出${g.count}個，次數不限。也可以只重擲其中一個，其餘保持不變。` },
      { q: '會出重複的名字嗎？', a: '同一次裡不會重複。多按幾次之後可能碰上一樣的，因為都是從同一批詞裡組合出來的。' },
      { q: '可以商用嗎？', a: '可以。這些是組合產生的結果，不是受著作權保護的作品。不過用在產品上之前，最好確認這個名字沒有被註冊成商標。' },
    ],
  },
};

/**
 * 여덟 언어 + 영어가 같은 스무 종을 가진다. 한국어는 이백 종이 넘고 그 스무 개를
 * 모두 품고 있어서, 어느 상세 페이지에서 넘어가도 같은 슬러그가 있다.
 */
export const GENERATOR_LANGS = [...(Object.keys(GENERATORS_INTL) as GeneratorIntlLang[]), 'en', 'ko'] as const;
const countOf = (g: Generator) => g.count ?? 6;

export function generatorIntlMeta(lang: GeneratorIntlLang) {
  const ui = UI[lang];
  return {
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: { canonical: `/${lang}/generator`, languages: alternateLanguages10('/generator') },
  };
}

export function GeneratorIntlHub({ lang }: { lang: GeneratorIntlLang }) {
  const ui = UI[lang];
  const gens = GENERATORS_INTL[lang];
  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: `/${lang}` }, { name: ui.crumb, path: `/${lang}/generator` }])} />
      <JsonLd data={itemListJsonLd(ui.crumb, `/${lang}/generator`, gens.map(g => ({ name: g.title, path: `/${lang}/generator/${g.slug}` })))} />
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}/generator`} className="font-black text-emerald-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.nav}</span>
          <span className="ml-auto flex items-center gap-2">
            <LangPicker current={lang} route="/generator" available={GENERATOR_LANGS} />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.h1}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{ui.lead}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gens.map(g => (
            <Link key={g.slug} href={`/${lang}/generator/${g.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thumbGradient(g.slug, 'generator')} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <ToolIcon emoji={g.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{g.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{g.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-emerald-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </div>
  );
}

export function generatorIntlDetailMeta(lang: GeneratorIntlLang, slug: string) {
  const gen = GENERATORS_INTL_MAP[lang][slug];
  if (!gen) return {};
  const ui = UI[lang];
  return {
    title: ui.detailTitle(gen.title),
    description: ui.detailDesc(gen.desc),
    alternates: { canonical: `/${lang}/generator/${slug}`, languages: alternateLanguages10(`/generator/${slug}`) },
  };
}

export function GeneratorIntlDetail({ lang, gen }: { lang: GeneratorIntlLang; gen: Generator }) {
  const ui = UI[lang];
  const others = GENERATORS_INTL[lang].filter(g => g.slug !== gen.slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}/generator` },
          { name: ui.crumb, path: `/${lang}/generator` },
          { name: gen.title, path: `/${lang}/generator/${gen.slug}` },
        ])}
      />
      <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
        <LangPicker current={lang} route={`/generator/${gen.slug}`} available={GENERATOR_LANGS} />
      </div>
      <EnGeneratorEngine gen={gen} lang={lang} />

      <div className="max-w-lg mx-auto px-4 w-full pb-12">
        <div className="mb-8">
          <ReferralCards lang={lang} placement="result" />
        </div>

        <section className="prose-sm text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-2">{ui.about(gen.title)}</h2>
          <p>{ui.aboutBody(gen.title)}</p>
        </section>

        <Faq items={ui.faq({ title: gen.title, count: countOf(gen) })} lang={lang} className="" />

        <div className="pt-8">
          <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">{ui.more}</h2>
          <div className="grid grid-cols-2 gap-2">
            {others.map(o => (
              <Link key={o.slug} href={`/${lang}/generator/${o.slug}`}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={`/${lang}/generator`} className="text-sm font-black text-emerald-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </>
  );
}
