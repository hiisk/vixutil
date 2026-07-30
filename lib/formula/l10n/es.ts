import type { FormulaL10n } from './index.ts';

/**
 * 공식 도구 용어의 스페인어.
 *
 * 라벨은 짧아야 한다 — 입력칸 옆에 들어가므로 두세 낱말을 넘기면 줄이 접힌다.
 * 통화 기호는 비워 둔다: 계산 자체는 통화와 무관하고, 유로·페소·솔이 뒤섞인
 * 독자에게 한 통화를 못박으면 오히려 틀린 인상을 준다.
 */
export const ES: FormulaL10n = {
  TERMS: {
    /* ───────── 가격·거래 ───────── */
    price: 'Precio', cost: 'Coste', listPrice: 'Precio de lista', salePrice: 'Precio rebajado',
    finalPrice: 'Precio final', amount: 'Importe', discountAmt: 'Descuento', profit: 'Beneficio',
    marginRate: 'Margen', markup: 'Sobre el coste', vat: 'IVA', supply: 'Base imponible',
    total: 'Total', tip: 'Propina', perPerson: 'Por persona', taxAmt: 'Impuesto',
    netPay: 'Importe neto', grossPay: 'Importe bruto', feeAmt: 'Comisión',
    unitPrice: 'Precio unitario', saveAmt: 'Ahorro', memberPrice: 'Precio de socio',
    buyPrice: 'Precio de compra', goodsPrice: 'Precio del artículo', shipFee: 'Envío',
    freeShipMin: 'Mínimo para envío gratis', addBuy: 'Falta por añadir',
    refundAmt: 'Reembolso', settle: 'Liquidación', landedCost: 'Coste puesto en destino',
    discountRate: 'Tasa de descuento (anual)', effDiscount: 'Descuento real',
    maxDiscount: 'Descuento máximo', minMargin: 'Margen mínimo',
    freeCount: 'Unidades gratis', payCount: 'Unidades que pagas',
    costPerUse: 'Coste por uso', costPerDay: 'Coste al día', costPerMonth: 'Coste al mes',
    breakEvenCount: 'Usos para amortizarlo', futurePrice: 'Precio futuro',
    dutyFreeLimit: 'Franquicia', dutyRate: 'Arancel', serviceRate: 'Servicio',
    annualFee: 'Cuota anual', installFee: 'Comisión de financiación', installMonths: 'Cuotas',

    /* ───────── 비율 ───────── */
    percent: 'Porcentaje', rate: 'Tasa', before: 'Valor anterior', after: 'Valor posterior',
    change: 'Variación', diff: 'Diferencia', part: 'Parte', whole: 'Total',
    ratioA: 'A', ratioB: 'B', ratioC: 'C', shareA: 'Parte de A', shareB: 'Parte de B', shareC: 'Parte de C',
    percentA: 'Porcentaje de A', percentB: 'Porcentaje de B',
    amountA: 'Cantidad de A', amountB: 'Cantidad de B',
    target: 'Objetivo', achieved: 'Cumplido', remaining: 'Queda', remainPct: 'Restante',
    base: 'Valor de referencia', original: 'Valor original', result: 'Resultado',
    unknown: 'Valor a hallar', netPercent: 'Sobre el total', pointDiff: 'Puntos porcentuales',
    permille: 'Por mil (‰)', changeA: 'Primera variación', changeB: 'Segunda variación',
    totalGrowth: 'Crecimiento total', errorPct: 'Error', measured: 'Valor medido', trueVal: 'Valor real',
    indexVal: 'Índice', startVal: 'Valor inicial', endVal: 'Valor final',
    innerPct: 'Parte interior', outerPct: 'Parte exterior',
    usedAmt: 'Consumido', usedDays: 'Días usados', totalDays: 'Días del periodo',
    daysLeft: 'Días restantes', perDay: 'Por día', daysNeeded: 'Días necesarios',
    people: 'Personas', totalPeople: 'Personas en total', workers: 'Personas', count: 'Cantidad',
    totalQty: 'Cantidad total', workHours: 'Horas al mes', hourlyNet: 'Neto por hora',

    /* ───────── 금융 ───────── */
    principal: 'Capital', annualRate: 'Tasa anual', years: 'Años', months: 'Meses', days: 'Días',
    interest: 'Intereses', maturity: 'Importe final', monthlyPay: 'Cuota mensual',
    invested: 'Invertido', returned: 'Recuperado', roi: 'Rentabilidad',
    monthlyDeposit: 'Aportación mensual', totalDeposit: 'Total aportado',
    netInterest: 'Intereses netos', taxRate: 'Tipo impositivo', taxableAmt: 'Base gravable',
    effRate: 'Tipo efectivo', taxFreeRate: 'Rentabilidad exenta', equivYield: 'Rentabilidad equivalente',
    cagr: 'TCAC', annualized: 'Anualizada', doubleYears: 'Años para duplicar',
    inflation: 'Inflación', realRate: 'Tipo real', nominalRate: 'Tipo nominal',
    presentAmt: 'Valor actual', futureAmt: 'Importe futuro', nowValue: 'Valor de hoy',
    apr: 'TAE', dailyInterest: 'Intereses al día', firstInterest: 'Intereses del primer mes',
    firstPrincipal: 'Capital del primer mes', totalPaid: 'Total pagado',
    prepayAmt: 'Amortización anticipada', savedInterest: 'Intereses ahorrados',
    maxLoan: 'Importe máximo', affordPay: 'Cuota asumible', monthlySpend: 'Gasto mensual',
    fundMonths: 'Meses de colchón', fundAmount: 'Fondo necesario',
    goalAmount: 'Objetivo de ahorro', savedSoFar: 'Ahorrado hasta ahora',
    neededMonthly: 'Aportación necesaria', neededRate: 'Crecimiento necesario',
    faceValue: 'Valor nominal', couponRate: 'Cupón', currentYield: 'Rentabilidad actual',
    holdDays: 'Días en cartera', lossRate: 'Caída', needReturn: 'Subida para recuperar',
    neededRise: 'Subida necesaria', avgPrice: 'Precio medio',
    buyPriceA: 'Primer precio', buyPriceB: 'Segundo precio',
    buyQtyA: 'Primera cantidad', buyQtyB: 'Segunda cantidad',
    feeRate: 'Comisión ida y vuelta', feeRateA: 'Comisión A', feeRateB: 'Comisión B',
    baseRate: 'Tipo de cambio medio', appliedRate: 'Tipo aplicado', spread: 'Diferencial',
    depreciation: 'Depreciación anual',

    /* ───────── 점수·성적 ───────── */
    score: 'Nota', maxScore: 'Nota máxima', grade: 'Percentil', passScore: 'Nota de aprobado',
    neededScore: 'Nota necesaria', gapScore: 'Puntos que faltan',
    midScore: 'Nota parcial', midWeight: 'Peso del parcial',
    finalScoreV: 'Nota final', finalWeight: 'Peso del final',
    hwScore: 'Trabajos', weightedScore: 'Total ponderado',
    examsDone: 'Exámenes hechos', examsLeft: 'Exámenes restantes',
    currentAvg: 'Media actual', targetAvg: 'Media buscada',
    rankNo: 'Tu puesto', topPercent: 'Percentil superior',
    attended: 'Asistencias', sessions: 'Sesiones', attendRate: 'Asistencia', canMiss: 'Faltas que quedan',
    games: 'Partidos', wins: 'Victorias', losses: 'Derrotas', winRate: 'Porcentaje de victorias',
    actual: 'Resultado real',

    /* ───────── 농도·희석 ───────── */
    concentration: 'Concentración', solute: 'Soluto (g)', solvent: 'Disolvente (g)', solution: 'Disolución (g)',
    targetConc: 'Concentración objetivo', addWater: 'Agua a añadir', addSolute: 'Soluto a añadir',
    stockPct: 'Concentración del concentrado', stockMl: 'Concentrado (mL)', stockNeedMl: 'Concentrado necesario',
    waterAddMl: 'Agua a añadir (mL)', volumeMl: 'Volumen (mL)', volumeL: 'Cantidad a preparar (L)',
    foldRate: 'Factor de dilución', mgPerL: 'mg/L', ppmValue: 'ppm', targetPpm: 'ppm objetivo',
    perLiterMl: 'Por litro', evapMl: 'Agua a evaporar',
    origAbv: 'Graduación inicial', targetAbv: 'Graduación objetivo',
    syrupMl: 'Jarabe (mL)', syrupPart: 'Partes de jarabe', waterPart: 'Partes de agua',
    mainMl: 'Base (mL)', hardenerMl: 'Endurecedor (mL)',
  },

  UNITS: {
    day: 'd', gram: 'g', hour: 'h', ml: 'mL', money: '', month: 'mes', none: '',
    people: '', percent: '%', permille: '‰', piece: '', point: 'pt', times: '×', year: 'a',
  },

  DESC: {},
};
