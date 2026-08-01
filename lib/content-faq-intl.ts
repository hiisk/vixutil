import type { FaqItem } from './calc-faq.ts';
import type { AnyLocale10 } from './locales.ts';
import type { Test, Quiz, Checklist } from './types.ts';

/**
 * 상세 페이지의 자주 묻는 질문 — 한국어를 뺀 아홉 언어.
 *
 * 한국어는 [[lib/content-faq.ts]]에 있고 문구가 한국어에 박혀 있어 그대로는
 * 쓸 수 없다. 다만 **만드는 방식은 같다** — 손으로 207개를 쓰는 대신 실제
 * 데이터(문항 수·결과 개수·채점 방식·분류)를 읽어 문장을 만든다. 그래야
 * 페이지마다 답이 달라지고, 같은 문답이 수백 장에 깔리지 않는다.
 *
 * 사이트 공통 안내(무료·회원가입·개인정보)는 허브의 [[lib/section-faq-intl.ts]]가
 * 이미 다루므로 여기서 되풀이하지 않는다.
 */

export type ContentFaqLang = Exclude<AnyLocale10, 'ko'>;

/** 문항 수로 소요 시간을 어림한다. 한 문항당 7초, 최소 1분. 한국어와 같은 식이다. */
const minutes = (n: number) => Math.max(1, Math.round((n * 7) / 60));

/** 목록을 앞의 세 개까지만 쓴다. 답이 길면 검색 스니펫에서 잘린다. */
function summarize(names: string[], more: string, limit = 3): string {
  const head = names.slice(0, limit).join(', ');
  return names.length > limit ? `${head}${more}` : head;
}

/** "즉시 — 확산부터" 같은 소제목에서 앞머리만 남긴다. */
const shortLabel = (t: string) => t.split(/\s*[—–:]\s*/)[0];

/** 문장 끝의 마침표를 떼어 우리 마침표와 겹치지 않게 한다. */
const trimTail = (t: string) => t.replace(/[.!?。।]+$/, '');

type Tpl = {
  /** 목록이 더 있을 때 뒤에 붙일 말 ("등", "and more") */
  more: string;
  test: (v: { title: string; n: number; mins: number; results: number; types: string; mbti: boolean }) => FaqItem[];
  quiz: (v: { title: string; n: number; mins: number; opts: number; category: string; desc: string; allExplained: boolean }) => FaqItem[];
  checklist: (v: { title: string; total: number; groups: number; names: string }) => FaqItem[];
};

const T: Record<ContentFaqLang, Tpl> = {
  en: {
    more: ' and more',
    test: v => [
      { q: `How many questions is ${v.title}, and how long does it take?`, a: `${v.n} questions. Five to ten seconds each is plenty, so the whole thing takes about ${v.mins} minute${v.mins > 1 ? 's' : ''}.` },
      { q: `How many results does ${v.title} have?`, a: `${v.results} — ${v.types}.` },
      { q: `How is the result decided?`, a: v.mbti ? 'Each question scores towards one of the four axes (E/I, S/N, T/F, J/P), and the totals pick one of sixteen types.' : `Every option carries a score, and the total across ${v.n} questions falls into one band. There are no right or wrong answers.` },
      { q: `Can I take it again?`, a: 'Yes, as many times as you like. Answers and scoring stay in your browser and are never sent to a server, so nothing from last time is kept.' },
    ],
    quiz: v => [
      { q: `How many questions is ${v.title}?`, a: `${v.n} questions, ${v.opts} options each. It takes about ${v.mins} minute${v.mins > 1 ? 's' : ''}.` },
      { q: `How is the score worked out?`, a: `Correct answers out of ${v.n}, shown as a score and a percentage. You see whether you were right straight after each question.` },
      { q: `What does ${v.title} cover?`, a: `General knowledge in ${v.category} — ${trimTail(v.desc)}.` },
      v.allExplained
        ? { q: 'Can I see why an answer was wrong?', a: `Yes, all ${v.n} questions come with an explanation. Pick an option and you get the correct answer and the reason immediately.` }
        : { q: `Can I retake ${v.title}?`, a: 'Yes, as often as you like. The questions and the order stay the same, which makes it good for going back over what you missed.' },
    ],
    checklist: v => [
      { q: `How many items are in ${v.title}?`, a: `${v.total} items across ${v.groups} groups — ${v.names}.` },
      { q: 'Is what I tick saved?', a: 'Yes. Ticked items are stored in the browser you are using, so you can pick up where you left off. Nothing goes to a server, so it does not carry over to another device.' },
      { q: 'Can I start over?', a: `Yes — the reset button clears all ${v.total} items.` },
      { q: `Do I have to do everything on ${v.title}?`, a: `No. It is a reference list of the ${v.total} things people most often forget in this situation, so skip anything that does not apply to you.` },
    ],
  },
  es: {
    more: ' y más',
    test: v => [
      { q: `¿Cuántas preguntas tiene ${v.title} y cuánto se tarda?`, a: `${v.n} preguntas. Con cinco o diez segundos por pregunta sobra, así que son unos ${v.mins} minuto${v.mins > 1 ? 's' : ''} en total.` },
      { q: `¿Cuántos resultados hay en ${v.title}?`, a: `${v.results} — ${v.types}.` },
      { q: '¿Cómo se decide el resultado?', a: v.mbti ? 'Cada pregunta puntúa en uno de los cuatro ejes (E/I, S/N, T/F, J/P), y los totales determinan uno de los dieciséis tipos.' : `Cada opción tiene una puntuación y el total de las ${v.n} preguntas cae en un tramo. No hay respuestas correctas ni incorrectas.` },
      { q: '¿Puedo repetirlo?', a: 'Sí, las veces que quieras. Las respuestas y el cálculo se quedan en tu navegador y no se envían a ningún servidor, así que no queda nada de la vez anterior.' },
    ],
    quiz: v => [
      { q: `¿Cuántas preguntas tiene ${v.title}?`, a: `${v.n} preguntas con ${v.opts} opciones cada una. Se tarda unos ${v.mins} minuto${v.mins > 1 ? 's' : ''}.` },
      { q: '¿Cómo se calcula la puntuación?', a: `Aciertos sobre ${v.n}, mostrado como puntuación y porcentaje. Después de cada pregunta ves si acertaste.` },
      { q: `¿De qué va ${v.title}?`, a: `Cultura general de ${v.category} — ${trimTail(v.desc)}.` },
      v.allExplained
        ? { q: '¿Puedo ver por qué fallé?', a: `Sí, las ${v.n} preguntas llevan explicación. Al elegir una opción aparece la respuesta correcta y el motivo.` }
        : { q: `¿Puedo repetir ${v.title}?`, a: 'Sí, tantas veces como quieras. Las preguntas y su orden no cambian, así que va bien para repasar lo que fallaste.' },
    ],
    checklist: v => [
      { q: `¿Cuántos puntos tiene ${v.title}?`, a: `${v.total} puntos repartidos en ${v.groups} bloques — ${v.names}.` },
      { q: '¿Se guarda lo que marco?', a: 'Sí. Lo marcado se guarda en el navegador que estés usando, así que puedes seguir donde lo dejaste. No se envía a ningún servidor, por lo que no pasa a otro dispositivo.' },
      { q: '¿Puedo empezar de cero?', a: `Sí — el botón de reinicio desmarca los ${v.total} puntos.` },
      { q: `¿Hay que cumplir todo lo de ${v.title}?`, a: `No. Es una lista de referencia con las ${v.total} cosas que más se olvidan en esta situación; sáltate lo que no venga a tu caso.` },
    ],
  },
  'pt-br': {
    more: ' e mais',
    test: v => [
      { q: `Quantas perguntas tem ${v.title} e quanto tempo leva?`, a: `${v.n} perguntas. Cinco a dez segundos em cada já basta, então dá uns ${v.mins} minuto${v.mins > 1 ? 's' : ''} no total.` },
      { q: `Quantos resultados ${v.title} tem?`, a: `${v.results} — ${v.types}.` },
      { q: 'Como o resultado é definido?', a: v.mbti ? 'Cada pergunta pontua em um dos quatro eixos (E/I, S/N, T/F, J/P), e os totais escolhem um dos dezesseis tipos.' : `Cada alternativa tem uma pontuação, e o total das ${v.n} perguntas cai em uma faixa. Não há resposta certa ou errada.` },
      { q: 'Posso refazer?', a: 'Pode, quantas vezes quiser. As respostas e o cálculo ficam no seu navegador e não são enviados a um servidor, então nada da vez anterior é guardado.' },
    ],
    quiz: v => [
      { q: `Quantas perguntas tem ${v.title}?`, a: `${v.n} perguntas, com ${v.opts} opções cada. Leva uns ${v.mins} minuto${v.mins > 1 ? 's' : ''}.` },
      { q: 'Como a nota é calculada?', a: `Acertos em ${v.n}, mostrados como nota e porcentagem. Depois de cada pergunta você já vê se acertou.` },
      { q: `Sobre o que é ${v.title}?`, a: `Conhecimentos gerais de ${v.category} — ${trimTail(v.desc)}.` },
      v.allExplained
        ? { q: 'Consigo ver por que errei?', a: `Sim, todas as ${v.n} perguntas vêm com explicação. Ao escolher uma opção aparecem a resposta certa e o motivo.` }
        : { q: `Posso refazer ${v.title}?`, a: 'Pode, quantas vezes quiser. As perguntas e a ordem continuam as mesmas, o que ajuda a revisar o que você errou.' },
    ],
    checklist: v => [
      { q: `Quantos itens tem ${v.title}?`, a: `${v.total} itens em ${v.groups} blocos — ${v.names}.` },
      { q: 'O que eu marco fica salvo?', a: 'Fica. O que você marca é guardado no navegador que está usando, então dá para continuar de onde parou. Nada vai para um servidor, por isso não passa para outro aparelho.' },
      { q: 'Dá para começar do zero?', a: `Dá — o botão de reiniciar desmarca os ${v.total} itens.` },
      { q: `Preciso cumprir tudo de ${v.title}?`, a: `Não. É uma lista de referência com as ${v.total} coisas que mais se esquecem nessa situação; pule o que não se aplica a você.` },
    ],
  },
  ja: {
    more: 'など',
    test: v => [
      { q: `${v.title}は何問で、どれくらいかかりますか。`, a: `全${v.n}問です。1問5〜10秒もあれば十分なので、全体で${v.mins}分ほどで終わります。` },
      { q: `${v.title}の結果は何種類ありますか。`, a: `${v.results}種類です — ${v.types}。` },
      { q: '結果はどうやって決まりますか。', a: v.mbti ? '各設問が E/I・S/N・T/F・J/P の四つの軸のどれかに配点され、軸ごとの合計で16タイプのひとつが決まります。' : `選択肢ごとに点数があり、全${v.n}問の合計点が入る区間の結果になります。正解・不正解はありません。` },
      { q: 'もう一度やってもいいですか。', a: '回数の制限はありません。回答も採点もブラウザの中だけで処理され、サーバーには送られないので、前回の結果が残ることもありません。' },
    ],
    quiz: v => [
      { q: `${v.title}は何問ですか。`, a: `全${v.n}問で、1問につき${v.opts}択です。${v.mins}分ほどで終わります。` },
      { q: '点数はどう出ますか。', a: `${v.n}問中の正解数を点数と正答率で表示します。1問ごとに正誤がその場で分かります。` },
      { q: `${v.title}はどんな分野ですか。`, a: `${v.category}の常識問題です — ${trimTail(v.desc)}。` },
      v.allExplained
        ? { q: '間違えた問題の解説は見られますか。', a: `全${v.n}問に解説が付いています。選択肢を選ぶと正解と理由がその場で出ます。` }
        : { q: `${v.title}をもう一度解けますか。`, a: '回数の制限はありません。問題と選択肢の順番はそのままなので、間違えた問題の復習に向いています。' },
    ],
    checklist: v => [
      { q: `${v.title}は何項目ありますか。`, a: `${v.groups}つの区分にわたって全${v.total}項目です — ${v.names}。` },
      { q: 'チェックした内容は残りますか。', a: '使っているブラウザに保存されるので、あとから続きを進められます。サーバーには送られないため、別の端末には引き継がれません。' },
      { q: '最初からやり直せますか。', a: `はい。リセットを押すと${v.total}項目のチェックがすべて外れます。` },
      { q: `${v.title}は全部やらないといけませんか。`, a: `いいえ。この場面で見落としやすいことを${v.total}項目にまとめた参考用の一覧なので、当てはまらない項目は飛ばしてかまいません。` },
    ],
  },
  de: {
    more: ' und mehr',
    test: v => [
      { q: `Wie viele Fragen hat ${v.title} und wie lange dauert es?`, a: `${v.n} Fragen. Fünf bis zehn Sekunden pro Frage reichen, also etwa ${v.mins} Minute${v.mins > 1 ? 'n' : ''} insgesamt.` },
      { q: `Wie viele Ergebnisse hat ${v.title}?`, a: `${v.results} — ${v.types}.` },
      { q: 'Wie kommt das Ergebnis zustande?', a: v.mbti ? 'Jede Frage zahlt auf eine der vier Achsen ein (E/I, S/N, T/F, J/P); aus den Summen ergibt sich einer der sechzehn Typen.' : `Jede Antwortmöglichkeit hat einen Wert, und die Summe über ${v.n} Fragen fällt in einen Bereich. Richtig oder falsch gibt es nicht.` },
      { q: 'Kann ich den Test wiederholen?', a: 'Ja, so oft du willst. Antworten und Auswertung bleiben im Browser und gehen nie an einen Server — vom letzten Mal bleibt also nichts übrig.' },
    ],
    quiz: v => [
      { q: `Wie viele Fragen hat ${v.title}?`, a: `${v.n} Fragen mit je ${v.opts} Antworten. Es dauert etwa ${v.mins} Minute${v.mins > 1 ? 'n' : ''}.` },
      { q: 'Wie wird das Ergebnis berechnet?', a: `Richtige Antworten von ${v.n}, als Punktzahl und Prozentwert. Nach jeder Frage siehst du sofort, ob es gestimmt hat.` },
      { q: `Worum geht es bei ${v.title}?`, a: `Allgemeinwissen aus ${v.category} — ${trimTail(v.desc)}.` },
      v.allExplained
        ? { q: 'Sehe ich, warum eine Antwort falsch war?', a: `Ja, alle ${v.n} Fragen haben eine Erklärung. Nach der Auswahl erscheinen die richtige Antwort und der Grund.` }
        : { q: `Kann ich ${v.title} noch einmal machen?`, a: 'Ja, beliebig oft. Fragen und Reihenfolge bleiben gleich, das eignet sich gut zum Nacharbeiten.' },
    ],
    checklist: v => [
      { q: `Wie viele Punkte hat ${v.title}?`, a: `${v.total} Punkte in ${v.groups} Abschnitten — ${v.names}.` },
      { q: 'Wird das Abgehakte gespeichert?', a: 'Ja. Abgehaktes wird im benutzten Browser gespeichert, du kannst also später weitermachen. Es geht nichts an einen Server, deshalb wandert es nicht auf ein anderes Gerät.' },
      { q: 'Kann ich neu anfangen?', a: `Ja — der Zurücksetzen-Knopf leert alle ${v.total} Punkte.` },
      { q: `Muss ich bei ${v.title} alles erledigen?`, a: `Nein. Es ist eine Sammlung der ${v.total} Dinge, die in dieser Lage am häufigsten vergessen werden — überspring, was auf dich nicht zutrifft.` },
    ],
  },
  fr: {
    more: ' et plus',
    test: v => [
      { q: `Combien de questions compte ${v.title} et combien de temps faut-il ?`, a: `${v.n} questions. Cinq à dix secondes par question suffisent, soit environ ${v.mins} minute${v.mins > 1 ? 's' : ''} en tout.` },
      { q: `Combien de résultats possède ${v.title} ?`, a: `${v.results} — ${v.types}.` },
      { q: 'Comment le résultat est-il déterminé ?', a: v.mbti ? 'Chaque question alimente l’un des quatre axes (E/I, S/N, T/F, J/P), et les totaux désignent l’un des seize types.' : `Chaque réponse vaut un certain nombre de points, et le total sur ${v.n} questions tombe dans une tranche. Il n’y a ni bonne ni mauvaise réponse.` },
      { q: 'Puis-je le refaire ?', a: 'Oui, autant de fois que tu veux. Les réponses et le calcul restent dans ton navigateur et ne partent jamais vers un serveur : rien de la fois précédente n’est conservé.' },
    ],
    quiz: v => [
      { q: `Combien de questions compte ${v.title} ?`, a: `${v.n} questions, avec ${v.opts} choix chacune. Compte environ ${v.mins} minute${v.mins > 1 ? 's' : ''}.` },
      { q: 'Comment le score est-il calculé ?', a: `Bonnes réponses sur ${v.n}, affichées en score et en pourcentage. Après chaque question tu sais tout de suite si c’était juste.` },
      { q: `Sur quoi porte ${v.title} ?`, a: `Culture générale en ${v.category} — ${trimTail(v.desc)}.` },
      v.allExplained
        ? { q: 'Puis-je voir pourquoi je me suis trompé ?', a: `Oui, les ${v.n} questions ont une explication. Dès que tu choisis, la bonne réponse et la raison s’affichent.` }
        : { q: `Puis-je refaire ${v.title} ?`, a: 'Oui, autant de fois que tu veux. Les questions et leur ordre ne changent pas, pratique pour revoir ce que tu as raté.' },
    ],
    checklist: v => [
      { q: `Combien de points compte ${v.title} ?`, a: `${v.total} points répartis en ${v.groups} blocs — ${v.names}.` },
      { q: 'Ce que je coche est-il enregistré ?', a: 'Oui. Ce que tu coches est gardé dans le navigateur utilisé, tu peux donc reprendre plus tard. Rien ne part vers un serveur, cela ne suit donc pas sur un autre appareil.' },
      { q: 'Puis-je repartir de zéro ?', a: `Oui — le bouton de réinitialisation décoche les ${v.total} points.` },
      { q: `Faut-il tout faire dans ${v.title} ?`, a: `Non. C’est une liste de référence des ${v.total} choses le plus souvent oubliées dans cette situation : saute ce qui ne te concerne pas.` },
    ],
  },
  hi: {
    more: ' आदि',
    test: v => [
      { q: `${v.title} में कितने सवाल हैं और कितना समय लगता है?`, a: `${v.n} सवाल। हर सवाल पर पाँच-दस सेकंड काफ़ी हैं, यानी कुल मिलाकर लगभग ${v.mins} मिनट।` },
      { q: `${v.title} में कितने नतीजे हैं?`, a: `${v.results} — ${v.types}।` },
      { q: 'नतीजा कैसे तय होता है?', a: v.mbti ? 'हर सवाल चार अक्षों (E/I, S/N, T/F, J/P) में से किसी एक में अंक जोड़ता है, और कुल जोड़ से सोलह में से एक प्रकार निकलता है।' : `हर विकल्प के कुछ अंक होते हैं, और ${v.n} सवालों का कुल जोड़ जिस दायरे में आता है वही नतीजा बनता है। यहाँ सही-ग़लत जैसा कुछ नहीं है।` },
      { q: 'क्या मैं दोबारा कर सकता हूँ?', a: 'हाँ, जितनी बार चाहें। जवाब और स्कोर आपके ब्राउज़र में ही रहते हैं, सर्वर पर नहीं जाते, इसलिए पिछली बार का कुछ भी सहेजा नहीं जाता।' },
    ],
    quiz: v => [
      { q: `${v.title} में कितने सवाल हैं?`, a: `${v.n} सवाल, हर सवाल में ${v.opts} विकल्प। लगभग ${v.mins} मिनट लगते हैं।` },
      { q: 'स्कोर कैसे निकलता है?', a: `${v.n} में से सही जवाबों को अंक और प्रतिशत, दोनों में दिखाया जाता है। हर सवाल के तुरंत बाद पता चल जाता है कि सही था या नहीं।` },
      { q: `${v.title} किस बारे में है?`, a: `${v.category} का सामान्य ज्ञान — ${trimTail(v.desc)}।` },
      v.allExplained
        ? { q: 'ग़लत जवाब की वजह देख सकते हैं?', a: `हाँ, ${v.n} सवालों में से हर एक के साथ व्याख्या है। विकल्प चुनते ही सही जवाब और उसकी वजह सामने आ जाती है।` }
        : { q: `${v.title} दोबारा हल कर सकते हैं?`, a: 'हाँ, जितनी बार चाहें। सवाल और उनका क्रम वही रहता है, इसलिए ग़लत हुए सवाल दोहराने में सुविधा रहती है।' },
    ],
    checklist: v => [
      { q: `${v.title} में कितने आइटम हैं?`, a: `${v.groups} हिस्सों में कुल ${v.total} आइटम — ${v.names}।` },
      { q: 'टिक किया हुआ सेव रहता है?', a: 'हाँ। जो टिक करते हैं वह उसी ब्राउज़र में सेव रहता है, इसलिए बाद में वहीं से आगे बढ़ सकते हैं। सर्वर पर कुछ नहीं जाता, इसलिए दूसरे डिवाइस पर साथ नहीं जाता।' },
      { q: 'क्या शुरू से दोबारा कर सकते हैं?', a: `हाँ — रीसेट बटन दबाते ही ${v.total} आइटम के टिक हट जाते हैं।` },
      { q: `${v.title} में सब कुछ करना ज़रूरी है?`, a: `नहीं। यह ऐसी ${v.total} बातों की संदर्भ सूची है जो इस मौक़े पर सबसे ज़्यादा छूटती हैं — जो आप पर लागू न हो, उसे छोड़ दीजिए।` },
    ],
  },
  'zh-hans': {
    more: '等',
    test: v => [
      { q: `${v.title}有多少题，要花多久？`, a: `共${v.n}题。每题五到十秒就够，整体大约${v.mins}分钟。` },
      { q: `${v.title}有几种结果？`, a: `${v.results}种 — ${v.types}。` },
      { q: '结果是怎么定出来的？', a: v.mbti ? '每道题都会计入 E/I、S/N、T/F、J/P 四条轴中的一条，按各轴合计得出十六型中的一种。' : `每个选项都有分值，${v.n}题的总分落在哪个区间就是哪个结果。这里没有对错。` },
      { q: '可以再做一次吗？', a: '可以，次数不限。作答和计分都只在浏览器里完成，不会送到服务器，所以上一次的记录也不会留下。' },
    ],
    quiz: v => [
      { q: `${v.title}有多少题？`, a: `共${v.n}题，每题${v.opts}个选项，大约${v.mins}分钟做完。` },
      { q: '分数怎么算？', a: `按${v.n}题中答对的数量，同时给出分数和正确率。每答一题当场就知道对错。` },
      { q: `${v.title}考的是什么？`, a: `${v.category}方面的常识题 — ${trimTail(v.desc)}。` },
      v.allExplained
        ? { q: '能看到答错的原因吗？', a: `能，${v.n}题全部附解析。选完之后正确答案和理由马上出现。` }
        : { q: `${v.title}可以重做吗？`, a: '可以，次数不限。题目和选项顺序不变，适合回头复习答错的题。' },
    ],
    checklist: v => [
      { q: `${v.title}一共有多少项？`, a: `分成${v.groups}块，共${v.total}项 — ${v.names}。` },
      { q: '打的勾会保存吗？', a: '会。打过的勾保存在你当前用的浏览器里，之后可以接着往下做。不会送到服务器，所以换设备就接不上了。' },
      { q: '可以从头再来吗？', a: `可以 — 按重置就会把${v.total}项的勾全部清掉。` },
      { q: `${v.title}上的每一条都必须做到吗？`, a: `不必。这是把这种场合最容易漏掉的${v.total}件事收在一起的参考清单，用不上的直接跳过。` },
    ],
  },
  'zh-hant': {
    more: '等',
    test: v => [
      { q: `${v.title}有多少題，要花多久？`, a: `共${v.n}題。每題五到十秒就夠，整體大約${v.mins}分鐘。` },
      { q: `${v.title}有幾種結果？`, a: `${v.results}種 — ${v.types}。` },
      { q: '結果是怎麼定出來的？', a: v.mbti ? '每道題都會計入 E/I、S/N、T/F、J/P 四條軸中的一條，按各軸合計得出十六型中的一種。' : `每個選項都有分值，${v.n}題的總分落在哪個區間就是哪個結果。這裡沒有對錯。` },
      { q: '可以再做一次嗎？', a: '可以，次數不限。作答和計分都只在瀏覽器裡完成，不會送到伺服器，所以上一次的紀錄也不會留下。' },
    ],
    quiz: v => [
      { q: `${v.title}有多少題？`, a: `共${v.n}題，每題${v.opts}個選項，大約${v.mins}分鐘做完。` },
      { q: '分數怎麼算？', a: `按${v.n}題中答對的數量，同時給出分數和正確率。每答一題當場就知道對錯。` },
      { q: `${v.title}考的是什麼？`, a: `${v.category}方面的常識題 — ${trimTail(v.desc)}。` },
      v.allExplained
        ? { q: '能看到答錯的原因嗎？', a: `能，${v.n}題全部附解析。選完之後正確答案和理由馬上出現。` }
        : { q: `${v.title}可以重做嗎？`, a: '可以，次數不限。題目和選項順序不變，適合回頭複習答錯的題。' },
    ],
    checklist: v => [
      { q: `${v.title}一共有多少項？`, a: `分成${v.groups}塊，共${v.total}項 — ${v.names}。` },
      { q: '打的勾會保存嗎？', a: '會。打過的勾保存在你目前用的瀏覽器裡，之後可以接著往下做。不會送到伺服器，所以換裝置就接不上了。' },
      { q: '可以從頭再來嗎？', a: `可以 — 按重設就會把${v.total}項的勾全部清掉。` },
      { q: `${v.title}上的每一條都必須做到嗎？`, a: `不必。這是把這種場合最容易漏掉的${v.total}件事收在一起的參考清單，用不上的直接跳過。` },
    ],
  },
};

export function testFaqIntl(lang: ContentFaqLang, test: Test): FaqItem[] {
  const t = T[lang];
  const n = test.questions.length;
  return t.test({
    title: test.title, n, mins: minutes(n), results: test.results.length,
    types: summarize(test.results.map(r => shortLabel(r.title)), t.more),
    mbti: test.type === 'mbti',
  });
}

export function quizFaqIntl(lang: ContentFaqLang, quiz: Quiz): FaqItem[] {
  const t = T[lang];
  const n = quiz.questions.length;
  return t.quiz({
    title: quiz.title, n, mins: minutes(n),
    opts: quiz.questions[0]?.opts.length ?? 4,
    category: quiz.category, desc: quiz.desc,
    allExplained: quiz.questions.filter(q => q.explanation).length === n,
  });
}

export function checklistFaqIntl(lang: ContentFaqLang, c: Checklist): FaqItem[] {
  const t = T[lang];
  return t.checklist({
    title: c.title,
    total: c.sections.reduce((s, sec) => s + sec.items.length, 0),
    groups: c.sections.length,
    names: summarize(c.sections.map(s => shortLabel(s.title)), t.more),
  });
}
