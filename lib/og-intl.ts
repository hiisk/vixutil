import type { ReactElement } from 'react';
import { ogCard } from './og-template';
import { findColorToolIntl, type ColorIntlLang } from './color-tools-intl';
import { findTimeToolIntl } from './time-tools-intl';
import { findImageToolIntl } from './image-tools-intl';
import { findFoodToolIntl } from './food-tools-intl';
import { findSoundToolIntl } from './sound-tools-intl';
import { findGameToolIntl } from './game-tools-intl';
import { findDeviceToolIntl } from './device-tools-intl';
import { findTextToolIntl } from './text-tools-intl';
import { COLOR_TOOLS } from './color-tools';
import { TIME_TOOLS } from './time-tools';
import { IMAGE_TOOLS } from './image-tools';
import { FOOD_TOOLS } from './food-tools';
import { SOUND_TOOLS } from './sound-tools';
import { GAME_TOOLS } from './game-tools';
import { DEVICE_TOOLS } from './device-tools';
import { TEXT_TOOLS } from './text-tools';
import { RANDOM_TOOLS_MAP, type RandomTool } from './random-tools';

/**
 * 다국어 공유 카드.
 *
 * 카드마다 라우트 파일에 문구를 적으면 같은 문장이 페이지·허브·카드 세 군데에
 * 흩어진다. 그래서 문구는 여기 한 곳에 두고 라우트는 키만 넘긴다.
 *
 * 문구는 허브 목록에 쓰는 문장과 같게 맞춘다 — 목록에서 보고 눌렀는데 공유
 * 카드가 다른 말을 하면 같은 도구로 안 읽힌다.
 *
 * 색은 한국어 라우트와 같은 값을 쓴다. 언어마다 색이 다르면 같은 도구의
 * 카드가 다른 도구처럼 보인다.
 *
 * 색상·시간 도구는 이미 섹션 사전(color-tools-intl·time-tools-intl)에 언어별
 * 문구가 있어서 표에 넣지 않고 그쪽을 읽는다. 랜덤 뽑기도 random-tools의
 * titleEn/titleZh를 쓴다.
 */

type Card = { icon: string; eyebrow: string; title: string; desc: string; from: string; to: string };

/** 표의 열쇠는 "<섹션>[/<도구>]/<언어>" */
const CARDS: Record<string, Card> = {
  'home/en': { icon: '🧰', eyebrow: 'vixutil', title: 'Free Everyday Tools', desc: 'Conversion · checklists · quizzes · tests · generators · horoscopes', from: '#7c3aed', to: '#0ea5e9' },
  'home/zh': { icon: '🧰', eyebrow: 'vixutil', title: '免费实用工具', desc: '单位换算 · 清单 · 测验 · 心理测试 · 生成器 · 今日运势', from: '#7c3aed', to: '#0ea5e9' },
  'fortune/en': { icon: '🔮', eyebrow: 'Fortune', title: 'Free Daily Horoscope', desc: 'Star signs · Chinese zodiac · blood type · MBTI · tarot', from: '#7c3aed', to: '#db2777' },
  'fortune/zh': { icon: '🔮', eyebrow: 'Fortune', title: '今日运势免费查询', desc: '星座 · 生肖 · 血型 · MBTI · 塔罗', from: '#7c3aed', to: '#db2777' },
  'snap/en': { icon: '📸', eyebrow: 'Snap Test', title: 'Snap Tests', desc: 'Photo tests that run in your browser — nothing is uploaded', from: '#d946ef', to: '#0ea5e9' },
  'snap/zh': { icon: '📸', eyebrow: 'Snap Test', title: '照片测试', desc: '全部在浏览器内完成，照片不会上传', from: '#d946ef', to: '#0ea5e9' },
  'color/en': { icon: '🎨', eyebrow: 'Color Tools', title: 'Colour Tools', desc: 'Palette · contrast · CSS gradient, in the browser', from: '#8b5cf6', to: '#d946ef' },
  'color/zh': { icon: '🎨', eyebrow: 'Color Tools', title: '颜色工具', desc: '配色 · 对比度 · CSS 渐变，浏览器内运行', from: '#8b5cf6', to: '#d946ef' },
  'image/en': { icon: '🖼️', eyebrow: 'Image Tools', title: 'Image Tools', desc: 'Compress · resize · convert · crop, in the browser', from: '#8b5cf6', to: '#0ea5e9' },
  'image/zh': { icon: '🖼️', eyebrow: 'Image Tools', title: '图片工具', desc: '压缩 · 调整尺寸 · 格式转换 · 裁剪，浏览器内运行', from: '#8b5cf6', to: '#0ea5e9' },
  'food/en': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'Cooking Tools', desc: 'Cups to grams · recipe scaling · oven temperatures', from: '#f59e0b', to: '#dc2626' },
  'food/zh': { icon: '🍳', eyebrow: 'Cooking Tools', title: '厨房工具', desc: '量杯换克 · 配方缩放 · 烤箱温度', from: '#f59e0b', to: '#dc2626' },
  'search/en': { icon: '🔍', eyebrow: 'Search', title: 'Search Every Tool', desc: 'Converters · tests · quizzes · checklists · games', from: '#6366f1', to: '#8b5cf6' },
  'search/zh': { icon: '🔍', eyebrow: 'Search', title: '搜索全部工具', desc: '换算 · 测试 · 问答 · 清单 · 小游戏', from: '#6366f1', to: '#8b5cf6' },
  'game/en': { icon: '🎮', eyebrow: 'Brain Games', title: 'Brain Games', desc: 'Reaction · memory · typing · aim · mental maths', from: '#10b981', to: '#0d9488' },
  'game/zh': { icon: '🎮', eyebrow: 'Brain Games', title: '脑力小游戏', desc: '反应 · 记忆 · 打字 · 瞄准 · 心算', from: '#10b981', to: '#0d9488' },
  'device/en': { icon: '🔧', eyebrow: 'Device Tests', title: 'Device Tests', desc: 'Keyboard · mouse · mic · webcam · dead pixels', from: '#0ea5e9', to: '#2563eb' },
  'device/zh': { icon: '🔧', eyebrow: 'Device Tests', title: '设备检测', desc: '键盘 · 鼠标 · 麦克风 · 摄像头 · 坏点', from: '#0ea5e9', to: '#2563eb' },
  'text/en': { icon: '✏️', eyebrow: 'Text Tools', title: 'Text Tools', desc: 'Clean up · dedupe · case convert · count', from: '#6366f1', to: '#7c3aed' },
  'text/zh': { icon: '✏️', eyebrow: 'Text Tools', title: '文本工具', desc: '清理 · 去重 · 大小写 · 字数统计', from: '#6366f1', to: '#7c3aed' },
  'tarot/en': { icon: '🎴', eyebrow: 'Tarot', title: 'Tarot Reading', desc: 'Full 78-card deck · four spreads · upright and reversed', from: '#8b5cf6', to: '#6d28d9' },
  'tarot/zh': { icon: '🎴', eyebrow: 'Tarot', title: '塔罗占卜', desc: '完整 78 张牌 · 四种牌阵 · 正位与逆位', from: '#8b5cf6', to: '#6d28d9' },
  'sound/en': { icon: '🔊', eyebrow: 'Sound Tools', title: 'Sound Tools', desc: 'Metronome · tuner · white noise, made by the browser', from: '#6366f1', to: '#0ea5e9' },
  'sound/zh': { icon: '🔊', eyebrow: 'Sound Tools', title: '声音工具', desc: '节拍器 · 调音器 · 白噪音，浏览器直接生成', from: '#6366f1', to: '#0ea5e9' },
  'time/en': { icon: '⏰', eyebrow: 'Time Tools', title: 'Time Tools', desc: 'Timer · stopwatch · world clock · date maths', from: '#0ea5e9', to: '#f43f5e' },
  'time/zh': { icon: '⏰', eyebrow: 'Time Tools', title: '时间工具', desc: '计时器 · 秒表 · 世界时钟 · 日期计算', from: '#0ea5e9', to: '#f43f5e' },
  'test/en': { icon: '🧭', eyebrow: 'Personality Test', title: 'Free Personality Tests', desc: 'Social battery · stress · decisions · working style', from: '#7c3aed', to: '#db2777' },
  'test/zh': { icon: '🧭', eyebrow: 'Personality Test', title: '免费心理测试', desc: '社交电量 · 压力 · 决策方式 · 工作风格', from: '#7c3aed', to: '#db2777' },
  'quiz/en': { icon: '🏆', eyebrow: 'Quiz', title: 'Free Quizzes', desc: 'Geography · science · history · tech — ten questions each', from: '#f59e0b', to: '#ea580c' },
  'quiz/zh': { icon: '🏆', eyebrow: 'Quiz', title: '免费测验', desc: '地理 · 科学 · 历史 · 科技，每套十题', from: '#f59e0b', to: '#ea580c' },
  'checklist/en': { icon: '✅', eyebrow: 'Checklist', title: 'Free Checklists', desc: 'Moving · travel · interviews · camping · weddings', from: '#0ea5e9', to: '#0891b2' },
  'checklist/zh': { icon: '✅', eyebrow: 'Checklist', title: '免费清单', desc: '搬家 · 旅行 · 面试 · 露营 · 婚礼筹备', from: '#0ea5e9', to: '#0891b2' },
  'generator/en': { icon: '⚙️', eyebrow: 'Generator', title: 'Free Name Generators', desc: 'Fantasy · sci-fi · dragon · superhero · guild names', from: '#10b981', to: '#0d9488' },
  'generator/zh': { icon: '⚙️', eyebrow: 'Generator', title: '免费名字生成器', desc: '奇幻 · 科幻 · 巨龙 · 超级英雄 · 公会', from: '#10b981', to: '#0d9488' },
  'random/en': { icon: '🎲', eyebrow: 'Random Picker', title: 'Random Picker Tools', desc: 'Wheel · name picker · teams · dice · Secret Santa', from: '#6366f1', to: '#a855f7' },
  'random/zh': { icon: '🎲', eyebrow: 'Random Picker', title: '随机抽取工具', desc: '转盘 · 点名 · 分组 · 骰子 · 神秘圣诞人', from: '#6366f1', to: '#a855f7' },
  'random/ko': { icon: '🎲', eyebrow: 'Random Picker', title: '랜덤 뽑기', desc: '룰렛 · 사다리타기 · 팀 나누기 · 숫자 추첨 · 동전/주사위', from: '#6366f1', to: '#a855f7' },
  'calculator/en': { icon: '🧮', eyebrow: 'Calculator', title: 'Korean Calculators', desc: 'Salary · tax · loan · property calculators for Korea', from: '#1d4ed8', to: '#3b82f6' },
  'calculator/ja': { icon: '🧮', eyebrow: 'Calculator', title: '生活計算機まとめ', desc: '給与・税金・ローン・不動産の計算機', from: '#1d4ed8', to: '#3b82f6' },
  'fortune/dream/ko': { icon: '🌙', eyebrow: 'Dream', title: '꿈 해몽', desc: '돼지·뱀·불 등 50가지 꿈의 의미 분석', from: '#334155', to: '#3730a3' },
  'fortune/saju/ko': { icon: '🔯', eyebrow: 'Saju', title: '사주 분석', desc: '생년월일로 사주 4주 분석 + 오행 균형', from: '#6366f1', to: '#6d28d9' },
  'fortune/zodiac/ko': { icon: '⭐', eyebrow: 'Zodiac', title: '별자리 운세', desc: '12개 별자리로 오늘의 운세 확인', from: '#8b5cf6', to: '#7e22ce' },
  'fortune/animal/ko': { icon: '🐉', eyebrow: 'Animal Sign', title: '띠 운세', desc: '쥐·소·범 등 12띠별 오늘의 운세', from: '#f43f5e', to: '#db2777' },
  'fortune/tarot/ko': { icon: '🃏', eyebrow: 'Tarot', title: '타로 카드', desc: '78장 풀덱에서 카드 뽑기', from: '#f59e0b', to: '#ea580c' },
  'fortune/mbti/ko': { icon: '🧠', eyebrow: 'MBTI', title: 'MBTI 운세', desc: '16가지 성격 유형별 오늘의 운세', from: '#0ea5e9', to: '#2563eb' },
  'fortune/blood-type/ko': { icon: '🩸', eyebrow: '혈액형', title: '혈액형 운세', desc: 'A·B·O·AB형 오늘의 운세', from: '#f43f5e', to: '#dc2626' },
  'fortune/biorhythm/ko': { icon: '📈', eyebrow: '바이오리듬', title: '바이오리듬', desc: '신체·감성·지성 리듬을 그래프로', from: '#10b981', to: '#0d9488' },
  'fortune/name-match/ko': { icon: '💕', eyebrow: '이름 궁합', title: '이름 궁합', desc: '두 사람 이름 획수로 보는 궁합 점수', from: '#ec4899', to: '#e11d48' },
  'fortune/zodiac-match/ko': { icon: '🐲', eyebrow: '띠 궁합', title: '띠 궁합', desc: '십이지 삼합·육합으로 보는 두 사람 궁합', from: '#f43f5e', to: '#db2777' },
  'fortune/star-match/ko': { icon: '⭐', eyebrow: '별자리 궁합', title: '별자리 궁합', desc: '12별자리 원소로 보는 두 사람 궁합', from: '#8b5cf6', to: '#c026d3' },
  'fortune/blood-match/ko': { icon: '🩸', eyebrow: '혈액형 궁합', title: '혈액형 궁합', desc: 'A·B·O·AB형으로 보는 두 사람 궁합', from: '#f43f5e', to: '#ea580c' },
  'fortune/mbti-match/ko': { icon: '🧠', eyebrow: 'MBTI 궁합', title: 'MBTI 궁합', desc: '16유형으로 보는 두 사람 궁합 점수', from: '#8b5cf6', to: '#4f46e5' },
  'fortune/daily/ko': { icon: '🔮', eyebrow: '오늘의 종합운세', title: '오늘의 종합운세', desc: '생년월일로 보는 오늘의 총운·연애·금전운', from: '#7c3aed', to: '#db2777' },
  'fortune/daily-tarot/ko': { icon: '🃏', eyebrow: 'Daily Tarot', title: '오늘의 타로', desc: '매일 자정 바뀌는 오늘의 타로 카드 한 장', from: '#f59e0b', to: '#ea580c' },
  'fortune/tarot-yesno/ko': { icon: '🔮', eyebrow: 'Tarot Yes/No', title: '타로 예스/노', desc: '질문을 떠올리고 카드로 받는 예·아니오', from: '#6366f1', to: '#6d28d9' },
  'fortune/lucky-lotto/ko': { icon: '🍀', eyebrow: 'Fortune', title: '행운의 로또 번호', desc: '생년월일로 보는 오늘의 행운 번호 6개', from: '#7c3aed', to: '#db2777' },
  'fortune/birth-stone/ko': { icon: '💎', eyebrow: 'Birth Stone', title: '탄생석·탄생화', desc: '태어난 달의 보석과 꽃, 그 의미', from: '#d946ef', to: '#7c3aed' },
  'fortune/today-color/ko': { icon: '🎨', eyebrow: 'Lucky Colour', title: '오늘의 행운 색', desc: '이름·날짜로 보는 오늘의 행운 컬러', from: '#ec4899', to: '#7c3aed' },
  'snap/first-impression/ko': { icon: '✨', eyebrow: 'First Impression', title: '첫인상 분석', desc: '눈·얼굴선·입꼬리를 실측해 보는 내 인상 유형', from: '#d946ef', to: '#7c3aed' },
  'snap/face-reading/ko': { icon: '🪞', eyebrow: 'Face Reading', title: '관상 테스트', desc: '사진 한 장으로 보는 재미있는 관상 분석', from: '#0d9488', to: '#0369a1' },
  'snap/personal-color/ko': { icon: '🎨', eyebrow: 'Personal Color', title: '퍼스널컬러 진단', desc: '사진 한 장으로 보는 웜톤·쿨톤 12타입 컬러 진단', from: '#fb923c', to: '#6366f1' },
  'snap/animal-face/ko': { icon: '🐾', eyebrow: 'Animal Face', title: '동물상 테스트', desc: '사진 한 장으로 보는 나의 동물상', from: '#f97316', to: '#db2777' },
  'snap/expression/ko': { icon: '🎭', eyebrow: 'Expression', title: '표정 감정 분석', desc: 'AI로 보는 사진 속 표정의 7가지 감정', from: '#ec4899', to: '#7c3aed' },
  'snap/golden-ratio/ko': { icon: '📐', eyebrow: 'Golden Ratio', title: '황금비율 테스트', desc: '이목구비 비례가 황금비에 얼마나 가까운지', from: '#f59e0b', to: '#ea580c' },
  'snap/couple-match/ko': { icon: '💑', eyebrow: 'Couple Match', title: '커플 관상 궁합', desc: '사진 두 장으로 보는 우리 커플 궁합', from: '#f43f5e', to: '#db2777' },
  'snap/photo-mood/ko': { icon: '🎞️', eyebrow: 'Photo Mood', title: '사진 감성 분석', desc: '아무 사진이나 올려서 보는 내 감성 타입', from: '#d946ef', to: '#0ea5e9' },
  'snap/face-symmetry/ko': { icon: '⚖️', eyebrow: 'Face Symmetry', title: '얼굴 대칭 분석', desc: '사진 한 장으로 보는 좌우 밸런스 지수', from: '#6366f1', to: '#06b6d4' },
  'snap/smile-score/ko': { icon: '😊', eyebrow: 'Smile Score', title: '미소 지수 측정', desc: '사진 한 장으로 보는 내 미소 지수', from: '#fbbf24', to: '#f43f5e' },
  'snap/handwriting/ko': { icon: '✍️', eyebrow: 'Handwriting', title: '손글씨 심리 테스트', desc: '손글씨 사진으로 보는 기울기·필압 분석', from: '#475569', to: '#4338ca' },
  'fortune/daily/en': { icon: '🔮', eyebrow: '오늘의 종합운세', title: 'Today’s Horoscope', desc: 'Your reading from your birth date', from: '#7c3aed', to: '#db2777' },
  'fortune/zodiac/en': { icon: '⭐', eyebrow: 'Zodiac', title: 'Daily Horoscope', desc: 'Today’s reading for all 12 star signs', from: '#8b5cf6', to: '#7e22ce' },
  'fortune/animal/en': { icon: '🐉', eyebrow: 'Animal Sign', title: 'Chinese Zodiac', desc: 'Today’s reading for all 12 animals', from: '#f43f5e', to: '#db2777' },
  'fortune/blood-type/en': { icon: '🩸', eyebrow: '혈액형', title: 'Blood Type Horoscope', desc: 'Today’s reading for A, B, O and AB', from: '#f43f5e', to: '#dc2626' },
  'fortune/biorhythm/en': { icon: '📈', eyebrow: '바이오리듬', title: 'Biorhythm Calculator', desc: 'Chart your physical, emotional and intellectual cycles', from: '#10b981', to: '#0d9488' },
  'fortune/birth-stone/en': { icon: '💎', eyebrow: 'Birth Stone', title: 'Birthstone & Flower', desc: 'The gem and flower of your birth month', from: '#d946ef', to: '#7c3aed' },
  'fortune/today-color/en': { icon: '🎨', eyebrow: 'Lucky Colour', title: 'Today’s Lucky Colour', desc: 'Your colour for today — and the one to skip', from: '#ec4899', to: '#7c3aed' },
  'fortune/lucky-numbers/en': { icon: '🍀', eyebrow: 'Lucky Numbers', title: 'Lucky Numbers', desc: 'Six numbers from your birth date', from: '#10b981', to: '#0d9488' },
  'fortune/star-match/en': { icon: '💞', eyebrow: '별자리 궁합', title: 'Star Sign Compatibility', desc: 'How two signs match by element', from: '#8b5cf6', to: '#c026d3' },
  'fortune/zodiac-match/en': { icon: '🐲', eyebrow: '띠 궁합', title: 'Chinese Zodiac Compatibility', desc: 'Six Harmonies, Three Harmonies and clashes', from: '#f43f5e', to: '#db2777' },
  'fortune/mbti-match/en': { icon: '🧠', eyebrow: 'MBTI 궁합', title: 'MBTI Compatibility', desc: 'How two of the 16 types line up', from: '#8b5cf6', to: '#4f46e5' },
  'fortune/blood-match/en': { icon: '🩸', eyebrow: '혈액형 궁합', title: 'Blood Type Compatibility', desc: 'How A, B, O and AB pair up', from: '#f43f5e', to: '#ea580c' },
  'fortune/mbti/en': { icon: '🧠', eyebrow: 'MBTI', title: 'MBTI Daily Horoscope', desc: 'Today’s reading for all 16 types', from: '#0ea5e9', to: '#2563eb' },
  'fortune/daily-tarot/en': { icon: '🃏', eyebrow: 'Daily Tarot', title: 'Today’s Tarot', desc: 'One card from the major arcana', from: '#f59e0b', to: '#ea580c' },
  'fortune/tarot-yesno/en': { icon: '🔮', eyebrow: 'Tarot Yes/No', title: 'Tarot Yes or No', desc: 'Draw one card for an answer', from: '#6366f1', to: '#6d28d9' },
  'fortune/dream/en': { icon: '🌙', eyebrow: 'Dream', title: 'Dream Dictionary', desc: '20 common dream symbols', from: '#334155', to: '#3730a3' },
  'fortune/saju/en': { icon: '🔯', eyebrow: 'Saju', title: 'Saju — Korean Four Pillars', desc: 'Your four-pillar chart from birth date', from: '#6366f1', to: '#6d28d9' },
  'snap/smile-score/en': { icon: '😊', eyebrow: 'Smile Score', title: 'Smile Score', desc: 'How far your mouth corners lift', from: '#fbbf24', to: '#f43f5e' },
  'snap/face-symmetry/en': { icon: '⚖️', eyebrow: 'Face Symmetry', title: 'Face Symmetry', desc: 'Left–right balance, feature by feature', from: '#6366f1', to: '#06b6d4' },
  'snap/golden-ratio/en': { icon: '📐', eyebrow: 'Golden Ratio', title: 'Golden Ratio Test', desc: 'How close your proportions sit to φ', from: '#f59e0b', to: '#ea580c' },
  'snap/photo-mood/en': { icon: '🎨', eyebrow: 'Photo Mood', title: 'Photo Mood', desc: 'Colour mood from any photo', from: '#d946ef', to: '#0ea5e9' },
  'snap/expression/en': { icon: '🎭', eyebrow: 'Expression', title: 'Expression Analyser', desc: 'Seven emotions, inferred by a model', from: '#ec4899', to: '#7c3aed' },
  'snap/first-impression/en': { icon: '✨', eyebrow: 'First Impression', title: 'First Impression', desc: 'Which of six impressions you read as', from: '#d946ef', to: '#7c3aed' },
  'snap/handwriting/en': { icon: '✍️', eyebrow: 'Handwriting', title: 'Handwriting', desc: 'Slant and pressure from your writing', from: '#475569', to: '#4338ca' },
  'snap/face-reading/en': { icon: '🔮', eyebrow: 'Face Reading', title: 'Face Reading', desc: 'Seven features, traditional style', from: '#0d9488', to: '#0369a1' },
  'snap/animal-face/en': { icon: '🐾', eyebrow: 'Animal Face', title: 'Animal Face Type', desc: 'Which of twelve animals you match', from: '#f97316', to: '#db2777' },
  'snap/personal-color/en': { icon: '🎨', eyebrow: 'Personal Color', title: 'Personal Colour', desc: 'Your seasonal type and palette', from: '#fb923c', to: '#6366f1' },
  'snap/couple-match/en': { icon: '💞', eyebrow: 'Couple Match', title: 'Couple Face Match', desc: 'Compare two photos', from: '#f43f5e', to: '#db2777' },
  'fortune/daily/zh': { icon: '🔮', eyebrow: '오늘의 종합운세', title: '今日综合运势', desc: '按出生日期查看今天的运势', from: '#7c3aed', to: '#db2777' },
  'fortune/zodiac/zh': { icon: '⭐', eyebrow: 'Zodiac', title: '星座运势', desc: '12 星座今日运势查询', from: '#8b5cf6', to: '#7e22ce' },
  'fortune/animal/zh': { icon: '🐉', eyebrow: 'Animal Sign', title: '生肖运势', desc: '十二生肖今日运势查询', from: '#f43f5e', to: '#db2777' },
  'fortune/blood-type/zh': { icon: '🩸', eyebrow: '혈액형', title: '血型运势', desc: 'A、B、O、AB 型今日运势', from: '#f43f5e', to: '#dc2626' },
  'fortune/biorhythm/zh': { icon: '📈', eyebrow: '바이오리듬', title: '生物节律', desc: '身体·情绪·智力三条节律曲线', from: '#10b981', to: '#0d9488' },
  'fortune/birth-stone/zh': { icon: '💎', eyebrow: 'Birth Stone', title: '诞生石·诞生花', desc: '出生月份的宝石与花及其含义', from: '#d946ef', to: '#7c3aed' },
  'fortune/today-color/zh': { icon: '🎨', eyebrow: 'Lucky Colour', title: '今日幸运色', desc: '今天的幸运色与要避开的颜色', from: '#ec4899', to: '#7c3aed' },
  'fortune/lucky-numbers/zh': { icon: '🍀', eyebrow: 'Lucky Numbers', title: '今日幸运数字', desc: '由出生日期生成的 6 个数字', from: '#10b981', to: '#0d9488' },
  'fortune/star-match/zh': { icon: '💞', eyebrow: '별자리 궁합', title: '星座配对', desc: '按四元素看两个星座的相配程度', from: '#8b5cf6', to: '#c026d3' },
  'fortune/zodiac-match/zh': { icon: '🐲', eyebrow: '띠 궁합', title: '生肖配对', desc: '六合、三合、相冲的传统相性', from: '#f43f5e', to: '#db2777' },
  'fortune/mbti-match/zh': { icon: '🧠', eyebrow: 'MBTI 궁합', title: 'MBTI 配对', desc: '16型人格中两者的契合度', from: '#8b5cf6', to: '#4f46e5' },
  'fortune/blood-match/zh': { icon: '🩸', eyebrow: '혈액형 궁합', title: '血型配对', desc: 'A、B、O、AB 型的配对结果', from: '#f43f5e', to: '#ea580c' },
  'fortune/mbti/zh': { icon: '🧠', eyebrow: 'MBTI', title: 'MBTI 今日运势', desc: '16型人格的今日运势', from: '#0ea5e9', to: '#2563eb' },
  'fortune/daily-tarot/zh': { icon: '🃏', eyebrow: 'Daily Tarot', title: '今日塔罗', desc: '大阿尔卡纳中的一张', from: '#f59e0b', to: '#ea580c' },
  'fortune/tarot-yesno/zh': { icon: '🔮', eyebrow: 'Tarot Yes/No', title: '塔罗是与否', desc: '抽一张牌得到答案', from: '#6366f1', to: '#6d28d9' },
  'fortune/dream/zh': { icon: '🌙', eyebrow: 'Dream', title: '周公解梦', desc: '20 个常见梦境意象', from: '#334155', to: '#3730a3' },
  'fortune/saju/zh': { icon: '🔯', eyebrow: 'Saju', title: '八字排盘', desc: '由出生年月日时排出四柱', from: '#6366f1', to: '#6d28d9' },
  'snap/smile-score/zh': { icon: '😊', eyebrow: 'Smile Score', title: '微笑指数', desc: '测量嘴角上扬的程度', from: '#fbbf24', to: '#f43f5e' },
  'snap/face-symmetry/zh': { icon: '⚖️', eyebrow: 'Face Symmetry', title: '脸部对称度', desc: '分部位看左右平衡', from: '#6366f1', to: '#06b6d4' },
  'snap/golden-ratio/zh': { icon: '📐', eyebrow: 'Golden Ratio', title: '黄金比例测试', desc: '五官比例与 φ 的接近程度', from: '#f59e0b', to: '#ea580c' },
  'snap/photo-mood/zh': { icon: '🎨', eyebrow: 'Photo Mood', title: '照片氛围', desc: '任意照片的色彩调性', from: '#d946ef', to: '#0ea5e9' },
  'snap/expression/zh': { icon: '🎭', eyebrow: 'Expression', title: '表情分析', desc: '模型推断的七种情绪', from: '#ec4899', to: '#7c3aed' },
  'snap/first-impression/zh': { icon: '✨', eyebrow: 'First Impression', title: '第一印象', desc: '你属于六种印象中的哪一种', from: '#d946ef', to: '#7c3aed' },
  'snap/handwriting/zh': { icon: '✍️', eyebrow: 'Handwriting', title: '笔迹分析', desc: '从字迹测量倾斜度与笔压', from: '#475569', to: '#4338ca' },
  'snap/face-reading/zh': { icon: '🔮', eyebrow: 'Face Reading', title: '面相分析', desc: '七处五官的传统解读', from: '#0d9488', to: '#0369a1' },
  'snap/animal-face/zh': { icon: '🐾', eyebrow: 'Animal Face', title: '动物脸测试', desc: '你最像十二种动物中的哪一种', from: '#f97316', to: '#db2777' },
  'snap/personal-color/zh': { icon: '🎨', eyebrow: 'Personal Color', title: '个人色彩', desc: '你的四季型与专属色板', from: '#fb923c', to: '#6366f1' },
  'snap/couple-match/zh': { icon: '💞', eyebrow: 'Couple Match', title: '情侣面相配对', desc: '比较两张照片', from: '#f43f5e', to: '#db2777' },
};

export type OgLang = 'en';

/** 표에 있는 카드 — 없는 열쇠는 빌드가 죽어야 한다(조용히 빈 카드가 나가는 것보다 낫다) */
export function intlOg(key: string): ReactElement {
  const c = CARDS[key];
  if (!c) throw new Error(`og-intl: 카드 문구가 없다 — ${key}`);
  return ogCard(c);
}

/** 색상 도구 — 사전에서 언어별 문구를, 카탈로그에서 아이콘·색을 읽는다 */
export function colorOg(slug: string, lang: OgLang): ReactElement {
  const tool = findColorToolIntl(lang as ColorIntlLang, slug) ?? COLOR_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 색상 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 시간 도구 — 색상 도구와 같은 방식 */
export function timeOg(slug: string, lang: OgLang): ReactElement {
  const tool = findTimeToolIntl(lang as ColorIntlLang, slug) ?? TIME_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 시간 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 이미지 도구 — 색상 도구와 같은 방식 */
export function imageOg(slug: string, lang: OgLang): ReactElement {
  const tool = findImageToolIntl(lang, slug) ?? IMAGE_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 이미지 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 계량·요리 도구 — 색상 도구와 같은 방식 */
export function foodOg(slug: string, lang: OgLang): ReactElement {
  const tool = findFoodToolIntl(lang, slug) ?? FOOD_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 요리 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 소리 도구 — 색상 도구와 같은 방식 */
export function soundOg(slug: string, lang: OgLang): ReactElement {
  const tool = findSoundToolIntl(lang, slug) ?? SOUND_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 소리 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 랜덤 뽑기 — 도구 메타에 언어별 문구가 같이 들어 있다 */
export function randomOg(slug: string, lang: 'ko' | OgLang): ReactElement {
  const tool: RandomTool | undefined = RANDOM_TOOLS_MAP[slug];
  if (!tool) throw new Error(`og-intl: 랜덤 도구가 없다 — ${slug}`);
  const title = lang === 'en' ? tool.titleEn : tool.title;
  const desc = lang === 'en' ? tool.descEn : tool.desc;
  // 중국어 카테고리는 데이터에 없다. 한국어를 그대로 쓰면 중국어 카드에 한글이
  // 끼므로 섹션 라벨로 대신한다.
  const eyebrow = lang === 'ko' ? tool.category : lang === 'en' ? tool.categoryEn : 'Random Picker';
  const hub = CARDS[`random/${lang}`];
  return ogCard({ icon: tool.icon, eyebrow, title, desc, from: hub.from, to: hub.to });
}

/** 두뇌 게임 — 색상 도구와 같은 방식 */
export function gameOg(slug: string, lang: OgLang): ReactElement {
  const tool = findGameToolIntl(lang, slug) ?? GAME_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 게임이 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 기기 점검 — 색상 도구와 같은 방식 */
export function deviceOg(slug: string, lang: OgLang): ReactElement {
  const tool = findDeviceToolIntl(lang, slug) ?? DEVICE_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 기기 점검이 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 텍스트 도구 — 한글 전용 네 종은 en/zh 목록에 없어 한국어로 폴백한다 */
export function textOg(slug: string, lang: OgLang): ReactElement {
  const tool = findTextToolIntl(lang, slug) ?? TEXT_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 텍스트 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}
