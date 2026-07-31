/**
 * 메이저 아르카나 22장의 이름과 해석 — 여덟 언어.
 *
 * 마이너 56장은 수트와 계급을 겹쳐 만들지만, 메이저는 카드마다 고유한 그림과
 * 이야기가 있어 조합으로 만들 수 없다. 그래서 이 스물두 장만 손으로 적는다.
 *
 * 카드 이름은 언어마다 오래 굳어진 것이 있다 — 프랑스어 The Tower는
 * La Maison Dieu(신의 집)이고, The Fool은 Le Mat다. 영어를 옮기지 않고
 * 그 나라에서 쓰는 이름을 쓴다.
 *
 * 해석은 한 문장씩만 적는다. 여기는 뽑기 도구가 아니라 카드를 찾아보는
 * 자료 페이지라, 길게 쓰면 78장이 다 비슷해 보인다.
 */
import type { L8 } from '../i18n/lang.ts';

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = (ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string): L8<string> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

export interface MajorCopy {
  name: L8<string>;
  up: L8<string>;
  rev: L8<string>;
}

const M = (name: L8<string>, up: L8<string>, rev: L8<string>): MajorCopy => ({ name, up, rev });

export const MAJOR_COPY: Record<string, MajorCopy> = {
  'the-fool': M(
    T('광대', 'The Fool', 'El Loco', 'O Louco', '愚者', 'Der Narr', 'Le Mat', 'मूर्ख'),
    T(
      '새로운 시작과 순수한 모험심. 계획이 완성되기 전에 첫걸음을 내딛는 용기를 말합니다.',
      'A new beginning and open-hearted adventure — the courage to take a first step before the plan is finished.',
      'Un comienzo nuevo y un espíritu aventurero: el valor de dar el primer paso antes de tener el plan completo.',
      'Um começo novo e espírito de aventura: a coragem de dar o primeiro passo antes de o plano estar pronto.',
      '新しい始まりと純粋な冒険心。計画が固まる前に一歩を踏み出す勇気を示します。',
      'Ein neuer Anfang und offene Abenteuerlust — der Mut, den ersten Schritt zu tun, bevor der Plan fertig ist.',
      "Un nouveau départ et un esprit d'aventure : le courage de faire le premier pas avant que le plan soit prêt.",
      'नई शुरुआत और निश्छल साहस — योजना पूरी होने से पहले पहला कदम उठाने का हौसला।',
    ),
    T(
      '무모함이거나 지나친 망설임. 뛰기 전에 최소한의 확인은 필요합니다.',
      'Recklessness, or hesitation that has gone too far — do the minimum reality check before you leap.',
      'Imprudencia o demasiada vacilación: haz la comprobación mínima antes de saltar.',
      'Imprudência ou hesitação demais: faça a checagem mínima antes de saltar.',
      '無謀さ、あるいは行きすぎたためらい。飛ぶ前に最低限の確認は必要です。',
      'Leichtsinn oder zu viel Zögern — prüfen Sie wenigstens das Nötigste, bevor Sie springen.',
      "Imprudence ou hésitation excessive : faites la vérification minimale avant de sauter.",
      'लापरवाही या हद से ज़्यादा हिचक — छलाँग से पहले कम से कम जाँच तो कर लें।',
    ),
  ),

  'the-magician': M(
    T('마법사', 'The Magician', 'El Mago', 'O Mago', '魔術師', 'Der Magier', 'Le Bateleur', 'जादूगर'),
    T(
      '가진 재능을 실제로 쓰는 때. 의지와 집중이 그대로 결과로 이어집니다.',
      'The moment to put your talent to work — will and focus turn straight into results.',
      'El momento de poner el talento a trabajar: voluntad y concentración se convierten en resultados.',
      'A hora de pôr o talento para trabalhar: vontade e foco viram resultado.',
      '持っている才能を実際に使うとき。意志と集中がそのまま結果になります。',
      'Der Moment, das Talent einzusetzen — Wille und Konzentration werden unmittelbar zu Ergebnissen.',
      "Le moment de mettre son talent en œuvre : volonté et concentration deviennent des résultats.",
      'अपनी क्षमता को काम में लगाने का समय — इच्छा और एकाग्रता सीधे नतीजे बनते हैं।',
    ),
    T(
      '재능이 놀고 있거나 엉뚱한 쪽으로 쓰입니다. 의도를 먼저 확인하세요.',
      'Talent lying idle or aimed the wrong way — check the intention behind it first.',
      'Talento desaprovechado o mal dirigido: revisa primero la intención.',
      'Talento parado ou apontado para o lado errado: confira antes a intenção.',
      '才能が眠っているか、見当違いの方向に使われています。まず意図を確かめてください。',
      'Talent liegt brach oder zielt in die falsche Richtung — prüfen Sie zuerst die Absicht.',
      "Un talent inutilisé ou mal orienté : vérifiez d'abord l'intention.",
      'क्षमता बेकार पड़ी है या ग़लत दिशा में लगी है — पहले नीयत जाँचें।',
    ),
  ),

  'the-high-priestess': M(
    T('여사제', 'The High Priestess', 'La Sacerdotisa', 'A Sacerdotisa', '女教皇', 'Die Hohepriesterin', 'La Papesse', 'महायाजिका'),
    T(
      '말하기보다 듣는 때. 이성보다 직관이 먼저 아는 것이 있습니다.',
      'A time for listening rather than speaking — intuition knows this one before reason does.',
      'Tiempo de escuchar más que de hablar: aquí la intuición sabe antes que la razón.',
      'Hora de ouvir mais do que falar: aqui a intuição sabe antes da razão.',
      '話すより聞くとき。理性より先に直感が知っていることがあります。',
      'Eine Zeit zum Zuhören statt zum Reden — hier weiß die Intuition mehr als der Verstand.',
      "Un temps pour écouter plutôt que parler : ici l'intuition sait avant la raison.",
      'बोलने से ज़्यादा सुनने का समय — यहाँ तर्क से पहले अंतर्ज्ञान जानता है।',
    ),
    T(
      '내면의 소리를 덮어 두었거나, 아직 드러나지 않은 사실이 남아 있습니다.',
      'You have muted your own inner voice, or something has not surfaced yet.',
      'Has silenciado tu voz interior, o algo aún no ha salido a la luz.',
      'Você silenciou a própria voz interior, ou algo ainda não veio à tona.',
      '内なる声を押さえているか、まだ表に出ていない事実が残っています。',
      'Sie überhören die eigene innere Stimme, oder etwas ist noch nicht ans Licht gekommen.',
      "Vous avez fait taire votre voix intérieure, ou quelque chose n'a pas encore fait surface.",
      'आपने अपनी भीतरी आवाज़ दबा दी है, या कुछ अब तक सामने नहीं आया है।',
    ),
  ),

  'the-empress': M(
    T('여황제', 'The Empress', 'La Emperatriz', 'A Imperatriz', '女帝', 'Die Herrscherin', "L'Impératrice", 'महारानी'),
    T(
      '풍요와 창조. 돌보고 자라게 하는 힘이 지금 가장 잘 통합니다.',
      'Abundance and creation — the power to nurture and let things grow works best right now.',
      'Abundancia y creación: la capacidad de cuidar y hacer crecer funciona mejor que nunca.',
      'Abundância e criação: a capacidade de cuidar e fazer crescer funciona melhor agora.',
      '豊かさと創造。育て、育つに任せる力がいちばんよく働くときです。',
      'Fülle und Schöpfung — die Kraft zu nähren und wachsen zu lassen wirkt jetzt am stärksten.',
      "Abondance et création : le pouvoir de nourrir et de laisser croître agit mieux que jamais.",
      'समृद्धि और सृजन — पोषने और बढ़ने देने की शक्ति अभी सबसे अच्छी तरह काम करती है।',
    ),
    T(
      '자신을 돌보지 않거나, 반대로 너무 꽉 쥐고 있습니다.',
      'You are neglecting yourself, or holding on far too tightly.',
      'Te estás descuidando, o bien agarras las cosas con demasiada fuerza.',
      'Você está se descuidando, ou segurando as coisas com força demais.',
      '自分を後回しにしているか、逆に握りしめすぎています。',
      'Sie vernachlässigen sich selbst — oder halten viel zu fest.',
      'Vous vous négligez, ou bien vous serrez beaucoup trop fort.',
      'आप खुद की उपेक्षा कर रहे हैं, या फिर बहुत कसकर पकड़े हुए हैं।',
    ),
  ),

  'the-emperor': M(
    T('황제', 'The Emperor', 'El Emperador', 'O Imperador', '皇帝', 'Der Herrscher', "L'Empereur", 'सम्राट'),
    T(
      '질서와 책임. 틀을 세우고 그 안에서 꾸준히 하면 성과가 따라옵니다.',
      'Order and responsibility — set the frame, work steadily inside it, and results follow.',
      'Orden y responsabilidad: pon el marco, trabaja con constancia dentro y llegarán los resultados.',
      'Ordem e responsabilidade: monte a estrutura, trabalhe com constância nela e os resultados vêm.',
      '秩序と責任。枠を決めてその中で続ければ、成果はついてきます。',
      'Ordnung und Verantwortung — setzen Sie den Rahmen, arbeiten Sie stetig darin, dann folgen Ergebnisse.',
      "Ordre et responsabilité : posez le cadre, travaillez-y régulièrement, les résultats suivront.",
      'व्यवस्था और ज़िम्मेदारी — ढाँचा बनाइए, उसी में लगातार काम कीजिए, नतीजे पीछे-पीछे आएँगे।',
    ),
    T(
      '틀이 굳어 버렸거나, 반대로 아무 틀도 없어 흘러가고 있습니다.',
      'The structure has hardened, or there is no structure at all and things are drifting.',
      'La estructura se ha vuelto rígida, o no hay ninguna y todo va a la deriva.',
      'A estrutura endureceu, ou não há estrutura alguma e tudo vai à deriva.',
      '枠が硬直しているか、逆に枠がまったくなく流されています。',
      'Die Struktur ist erstarrt — oder es gibt gar keine, und alles treibt dahin.',
      "Le cadre s'est figé, ou bien il n'y en a aucun et tout part à la dérive.",
      'ढाँचा जड़ हो गया है, या कोई ढाँचा ही नहीं और सब बहा जा रहा है।',
    ),
  ),

  'the-hierophant': M(
    T('교황', 'The Hierophant', 'El Sumo Sacerdote', 'O Hierofante', '教皇', 'Der Hierophant', 'Le Pape', 'धर्मगुरु'),
    T(
      '전통과 배움. 먼저 그 길을 걸어 본 사람에게 묻는 편이 빠릅니다.',
      'Tradition and learning — asking someone who has walked the road already saves the detour.',
      'Tradición y aprendizaje: preguntar a quien ya recorrió el camino te ahorra el rodeo.',
      'Tradição e aprendizado: perguntar a quem já percorreu o caminho poupa o desvio.',
      '伝統と学び。先に同じ道を歩いた人に尋ねるほうが早く進めます。',
      'Tradition und Lernen — wer den Weg schon gegangen ist, erspart Ihnen den Umweg.',
      "Tradition et apprentissage : demander à qui a déjà parcouru le chemin évite le détour.",
      'परंपरा और सीख — जो पहले इस राह पर चल चुका है, उससे पूछना चक्कर बचाता है।',
    ),
    T(
      '관습이 도움이 아니라 굴레가 되었습니다. 따르던 규칙을 한 번 의심해 보세요.',
      'Convention has become a constraint rather than a help — question the rule you never examined.',
      'La convención se ha vuelto una atadura más que una ayuda: cuestiona la regla que nunca revisaste.',
      'A convenção virou amarra em vez de ajuda: questione a regra que você nunca examinou.',
      '慣習が助けではなく足かせになっています。従ってきた決まりを一度疑ってみてください。',
      'Die Konvention hilft nicht mehr, sie fesselt — hinterfragen Sie die Regel, die Sie nie geprüft haben.',
      "La convention entrave au lieu d'aider : interrogez la règle que vous n'avez jamais examinée.",
      'परंपरा अब मदद नहीं, बंधन बन गई है — जिस नियम को कभी परखा नहीं, उसे परखिए।',
    ),
  ),

  'the-lovers': M(
    T('연인', 'The Lovers', 'Los Enamorados', 'Os Amantes', '恋人', 'Die Liebenden', 'Les Amoureux', 'प्रेमी'),
    T(
      '관계와 선택. 남 보기 좋은 쪽이 아니라 정말 소중히 여기는 쪽을 고르라는 카드입니다.',
      'Connection and choice — pick what you actually value, not what looks right to others.',
      'Vínculo y elección: escoge lo que de verdad valoras, no lo que queda bien ante los demás.',
      'Vínculo e escolha: prefira o que você realmente valoriza, não o que parece certo aos outros.',
      '関係と選択。人目に良い方ではなく、本当に大切にしている方を選ぶ札です。',
      'Verbindung und Wahl — entscheiden Sie nach dem, was Ihnen wirklich wichtig ist, nicht nach dem Eindruck.',
      "Lien et choix : choisissez ce à quoi vous tenez vraiment, pas ce qui fait bonne figure.",
      'रिश्ता और चुनाव — वही चुनिए जो सचमुच आपको प्रिय है, वह नहीं जो दूसरों को अच्छा लगे।',
    ),
    T(
      '어긋난 관계이거나, 스스로 정해지기를 바라며 미뤄 둔 결정입니다.',
      'A relationship out of balance, or a decision deferred in the hope it decides itself.',
      'Una relación desequilibrada, o una decisión aplazada esperando que se resuelva sola.',
      'Uma relação desequilibrada, ou uma decisão adiada na esperança de se resolver sozinha.',
      'かみ合わない関係、あるいは自然に決まることを期待して先送りした決断です。',
      'Eine aus dem Gleichgewicht geratene Beziehung — oder eine Entscheidung, die sich selbst treffen soll.',
      "Une relation déséquilibrée, ou une décision repoussée en espérant qu'elle se prenne seule.",
      'बेमेल रिश्ता, या यह उम्मीद कि फ़ैसला अपने आप हो जाएगा और इसलिए टाला गया।',
    ),
  ),

  'the-chariot': M(
    T('전차', 'The Chariot', 'El Carro', 'O Carro', '戦車', 'Der Wagen', 'Le Chariot', 'रथ'),
    T(
      '의지로 밀고 나갑니다. 방향만 분명하면 지금은 속도가 붙습니다.',
      'Forward by force of will — with the direction clear, this is when momentum builds.',
      'Avanzar por pura voluntad: con la dirección clara, ahora se gana velocidad.',
      'Avançar pela força da vontade: com a direção clara, agora ganha-se velocidade.',
      '意志で押し進めるとき。方向さえはっきりしていれば勢いがつきます。',
      'Vorwärts durch Willenskraft — ist die Richtung klar, kommt jetzt Schwung auf.',
      "Avancer par la volonté : la direction étant claire, l'élan se prend maintenant.",
      'इच्छाशक्ति से आगे बढ़ना — दिशा साफ़ हो तो अभी गति बनती है।',
    ),
    T(
      '방향을 잃었거나, 힘만 쓰고 있습니다. 더 밀기 전에 어디로 가는지부터 보세요.',
      'The direction is lost, or force is being spent where it does not help — check the bearing before pushing harder.',
      'Se ha perdido el rumbo, o se gasta fuerza donde no sirve: mira adónde vas antes de empujar más.',
      'O rumo se perdeu, ou a força está sendo gasta onde não ajuda: veja para onde vai antes de empurrar mais.',
      '方向を見失っているか、力だけを使っています。押す前にどこへ向かうかを確かめてください。',
      'Die Richtung fehlt, oder Kraft wird dort verbraucht, wo sie nichts nützt — erst peilen, dann drücken.',
      "Le cap est perdu, ou la force s'épuise là où elle ne sert à rien : vérifiez la direction avant de forcer.",
      'दिशा खो गई है, या ताक़त वहाँ लग रही है जहाँ काम नहीं आती — और ज़ोर लगाने से पहले रास्ता देखिए।',
    ),
  ),

  strength: M(
    T('힘', 'Strength', 'La Fuerza', 'A Força', '力', 'Die Kraft', 'La Force', 'शक्ति'),
    T(
      '부드러운 힘. 누르는 쪽이 아니라 견디는 쪽이 이기는 국면입니다.',
      'Quiet strength — here it is patience, not pressure, that wins.',
      'Fuerza serena: aquí gana la paciencia, no la presión.',
      'Força serena: aqui vence a paciência, não a pressão.',
      'やわらかな力。押さえつける側ではなく、耐える側が通る場面です。',
      'Sanfte Stärke — hier gewinnt Geduld, nicht Druck.',
      'Force tranquille : ici, c’est la patience qui l’emporte, pas la pression.',
      'कोमल शक्ति — यहाँ दबाव नहीं, धैर्य जीतता है।',
    ),
    T(
      '자신을 못 믿고 있거나 조급합니다. 힘은 그대로이고 믿음만 흔들린 것입니다.',
      'Self-doubt or impatience — the strength has not gone anywhere, only the confidence in it.',
      'Duda o impaciencia: la fuerza sigue ahí, lo que ha flaqueado es la confianza en ella.',
      'Dúvida ou impaciência: a força continua aí, o que abalou foi a confiança nela.',
      '自分を信じられないか、焦っています。力はそのままで、揺れているのは自信だけです。',
      'Selbstzweifel oder Ungeduld — die Kraft ist noch da, nur das Vertrauen darin wankt.',
      "Doute ou impatience : la force est intacte, seule la confiance en elle a vacillé.",
      'ख़ुद पर शक या जल्दबाज़ी — शक्ति वहीं है, डगमगाया सिर्फ़ उस पर भरोसा है।',
    ),
  ),

  'the-hermit': M(
    T('은둔자', 'The Hermit', 'El Ermitaño', 'O Eremita', '隠者', 'Der Eremit', "L'Ermite", 'सन्यासी'),
    T(
      '물러나 스스로에게 묻는 시간. 사람들 속보다 혼자일 때 얻을 것이 많습니다.',
      'Time to step back and ask yourself — solitude has more to give here than company.',
      'Tiempo de retirarte y preguntarte: la soledad da más ahora que la compañía.',
      'Hora de recuar e se perguntar: a solidão rende mais agora que a companhia.',
      '退いて自分に問う時間。人の中にいるより、ひとりのほうが得るものが多い時期です。',
      'Zeit, sich zurückzuziehen und sich selbst zu fragen — Alleinsein bringt jetzt mehr als Gesellschaft.',
      "Un temps de retrait et de questionnement : la solitude apporte ici plus que la compagnie.",
      'पीछे हटकर ख़ुद से पूछने का समय — अभी भीड़ से ज़्यादा एकांत देता है।',
    ),
    T(
      '고립이 쓸모를 넘어섰거나, 내미는 손을 거절하고 있습니다.',
      'The withdrawal has gone past useful, or a hand genuinely offered is being refused.',
      'El aislamiento ha pasado de útil a dañino, o rechazas una mano que se ofrece de verdad.',
      'O isolamento passou do ponto útil, ou você recusa uma mão sinceramente estendida.',
      '孤立が役に立つ範囲を越えたか、差し出された手を断っています。',
      'Der Rückzug ist über das Nützliche hinaus — oder eine ehrlich gereichte Hand wird ausgeschlagen.',
      "Le retrait a dépassé son utilité, ou vous refusez une main sincèrement tendue.",
      'एकांत उपयोगी सीमा से आगे बढ़ गया है, या सच्ची मदद ठुकराई जा रही है।',
    ),
  ),

  'wheel-of-fortune': M(
    T('운명의 수레바퀴', 'Wheel of Fortune', 'La Rueda de la Fortuna', 'A Roda da Fortuna', '運命の輪', 'Das Rad des Schicksals', 'La Roue de Fortune', 'भाग्य चक्र'),
    T(
      '흐름이 바뀝니다. 거스르기보다 올라타는 편이 이롭습니다.',
      'The current is turning — better to ride it than to fight it.',
      'La corriente cambia: conviene más subirse a ella que remar en contra.',
      'A corrente está virando: é melhor pegar carona nela do que remar contra.',
      '流れが変わります。逆らうより乗るほうが得です。',
      'Die Strömung dreht — besser mitfahren als dagegenhalten.',
      "Le courant tourne : mieux vaut s'y laisser porter que le combattre.",
      'धारा बदल रही है — उससे भिड़ने से बेहतर है उस पर सवार हो जाना।',
    ),
    T(
      '변화에 버티느라 같은 자리를 돕니다. 되풀이되는 것이 무엇인지 보세요.',
      'Resisting the change keeps you circling the same spot — look at what keeps coming back.',
      'Resistirte al cambio te mantiene dando vueltas al mismo punto: mira qué se repite.',
      'Resistir à mudança mantém você girando no mesmo ponto: veja o que sempre volta.',
      '変化に抵抗して同じ場所を回っています。繰り返し戻ってくるものを見てください。',
      'Der Widerstand gegen den Wandel lässt Sie im Kreis laufen — sehen Sie, was immer wiederkommt.',
      "Résister au changement vous fait tourner en rond : regardez ce qui revient sans cesse.",
      'बदलाव से लड़ते हुए आप उसी जगह चक्कर काट रहे हैं — देखिए बार-बार क्या लौटता है।',
    ),
  ),

  justice: M(
    T('정의', 'Justice', 'La Justicia', 'A Justiça', '正義', 'Die Gerechtigkeit', 'La Justice', 'न्याय'),
    T(
      '한 대로 돌아옵니다. 의도가 아니라 실제로 한 일에 따라 정리되는 때입니다.',
      'Things settle by what was actually done, not what was meant — act fairly and the outcome follows.',
      'Las cosas se saldan por lo que de verdad se hizo, no por la intención: obra con justicia y el resultado sigue.',
      'As coisas se acertam pelo que foi feito, não pela intenção: aja com justiça e o resultado segue.',
      'したとおりに返ってきます。意図ではなく実際の行いに沿って収まる時期です。',
      'Es kommt so zurück, wie gehandelt wurde — nicht wie gemeint war. Handeln Sie fair, das Ergebnis folgt.',
      "Les choses se règlent selon ce qui a été fait, non ce qui était voulu : agissez avec justice, le résultat suivra.",
      'जैसा किया, वैसा लौटता है — इरादे से नहीं, असल काम से। न्यायसंगत रहिए, नतीजा पीछे आएगा।',
    ),
    T(
      '균형이 깨졌거나 책임을 피하고 있습니다. 남을 재기 전에 자기 몫부터 보세요.',
      'Something is out of balance, or accountability is being dodged — look at your own part first.',
      'Algo está desequilibrado, o se esquiva la responsabilidad: mira primero tu parte.',
      'Algo está desequilibrado, ou a responsabilidade está sendo desviada: veja primeiro a sua parte.',
      '均衡が崩れているか、責任を避けています。人を測る前に自分の分を見てください。',
      'Etwas ist aus dem Gleichgewicht, oder Verantwortung wird umgangen — sehen Sie zuerst auf den eigenen Anteil.',
      "Quelque chose est déséquilibré, ou la responsabilité est esquivée : regardez d'abord votre part.",
      'संतुलन बिगड़ा है या ज़िम्मेदारी टाली जा रही है — दूसरों को तौलने से पहले अपना हिस्सा देखिए।',
    ),
  ),

  'the-hanged-man': M(
    T('매달린 사람', 'The Hanged Man', 'El Colgado', 'O Enforcado', '吊るされた男', 'Der Gehängte', 'Le Pendu', 'लटका हुआ व्यक्ति'),
    T(
      '멈춤과 다른 각도. 억지로 움직이기보다 기다림이 일하게 두는 때입니다.',
      'A pause and a change of angle — let the waiting do its work instead of forcing motion.',
      'Una pausa y otro ángulo: deja que la espera trabaje en vez de forzar el movimiento.',
      'Uma pausa e outro ângulo: deixe a espera trabalhar em vez de forçar movimento.',
      '停止と視点の転換。無理に動かすより、待つことに働かせる時期です。',
      'Eine Pause und ein anderer Blickwinkel — lassen Sie das Warten arbeiten, statt Bewegung zu erzwingen.',
      "Une pause et un autre angle : laissez l'attente travailler plutôt que de forcer le mouvement.",
      'ठहराव और नज़रिए का बदलना — ज़बरन हिलने के बजाय प्रतीक्षा को काम करने दीजिए।',
    ),
    T(
      '멈춤이 회피가 되었습니다. 작더라도 무언가는 움직여야 합니다.',
      'The pause has turned into avoidance — something has to move, however small.',
      'La pausa se ha vuelto evasión: algo tiene que moverse, por pequeño que sea.',
      'A pausa virou fuga: algo precisa se mover, por menor que seja.',
      '停止が回避になっています。小さくても何かは動かす必要があります。',
      'Die Pause ist zur Vermeidung geworden — etwas muss sich bewegen, und sei es wenig.',
      "La pause est devenue de l'évitement : quelque chose doit bouger, même un peu.",
      'ठहराव अब टालमटोल बन गया है — कुछ तो हिलना ही चाहिए, चाहे छोटा हो।',
    ),
  ),

  death: M(
    T('죽음', 'Death', 'La Muerte', 'A Morte', '死神', 'Der Tod', 'La Mort', 'मृत्यु'),
    T(
      '끝나야 자리가 생깁니다. 상실이 아니라 정리를 말하는 카드입니다.',
      'An ending that makes room — this card is about clearing, not loss.',
      'Un final que deja sitio: esta carta habla de despejar, no de pérdida.',
      'Um fim que abre espaço: esta carta fala de limpar, não de perder.',
      '終わるから場所ができます。喪失ではなく片づけを告げる札です。',
      'Ein Ende, das Platz schafft — diese Karte meint Aufräumen, nicht Verlust.',
      "Une fin qui fait de la place : cette carte parle de dégager, pas de perdre.",
      'अंत जो जगह बनाता है — यह पत्ता हानि नहीं, सफ़ाई की बात करता है।',
    ),
    T(
      '이미 끝난 것을 붙들고 있습니다. 사실은 끝났는데 인정만 남았습니다.',
      'Holding on to what has already ended — it finished in fact, only the acknowledgement is missing.',
      'Te aferras a lo que ya terminó: de hecho acabó, solo falta admitirlo.',
      'Você segura o que já acabou: de fato terminou, falta apenas admitir.',
      'すでに終わったものを握っています。事実は終わり、認めることだけが残っています。',
      'Sie halten fest, was schon vorbei ist — faktisch beendet, nur nicht eingestanden.',
      "Vous vous accrochez à ce qui est déjà fini : c'est terminé en fait, il ne manque que l'aveu.",
      'जो ख़त्म हो चुका है उसे थामे हैं — असल में वह बीत गया, बस स्वीकारना बाक़ी है।',
    ),
  ),

  temperance: M(
    T('절제', 'Temperance', 'La Templanza', 'A Temperança', '節制', 'Die Mäßigkeit', 'Tempérance', 'संयम'),
    T(
      '섞고 조절합니다. 답은 한쪽 끝이 아니라 가운데에 있습니다.',
      'Blending and adjusting — the answer is in the middle, not at either end.',
      'Mezclar y ajustar: la respuesta está en el medio, no en los extremos.',
      'Misturar e ajustar: a resposta está no meio, não nos extremos.',
      '混ぜて調える。答えは端ではなく真ん中にあります。',
      'Mischen und abstimmen — die Antwort liegt in der Mitte, nicht an einem der Enden.',
      "Mélanger et ajuster : la réponse est au milieu, pas aux extrêmes.",
      'मिलाना और संतुलित करना — उत्तर किसी छोर पर नहीं, बीच में है।',
    ),
    T(
      '한쪽으로 치우쳤습니다. 더 비싸지기 전에 비율을 되돌리세요.',
      'It is tipping too far one way — restore the proportion before it costs more.',
      'Se está inclinando demasiado a un lado: recupera la proporción antes de que salga caro.',
      'Está pendendo demais para um lado: restaure a proporção antes que custe mais.',
      '一方に偏っています。代償が大きくなる前に比率を戻してください。',
      'Es kippt zu weit in eine Richtung — stellen Sie das Maß wieder her, bevor es teurer wird.',
      "Cela penche trop d'un côté : rétablissez la proportion avant que cela coûte davantage.",
      'एक ओर बहुत झुक गया है — और महँगा पड़ने से पहले अनुपात लौटाइए।',
    ),
  ),

  'the-devil': M(
    T('악마', 'The Devil', 'El Diablo', 'O Diabo', '悪魔', 'Der Teufel', 'Le Diable', 'शैतान'),
    T(
      '집착과 매임. 그림 속 사슬은 느슨하고, 이름을 붙이는 것이 이미 절반입니다.',
      'Attachment and constraint — the chain in the picture is loose, and naming it is already half the work.',
      'Apego y atadura: la cadena del dibujo está floja, y nombrarla ya es media tarea.',
      'Apego e amarra: a corrente do desenho está frouxa, e nomeá-la já é metade do trabalho.',
      '執着と束縛。絵の鎖はゆるく、名前をつけることがすでに半分です。',
      'Bindung und Fessel — die Kette im Bild sitzt locker, und sie zu benennen ist schon die halbe Arbeit.',
      "Attachement et entrave : la chaîne de l'image est lâche, et la nommer, c'est déjà la moitié du travail.",
      'आसक्ति और बंधन — चित्र की ज़ंजीर ढीली है, और उसे नाम देना ही आधा काम है।',
    ),
    T(
      '매임이 풀리는 중입니다. 알아차림이 시작되었으니 계속 가면 됩니다.',
      'The binding is loosening — the recognition has begun, so keep going.',
      'La atadura se afloja: el reconocimiento ya empezó, sigue adelante.',
      'A amarra está afrouxando: o reconhecimento já começou, siga em frente.',
      '束縛がほどけつつあります。気づきが始まったので、そのまま進んでください。',
      'Die Fessel lockert sich — das Erkennen hat begonnen, machen Sie weiter.',
      "L'entrave se desserre : la prise de conscience a commencé, continuez.",
      'बंधन ढीला पड़ रहा है — पहचान शुरू हो चुकी है, बस चलते रहिए।',
    ),
  ),

  'the-tower': M(
    T('탑', 'The Tower', 'La Torre', 'A Torre', '塔', 'Der Turm', 'La Maison Dieu', 'मीनार'),
    T(
      '갑작스러운 무너짐. 부실한 토대 위에 세운 것이 갈라지고, 남는 것이 진짜입니다.',
      'A sudden collapse — what stood on an unsound base gives way, and what survives was actually solid.',
      'Un derrumbe súbito: lo levantado sobre mala base cede, y lo que queda era lo sólido.',
      'Um desabamento súbito: o que estava sobre base ruim cede, e o que resta era o sólido.',
      '突然の崩壊。もろい土台の上のものが崩れ、残ったものが本物です。',
      'Ein plötzlicher Einsturz — was auf schwachem Grund stand, gibt nach; was bleibt, war tragfähig.',
      "Un effondrement soudain : ce qui reposait sur de mauvaises fondations cède, et ce qui tient était solide.",
      'अचानक ढहना — कमज़ोर नींव पर खड़ा गिर जाता है, और जो बचता है वही ठोस था।',
    ),
    T(
      '무너짐을 겨우 비켜 갔거나, 넘어질 것을 억지로 받치고 있습니다.',
      'A collapse narrowly sidestepped, or you are propping up what would be better let go.',
      'Un derrumbe esquivado por poco, o estás apuntalando lo que sería mejor soltar.',
      'Um desabamento evitado por pouco, ou você escora o que seria melhor soltar.',
      '崩壊をかろうじてかわしたか、倒れるべきものを支え続けています。',
      'Ein Einsturz knapp vermieden — oder Sie stützen, was besser fallen sollte.',
      "Un effondrement évité de justesse, ou vous étayez ce qu'il vaudrait mieux lâcher.",
      'ढहना बाल-बाल टला, या जिसे गिरने देना बेहतर था उसे थामे हुए हैं।',
    ),
  ),

  'the-star': M(
    T('별', 'The Star', 'La Estrella', 'A Estrela', '星', 'Der Stern', "L'Étoile", 'तारा'),
    T(
      '어려움 뒤의 희망과 회복. 조용하지만 방향은 생각보다 단단합니다.',
      'Hope and repair after hardship — quiet, but steadier than it feels.',
      'Esperanza y recuperación tras la dificultad: discreta, pero más firme de lo que parece.',
      'Esperança e recuperação depois da dificuldade: discreta, mas mais firme do que parece.',
      '困難のあとの希望と回復。静かですが、方向は思うより確かです。',
      'Hoffnung und Erholung nach der Härte — leise, doch fester, als es sich anfühlt.',
      "Espoir et réparation après l'épreuve : discrets, mais plus solides qu'il n'y paraît.",
      'कठिनाई के बाद आशा और सुधार — शांत, पर लगने से कहीं ज़्यादा टिकाऊ।',
    ),
    T(
      '희망이 옅어졌거나, 기대가 현실에서 떠 있습니다.',
      'Hope is running thin, or expectation has drifted away from what is real.',
      'La esperanza se agota, o la expectativa se ha alejado de lo real.',
      'A esperança está minguando, ou a expectativa se afastou do real.',
      '希望が薄れているか、期待が現実から浮いています。',
      'Die Hoffnung wird dünn, oder die Erwartung hat sich vom Wirklichen gelöst.',
      "L'espoir s'amenuise, ou l'attente s'est détachée du réel.",
      'आशा क्षीण हो रही है, या उम्मीद हक़ीक़त से कट गई है।',
    ),
  ),

  'the-moon': M(
    T('달', 'The Moon', 'La Luna', 'A Lua', '月', 'Der Mond', 'La Lune', 'चंद्रमा'),
    T(
      '불확실함과 상상. 보이는 것이 다가 아니니 천천히 확인하며 가세요.',
      'Uncertainty and imagination — not everything here is as it appears, so move slowly and check.',
      'Incertidumbre e imaginación: no todo es lo que parece, avanza despacio y comprueba.',
      'Incerteza e imaginação: nem tudo é o que parece, vá devagar e confira.',
      '不確かさと想像。見えるものがすべてではないので、確かめながら進んでください。',
      'Ungewissheit und Einbildung — nicht alles ist, wie es scheint; gehen Sie langsam und prüfen Sie.',
      "Incertitude et imagination : tout n'est pas ce qu'il paraît, avancez lentement en vérifiant.",
      'अनिश्चय और कल्पना — जो दिखता है वही सब नहीं, धीरे चलिए और जाँचते रहिए।',
    ),
    T(
      '안개가 걷힙니다. 불분명하던 것이 풀리고 붙어 있던 두려움도 힘을 잃습니다.',
      'The fog is lifting — what was unclear resolves, and the fear attached to it loses its grip.',
      'La niebla se levanta: lo confuso se aclara y el miedo asociado pierde fuerza.',
      'A névoa se levanta: o que era confuso se resolve e o medo ligado a ele perde força.',
      '霧が晴れます。不明だったことが解け、それに伴っていた恐れも力を失います。',
      'Der Nebel hebt sich — Unklares klärt sich, und die daran hängende Angst verliert ihren Griff.',
      "Le brouillard se lève : ce qui était flou se dénoue et la peur attachée perd prise.",
      'कोहरा छँट रहा है — जो अस्पष्ट था सुलझता है और उससे जुड़ा डर पकड़ खो देता है।',
    ),
  ),

  'the-sun': M(
    T('태양', 'The Sun', 'El Sol', 'O Sol', '太陽', 'Die Sonne', 'Le Soleil', 'सूर्य'),
    T(
      '선명함과 성공. 있는 그대로 좋은, 덱에서 가장 밝은 카드입니다.',
      'Clarity and success — plainly good, the brightest card in the deck.',
      'Claridad y éxito: buena sin matices, la carta más luminosa de la baraja.',
      'Clareza e sucesso: boa sem ressalvas, a carta mais luminosa do baralho.',
      '明るさと成功。そのままで良い、デッキでいちばん明るい札です。',
      'Klarheit und Erfolg — schlicht gut, die hellste Karte des Decks.',
      "Clarté et réussite : franchement bonne, la carte la plus lumineuse du jeu.",
      'स्पष्टता और सफलता — सीधे-सीधे शुभ, गड्डी का सबसे उजला पत्ता।',
    ),
    T(
      '좋은 것이 가려져 있습니다. 전체가 밝아지기를 기다리기보다 작고 분명한 것을 보세요.',
      'The good is obscured — look for the one small clear thing instead of waiting for the whole picture.',
      'Lo bueno está tapado: busca la pequeña cosa clara en vez de esperar el cuadro completo.',
      'O bom está encoberto: procure a pequena coisa clara em vez de esperar o quadro inteiro.',
      '良いものが覆われています。全体が明るくなるのを待つより、小さくても確かなものを見てください。',
      'Das Gute ist verdeckt — suchen Sie das eine kleine Klare, statt auf das ganze Bild zu warten.',
      "Le bon est masqué : cherchez la petite chose claire au lieu d'attendre le tableau entier.",
      'भला ढका हुआ है — पूरी तस्वीर की प्रतीक्षा के बजाय एक छोटी साफ़ चीज़ देखिए।',
    ),
  ),

  judgement: M(
    T('심판', 'Judgement', 'El Juicio', 'O Julgamento', '審判', 'Das Gericht', 'Le Jugement', 'न्याय-दिवस'),
    T(
      '결산과 부름. 지나온 것이 정리되고 새 국면이 열립니다.',
      'A reckoning and a call — what has passed gets settled, and a new phase opens.',
      'Un balance y una llamada: lo vivido se salda y se abre una etapa nueva.',
      'Um acerto de contas e um chamado: o passado se fecha e uma fase nova se abre.',
      '総括と呼び声。過ぎたことが片づき、新しい局面が開きます。',
      'Abrechnung und Ruf — Vergangenes klärt sich, ein neuer Abschnitt beginnt.',
      "Un bilan et un appel : le passé se règle et une nouvelle phase s'ouvre.",
      'हिसाब और पुकार — जो बीता वह निपटता है और नया दौर खुलता है।',
    ),
    T(
      '부름을 못 들은 척하고 있거나, 스스로를 지나치게 심판하고 있습니다.',
      'Pretending not to hear the call, or judging yourself far too harshly.',
      'Haces oídos sordos a la llamada, o te juzgas con demasiada dureza.',
      'Você finge não ouvir o chamado, ou se julga com dureza demais.',
      '呼び声に気づかないふりをしているか、自分を裁きすぎています。',
      'Sie überhören den Ruf absichtlich — oder richten viel zu hart über sich selbst.',
      "Vous faites la sourde oreille à l'appel, ou vous vous jugez bien trop durement.",
      'पुकार अनसुनी की जा रही है, या आप ख़ुद को कहीं ज़्यादा कठोरता से आँक रहे हैं।',
    ),
  ),

  'the-world': M(
    T('세계', 'The World', 'El Mundo', 'O Mundo', '世界', 'Die Welt', 'Le Monde', 'संसार'),
    T(
      '완성과 한 바퀴의 끝. 한 장을 덮고 다음 장으로 넘어가도 좋은 자리입니다.',
      'Completion and a full circle — a good place to close one chapter and open the next.',
      'Culminación y círculo completo: buen punto para cerrar un capítulo y abrir otro.',
      'Conclusão e ciclo fechado: bom ponto para encerrar um capítulo e abrir outro.',
      '完成と一周の終わり。一章を閉じて次へ進んでよい場所です。',
      'Vollendung und geschlossener Kreis — ein guter Punkt, ein Kapitel zu schließen und das nächste zu öffnen.',
      "Achèvement et boucle bouclée : un bon endroit pour clore un chapitre et en ouvrir un autre.",
      'पूर्णता और एक चक्र का अंत — एक अध्याय बंद कर अगला खोलने की सही जगह।',
    ),
    T(
      '마무리가 조금 남았습니다. 거의 다 왔는데 마지막 한 단계를 미루고 있습니다.',
      'The finish is not quite done — you are nearly there and deferring the last step.',
      'Falta el remate: estás casi, y aplazas el último paso.',
      'Falta o arremate: você está quase lá e adia o último passo.',
      '仕上げが少し残っています。ほぼ着いているのに最後の一歩を先延ばしにしています。',
      'Der Abschluss fehlt noch — fast am Ziel, doch der letzte Schritt wird aufgeschoben.',
      "La finition manque encore : vous y êtes presque et repoussez la dernière étape.",
      'समापन थोड़ा बाक़ी है — लगभग पहुँच चुके हैं, पर आख़िरी क़दम टाल रहे हैं।',
    ),
  ),
};
