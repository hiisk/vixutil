/**
 * 농도·배합 — 수영장·스파 물 관리 3종.
 *
 * 이 섹션에는 이미 일반적인 농도 계산이 있다(농도 구하기, 희석, 목표 농도 맞추기,
 * ppm↔%). 그런데 수영장은 그 위에 한 겹이 더 있다.
 *
 *   1. **파는 물건이 순물질이 아니다.** 염소는 유효염소 12.5%짜리 액상과 65~73%짜리
 *      과립으로 팔린다. 순수 유효염소 g을 구해 놓고 멈추면 봉지에서 몇 g을 퍼야
 *      하는지는 여전히 모른다.
 *   2. **뺄 수가 없다.** 소금·시아누르산·경도는 한 번 올리면 내리는 방법이 물을
 *      빼는 것뿐이다. 그래서 "얼마를 넣나"만큼 "넘겼을 때 얼마를 빼나"가 중요하고,
 *      그건 배합이 아니라 희석 문제다.
 *
 * 세 도구가 그 셋을 나눠 맡는다. 제품 강도·현재 농도·채움물 농도를 전부 입력으로
 * 드러내는 이유는 자재 계산기와 같다 — 상수로 박으면 특정 제품·특정 수돗물 전용
 * 계산기가 되고, 사용자는 자기 결과가 왜 다른지 알 수 없다.
 *
 * 요율이나 세율처럼 출처가 필요한 값은 하나도 쓰지 않았다. 여기 있는 것은 전부
 * 단위 환산이다 — 1 ppm은 1 mg/L이고, 1,000 L에 1 g을 풀면 1 ppm이 오른다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const POOL_TOOLS: FormulaTool[] = [
  {
    slug: 'pool-chlorine',
    icon: '🧪',
    category: '농도·배합',
    fields: [
      { key: 'vol', term: 'liters', unit: 'liter', def: 50000, min: 0, step: 1000 },
      { key: 'now', term: 'fcNow', unit: 'ppm', def: 1, min: 0, max: 30, step: 0.1 },
      { key: 'target', term: 'fcTarget', unit: 'ppm', def: 3, min: 0, max: 30, step: 0.1 },
      { key: 'strength', term: 'chlorineStrength', unit: 'percent', def: 12.5, min: 0, max: 100, step: 0.5 },
    ],
    formula: '{pureChlorine} = {liters} × ({fcTarget} − {fcNow}) ÷ 1000,  {chlorineDose} = {pureChlorine} ÷ ({chlorineStrength} ÷ 100)',
    compute: v => {
      // 모자란 만큼만 넣는다 — 목표를 이미 넘겼으면 0이고, 염소는 되돌릴 수 없다
      const gap = Math.max(0, v.target - v.now);
      const pure = (v.vol * gap) / 1000;
      return [
        { term: 'chlorineDose', unit: 'gram', value: round(ratio(pure, v.strength / 100), 1), digits: 1, primary: true },
        { term: 'pureChlorine', unit: 'gram', value: round(pure, 1), digits: 1 },
        // 1 ppm을 올리는 데 드는 제품 양 — 다음에 계산기 없이 암산할 수 있는 값
        { term: 'dosePerPpm', unit: 'gram', value: round(ratio(v.vol / 1000, v.strength / 100), 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const gap = round(Math.max(0, v.target - v.now), 1);
      const dose = out[0].value;
      const done = gap <= 0;
      return {
        ko: done
          ? `이미 목표 이상입니다. 염소는 다시 꺼낼 수 없으니 아무것도 넣지 말고 떨어지기를 기다리세요.`
          : `${gap} ppm을 올리려면 제품 ${dose}입니다 — 과립은 g, 액상은 표기가 100 mL당 g이라 같은 수를 mL로 읽습니다.`,
        en: done
          ? `You are already at or above target. Chlorine cannot be taken back out, so add nothing and let it fall.`
          : `Raising by ${gap} ppm takes ${dose} of product — grams for granular, and the same number as millilitres for liquid, whose percentage is stated per 100 mL.`,
        l10n: {
          es: done
            ? `Ya estás en el objetivo o por encima. El cloro no se puede retirar, así que no añadas nada y deja que baje.`
            : `Subir ${gap} ppm exige ${dose} de producto: gramos si es granulado y esa misma cifra en mililitros si es líquido, cuyo porcentaje se indica por cada 100 mL.`,
          'pt-br': done
            ? `Você já está no alvo ou acima dele. Cloro não sai depois de entrar, então não acrescente nada e espere cair.`
            : `Subir ${gap} ppm pede ${dose} de produto: gramas no granulado e esse mesmo número em mililitros no líquido, cuja porcentagem vem por 100 mL.`,
          ja: done
            ? `すでに目標以上です。塩素は後から抜けないので、何も入れずに下がるのを待ってください。`
            : `${gap} ppm 上げるには製品 ${dose} です。粒状ならg、液体は表示が100 mLあたりのgなので同じ数字をmLとして読みます。`,
          de: done
            ? `Du liegst schon auf oder über dem Zielwert. Chlor lässt sich nicht wieder herausnehmen — gib nichts zu und warte, bis es fällt.`
            : `Für ${gap} ppm mehr brauchst du ${dose} Produkt: Gramm beim Granulat, und dieselbe Zahl als Milliliter beim flüssigen, dessen Prozentangabe sich auf 100 mL bezieht.`,
          fr: done
            ? `Tu es déjà au niveau visé ou au-dessus. Le chlore ne se retire pas : n’ajoute rien et laisse-le redescendre.`
            : `Monter de ${gap} ppm demande ${dose} de produit : des grammes pour le granulé, et le même chiffre en millilitres pour le liquide, dont le pourcentage s’exprime pour 100 mL.`,
          hi: done
            ? `आप पहले ही लक्ष्य पर या उससे ऊपर हैं। क्लोरीन वापस नहीं निकाला जा सकता, इसलिए कुछ न डालें और उसे गिरने दें।`
            : `${gap} ppm बढ़ाने के लिए ${dose} उत्पाद चाहिए — दानेदार में ग्राम, और तरल में वही संख्या मिलीलीटर में, क्योंकि उसका प्रतिशत प्रति 100 mL लिखा होता है।`,
          'zh-hans': done
            ? `已经达到或超过目标。氯加进去就取不出来，别再投药，等它自己降下来。`
            : `提高 ${gap} ppm 需要 ${dose} 药剂——颗粒按克算，液体的百分比是按每 100 毫升标的，同一个数字直接读作毫升。`,
          'zh-hant': done
            ? `已經到達或超過目標。氯加下去就取不回來，別再投藥，等它自己降下來。`
            : `提高 ${gap} ppm 需要 ${dose} 藥劑——顆粒按克算，液體的百分比是按每 100 毫升標示的，同一個數字直接讀作毫升。`,
        },
        tone: done ? 'warn' : 'good',
      };
    },
    ko: {
      title: '수영장 염소 투입량 계산기',
      desc: '물 양과 현재·목표 유리염소로 넣어야 할 염소제의 양을 구합니다.',
      long: '1 ppm은 1 mg/L이므로, 물 1,000 L의 농도를 1 ppm 올리는 데 필요한 순수 유효염소는 딱 1 g입니다. 여기까지는 쉬운데 가게에서 파는 것은 순수 염소가 아닙니다. 그래서 그 무게를 제품의 유효염소 비율로 한 번 더 나눕니다. 50,000 L를 1 ppm에서 3 ppm으로 올리면 순수 유효염소가 100 g이고, 유효염소 12.5% 제품이라면 800을 퍼야 합니다. 액상 표백제류의 %는 무게가 아니라 100 mL당 g으로 적히기 때문에, 이 800이라는 수를 과립이면 g으로, 액상이면 mL로 읽으면 둘 다 맞습니다.',
      note: '유리염소는 시아누르산(안정제) 농도에 묶여 있습니다. 안정제가 높으면 같은 유리염소로도 살균력이 떨어져 목표치를 올려 잡아야 합니다. 그리고 넣은 염소는 뺄 수 없으니 한 번에 목표까지 가지 말고 절반씩 나눠 넣고 다시 재세요.',
    },
    en: {
      title: 'Pool Chlorine Dose Calculator',
      desc: 'How much chlorine product to add, from pool volume and the current and target free chlorine.',
      long: 'One ppm is one mg/L, so raising 1,000 litres by 1 ppm takes exactly 1 gram of pure available chlorine. That part is easy — the part people get wrong is that shops do not sell pure chlorine, so the weight has to be divided again by the product strength. Taking 50,000 litres from 1 ppm to 3 ppm needs 100 g of pure available chlorine, which is 800 of a 12.5% product. Liquid chlorine states its percentage as grams per 100 mL rather than by weight, so reading that 800 as grams for granular and as millilitres for liquid is correct either way.',
      note: 'Free chlorine only works as hard as your stabiliser level allows: high cyanuric acid blunts it, and the target has to move up to compensate. Chlorine also cannot be removed once added, so dose half, wait, and retest rather than jumping straight to target.',
    },
  },
  {
    slug: 'pool-salt',
    icon: '🧂',
    category: '농도·배합',
    fields: [
      { key: 'vol', term: 'liters', unit: 'liter', def: 50000, min: 0, step: 1000 },
      { key: 'now', term: 'saltNow', unit: 'ppm', def: 800, min: 0, max: 10000, step: 50 },
      { key: 'target', term: 'saltTarget', unit: 'ppm', def: 3200, min: 0, max: 10000, step: 50 },
      { key: 'bag', term: 'bagWeight', def: 20, min: 0, step: 1 },
    ],
    formula: '{saltKg} = {liters} × ({saltTarget} − {saltNow}) ÷ 1,000,000,  {bagCount} = ⌈{saltKg} ÷ {bagWeight}⌉',
    compute: v => {
      const gap = Math.max(0, v.target - v.now);
      const kg = (v.vol * gap) / 1e6;
      return [
        { term: 'saltKg', unit: 'kg', value: round(kg, 1), digits: 1, primary: true },
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(kg, v.bag)), digits: 0 },
        // 포대 하나가 이 수영장에서 몇 ppm을 올리는가 — 마지막 한 포대를 넣을지 말지를 정하는 값
        { term: 'ppmPerBag', unit: 'ppm', value: Math.round(ratio(v.bag * 1e6, v.vol)), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const over = v.now > v.target;
      const kg = out[0].value;
      const per = out[2].value;
      return {
        ko: over
          ? `이미 목표보다 짭니다. 소금은 걸러 낼 수 없어서 물을 빼고 새로 채우는 것 말고는 낮출 방법이 없습니다.`
          : `소금 ${kg} kg이 필요하고, 한 포대가 이 물에서 ${per} ppm을 올립니다 — 마지막 포대는 재보고 넣으세요.`,
        en: over
          ? `You are already saltier than target. Salt cannot be filtered out, so the only way down is draining water and refilling.`
          : `You need ${kg} kg of salt, and one bag moves this pool by ${per} ppm — retest before you tip in the last one.`,
        l10n: {
          es: over
            ? `Ya estás por encima de la salinidad objetivo. La sal no se filtra: la única forma de bajarla es vaciar agua y rellenar.`
            : `Necesitas ${kg} kg de sal, y un saco mueve esta piscina ${per} ppm; vuelve a medir antes de echar el último.`,
          'pt-br': over
            ? `Você já passou da salinidade alvo. Sal não sai no filtro: só dá para baixar esvaziando água e completando de novo.`
            : `São necessários ${kg} kg de sal, e um saco move esta piscina em ${per} ppm — meça de novo antes de jogar o último.`,
          ja: over
            ? `すでに目標より塩分が高い状態です。塩は濾過で抜けないので、水を抜いて入れ替えるしか下げる手がありません。`
            : `塩は ${kg} kg 必要で、1袋でこのプールが ${per} ppm 動きます。最後の1袋は測り直してから入れてください。`,
          de: over
            ? `Du liegst schon über dem Salzgehalt-Ziel. Salz lässt sich nicht herausfiltern — nur Wasser ablassen und nachfüllen senkt es.`
            : `Du brauchst ${kg} kg Salz, und ein Sack bewegt dieses Becken um ${per} ppm — miss vor dem letzten Sack noch einmal nach.`,
          fr: over
            ? `Tu dépasses déjà la salinité visée. Le sel ne se filtre pas : seule une vidange partielle suivie d’un remplissage la fait baisser.`
            : `Il faut ${kg} kg de sel, et un sac déplace ce bassin de ${per} ppm — remesure avant de verser le dernier.`,
          hi: over
            ? `आप पहले ही लक्ष्य से ज़्यादा खारे हैं। नमक छानकर नहीं निकलता, इसलिए पानी निकालकर दोबारा भरना ही एकमात्र रास्ता है।`
            : `${kg} kg नमक चाहिए, और एक बोरी इस पूल को ${per} ppm हिलाती है — आख़िरी बोरी डालने से पहले दोबारा नापें।`,
          'zh-hans': over
            ? `盐度已经超过目标。盐过滤不掉，只能放掉一部分水再补新水才能降下来。`
            : `需要 ${kg} 公斤盐，这个池子每袋能提高 ${per} ppm——倒最后一袋前先复测一次。`,
          'zh-hant': over
            ? `鹽度已經超過目標。鹽過濾不掉，只能放掉一部分水再補新水才降得下來。`
            : `需要 ${kg} 公斤鹽，這個池子每袋能提高 ${per} ppm——倒最後一袋前先複測一次。`,
        },
        tone: over ? 'bad' : 'good',
      };
    },
    ko: {
      title: '수영장 소금 투입량 계산기',
      desc: '염소발생기 수영장의 현재 염도를 목표까지 올리는 데 필요한 소금과 포대 수를 구합니다.',
      long: '염도도 ppm이라 셈은 염소와 같지만 자릿수가 다릅니다. 1 ppm은 1 mg/L이므로 물 1 L를 1,000 ppm 올리는 데 1 g, 곧 50,000 L를 2,400 ppm 올리는 데 120 kg이 듭니다. 20 kg 포대라면 여섯 포대입니다. 소금은 순도가 거의 100%라 염소처럼 제품 강도로 한 번 더 나눌 일이 없고, 대신 한 포대가 몇 ppm을 올리는지를 알아 두는 편이 실용적입니다 — 이 예에서는 포대당 400 ppm이라 마지막 한 포대가 목표를 훌쩍 넘길 수 있습니다.',
      note: '염소발생기는 대개 2,700~3,400 ppm에서 돌아가고 기기마다 다르므로 목표는 설명서를 보고 넣으세요. 넣기 전에 순환 펌프를 켜고, 셀이 마른 소금을 지나가지 않도록 스키머가 아니라 얕은 쪽 바닥에 부어 쓸어 녹입니다.',
    },
    en: {
      title: 'Pool Salt Calculator',
      desc: 'Salt and bags needed to bring a saltwater pool from its current reading up to target.',
      long: 'Salinity is measured in ppm just like chlorine, so the arithmetic is identical — only the scale differs. One ppm is one mg/L, so raising a litre by 1,000 ppm takes a gram, and raising 50,000 litres by 2,400 ppm takes 120 kg, or six 20 kg bags. Salt is close to pure, so there is no second division by product strength the way there is with chlorine. What is worth knowing instead is how far one bag moves your pool: here each bag is worth 400 ppm, which is enough for the last bag to overshoot the target on its own.',
      note: 'Most chlorinators run somewhere between 2,700 and 3,400 ppm and the right figure is the one in your cell manual, not a general rule. Run the pump while you add it, and pour along the shallow end floor and brush it in rather than down the skimmer, so undissolved salt never reaches the cell.',
    },
  },
  {
    slug: 'pool-dilution-drain',
    icon: '🚿',
    category: '농도·배합',
    fields: [
      { key: 'vol', term: 'liters', unit: 'liter', def: 50000, min: 0, step: 1000 },
      { key: 'now', term: 'concNow', unit: 'ppm', def: 100, min: 0, max: 10000, step: 5 },
      // 목표를 절반(50)으로 두면 "절반만 갈면 얼마"라는 셋째 결과와 값이 겹쳐
      // 판정문이 제 말을 부정한다. 시아누르산 목표로 흔한 40을 기본값으로 둔다.
      { key: 'target', term: 'concTarget', unit: 'ppm', def: 40, min: 0, max: 10000, step: 5 },
      { key: 'fill', term: 'fillConc', unit: 'ppm', def: 0, min: 0, max: 10000, step: 5 },
    ],
    formula: '{drainPct} = ({concNow} − {concTarget}) ÷ ({concNow} − {fillConc}) × 100,  {drainLiters} = {liters} × {drainPct} ÷ 100',
    compute: v => {
      // 채움물이 이미 목표보다 진하면 물갈이로는 못 내린다 — 그때는 비율이 1을 넘으므로 잘라 낸다
      const span = v.now - v.fill;
      const raw = span <= 0 ? 0 : ratio(v.now - v.target, span);
      const f = Math.min(1, Math.max(0, raw));
      return [
        { term: 'drainPct', unit: 'percent', value: round(f * 100, 1), digits: 1, primary: true },
        { term: 'drainLiters', unit: 'liter', value: Math.round(v.vol * f), digits: 0 },
        // 절반만 갈았을 때 남는 농도 — "반쯤 빼면 되겠지"가 왜 안 통하는지 보여준다
        { term: 'halfDrainConc', unit: 'ppm', value: round(v.fill + (v.now - v.fill) / 2, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const pct = out[0].value;
      const half = out[2].value;
      const stuck = v.fill >= v.target && v.now > v.target;
      const done = v.now <= v.target;
      const ko = stuck
        ? `채움물 자체가 ${v.fill} ppm이라 물을 다 갈아도 목표 아래로는 못 내려갑니다. 물이 아니라 물 공급원을 바꿔야 하는 문제입니다.`
        : done
          ? `이미 목표 아래입니다. 뺄 물이 없습니다.`
          : `물의 ${pct}%를 빼고 새로 채워야 합니다. 절반만 갈면 ${half} ppm에서 멈춥니다 — 희석은 뺀 비율만큼만 듣습니다.`;
      const en = stuck
        ? `Your fill water is already ${v.fill} ppm, so no amount of draining gets below the target. That is a water-source problem, not a pool problem.`
        : done
          ? `You are already under target — there is nothing to drain.`
          : `Drain and replace ${pct}% of the water. Changing half of it only reaches ${half} ppm — dilution pays out strictly in proportion to what you removed.`;
      return {
        ko, en,
        l10n: {
          es: stuck
            ? `Tu agua de relleno ya viene a ${v.fill} ppm, así que por mucho que vacíes no bajarás del objetivo. El problema está en el origen del agua, no en la piscina.`
            : done
              ? `Ya estás por debajo del objetivo: no hay nada que vaciar.`
              : `Vacía y repón el ${pct} % del agua. Cambiar solo la mitad se queda en ${half} ppm: la dilución paga exactamente en proporción a lo que sacaste.`,
          'pt-br': stuck
            ? `Sua água de reposição já vem com ${v.fill} ppm, então esvaziar quanto for não desce do alvo. O problema é a fonte de água, não a piscina.`
            : done
              ? `Você já está abaixo do alvo — não há o que esvaziar.`
              : `Esvazie e reponha ${pct}% da água. Trocar só metade para em ${half} ppm: a diluição rende exatamente na proporção do que saiu.`,
          ja: stuck
            ? `補給水そのものが ${v.fill} ppm なので、どれだけ抜いても目標より下にはなりません。プールではなく水源の問題です。`
            : done
              ? `すでに目標を下回っています。抜く水はありません。`
              : `水の ${pct}% を抜いて入れ替えてください。半分だけ替えても ${half} ppm で止まります — 希釈は抜いた割合の分しか効きません。`,
          de: stuck
            ? `Dein Füllwasser bringt schon ${v.fill} ppm mit, also kommst du durch Ablassen nie unter den Zielwert. Das ist ein Problem der Wasserquelle, nicht des Beckens.`
            : done
              ? `Du liegst bereits unter dem Zielwert — es gibt nichts abzulassen.`
              : `Lass ${pct} % des Wassers ab und fülle wieder auf. Nur die Hälfte zu tauschen endet bei ${half} ppm — Verdünnung zahlt genau im Verhältnis zum abgelassenen Anteil.`,
          fr: stuck
            ? `Ton eau de remplissage arrive déjà à ${v.fill} ppm : aucune vidange ne passera sous la cible. Le problème vient de la source, pas du bassin.`
            : done
              ? `Tu es déjà sous la cible — il n’y a rien à vidanger.`
              : `Vidange et remplace ${pct} % de l’eau. N’en changer que la moitié s’arrête à ${half} ppm : la dilution ne rend que la part que tu as retirée.`,
          hi: stuck
            ? `आपका भरने वाला पानी ही ${v.fill} ppm पर है, इसलिए कितना भी निकालें लक्ष्य से नीचे नहीं जाएगा। यह पूल की नहीं, पानी के स्रोत की समस्या है।`
            : done
              ? `आप पहले ही लक्ष्य से नीचे हैं — निकालने को कुछ नहीं है।`
              : `पानी का ${pct}% निकालकर नया भरें। आधा ही बदलने पर ${half} ppm पर रुक जाएंगे — तनुकरण उतना ही देता है जितना आपने निकाला।`,
          'zh-hans': stuck
            ? `补水本身就有 ${v.fill} ppm，放多少水都降不到目标以下。这是水源的问题，不是池子的问题。`
            : done
              ? `已经低于目标，没有需要放掉的水。`
              : `放掉并换掉 ${pct}% 的水。只换一半只能到 ${half} ppm——稀释严格按放掉的比例见效。`,
          'zh-hant': stuck
            ? `補水本身就有 ${v.fill} ppm，放多少水都降不到目標以下。這是水源的問題，不是池子的問題。`
            : done
              ? `已經低於目標，沒有需要放掉的水。`
              : `放掉並換掉 ${pct}% 的水。只換一半只能到 ${half} ppm——稀釋嚴格按放掉的比例見效。`,
        },
        tone: stuck ? 'bad' : done ? 'good' : 'warn',
      };
    },
    ko: {
      title: '수영장 물갈이 비율 계산기',
      desc: '시아누르산·염도·경도가 너무 높을 때 물을 몇 % 빼고 채워야 목표 농도가 되는지 구합니다.',
      long: '수영장에는 넣을 수는 있어도 뺄 수는 없는 값이 여럿 있습니다. 시아누르산, 염도, 칼슘 경도가 그렇고 이들을 낮추는 방법은 물을 빼고 새 물로 채우는 것뿐입니다. 빼는 비율은 (현재 − 목표) ÷ (현재 − 채움물)입니다. 100 ppm을 50 ppm으로 내리는데 수돗물이 0 ppm이면 정확히 절반을 갈아야 합니다. 여기서 사람들이 자주 헛수고를 하는 지점이 채움물입니다 — 경수 지역이라 수돗물 경도가 이미 250 ppm인데 목표가 200 ppm이면, 물을 전부 갈아도 250에서 멈춥니다.',
      note: '희석은 물이 고르게 섞였다고 보고 계산합니다. 실제로는 얕은 쪽만 퍼내면 덜 섞여 계산보다 덜 내려가므로, 빼는 동안 펌프를 돌리세요. 지하수위가 높은 곳에서 물을 많이 빼면 빈 수조가 떠오를 수 있으니 한 번에 3분의 1씩 나눠 가는 편이 안전합니다.',
    },
    en: {
      title: 'Pool Drain and Refill Calculator',
      desc: 'What share of the water to drain and replace to bring cyanuric acid, salt or hardness down to target.',
      long: 'Several pool readings only go up. Cyanuric acid, salt and calcium hardness all behave that way, and the only way down is to drain water and refill. The share to replace is (current − target) ÷ (current − fill water). Going from 100 ppm to 50 ppm on 0 ppm tap water means swapping exactly half. The fill water is where this quietly goes wrong: in a hard-water area whose supply already reads 250 ppm, a pool being pulled toward 200 ppm cannot get there at all — replace every drop and it still lands on 250.',
      note: 'The formula assumes the water mixes evenly. Pumping only off the shallow end mixes less than that and drops the reading less than predicted, so keep the pump running while you drain. Where the water table is high, emptying a lot at once can float the shell, so replacing a third at a time is the safer way to do it.',
    },
  },
];
