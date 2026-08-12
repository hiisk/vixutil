/**
 * 소개 — 이 사이트가 무엇이고 왜 만들었는지.
 *
 * 애드센스 심사자가 읽는 장이라 구체적인 사실만 적는다. 도구 수, 언어 수,
 * 계산이 브라우저 안에서만 일어난다는 것, 값의 근거를 밝히는 편집 원칙,
 * 해마다 바뀌는 값을 어떻게 관리하는지, 그리고 개인이 운영한다는 것.
 *
 * 숫자를 적어 둔 자리는 실제 목록에서 센 값이다(계산기 146종 = CATS의 calcs,
 * 자료 100여 갈래 = lib/fold/registry.ts의 최상위 갈래 102개). 늘어나면
 * 여기도 올려야 하지만, "여러 개"처럼 뭉개 두면 소개가 아무 말도 안 하게 된다.
 */
import type { L } from '../i18n/lang.ts';
import type { LegalCopy } from './common.ts';

export const ABOUT: L<LegalCopy> = {
  ko: {
    title: '소개',
    description: '계산기 146종과 참고 자료 100여 갈래를 열 언어로 만드는 개인 사이트입니다. 계산은 브라우저 안에서만 이루어지고, 입력한 값은 서버로 전송되지 않습니다.',
    h1: 'vixutil 소개',
    lead: '일상에서 한 번씩 필요한 계산과 조회를, 설치도 회원가입도 없이 웹에서 끝내려고 만든 사이트입니다.',
    sections: [
      {
        h2: '무엇을 만드는 곳인가',
        body: [
          '숫자를 넣으면 답이 나오는 계산기 146종과, 값을 찾아보는 참고 자료 100여 갈래가 있습니다. 실수령액·대출이자·퇴직금처럼 돈을 세는 것부터, 색 이름·단위 환산·나사 규격·종이 규격처럼 표를 뒤져야 알 수 있는 것까지입니다.',
          '전부 웹 페이지 하나로 끝납니다. 앱을 내려받을 필요도, 계정을 만들 필요도 없습니다. 자주 쓰는 도구는 주소를 그대로 저장해 두면 다음에도 같은 화면이 열립니다.',
        ],
      },
      {
        h2: '입력한 값은 브라우저를 떠나지 않는다',
        body: [
          '계산은 전부 여러분의 브라우저 안에서 이루어집니다. 급여, 대출 금액, 키와 몸무게처럼 남에게 보여 주고 싶지 않은 값을 넣어도 그 값이 서버로 전송되지 않습니다.',
          '보내는 것이 없으니 저장할 것도 없습니다. 계산 기록을 모아 두는 곳이 아예 없고, 그래서 우리도 여러분이 무엇을 계산했는지 알 수 없습니다.',
        ],
      },
      {
        h2: '값의 근거를 밝힌다',
        body: [
          '세율, 보험료율, 규격표처럼 우리가 정하지 않은 값은 어디서 온 값인지 그 페이지에 적습니다. 근거 없는 숫자는 그럴듯해 보일수록 위험합니다.',
          '확인하지 못한 값은 지어내지 않고 입력으로 받습니다. 지역마다 다른 요율이라면 "여러분이 아는 값을 넣으세요"로 두는 편이, 한쪽 지역 값을 전국 값처럼 내놓는 것보다 정직합니다.',
        ],
      },
      {
        h2: '해마다 바뀌는 값은 한곳에 모아 확인한다',
        body: [
          '최저임금, 보험료율, 세율 구간처럼 해마다 고시로 바뀌는 값이 계산기 곳곳에 들어 있습니다. 그것들이 흩어져 있으면 해가 바뀌어도 무엇을 확인해야 하는지 아무도 모르고, 낡은 값은 그럴듯한 금액을 계속 내놓습니다.',
          '그래서 어느 계산에 어떤 값이 무슨 근거로 들어 있는지를 한 곳에 목록으로 모아 두었습니다. 해가 바뀌면 그 목록을 위에서 아래로 훑으며 고시를 다시 확인하고, 바뀐 것을 고칩니다.',
        ],
      },
      {
        h2: '열 언어로 만든다',
        body: [
          '한국어·영어·스페인어·포르투갈어·일본어·독일어·프랑스어·힌디어·중국어 간체·중국어 번체 열 언어로 냅니다.',
          '기계 번역을 그대로 붙이지 않고 언어마다 문구를 따로 적습니다. 중국어는 간체와 번체가 글자만 다른 것이 아니라 쓰는 낱말이 달라서 두 벌을 따로 씁니다.',
        ],
      },
      {
        h2: '누가 만드나',
        body: [
          '개인이 혼자 만들고 운영합니다. 회사도 팀도 아닙니다.',
          '유지 비용은 광고로 충당합니다. 광고는 본문을 가리지 않는 자리에만 두고, 계산 결과를 보려면 광고를 눌러야 하는 식으로는 만들지 않습니다.',
          '고칠 곳이나 새로 필요한 도구가 있으면 문의 페이지로 알려 주세요. 제보를 받아 고친 곳이 여러 군데 있습니다.',
        ],
      },
    ],
  },

  en: {
    title: 'About',
    description: 'A one-person site offering 146 calculators and over 100 reference sections in ten languages. Every calculation runs inside your browser, and the values you type are never sent to a server.',
    h1: 'About vixutil',
    lead: 'A site built so that the small calculations and lookups everyday life throws at you can be finished on the web, with nothing to install and no account to create.',
    sections: [
      {
        h2: 'What this site is',
        body: [
          'There are 146 calculators that turn numbers into an answer, and more than 100 reference sections for looking values up. They range from money — take-home pay, loan interest, severance — to the things you normally have to hunt through a table for: colour names, unit conversions, screw sizes, paper formats.',
          'Everything happens on a single web page. There is no app to download and no account to create. If you use one tool often, bookmark its address and the same screen opens next time.',
        ],
      },
      {
        h2: 'What you type never leaves your browser',
        body: [
          'Every calculation runs inside your own browser. You can enter a salary, a loan amount, your height and weight — the kind of numbers you would not want to show anyone — and none of it is sent to a server.',
          'Because nothing is sent, there is nothing to store. No history of calculations is kept anywhere, which means we cannot know what you calculated either.',
        ],
      },
      {
        h2: 'Where the numbers come from',
        body: [
          'When a value is not ours to decide — a tax rate, a contribution rate, a standards table — the page says where it came from. A number without a source is most dangerous exactly when it looks most convincing.',
          'Anything we could not verify is asked for as an input rather than invented. If a rate differs by region, "enter the figure you know" is more honest than presenting one region\'s number as if it applied everywhere.',
        ],
      },
      {
        h2: 'Figures that change yearly are kept in one place',
        body: [
          'Minimum wage, insurance contribution rates, tax brackets — figures that are re-announced every year sit inside dozens of calculators. Scattered, nobody knows what to check when the year turns, and a stale figure keeps producing a plausible-looking amount.',
          'So there is a single list recording which calculation holds which figure and on what authority. When the year turns we read that list from top to bottom, check each figure against its source again, and fix whatever moved.',
        ],
      },
      {
        h2: 'Ten languages',
        body: [
          'The site is published in Korean, English, Spanish, Portuguese, Japanese, German, French, Hindi, Simplified Chinese and Traditional Chinese.',
          'Machine translation is not pasted in as-is; the wording is written separately for each language. Simplified and Traditional Chinese are kept as two separate sets, because they differ in word choice and not only in glyphs.',
        ],
      },
      {
        h2: 'Who makes it',
        body: [
          'One person builds and runs it. This is not a company or a team.',
          'Running costs are covered by advertising. Ads are placed where they do not cover the content, and nothing is ever built so that you must click an ad to see a result.',
          'If something is wrong, or a tool you need is missing, tell us through the contact page. Several things here were fixed because a reader wrote in.',
        ],
      },
    ],
  },

  es: {
    title: 'Acerca de',
    description: 'Un sitio hecho por una sola persona con 146 calculadoras y más de 100 secciones de consulta en diez idiomas. Los cálculos se hacen dentro de tu navegador y los valores que escribes nunca se envían a un servidor.',
    h1: 'Acerca de vixutil',
    lead: 'Un sitio pensado para que los cálculos y las consultas pequeñas del día a día se resuelvan en la web, sin instalar nada y sin crear una cuenta.',
    sections: [
      {
        h2: 'Qué es este sitio',
        body: [
          'Hay 146 calculadoras que convierten números en una respuesta y más de 100 secciones de consulta para buscar valores. Van desde el dinero — sueldo neto, intereses de un préstamo, indemnización — hasta lo que normalmente hay que buscar en una tabla: nombres de colores, conversiones de unidades, medidas de tornillos, formatos de papel.',
          'Todo ocurre en una sola página web. No hay aplicación que descargar ni cuenta que crear. Si usas una herramienta a menudo, guarda su dirección y volverás a la misma pantalla.',
        ],
      },
      {
        h2: 'Lo que escribes no sale de tu navegador',
        body: [
          'Todos los cálculos se ejecutan dentro de tu propio navegador. Puedes introducir un sueldo, el importe de un préstamo, tu altura y tu peso — números que no querrías mostrar a nadie — y nada de eso se envía a un servidor.',
          'Como no se envía nada, no hay nada que guardar. No existe ningún historial de cálculos en ninguna parte, así que tampoco nosotros podemos saber qué calculaste.',
        ],
      },
      {
        h2: 'De dónde salen las cifras',
        body: [
          'Cuando un valor no lo decidimos nosotros — un tipo impositivo, una cotización, una tabla de normas — la página indica de dónde viene. Una cifra sin origen es más peligrosa justo cuando parece más convincente.',
          'Lo que no hemos podido verificar se pide como dato de entrada en lugar de inventarlo. Si una tasa cambia según la región, «escribe la cifra que conoces» es más honesto que presentar el valor de una región como si valiera para todas.',
        ],
      },
      {
        h2: 'Las cifras que cambian cada año están en un solo lugar',
        body: [
          'El salario mínimo, los tipos de cotización, los tramos del impuesto: cifras que se publican de nuevo cada año y que viven dentro de decenas de calculadoras. Dispersas, nadie sabe qué revisar cuando cambia el año, y una cifra caducada sigue dando un importe con buena apariencia.',
          'Por eso hay una única lista que anota qué cálculo contiene qué cifra y con qué fundamento. Al cambiar el año leemos esa lista de arriba abajo, comprobamos cada cifra contra su fuente y corregimos lo que se haya movido.',
        ],
      },
      {
        h2: 'Diez idiomas',
        body: [
          'El sitio se publica en coreano, inglés, español, portugués, japonés, alemán, francés, hindi, chino simplificado y chino tradicional.',
          'No pegamos traducción automática tal cual: los textos se escriben por separado en cada idioma. El chino simplificado y el tradicional se mantienen como dos versiones distintas, porque no se diferencian solo en los caracteres sino también en el vocabulario.',
        ],
      },
      {
        h2: 'Quién lo hace',
        body: [
          'Una sola persona lo construye y lo mantiene. No es una empresa ni un equipo.',
          'Los gastos se cubren con publicidad. Los anuncios se colocan donde no tapan el contenido, y nunca hacemos que haya que pulsar un anuncio para ver un resultado.',
          'Si algo está mal o falta una herramienta que necesitas, escríbenos desde la página de contacto. Varias cosas de aquí se corrigieron porque alguien avisó.',
        ],
      },
    ],
  },

  pt: {
    title: 'Sobre',
    description: 'Um site feito por uma única pessoa, com 146 calculadoras e mais de 100 seções de consulta em dez idiomas. Os cálculos acontecem dentro do seu navegador e os valores digitados nunca são enviados a um servidor.',
    h1: 'Sobre o vixutil',
    lead: 'Um site criado para que as contas e consultas pequenas do dia a dia sejam resolvidas na web, sem instalar nada e sem criar conta.',
    sections: [
      {
        h2: 'O que é este site',
        body: [
          'São 146 calculadoras que transformam números em resposta e mais de 100 seções de consulta para procurar valores. Vão de dinheiro — salário líquido, juros de empréstimo, rescisão — até aquilo que normalmente exige procurar numa tabela: nomes de cores, conversão de unidades, medidas de parafusos, formatos de papel.',
          'Tudo acontece numa única página. Não há aplicativo para baixar nem conta para criar. Se você usa uma ferramenta com frequência, salve o endereço e a mesma tela abre na próxima vez.',
        ],
      },
      {
        h2: 'O que você digita não sai do seu navegador',
        body: [
          'Todos os cálculos rodam dentro do seu próprio navegador. Você pode informar um salário, o valor de um empréstimo, sua altura e seu peso — números que ninguém quer mostrar — e nada disso é enviado a um servidor.',
          'Como nada é enviado, não há nada para guardar. Não existe histórico de cálculos em lugar algum, e por isso nem nós sabemos o que você calculou.',
        ],
      },
      {
        h2: 'De onde vêm os números',
        body: [
          'Quando um valor não é decidido por nós — uma alíquota, uma taxa de contribuição, uma tabela de normas — a página informa de onde ele veio. Um número sem fonte é mais perigoso justamente quando parece mais convincente.',
          'O que não conseguimos confirmar é pedido como entrada em vez de inventado. Se uma taxa muda por região, «informe o valor que você conhece» é mais honesto do que apresentar o número de uma região como se valesse para todas.',
        ],
      },
      {
        h2: 'Os valores que mudam a cada ano ficam num só lugar',
        body: [
          'Salário mínimo, alíquotas de contribuição, faixas de imposto: valores reanunciados todo ano que vivem dentro de dezenas de calculadoras. Espalhados, ninguém sabe o que conferir quando o ano vira, e um valor velho continua devolvendo uma quantia de aparência correta.',
          'Por isso existe uma lista única que registra qual cálculo guarda qual valor e com que fundamento. Quando o ano vira, lemos essa lista de cima a baixo, conferimos cada valor na fonte e corrigimos o que mudou.',
        ],
      },
      {
        h2: 'Dez idiomas',
        body: [
          'O site é publicado em coreano, inglês, espanhol, português, japonês, alemão, francês, híndi, chinês simplificado e chinês tradicional.',
          'Tradução automática não é colada como está: os textos são escritos separadamente em cada idioma. O chinês simplificado e o tradicional são mantidos como duas versões, porque a diferença não está só nos caracteres, mas também nas palavras.',
        ],
      },
      {
        h2: 'Quem faz',
        body: [
          'Uma pessoa constrói e mantém tudo. Não é uma empresa nem uma equipe.',
          'Os custos são cobertos por publicidade. Os anúncios ficam onde não cobrem o conteúdo, e nada é feito de modo que você precise clicar num anúncio para ver um resultado.',
          'Se algo estiver errado, ou faltar uma ferramenta de que você precisa, escreva pela página de contato. Várias coisas aqui foram corrigidas porque alguém avisou.',
        ],
      },
    ],
  },

  ja: {
    title: 'サイト紹介',
    description: '146種類の計算機と100を超える資料セクションを十言語で公開している個人サイトです。計算はすべてブラウザの中で行われ、入力した値がサーバへ送られることはありません。',
    h1: 'vixutil について',
    lead: '暮らしのなかでときどき必要になる計算と調べものを、インストールも会員登録もなしにウェブだけで済ませるために作ったサイトです。',
    sections: [
      {
        h2: 'ここで作っているもの',
        body: [
          '数字を入れれば答えが出る計算機が146種類、値を調べるための資料セクションが100あまりあります。手取り額・ローン利息・退職金のようにお金を数えるものから、色名・単位換算・ねじの規格・紙のサイズのように表を探さないと分からないものまでです。',
          'すべてが一枚のウェブページで終わります。アプリを落とす必要も、アカウントを作る必要もありません。よく使う道具はアドレスを保存しておけば、次も同じ画面が開きます。',
        ],
      },
      {
        h2: '入力した値はブラウザから出ない',
        body: [
          '計算はすべて利用者自身のブラウザの中で行われます。給与、借入額、身長と体重のように人に見せたくない値を入れても、その値がサーバへ送られることはありません。',
          '送るものがないので保存するものもありません。計算の履歴を集めておく場所がそもそも無く、こちらも何を計算したのか知る手立てがありません。',
        ],
      },
      {
        h2: '数字の根拠を書く',
        body: [
          '税率、保険料率、規格表のようにこちらが決めていない値は、どこから来た値なのかをそのページに書きます。根拠のない数字は、もっともらしく見えるときほど危ういものです。',
          '確かめられなかった値は作らずに入力として受け取ります。地域ごとに違う料率なら「ご存じの値を入れてください」と置くほうが、ある地域の値を全国の値のように出すより誠実です。',
        ],
      },
      {
        h2: '毎年変わる値は一か所にまとめて確かめる',
        body: [
          '最低賃金、保険料率、税率の区分のように毎年告示で変わる値が、いくつもの計算機の中に入っています。散らばっていると年が明けても何を確かめるべきか誰も分からず、古い値はもっともらしい金額を出し続けます。',
          'そこで、どの計算にどの値が何を根拠に入っているかを一か所の一覧にまとめてあります。年が明けたらその一覧を上から下までたどり、告示を突き合わせて変わったものを直します。',
        ],
      },
      {
        h2: '十の言語で作る',
        body: [
          '韓国語・英語・スペイン語・ポルトガル語・日本語・ドイツ語・フランス語・ヒンディー語・中国語簡体字・中国語繁体字の十言語で出しています。',
          '機械翻訳をそのまま貼ることはせず、言語ごとに文章を書き分けます。中国語は簡体字と繁体字で文字だけでなく使う語も違うため、二組を別に書いています。',
        ],
      },
      {
        h2: '誰が作っているか',
        body: [
          '個人が一人で作り、運営しています。会社でもチームでもありません。',
          '維持にかかる費用は広告でまかなっています。広告は本文を覆わない位置にだけ置き、結果を見るために広告を押さなければならない作りにはしません。',
          '直すべきところや、あったほうがよい道具があればお問い合わせページから知らせてください。知らせを受けて直した箇所がいくつもあります。',
        ],
      },
    ],
  },

  de: {
    title: 'Über uns',
    description: 'Eine von einer einzelnen Person betriebene Seite mit 146 Rechnern und über 100 Nachschlage-Bereichen in zehn Sprachen. Gerechnet wird ausschließlich im Browser; eingegebene Werte werden nicht an einen Server gesendet.',
    h1: 'Über vixutil',
    lead: 'Eine Seite, damit die kleinen Rechnungen und Nachfragen des Alltags im Web erledigt sind — ohne Installation und ohne Konto.',
    sections: [
      {
        h2: 'Was hier entsteht',
        body: [
          'Es gibt 146 Rechner, die aus Zahlen eine Antwort machen, und über 100 Nachschlage-Bereiche zum Suchen von Werten. Das reicht von Geld — Nettolohn, Kreditzinsen, Abfindung — bis zu dem, was man normalerweise in einer Tabelle suchen muss: Farbnamen, Einheitenumrechnung, Schraubenmaße, Papierformate.',
          'Alles passiert auf einer einzigen Webseite. Es gibt keine App zum Herunterladen und kein Konto zum Anlegen. Wer ein Werkzeug oft braucht, speichert einfach die Adresse und landet beim nächsten Mal auf demselben Bildschirm.',
        ],
      },
      {
        h2: 'Eingaben verlassen den Browser nicht',
        body: [
          'Jede Rechnung läuft im eigenen Browser. Gehalt, Kreditsumme, Größe und Gewicht — genau die Zahlen, die man niemandem zeigen möchte — werden nicht an einen Server gesendet.',
          'Weil nichts gesendet wird, gibt es auch nichts zu speichern. Es existiert nirgends ein Verlauf der Rechnungen, und deshalb wissen auch wir nicht, was gerechnet wurde.',
        ],
      },
      {
        h2: 'Woher die Zahlen kommen',
        body: [
          'Wo ein Wert nicht von uns stammt — ein Steuersatz, ein Beitragssatz, eine Normtabelle —, steht auf der Seite, woher er kommt. Eine Zahl ohne Quelle ist gerade dann gefährlich, wenn sie besonders überzeugend aussieht.',
          'Was wir nicht prüfen konnten, wird als Eingabe erfragt statt erfunden. Unterscheidet sich ein Satz je Region, ist „trage den Wert ein, den du kennst“ ehrlicher, als den Wert einer Region wie einen landesweiten auszugeben.',
        ],
      },
      {
        h2: 'Jährlich wechselnde Werte stehen an einer Stelle',
        body: [
          'Mindestlohn, Beitragssätze, Steuerstufen — Werte, die jedes Jahr neu festgesetzt werden, stecken in Dutzenden Rechnern. Verstreut weiß beim Jahreswechsel niemand, was zu prüfen ist, und ein veralteter Wert liefert weiter einen plausibel aussehenden Betrag.',
          'Deshalb gibt es eine einzige Liste, die festhält, welche Rechnung welchen Wert auf welcher Grundlage enthält. Beim Jahreswechsel gehen wir diese Liste von oben nach unten durch, prüfen jeden Wert erneut an seiner Quelle und korrigieren, was sich geändert hat.',
        ],
      },
      {
        h2: 'Zehn Sprachen',
        body: [
          'Die Seite erscheint auf Koreanisch, Englisch, Spanisch, Portugiesisch, Japanisch, Deutsch, Französisch, Hindi, Chinesisch (vereinfacht) und Chinesisch (traditionell).',
          'Maschinelle Übersetzung wird nicht einfach eingefügt; die Texte werden je Sprache eigens geschrieben. Vereinfachtes und traditionelles Chinesisch bleiben zwei getrennte Fassungen, denn sie unterscheiden sich nicht nur in den Zeichen, sondern auch in der Wortwahl.',
        ],
      },
      {
        h2: 'Wer dahintersteht',
        body: [
          'Eine einzelne Person baut und betreibt die Seite. Es ist keine Firma und kein Team.',
          'Die laufenden Kosten trägt Werbung. Anzeigen stehen dort, wo sie den Inhalt nicht verdecken, und nichts ist so gebaut, dass man eine Anzeige anklicken müsste, um ein Ergebnis zu sehen.',
          'Wenn etwas falsch ist oder ein Werkzeug fehlt, das du brauchst, schreib über die Kontaktseite. Mehrere Dinge hier wurden korrigiert, weil jemand Bescheid gegeben hat.',
        ],
      },
    ],
  },

  fr: {
    title: 'À propos',
    description: 'Un site tenu par une seule personne, avec 146 calculatrices et plus de 100 sections de référence en dix langues. Les calculs se font dans le navigateur et les valeurs saisies ne sont jamais envoyées à un serveur.',
    h1: 'À propos de vixutil',
    lead: 'Un site fait pour que les petits calculs et les vérifications du quotidien se règlent sur le web, sans rien installer et sans créer de compte.',
    sections: [
      {
        h2: 'Ce qu’on fabrique ici',
        body: [
          'Il y a 146 calculatrices qui transforment des chiffres en réponse, et plus de 100 sections de référence pour chercher une valeur. Cela va de l’argent — salaire net, intérêts d’un prêt, indemnité — à ce qu’il faut d’ordinaire chercher dans un tableau : noms de couleurs, conversions d’unités, tailles de vis, formats de papier.',
          'Tout se passe sur une seule page web. Aucune application à télécharger, aucun compte à créer. Pour un outil utilisé souvent, il suffit d’enregistrer son adresse : le même écran s’ouvre la fois suivante.',
        ],
      },
      {
        h2: 'Ce que tu saisis ne quitte pas ton navigateur',
        body: [
          'Chaque calcul se fait dans ton propre navigateur. Salaire, montant d’un prêt, taille et poids — précisément les chiffres qu’on ne veut montrer à personne — rien de tout cela n’est envoyé à un serveur.',
          'Comme rien n’est envoyé, il n’y a rien à conserver. Aucun historique de calculs n’existe nulle part, et nous ne pouvons donc pas savoir ce qui a été calculé.',
        ],
      },
      {
        h2: 'D’où viennent les chiffres',
        body: [
          'Quand une valeur ne vient pas de nous — un taux d’imposition, un taux de cotisation, un tableau de normes — la page indique son origine. Un chiffre sans source est d’autant plus dangereux qu’il a l’air convaincant.',
          'Ce que nous n’avons pas pu vérifier est demandé en saisie plutôt qu’inventé. Si un taux varie selon la région, « entre la valeur que tu connais » est plus honnête que de présenter la valeur d’une région comme valable partout.',
        ],
      },
      {
        h2: 'Les valeurs qui changent chaque année tiennent en un seul endroit',
        body: [
          'Salaire minimum, taux de cotisation, tranches d’imposition : des valeurs republiées chaque année et logées dans des dizaines de calculatrices. Dispersées, personne ne sait quoi vérifier au changement d’année, et une valeur périmée continue de sortir un montant d’apparence correcte.',
          'Il existe donc une liste unique qui note quel calcul contient quelle valeur et sur quel fondement. Au changement d’année, on parcourt cette liste de haut en bas, on recontrôle chaque valeur à sa source et on corrige ce qui a bougé.',
        ],
      },
      {
        h2: 'Dix langues',
        body: [
          'Le site est publié en coréen, anglais, espagnol, portugais, japonais, allemand, français, hindi, chinois simplifié et chinois traditionnel.',
          'La traduction automatique n’est pas collée telle quelle : les textes sont écrits séparément pour chaque langue. Le chinois simplifié et le traditionnel restent deux versions distinctes, car ils diffèrent aussi par le vocabulaire, pas seulement par les caractères.',
        ],
      },
      {
        h2: 'Qui est derrière',
        body: [
          'Une seule personne construit et fait tourner le site. Ce n’est ni une société ni une équipe.',
          'Les frais sont couverts par la publicité. Les annonces sont placées là où elles ne recouvrent pas le contenu, et rien n’est conçu pour qu’il faille cliquer sur une annonce afin de voir un résultat.',
          'Si quelque chose est faux, ou s’il manque un outil dont tu as besoin, écris via la page de contact. Plusieurs choses ici ont été corrigées parce qu’un lecteur a signalé le problème.',
        ],
      },
    ],
  },

  hi: {
    title: 'परिचय',
    description: 'एक व्यक्ति द्वारा चलाई जाने वाली साइट, जिसमें दस भाषाओं में 146 कैलकुलेटर और 100 से अधिक संदर्भ खंड हैं। सारी गणना आपके ब्राउज़र के भीतर होती है और आपके डाले गए मान सर्वर पर नहीं भेजे जाते।',
    h1: 'vixutil के बारे में',
    lead: 'रोज़मर्रा में कभी-कभार पड़ने वाली गणनाएँ और जानकारी खोजने का काम वेब पर ही निपट जाए — कुछ इंस्टॉल किए बिना और खाता बनाए बिना — इसी के लिए यह साइट बनी है।',
    sections: [
      {
        h2: 'यहाँ क्या बनता है',
        body: [
          'ऐसे 146 कैलकुलेटर हैं जो अंकों से उत्तर निकाल देते हैं, और मान खोजने के लिए 100 से अधिक संदर्भ खंड हैं। इनमें पैसे से जुड़ी चीज़ें भी हैं — हाथ में आने वाला वेतन, ऋण का ब्याज, ग्रेच्युटी — और वे भी जिन्हें आमतौर पर किसी तालिका में ढूँढ़ना पड़ता है: रंगों के नाम, इकाई रूपांतरण, स्क्रू के नाप, कागज़ के आकार।',
          'सब कुछ एक ही वेब पृष्ठ पर पूरा हो जाता है। कोई ऐप डाउनलोड करने की ज़रूरत नहीं, कोई खाता बनाने की भी नहीं। जो उपकरण बार-बार काम आता है, उसका पता सहेज लें — अगली बार वही स्क्रीन खुलेगी।',
        ],
      },
      {
        h2: 'जो आप लिखते हैं वह ब्राउज़र से बाहर नहीं जाता',
        body: [
          'हर गणना आपके ही ब्राउज़र के भीतर चलती है। वेतन, ऋण की राशि, अपनी लंबाई और वज़न — यानी वही अंक जो किसी को दिखाना अच्छा नहीं लगता — इनमें से कुछ भी सर्वर पर नहीं भेजा जाता।',
          'जब कुछ भेजा ही नहीं जाता तो सहेजने के लिए भी कुछ नहीं बचता। गणनाओं का कोई इतिहास कहीं नहीं रखा जाता, इसलिए हम भी नहीं जान सकते कि आपने क्या गिना।',
        ],
      },
      {
        h2: 'अंकों का आधार लिखा जाता है',
        body: [
          'जो मान हमारे तय किए हुए नहीं हैं — कर की दर, अंशदान की दर, मानकों की तालिका — उनके बारे में उसी पृष्ठ पर लिखा होता है कि वे कहाँ से आए। आधार के बिना दिया गया अंक तब सबसे ख़तरनाक होता है जब वह सबसे भरोसेमंद दिखता है।',
          'जिसकी पुष्टि नहीं हो सकी, उसे गढ़ने के बजाय इनपुट के रूप में पूछा जाता है। यदि कोई दर क्षेत्र के अनुसार बदलती है तो «आप जो मान जानते हैं वह भरें» कहना उससे अधिक ईमानदार है कि एक क्षेत्र का मान पूरे देश का बताकर दिखा दिया जाए।',
        ],
      },
      {
        h2: 'हर साल बदलने वाले मान एक ही जगह जाँचे जाते हैं',
        body: [
          'न्यूनतम मज़दूरी, अंशदान की दरें, कर के स्तर — हर साल नए सिरे से घोषित होने वाले ये मान दर्जनों कैलकुलेटरों के भीतर बैठे हैं। बिखरे रहने पर साल बदलते ही कोई नहीं जानता कि क्या जाँचना है, और पुराना मान भरोसेमंद दिखती रक़म देता रहता है।',
          'इसलिए एक ही सूची रखी गई है, जिसमें दर्ज है कि किस गणना में कौन-सा मान किस आधार पर है। साल बदलने पर उस सूची को ऊपर से नीचे पढ़ा जाता है, हर मान को उसके स्रोत से मिलाया जाता है और जो बदल गया हो उसे सुधारा जाता है।',
        ],
      },
      {
        h2: 'दस भाषाएँ',
        body: [
          'साइट कोरियाई, अंग्रेज़ी, स्पेनी, पुर्तगाली, जापानी, जर्मन, फ़्रेंच, हिन्दी, सरलीकृत चीनी और पारंपरिक चीनी — इन दस भाषाओं में प्रकाशित होती है।',
          'मशीनी अनुवाद जैसा है वैसा चिपकाया नहीं जाता; हर भाषा के लिए वाक्य अलग से लिखे जाते हैं। सरलीकृत और पारंपरिक चीनी दो अलग संस्करणों के रूप में रखी जाती हैं, क्योंकि उनमें अंतर केवल अक्षरों का नहीं, शब्द-चयन का भी है।',
        ],
      },
      {
        h2: 'बनाने वाला कौन है',
        body: [
          'एक व्यक्ति अकेले इसे बनाता और चलाता है। यह न कोई कंपनी है, न कोई टीम।',
          'चलाने का खर्च विज्ञापनों से पूरा होता है। विज्ञापन वहीं रखे जाते हैं जहाँ वे सामग्री को न ढकें, और परिणाम देखने के लिए विज्ञापन पर क्लिक करना पड़े — ऐसा कभी नहीं बनाया जाता।',
          'कुछ ग़लत हो, या आपकी ज़रूरत का कोई उपकरण न हो, तो संपर्क पृष्ठ से बताएँ। यहाँ की कई चीज़ें इसलिए सुधरीं कि किसी पाठक ने सूचना दी।',
        ],
      },
    ],
  },

  zh: {
    title: '关于本站',
    description: '这是一个人做的站点，用十种语言提供 146 个计算器和 100 多个查阅栏目。所有计算都在你的浏览器里完成，你填的数值不会发到服务器。',
    h1: '关于 vixutil',
    lead: '日常偶尔要算一下、要查一下的事情，不装应用、不注册账号，在网页里就办完——这个站点就是为此而做的。',
    sections: [
      {
        h2: '这里做的是什么',
        body: [
          '有 146 个能把数字换成答案的计算器，还有 100 多个用来查数值的栏目。从跟钱有关的实发工资、贷款利息、离职金，到平时非得翻表格才知道的颜色名称、单位换算、螺丝规格、纸张尺寸，都在里面。',
          '一切都在一张网页上完成。不用下载应用，也不用注册账号。常用的工具把地址存下来，下次打开还是同一个画面。',
        ],
      },
      {
        h2: '你填的数值不会离开浏览器',
        body: [
          '所有计算都在你自己的浏览器里跑。工资、贷款金额、身高体重这类不想让别人看到的数字，填进去也不会发到服务器。',
          '既然什么都不发出去，也就没有什么要存。任何地方都没有计算记录，所以我们同样无从知道你算了什么。',
        ],
      },
      {
        h2: '数值的依据要写清楚',
        body: [
          '税率、费率、规格表这类不是我们定的数值，页面上会写明它从哪里来。没有依据的数字，越像真的越危险。',
          '没能核实的数值不去编，而是作为输入项来问。遇到各地不同的费率，写「填你知道的数值」比把某一地的数值当成全国的更诚实。',
        ],
      },
      {
        h2: '每年变的数值集中在一处核对',
        body: [
          '最低工资、费率、税率级距这些每年重新公告的数值，散落在几十个计算器里。散着放，年一换就没人知道该核对什么，旧数值还会继续给出看起来合理的金额。',
          '所以有一份统一的清单，记着哪个计算里放了哪个数值、依据是什么。到了年头就从上到下过一遍清单，逐项回到出处核对，把变了的改掉。',
        ],
      },
      {
        h2: '十种语言',
        body: [
          '站点以韩语、英语、西班牙语、葡萄牙语、日语、德语、法语、印地语、简体中文和繁体中文十种语言发布。',
          '不把机器翻译原样贴上来，每种语言的文字都分开写。简体和繁体分成两套，因为两者的差别不只在字形，用词也不一样。',
        ],
      },
      {
        h2: '谁在做',
        body: [
          '由个人一人开发和维护，不是公司，也不是团队。',
          '维持的开销靠广告。广告只放在不挡正文的位置，也绝不做成「要看结果就得点广告」的样子。',
          '发现哪里不对，或者缺少你需要的工具，请从联系页告诉我们。这里有好几处就是因为有人来信才改好的。',
        ],
      },
    ],
  },

  tw: {
    title: '關於本站',
    description: '這是一個人做的網站，以十種語言提供 146 個計算機與 100 多個查閱單元。所有計算都在你的瀏覽器裡完成，你填的數值不會傳到伺服器。',
    h1: '關於 vixutil',
    lead: '日常偶爾要算一下、要查一下的事，不裝應用程式、不註冊帳號，在網頁裡就辦完——這個網站就是為此而做的。',
    sections: [
      {
        h2: '這裡做的是什麼',
        body: [
          '有 146 個能把數字換成答案的計算機，還有 100 多個用來查數值的單元。從跟錢有關的實領薪資、貸款利息、離職金，到平常非得翻表格才知道的顏色名稱、單位換算、螺絲規格、紙張尺寸，都在裡面。',
          '一切都在一張網頁上完成。不必下載應用程式，也不必註冊帳號。常用的工具把網址存起來，下次打開還是同一個畫面。',
        ],
      },
      {
        h2: '你填的數值不會離開瀏覽器',
        body: [
          '所有計算都在你自己的瀏覽器裡跑。薪資、貸款金額、身高體重這類不想讓別人看到的數字，填進去也不會傳到伺服器。',
          '既然什麼都不送出去，也就沒有什麼要存。任何地方都沒有計算紀錄，所以我們同樣無從得知你算了什麼。',
        ],
      },
      {
        h2: '數值的依據要寫清楚',
        body: [
          '稅率、費率、規格表這類不是我們定的數值，頁面上會寫明它從哪裡來。沒有依據的數字，越像真的越危險。',
          '沒能查證的數值不去編，而是當成輸入項來問。遇到各地不同的費率，寫「填你知道的數值」比把某一地的數值當成全國的更誠實。',
        ],
      },
      {
        h2: '每年變動的數值集中在一處核對',
        body: [
          '最低工資、費率、稅率級距這些每年重新公告的數值，散落在幾十個計算機裡。散著放，年一換就沒人知道該核對什麼，舊數值還會繼續給出看起來合理的金額。',
          '所以有一份統一的清單，記著哪個計算裡放了哪個數值、依據是什麼。到了年初就從上到下過一遍清單，逐項回到出處核對，把變動的改掉。',
        ],
      },
      {
        h2: '十種語言',
        body: [
          '網站以韓語、英語、西班牙語、葡萄牙語、日語、德語、法語、印地語、簡體中文與繁體中文十種語言發布。',
          '不把機器翻譯原樣貼上來，每種語言的文字都分開寫。簡體與繁體分成兩套，因為兩者的差別不只在字形，用詞也不一樣。',
        ],
      },
      {
        h2: '誰在做',
        body: [
          '由個人一人開發與維護，不是公司，也不是團隊。',
          '維持的開銷靠廣告。廣告只放在不擋內文的位置，也絕不做成「要看結果就得點廣告」的樣子。',
          '發現哪裡不對，或者缺少你需要的工具，請從聯絡頁告訴我們。這裡有好幾處就是因為有人來信才改好的。',
        ],
      },
    ],
  },
};
