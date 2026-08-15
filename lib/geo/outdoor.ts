/**
 * 도형 - 생활 계산 다섯째 묶음 (3종) — 마당의 물과 잔디.
 *
 * 이 섹션에는 이미 수영장 부피를 구하는 도구가 있다(채우는 시간). 부피를 알고 난
 * 다음에 실제로 돈이 드는 것은 **데우는 일과 돌리는 일**인데, 둘 다 부피에 상수를
 * 곱하는 계산이라 여기 이웃으로 둔다. 물 대신 씨앗을 뿌리는 잔디 파종량도 면적에
 * 단위 소요량을 곱하는 같은 모양이다.
 *
 * 셋 다 **요금표를 쓰지 않는다.** 전기 요금은 나라마다 다르고 누진 구간까지
 * 얽히므로, 값을 지어내는 대신 kWh에서 멈춘다 — 자기 고지서의 단가를 곱하는 것은
 * 독자가 할 수 있고, 그 편이 어느 나라에서도 틀리지 않는다.
 *
 * 열 계산에 쓰는 상수는 물의 비열 4.186 kJ/(kg·K) 하나뿐이고, 1 L를 1 kg으로 본다.
 * 손실률은 상수로 박지 않고 입력이다 — 덮개를 덮은 수영장과 열어 둔 수영장은
 * 증발로 나가는 열이 몇 배씩 차이 난다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 물의 비열 — 1 kg을 1도 올리는 데 드는 열(kJ) */
const WATER_KJ = 4.186;

export const OUTDOOR_TOOLS: FormulaTool[] = [
  {
    slug: 'pool-heat-time',
    icon: '🌡️',
    category: '생활 계산',
    fields: [
      { key: 'vol', term: 'liters', unit: 'liter', def: 50000, min: 0, step: 1000 },
      { key: 'rise', term: 'tempRise', unit: 'degC', def: 5, min: 0, max: 40, step: 0.5 },
      { key: 'kw', term: 'heaterKw', unit: 'kw', def: 12, min: 0, step: 0.5 },
      { key: 'loss', term: 'heatLossPct', unit: 'percent', def: 20, min: 0, max: 300 },
    ],
    formula: '{heatKwh} = {liters} × 4.186 × {tempRise} ÷ 3600 × (1 + {heatLossPct} ÷ 100),  {heatHours} = {heatKwh} ÷ {heaterKw}',
    compute: v => {
      const net = (v.vol * WATER_KJ * v.rise) / 3600;
      const kwh = net * (1 + v.loss / 100);
      return [
        { term: 'heatHours', unit: 'hour', value: round(ratio(kwh, v.kw), 1), digits: 1, primary: true },
        { term: 'heatKwh', unit: 'kwh', value: round(kwh, 1), digits: 1 },
        // 1도당 값 — 목표 온도를 바꿀 때마다 다시 계산할 필요가 없어진다
        { term: 'kwhPerDeg', unit: 'kwh', value: round((v.vol * WATER_KJ) / 3600 * (1 + v.loss / 100), 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const h = out[0].value;
      const days = round(ratio(h, 24), 1);
      const slow = h > 24;
      return {
        ko: slow
          ? `쉬지 않고 돌려도 ${h}시간, 곧 ${days}일이 걸립니다. 여기서 필요한 것은 더 큰 히터가 아니라 덮개입니다 — 열은 대부분 수면에서 증발로 빠집니다.`
          : `쉬지 않고 돌리면 ${h}시간 걸립니다. 낮에만 돌린다면 그만큼 밤새 식은 몫을 다시 데우게 됩니다.`,
        en: slow
          ? `Even running non-stop this takes ${h} hours — about ${days} days. What fixes that is a cover, not a bigger heater: most of the heat leaves as evaporation from the surface.`
          : `Running non-stop it takes ${h} hours. Heat only during the day and part of every session goes into replacing what last night took away.`,
        l10n: {
          es: slow
            ? `Incluso sin parar tarda ${h} horas, unos ${days} días. Lo que arregla eso es una cubierta, no un calentador mayor: casi todo el calor se va evaporándose por la superficie.`
            : `Funcionando sin parar tarda ${h} horas. Si solo calientas de día, parte de cada sesión se va en reponer lo que se perdió de noche.`,
          'pt-br': slow
            ? `Mesmo sem parar leva ${h} horas, cerca de ${days} dias. O que resolve isso é uma capa, não um aquecedor maior: quase todo o calor sai por evaporação na superfície.`
            : `Rodando sem parar leva ${h} horas. Se você aquece só de dia, parte de cada sessão vai para repor o que a noite tirou.`,
          ja: slow
            ? `連続運転でも ${h} 時間、およそ ${days} 日かかります。効くのは大きなヒーターではなくカバーです — 熱の大半は水面からの蒸発で逃げます。`
            : `連続運転で ${h} 時間かかります。日中だけ焚くなら、その分だけ夜のあいだに冷めた分を温め直すことになります。`,
          de: slow
            ? `Selbst im Dauerbetrieb sind das ${h} Stunden, also rund ${days} Tage. Dagegen hilft eine Abdeckung, kein größerer Heizer — der Wärmeverlust läuft fast ganz über die Verdunstung an der Oberfläche.`
            : `Im Dauerbetrieb dauert es ${h} Stunden. Heizt du nur tagsüber, geht ein Teil jeder Sitzung dafür drauf, die Verluste der Nacht auszugleichen.`,
          fr: slow
            ? `Même en continu il faut ${h} heures, soit environ ${days} jours. Ce qui règle ça, c’est une bâche, pas un chauffage plus gros : la chaleur part presque entièrement par évaporation en surface.`
            : `En continu il faut ${h} heures. Si tu ne chauffes que le jour, une part de chaque cycle sert à rattraper ce que la nuit a emporté.`,
          hi: slow
            ? `लगातार चलाने पर भी ${h} घंटे, यानी लगभग ${days} दिन लगते हैं। इसका हल बड़ा हीटर नहीं, ढक्कन है — ज़्यादातर गर्मी सतह से वाष्पीकरण में जाती है।`
            : `लगातार चलाने पर ${h} घंटे लगते हैं। सिर्फ़ दिन में गर्म करेंगे तो हर बार का कुछ हिस्सा रात में खोई गर्मी लौटाने में जाएगा।`,
          'zh-hans': slow
            ? `就算不停机也要 ${h} 小时，约 ${days} 天。真正管用的是池盖而不是更大的加热器——热量绝大部分是从水面蒸发掉的。`
            : `不停机需要 ${h} 小时。如果只在白天加热，每次都有一部分是在补夜里散掉的热。`,
          'zh-hant': slow
            ? `就算不停機也要 ${h} 小時，約 ${days} 天。真正管用的是池蓋而不是更大的加熱器——熱量絕大部分是從水面蒸發掉的。`
            : `不停機需要 ${h} 小時。如果只在白天加熱，每次都有一部分是在補夜裡散掉的熱。`,
        },
        tone: slow ? 'warn' : 'good',
      };
    },
    ko: {
      title: '수영장 물 데우는 시간 계산기',
      desc: '물 양과 올릴 온도, 히터 출력으로 데우는 데 걸리는 시간과 전력량을 구합니다.',
      long: '물 1 kg을 1도 올리는 데 4.186 kJ이 듭니다. 1 L를 1 kg으로 보면 필요한 열은 물 양 × 4.186 × 올릴 온도이고, 3,600으로 나누면 kWh입니다. 50,000 L를 5도 올리는 데는 291 kWh인데, 여기에 손실을 더해야 실제 값이 됩니다 — 수영장은 데우는 동안에도 수면에서 계속 식기 때문입니다. 손실 20%를 얹으면 349 kWh이고, 12 kW 히터로는 29시간입니다. 이 수치가 사람들의 기대와 어긋나는 지점이 여기입니다. 수영장 난방은 몇 시간이 아니라 며칠 단위의 일입니다.',
      note: '손실률은 덮개가 정합니다. 열린 수면에서 증발로 나가는 열이 전체 손실의 대부분이라 덮개 하나로 손실이 절반 아래로 떨어지는 경우가 흔합니다. 히트펌프는 표시된 소비전력이 아니라 열출력(보통 소비전력의 4~5배)을 넣어야 시간이 맞습니다.',
    },
    en: {
      title: 'Pool Heating Time Calculator',
      desc: 'Hours and kilowatt-hours to raise a pool by a given number of degrees.',
      long: 'Raising a kilogram of water by one degree takes 4.186 kJ. Treating a litre as a kilogram, the heat needed is volume × 4.186 × temperature rise, and dividing by 3,600 turns that into kilowatt-hours. Lifting 50,000 litres by five degrees is 291 kWh before losses — and losses have to be added, because a pool keeps cooling from its surface the whole time you are heating it. At 20% that becomes 349 kWh, which a 12 kW heater delivers in 29 hours. That is where the answer usually surprises people: pool heating is measured in days, not in an afternoon.',
      note: 'The loss figure is really a question about your cover. Evaporation from an open surface accounts for most of the loss, and fitting a cover often cuts it by more than half. For a heat pump, enter the heat output rather than the electrical input printed on the label — the output is typically four to five times larger, and using the wrong one throws the time out by the same factor.',
    },
  },
  {
    slug: 'pool-pump-turnover',
    icon: '🔄',
    category: '생활 계산',
    fields: [
      { key: 'vol', term: 'liters', unit: 'liter', def: 50000, min: 0, step: 1000 },
      { key: 'flow', term: 'flowLpm', unit: 'lpm', def: 250, min: 0, step: 10 },
      { key: 'turns', term: 'turnoverPerDay', unit: 'times', def: 1.5, min: 0, max: 10, step: 0.5 },
      { key: 'kw', term: 'pumpKw', unit: 'kw', def: 1.1, min: 0, step: 0.1 },
    ],
    formula: '{turnoverHours} = {liters} ÷ ({flowLpm} × 60),  {runHours} = {turnoverHours} × {turnoverPerDay}',
    compute: v => {
      const turnover = ratio(v.vol, v.flow * 60);
      const run = turnover * v.turns;
      return [
        { term: 'runHours', unit: 'hour', value: round(run, 1), digits: 1, primary: true },
        { term: 'turnoverHours', unit: 'hour', value: round(turnover, 1), digits: 1 },
        { term: 'monthKwh', unit: 'kwh', value: round(run * v.kw * 30, 0), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const run = out[0].value;
      const kwh = out[2].value;
      const over = run > 24;
      return {
        ko: over
          ? `하루 ${run}시간이 필요한데 하루는 24시간뿐입니다. 펌프가 이 수영장에 작거나 목표 순환 횟수가 과합니다.`
          : `하루 ${run}시간 돌리면 되고, 한 달 전력량은 ${kwh} kWh입니다. 저속으로 오래 돌리는 편이 같은 순환에 전력이 훨씬 적게 듭니다.`,
        en: over
          ? `This asks for ${run} hours a day and a day only has 24. Either the pump is undersized for this pool or the turnover target is too ambitious.`
          : `Run it ${run} hours a day, which comes to ${kwh} kWh a month. Running slower for longer buys the same turnover for far less electricity.`,
        l10n: {
          es: over
            ? `Esto pide ${run} horas al día y el día solo tiene 24. O la bomba se queda corta para esta piscina o el objetivo de recirculación es excesivo.`
            : `Hazla funcionar ${run} horas al día, lo que suma ${kwh} kWh al mes. Ir más despacio durante más tiempo da la misma recirculación con mucha menos electricidad.`,
          'pt-br': over
            ? `Isso pede ${run} horas por dia e o dia só tem 24. Ou a bomba é pequena demais para esta piscina, ou a meta de recirculação está exagerada.`
            : `Deixe rodando ${run} horas por dia, o que dá ${kwh} kWh no mês. Rodar mais devagar por mais tempo entrega a mesma recirculação gastando bem menos.`,
          ja: over
            ? `1日 ${run} 時間必要ですが、1日は24時間しかありません。ポンプがこのプールに対して小さいか、目標の循環回数が多すぎます。`
            : `1日 ${run} 時間まわせば足り、ひと月の電力量は ${kwh} kWh です。低速で長くまわすほうが、同じ循環をずっと少ない電力でこなせます。`,
          de: over
            ? `Das verlangt ${run} Stunden am Tag, und der Tag hat nur 24. Entweder ist die Pumpe für dieses Becken zu klein oder das Umwälzziel zu hoch.`
            : `Lass sie ${run} Stunden täglich laufen, das sind ${kwh} kWh im Monat. Langsamer und länger zu fahren bringt dieselbe Umwälzung mit deutlich weniger Strom.`,
          fr: over
            ? `Il faudrait ${run} heures par jour, et la journée n’en compte que 24. Soit la pompe est sous-dimensionnée, soit l’objectif de brassage est trop élevé.`
            : `Fais-la tourner ${run} heures par jour, soit ${kwh} kWh par mois. Tourner plus lentement mais plus longtemps donne le même brassage pour bien moins d’électricité.`,
          hi: over
            ? `इसके लिए दिन में ${run} घंटे चाहिए, जबकि दिन में सिर्फ़ 24 घंटे हैं। या तो पंप इस पूल के लिए छोटा है, या टर्नओवर का लक्ष्य ज़्यादा है।`
            : `इसे दिन में ${run} घंटे चलाएं, महीने में ${kwh} kWh बनता है। धीमी गति पर ज़्यादा देर चलाने से वही टर्नओवर कहीं कम बिजली में मिल जाता है।`,
          'zh-hans': over
            ? `这需要每天 ${run} 小时，而一天只有 24 小时。要么泵对这个池子偏小，要么循环次数目标定得过高。`
            : `每天开 ${run} 小时就够，一个月约 ${kwh} 度电。低速多开一会儿，同样的循环量能省下不少电。`,
          'zh-hant': over
            ? `這需要每天 ${run} 小時，而一天只有 24 小時。要嘛泵對這個池子偏小，要嘛循環次數目標訂得過高。`
            : `每天開 ${run} 小時就夠，一個月約 ${kwh} 度電。低速多開一會兒，同樣的循環量能省下不少電。`,
        },
        tone: over ? 'bad' : 'good',
      };
    },
    ko: {
      title: '수영장 펌프 가동 시간 계산기',
      desc: '물 양과 펌프 유량으로 물이 한 바퀴 도는 시간과 하루 몇 시간을 돌려야 하는지 구합니다.',
      long: '수영장 물 관리의 기준은 시간이 아니라 순환 횟수입니다. 물 전체가 여과기를 한 번 지나가는 데 걸리는 시간이 순환 시간이고, 물 양을 시간당 유량으로 나눈 값입니다. 50,000 L에 분당 250 L면 한 바퀴에 3.3시간이므로, 하루 1.5바퀴를 목표로 하면 5시간을 돌립니다. 여기서 아껴야 할 것은 시간이 아니라 전력입니다 — 펌프 소비전력은 유량의 세제곱에 가깝게 움직여서, 유량을 절반으로 낮추고 두 배 오래 돌리면 같은 순환을 대략 4분의 1의 전력으로 해냅니다. 가변속 펌프가 비싼 값을 하는 이유가 이것입니다.',
      note: '표시 유량은 배관 저항이 없을 때의 값이라 실제로는 그보다 적게 나옵니다. 정확히 보려면 여과기 압력계와 유량계를 함께 읽으세요. 필터가 막히면 유량이 떨어져 같은 시간을 돌려도 순환이 모자라므로, 역세척 주기도 이 계산의 일부입니다.',
    },
    en: {
      title: 'Pool Pump Run Time Calculator',
      desc: 'Turnover time and daily run hours from pool volume and pump flow rate.',
      long: 'Pool water is managed in turnovers, not in hours. A turnover is the time it takes for the whole body of water to pass through the filter once — volume divided by flow. Fifty thousand litres at 250 litres a minute is one turnover in 3.3 hours, so a target of one and a half turnovers a day means five hours of running. What is worth optimising here is not the hours but the watts: pump power rises with roughly the cube of flow, so halving the speed and running twice as long delivers the same turnover for about a quarter of the electricity. That single relationship is what pays for a variable-speed pump.',
      note: 'The flow printed on a pump is measured with no plumbing resistance, so the real figure is lower — read the filter pressure gauge alongside a flow meter if you want the true number. A dirty filter drops flow further, which means the same run time quietly delivers less turnover, so the backwash interval belongs to this calculation too.',
    },
  },
  {
    slug: 'grass-seed',
    icon: '🌱',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 100, min: 0, step: 1 },
      { key: 'rate', term: 'seedRate', def: 35, min: 0, max: 100, step: 1 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
      { key: 'bag', term: 'bagWeight', def: 5, min: 0, step: 0.5 },
    ],
    formula: '{seedKg} = {area} × {seedRate} × (1 + {extraPct} ÷ 100) ÷ 1000,  {bagCount} = ⌈{seedKg} ÷ {bagWeight}⌉',
    compute: v => {
      const kg = (v.area * v.rate * (1 + v.extra / 100)) / 1000;
      return [
        { term: 'seedKg', unit: 'kg', value: round(kg, 2), digits: 2, primary: true },
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(kg, v.bag)), digits: 0 },
        { term: 'bagCover', unit: 'm2', value: round(ratio(v.bag * 1000, v.rate), 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const kg = out[0].value;
      const cover = out[2].value;
      const thin = v.rate < 20;
      return {
        ko: thin
          ? `㎡당 ${v.rate} g은 덧뿌리기 수준입니다. 맨땅에 새로 까는 파종이라면 이 양으로는 성기게 올라옵니다.`
          : `씨앗 ${kg} kg이 필요하고, 한 포대가 ${cover}㎡를 덮습니다. 두껍게 뿌린다고 잔디가 촘촘해지지 않고 서로 말라 죽습니다.`,
        en: thin
          ? `At ${v.rate} g per m² this is an overseeding rate. Sown onto bare soil it will come up thin.`
          : `You need ${kg} kg of seed and one bag covers ${cover} m². Sowing heavier does not give a denser lawn — the seedlings crowd each other out instead.`,
        l10n: {
          es: thin
            ? `Con ${v.rate} g por m² estás en dosis de resiembra. Sobre suelo desnudo saldrá ralo.`
            : `Necesitas ${kg} kg de semilla y un saco cubre ${cover} m². Sembrar más espeso no da un césped más denso: las plántulas se ahogan entre sí.`,
          'pt-br': thin
            ? `A ${v.rate} g por m² isso é taxa de sobressemeadura. Em solo nu vai nascer ralo.`
            : `Você precisa de ${kg} kg de semente e um saco cobre ${cover} m². Semear mais grosso não deixa o gramado mais denso — as mudinhas se sufocam.`,
          ja: thin
            ? `1㎡あたり ${v.rate} g は追い播きの量です。裸地に新しく播くなら、この量では疎らに生えます。`
            : `種は ${kg} kg 必要で、1袋で ${cover}㎡ をまかなえます。厚く播いても密にはならず、苗どうしが競り合って枯れます。`,
          de: thin
            ? `${v.rate} g pro m² ist eine Nachsaatmenge. Auf offene Erde gesät läuft der Rasen damit dünn auf.`
            : `Du brauchst ${kg} kg Saatgut, und ein Sack reicht für ${cover} m². Dichter zu säen gibt keinen dichteren Rasen — die Keimlinge nehmen sich gegenseitig das Licht.`,
          fr: thin
            ? `À ${v.rate} g par m², c’est une dose de regarnissage. Semé sur sol nu, le gazon lèvera clairsemé.`
            : `Il te faut ${kg} kg de semence et un sac couvre ${cover} m². Semer plus dru ne donne pas un gazon plus dense : les plantules s’étouffent entre elles.`,
          hi: thin
            ? `${v.rate} ग्राम प्रति वर्ग मीटर ओवरसीडिंग की मात्रा है। खुली मिट्टी पर यह विरल उगेगी।`
            : `${kg} kg बीज चाहिए और एक बोरी ${cover} वर्ग मीटर ढकती है। ज़्यादा घना बोने से घास घनी नहीं होती — अंकुर आपस में दबकर मर जाते हैं।`,
          'zh-hans': thin
            ? `每平方米 ${v.rate} 克是补播的用量。撒在裸土上会长得很稀。`
            : `需要 ${kg} 公斤草籽，一袋能覆盖 ${cover} 平方米。撒得更密并不会长得更密，幼苗会互相挤死。`,
          'zh-hant': thin
            ? `每平方公尺 ${v.rate} 公克是補播的用量。撒在裸土上會長得很稀。`
            : `需要 ${kg} 公斤草籽，一袋能覆蓋 ${cover} 平方公尺。撒得更密並不會長得更密，幼苗會互相擠死。`,
        },
        tone: thin ? 'warn' : 'good',
      };
    },
    ko: {
      title: '잔디 씨앗 파종량 계산기',
      desc: '면적과 ㎡당 파종량으로 필요한 씨앗 무게와 포대 수를 구합니다.',
      long: '파종량은 면적에 ㎡당 그램을 곱하면 끝이지만, 그 ㎡당 값이 결과를 전부 정합니다. 그래서 상수로 박지 않고 입력으로 뒀습니다 — 씨앗이 굵은 종일수록 같은 밀도를 내는 데 무게가 더 들기 때문에, 종에 따라 두세 배까지 벌어집니다. 봉지에 적힌 권장 파종량을 그대로 넣으세요. 그리고 같은 종이라도 맨땅에 새로 까는 파종과 이미 있는 잔디에 덧뿌리는 것은 두 배쯤 차이가 납니다. 100㎡에 ㎡당 35 g이면 여유 10%를 더해 3.85 kg이고, 5 kg 포대 하나가 143㎡를 덮습니다.',
      note: '남은 씨앗은 보관해도 발아율이 해마다 떨어지므로 크게 남기지 마세요. 뿌린 뒤 흙과 닿게 살짝 긁어 덮고, 싹이 다 올라올 때까지 겉흙이 마르지 않게 유지하는 것이 파종량보다 결과에 더 큰 영향을 줍니다.',
    },
    en: {
      title: 'Grass Seed Calculator',
      desc: 'Seed weight and bags needed from lawn area and the sowing rate per square metre.',
      long: 'The sum is area times grams per square metre, but that rate is what decides the whole answer, which is why it is an input here rather than a built-in constant. Species with larger seeds need more weight to reach the same plant density, so the published rate can differ two or three fold between them — copy the figure from the bag. On top of that, the same species is sown at roughly double the rate onto bare soil as it is for overseeding an existing lawn. A hundred square metres at 35 g/m² comes to 3.85 kg once 10% is added for waste, and one 5 kg bag covers 143 m².',
      note: 'Leftover seed loses germination every year it sits, so there is little point buying a large surplus. Rake it in lightly so the seed touches soil, then keep the surface damp until everything is up — that matters more to the result than getting the rate exactly right.',
    },
  },
];
