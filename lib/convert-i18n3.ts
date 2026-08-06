// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ConvertL10n } from './convert-i18n.ts';

/**
 * 단위 변환 셋째 묶음(16종)의 영어 문구.
 *
 * 계수는 여기 두지 않는다 — lib/convert-tools3.ts 한 곳에만 있어야 한다.
 * 한글로 적은 단위 이름(항성일·시간)은 여기서 from·to로 갈아 끼운다.
 */
export const CONVERT_EN3: Record<string, ConvertL10n> = {

  'chain-m': {
    title: 'Chains to Meters',
    desc: 'Convert the surveyor’s chain to metres',
    long: 'Convert chains to metres and back. The unit survives in old British and American land records, in railway mileposts and in the length of a cricket pitch.',
    note: 'One chain is 66 feet, exactly 20.1168 m. Ten chains make a furlong and eighty make a mile, so it acts as the ruler behind the mile.',
  },
  'rod-m': {
    title: 'Rods to Meters',
    desc: 'Convert the old surveying rod to metres',
    long: 'Convert rods to metres and back. Also called a pole or a perch, it appears in old English and American deeds and in fence and ditch lengths.',
    note: 'One rod is 16.5 feet, exactly 5.0292 m. Four rods make a chain, and a strip four rods by forty rods is exactly one acre.',
  },
  'barleycorn-mm': {
    title: 'Barleycorns to Millimeters',
    desc: 'The step size behind UK and US shoe sizes',
    long: 'Named after a grain of barley, this unit is one third of an inch. It is why British and American shoe sizes step up by about 8.47 mm each time.',
    note: 'Adult sizing starts at twelve barleycorns (four inches) and adds one per size. Size 8 refers to the last, not the length of your foot.',
  },
  'parsec-lightyear': {
    title: 'Parsecs to Light Years',
    desc: 'Convert between astronomical distance units',
    long: 'Convert the parsec that astronomers publish in to the light year that popular writing uses. A parsec is the distance at which Earth’s orbital radius spans one arcsecond.',
    note: 'One parsec is about 3.26 light years. Proxima Centauri, the nearest star, sits at 1.30 parsecs — 4.24 light years away.',
  },
  'slug-kg': {
    title: 'Slugs to Kilograms',
    desc: 'The mass unit of imperial engineering',
    long: 'Convert slugs to kilograms and back. A slug is the mass that one pound-force accelerates at one foot per second squared, used in American engineering to keep mass apart from weight.',
    note: 'A pound is a weight and a slug is a mass. One slug is about 32.174 pounds — the same number as gravity in feet per second squared.',
  },
  'quintal-kg': {
    title: 'Quintals to Kilograms',
    desc: 'The 100 kg unit used in grain trading',
    long: 'Convert quintals to kilograms and back. Grain and fertiliser are traded by the quintal across Europe, India and Latin America, counting a hundred kilograms as one lot.',
    note: 'The metric quintal is exactly 100 kg. The similarly named hundredweight is different: 45.36 kg in the US and 50.80 kg in the UK.',
  },
  'peck-l': {
    title: 'Pecks to Liters',
    desc: 'A dry measure equal to a quarter bushel',
    long: 'Convert pecks to litres and back. It is the basket size apples and potatoes are sold by, still in use at American farmers’ markets.',
    note: 'A US dry peck is 8.81 L and four pecks make a bushel. The imperial peck is 9.09 L, so the figure differs.',
  },
  'dunam-m2': {
    title: 'Dunams to Square Meters',
    desc: 'The land area unit of the Middle East and Balkans',
    long: 'Convert dunams to square metres and back. Inherited from the Ottoman Empire, it remains the working unit for land deals in Israel, Türkiye and the Balkans.',
    note: 'The metric dunam is 1,000 m², a tenth of a hectare. The older Ottoman dunam was about 919 m², so old documents differ.',
  },
  'celsius-reaumur': {
    title: 'Celsius to Réaumur',
    desc: 'Convert Celsius to the Réaumur scale',
    long: 'Convert Celsius to Réaumur and back. The scale puts water’s freezing point at 0 and its boiling point at 80, and it lingers in European cheese and syrup recipes.',
    note: 'Multiply Celsius by 0.8 to get Réaumur. Both scales share the same zero, so no offset is needed — only the multiplication.',
  },
  'pib-tib': {
    title: 'PiB to TiB',
    desc: 'Convert pebibytes to tebibytes',
    long: 'Convert pebibytes to tebibytes and back. These powers-of-two units are what data centre capacity and backup planning are actually written in.',
    note: 'One PiB is 1,024 TiB. Manufacturers quote PB in powers of ten, so 1 PB is only 0.888 PiB — a gap of more than a tenth.',
  },
  'toe-mwh': {
    title: 'Tonnes of Oil Equivalent to MWh',
    desc: 'Convert the energy statistics unit to electricity',
    long: 'Convert tonnes of oil equivalent to megawatt hours and back. National energy statistics use it to put coal, gas and electricity on one scale.',
    note: 'One toe is defined as 41.868 GJ, or 11.63 MWh. It is a fixed accounting figure, not the actual heat content of any particular crude.',
  },
  'tnt-gj': {
    title: 'Tons of TNT to Gigajoules',
    desc: 'Convert explosive yield to energy',
    long: 'Convert tons of TNT equivalent to gigajoules and back. It is how earthquake energy and blast size get compared, and the figure behind headlines that say “equal to so many tons of TNT”.',
    note: 'One ton of TNT is defined as exactly 4.184 GJ. That is a fixed convention, not a measured heat of detonation.',
  },
  'ksi-mpa': {
    title: 'ksi to MPa',
    desc: 'Convert material strength units',
    long: 'Convert ksi to megapascals and back. American material standards quote tensile and yield strength in ksi, so comparing them with international specs means running this conversion.',
    note: 'One ksi is 1,000 psi, about 6.895 MPa. The 800 MPa tensile strength of a grade 8.8 bolt comes to roughly 116 ksi.',
  },
  'footcandle-lux': {
    title: 'Foot-candles to Lux',
    desc: 'Convert between illuminance units',
    long: 'Convert foot-candles to lux and back. American lighting guidance is written in foot-candles, so matching it against international standards needs this step.',
    note: 'One foot-candle is about 10.76 lux. The ratio is simply the ratio between a square foot and a square metre.',
  },
  'mil-degree': {
    title: 'Mils to Degrees',
    desc: 'Convert the military angle unit to degrees',
    long: 'Convert mils to degrees and back. Artillery and marksmanship use this unit, which divides a full turn into 6,400 parts under the NATO convention.',
    note: 'A right angle is 1,600 mils. One mil covers about a metre at a thousand metres, which makes range and width easy to link in your head.',
  },
  'sidereal-day-hour': {
    title: 'Sidereal Day to Hours',
    desc: 'The length of a day measured against the stars',
    long: 'Convert a sidereal day to hours. It is how long Earth takes to turn once relative to the stars, about four minutes shorter than the 24 hours we keep by the Sun.',
    note: 'Earth orbits while it spins, so it must turn a little further to bring the Sun back around. That extra 3 minutes 56 seconds a day adds up to exactly one day a year.',
    from: 'sidereal day', to: 'hours',
  },
};
