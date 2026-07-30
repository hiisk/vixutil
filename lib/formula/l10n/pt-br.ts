import type { FormulaL10n } from './index.ts';

/**
 * 공식 도구 용어의 브라질 포르투갈어.
 *
 * 스페인어와 낱말이 비슷해 보여도 그대로 옮기면 안 되는 것이 있다 — 스페인의
 * IVA는 브라질에서 하나의 세목이 아니라 ICMS·IPI·ISS로 갈리므로, 세목 이름 대신
 * "imposto"라는 일반어를 쓴다.
 */
export const PT_BR: FormulaL10n = {
  TERMS: {
    /* ───────── 가격·거래 ───────── */
    price: 'Preço', cost: 'Custo', listPrice: 'Preço de tabela', salePrice: 'Preço com desconto',
    finalPrice: 'Preço final', amount: 'Valor', discountAmt: 'Desconto', profit: 'Lucro',
    marginRate: 'Margem', markup: 'Sobre o custo', vat: 'Imposto', supply: 'Valor sem imposto',
    total: 'Total', tip: 'Gorjeta', perPerson: 'Por pessoa', taxAmt: 'Imposto',
    netPay: 'Valor líquido', grossPay: 'Valor bruto', feeAmt: 'Taxa',
    unitPrice: 'Preço unitário', saveAmt: 'Economia', memberPrice: 'Preço de sócio',
    buyPrice: 'Preço de compra', goodsPrice: 'Preço do item', shipFee: 'Frete',
    freeShipMin: 'Mínimo para frete grátis', addBuy: 'Falta adicionar',
    refundAmt: 'Reembolso', settle: 'Valor a receber', landedCost: 'Custo total de importação',
    discountRate: 'Taxa de desconto (ao ano)', effDiscount: 'Desconto real',
    maxDiscount: 'Desconto máximo', minMargin: 'Margem mínima',
    freeCount: 'Unidades grátis', payCount: 'Unidades pagas',
    costPerUse: 'Custo por uso', costPerDay: 'Custo por dia', costPerMonth: 'Custo por mês',
    breakEvenCount: 'Usos para se pagar', futurePrice: 'Preço no futuro',
    dutyFreeLimit: 'Cota de isenção', dutyRate: 'Alíquota de importação', serviceRate: 'Taxa de serviço',
    annualFee: 'Anuidade', installFee: 'Juros do parcelamento', installMonths: 'Parcelas',

    /* ───────── 비율 ───────── */
    percent: 'Porcentagem', rate: 'Taxa', before: 'Valor anterior', after: 'Valor posterior',
    change: 'Variação', diff: 'Diferença', part: 'Parte', whole: 'Total',
    ratioA: 'A', ratioB: 'B', ratioC: 'C', shareA: 'Parte de A', shareB: 'Parte de B', shareC: 'Parte de C',
    percentA: 'Porcentagem de A', percentB: 'Porcentagem de B',
    amountA: 'Quantidade de A', amountB: 'Quantidade de B',
    target: 'Meta', achieved: 'Alcançado', remaining: 'Falta', remainPct: 'Restante',
    base: 'Valor de referência', original: 'Valor original', result: 'Resultado',
    unknown: 'Valor procurado', netPercent: 'Sobre o total', pointDiff: 'Pontos percentuais',
    permille: 'Por mil (‰)', changeA: 'Primeira variação', changeB: 'Segunda variação',
    totalGrowth: 'Crescimento total', errorPct: 'Erro', measured: 'Valor medido', trueVal: 'Valor real',
    indexVal: 'Índice', startVal: 'Valor inicial', endVal: 'Valor final',
    innerPct: 'Parte interna', outerPct: 'Parte externa',
    usedAmt: 'Consumido', usedDays: 'Dias usados', totalDays: 'Dias do período',
    daysLeft: 'Dias restantes', perDay: 'Por dia', daysNeeded: 'Dias necessários',
    people: 'Pessoas', totalPeople: 'Total de pessoas', workers: 'Pessoas', count: 'Quantidade',
    totalQty: 'Quantidade total', workHours: 'Horas por mês', hourlyNet: 'Líquido por hora',

    /* ───────── 금융 ───────── */
    principal: 'Capital', annualRate: 'Taxa anual', years: 'Anos', months: 'Meses', days: 'Dias',
    interest: 'Juros', maturity: 'Valor final', monthlyPay: 'Parcela mensal',
    invested: 'Investido', returned: 'Resgatado', roi: 'Retorno',
    monthlyDeposit: 'Aporte mensal', totalDeposit: 'Total aportado',
    netInterest: 'Juros líquidos', taxRate: 'Alíquota', taxableAmt: 'Base de cálculo',
    effRate: 'Alíquota efetiva', taxFreeRate: 'Rendimento isento', equivYield: 'Rendimento equivalente',
    cagr: 'CAGR', annualized: 'Anualizado', doubleYears: 'Anos para dobrar',
    inflation: 'Inflação', realRate: 'Taxa real', nominalRate: 'Taxa nominal',
    presentAmt: 'Valor presente', futureAmt: 'Valor futuro', nowValue: 'Valor de hoje',
    apr: 'Custo efetivo ao ano', dailyInterest: 'Juros por dia', firstInterest: 'Juros do 1º mês',
    firstPrincipal: 'Amortização do 1º mês', totalPaid: 'Total pago',
    prepayAmt: 'Amortização extra', savedInterest: 'Juros economizados',
    maxLoan: 'Valor máximo', affordPay: 'Parcela que cabe no bolso', monthlySpend: 'Gasto mensal',
    fundMonths: 'Meses de reserva', fundAmount: 'Reserva necessária',
    goalAmount: 'Meta de valor', savedSoFar: 'Guardado até agora',
    neededMonthly: 'Aporte necessário', neededRate: 'Crescimento necessário',
    faceValue: 'Valor de face', couponRate: 'Cupom', currentYield: 'Rendimento atual',
    holdDays: 'Dias em carteira', lossRate: 'Queda', needReturn: 'Alta para empatar',
    neededRise: 'Alta necessária', avgPrice: 'Preço médio',
    buyPriceA: 'Primeiro preço', buyPriceB: 'Segundo preço',
    buyQtyA: 'Primeira quantidade', buyQtyB: 'Segunda quantidade',
    feeRate: 'Taxa de ida e volta', feeRateA: 'Taxa A', feeRateB: 'Taxa B',
    baseRate: 'Câmbio comercial', appliedRate: 'Câmbio aplicado', spread: 'Spread',
    depreciation: 'Depreciação ao ano',

    /* ───────── 점수·성적 ───────── */
    score: 'Nota', maxScore: 'Nota máxima', grade: 'Percentil', passScore: 'Nota de aprovação',
    neededScore: 'Nota necessária', gapScore: 'Pontos que faltam',
    midScore: 'Nota da prova parcial', midWeight: 'Peso da parcial',
    finalScoreV: 'Nota da prova final', finalWeight: 'Peso da final',
    hwScore: 'Trabalhos', weightedScore: 'Total ponderado',
    examsDone: 'Provas feitas', examsLeft: 'Provas restantes',
    currentAvg: 'Média atual', targetAvg: 'Média desejada',
    rankNo: 'Sua colocação', topPercent: 'Percentil superior',
    attended: 'Presenças', sessions: 'Encontros', attendRate: 'Frequência', canMiss: 'Faltas restantes',
    games: 'Jogos', wins: 'Vitórias', losses: 'Derrotas', winRate: 'Aproveitamento',
    actual: 'Resultado real',

    /* ───────── 농도·희석 ───────── */
    concentration: 'Concentração', solute: 'Soluto (g)', solvent: 'Solvente (g)', solution: 'Solução (g)',
    targetConc: 'Concentração desejada', addWater: 'Água a acrescentar', addSolute: 'Soluto a acrescentar',
    stockPct: 'Concentração do concentrado', stockMl: 'Concentrado (mL)', stockNeedMl: 'Concentrado necessário',
    waterAddMl: 'Água a acrescentar (mL)', volumeMl: 'Volume (mL)', volumeL: 'Quantidade a preparar (L)',
    foldRate: 'Fator de diluição', mgPerL: 'mg/L', ppmValue: 'ppm', targetPpm: 'ppm desejado',
    perLiterMl: 'Por litro', evapMl: 'Água a evaporar',
    origAbv: 'Teor inicial', targetAbv: 'Teor desejado',
    syrupMl: 'Xarope (mL)', syrupPart: 'Partes de xarope', waterPart: 'Partes de água',
    mainMl: 'Base (mL)', hardenerMl: 'Endurecedor (mL)',
  },

  UNITS: {
    day: 'd', gram: 'g', hour: 'h', ml: 'mL', money: '', month: 'mês', none: '',
    people: '', percent: '%', permille: '‰', piece: '', point: 'pt', times: '×', year: 'a',
  },

  DESC: {},
};
