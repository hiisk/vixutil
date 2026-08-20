import { notFound } from 'next/navigation';
import CalcShellIntl from '@/components/CalcShellIntl';
import UnitWeightIntl from '@/components/calc/UnitWeightIntl';
import UnitLengthIntl from '@/components/calc/UnitLengthIntl';
import UnitTempIntl from '@/components/calc/UnitTempIntl';
import BinaryIntl from '@/components/calc/BinaryIntl';
import PercentIntl from '@/components/calc/PercentIntl';
import DevJsonIntl from '@/components/calc/DevJsonIntl';
import DevBase64Intl from '@/components/calc/DevBase64Intl';
import DevUrlEncodeIntl from '@/components/calc/DevUrlEncodeIntl';
import DevHashIntl from '@/components/calc/DevHashIntl';
import DevUuidIntl from '@/components/calc/DevUuidIntl';
import DevTimestampIntl from '@/components/calc/DevTimestampIntl';
import DevWordCountIntl from '@/components/calc/DevWordCountIntl';
import DevJwtIntl from '@/components/calc/DevJwtIntl';
import DevRegexIntl from '@/components/calc/DevRegexIntl';
import DevColorIntl from '@/components/calc/DevColorIntl';
import DevSqlIntl from '@/components/calc/DevSqlIntl';
import DevDiffIntl from '@/components/calc/DevDiffIntl';
import DevCronIntl from '@/components/calc/DevCronIntl';
import LoanIntl from '@/components/calc/LoanIntl';
import AvgPriceIntl from '@/components/calc/AvgPriceIntl';
import BreakevenIntl from '@/components/calc/BreakevenIntl';
import DepositIntl from '@/components/calc/DepositIntl';
import SavingsIntl from '@/components/calc/SavingsIntl';
import CompoundGoalIntl from '@/components/calc/CompoundGoalIntl';
import DividendIntl from '@/components/calc/DividendIntl';
import InflationIntl from '@/components/calc/InflationIntl';
import RetirementIntl from '@/components/calc/RetirementIntl';
import ExchangeIntl from '@/components/calc/ExchangeIntl';
import CalorieIntl from '@/components/calc/CalorieIntl';
import ProteinIntl from '@/components/calc/ProteinIntl';
import RunningPaceIntl from '@/components/calc/RunningPaceIntl';
import OneRepMaxIntl from '@/components/calc/OneRepMaxIntl';
import IdealWeightIntl from '@/components/calc/IdealWeightIntl';
import BmiIntl from '@/components/calc/BmiIntl';
import TipIntl from '@/components/calc/TipIntl';
import SleepIntl from '@/components/calc/SleepIntl';
import ChildHeightIntl from '@/components/calc/ChildHeightIntl';
import BodyFatIntl from '@/components/calc/BodyFatIntl';
import CaloriesBurnIntl from '@/components/calc/CaloriesBurnIntl';
import CaffeineIntl from '@/components/calc/CaffeineIntl';
import BloodPressureIntl from '@/components/calc/BloodPressureIntl';
import DdayIntl from '@/components/calc/DdayIntl';
import TimeDiffIntl from '@/components/calc/TimeDiffIntl';
import BirthdayIntl from '@/components/calc/BirthdayIntl';
import OvulationIntl from '@/components/calc/OvulationIntl';
import PregnancyIntl from '@/components/calc/PregnancyIntl';
import CarInstallmentIntl from '@/components/calc/CarInstallmentIntl';
import FuelEfficiencyIntl from '@/components/calc/FuelEfficiencyIntl';
import GasCostIntl from '@/components/calc/GasCostIntl';
import EvChargeIntl from '@/components/calc/EvChargeIntl';
import GpaIntl from '@/components/calc/GpaIntl';
import LtvIntl from '@/components/calc/LtvIntl';
import RefinanceIntl from '@/components/calc/RefinanceIntl';
import LoanMethodIntl from '@/components/calc/LoanMethodIntl';
import WorkHoursIntl from '@/components/calc/WorkHoursIntl';
import OvertimeIntl from '@/components/calc/OvertimeIntl';
import CarCostIntl from '@/components/calc/CarCostIntl';
import AverageIntl from '@/components/calc/AverageIntl';
import RentalYieldIntl from '@/components/calc/RentalYieldIntl';
import AppliancePowerIntl from '@/components/calc/AppliancePowerIntl';
import ShoeSizeIntl from '@/components/calc/ShoeSizeIntl';
import PetAgeIntl from '@/components/calc/PetAgeIntl';
import VolumetricWeightIntl from '@/components/calc/VolumetricWeightIntl';
import { calcCopy, relatedCalcs } from '@/lib/calc-l10n';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { alternateLanguages10, localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/**
 * 다국어 계산기 상세 한 장.
 *
 * 슬러그마다 계산 컴포넌트가 다르므로 여기서 갈라 준다. 문구는 calcCopy가,
 * 계산은 아래 표가 맡는다 — 새 계산기를 더할 때 고칠 곳이 둘이지만, 하나로
 * 합치려면 컴포넌트를 문자열로 들고 있어야 해서 타입이 풀린다.
 */
const TOOLS: Record<string, (p: { lang: CalcLang }) => React.ReactNode> = {
  'shoe-size': ShoeSizeIntl,
  'pet-age': PetAgeIntl,
  'volumetric-weight': VolumetricWeightIntl,
  'average': AverageIntl,
  'rental-yield': RentalYieldIntl,
  'appliance-power': AppliancePowerIntl,
  'ltv': LtvIntl,
  'refinance': RefinanceIntl,
  'loan-method': LoanMethodIntl,
  'work-hours': WorkHoursIntl,
  'overtime': OvertimeIntl,
  'car-cost': CarCostIntl,
  'gpa': GpaIntl,
  'ev-charge': EvChargeIntl,
  'gas-cost': GasCostIntl,
  'fuel-efficiency': FuelEfficiencyIntl,
  'car-installment': CarInstallmentIntl,
  'pregnancy': PregnancyIntl,
  'ovulation': OvulationIntl,
  'birthday': BirthdayIntl,
  'time-diff': TimeDiffIntl,
  'dday': DdayIntl,
  'blood-pressure': BloodPressureIntl,
  'caffeine': CaffeineIntl,
  'calories-burn': CaloriesBurnIntl,
  'body-fat': BodyFatIntl,
  'protein': ProteinIntl,
  'running-pace': RunningPaceIntl,
  'one-rep-max': OneRepMaxIntl,
  'ideal-weight': IdealWeightIntl,
  'bmi': BmiIntl,
  'tip': TipIntl,
  'sleep': SleepIntl,
  'child-height': ChildHeightIntl,
  'calorie': CalorieIntl,
  'exchange': ExchangeIntl,
  'retirement': RetirementIntl,
  'inflation': InflationIntl,
  'dividend': DividendIntl,
  'compound-goal': CompoundGoalIntl,
  'savings': SavingsIntl,
  'deposit': DepositIntl,
  'breakeven': BreakevenIntl,
  'avg-price': AvgPriceIntl,
  'loan': LoanIntl,
  'dev/cron': DevCronIntl,
  'dev/diff': DevDiffIntl,
  'dev/sql': DevSqlIntl,
  'dev/color': DevColorIntl,
  'dev/regex': DevRegexIntl,
  'dev/jwt': DevJwtIntl,
  'dev/word-count': DevWordCountIntl,
  'dev/timestamp': DevTimestampIntl,
  'dev/uuid': DevUuidIntl,
  'dev/hash': DevHashIntl,
  'dev/url-encode': DevUrlEncodeIntl,
  'dev/base64': DevBase64Intl,
  'dev/json': DevJsonIntl,
  'percent': PercentIntl,
  'binary': BinaryIntl,
  'unit-temp': UnitTempIntl,
  'unit-weight': UnitWeightIntl,
  'unit-length': UnitLengthIntl,
};

export function calcIntlMeta(lang: CalcLang, slug: string) {
  const c = calcCopy(lang, slug);
  if (!c) return {};
  const route = `/calculator/${slug}`;
  // 낱장은 허브 카드(/og/<언어>/calculator)를 물려받는다 — 여기에 카드를 새로 만들지 않는다
  return withCard({
    title: c.title,
    description: c.desc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
  });
}

export default function CalcIntlPage({ lang, slug }: { lang: CalcLang; slug: string }) {
  const c = calcCopy(lang, slug);
  const Tool = TOOLS[slug];
  if (!c || !Tool) notFound();

  return (
    <CalcShellIntl
      lang={lang}
      slug={slug}
      title={c.title}
      description={c.desc}
      intro={c.intro}
      faq={c.faq}
      related={relatedCalcs(lang, slug)}
    >
      <Tool lang={lang} />
    </CalcShellIntl>
  );
}
