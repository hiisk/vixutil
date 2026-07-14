'use client';

import Link from 'next/link';
import { useState } from 'react';
import PageGlow from '@/components/PageGlow';

/* ── 計算機データ（日本語） ── */
const CATS = [
  {
    id: 'worker', label: '給与・社会保険', icon: '👔',
    desc: '給与・手当・保険関連の計算機',
    accent: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    calcs: [
      { href: '/calculator/salary',          title: '手取り計算機',         desc: '年収 → 控除後の月手取り額', hot: true },
      { href: '/calculator/weekly-holiday',  title: '週休手当計算機',       desc: '時給・週勤務時間 → 週休手当・月給' },
      { href: '/calculator/annual-leave-pay',title: '有給休暇手当計算機',   desc: '月給・未使用有給 → 有給手当' },
      { href: '/calculator/four-insurance',  title: '社会保険計算機',       desc: '月給 → 社会保険の詳細内訳' },
      { href: '/calculator/minimum-wage',    title: '最低賃金計算機',       desc: '2026年最低賃金基準の月給' },
      { href: '/calculator/parttime',        title: 'アルバイト給与計算機', desc: '時給・勤務日数 → 週給・月給' },
      { href: '/calculator/overtime',        title: '残業代計算機',         desc: '標準時給・残業時間 → 残業代' },
      { href: '/calculator/to-hourly',       title: '時給換算計算機',       desc: '月給 → 時給換算' },
      { href: '/calculator/to-annual',       title: '年収換算計算機',       desc: '月給 → 年収換算' },
      { href: '/calculator/standard-wage',   title: '通常賃金計算機',       desc: '基本給・固定手当 → 通常賃金' },
      { href: '/calculator/severance',       title: '退職金計算機',         desc: '平均賃金＋賞与＋有給 → 法定退職金' },
    ],
  },
  {
    id: 'tax', label: '税金', icon: '🧾',
    desc: '各種税金計算機',
    accent: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
    calcs: [
      { href: '/calculator/freelance',         title: 'フリーランス税金計算機', desc: '収入 → 3.3% 源泉徴収', hot: true },
      { href: '/calculator/vat',               title: '消費税計算機',           desc: '税抜金額 ↔ 消費税計算' },
      { href: '/calculator/business-income',   title: '事業所得税計算機',       desc: '事業所得 → 予想税額' },
      { href: '/calculator/comprehensive-tax', title: '総合所得税計算機',       desc: '年収 → 予想総合所得税' },
      { href: '/calculator/capital-gains',     title: '譲渡所得税計算機',       desc: '取得価格・譲渡価格 → 予想税額' },
      { href: '/calculator/gift-tax',          title: '贈与税計算機',           desc: '贈与金額・続柄 → 予想贈与税' },
      { href: '/calculator/inheritance-tax',   title: '相続税計算機',           desc: '相続財産 → 予想相続税' },
      { href: '/calculator/local-income-tax',  title: '地方所得税計算機',       desc: '所得税 → 地方所得税計算' },
    ],
  },
  {
    id: 'finance', label: '金融・投資', icon: '📈',
    desc: '投資・貯蓄・ローン計算機',
    accent: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
    calcs: [
      { href: '/calculator/compound',       title: '複利計算機',           desc: '月複利・四半期・年複利＋年度別テーブル', hot: true },
      { href: '/calculator/loan',           title: 'ローン返済計算機',     desc: '元利均等・元金均等＋返済スケジュール' },
      { href: '/calculator/deposit',        title: '定期預金計算機',       desc: '預入金・金利・期間 → 利息' },
      { href: '/calculator/savings',        title: '積立計算機',           desc: '月次積立・金利 → 満期金額' },
      { href: '/calculator/roi',            title: '投資収益率計算機',     desc: '購入・売却価格 → 収益率' },
      { href: '/calculator/avg-price',      title: '平均取得単価計算機',   desc: '複数回購入 → 平均単価' },
      { href: '/calculator/breakeven',      title: '損益分岐点計算機',     desc: '手数料含む損益分岐点' },
      { href: '/calculator/compound-goal',  title: '複利目標計算機',       desc: '目標金額までの必要期間' },
      { href: '/calculator/dividend',       title: '配当金計算機',         desc: '配当利回り → 予想配当金' },
      { href: '/calculator/max-loan',       title: '借入可能額計算機',     desc: '収入基準の最大借入額' },
      { href: '/calculator/dsr',            title: 'DSR計算機',            desc: '返済負担率計算' },
      { href: '/calculator/ltv',            title: 'LTV計算機',            desc: '担保掛目計算' },
      { href: '/calculator/exchange',       title: '為替レート計算機',     desc: 'リアルタイムAPI・主要通貨換算' },
      { href: '/calculator/simple-interest',title: '単利計算機',           desc: '元金・金利・期間 → 単利計算' },
      { href: '/calculator/inflation',      title: 'インフレ計算機',       desc: '物価変動を考慮した金額換算' },
      { href: '/calculator/retirement',     title: '老後資金計算機',       desc: '必要な老後資金の試算' },
    ],
  },
  {
    id: 'realestate', label: '不動産', icon: '🏠',
    desc: '不動産取引・税金計算機',
    accent: 'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/50',
    calcs: [
      { href: '/calculator/pyeong',             title: '坪数計算機',         desc: '坪 ↔ 平方メートル換算' },
      { href: '/calculator/broker-fee',         title: '仲介手数料計算機',   desc: '取引金額 → 仲介報酬' },
      { href: '/calculator/jeonwolse',          title: '全月貸換算計算機',   desc: '伝貰 ↔ 月次賃料換算' },
      { href: '/calculator/acquisition-tax',    title: '取得税計算機',       desc: '不動産取得税計算' },
      { href: '/calculator/property-tax',       title: '固定資産税計算機',   desc: '固定資産税の予想計算' },
      { href: '/calculator/holding-tax',        title: '保有税計算機',       desc: '総合不動産税含む保有税' },
      { href: '/calculator/subscription-score', title: '住宅申込スコア計算機', desc: '無住宅期間・扶養家族 → 加点' },
    ],
  },
  {
    id: 'life', label: '生活・健康', icon: '🌿',
    desc: '日常生活の便利な計算機',
    accent: 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/50',
    calcs: [
      { href: '/calculator/bmi',            title: 'BMI計算機',           desc: '身長・体重 → BMI＋標準体重' },
      { href: '/calculator/dday',           title: 'Dデイカウンター',     desc: '目標日のDデイ・日付間隔' },
      { href: '/calculator/percent',        title: 'パーセント計算機',    desc: '増加率・減少率・比率計算' },
      { href: '/calculator/age',            title: '年齢計算機',          desc: '満年齢・韓国式年齢計算' },
      { href: '/calculator/birthday',       title: '誕生日計算機',        desc: '曜日・生年月日基準計算' },
      { href: '/calculator/calorie',        title: 'カロリー計算機',      desc: '活動レベル別推奨カロリー' },
      { href: '/calculator/bmr',            title: '基礎代謝量計算機',    desc: 'BMR（ハリス・ベネディクト式）' },
      { href: '/calculator/water',          title: '水分摂取量計算機',    desc: '体重基準の推奨水分摂取量' },
      { href: '/calculator/sleep',          title: '睡眠計算機',          desc: '起床時間基準の就寝時間提案' },
      { href: '/calculator/ovulation',      title: '排卵日計算機',        desc: '最終月経日 → 排卵日・妊娠可能期間' },
      { href: '/calculator/tip',            title: 'チップ計算機',        desc: '請求額とチップ率 → チップ・合計額' },
      { href: '/calculator/dutch-pay',      title: '割り勘計算機',        desc: '合計金額 → 人数で均等割り' },
      { href: '/calculator/discount',       title: '割引計算機',          desc: '元の価格と割引率 → 最終価格' },
      { href: '/calculator/time-diff',      title: '時間計算機',          desc: '2つの時刻の時間差を計算' },
      { href: '/calculator/blood-pressure', title: '血圧チェック',        desc: '血圧の区分を確認' },
      { href: '/calculator/pregnancy',      title: '出産予定日計算機',    desc: '最終月経日 → 出産予定日' },
      { href: '/calculator/body-fat',       title: '体脂肪率計算機',      desc: '体脂肪率を推定' },
      { href: '/calculator/calories-burn',  title: '消費カロリー計算機',  desc: '活動と時間 → 消費カロリー' },
      { href: '/calculator/gpa',            title: 'GPA計算機',           desc: '成績・単位数 → GPA計算' },
    ],
  },
  {
    id: 'car', label: '自動車', icon: '🚗',
    desc: '自動車関連計算機',
    accent: 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50',
    calcs: [
      { href: '/calculator/car-installment', title: '自動車ローン計算機',   desc: '車両価格・金利・期間 → 月次返済額' },
      { href: '/calculator/car-tax',         title: '自動車税計算機',       desc: '排気量基準の自動車税' },
      { href: '/calculator/fuel-efficiency', title: '燃費計算機',           desc: '走行距離・燃料量 → 燃費' },
      { href: '/calculator/gas-cost',        title: 'ガソリン代計算機',     desc: '距離・燃費・燃料価格 → ガソリン代' },
      { href: '/calculator/ev-charge',       title: 'EV充電費計算機',       desc: 'バッテリー・充電量 → 充電費用' },
    ],
  },
  {
    id: 'utility', label: '光熱費', icon: '💡',
    desc: '電気・ガス・水道料金計算機',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    calcs: [
      { href: '/calculator/electricity', title: '電気料金計算機', desc: 'kWh基準の累進料金計算' },
      { href: '/calculator/gas-bill',    title: 'ガス料金計算機', desc: '使用量基準の都市ガス料金' },
      { href: '/calculator/water-bill',  title: '水道料金計算機', desc: '使用量基準の水道料金計算' },
    ],
  },
  {
    id: 'dev', label: '開発者ツール', icon: '💻',
    desc: '開発者向けツール集',
    accent: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300',
    calcs: [
      { href: '/calculator/dev/json',       title: 'JSON Formatter',        desc: 'JSON整形・検証・コピー' },
      { href: '/calculator/dev/base64',     title: 'Base64コンバーター',    desc: 'Base64エンコード・デコード' },
      { href: '/calculator/dev/url-encode', title: 'URLエンコード変換',     desc: 'URLエンコード・デコード' },
      { href: '/calculator/dev/timestamp',  title: 'Unixタイムスタンプ変換', desc: '日付 ↔ タイムスタンプ変換' },
      { href: '/calculator/dev/jwt',        title: 'JWT Decoder',           desc: 'JWTペイロードの解析・確認' },
      { href: '/calculator/dev/hash',       title: 'MD5/SHA256ジェネレーター', desc: 'ハッシュ生成ツール' },
      { href: '/calculator/dev/regex',      title: 'Regex Tester',          desc: '正規表現リアルタイムテスト' },
      { href: '/calculator/dev/uuid',       title: 'UUID Generator',        desc: 'v4 UUID生成' },
      { href: '/calculator/dev/color',      title: 'Color Converter',       desc: 'HEX ↔ RGB ↔ HSL変換' },
      { href: '/calculator/dev/cron',       title: 'Cron式ビルダー',        desc: 'Cron Expression作成・検証' },
      { href: '/calculator/dev/sql',        title: 'SQL Formatter',         desc: 'SQL整形・インデント' },
      { href: '/calculator/dev/salary',     title: '開発者年収計算機',      desc: '年収 ↔ 月給 ↔ 時給換算' },
      { href: '/calculator/dev/word-count', title: 'Word Count',            desc: '単語・文字・行数カウント' },
      { href: '/calculator/dev/diff',       title: 'Text Diff',             desc: '2つのテキストを比較' },
    ],
  },
  {
    id: 'math', label: '単位変換', icon: '🔢',
    desc: '単位変換・数学ツール',
    accent: 'bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900/50',
    calcs: [
      { href: '/calculator/unit-length', title: '長さ変換',     desc: '長さの単位を変換' },
      { href: '/calculator/unit-weight', title: '重さ変換',     desc: '重さの単位を変換' },
      { href: '/calculator/unit-temp',   title: '温度変換',     desc: '摂氏 ↔ 華氏 ↔ ケルビン' },
      { href: '/calculator/binary',      title: '進数変換',     desc: '2進数 ↔ 8進数 ↔ 10進数 ↔ 16進数' },
    ],
  },
];

const LANG_LINKS = [
  { href: '/calculator/',   label: '🇰🇷 KO' },
  { href: '/calculator/en', label: '🇺🇸 EN' },
  { href: '/calculator/ja', label: '🇯🇵 JA' },
];

export default function JaHome() {
  const total = CATS.reduce((s, c) => s + c.calcs.length, 0);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? CATS.map(cat => ({
        ...cat,
        calcs: cat.calcs.filter(
          c =>
            c.title.includes(query) ||
            c.desc.includes(query),
        ),
      })).filter(cat => cat.calcs.length > 0)
    : CATS;

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <span className="font-black text-blue-600 text-lg shrink-0">計算機まとめ</span>
            {/* カテゴリタブ — 横スクロール */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {CATS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors whitespace-nowrap"
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </nav>
            {/* 言語切替 */}
            <div className="flex items-center gap-1 shrink-0">
              {LANG_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
                    l.href === '/ja'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4">
        {/* ヒーロー */}
        <section className="py-10 sm:py-14 border-b border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Korean Calculator</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-3">
            生活計算機まとめ
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            給与・税金・金融・不動産など —{' '}
            <strong className="text-slate-700 dark:text-slate-200">{total}種類</strong>の計算機
          </p>
          {/* 検索 */}
          <input
            type="search"
            placeholder="計算機を検索..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full max-w-md border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />
        </section>

        {/* カテゴリ別セクション */}
        <div className="py-8 flex flex-col gap-14">
          {filtered.map(cat => (
            <section key={cat.id} id={cat.id}>
              {/* セクションヘッダー */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="font-black text-slate-900 dark:text-slate-100 text-lg leading-tight">{cat.label}</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{cat.desc}</p>
                </div>
                <span className={`ml-auto shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${cat.accent}`}>
                  {cat.calcs.length}個
                </span>
              </div>

              {/* 計算機カードグリッド */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {cat.calcs.map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-700 transition-colors">
                        {c.title}
                      </h3>
                      {(c as { hot?: boolean }).hot && (
                        <span className="shrink-0 ml-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{c.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
          <p className="text-xs text-slate-300 dark:text-slate-600">参考用計算機 · 2026年韓国基準</p>
        </footer>
      </div>
    </div>
  );
}
