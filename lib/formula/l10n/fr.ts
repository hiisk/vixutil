import type { FormulaL10n } from './index.ts';

/**
 * 공식 도구 용어의 프랑스어.
 *
 * 프랑스어는 데이터 단위와 마찬가지로 약어도 현지 관례를 쓴다 — TAEG(실질 연이율),
 * TVA(부가세)처럼 그 나라 사람이 서류에서 보는 낱말이라야 검색에서도 잡힌다.
 */
export const FR: FormulaL10n = {
  TERMS: {
    /* ───────── 가격·거래 ───────── */
    price: 'Prix', cost: 'Coût d’achat', listPrice: 'Prix affiché', salePrice: 'Prix soldé',
    finalPrice: 'Prix final', amount: 'Montant', discountAmt: 'Remise', profit: 'Bénéfice',
    marginRate: 'Marge', markup: 'Sur le coût', vat: 'TVA', supply: 'Montant hors taxe',
    total: 'Total', tip: 'Pourboire', perPerson: 'Par personne', taxAmt: 'Taxe',
    netPay: 'Montant net', grossPay: 'Montant brut', feeAmt: 'Frais',
    unitPrice: 'Prix unitaire', saveAmt: 'Économie', memberPrice: 'Prix adhérent',
    buyPrice: 'Prix d’achat', goodsPrice: 'Prix de l’article', shipFee: 'Livraison',
    freeShipMin: 'Seuil de livraison offerte', addBuy: 'Reste à ajouter',
    refundAmt: 'Remboursement', settle: 'Somme à verser', landedCost: 'Coût rendu',
    discountRate: 'Taux d’escompte (annuel)', effDiscount: 'Remise réelle',
    maxDiscount: 'Remise maximale', minMargin: 'Marge à préserver',
    freeCount: 'Articles offerts', payCount: 'Articles payés',
    costPerUse: 'Coût par utilisation', costPerDay: 'Coût par jour', costPerMonth: 'Coût par mois',
    breakEvenCount: 'Utilisations pour rentabiliser', futurePrice: 'Prix plus tard',
    dutyFreeLimit: 'Franchise', dutyRate: 'Taux de douane', serviceRate: 'Service',
    annualFee: 'Cotisation annuelle', installFee: 'Frais de paiement échelonné', installMonths: 'Mensualités',

    /* ───────── 비율 ───────── */
    percent: 'Pourcentage', rate: 'Taux', before: 'Valeur avant', after: 'Valeur après',
    change: 'Variation', diff: 'Écart', part: 'Partie', whole: 'Total',
    ratioA: 'A', ratioB: 'B', ratioC: 'C', shareA: 'Part de A', shareB: 'Part de B', shareC: 'Part de C',
    percentA: 'Pourcentage de A', percentB: 'Pourcentage de B',
    amountA: 'Quantité de A', amountB: 'Quantité de B',
    target: 'Objectif', achieved: 'Atteint', remaining: 'Reste', remainPct: 'Restant',
    base: 'Valeur de référence', original: 'Valeur d’origine', result: 'Résultat',
    unknown: 'Valeur cherchée', netPercent: 'Sur le total', pointDiff: 'Points de pourcentage',
    permille: 'Pour mille (‰)', changeA: 'Première variation', changeB: 'Seconde variation',
    totalGrowth: 'Croissance totale', errorPct: 'Erreur', measured: 'Valeur mesurée', trueVal: 'Valeur vraie',
    indexVal: 'Indice', startVal: 'Valeur de départ', endVal: 'Valeur d’arrivée',
    innerPct: 'Part intérieure', outerPct: 'Part extérieure',
    usedAmt: 'Consommé', usedDays: 'Jours écoulés', totalDays: 'Jours de la période',
    daysLeft: 'Jours restants', perDay: 'Par jour', daysNeeded: 'Jours nécessaires',
    people: 'Personnes', totalPeople: 'Personnes au total', workers: 'Personnes', count: 'Nombre',
    totalQty: 'Quantité totale', workHours: 'Heures par mois', hourlyNet: 'Net horaire',

    /* ───────── 금융 ───────── */
    principal: 'Capital', annualRate: 'Taux annuel', years: 'Années', months: 'Mois', days: 'Jours',
    interest: 'Intérêts', maturity: 'Montant à terme', monthlyPay: 'Mensualité',
    invested: 'Investi', returned: 'Récupéré', roi: 'Rendement',
    monthlyDeposit: 'Versement mensuel', totalDeposit: 'Total versé',
    netInterest: 'Intérêts nets', taxRate: 'Taux d’imposition', taxableAmt: 'Montant imposable',
    effRate: 'Taux effectif', taxFreeRate: 'Rendement non imposé', equivYield: 'Rendement équivalent',
    cagr: 'TCAC', annualized: 'Annualisé', doubleYears: 'Années pour doubler',
    inflation: 'Inflation', realRate: 'Taux réel', nominalRate: 'Taux nominal',
    presentAmt: 'Valeur actuelle', futureAmt: 'Montant futur', nowValue: 'Valeur d’aujourd’hui',
    apr: 'TAEG', dailyInterest: 'Intérêts par jour', firstInterest: 'Intérêts du 1er mois',
    firstPrincipal: 'Capital du 1er mois', totalPaid: 'Total remboursé',
    prepayAmt: 'Remboursement anticipé', savedInterest: 'Intérêts économisés',
    maxLoan: 'Montant empruntable', affordPay: 'Mensualité supportable', monthlySpend: 'Dépenses mensuelles',
    fundMonths: 'Mois de réserve', fundAmount: 'Épargne de précaution',
    goalAmount: 'Objectif d’épargne', savedSoFar: 'Déjà épargné',
    neededMonthly: 'Versement nécessaire', neededRate: 'Croissance nécessaire',
    faceValue: 'Valeur nominale', couponRate: 'Coupon', currentYield: 'Rendement courant',
    holdDays: 'Jours de détention', lossRate: 'Baisse', needReturn: 'Hausse pour revenir',
    neededRise: 'Hausse nécessaire', avgPrice: 'Prix de revient moyen',
    buyPriceA: 'Premier prix d’achat', buyPriceB: 'Second prix d’achat',
    buyQtyA: 'Première quantité', buyQtyB: 'Seconde quantité',
    feeRate: 'Frais aller-retour', feeRateA: 'Frais A', feeRateB: 'Frais B',
    baseRate: 'Cours moyen', appliedRate: 'Cours appliqué', spread: 'Écart de change',
    depreciation: 'Décote annuelle',

    /* ───────── 점수·성적 ───────── */
    score: 'Note', maxScore: 'Note maximale', grade: 'Centile', passScore: 'Seuil de réussite',
    neededScore: 'Note nécessaire', gapScore: 'Points manquants',
    midScore: 'Partiel', midWeight: 'Poids du partiel',
    finalScoreV: 'Examen final', finalWeight: 'Poids de l’examen',
    hwScore: 'Contrôle continu', weightedScore: 'Total pondéré',
    examsDone: 'Épreuves passées', examsLeft: 'Épreuves restantes',
    currentAvg: 'Moyenne actuelle', targetAvg: 'Moyenne visée',
    rankNo: 'Ton rang', topPercent: 'Meilleurs pourcent',
    attended: 'Présences', sessions: 'Séances au total', attendRate: 'Assiduité', canMiss: 'Absences restantes',
    games: 'Matchs', wins: 'Victoires', losses: 'Défaites', winRate: 'Taux de victoire',
    actual: 'Résultat réel',

    /* ───────── 농도·희석 ───────── */
    concentration: 'Concentration', solute: 'Soluté (g)', solvent: 'Solvant (g)', solution: 'Solution (g)',
    targetConc: 'Concentration visée', addWater: 'Eau à ajouter', addSolute: 'Soluté à ajouter',
    stockPct: 'Concentration du concentré', stockMl: 'Concentré (mL)', stockNeedMl: 'Concentré nécessaire',
    waterAddMl: 'Eau à ajouter (mL)', volumeMl: 'Volume (mL)', volumeL: 'Quantité à préparer (L)',
    foldRate: 'Facteur de dilution', mgPerL: 'mg/L', ppmValue: 'ppm', targetPpm: 'ppm visé',
    perLiterMl: 'Par litre', evapMl: 'Eau à faire réduire',
    origAbv: 'Degré de départ', targetAbv: 'Degré visé',
    syrupMl: 'Sirop (mL)', syrupPart: 'Parts de sirop', waterPart: 'Parts d’eau',
    mainMl: 'Base (mL)', hardenerMl: 'Durcisseur (mL)',
  },

  UNITS: {
    day: 'j', gram: 'g', hour: 'h', ml: 'mL', money: '', month: 'mois', none: '',
    people: '', percent: '%', permille: '‰', piece: '', point: 'pt', times: '×', year: 'an',
  },

  DESC: {},
};
