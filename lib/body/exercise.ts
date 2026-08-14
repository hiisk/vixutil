/**
 * 운동별 MET 표 — `/body/exercise/<슬러그>` 36종 × 열 언어 = 360장.
 *
 * ── 왜 표만 더하는가 ────────────────────────────────────────
 * MET으로 칼로리를 구하는 계산기는 **이미 있다**(lib/body/metabolism.ts의
 * `MET 운동 소모 칼로리`). 없는 것은 "수영이 몇 MET인가"다 — 사람은 MET을 모르고
 * "수영 칼로리 소모"를 친다. 그래서 계산기를 다시 만들지 않고 표만 더한다.
 *
 * ── 값의 출처 ───────────────────────────────────────────────
 * Compendium of Physical Activities(Ainsworth 등)에 실린 널리 인용되는 값이다.
 * **강도에 따라 크게 갈리는 운동은 강도를 슬러그에 박았다** — 달리기 8km/h와
 * 12km/h는 다른 운동이다. 한 이름에 한 값을 붙이면 두 배로 틀린다.
 *
 * 36종만 둔 것은 게으름이 아니라 **확인할 수 있는 만큼만** 적은 것이다.
 * 300종으로 늘리려면 값마다 출처를 대조해야 한다.
 * ponytail: 36종 고정, 검색 로그에서 빠진 운동이 보이면 그때 늘린다.
 *
 * ── 칼로리 식 ───────────────────────────────────────────────
 *   kcal = MET × 3.5 × 체중(kg) ÷ 200 × 분
 * 3.5 mL/kg/min이 1 MET의 정의이고, 산소 1L가 약 5 kcal이라 200으로 나눈다.
 */

export interface Exercise {
  slug: string;
  met: number;
  /** 갈래 — 이웃을 고를 때 쓴다 */
  kind: 'walk' | 'run' | 'bike' | 'swim' | 'gym' | 'sport' | 'home';
  /** 열 언어 이름 */
  name: Record<string, string>;
}

const e = (
  slug: string, met: number, kind: Exercise['kind'],
  ko: string, en: string, es: string, pt: string, ja: string,
  de: string, fr: string, hi: string, zhs: string, zht: string,
): Exercise => ({
  slug, met, kind,
  name: { ko, en, es, 'pt-br': pt, ja, de, fr, hi, 'zh-hans': zhs, 'zh-hant': zht },
});

export const EXERCISES: Exercise[] = [
  e('walking-slow', 2.8, 'walk', '천천히 걷기 (3km/h)', 'Walking, slow (3 km/h)', 'Caminar despacio (3 km/h)', 'Caminhada lenta (3 km/h)', 'ゆっくり歩く (3km/h)', 'Langsames Gehen (3 km/h)', 'Marche lente (3 km/h)', 'धीरे चलना (3 किमी/घं)', '慢走 (3公里/小时)', '慢走 (3公里/小時)'),
  e('walking', 3.5, 'walk', '보통 걷기 (5km/h)', 'Walking (5 km/h)', 'Caminar (5 km/h)', 'Caminhada (5 km/h)', '普通に歩く (5km/h)', 'Gehen (5 km/h)', 'Marche (5 km/h)', 'सामान्य चाल (5 किमी/घं)', '步行 (5公里/小时)', '步行 (5公里/小時)'),
  e('walking-fast', 5, 'walk', '빠르게 걷기 (6.5km/h)', 'Brisk walking (6.5 km/h)', 'Caminar rápido (6,5 km/h)', 'Caminhada rápida (6,5 km/h)', '速歩き (6.5km/h)', 'Zügiges Gehen (6,5 km/h)', 'Marche rapide (6,5 km/h)', 'तेज़ चाल (6.5 किमी/घं)', '快走 (6.5公里/小时)', '快走 (6.5公里/小時)'),
  e('hiking', 6, 'walk', '등산', 'Hiking', 'Senderismo', 'Trilha', '登山', 'Wandern', 'Randonnée', 'पर्वतारोहण', '徒步登山', '徒步登山'),
  e('stairs', 8, 'walk', '계단 오르기', 'Stair climbing', 'Subir escaleras', 'Subir escadas', '階段のぼり', 'Treppensteigen', 'Montée d’escaliers', 'सीढ़ी चढ़ना', '爬楼梯', '爬樓梯'),
  e('running-8', 8.3, 'run', '달리기 (8km/h)', 'Running (8 km/h)', 'Correr (8 km/h)', 'Corrida (8 km/h)', 'ランニング (8km/h)', 'Laufen (8 km/h)', 'Course (8 km/h)', 'दौड़ (8 किमी/घं)', '跑步 (8公里/小时)', '跑步 (8公里/小時)'),
  e('running-10', 10, 'run', '달리기 (10km/h)', 'Running (10 km/h)', 'Correr (10 km/h)', 'Corrida (10 km/h)', 'ランニング (10km/h)', 'Laufen (10 km/h)', 'Course (10 km/h)', 'दौड़ (10 किमी/घं)', '跑步 (10公里/小时)', '跑步 (10公里/小時)'),
  e('running-12', 11.8, 'run', '달리기 (12km/h)', 'Running (12 km/h)', 'Correr (12 km/h)', 'Corrida (12 km/h)', 'ランニング (12km/h)', 'Laufen (12 km/h)', 'Course (12 km/h)', 'दौड़ (12 किमी/घं)', '跑步 (12公里/小时)', '跑步 (12公里/小時)'),
  e('running-14', 13.5, 'run', '달리기 (14km/h)', 'Running (14 km/h)', 'Correr (14 km/h)', 'Corrida (14 km/h)', 'ランニング (14km/h)', 'Laufen (14 km/h)', 'Course (14 km/h)', 'दौड़ (14 किमी/घं)', '跑步 (14公里/小时)', '跑步 (14公里/小時)'),
  e('treadmill', 9, 'run', '러닝머신', 'Treadmill', 'Cinta de correr', 'Esteira', 'ランニングマシン', 'Laufband', 'Tapis de course', 'ट्रेडमिल', '跑步机', '跑步機'),
  e('cycling-16', 6.8, 'bike', '자전거 (16~19km/h)', 'Cycling (16–19 km/h)', 'Ciclismo (16–19 km/h)', 'Ciclismo (16–19 km/h)', '自転車 (16〜19km/h)', 'Radfahren (16–19 km/h)', 'Vélo (16–19 km/h)', 'साइकिल (16–19 किमी/घं)', '骑行 (16–19公里/小时)', '騎行 (16–19公里/小時)'),
  e('cycling-22', 10, 'bike', '자전거 (22~25km/h)', 'Cycling (22–25 km/h)', 'Ciclismo (22–25 km/h)', 'Ciclismo (22–25 km/h)', '自転車 (22〜25km/h)', 'Radfahren (22–25 km/h)', 'Vélo (22–25 km/h)', 'साइकिल (22–25 किमी/घं)', '骑行 (22–25公里/小时)', '騎行 (22–25公里/小時)'),
  e('spinning', 8.5, 'bike', '실내 사이클', 'Stationary cycling', 'Bicicleta estática', 'Bicicleta ergométrica', 'エアロバイク', 'Heimtrainer', 'Vélo d’appartement', 'स्थिर साइकिल', '动感单车', '飛輪車'),
  e('swimming-slow', 5.8, 'swim', '수영 (자유형, 천천히)', 'Swimming, freestyle (slow)', 'Natación, crol (suave)', 'Natação, crawl (leve)', '水泳（クロール・ゆっくり）', 'Schwimmen, Kraul (langsam)', 'Natation, crawl (lent)', 'तैराकी, फ्रीस्टाइल (धीमी)', '游泳·自由泳（慢）', '游泳·自由式（慢）'),
  e('swimming-fast', 9.8, 'swim', '수영 (자유형, 빠르게)', 'Swimming, freestyle (fast)', 'Natación, crol (rápido)', 'Natação, crawl (rápido)', '水泳（クロール・速い）', 'Schwimmen, Kraul (schnell)', 'Natation, crawl (rapide)', 'तैराकी, फ्रीस्टाइल (तेज़)', '游泳·自由泳（快）', '游泳·自由式（快）'),
  e('swimming-breast', 5.3, 'swim', '수영 (평영)', 'Swimming, breaststroke', 'Natación, braza', 'Natação, peito', '水泳（平泳ぎ）', 'Schwimmen, Brust', 'Natation, brasse', 'तैराकी, ब्रेस्टस्ट्रोक', '游泳·蛙泳', '游泳·蛙式'),
  e('aqua-aerobics', 5.3, 'swim', '아쿠아로빅', 'Water aerobics', 'Aquagym', 'Hidroginástica', 'アクアビクス', 'Wassergymnastik', 'Aquagym', 'वॉटर एरोबिक्स', '水中健身操', '水中有氧'),
  e('weight-light', 3.5, 'gym', '웨이트 (가볍게)', 'Weight training (light)', 'Pesas (suave)', 'Musculação (leve)', '筋トレ（軽め）', 'Krafttraining (leicht)', 'Musculation (légère)', 'वेट ट्रेनिंग (हल्की)', '力量训练（轻）', '重量訓練（輕）'),
  e('weight-hard', 6, 'gym', '웨이트 (강하게)', 'Weight training (vigorous)', 'Pesas (intenso)', 'Musculação (intensa)', '筋トレ（強め）', 'Krafttraining (intensiv)', 'Musculation (intense)', 'वेट ट्रेनिंग (तेज़)', '力量训练（重）', '重量訓練（重）'),
  e('crossfit', 8, 'gym', '크로스핏', 'CrossFit', 'CrossFit', 'CrossFit', 'クロスフィット', 'CrossFit', 'CrossFit', 'क्रॉसफ़िट', '混合健身', '混合健身'),
  e('pilates', 3, 'gym', '필라테스', 'Pilates', 'Pilates', 'Pilates', 'ピラティス', 'Pilates', 'Pilates', 'पिलाटेस', '普拉提', '皮拉提斯'),
  e('yoga', 2.5, 'gym', '요가', 'Yoga', 'Yoga', 'Ioga', 'ヨガ', 'Yoga', 'Yoga', 'योग', '瑜伽', '瑜伽'),
  e('stretching', 2.3, 'gym', '스트레칭', 'Stretching', 'Estiramientos', 'Alongamento', 'ストレッチ', 'Dehnen', 'Étirements', 'स्ट्रेचिंग', '拉伸', '伸展'),
  e('jump-rope', 11, 'gym', '줄넘기', 'Jump rope', 'Saltar la cuerda', 'Pular corda', '縄跳び', 'Seilspringen', 'Corde à sauter', 'रस्सी कूद', '跳绳', '跳繩'),
  e('elliptical', 5, 'gym', '일립티컬', 'Elliptical trainer', 'Elíptica', 'Elíptico', 'クロストレーナー', 'Crosstrainer', 'Vélo elliptique', 'एलिप्टिकल', '椭圆机', '橢圓機'),
  e('rowing', 7, 'gym', '로잉머신', 'Rowing machine', 'Máquina de remo', 'Remo indoor', 'ローイングマシン', 'Rudergerät', 'Rameur', 'रोइंग मशीन', '划船机', '划船機'),
  e('soccer', 7, 'sport', '축구', 'Soccer', 'Fútbol', 'Futebol', 'サッカー', 'Fußball', 'Football', 'फ़ुटबॉल', '足球', '足球'),
  e('basketball', 6.5, 'sport', '농구', 'Basketball', 'Baloncesto', 'Basquete', 'バスケットボール', 'Basketball', 'Basket-ball', 'बास्केटबॉल', '篮球', '籃球'),
  e('badminton', 5.5, 'sport', '배드민턴', 'Badminton', 'Bádminton', 'Badminton', 'バドミントン', 'Badminton', 'Badminton', 'बैडमिंटन', '羽毛球', '羽毛球'),
  e('tennis', 7.3, 'sport', '테니스', 'Tennis', 'Tenis', 'Tênis', 'テニス', 'Tennis', 'Tennis', 'टेनिस', '网球', '網球'),
  e('table-tennis', 4, 'sport', '탁구', 'Table tennis', 'Tenis de mesa', 'Tênis de mesa', '卓球', 'Tischtennis', 'Tennis de table', 'टेबल टेनिस', '乒乓球', '桌球'),
  e('golf', 4.8, 'sport', '골프 (걸어서)', 'Golf (walking)', 'Golf (caminando)', 'Golfe (caminhando)', 'ゴルフ（歩き）', 'Golf (zu Fuß)', 'Golf (à pied)', 'गोल्फ़ (पैदल)', '高尔夫（步行）', '高爾夫（步行）'),
  e('climbing', 8, 'sport', '클라이밍', 'Rock climbing', 'Escalada', 'Escalada', 'クライミング', 'Klettern', 'Escalade', 'चट्टान चढ़ाई', '攀岩', '攀岩'),
  e('dancing', 5, 'sport', '댄스', 'Dancing', 'Baile', 'Dança', 'ダンス', 'Tanzen', 'Danse', 'नृत्य', '跳舞', '跳舞'),
  e('housework', 3.3, 'home', '집안일', 'Housework', 'Tareas del hogar', 'Tarefas domésticas', '家事', 'Hausarbeit', 'Ménage', 'घर का काम', '做家务', '做家事'),
  e('gardening', 3.8, 'home', '정원 손질', 'Gardening', 'Jardinería', 'Jardinagem', 'ガーデニング', 'Gartenarbeit', 'Jardinage', 'बाग़वानी', '园艺', '園藝'),
];

export const exerciseBySlug = (slug: string): Exercise | undefined =>
  EXERCISES.find(x => x.slug === slug);

/** 표에 싣는 체중(kg)과 시간(분) */
export const WEIGHTS: readonly number[] = [50, 55, 60, 65, 70, 75, 80, 85, 90, 100];
export const MINUTES: readonly number[] = [10, 20, 30, 40, 50, 60, 90];

/** kcal = MET × 3.5 × kg ÷ 200 × 분 */
export const kcal = (met: number, kg: number, min: number): number =>
  Math.round((met * 3.5 * kg / 200) * min);

/**
 * 이웃 운동 — 같은 갈래에서 자기 다음부터 원형으로 감는다.
 * 앞에서 자르면 뒤쪽이 고아가 된다(lib/related-window.ts와 같은 규칙).
 */
export function relatedExercises(slug: string, limit = 6): Exercise[] {
  const me = exerciseBySlug(slug);
  if (!me) return [];
  const same = EXERCISES.filter(x => x.kind === me.kind);
  const pool = same.length > 1 ? same : EXERCISES;
  const at = pool.findIndex(x => x.slug === slug);
  const out: Exercise[] = [];
  for (let k = 1; k <= pool.length && out.length < limit; k++) {
    const x = pool[(at + k) % pool.length];
    if (x.slug !== slug) out.push(x);
  }
  return out;
}
