/**
 * 문의 — 연락 방법과, 무엇을 어떻게 알려 주면 고칠 수 있는지.
 *
 * 이메일 주소는 여기 적지 않는다(common.ts의 LEGAL_EMAIL 하나뿐이고, 화면은
 * mail 플래그가 켜진 자리에 mailto 링크로 넣는다). 열 언어 문구에 주소를 적으면
 * 바꿀 때 열 곳을 고쳐야 하고, 한 곳이 남으면 그 언어만 죽은 주소를 안내한다.
 *
 * "틀린 값 제보에 무엇을 함께 보내면 좋은지"를 목록으로 두는 이유는, 고치는 데
 * 가장 오래 걸리는 일이 재현이기 때문이다. 주소·입력값·기대값 셋이 있으면 대개
 * 그날 확인이 끝나고, 없으면 오가는 편지가 세 통 늘어난다.
 */
import type { L } from '../i18n/lang.ts';
import type { LegalCopy } from './common.ts';

export const CONTACT: L<LegalCopy> = {
  ko: {
    title: '문의',
    description: 'vixutil에 대한 문의·제보·요청을 받는 곳입니다. 계산이 틀렸다는 제보와 값이 낡았다는 제보를 특히 반갑게 받습니다.',
    h1: '문의',
    lead: '무엇이든 이메일로 받습니다. 개인이 혼자 운영하는 사이트라 답이 늦을 수 있지만, 받은 것은 모두 읽습니다.',
    sections: [
      {
        h2: '이메일',
        body: [
          '아래 주소로 보내 주세요. 문의 양식이나 다른 창구는 따로 없습니다.',
        ],
        mail: true,
      },
      {
        h2: '무엇을 문의할 수 있나',
        body: ['다음 다섯 갈래를 받습니다. 어디에도 안 들어가는 이야기여도 상관없습니다.'],
        list: [
          '계산이 틀렸다는 제보 — 결과가 다른 곳과 다르거나 상식과 어긋날 때',
          '값이 낡았다는 제보 — 세율·요율·규격이 바뀐 뒤로 반영되지 않았을 때',
          '새 계산기나 새 자료 요청 — 지금 없는 것 가운데 필요한 것',
          '광고·제휴 문의',
          '개인정보 관련 요청 — 개인정보 처리방침에 대한 질문이나 요청',
        ],
      },
      {
        h2: '틀린 값을 알려 줄 때',
        body: [
          '고치는 데 가장 오래 걸리는 일은 재현입니다. 아래 셋만 함께 보내 주시면 대개 그날 안에 확인할 수 있습니다.',
          '근거가 없어도 괜찮습니다. "이 금액은 아무래도 이상하다"는 말만으로도 충분한 단서가 됩니다.',
        ],
        list: [
          '어느 페이지인가 — 주소를 그대로 복사해 주세요',
          '무엇을 넣었나 — 넣은 값을 그대로',
          '무엇이 나와야 하나 — 기대한 값과, 그렇게 아는 근거가 있으면 함께',
        ],
      },
      {
        h2: '답해 드릴 수 없는 것',
        body: [
          '이 사이트는 계산기와 자료를 만드는 곳이고, 상담을 하는 곳은 아닙니다. 아래 세 갈래는 답장을 드리기 어렵습니다.',
          '대신 그 주제에 쓸 만한 도구가 있으면 어느 페이지인지 알려 드리고, 그 계산이 어떤 값을 근거로 하는지도 함께 적어 드립니다.',
        ],
        list: [
          '개인의 세무·법률·의료 상담 — 전문가가 아니라서 답할 수 없습니다',
          '특정한 사람에 관한 정보 조회 — 그런 자료를 갖고 있지 않습니다',
          '광고 클릭이나 트래픽을 주고받자는 제안',
        ],
      },
      {
        h2: '답변까지 걸리는 시간',
        body: [
          '혼자 운영하는 사이트라 며칠 걸릴 수 있고, 길면 한두 주가 되는 때도 있습니다. 솔직히 적어 두는 편이 낫다고 생각해 그대로 적습니다.',
          '계산이 틀렸다는 제보는 먼저 봅니다. 틀린 답은 두고 볼 수 없는 종류의 고장이라, 확인되면 고친 뒤에 답장합니다.',
        ],
      },
    ],
  },

  en: {
    title: 'Contact',
    description: 'Where to reach vixutil with questions, corrections and requests. Reports that a calculation is wrong or that a figure has gone stale are especially welcome.',
    h1: 'Contact',
    lead: 'Everything comes in by email. The site is run by one person, so a reply can take a while — but everything that arrives gets read.',
    sections: [
      {
        h2: 'Email',
        body: [
          'Write to the address below. There is no contact form and no other channel.',
        ],
        mail: true,
      },
      {
        h2: 'What you can write about',
        body: ['These five kinds of message are the usual ones. Anything that fits none of them is fine too.'],
        list: [
          'A calculation looks wrong — the result disagrees with another source or with common sense',
          'A figure has gone stale — a rate or a standard changed and the page has not caught up',
          'A request for a new calculator or a new reference section',
          'Advertising and partnership enquiries',
          'Privacy requests — questions about the privacy policy or about your data',
        ],
      },
      {
        h2: 'When you report a wrong figure',
        body: [
          'The slow part of fixing something is reproducing it. With the three things below, a report can usually be confirmed the same day.',
          'You do not need a source. "This amount just cannot be right" is already a useful lead.',
        ],
        list: [
          'Which page — paste the address exactly as it appears',
          'What you entered — the values, as you typed them',
          'What you expected — the figure you think is right, and where you know it from if you have a source',
        ],
      },
      {
        h2: 'What we cannot help with',
        body: [
          'This site builds calculators and reference pages; it is not an advice service. The three kinds of request below cannot really be answered.',
          'What we can do instead is point you at the page that covers your topic, if one exists, and tell you which figures that calculation rests on.',
        ],
        list: [
          'Personal tax, legal or medical advice — we are not professionals and cannot answer',
          'Looking up information about a specific person — no such data is held here',
          'Offers to trade ad clicks or traffic',
        ],
      },
      {
        h2: 'How long a reply takes',
        body: [
          'One person runs this, so a few days is normal and once in a while it stretches to a week or two. It seems better to say so plainly than to promise otherwise.',
          'Reports that a calculation is wrong go to the front of the queue. A wrong answer is not the kind of fault you can leave standing, so once it is confirmed we fix it first and reply after.',
        ],
      },
    ],
  },

  es: {
    title: 'Contacto',
    description: 'Cómo escribir a vixutil con dudas, correcciones y peticiones. Los avisos de que un cálculo está mal o de que una cifra quedó desactualizada son especialmente bienvenidos.',
    h1: 'Contacto',
    lead: 'Todo llega por correo electrónico. El sitio lo lleva una sola persona, así que la respuesta puede tardar, pero todo lo que llega se lee.',
    sections: [
      {
        h2: 'Correo electrónico',
        body: [
          'Escribe a la dirección de abajo. No hay formulario de contacto ni otro canal.',
        ],
        mail: true,
      },
      {
        h2: 'Sobre qué puedes escribir',
        body: ['Estos cinco tipos de mensaje son los habituales. Si lo tuyo no encaja en ninguno, escribe igual.'],
        list: [
          'Un cálculo parece mal — el resultado no coincide con otra fuente o con el sentido común',
          'Una cifra quedó desactualizada — cambió un tipo o una norma y la página no lo refleja',
          'Petición de una calculadora nueva o de una sección de consulta nueva',
          'Consultas de publicidad y colaboraciones',
          'Solicitudes de privacidad — preguntas sobre la política de privacidad o sobre tus datos',
        ],
      },
      {
        h2: 'Si avisas de una cifra incorrecta',
        body: [
          'La parte lenta de arreglar algo es reproducirlo. Con estas tres cosas, un aviso suele poder confirmarse el mismo día.',
          'No hace falta que aportes una fuente. «Este importe no puede estar bien» ya es una pista útil.',
        ],
        list: [
          'Qué página — pega la dirección tal como aparece',
          'Qué introdujiste — los valores, tal como los escribiste',
          'Qué esperabas — la cifra que crees correcta y, si la tienes, de dónde la sabes',
        ],
      },
      {
        h2: 'Con qué no podemos ayudar',
        body: [
          'Este sitio hace calculadoras y páginas de consulta; no es un servicio de asesoramiento. Los tres tipos de petición de abajo no se pueden responder.',
          'Lo que sí podemos hacer es indicarte la página que cubre tu tema, si existe, y contarte en qué cifras se apoya ese cálculo.',
        ],
        list: [
          'Asesoramiento fiscal, legal o médico personal — no somos profesionales y no podemos responder',
          'Buscar información sobre una persona concreta — aquí no se guardan esos datos',
          'Ofertas para intercambiar clics de anuncios o tráfico',
        ],
      },
      {
        h2: 'Cuánto tarda la respuesta',
        body: [
          'Lo lleva una sola persona, así que unos días es lo normal y de vez en cuando se alarga a una o dos semanas. Parece mejor decirlo claro que prometer otra cosa.',
          'Los avisos de que un cálculo está mal pasan primero. Una respuesta equivocada no es un fallo que se pueda dejar así: en cuanto se confirma, se corrige y luego se contesta.',
        ],
      },
    ],
  },

  pt: {
    title: 'Contato',
    description: 'Como escrever para o vixutil com dúvidas, correções e pedidos. Avisos de que um cálculo está errado ou de que um valor ficou desatualizado são especialmente bem-vindos.',
    h1: 'Contato',
    lead: 'Tudo chega por e-mail. O site é mantido por uma única pessoa, então a resposta pode demorar — mas tudo o que chega é lido.',
    sections: [
      {
        h2: 'E-mail',
        body: [
          'Escreva para o endereço abaixo. Não há formulário de contato nem outro canal.',
        ],
        mail: true,
      },
      {
        h2: 'Sobre o que você pode escrever',
        body: ['Estes cinco tipos de mensagem são os mais comuns. Se o seu assunto não encaixa em nenhum, escreva do mesmo jeito.'],
        list: [
          'Um cálculo parece errado — o resultado não bate com outra fonte ou com o bom senso',
          'Um valor ficou desatualizado — mudou uma alíquota ou uma norma e a página não acompanhou',
          'Pedido de uma calculadora nova ou de uma nova seção de consulta',
          'Assuntos de publicidade e parcerias',
          'Pedidos ligados à privacidade — dúvidas sobre a política de privacidade ou sobre seus dados',
        ],
      },
      {
        h2: 'Ao avisar sobre um valor errado',
        body: [
          'A parte lenta de corrigir algo é reproduzir. Com as três coisas abaixo, um aviso geralmente pode ser confirmado no mesmo dia.',
          'Você não precisa de uma fonte. «Esse valor não pode estar certo» já é uma pista útil.',
        ],
        list: [
          'Qual página — cole o endereço exatamente como aparece',
          'O que você digitou — os valores, do jeito que foram informados',
          'O que você esperava — o valor que considera correto e, se tiver, de onde você o conhece',
        ],
      },
      {
        h2: 'Com o que não podemos ajudar',
        body: [
          'Este site faz calculadoras e páginas de consulta; não é um serviço de consultoria. Os três tipos de pedido abaixo não têm como ser respondidos.',
          'O que podemos fazer é indicar a página que trata do seu assunto, se existir, e contar em quais valores aquele cálculo se apoia.',
        ],
        list: [
          'Consultoria tributária, jurídica ou médica pessoal — não somos profissionais e não podemos responder',
          'Buscar informações sobre uma pessoa específica — não guardamos esse tipo de dado',
          'Propostas de troca de cliques em anúncios ou de tráfego',
        ],
      },
      {
        h2: 'Quanto tempo leva a resposta',
        body: [
          'É uma pessoa só, então alguns dias é o normal e de vez em quando chega a uma ou duas semanas. Parece melhor dizer isso com clareza do que prometer outra coisa.',
          'Avisos de que um cálculo está errado passam na frente. Uma resposta errada não é o tipo de falha que se pode deixar de pé: confirmada, primeiro se corrige e depois se responde.',
        ],
      },
    ],
  },

  ja: {
    title: 'お問い合わせ',
    description: 'vixutil への質問・指摘・要望の窓口です。計算が違うという知らせ、値が古いという知らせはとくにありがたく受け取ります。',
    h1: 'お問い合わせ',
    lead: 'すべてメールで受け取ります。個人が一人で運営しているため返信が遅れることがありますが、届いたものはすべて読んでいます。',
    sections: [
      {
        h2: 'メール',
        body: [
          '下のアドレスへお送りください。問い合わせフォームやほかの窓口はありません。',
        ],
        mail: true,
      },
      {
        h2: '何を送ってよいか',
        body: ['よくいただくのは次の五つです。どれにも当てはまらない話でもかまいません。'],
        list: [
          '計算が違うという指摘 — 結果がほかの資料や常識と食い違うとき',
          '値が古いという指摘 — 税率・料率・規格が変わったのに反映されていないとき',
          '新しい計算機や新しい資料の要望 — いま無いもので必要なもの',
          '広告・提携のご相談',
          '個人情報に関するご依頼 — プライバシーポリシーについての質問や要望',
        ],
      },
      {
        h2: '値が違うと知らせるとき',
        body: [
          '直すのに一番時間がかかるのは再現です。次の三つを添えていただければ、多くはその日のうちに確認できます。',
          '根拠がなくてもかまいません。「この金額はどうにもおかしい」という一言でも十分な手がかりになります。',
        ],
        list: [
          'どのページか — アドレスをそのまま貼ってください',
          '何を入れたか — 入力した値をそのまま',
          '何が出るべきか — 期待した値と、根拠があればそれも',
        ],
      },
      {
        h2: 'お答えできないこと',
        body: [
          'ここは計算機と資料を作る場所で、相談を受ける窓口ではありません。次の三つについては返信が難しいです。',
          '代わりに、その話題に使えそうな道具があればどのページかをお知らせし、その計算が何を根拠にしているかも添えてお伝えします。',
        ],
        list: [
          '個人の税務・法律・医療の相談 — 専門家ではないためお答えできません',
          '特定の人物についての情報の照会 — そのような資料は持っていません',
          '広告のクリックやアクセスを交換しようというお誘い',
        ],
      },
      {
        h2: '返信までの日数',
        body: [
          '一人で運営しているため数日かかることがあり、長いときは一、二週間になることもあります。約束するよりも正直に書いておくほうがよいと思うので、そのまま書いています。',
          '計算が違うという指摘は先に見ます。誤った答えは放っておける種類の不具合ではないので、確認できたら直したうえで返信します。',
        ],
      },
    ],
  },

  de: {
    title: 'Kontakt',
    description: 'Wohin Fragen, Korrekturen und Wünsche zu vixutil gehen. Hinweise, dass eine Rechnung falsch ist oder ein Wert veraltet, sind besonders willkommen.',
    h1: 'Kontakt',
    lead: 'Alles läuft per E-Mail. Die Seite wird von einer Person betrieben, eine Antwort kann also dauern — gelesen wird aber alles, was ankommt.',
    sections: [
      {
        h2: 'E-Mail',
        body: [
          'Schreib an die Adresse unten. Es gibt kein Kontaktformular und keinen anderen Kanal.',
        ],
        mail: true,
      },
      {
        h2: 'Worum es gehen kann',
        body: ['Diese fünf Arten von Nachricht kommen am häufigsten. Passt dein Anliegen in keine davon, schreib trotzdem.'],
        list: [
          'Eine Rechnung sieht falsch aus — das Ergebnis widerspricht einer anderen Quelle oder dem Hausverstand',
          'Ein Wert ist veraltet — ein Satz oder eine Norm hat sich geändert, die Seite noch nicht',
          'Wunsch nach einem neuen Rechner oder einem neuen Nachschlage-Bereich',
          'Anfragen zu Werbung und Kooperationen',
          'Datenschutzanfragen — Fragen zur Datenschutzerklärung oder zu deinen Daten',
        ],
      },
      {
        h2: 'Wenn du einen falschen Wert meldest',
        body: [
          'Das Langsame am Korrigieren ist das Nachstellen. Mit den drei Angaben unten lässt sich eine Meldung meist am selben Tag bestätigen.',
          'Eine Quelle brauchst du nicht. „Dieser Betrag kann einfach nicht stimmen“ ist schon ein brauchbarer Hinweis.',
        ],
        list: [
          'Welche Seite — die Adresse genau so einfügen, wie sie dasteht',
          'Was du eingegeben hast — die Werte, so wie du sie getippt hast',
          'Was herauskommen sollte — der Wert, den du für richtig hältst, und woher du ihn kennst, falls du eine Quelle hast',
        ],
      },
      {
        h2: 'Wobei wir nicht helfen können',
        body: [
          'Hier entstehen Rechner und Nachschlage-Seiten; eine Beratungsstelle ist das nicht. Die drei folgenden Anliegen lassen sich nicht beantworten.',
          'Was wir stattdessen tun können: auf die Seite hinweisen, die dein Thema abdeckt, falls es eine gibt, und dazusagen, auf welchen Werten diese Rechnung beruht.',
        ],
        list: [
          'Persönliche Steuer-, Rechts- oder medizinische Beratung — wir sind keine Fachleute und können nicht antworten',
          'Auskunft über eine bestimmte Person — solche Daten liegen hier nicht',
          'Angebote, Anzeigenklicks oder Besucher zu tauschen',
        ],
      },
      {
        h2: 'Wie lange eine Antwort dauert',
        body: [
          'Hier arbeitet eine Person, ein paar Tage sind also normal, und manchmal werden es eine oder zwei Wochen. Das offen zu schreiben scheint besser, als etwas anderes zu versprechen.',
          'Meldungen über falsche Rechnungen kommen zuerst. Eine falsche Antwort ist kein Fehler, den man stehen lassen kann: bestätigt wird sie erst behoben, dann beantwortet.',
        ],
      },
    ],
  },

  fr: {
    title: 'Contact',
    description: 'Où écrire à vixutil pour une question, une correction ou une demande. Les signalements de calcul faux ou de valeur périmée sont particulièrement bienvenus.',
    h1: 'Contact',
    lead: 'Tout passe par e-mail. Le site est tenu par une seule personne, la réponse peut donc tarder — mais tout ce qui arrive est lu.',
    sections: [
      {
        h2: 'E-mail',
        body: [
          'Écris à l’adresse ci-dessous. Il n’y a ni formulaire de contact ni autre canal.',
        ],
        mail: true,
      },
      {
        h2: 'Ce dont tu peux parler',
        body: ['Voici les cinq sortes de messages les plus fréquentes. Si ton sujet n’entre dans aucune, écris quand même.'],
        list: [
          'Un calcul semble faux — le résultat contredit une autre source ou le bon sens',
          'Une valeur est périmée — un taux ou une norme a changé et la page n’a pas suivi',
          'Une demande de nouvelle calculatrice ou de nouvelle section de référence',
          'Demandes concernant la publicité et les partenariats',
          'Demandes liées à la vie privée — questions sur la politique de confidentialité ou sur tes données',
        ],
      },
      {
        h2: 'Quand tu signales une valeur fausse',
        body: [
          'Ce qui prend du temps dans une correction, c’est de reproduire le problème. Avec les trois éléments ci-dessous, un signalement peut souvent être confirmé le jour même.',
          'Tu n’as pas besoin de source. « Ce montant ne peut pas être juste » est déjà une piste utile.',
        ],
        list: [
          'Quelle page — colle l’adresse telle quelle',
          'Ce que tu as saisi — les valeurs, exactement comme tu les as tapées',
          'Ce qui devrait sortir — la valeur que tu crois juste et, si tu en as une, sa source',
        ],
      },
      {
        h2: 'Ce que nous ne pouvons pas faire',
        body: [
          'Ce site fabrique des calculatrices et des pages de référence ; ce n’est pas un service de conseil. Les trois demandes ci-dessous ne peuvent pas être traitées.',
          'Ce que nous pouvons faire à la place : t’indiquer la page qui couvre ton sujet, s’il en existe une, et préciser sur quelles valeurs ce calcul repose.',
        ],
        list: [
          'Conseil fiscal, juridique ou médical personnel — nous ne sommes pas des professionnels et ne pouvons pas répondre',
          'Rechercher des informations sur une personne précise — aucune donnée de ce genre n’est conservée ici',
          'Propositions d’échange de clics publicitaires ou de trafic',
        ],
      },
      {
        h2: 'Le délai de réponse',
        body: [
          'Une seule personne s’en occupe : quelques jours, c’est normal, et cela s’étire parfois à une ou deux semaines. Autant l’écrire franchement que promettre autre chose.',
          'Les signalements de calcul faux passent devant. Une réponse fausse n’est pas un défaut qu’on laisse en place : une fois confirmée, on corrige d’abord et on répond ensuite.',
        ],
      },
    ],
  },

  hi: {
    title: 'संपर्क',
    description: 'vixutil से प्रश्न, सुधार और अनुरोध भेजने का पता। गणना ग़लत होने या किसी मान के पुराने पड़ जाने की सूचना विशेष रूप से आमंत्रित है।',
    h1: 'संपर्क',
    lead: 'सब कुछ ईमेल से आता है। साइट एक व्यक्ति चलाता है, इसलिए उत्तर में देर हो सकती है — पर जो आता है, वह सब पढ़ा जाता है।',
    sections: [
      {
        h2: 'ईमेल',
        body: [
          'नीचे दिए पते पर लिखें। कोई संपर्क फ़ॉर्म या दूसरा माध्यम नहीं है।',
        ],
        mail: true,
      },
      {
        h2: 'किस बारे में लिख सकते हैं',
        body: ['आमतौर पर ये पाँच तरह के संदेश आते हैं। यदि आपकी बात इनमें से किसी में न आए, तब भी लिखें।'],
        list: [
          'कोई गणना ग़लत लगती है — परिणाम किसी दूसरे स्रोत या सामान्य समझ से मेल नहीं खाता',
          'कोई मान पुराना पड़ गया है — दर या मानक बदल गया और पृष्ठ पीछे रह गया',
          'नए कैलकुलेटर या नए संदर्भ खंड का अनुरोध',
          'विज्ञापन और साझेदारी से जुड़ी बात',
          'गोपनीयता से जुड़े अनुरोध — गोपनीयता नीति या आपके डेटा के बारे में प्रश्न',
        ],
      },
      {
        h2: 'ग़लत मान की सूचना देते समय',
        body: [
          'सुधार में सबसे धीमा हिस्सा उसे दोहराकर देखना होता है। नीचे की तीन बातें साथ हों तो सूचना उसी दिन जाँची जा सकती है।',
          'स्रोत होना ज़रूरी नहीं। «यह रक़म किसी भी तरह ठीक नहीं लगती» इतना कहना भी काम का सुराग़ है।',
        ],
        list: [
          'कौन-सा पृष्ठ — पता जैसा है वैसा चिपका दें',
          'आपने क्या भरा — जो मान डाले, वैसे ही',
          'क्या आना चाहिए — जिस मान को आप सही मानते हैं, और स्रोत हो तो वह भी',
        ],
      },
      {
        h2: 'जिनमें हम मदद नहीं कर सकते',
        body: [
          'यह साइट कैलकुलेटर और संदर्भ पृष्ठ बनाती है; यह परामर्श सेवा नहीं है। नीचे दी तीन तरह की बातों का उत्तर देना संभव नहीं।',
          'इसके बदले हम इतना कर सकते हैं — आपके विषय से जुड़ा कोई पृष्ठ हो तो वह बता सकते हैं, और यह भी लिख सकते हैं कि वह गणना किन मानों पर टिकी है।',
        ],
        list: [
          'व्यक्तिगत कर, विधिक या चिकित्सीय परामर्श — हम विशेषज्ञ नहीं हैं, उत्तर नहीं दे सकते',
          'किसी विशेष व्यक्ति के बारे में जानकारी खोजना — ऐसा कोई डेटा यहाँ नहीं रखा जाता',
          'विज्ञापन क्लिक या ट्रैफ़िक की अदला-बदली के प्रस्ताव',
        ],
      },
      {
        h2: 'उत्तर में कितना समय लगता है',
        body: [
          'इसे एक व्यक्ति चलाता है, इसलिए कुछ दिन लगना सामान्य है और कभी-कभी एक-दो सप्ताह भी हो जाते हैं। कुछ और वादा करने से अच्छा है यह साफ़ लिख देना।',
          'गणना ग़लत होने की सूचना पहले देखी जाती है। ग़लत उत्तर ऐसी ख़राबी नहीं जिसे छोड़ा जा सके — पुष्टि होते ही पहले सुधारा जाता है, उत्तर उसके बाद।',
        ],
      },
    ],
  },

  zh: {
    title: '联系我们',
    description: '向 vixutil 提问、纠错、提需求的地方。特别欢迎告诉我们哪个计算错了、哪个数值过期了。',
    h1: '联系我们',
    lead: '一律用邮件联系。站点由一个人维护，回信可能会慢，但收到的每一封都会看。',
    sections: [
      {
        h2: '电子邮件',
        body: [
          '请寄到下面这个地址。没有留言表单，也没有别的窗口。',
        ],
        mail: true,
      },
      {
        h2: '可以聊些什么',
        body: ['常见的是下面五类。不属于其中任何一类也照样欢迎。'],
        list: [
          '某个计算看着不对 — 结果和别处或常识对不上',
          '某个数值过期了 — 税率、费率或规格改了，页面还没跟上',
          '想要新的计算器或新的查阅单元',
          '广告与合作洽谈',
          '与隐私有关的请求 — 对隐私政策或自己数据的疑问',
        ],
      },
      {
        h2: '告诉我们数值错了的时候',
        body: [
          '修正里最花时间的一步是把问题重现出来。带上下面三样，多数当天就能确认。',
          '没有依据也没关系。「这个金额怎么看都不对」这一句就已经是有用的线索。',
        ],
        list: [
          '哪个页面 — 把网址原样贴上来',
          '你填了什么 — 输入的数值照原样写',
          '应该出什么 — 你认为对的数值，若有出处也一并写上',
        ],
      },
      {
        h2: '我们帮不上的事',
        body: [
          '这里是做计算器和查阅页面的地方，不是咨询服务。下面三类请求实在没法回复。',
          '我们能做的是另一件事：如果站内有相关的页面，会告诉你是哪一页，并说明那个计算是以哪些数值为依据的。',
        ],
        list: [
          '个人的税务、法律、医疗咨询 — 我们不是专业人士，无法回答',
          '查询某个具体人的信息 — 本站没有这类资料',
          '交换广告点击或流量的提议',
        ],
      },
      {
        h2: '回信要多久',
        body: [
          '只有一个人打理，所以几天是常事，偶尔会拖到一两周。与其许下别的承诺，不如把实情写清楚。',
          '说计算错了的信先看。错的答案不是能放着不管的那种毛病，一旦确认就先改掉，再回信。',
        ],
      },
    ],
  },

  tw: {
    title: '聯絡我們',
    description: '向 vixutil 提問、指出錯誤、提出需求的地方。特別歡迎告訴我們哪個計算錯了、哪個數值過期了。',
    h1: '聯絡我們',
    lead: '一律用電子郵件聯絡。網站由一個人維護，回信可能會慢，但收到的每一封都會看。',
    sections: [
      {
        h2: '電子郵件',
        body: [
          '請寄到下面這個地址。沒有留言表單，也沒有別的窗口。',
        ],
        mail: true,
      },
      {
        h2: '可以聊些什麼',
        body: ['常見的是下面五類。不屬於其中任何一類也照樣歡迎。'],
        list: [
          '某個計算看著不對 — 結果和別處或常識對不上',
          '某個數值過期了 — 稅率、費率或規格改了，頁面還沒跟上',
          '想要新的計算機或新的查閱單元',
          '廣告與合作洽談',
          '與隱私有關的請求 — 對隱私權政策或自己資料的疑問',
        ],
      },
      {
        h2: '告訴我們數值錯了的時候',
        body: [
          '修正裡最花時間的一步是把問題重現出來。帶上下面三樣，多數當天就能確認。',
          '沒有依據也沒關係。「這個金額怎麼看都不對」這一句就已經是有用的線索。',
        ],
        list: [
          '哪個頁面 — 把網址原樣貼上來',
          '你填了什麼 — 輸入的數值照原樣寫',
          '應該出什麼 — 你認為對的數值，若有出處也一併寫上',
        ],
      },
      {
        h2: '我們幫不上的事',
        body: [
          '這裡是做計算機和查閱頁面的地方，不是諮詢服務。下面三類請求實在沒法回覆。',
          '我們能做的是另一件事：如果站內有相關的頁面，會告訴你是哪一頁，並說明那個計算是以哪些數值為依據的。',
        ],
        list: [
          '個人的稅務、法律、醫療諮詢 — 我們不是專業人士，無法回答',
          '查詢某個具體人的資訊 — 本站沒有這類資料',
          '交換廣告點擊或流量的提議',
        ],
      },
      {
        h2: '回信要多久',
        body: [
          '只有一個人打理，所以幾天是常事，偶爾會拖到一兩週。與其許下別的承諾，不如把實情寫清楚。',
          '說計算錯了的信先看。錯的答案不是能放著不管的那種毛病，一旦確認就先改掉，再回信。',
        ],
      },
    ],
  },
};
