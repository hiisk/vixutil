/**
 * 공유 버튼의 문구 — 열 언어.
 *
 * ShareButton과 CalcShareBtn 둘 다 문구가 한국어로 박혀 있었다. 두 버튼은
 * 한국어 페이지에서만 쓰이는 게 아니다 — TestEngine·QuizEngine은 lang을 받아
 * 열 언어를 그리고, 국제 계산기 껍데기(CalcShellIntl)는 "버튼이 한국어라서"
 * 공유를 아예 빼 놓고 있었다. 문구가 여기로 나오면 뺄 이유가 없어진다.
 *
 * CTA는 한 언어에 여러 개를 둔다. 버튼이 붙은 뒤에 그중 하나를 고른다 —
 * 까닭은 ShareButton 안 주석에 적어 두었다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';

/** 계산기는 CalcShareBtn이 따로 있어서 CTA 풀에 없다. */
export type ShareCTA = 'test' | 'quiz' | 'generator' | 'fortune';

export interface ShareCopy {
  /** 큰 공유 버튼 위의 작은 머리글 */
  heading: string;
  /** 링크를 복사한 뒤 그 버튼에 뜨는 말 */
  copied: string;
  /** 계산기 머리글의 작은 공유 칩 */
  calcShare: string;
  /** 그 칩이 복사 뒤에 보이는 말 */
  calcCopied: string;
  /** 그 칩의 aria-label */
  calcAria: string;
  /** 결과를 이미지로 만들어 공유하는 버튼(SaveResultCard) */
  cardSave: string;
  /** 그 버튼이 캔버스를 그리는 동안 */
  cardSaving: string;
  /** 그 버튼이 다 만든 뒤 잠깐 */
  cardDone: string;
  /** 이미지 맨 아래 워터마크 한 줄 — {u} 자리에 주소가 들어간다 */
  cardFooter: string;
  /** 화면 종류별 CTA 후보 */
  cta: Record<ShareCTA, string[]>;
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const CTA = (test: string[], quiz: string[], generator: string[], fortune: string[]): Record<ShareCTA, string[]> =>
  ({ test, quiz, generator, fortune });

type Spec = { [K in keyof ShareCopy]: L<ShareCopy[K]> };

const SPEC: Spec = {
  heading: T(
    '공유하기', 'Share', 'Compartir', 'Compartilhar', 'シェア',
    'Teilen', 'Partager', 'शेयर करें', '分享', '分享',
  ),
  copied: T(
    '링크가 복사됐어요!', 'Link copied', 'Enlace copiado', 'Link copiado', 'リンクをコピーしました',
    'Link kopiert', 'Lien copié', 'लिंक कॉपी हो गया', '链接已复制', '連結已複製',
  ),
  calcShare: T(
    '공유', 'Share', 'Compartir', 'Compartilhar', '共有',
    'Teilen', 'Partager', 'शेयर', '分享', '分享',
  ),
  calcCopied: T(
    '복사됨', 'Copied', 'Copiado', 'Copiado', 'コピー済み',
    'Kopiert', 'Copié', 'कॉपी हुआ', '已复制', '已複製',
  ),
  calcAria: T(
    '계산기 공유', 'Share this calculator', 'Compartir esta calculadora', 'Compartilhar esta calculadora', 'この計算機を共有',
    'Diesen Rechner teilen', 'Partager cette calculatrice', 'यह कैलकुलेटर शेयर करें', '分享这个计算器', '分享這個計算機',
  ),

  cardSave: T(
    '🖼️ 결과 이미지로 저장·공유', '🖼️ Save as an image', '🖼️ Guardar como imagen', '🖼️ Salvar como imagem', '🖼️ 画像で保存・シェア',
    '🖼️ Als Bild speichern', "🖼️ Enregistrer en image", '🖼️ इमेज के रूप में सेव करें', '🖼️ 保存为图片', '🖼️ 儲存成圖片',
  ),
  cardSaving: T(
    '이미지 만드는 중...', 'Making the image…', 'Creando la imagen…', 'Criando a imagem…', '画像を作成中…',
    'Bild wird erstellt…', "Création de l'image…", 'इमेज बन रही है…', '正在生成图片…', '正在產生圖片…',
  ),
  cardDone: T(
    '완료! ✓', 'Done ✓', '¡Listo! ✓', 'Pronto! ✓', '完了 ✓',
    'Fertig ✓', 'Terminé ✓', 'हो गया ✓', '完成 ✓', '完成 ✓',
  ),
  /* 주소를 앞뒤 어디에 두느냐가 언어마다 다르다 — 그래서 통째로 한 줄씩 적는다 */
  cardFooter: T(
    '📸 {u} 에서 나도 해보기', '📸 Try it yourself at {u}', '📸 Pruébalo tú en {u}', '📸 Faça o seu em {u}', '📸 {u} でやってみる',
    '📸 Selbst ausprobieren auf {u}', '📸 À toi de jouer sur {u}', '📸 आप भी करें — {u}', '📸 你也来试试 {u}', '📸 你也來試試 {u}',
  ),

  cta: T(
    CTA(
      ['친구도 테스트 해보기', '내 결과 자랑하기', '친구 결과와 비교하기', '친구는 어떤 결과일까?', '생각보다 정확한 테스트', '친구한테도 보내보기', '이건 친구도 해봐야 함', '의외로 정확해서 공유'],
      ['내 점수 자랑하기', '친구도 도전해보기', '몇 점 받을 수 있을까?', '친구와 퀴즈 대결하기', '친구도 맞출 수 있을까?', '점수 공유하기'],
      ['친구도 하나 뽑아보기', '친구에게 보여주기', '친구는 뭐가 나올까?', '결과 공유하기', '의외로 괜찮은 결과'],
      ['오늘 운세 공유하기', '친구 운세도 보여주기', '내 운세 자랑하기', '친구는 오늘 운세가 어떨까?', '결과 공유하기'],
    ),
    CTA(
      ['Send it to a friend', 'What would your friends get?', 'Show off your result'],
      ['Show off your score', 'Can your friends beat this?', 'Challenge a friend'],
      ['Let a friend try', 'Show someone what you got', 'Share this one'],
      ["Share today's reading", 'What do your friends get?', 'Show off your fortune'],
    ),
    CTA(
      ['Enviárselo a un amigo', '¿Qué les saldrá a tus amigos?', 'Presumir de resultado'],
      ['Presumir de tu nota', '¿Tus amigos lo harán mejor?', 'Retar a un amigo'],
      ['Que lo pruebe un amigo', 'Enseñar lo que te salió', 'Compartir esto'],
      ['Compartir el horóscopo de hoy', '¿Y el de tus amigos?', 'Presumir de suerte'],
    ),
    CTA(
      ['Mandar para um amigo', 'Será que dá o mesmo nos seus amigos?', 'Mostrar meu resultado'],
      ['Mostrar minha nota', 'Será que seus amigos acertam mais?', 'Desafiar um amigo'],
      ['Deixar um amigo tentar', 'Mostrar o que saiu', 'Compartilhar isto'],
      ['Compartilhar o horóscopo de hoje', 'E o dos seus amigos?', 'Mostrar minha sorte'],
    ),
    CTA(
      ['友だちにも送ってみる', '友だちは何タイプ？', '結果をシェアする'],
      ['スコアを自慢する', '友だちは何点取れる？', '友だちに挑戦させる'],
      ['友だちにも引かせてみる', '出たものを見せる', 'これをシェアする'],
      ['今日の運勢をシェア', '友だちの運勢はどうだろう？', '結果をシェアする'],
    ),
    CTA(
      ['Einem Freund schicken', 'Was kommt bei deinen Freunden raus?', 'Ergebnis teilen'],
      ['Mit dem Ergebnis angeben', 'Schaffen deine Freunde mehr?', 'Einen Freund herausfordern'],
      ['Einen Freund ziehen lassen', 'Zeigen, was rausgekommen ist', 'Das hier teilen'],
      ['Tageshoroskop teilen', 'Was sagen die Sterne deinen Freunden?', 'Ergebnis teilen'],
    ),
    CTA(
      ['Envoyer à un ami', 'Et tes amis, ça donne quoi ?', 'Partager mon résultat'],
      ['Frimer avec ton score', 'Tes amis feront mieux ?', 'Défier un ami'],
      ['Faire essayer à un ami', 'Montrer ce que tu as eu', 'Partager ça'],
      ["Partager l'horoscope du jour", 'Et celui de tes amis ?', 'Partager mon résultat'],
    ),
    CTA(
      ['दोस्तों को भेजें', 'दोस्तों का क्या आएगा?', 'अपना नतीजा दिखाएँ'],
      ['अपना स्कोर दिखाएँ', 'क्या दोस्त इससे ज़्यादा ला पाएँगे?', 'दोस्त को चुनौती दें'],
      ['दोस्त को भी आज़माने दें', 'जो निकला वो दिखाएँ', 'इसे शेयर करें'],
      ['आज का राशिफल शेयर करें', 'दोस्तों का राशिफल भी देखें', 'अपना राशिफल दिखाएँ'],
    ),
    CTA(
      ['发给朋友试试', '朋友会是哪一型？', '晒一下我的结果'],
      ['晒一下我的分数', '朋友能考几分？', '找朋友比一比'],
      ['让朋友也抽一个', '给朋友看看抽到了啥', '分享这个'],
      ['分享今天的运势', '朋友今天的运势如何？', '晒一下我的运势'],
    ),
    CTA(
      ['傳給朋友試試', '朋友會是哪一型？', '曬一下我的結果'],
      ['曬一下我的分數', '朋友能考幾分？', '找朋友比一比'],
      ['讓朋友也抽一個', '給朋友看看抽到什麼', '分享這個'],
      ['分享今天的運勢', '朋友今天的運勢如何？', '曬一下我的運勢'],
    ),
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SHARE_UI: L<ShareCopy> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ShareCopy>;

/**
 * 링크 공유는 전부 여기를 지난다 — **한 덩이로 나간다.**
 *
 * navigator.share의 세 칸(title·text·url)은 한 통이 아니라 **세 조각**이다.
 * 받는 쪽에서 무슨 일이 벌어지는지 실제로 재 봤다(헤드리스 크롬에서 가로챔):
 *
 *  - `title`은 안드로이드에서 Intent.EXTRA_SUBJECT로 간다. 메일 앱만 읽고
 *    카톡·라인·왓츠앱은 **통째로 버린다.** 그런데 이 저장소는 하필 거기에
 *    결과를 담고 있었다 — `title: '오늘의 행운 로또 번호: 13, 14, 15, 16, 19, 20 + 17'`.
 *    공유하는 단 하나의 이유가 정확히 버려지는 칸에 들어 있었다.
 *    스냅 열 장·타로·계산기도 같았다(`title: text, url`) — 받는 쪽엔 맨 주소만.
 *  - `text`와 `url`을 같이 넘기면 iOS는 활동 항목 **두 개**를 넘긴다. 앱마다
 *    하나만 집거나 두 통으로 쪼갠다. (안드로이드 크롬은 어차피 둘을 이어붙여
 *    한 통으로 만든다 — 즉 합치는 쪽이 안드로이드에서는 지금과 똑같고,
 *    iOS에서만 갈라지는 걸 막는다.)
 *
 * 그래서 문구와 주소를 한 문자열로 이어 `text` 한 칸으로만 넘긴다. 조각이
 * 하나뿐이라 어느 앱에서도 쪼갤 수가 없다.
 *
 * 잃는 것: `url` 칸을 보고 카드를 만드는 앱(iMessage 등)에서 큰 미리보기가
 * 안 뜨고 주소가 글자로 남는다. 얻는 것: 카톡·라인·왓츠앱·텔레그램·슬랙·
 * 디스코드·X는 **글 안의 주소도 긁어서** og 카드를 만든다 — 미리보기는
 * 그대로 뜨면서 문구까지 함께 간다. 이 사이트의 공유는 대부분 카톡이다.
 *
 * 클립보드로 떨어지는 길(데스크톱 대부분)도 **같은 문자열**을 쓴다. 예전에는
 * 자리마다 제각각이라 열여섯 곳 중 열넷이 주소만 복사하고 문구를 버렸다.
 *
 * @returns 클립보드로 떨어졌으면 true — 부르는 쪽이 "복사됨"을 띄운다.
 */
export async function shareOne(text: string, url: string = location.href): Promise<boolean> {
  const one = text ? `${text}\n${url}` : url;
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ text: one });
      return false;
    } catch (e) {
      // 사용자가 시트를 닫은 것뿐이면 클립보드로 또 떨어뜨리지 않는다
      if ((e as Error).name === 'AbortError') return false;
    }
  }
  try {
    await navigator.clipboard.writeText(one);
    return true;
  } catch {
    return false;
  }
}
