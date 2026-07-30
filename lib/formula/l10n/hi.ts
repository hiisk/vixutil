import type { FormulaL10n } from './index.ts';

/**
 * 공식 도구 용어의 힌디어.
 *
 * 금융·회계 낱말은 인도에서도 영어를 그대로 쓰는 경우가 많다(GST, EMI, CAGR).
 * 그런 것은 억지로 옮기지 않고 데바나가리 옆에 그대로 둔다 — 번역해 봐야 서류에서
 * 보는 말과 달라져 오히려 못 알아본다.
 */
export const HI: FormulaL10n = {
  TERMS: {
    /* ───────── 가격·거래 ───────── */
    price: 'क़ीमत', cost: 'लागत', listPrice: 'सूची मूल्य', salePrice: 'बिक्री मूल्य',
    finalPrice: 'अंतिम क़ीमत', amount: 'रक़म', discountAmt: 'छूट', profit: 'मुनाफ़ा',
    marginRate: 'मार्जिन', markup: 'लागत पर', vat: 'GST', supply: 'कर रहित रक़म',
    total: 'कुल', tip: 'टिप', perPerson: 'प्रति व्यक्ति', taxAmt: 'कर',
    netPay: 'शुद्ध रक़म', grossPay: 'सकल रक़म', feeAmt: 'शुल्क',
    unitPrice: 'प्रति नग क़ीमत', saveAmt: 'बचत', memberPrice: 'सदस्य मूल्य',
    buyPrice: 'ख़रीद मूल्य', goodsPrice: 'सामान की क़ीमत', shipFee: 'डिलीवरी',
    freeShipMin: 'मुफ़्त डिलीवरी की सीमा', addBuy: 'और जोड़ना है',
    refundAmt: 'वापसी', settle: 'चुकता रक़म', landedCost: 'कुल आयात लागत',
    discountRate: 'बट्टा दर (वार्षिक)', effDiscount: 'असली छूट',
    maxDiscount: 'अधिकतम छूट', minMargin: 'न्यूनतम मार्जिन',
    freeCount: 'मुफ़्त नग', payCount: 'भुगतान वाले नग',
    costPerUse: 'प्रति उपयोग लागत', costPerDay: 'प्रतिदिन लागत', costPerMonth: 'प्रतिमाह लागत',
    breakEvenCount: 'लागत निकलने तक उपयोग', futurePrice: 'आगे की क़ीमत',
    dutyFreeLimit: 'शुल्क-मुक्त सीमा', dutyRate: 'सीमा शुल्क दर', serviceRate: 'सेवा शुल्क',
    annualFee: 'वार्षिक शुल्क', installFee: 'किस्त शुल्क दर', installMonths: 'किस्तें',

    /* ───────── 비율 ───────── */
    percent: 'प्रतिशत', rate: 'दर', before: 'पहले का मान', after: 'बाद का मान',
    change: 'बदलाव', diff: 'अंतर', part: 'भाग', whole: 'पूरा',
    ratioA: 'A', ratioB: 'B', ratioC: 'C', shareA: 'A का हिस्सा', shareB: 'B का हिस्सा', shareC: 'C का हिस्सा',
    percentA: 'A का प्रतिशत', percentB: 'B का प्रतिशत',
    amountA: 'A की मात्रा', amountB: 'B की मात्रा',
    target: 'लक्ष्य', achieved: 'हासिल', remaining: 'बाक़ी', remainPct: 'शेष',
    base: 'आधार मान', original: 'मूल मान', result: 'परिणाम',
    unknown: 'निकालना है', netPercent: 'कुल में से', pointDiff: 'प्रतिशत अंक',
    permille: 'प्रति हज़ार (‰)', changeA: 'पहला बदलाव', changeB: 'दूसरा बदलाव',
    totalGrowth: 'कुल वृद्धि', errorPct: 'त्रुटि', measured: 'मापा गया मान', trueVal: 'सही मान',
    indexVal: 'सूचकांक', startVal: 'शुरुआती मान', endVal: 'अंतिम मान',
    innerPct: 'भीतरी हिस्सा', outerPct: 'बाहरी हिस्सा',
    usedAmt: 'इस्तेमाल हुआ', usedDays: 'बीते दिन', totalDays: 'कुल दिन',
    daysLeft: 'बचे दिन', perDay: 'रोज़ाना', daysNeeded: 'लगने वाले दिन',
    people: 'लोग', totalPeople: 'कुल लोग', workers: 'लोग', count: 'गिनती',
    totalQty: 'कुल मात्रा', workHours: 'महीने के घंटे', hourlyNet: 'प्रति घंटा शुद्ध',

    /* ───────── 금융 ───────── */
    principal: 'मूलधन', annualRate: 'वार्षिक दर', years: 'वर्ष', months: 'महीने', days: 'दिन',
    interest: 'ब्याज', maturity: 'परिपक्वता रक़म', monthlyPay: 'मासिक किस्त (EMI)',
    invested: 'लगाया', returned: 'वापस मिला', roi: 'प्रतिफल',
    monthlyDeposit: 'मासिक जमा', totalDeposit: 'कुल जमा',
    netInterest: 'कर बाद ब्याज', taxRate: 'कर दर', taxableAmt: 'कर योग्य रक़म',
    effRate: 'प्रभावी कर दर', taxFreeRate: 'कर-मुक्त प्रतिफल', equivYield: 'समतुल्य कर योग्य प्रतिफल',
    cagr: 'CAGR', annualized: 'वार्षिक आधार पर', doubleYears: 'दोगुना होने में वर्ष',
    inflation: 'महँगाई दर', realRate: 'वास्तविक दर', nominalRate: 'नाममात्र दर',
    presentAmt: 'वर्तमान मूल्य', futureAmt: 'भविष्य की रक़म', nowValue: 'आज का मूल्य',
    apr: 'प्रभावी वार्षिक दर', dailyInterest: 'रोज़ का ब्याज', firstInterest: 'पहले महीने का ब्याज',
    firstPrincipal: 'पहले महीने का मूलधन', totalPaid: 'कुल भुगतान',
    prepayAmt: 'अग्रिम भुगतान', savedInterest: 'बचा ब्याज',
    maxLoan: 'कर्ज़ की सीमा', affordPay: 'सँभल सकने वाली किस्त', monthlySpend: 'मासिक ख़र्च',
    fundMonths: 'कितने महीने चलेगा', fundAmount: 'ज़रूरी आपात कोष',
    goalAmount: 'लक्ष्य रक़म', savedSoFar: 'अब तक जमा',
    neededMonthly: 'ज़रूरी मासिक जमा', neededRate: 'ज़रूरी वार्षिक वृद्धि',
    faceValue: 'अंकित मूल्य', couponRate: 'कूपन दर', currentYield: 'वर्तमान प्रतिफल',
    holdDays: 'रखे हुए दिन', lossRate: 'गिरावट', needReturn: 'बराबरी के लिए बढ़त',
    neededRise: 'ज़रूरी बढ़त', avgPrice: 'औसत लागत',
    buyPriceA: 'पहली ख़रीद क़ीमत', buyPriceB: 'दूसरी ख़रीद क़ीमत',
    buyQtyA: 'पहली मात्रा', buyQtyB: 'दूसरी मात्रा',
    feeRate: 'आना-जाना शुल्क', feeRateA: 'शुल्क A', feeRateB: 'शुल्क B',
    baseRate: 'बाज़ार दर', appliedRate: 'लागू दर', spread: 'विनिमय अंतर',
    depreciation: 'वार्षिक मूल्यह्रास',

    /* ───────── 점수·성적 ───────── */
    score: 'अंक', maxScore: 'पूर्णांक', grade: 'पर्सेंटाइल', passScore: 'उत्तीर्ण अंक',
    neededScore: 'चाहिए अंक', gapScore: 'कम पड़ रहे अंक',
    midScore: 'मध्यावधि अंक', midWeight: 'मध्यावधि का भार',
    finalScoreV: 'अंतिम परीक्षा अंक', finalWeight: 'अंतिम परीक्षा का भार',
    hwScore: 'असाइनमेंट अंक', weightedScore: 'भारित कुल',
    examsDone: 'हो चुकी परीक्षाएँ', examsLeft: 'बची परीक्षाएँ',
    currentAvg: 'अब तक का औसत', targetAvg: 'चाहिए औसत',
    rankNo: 'आपकी रैंक', topPercent: 'शीर्ष प्रतिशत',
    attended: 'उपस्थिति', sessions: 'कुल कक्षाएँ', attendRate: 'उपस्थिति दर', canMiss: 'और छूट सकती हैं',
    games: 'मैच', wins: 'जीत', losses: 'हार', winRate: 'जीत दर',
    actual: 'वास्तविक',

    /* ───────── 농도·희석 ───────── */
    concentration: 'सांद्रता', solute: 'विलेय (g)', solvent: 'विलायक (g)', solution: 'विलयन (g)',
    targetConc: 'लक्ष्य सांद्रता', addWater: 'मिलाना है पानी', addSolute: 'मिलाना है विलेय',
    stockPct: 'सांद्र की सांद्रता', stockMl: 'सांद्र (mL)', stockNeedMl: 'ज़रूरी सांद्र',
    waterAddMl: 'मिलाना है पानी (mL)', volumeMl: 'आयतन (mL)', volumeL: 'बनाना है (L)',
    foldRate: 'तनुकरण गुणक', mgPerL: 'mg/L', ppmValue: 'ppm', targetPpm: 'लक्ष्य ppm',
    perLiterMl: 'प्रति लीटर', evapMl: 'उड़ाना है पानी',
    origAbv: 'शुरुआती तीव्रता', targetAbv: 'लक्ष्य तीव्रता',
    syrupMl: 'चाशनी (mL)', syrupPart: 'चाशनी के भाग', waterPart: 'पानी के भाग',
    mainMl: 'मुख्य द्रव (mL)', hardenerMl: 'हार्डनर (mL)',
  },

  UNITS: {
    day: 'दिन', gram: 'g', hour: 'घं', ml: 'mL', money: '', month: 'माह', none: '',
    people: '', percent: '%', permille: '‰', piece: '', point: 'अंक', times: '×', year: 'वर्ष',
  },

  DESC: {},
};
