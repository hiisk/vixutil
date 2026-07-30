import type { FormulaL10n } from './index.ts';

/**
 * 공식 도구 용어의 독일어.
 *
 * 독일어 합성어는 길어지기 쉬운데 라벨은 입력칸 옆 한 줄에 들어가야 한다. 그래서
 * 뜻이 흐려지지 않는 선에서 짧은 쪽을 골랐다 — Anschaffungskosten 대신 Kaufpreis처럼.
 */
export const DE: FormulaL10n = {
  TERMS: {
    /* ───────── 가격·거래 ───────── */
    price: 'Preis', cost: 'Einkaufspreis', listPrice: 'Listenpreis', salePrice: 'Verkaufspreis',
    finalPrice: 'Endpreis', amount: 'Betrag', discountAmt: 'Rabatt', profit: 'Gewinn',
    marginRate: 'Marge', markup: 'Aufschlag', vat: 'Mehrwertsteuer', supply: 'Nettobetrag',
    total: 'Summe', tip: 'Trinkgeld', perPerson: 'Pro Person', taxAmt: 'Steuer',
    netPay: 'Nettobetrag', grossPay: 'Bruttobetrag', feeAmt: 'Gebühr',
    unitPrice: 'Stückpreis', saveAmt: 'Ersparnis', memberPrice: 'Mitgliederpreis',
    buyPrice: 'Kaufpreis', goodsPrice: 'Warenwert', shipFee: 'Versand',
    freeShipMin: 'Grenze für Gratisversand', addBuy: 'Fehlt noch',
    refundAmt: 'Erstattung', settle: 'Auszahlung', landedCost: 'Gesamtkosten bis zur Tür',
    discountRate: 'Diskontsatz (p. a.)', effDiscount: 'Tatsächlicher Rabatt',
    maxDiscount: 'Höchstrabatt', minMargin: 'Mindestmarge',
    freeCount: 'Gratis-Stücke', payCount: 'Bezahlte Stücke',
    costPerUse: 'Kosten pro Nutzung', costPerDay: 'Kosten pro Tag', costPerMonth: 'Kosten pro Monat',
    breakEvenCount: 'Nutzungen bis zur Amortisation', futurePrice: 'Preis später',
    dutyFreeLimit: 'Freigrenze', dutyRate: 'Zollsatz', serviceRate: 'Servicezuschlag',
    annualFee: 'Jahresgebühr', installFee: 'Ratenzuschlag', installMonths: 'Raten',

    /* ───────── 비율 ───────── */
    percent: 'Prozentsatz', rate: 'Satz', before: 'Wert vorher', after: 'Wert nachher',
    change: 'Veränderung', diff: 'Differenz', part: 'Teil', whole: 'Ganzes',
    ratioA: 'A', ratioB: 'B', ratioC: 'C', shareA: 'Anteil A', shareB: 'Anteil B', shareC: 'Anteil C',
    percentA: 'Anteil A in %', percentB: 'Anteil B in %',
    amountA: 'Menge A', amountB: 'Menge B',
    target: 'Zielwert', achieved: 'Erreicht', remaining: 'Rest', remainPct: 'Verbleibend',
    base: 'Bezugswert', original: 'Ausgangswert', result: 'Ergebnis',
    unknown: 'Gesuchter Wert', netPercent: 'Vom Ganzen', pointDiff: 'Prozentpunkte',
    permille: 'Promille (‰)', changeA: 'Erste Veränderung', changeB: 'Zweite Veränderung',
    totalGrowth: 'Gesamtwachstum', errorPct: 'Fehler', measured: 'Messwert', trueVal: 'Wahrer Wert',
    indexVal: 'Index', startVal: 'Startwert', endVal: 'Endwert',
    innerPct: 'Innerer Anteil', outerPct: 'Äußerer Anteil',
    usedAmt: 'Verbraucht', usedDays: 'Verbrauchte Tage', totalDays: 'Tage im Zeitraum',
    daysLeft: 'Verbleibende Tage', perDay: 'Pro Tag', daysNeeded: 'Benötigte Tage',
    people: 'Personen', totalPeople: 'Personen gesamt', workers: 'Personen', count: 'Anzahl',
    totalQty: 'Gesamtmenge', workHours: 'Stunden im Monat', hourlyNet: 'Nettostundenlohn',

    /* ───────── 금융 ───────── */
    principal: 'Kapital', annualRate: 'Zinssatz p. a.', years: 'Jahre', months: 'Monate', days: 'Tage',
    interest: 'Zinsen', maturity: 'Endbetrag', monthlyPay: 'Monatsrate',
    invested: 'Eingesetzt', returned: 'Zurückerhalten', roi: 'Rendite',
    monthlyDeposit: 'Monatliche Einzahlung', totalDeposit: 'Eingezahlt gesamt',
    netInterest: 'Zinsen nach Steuer', taxRate: 'Steuersatz', taxableAmt: 'Steuerpflichtiger Betrag',
    effRate: 'Effektiver Steuersatz', taxFreeRate: 'Steuerfreie Rendite', equivYield: 'Vergleichsrendite',
    cagr: 'CAGR', annualized: 'Auf das Jahr gerechnet', doubleYears: 'Jahre bis zur Verdopplung',
    inflation: 'Inflation', realRate: 'Realzins', nominalRate: 'Nominalzins',
    presentAmt: 'Barwert', futureAmt: 'Betrag später', nowValue: 'Heutiger Wert',
    apr: 'Effektiver Jahreszins', dailyInterest: 'Zinsen pro Tag', firstInterest: 'Zinsen im 1. Monat',
    firstPrincipal: 'Tilgung im 1. Monat', totalPaid: 'Insgesamt gezahlt',
    prepayAmt: 'Sondertilgung', savedInterest: 'Gesparte Zinsen',
    maxLoan: 'Möglicher Kreditbetrag', affordPay: 'Tragbare Rate', monthlySpend: 'Monatliche Ausgaben',
    fundMonths: 'Monate Puffer', fundAmount: 'Nötige Rücklage',
    goalAmount: 'Sparziel', savedSoFar: 'Bisher gespart',
    neededMonthly: 'Nötige Monatsrate', neededRate: 'Nötiges Wachstum',
    faceValue: 'Nennwert', couponRate: 'Kupon', currentYield: 'Laufende Rendite',
    holdDays: 'Haltedauer (Tage)', lossRate: 'Verlust', needReturn: 'Nötiger Anstieg',
    neededRise: 'Nötiger Anstieg in %', avgPrice: 'Durchschnittskurs',
    buyPriceA: 'Erster Kaufkurs', buyPriceB: 'Zweiter Kaufkurs',
    buyQtyA: 'Erste Stückzahl', buyQtyB: 'Zweite Stückzahl',
    feeRate: 'Gebühr hin und zurück', feeRateA: 'Gebühr A', feeRateB: 'Gebühr B',
    baseRate: 'Devisenmittelkurs', appliedRate: 'Verwendeter Kurs', spread: 'Wechselspanne',
    depreciation: 'Wertverlust pro Jahr',

    /* ───────── 점수·성적 ───────── */
    score: 'Punkte', maxScore: 'Maximale Punktzahl', grade: 'Perzentil', passScore: 'Bestehensgrenze',
    neededScore: 'Nötige Punktzahl', gapScore: 'Fehlende Punkte',
    midScore: 'Zwischenprüfung', midWeight: 'Gewicht der Zwischenprüfung',
    finalScoreV: 'Abschlussprüfung', finalWeight: 'Gewicht der Abschlussprüfung',
    hwScore: 'Hausarbeiten', weightedScore: 'Gewichtete Gesamtnote',
    examsDone: 'Geschriebene Prüfungen', examsLeft: 'Verbleibende Prüfungen',
    currentAvg: 'Bisheriger Schnitt', targetAvg: 'Gewünschter Schnitt',
    rankNo: 'Dein Platz', topPercent: 'Obere Prozent',
    attended: 'Anwesend', sessions: 'Termine gesamt', attendRate: 'Anwesenheit', canMiss: 'Noch mögliche Fehltage',
    games: 'Spiele', wins: 'Siege', losses: 'Niederlagen', winRate: 'Siegquote',
    actual: 'Tatsächlich',

    /* ───────── 농도·희석 ───────── */
    concentration: 'Konzentration', solute: 'Gelöster Stoff (g)', solvent: 'Lösungsmittel (g)', solution: 'Lösung (g)',
    targetConc: 'Zielkonzentration', addWater: 'Wasser zugeben', addSolute: 'Stoff zugeben',
    stockPct: 'Konzentration des Konzentrats', stockMl: 'Konzentrat (mL)', stockNeedMl: 'Nötiges Konzentrat',
    waterAddMl: 'Wasser zugeben (mL)', volumeMl: 'Volumen (mL)', volumeL: 'Ansatzmenge (L)',
    foldRate: 'Verdünnungsfaktor', mgPerL: 'mg/L', ppmValue: 'ppm', targetPpm: 'Ziel-ppm',
    perLiterMl: 'Pro Liter', evapMl: 'Zu verdampfendes Wasser',
    origAbv: 'Ausgangsstärke', targetAbv: 'Zielstärke',
    syrupMl: 'Sirup (mL)', syrupPart: 'Teile Sirup', waterPart: 'Teile Wasser',
    mainMl: 'Basis (mL)', hardenerMl: 'Härter (mL)',
  },

  UNITS: {
    day: 'd', gram: 'g', hour: 'h', ml: 'mL', money: '', month: 'Mon.', none: '',
    people: '', percent: '%', permille: '‰', piece: '', point: 'P', times: '×', year: 'J',
  },

  DESC: {},
};
