import type { FormulaL10n } from './index.ts';

/**
 * 공식 도구 용어의 일본어.
 *
 * 라벨은 로마자보다 짧게 담긴다. 대신 한자어를 그대로 옮기면 안 되는 것이 있다 —
 * 한국의 '부가세'는 일본에서 消費税이고, '정가'는 定価가 아니라 希望小売価格에
 * 가깝다. 세율도 나라마다 달라 숫자는 넣지 않고 이름만 둔다.
 */
export const JA: FormulaL10n = {
  TERMS: {
    /* ───────── 가격·거래 ───────── */
    price: '価格', cost: '原価', listPrice: '定価', salePrice: '販売価格',
    finalPrice: '最終価格', amount: '金額', discountAmt: '割引額', profit: '利益',
    marginRate: '利益率', markup: '原価比', vat: '消費税', supply: '税抜価格',
    total: '合計', tip: 'チップ', perPerson: '1人あたり', taxAmt: '税額',
    netPay: '手取り額', grossPay: '税引前の金額', feeAmt: '手数料',
    unitPrice: '1個あたりの価格', saveAmt: '節約額', memberPrice: '会員価格',
    buyPrice: '購入価格', goodsPrice: '商品価格', shipFee: '送料',
    freeShipMin: '送料無料の基準', addBuy: 'あと買う金額',
    refundAmt: '返金額', settle: '精算額', landedCost: '輸入総費用',
    discountRate: '割引率（年）', effDiscount: '実質割引率',
    maxDiscount: '割引の上限', minMargin: '確保する利益率',
    freeCount: '無料の個数', payCount: '支払う個数',
    costPerUse: '1回あたりの費用', costPerDay: '1日あたりの費用', costPerMonth: '1か月あたりの費用',
    breakEvenCount: '元が取れる回数', futurePrice: '将来の価格',
    dutyFreeLimit: '免税枠', dutyRate: '関税率', serviceRate: 'サービス料',
    annualFee: '年会費', installFee: '分割手数料率', installMonths: '分割回数',

    /* ───────── 비율 ───────── */
    percent: '割合', rate: '料率', before: '変更前の値', after: '変更後の値',
    change: '変化率', diff: '差', part: '部分', whole: '全体',
    ratioA: 'A', ratioB: 'B', ratioC: 'C', shareA: 'Aの取り分', shareB: 'Bの取り分', shareC: 'Cの取り分',
    percentA: 'Aの割合', percentB: 'Bの割合',
    amountA: 'Aの量', amountB: 'Bの量',
    target: '目標値', achieved: '達成率', remaining: '残り', remainPct: '残りの割合',
    base: '基準値', original: 'もとの値', result: '結果',
    unknown: '求める値', netPercent: '全体に対して', pointDiff: 'パーセントポイント',
    permille: '千分率（‰）', changeA: '1回目の変化率', changeB: '2回目の変化率',
    totalGrowth: '総成長率', errorPct: '誤差率', measured: '測定値', trueVal: '真の値',
    indexVal: '指数', startVal: '開始値', endVal: '終了値',
    innerPct: '内側の割合', outerPct: '外側の割合',
    usedAmt: '使った量', usedDays: '使った日数', totalDays: '全体の日数',
    daysLeft: '残り日数', perDay: '1日あたりの量', daysNeeded: 'かかる日数',
    people: '人数', totalPeople: '全体の人数', workers: '人数', count: '個数',
    totalQty: '総数量', workHours: '月の勤務時間', hourlyNet: '手取り時給',

    /* ───────── 금융 ───────── */
    principal: '元金', annualRate: '年利', years: '期間（年）', months: '期間（か月）', days: '日数',
    interest: '利息', maturity: '満期金額', monthlyPay: '毎月の返済額',
    invested: '投資額', returned: '回収額', roi: '利回り',
    monthlyDeposit: '毎月の積立額', totalDeposit: '積立総額',
    netInterest: '税引後の利息', taxRate: '税率', taxableAmt: '課税対象額',
    effRate: '実効税率', taxFreeRate: '非課税利回り', equivYield: '等価課税利回り',
    cagr: '年平均成長率', annualized: '年換算利回り', doubleYears: '2倍になる年数',
    inflation: '物価上昇率', realRate: '実質金利', nominalRate: '名目金利',
    presentAmt: '現在価値', futureAmt: '将来の金額', nowValue: '今の価値',
    apr: '実質年率', dailyInterest: '1日の利息', firstInterest: '初月の利息',
    firstPrincipal: '初月の元金', totalPaid: '返済総額',
    prepayAmt: '繰上返済額', savedInterest: '節約できる利息',
    maxLoan: '借りられる金額', affordPay: '返済できる月額', monthlySpend: '月の生活費',
    fundMonths: '持ちこたえる月数', fundAmount: '必要な生活防衛資金',
    goalAmount: '目標金額', savedSoFar: 'これまでに貯めた額',
    neededMonthly: '必要な毎月の積立', neededRate: '必要な年成長率',
    faceValue: '額面金額', couponRate: '表面利率', currentYield: '直利',
    holdDays: '保有日数', lossRate: '下落率', needReturn: '元に戻る上昇率',
    neededRise: '必要な上昇率', avgPrice: '平均取得単価',
    buyPriceA: '1回目の取得単価', buyPriceB: '2回目の取得単価',
    buyQtyA: '1回目の数量', buyQtyB: '2回目の数量',
    feeRate: '往復手数料', feeRateA: '手数料A', feeRateB: '手数料B',
    baseRate: '仲値', appliedRate: '適用レート', spread: '為替スプレッド',
    depreciation: '年間の減価率',

    /* ───────── 점수·성적 ───────── */
    score: '点数', maxScore: '満点', grade: 'パーセンタイル', passScore: '合格ライン',
    neededScore: '必要な点数', gapScore: '足りない点数',
    midScore: '中間試験の点数', midWeight: '中間の比重',
    finalScoreV: '期末試験の点数', finalWeight: '期末の比重',
    hwScore: '課題の点数', weightedScore: '加重合計',
    examsDone: '受けた科目数', examsLeft: '残りの科目数',
    currentAvg: '今の平均', targetAvg: '目標の平均',
    rankNo: '自分の順位', topPercent: '上位の割合',
    attended: '出席回数', sessions: '全体の回数', attendRate: '出席率', canMiss: 'あと休める回数',
    games: '試合数', wins: '勝', losses: '敗', winRate: '勝率',
    actual: '実績',

    /* ───────── 농도·희석 ───────── */
    concentration: '濃度', solute: '溶質（g）', solvent: '溶媒（g）', solution: '溶液（g）',
    targetConc: '目標濃度', addWater: '加える水', addSolute: '加える溶質',
    stockPct: '原液の濃度', stockMl: '原液（mL）', stockNeedMl: '必要な原液',
    waterAddMl: '加える水（mL）', volumeMl: '容量（mL）', volumeL: '作る量（L）',
    foldRate: '希釈倍率', mgPerL: 'mg/L', ppmValue: 'ppm', targetPpm: '目標ppm',
    perLiterMl: '水1Lあたり', evapMl: '煮詰める水',
    origAbv: 'もとの度数', targetAbv: '目標の度数',
    syrupMl: 'シロップ（mL）', syrupPart: 'シロップの割合', waterPart: '水の割合',
    mainMl: '主剤（mL）', hardenerMl: '硬化剤（mL）',
  },

  UNITS: {
    day: '日', gram: 'g', hour: '時間', ml: 'mL', money: '円', month: 'か月', none: '',
    people: '人', percent: '%', permille: '‰', piece: '個', point: '点', times: '倍', year: '年',
  },

  DESC: {},
};
