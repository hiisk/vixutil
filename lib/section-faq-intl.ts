import type { FaqItem } from './calc-faq.ts';
import type { AnyLocale10 } from './locales.ts';

/**
 * 심리테스트·퀴즈·체크리스트 허브의 자주 묻는 질문 — 한국어를 뺀 아홉 언어.
 *
 * 한국어는 [[lib/section-faq.ts]]에 있다. 그 표는 열쇠가 섹션 하나뿐이라
 * (`Record<string, FaqItem[]>`) 언어를 넣을 자리가 없었고, 그래서 번역 아홉
 * 언어의 허브에는 FAQPage 구조화 데이터가 **아예 없었다**. 화면에도 안 뜨고
 * 검색 결과의 접힘 항목도 못 받는다. 한국어 표를 건드리지 않고 여기에 따로 둔다.
 *
 * 질문은 옮기되 답은 그 언어권에서 실제로 궁금해할 것에 맞춘다 — 예를 들어
 * 한국어에는 없는 "왜 이 언어에는 항목이 적은가"를 넣었다. 아홉 언어가 공유하는
 * 목록이 한국어 228종보다 훨씬 작아서, 그것이 첫 번째 의문이 되기 때문이다.
 */

type Sec = 'test' | 'quiz' | 'checklist';
export type FaqIntlLang = Exclude<AnyLocale10, 'ko'>;

export const SECTION_FAQ_INTL: Record<FaqIntlLang, Record<Sec, FaqItem[]>> = {
  en: {
    test: [
      { q: 'Are these personality tests scientifically valid?', a: 'No. They are made for fun and self-reflection, not as diagnostic instruments. If you need a clinical assessment, speak to a professional.' },
      { q: 'Are my answers stored anywhere?', a: 'No. Every answer and the scoring itself happen in your browser. Nothing is sent to a server.' },
      { q: 'Can I share my result?', a: 'Yes. The share button on the result screen copies a link you can send anywhere.' },
      { q: 'Will I get a different result if I retake it?', a: 'Not if you answer the same way. A different result means you answered at least one question differently.' },
    ],
    quiz: [
      { q: 'Are the quizzes free?', a: 'Yes. Every quiz is free and needs no account.' },
      { q: 'How is the score worked out?', a: 'Correct answers divided by total questions, as a percentage. Every question is worth the same.' },
      { q: 'Can I see the answers I got wrong?', a: 'Yes. At the end you see each question with your answer and the correct one, plus an explanation.' },
    ],
    checklist: [
      { q: 'Is my progress saved?', a: 'Ticked items are saved in your browser and are still there when you come back. Nothing goes to a server, so the list does not follow you to another device.' },
      { q: 'Can I skip items that do not apply to me?', a: 'Yes. These are general-purpose lists — skip anything that is not relevant to your situation.' },
      { q: 'How much should I rely on these lists?', a: 'They collect the things people commonly forget. For anything legal or administrative, check the official guidance for your country as well.' },
    ],
  },
  es: {
    test: [
      { q: '¿Estos tests de personalidad tienen validez científica?', a: 'No. Están hechos para entretener y para pensar sobre uno mismo, no son herramientas de diagnóstico. Si necesitas una valoración clínica, habla con un profesional.' },
      { q: '¿Se guardan mis respuestas?', a: 'No. Tanto las respuestas como el cálculo del resultado ocurren en tu navegador. No se envía nada a ningún servidor.' },
      { q: '¿Puedo compartir el resultado?', a: 'Sí. El botón de compartir de la pantalla de resultado copia un enlace que puedes enviar por donde quieras.' },
      { q: '¿Me saldrá otro resultado si lo repito?', a: 'No, si contestas igual. Si cambia el resultado es que has respondido distinto en alguna pregunta.' },
    ],
    quiz: [
      { q: '¿Los tests son gratis?', a: 'Sí. Todos son gratis y no hace falta registrarse.' },
      { q: '¿Cómo se calcula la puntuación?', a: 'Aciertos entre el total de preguntas, en porcentaje. Todas las preguntas valen lo mismo.' },
      { q: '¿Puedo ver las que he fallado?', a: 'Sí. Al terminar ves cada pregunta con tu respuesta, la correcta y una explicación.' },
    ],
    checklist: [
      { q: '¿Se guarda mi progreso?', a: 'Lo que marcas se guarda en tu navegador y sigue ahí cuando vuelves. No se envía a ningún servidor, así que no te acompaña a otro dispositivo.' },
      { q: '¿Puedo saltarme puntos que no me afecten?', a: 'Sí. Son listas generales: sáltate lo que no venga a tu caso.' },
      { q: '¿Hasta qué punto puedo fiarme de estas listas?', a: 'Recogen lo que se suele olvidar. Para cualquier trámite legal o administrativo, consulta además la información oficial de tu país.' },
    ],
  },
  'pt-br': {
    test: [
      { q: 'Esses testes de personalidade têm validade científica?', a: 'Não. Eles existem para entreter e ajudar na reflexão, não são instrumentos de diagnóstico. Se você precisa de uma avaliação clínica, procure um profissional.' },
      { q: 'Minhas respostas ficam salvas?', a: 'Não. As respostas e o cálculo do resultado acontecem no seu navegador. Nada é enviado para um servidor.' },
      { q: 'Dá para compartilhar o resultado?', a: 'Sim. O botão de compartilhar na tela de resultado copia um link que você pode mandar para onde quiser.' },
      { q: 'Se eu refizer, o resultado muda?', a: 'Não, se você responder igual. Resultado diferente quer dizer que alguma resposta mudou.' },
    ],
    quiz: [
      { q: 'Os quizzes são grátis?', a: 'São. Todos são grátis e não precisam de cadastro.' },
      { q: 'Como a nota é calculada?', a: 'Acertos divididos pelo total de perguntas, em porcentagem. Todas as perguntas valem o mesmo.' },
      { q: 'Consigo ver as que errei?', a: 'Sim. No fim você vê cada pergunta com a sua resposta, a correta e uma explicação.' },
    ],
    checklist: [
      { q: 'Meu progresso fica salvo?', a: 'O que você marca fica salvo no navegador e continua lá quando você volta. Nada vai para um servidor, então não acompanha você em outro aparelho.' },
      { q: 'Posso pular itens que não se aplicam a mim?', a: 'Pode. São listas gerais — pule o que não tem a ver com a sua situação.' },
      { q: 'O quanto dá para confiar nessas listas?', a: 'Elas reúnem o que costuma ser esquecido. Para qualquer coisa legal ou administrativa, confira também a orientação oficial do seu país.' },
    ],
  },
  ja: {
    test: [
      { q: 'この心理テストに科学的な裏づけはありますか。', a: 'ありません。楽しみと自己理解のための内容で、診断の道具ではありません。臨床的な判断が必要なときは専門家にご相談ください。' },
      { q: '回答は保存されますか。', a: 'されません。回答も採点もすべてブラウザの中で完結し、サーバーには送られません。' },
      { q: '結果を人に送れますか。', a: 'はい。結果画面の共有ボタンでリンクをコピーし、どこにでも送れます。' },
      { q: 'もう一度やると結果は変わりますか。', a: '同じように答えれば同じ結果です。変わったなら、前と違う答えを選んだ設問があります。' },
    ],
    quiz: [
      { q: 'クイズは無料ですか。', a: 'はい。すべて無料で、登録も不要です。' },
      { q: '点数はどう計算しますか。', a: '正解数を全問数で割った百分率です。配点はどの問題も同じです。' },
      { q: '間違えた問題の答えは見られますか。', a: 'はい。終わると問題ごとに自分の答えと正解、そして解説が出ます。' },
    ],
    checklist: [
      { q: 'チェックした内容は残りますか。', a: 'ブラウザに保存され、次に開いたときもそのままです。サーバーには送られないので、別の端末には引き継がれません。' },
      { q: '自分に関係ない項目は飛ばしてよいですか。', a: 'かまいません。一般的な場合を想定した一覧なので、当てはまらない項目は飛ばしてください。' },
      { q: 'どこまで信頼してよいですか。', a: '見落としやすい項目を集めた参考資料です。法律や行政の手続きについては、お住まいの国の公式案内も併せてご確認ください。' },
    ],
  },
  de: {
    test: [
      { q: 'Sind diese Persönlichkeitstests wissenschaftlich belastbar?', a: 'Nein. Sie sind zur Unterhaltung und zum Nachdenken über sich selbst gedacht, nicht als diagnostisches Instrument. Wenn du eine klinische Einschätzung brauchst, sprich mit einer Fachperson.' },
      { q: 'Werden meine Antworten gespeichert?', a: 'Nein. Antworten und Auswertung passieren im Browser. Es wird nichts an einen Server geschickt.' },
      { q: 'Kann ich mein Ergebnis teilen?', a: 'Ja. Der Teilen-Knopf auf der Ergebnisseite kopiert einen Link, den du überallhin schicken kannst.' },
      { q: 'Bekomme ich ein anderes Ergebnis, wenn ich den Test wiederhole?', a: 'Nicht, wenn du gleich antwortest. Ein anderes Ergebnis heißt, dass mindestens eine Antwort anders ausgefallen ist.' },
    ],
    quiz: [
      { q: 'Sind die Quiz kostenlos?', a: 'Ja. Alle sind kostenlos und brauchen kein Konto.' },
      { q: 'Wie wird das Ergebnis berechnet?', a: 'Richtige Antworten geteilt durch die Gesamtzahl der Fragen, als Prozentwert. Jede Frage zählt gleich viel.' },
      { q: 'Sehe ich, was ich falsch hatte?', a: 'Ja. Am Ende siehst du jede Frage mit deiner Antwort, der richtigen Antwort und einer Erklärung.' },
    ],
    checklist: [
      { q: 'Wird mein Fortschritt gespeichert?', a: 'Abgehakte Punkte werden im Browser gespeichert und sind beim nächsten Besuch noch da. Es geht nichts an einen Server, deshalb wandert die Liste nicht auf ein anderes Gerät mit.' },
      { q: 'Darf ich Punkte überspringen, die auf mich nicht zutreffen?', a: 'Ja. Das sind allgemeine Listen — überspring alles, was für deine Lage nicht passt.' },
      { q: 'Wie sehr kann ich mich auf die Listen verlassen?', a: 'Sie sammeln das, was üblicherweise vergessen wird. Bei rechtlichen oder behördlichen Schritten prüfe zusätzlich die offiziellen Hinweise deines Landes.' },
    ],
  },
  fr: {
    test: [
      { q: 'Ces tests de personnalité ont-ils une valeur scientifique ?', a: 'Non. Ils servent à se divertir et à réfléchir sur soi, ce ne sont pas des outils de diagnostic. Si tu as besoin d’une évaluation clinique, parles-en à un professionnel.' },
      { q: 'Mes réponses sont-elles enregistrées ?', a: 'Non. Les réponses et le calcul du résultat se font dans ton navigateur. Rien n’est envoyé à un serveur.' },
      { q: 'Puis-je partager mon résultat ?', a: 'Oui. Le bouton de partage sur l’écran de résultat copie un lien que tu peux envoyer où tu veux.' },
      { q: 'Le résultat change-t-il si je refais le test ?', a: 'Pas si tu réponds pareil. Un résultat différent signifie qu’au moins une réponse a changé.' },
    ],
    quiz: [
      { q: 'Les quiz sont-ils gratuits ?', a: 'Oui. Tous sont gratuits et ne demandent aucun compte.' },
      { q: 'Comment le score est-il calculé ?', a: 'Bonnes réponses divisées par le nombre total de questions, en pourcentage. Toutes les questions comptent pareil.' },
      { q: 'Puis-je voir mes erreurs ?', a: 'Oui. À la fin tu vois chaque question avec ta réponse, la bonne réponse et une explication.' },
    ],
    checklist: [
      { q: 'Ma progression est-elle enregistrée ?', a: 'Ce que tu coches est enregistré dans ton navigateur et s’y retrouve à ton retour. Rien ne part vers un serveur, donc la liste ne te suit pas sur un autre appareil.' },
      { q: 'Puis-je sauter des points qui ne me concernent pas ?', a: 'Oui. Ce sont des listes générales : saute ce qui ne correspond pas à ta situation.' },
      { q: 'Jusqu’où puis-je me fier à ces listes ?', a: 'Elles rassemblent ce qu’on oublie le plus souvent. Pour toute démarche légale ou administrative, vérifie aussi les informations officielles de ton pays.' },
    ],
  },
  hi: {
    test: [
      { q: 'क्या इन पर्सनैलिटी टेस्ट का कोई वैज्ञानिक आधार है?', a: 'नहीं। ये मनोरंजन और ख़ुद को समझने के लिए हैं, कोई निदान का साधन नहीं। नैदानिक आकलन चाहिए तो किसी विशेषज्ञ से बात करें।' },
      { q: 'क्या मेरे जवाब कहीं सेव होते हैं?', a: 'नहीं। जवाब और स्कोर, दोनों आपके ब्राउज़र में ही बनते हैं। कुछ भी सर्वर पर नहीं जाता।' },
      { q: 'क्या मैं नतीजा शेयर कर सकता हूँ?', a: 'हाँ। नतीजे वाली स्क्रीन का शेयर बटन एक लिंक कॉपी कर देता है, जिसे आप कहीं भी भेज सकते हैं।' },
      { q: 'दोबारा करने पर नतीजा बदलेगा?', a: 'अगर आपने वैसे ही जवाब दिए तो नहीं। नतीजा बदला है तो इसका मतलब किसी सवाल का जवाब पहले से अलग गया है।' },
    ],
    quiz: [
      { q: 'क्या क्विज़ मुफ़्त हैं?', a: 'हाँ। सभी मुफ़्त हैं और रजिस्ट्रेशन की ज़रूरत नहीं।' },
      { q: 'स्कोर कैसे तय होता है?', a: 'सही जवाबों को कुल सवालों से भाग देकर प्रतिशत निकाला जाता है। हर सवाल के अंक बराबर हैं।' },
      { q: 'क्या मैं ग़लत जवाब देख सकता हूँ?', a: 'हाँ। अंत में हर सवाल के साथ आपका जवाब, सही जवाब और व्याख्या दिखती है।' },
    ],
    checklist: [
      { q: 'क्या मेरी प्रगति सेव होती है?', a: 'टिक किए हुए आइटम आपके ब्राउज़र में सेव होते हैं और दोबारा आने पर भी बने रहते हैं। कुछ भी सर्वर पर नहीं जाता, इसलिए दूसरे डिवाइस पर यह साथ नहीं जाएगा।' },
      { q: 'जो बातें मुझ पर लागू नहीं होतीं, क्या उन्हें छोड़ सकता हूँ?', a: 'हाँ। ये आम हालात के लिए बनी सूचियाँ हैं — जो आपके काम की नहीं, उसे छोड़ दीजिए।' },
      { q: 'इन सूचियों पर कितना भरोसा करें?', a: 'इनमें वही बातें जुटाई गई हैं जो अक्सर छूट जाती हैं। क़ानूनी या सरकारी प्रक्रिया के लिए अपने देश की आधिकारिक जानकारी भी ज़रूर देखें।' },
    ],
  },
  'zh-hans': {
    test: [
      { q: '这些心理测试有科学依据吗？', a: '没有。它们是为了好玩和自我了解而做的内容，不是诊断工具。需要临床判断的话，请咨询专业人士。' },
      { q: '我的作答会被保存吗？', a: '不会。作答和计分都在你的浏览器里完成，不会送到服务器。' },
      { q: '结果可以分享吗？', a: '可以。结果页的分享按钮会复制一个链接，你想发到哪里都行。' },
      { q: '重做一次结果会变吗？', a: '答得一样就不会变。结果变了，说明至少有一题的答案和上次不同。' },
    ],
    quiz: [
      { q: '测验是免费的吗？', a: '是。全部免费，也不用注册账号。' },
      { q: '分数是怎么算的？', a: '答对题数除以总题数，换算成百分比。每题分值相同。' },
      { q: '能看到答错的题吗？', a: '能。做完之后每一题都会显示你的答案、正确答案和解析。' },
    ],
    checklist: [
      { q: '打勾的进度会保存吗？', a: '打过勾的项目保存在你的浏览器里，下次再来还在。不会送到服务器，所以换一台设备就接不上了。' },
      { q: '跟我无关的项目可以跳过吗？', a: '可以。这些是按一般情况列的清单，用不上的直接跳过就行。' },
      { q: '这些清单能信到什么程度？', a: '它们收的是大家最容易漏掉的事。凡是法律或行政手续，请一并查看你所在国家的官方说明。' },
    ],
  },
  'zh-hant': {
    test: [
      { q: '這些心理測驗有科學依據嗎？', a: '沒有。它們是為了好玩和自我了解而做的內容，不是診斷工具。需要臨床判斷的話，請諮詢專業人士。' },
      { q: '我的作答會被保存嗎？', a: '不會。作答和計分都在你的瀏覽器裡完成，不會送到伺服器。' },
      { q: '結果可以分享嗎？', a: '可以。結果頁的分享按鈕會複製一個連結，你想傳到哪裡都行。' },
      { q: '重做一次結果會變嗎？', a: '答得一樣就不會變。結果變了，表示至少有一題的答案和上次不同。' },
    ],
    quiz: [
      { q: '測驗是免費的嗎？', a: '是。全部免費，也不用註冊帳號。' },
      { q: '分數是怎麼算的？', a: '答對題數除以總題數，換算成百分比。每題分值相同。' },
      { q: '能看到答錯的題嗎？', a: '能。做完之後每一題都會顯示你的答案、正確答案和解析。' },
    ],
    checklist: [
      { q: '打勾的進度會保存嗎？', a: '打過勾的項目保存在你的瀏覽器裡，下次再來還在。不會送到伺服器，所以換一台裝置就接不上了。' },
      { q: '跟我無關的項目可以跳過嗎？', a: '可以。這些是按一般情況列的清單，用不上的直接跳過就行。' },
      { q: '這些清單能信到什麼程度？', a: '它們收的是大家最容易漏掉的事。凡是法律或行政手續，請一併查看你所在國家的官方說明。' },
    ],
  },
};
