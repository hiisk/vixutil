/* ────────────────────────────────────────────────
   사주(四柱) 영어·중국어 데이터.

   사주는 중화권에서 八字로 본토 문화라 zh 수요가 크다. 한자(甲子·乙丑…)는
   세 언어가 공유하므로 그대로 쓰고, 해석 문구만 언어별로 새로 썼다.

   영어권에는 대응 용어가 없어 통용되는 표기를 따랐다 — 天干은 Heavenly Stems,
   地支는 Earthly Branches, 十神은 Ten Gods, 大運은 Luck Pillars.

   계산(간지 산출·십성 판정·대운)은 saju-data.ts를 그대로 쓴다. 여기에는
   문구만 있고 계산은 없다 — 같은 생년월일이면 세 언어가 같은 명식을 낸다.
──────────────────────────────────────────────── */
export type SajuIntlLang = 'en';

/* ── 오행 ── */
export const ELEMENT_INTL: Record<SajuIntlLang, Record<string, { label: string; advice: string; shortage: string }>> = {
  en: {
    목: { label: 'Wood (木)',
      advice: 'Strong creative and growth energy. Favours new starts and challenges, and shows well in teaching and the arts.',
      shortage: 'Keep green plants nearby, or take an early morning walk. Starting something new to learn also feeds Wood.' },
    화: { label: 'Fire (火)',
      advice: 'Abundant warmth and expressiveness. Sociable and charismatic, standing out in leadership and creative work.',
      shortage: 'Wear bright, warm colours and spend more time around people. Activity toward the south lifts Fire.' },
    토: { label: 'Earth (土)',
      advice: 'Strong stability and trustworthiness. Grounded and consistent, excellent at building results that last.',
      shortage: 'Build regular habits and spend time close to the ground — gardening, hiking, anything with soil in it.' },
    금: { label: 'Metal (金)',
      advice: 'Strong resolve and principle. Analytical and determined, pursuing a high standard in whatever you take on.',
      shortage: 'Practise setting a rule and keeping it. White and silver objects help, as does turning toward the west.' },
    수: { label: 'Water (水)',
      advice: 'Outstanding wisdom and adaptability. Deep insight and tolerance that resolve complicated situations smoothly.',
      shortage: 'Reading, meditation and walks by water help. Keep blue close and spend time facing north.' },
  },
};

/* ── 천간 10개 ── */
interface StemIntl {
  kor: string; nature: string; personality: string;
  luckyColor: string; luckyDirection: string; aptitude: string;
}

export const STEMS_INTL: Record<SajuIntlLang, Record<string, StemIntl>> = {
  en: {
    甲: { kor: 'Jia', nature: 'Great tree, bamboo', luckyColor: 'Green · blue', luckyDirection: 'East', aptitude: 'Management · education · medicine · sport',
      personality: 'A natural leader with a pioneering streak. Like a tall tree you stand your ground and pull others along, and you are not afraid to take on something untried. The drive toward a goal runs straight and strong; cultivating the flexibility to actually hear other people is what turns that drive into larger success.' },
    乙: { kor: 'Yi', nature: 'Grass, vine', luckyColor: 'Green · yellow', luckyDirection: 'Southeast', aptitude: 'Arts · counselling · fashion · diplomacy',
      personality: 'Flexible and highly adaptable, with a talent for getting what you want through gentle means rather than force. Your relationships are numerous and your consideration for others runs deep, which is why people tend to be fond of you. Like a vine using a trellis, you are clever about making the most of the environment you are in, and you persist.' },
    丙: { kor: 'Bing', nature: 'Sun, great fire', luckyColor: 'Red · orange', luckyDirection: 'South', aptitude: 'Broadcasting · performance · sales · politics',
      personality: 'Bright and warm, the sort of presence that draws attention anywhere. Like the sun you shine openly and light up what is around you. Passion and charisma are strong, though too much certainty in your own view can create friction — considering where the other person stands matters here.' },
    丁: { kor: 'Ding', nature: 'Candle, lamplight', luckyColor: 'Red · purple', luckyDirection: 'South', aptitude: 'Research · design · writing · religion',
      personality: 'A quieter, more focused flame. You warm the people close to you rather than the whole room, and your attention goes deep rather than wide. Sensitive to detail and to atmosphere, with an inner intensity that is easy to miss from the outside.' },
    戊: { kor: 'Wu', nature: 'Mountain, great earth', luckyColor: 'Yellow · brown', luckyDirection: 'Centre', aptitude: 'Property · construction · finance · administration',
      personality: 'Solid and dependable, the person others lean on. You are not easily moved, which is a strength in a crisis and a liability when circumstances genuinely call for change. Trust accumulates around you over time rather than arriving quickly.' },
    己: { kor: 'Ji', nature: 'Field, soft earth', luckyColor: 'Yellow · beige', luckyDirection: 'Centre', aptitude: 'Agriculture · nursing · service · accounting',
      personality: 'Accommodating and nurturing, the kind of ground that lets other things grow. You adapt to what is needed rather than imposing a shape, which makes you easy to work with. Watch that accommodating everyone does not leave your own needs last.' },
    庚: { kor: 'Geng', nature: 'Sword, raw metal', luckyColor: 'White · silver', luckyDirection: 'West', aptitude: 'Military · law · engineering · surgery',
      personality: 'Decisive and direct, with a clean sense of right and wrong. You cut through rather than work around, which is efficient and occasionally sharp. Principle matters more to you than comfort, and people know where they stand with you.' },
    辛: { kor: 'Xin', nature: 'Jewel, refined metal', luckyColor: 'White · gold', luckyDirection: 'West', aptitude: 'Jewellery · beauty · precision work · criticism',
      personality: 'Refined and exacting, with a strong aesthetic sense. You notice what is slightly off in a way most people do not, and you hold a high standard for yourself first. That precision reads as elegance when it is turned outward and as harshness when it is turned inward.' },
    壬: { kor: 'Ren', nature: 'Ocean, great water', luckyColor: 'Black · blue', luckyDirection: 'North', aptitude: 'Trade · logistics · travel · media',
      personality: 'Wide-ranging and hard to contain, with a mind that moves easily across subjects. You take in a great deal and connect things others keep separate. The risk is spreading thin — depth needs deliberate choosing when breadth comes this naturally.' },
    癸: { kor: 'Gui', nature: 'Rain, dew', luckyColor: 'Black · grey', luckyDirection: 'North', aptitude: 'Research · counselling · medicine · the occult',
      personality: 'Quiet, perceptive and patient. You work by seeping in rather than pushing, and you notice what goes unsaid. There is real endurance here that is easy to underestimate, including by yourself.' },
  },
};

/* ── 지지 12개 ── */
export const BRANCHES_INTL: Record<SajuIntlLang, Record<string, { kor: string; animal: string; season: string }>> = {
  en: {
    子: { kor: 'Zi', animal: 'Rat', season: 'Winter' },
    丑: { kor: 'Chou', animal: 'Ox', season: 'Winter' },
    寅: { kor: 'Yin', animal: 'Tiger', season: 'Spring' },
    卯: { kor: 'Mao', animal: 'Rabbit', season: 'Spring' },
    辰: { kor: 'Chen', animal: 'Dragon', season: 'Spring' },
    巳: { kor: 'Si', animal: 'Snake', season: 'Summer' },
    午: { kor: 'Wu', animal: 'Horse', season: 'Summer' },
    未: { kor: 'Wei', animal: 'Goat', season: 'Summer' },
    申: { kor: 'Shen', animal: 'Monkey', season: 'Autumn' },
    酉: { kor: 'You', animal: 'Rooster', season: 'Autumn' },
    戌: { kor: 'Xu', animal: 'Dog', season: 'Autumn' },
    亥: { kor: 'Hai', animal: 'Pig', season: 'Winter' },
  },
};

/* ── 십성 10개 ── */
interface SipseongIntl {
  name: string; summary: string; category: string;
  male: string; female: string; career: string; wealth: string;
}

export const SIPSEONG_INTL: Record<SajuIntlLang, Record<string, SipseongIntl>> = {
  en: {
    비견: { name: 'Friend (比肩)', summary: 'Independence · competition', category: 'Self',
      male: 'The star of siblings and peers. Strong independence and high self-regard. The instinct to solve everything alone can push people away without meaning to.',
      female: 'The star of sisters, friends and same-sex rivals. Self-reliant, walking your own road. Partnership luck can weaken, but redirecting that energy into a career turns it into a strength.',
      career: 'Favours independent business, freelancing and the professions. You shine where you decide and execute alone.',
      wealth: 'Money comes and goes in swings. Sole operation is safer than partnership or joint investment.' },
    겁재: { name: 'Rob Wealth (劫財)', summary: 'Struggle · breakthrough', category: 'Self',
      male: 'The star of competition. Considerable drive and a willingness to take risk, with a tendency to push through where others would wait.',
      female: 'Strong competitive energy. Effective in contested environments, though it can strain close relationships if left unchecked.',
      career: 'Suits sales, sport, and anywhere performance is measured directly against others.',
      wealth: 'Income can be substantial but is rarely steady. Guard against lending and against decisions made in haste.' },
    식신: { name: 'Eating God (食神)', summary: 'Expression · enjoyment', category: 'Output',
      male: 'The star of ease and appetite. Generous, unhurried, and good at enjoying what is in front of you.',
      female: 'The star of children and of creative output. Warm and nurturing, with a natural talent for making things pleasant.',
      career: 'Favours food, hospitality, the arts, and anything that involves making something people enjoy.',
      wealth: 'Money arrives steadily rather than dramatically. Comfort matters more to you than accumulation.' },
    상관: { name: 'Hurting Officer (傷官)', summary: 'Talent · rebellion', category: 'Output',
      male: 'The star of sharp talent. Quick, articulate and impatient with authority that has not earned it.',
      female: 'Strong self-expression and a low tolerance for constraint. Brilliant in the right setting, restless in the wrong one.',
      career: 'Suits performance, criticism, design and any field where originality outweighs conformity.',
      wealth: 'Earnings track your output directly. The variable to manage is consistency, not capability.' },
    편재: { name: 'Indirect Wealth (偏財)', summary: 'Opportunity · circulation', category: 'Wealth',
      male: 'The star of movable money and of wide social range. Generous with what you have and quick to spot an opening.',
      female: 'Resourceful and outward-facing, with money that moves rather than sits.',
      career: 'Favours trade, investment, sales and anything with a deal in it.',
      wealth: 'Large sums can arrive and leave quickly. Setting aside a fixed portion before spending is the useful discipline.' },
    정재: { name: 'Direct Wealth (正財)', summary: 'Stability · accumulation', category: 'Wealth',
      male: 'The star of steady income and, traditionally, of the spouse. Careful with money and reliable with commitments.',
      female: 'Practical and grounded about resources, building rather than gambling.',
      career: 'Suits accounting, administration, and salaried work with clear structure.',
      wealth: 'Accumulates slowly and holds. Your risk is being too cautious to take a worthwhile opening.' },
    편관: { name: 'Seven Killings (偏官)', summary: 'Pressure · decisiveness', category: 'Authority',
      male: 'The star of challenge and command. Performs under pressure, sometimes seeks it out.',
      female: 'Traditionally read as the star of a demanding partner or of authority. Considerable resilience under strain.',
      career: 'Favours the military, law enforcement, surgery, and crisis-facing roles.',
      wealth: 'Income tied to responsibility taken on. Rises with the weight you are willing to carry.' },
    정관: { name: 'Direct Officer (正官)', summary: 'Order · responsibility', category: 'Authority',
      male: 'The star of position and propriety. Reliable, rule-respecting and trusted with responsibility.',
      female: 'Traditionally the star of the husband and of social standing. Composed and well regarded.',
      career: 'Suits public service, large organisations and any structured hierarchy.',
      wealth: 'Steady and predictable. Growth comes through position rather than through risk.' },
    편인: { name: 'Indirect Resource (偏印)', summary: 'Insight · the unconventional', category: 'Resource',
      male: 'The star of unusual knowledge. Draws on sources others overlook, and thinks sideways.',
      female: 'Intuitive and drawn to the unorthodox, with real depth in specialised subjects.',
      career: 'Favours research, technical specialisation, medicine and the metaphysical.',
      wealth: 'Money follows expertise rather than effort. Narrow and deep pays better than broad here.' },
    정인: { name: 'Direct Resource (正印)', summary: 'Learning · protection', category: 'Resource',
      male: 'The star of study and of the mother. Supported, well-taught and inclined toward knowledge.',
      female: 'Nurturing and studious, with steady support from those above you.',
      career: 'Suits education, publishing, research and the caring professions.',
      wealth: 'Comfortable rather than large. Support tends to arrive when it is needed.' },
  },
};

/* ── UI 문구 ── */
export const SAJU_UI: Record<SajuIntlLang, Record<string, string>> = {
  en: {
    title: 'Saju — Korean Four Pillars',
    lead: 'Your four pillars from date and time of birth, read the way saju is read in Korea',
    birthLabel: 'Date of birth',
    yearPh: 'e.g. 1995', monthPh: 'Month', dayPh: 'Day',
    hourLabel: 'Hour of birth', hourUnknown: 'Not known',
    genderLabel: 'Gender', male: 'Male', female: 'Female',
    submit: 'Read my chart',
    empty: 'Enter your birth details to see your chart',
    chart: 'Four Pillars',
    yearPillar: 'Year', monthPillar: 'Month', dayPillar: 'Day', hourPillar: 'Hour',
    dayMaster: 'Day Master',
    elements: 'Five Elements',
    missing: 'Missing elements',
    tenGods: 'Ten Gods',
    luckPillars: 'Luck Pillars',
    age: 'Age',
    strong: 'Strong Day Master', weak: 'Weak Day Master',
    strongNote: 'Your Day Master has ample support. Elements that drain or control it tend to help.',
    weakNote: 'Your Day Master has limited support. Elements that generate or reinforce it tend to help.',
    inCareer: 'Career', inWealth: 'Wealth',
    hourNote: 'Without the hour, the Hour Pillar is omitted — the rest of the chart is unaffected.',
    errAll: 'Please fill in the full date of birth.',
    errMonth: 'Month must be between 1 and 12.',
    errDay: 'Day must be between 1 and 31.',
    errInvalid: 'That date does not exist.',
    errFuture: 'Your date of birth is in the future.',
    originNote: 'Saju (사주) is how four-pillar astrology is practised in Korea. The system itself came from China, where it is known as BaZi (八字), and the two share the same sexagenary calculation — the reading conventions and vocabulary differ.',
    disclaimer: 'The chart itself is calculated from the traditional sexagenary cycle and is deterministic — the same birth details always give the same pillars. The interpretations attached to it are a traditional practice, not a scientific one. Treat it as reflection rather than prediction.',
  },
};
