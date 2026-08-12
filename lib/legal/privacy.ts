/**
 * 개인정보 처리방침 — 이 사이트에 실제로 해당하는 사실만.
 *
 * ── 지어내지 않기 ──────────────────────────────────────────────
 * 흔한 처리방침 문구를 그대로 옮기면 "회원 탈퇴 시 파기" 같은 대목이 들어오는데
 * 이 사이트에는 회원이 없다. 없는 것을 있다고 적는 방침은 심사자에게도 사용자에게도
 * 거짓말이다. 그래서 여기 적힌 것은 코드에서 확인한 것뿐이다 —
 *
 *   · 애드센스 스크립트  components/RootShell.tsx (adsbygoogle.js)
 *   · 방문 통계          components/RootShell.tsx (@vercel/analytics)
 *   · 로컬 저장소 네 가지
 *       theme                        components/ThemeToggle.tsx · RootShell.tsx
 *       checklist-<슬러그>            components/ChecklistEngine.tsx
 *       vixutil:best:<게임>           components/game/ui.tsx
 *       vixutil:recent-chars/-emoticons  components/text/CopyPicker.tsx
 *
 * 언어 선택은 저장하지 않는다 — 주소에 들어 있다. 그래서 "언어 선택을 저장한다"고
 * 적지 않는다. 목록이 바뀌면 이 주석과 문구를 같이 고친다.
 *
 * 광고 대목의 낱말은 임의로 줄이지 않는다. 제3자 게재·쿠키·개인 맞춤 광고 끄기·
 * 브라우저에서 차단하기 넷은 애드센스를 쓰는 사이트가 밝혀야 하는 것이고,
 * tests/legal-pages.test.ts가 열 언어에 다 있는지 센다.
 */
import type { L } from '../i18n/lang.ts';
import type { LegalCopy } from './common.ts';

export const PRIVACY: L<LegalCopy> = {
  ko: {
    title: '개인정보 처리방침',
    description: 'vixutil이 무엇을 수집하고 무엇을 수집하지 않는지, 광고와 쿠키가 어떻게 쓰이는지 적었습니다. 계산에 넣은 값은 브라우저를 떠나지 않습니다.',
    h1: '개인정보 처리방침',
    lead: '이 사이트에 실제로 해당하는 사실만 적었습니다. 계산에 넣은 값은 브라우저를 떠나지 않고, 회원가입도 없습니다.',
    sections: [
      {
        h2: '계산에 넣은 값',
        body: [
          '계산은 전부 여러분의 브라우저 안에서 이루어집니다. 급여, 대출 금액, 키와 몸무게처럼 무엇을 넣더라도 그 값이 서버로 전송되지 않습니다.',
          '보내지 않으므로 저장하지도 않습니다. 계산 기록을 모아 두는 곳이 없고, 운영자도 여러분이 무엇을 계산했는지 알 수 없습니다.',
        ],
      },
      {
        h2: '계정이 없습니다',
        body: [
          '회원가입과 로그인이 없습니다. 그래서 이름·이메일·전화번호 같은 계정 정보를 수집하지 않습니다.',
          '문의 메일을 보내 주시면 그 메일에 적힌 내용은 답변에 쓰기 위해 메일함에 남습니다. 답변이 끝난 뒤에는 필요 이상으로 보관하지 않으며, 다른 목적으로 쓰거나 제3자에게 넘기지 않습니다.',
        ],
      },
      {
        h2: '방문 통계',
        body: [
          '어느 페이지가 얼마나 열리는지 보기 위해 방문 분석 도구를 씁니다. 보는 것은 개별 방문자를 지목하지 않는 집계 수치이고, 이것으로 어떤 도구를 더 만들지 정합니다.',
          '웹 서버의 접속 기록에는 접속 시각, 요청한 주소, 브라우저 종류, IP 주소 같은 것이 남을 수 있습니다. 이는 사이트를 안정적으로 제공하고 오류를 확인하기 위한 것입니다.',
        ],
      },
      {
        h2: '광고와 쿠키',
        body: [
          '이 사이트는 Google AdSense로 광고를 싣습니다. 광고와 관련해 다음 사항을 밝힙니다.',
          '쿠키를 차단해도 계산기와 자료는 그대로 작동합니다. 로그인이 없어서 쿠키에 기대는 기능이 없습니다.',
        ],
        list: [
          '구글을 포함한 제3자 공급업체가 이 사이트에 광고를 게재합니다.',
          '구글을 포함한 제3자 공급업체는 쿠키를 사용해, 이 사이트와 다른 사이트의 방문 기록을 바탕으로 광고를 보여 줄 수 있습니다.',
          '개인 맞춤 광고는 구글 광고 설정에서 끌 수 있습니다.',
          '브라우저 설정에서 쿠키를 아예 차단하거나 지울 수도 있습니다.',
        ],
        ads: true,
      },
      {
        h2: '브라우저에 남는 것',
        body: [
          '서버가 아니라 여러분의 브라우저 안(로컬 저장소)에 남는 것이 넷 있습니다.',
          '전부 이 브라우저 안에만 있고 서버로 전송되지 않으며, 브라우저 데이터를 지우면 함께 사라집니다. 언어 선택은 저장하지 않습니다 — 주소에 들어 있습니다.',
        ],
        list: [
          '어두운 화면을 켰는지 여부',
          '체크리스트에서 어디까지 체크했는지',
          '두뇌 게임의 최고 기록',
          '특수문자·이모티콘 도구에서 최근에 고른 것',
        ],
      },
      {
        h2: '만 14세 미만',
        body: [
          '이 사이트는 만 14세 미만 아동을 대상으로 하지 않으며, 아동으로부터 의도적으로 개인정보를 수집하지 않습니다.',
          '그러한 정보가 남아 있는 것을 알게 되면 지웁니다. 관련해 알려 주실 일이 있으면 문의 페이지로 연락해 주세요.',
        ],
      },
      {
        h2: '이 방침이 바뀌면',
        body: [
          '내용이 바뀌면 이 페이지를 고치고 아래 개정일을 함께 올립니다. 따로 통지할 수단이 없으므로 이 페이지가 유일한 안내입니다.',
          '개인정보와 관련한 질문이나 요청은 문의 페이지의 주소로 보내 주세요.',
        ],
      },
    ],
  },

  en: {
    title: 'Privacy Policy',
    description: 'What vixutil collects and what it does not, and how advertising and cookies are used. The values you type into a calculator never leave your browser.',
    h1: 'Privacy Policy',
    lead: 'Only what actually applies to this site is written here. What you type into a calculator never leaves your browser, and there are no accounts.',
    sections: [
      {
        h2: 'What you type into a calculator',
        body: [
          'Every calculation runs inside your own browser. Whatever you enter — a salary, a loan amount, your height and weight — is not sent to a server.',
          'Nothing is sent, so nothing is stored. There is no place where calculation history is kept, and the operator cannot know what you calculated.',
        ],
      },
      {
        h2: 'There are no accounts',
        body: [
          'There is no sign-up and no login, so no account details such as a name, an email address or a phone number are collected.',
          'If you send an enquiry by email, what you wrote stays in the mailbox so it can be answered. It is not kept longer than needed after the reply, and it is not used for anything else or passed to third parties.',
        ],
      },
      {
        h2: 'Visit statistics',
        body: [
          'An analytics tool is used to see how often each page is opened. What it shows is aggregate counts that do not single out an individual visitor, and those counts decide which tools get built next.',
          'Web server logs may record things such as the time of a request, the address requested, the browser type and the IP address. That exists to keep the site running and to look into errors.',
        ],
      },
      {
        h2: 'Advertising and cookies',
        body: [
          'This site shows advertising through Google AdSense. The following disclosures apply to it.',
          'Calculators and reference pages keep working with cookies blocked. There is no login, so no feature depends on a cookie.',
        ],
        list: [
          'Third-party vendors, including Google, serve ads on this site.',
          'Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this site and to other sites.',
          'You can opt out of personalised advertising in Google Ads Settings.',
          'You can also block or delete cookies entirely in your browser settings.',
        ],
        ads: true,
      },
      {
        h2: 'What stays in your browser',
        body: [
          'Four things are kept in your own browser (in local storage) rather than on a server.',
          'All of it stays in that browser, none of it is sent to a server, and clearing your browser data removes it. Your language choice is not stored — it is part of the address.',
        ],
        list: [
          'Whether you switched dark mode on',
          'How far you got through a checklist',
          'Your best score in the brain games',
          'The special characters and emoticons you picked recently',
        ],
      },
      {
        h2: 'Children under 14',
        body: [
          'This site is not directed at children under 14, and personal information is not knowingly collected from children.',
          'If we learn that such information has been stored, it is deleted. If you need to tell us about a case like that, please use the contact page.',
        ],
      },
      {
        h2: 'If this policy changes',
        body: [
          'When something changes, this page is edited and the date below is moved up with it. There is no other notification channel, so this page is the only notice.',
          'Questions or requests about privacy can go to the address on the contact page.',
        ],
      },
    ],
  },

  es: {
    title: 'Política de privacidad',
    description: 'Qué recoge vixutil y qué no, y cómo se usan la publicidad y las cookies. Los valores que escribes en una calculadora no salen de tu navegador.',
    h1: 'Política de privacidad',
    lead: 'Aquí solo está escrito lo que de verdad se aplica a este sitio. Lo que escribes en una calculadora no sale de tu navegador y no hay cuentas de usuario.',
    sections: [
      {
        h2: 'Lo que escribes en una calculadora',
        body: [
          'Todos los cálculos se ejecutan dentro de tu propio navegador. Lo que introduzcas — un sueldo, el importe de un préstamo, tu altura y tu peso — no se envía a un servidor.',
          'Como no se envía nada, tampoco se guarda nada. No existe ningún lugar donde se conserve un historial de cálculos, y quien lleva el sitio no puede saber qué calculaste.',
        ],
      },
      {
        h2: 'No hay cuentas',
        body: [
          'No hay registro ni inicio de sesión, así que no se recogen datos de cuenta como el nombre, el correo electrónico o el teléfono.',
          'Si escribes un correo, lo que contenga queda en el buzón para poder responderte. No se conserva más de lo necesario tras la respuesta, no se usa para otra cosa ni se cede a terceros.',
        ],
      },
      {
        h2: 'Estadísticas de visitas',
        body: [
          'Se usa una herramienta de análisis para ver cuántas veces se abre cada página. Lo que muestra son recuentos agregados que no señalan a ningún visitante concreto, y con ellos se decide qué herramientas hacer después.',
          'Los registros del servidor web pueden guardar cosas como la hora de la petición, la dirección solicitada, el tipo de navegador y la dirección IP. Eso existe para mantener el sitio en marcha y revisar errores.',
        ],
      },
      {
        h2: 'Publicidad y cookies',
        body: [
          'Este sitio muestra publicidad mediante Google AdSense. En relación con ella, se informa de lo siguiente.',
          'Las calculadoras y las páginas de consulta siguen funcionando con las cookies bloqueadas. No hay inicio de sesión, así que ninguna función depende de una cookie.',
        ],
        list: [
          'Proveedores externos, incluido Google, publican anuncios en este sitio.',
          'Proveedores externos, incluido Google, usan cookies para mostrar anuncios basados en tus visitas anteriores a este sitio y a otros sitios.',
          'Puedes desactivar la publicidad personalizada en la configuración de anuncios de Google.',
          'También puedes bloquear o borrar las cookies por completo en la configuración de tu navegador.',
        ],
        ads: true,
      },
      {
        h2: 'Lo que queda en tu navegador',
        body: [
          'Hay cuatro cosas que se guardan en tu propio navegador (almacenamiento local) y no en un servidor.',
          'Todo eso se queda en ese navegador, no se envía a ningún servidor y desaparece al borrar los datos del navegador. El idioma elegido no se guarda: va en la dirección.',
        ],
        list: [
          'Si activaste el modo oscuro',
          'Hasta dónde llegaste en una lista de comprobación',
          'Tu mejor puntuación en los juegos mentales',
          'Los caracteres especiales y emoticonos que elegiste hace poco',
        ],
      },
      {
        h2: 'Menores de 14 años',
        body: [
          'Este sitio no se dirige a menores de 14 años y no se recogen datos personales de menores a sabiendas.',
          'Si llegamos a saber que se guardó información así, se borra. Si tienes que avisarnos de un caso, usa la página de contacto.',
        ],
      },
      {
        h2: 'Si esta política cambia',
        body: [
          'Cuando algo cambie, se edita esta página y se actualiza con ella la fecha de abajo. No hay otro canal de aviso, así que esta página es el único anuncio.',
          'Las preguntas o solicitudes sobre privacidad pueden ir a la dirección de la página de contacto.',
        ],
      },
    ],
  },

  pt: {
    title: 'Política de Privacidade',
    description: 'O que o vixutil coleta e o que não coleta, e como a publicidade e os cookies são usados. Os valores digitados numa calculadora não saem do seu navegador.',
    h1: 'Política de Privacidade',
    lead: 'Aqui está escrito apenas o que realmente se aplica a este site. O que você digita numa calculadora não sai do seu navegador e não existem contas de usuário.',
    sections: [
      {
        h2: 'O que você digita numa calculadora',
        body: [
          'Todos os cálculos rodam dentro do seu próprio navegador. O que você informar — um salário, o valor de um empréstimo, sua altura e seu peso — não é enviado a um servidor.',
          'Como nada é enviado, nada é guardado. Não existe lugar algum onde se mantenha um histórico de cálculos, e quem mantém o site não pode saber o que você calculou.',
        ],
      },
      {
        h2: 'Não existem contas',
        body: [
          'Não há cadastro nem login, então não se coletam dados de conta como nome, e-mail ou telefone.',
          'Se você escrever um e-mail, o conteúdo fica na caixa de mensagens para que seja possível responder. Não é guardado além do necessário depois da resposta, não é usado para outra finalidade nem repassado a terceiros.',
        ],
      },
      {
        h2: 'Estatísticas de visitas',
        body: [
          'Uma ferramenta de análise é usada para ver quantas vezes cada página é aberta. O que ela mostra são contagens agregadas que não apontam um visitante específico, e é com elas que se decide quais ferramentas fazer em seguida.',
          'Os registros do servidor web podem guardar coisas como a hora do pedido, o endereço solicitado, o tipo de navegador e o endereço IP. Isso existe para manter o site no ar e investigar erros.',
        ],
      },
      {
        h2: 'Publicidade e cookies',
        body: [
          'Este site exibe publicidade por meio do Google AdSense. A respeito dela, informamos o seguinte.',
          'As calculadoras e as páginas de consulta continuam funcionando com os cookies bloqueados. Não há login, portanto nenhum recurso depende de um cookie.',
        ],
        list: [
          'Fornecedores terceiros, incluindo o Google, exibem anúncios neste site.',
          'Fornecedores terceiros, incluindo o Google, usam cookies para exibir anúncios com base nas suas visitas anteriores a este site e a outros sites.',
          'Você pode desativar a publicidade personalizada nas configurações de anúncios do Google.',
          'Você também pode bloquear ou apagar os cookies por completo nas configurações do navegador.',
        ],
        ads: true,
      },
      {
        h2: 'O que fica no seu navegador',
        body: [
          'Há quatro coisas guardadas no seu próprio navegador (armazenamento local), e não num servidor.',
          'Tudo isso fica naquele navegador, nada é enviado a um servidor, e apagar os dados do navegador remove tudo. O idioma escolhido não é guardado — ele está no endereço.',
        ],
        list: [
          'Se você ligou o modo escuro',
          'Até onde você chegou numa lista de verificação',
          'Sua melhor pontuação nos jogos de raciocínio',
          'Os caracteres especiais e emoticons que você escolheu recentemente',
        ],
      },
      {
        h2: 'Menores de 14 anos',
        body: [
          'Este site não se dirige a menores de 14 anos e não coleta intencionalmente dados pessoais de crianças.',
          'Se soubermos que uma informação assim foi guardada, ela é apagada. Se precisar nos avisar de um caso, use a página de contato.',
        ],
      },
      {
        h2: 'Se esta política mudar',
        body: [
          'Quando algo mudar, esta página é editada e a data abaixo é atualizada junto. Não há outro canal de aviso, então esta página é o único comunicado.',
          'Dúvidas ou pedidos sobre privacidade podem ir para o endereço da página de contato.',
        ],
      },
    ],
  },

  ja: {
    title: 'プライバシーポリシー',
    description: 'vixutil が何を集め、何を集めないのか、広告とクッキーがどう使われるのかを書いています。計算に入れた値はブラウザから出ません。',
    h1: 'プライバシーポリシー',
    lead: 'このサイトに実際に当てはまることだけを書いています。計算に入れた値はブラウザから出ず、会員登録もありません。',
    sections: [
      {
        h2: '計算に入れた値',
        body: [
          '計算はすべて利用者自身のブラウザの中で行われます。給与、借入額、身長と体重など何を入れても、その値がサーバへ送られることはありません。',
          '送らないので保存もしません。計算の履歴を集めておく場所が無く、運営者も何を計算したのか知る手立てがありません。',
        ],
      },
      {
        h2: 'アカウントがありません',
        body: [
          '会員登録もログインもありません。そのため名前・メールアドレス・電話番号といったアカウント情報を集めることがありません。',
          'お問い合わせのメールをいただいた場合、その内容は返信のためにメールボックスに残ります。返信が済んだあと必要以上に保管することはなく、ほかの目的に使ったり第三者に渡したりもしません。',
        ],
      },
      {
        h2: '訪問の集計',
        body: [
          'どのページがどれだけ開かれているかを見るために、アクセス解析の道具を使っています。見ているのは個々の訪問者を特定しない集計値で、それをもとに次にどの道具を作るかを決めています。',
          'ウェブサーバの記録には、アクセスの時刻、要求されたアドレス、ブラウザの種類、IP アドレスなどが残ることがあります。これはサイトを安定して提供し、不具合を確かめるためのものです。',
        ],
      },
      {
        h2: '広告とクッキー',
        body: [
          'このサイトは Google AdSense で広告を掲載しています。広告について次の点をお知らせします。',
          'クッキーを遮断しても計算機と資料はそのまま動きます。ログインが無いので、クッキーに頼る機能がありません。',
        ],
        list: [
          'Google を含む第三者配信事業者が、このサイトに広告を掲載します。',
          'Google を含む第三者配信事業者は、クッキーを使用し、このサイトやほかのサイトへの過去の訪問に基づいて広告を表示することがあります。',
          'パーソナライズ広告は Google の広告設定で無効にできます。',
          'ブラウザの設定でクッキーを完全に遮断したり削除したりすることもできます。',
        ],
        ads: true,
      },
      {
        h2: 'ブラウザに残るもの',
        body: [
          'サーバではなく利用者のブラウザの中（ローカルストレージ）に残るものが四つあります。',
          'いずれもそのブラウザの中だけにあり、サーバへ送られることはなく、ブラウザのデータを消せば一緒に消えます。言語の選択は保存していません — アドレスに入っています。',
        ],
        list: [
          '暗い画面をオンにしたかどうか',
          'チェックリストをどこまでチェックしたか',
          '脳トレゲームの最高記録',
          '特殊文字・顔文字の道具で最近選んだもの',
        ],
      },
      {
        h2: '14 歳未満の方について',
        body: [
          'このサイトは 14 歳未満の子どもを対象としておらず、子どもから故意に個人情報を集めることはありません。',
          'そのような情報が残っていることが分かった場合は削除します。お知らせいただくことがあれば、お問い合わせページからご連絡ください。',
        ],
      },
      {
        h2: 'この方針を変えるとき',
        body: [
          '内容が変わったときはこのページを直し、下の更新日も一緒に繰り上げます。ほかに通知する手段が無いため、このページが唯一の案内です。',
          '個人情報についての質問や依頼は、お問い合わせページのアドレスへお送りください。',
        ],
      },
    ],
  },

  de: {
    title: 'Datenschutzerklärung',
    description: 'Was vixutil erhebt und was nicht, und wie Werbung und Cookies eingesetzt werden. Was du in einen Rechner eingibst, verlässt deinen Browser nicht.',
    h1: 'Datenschutzerklärung',
    lead: 'Hier steht nur, was auf diese Seite tatsächlich zutrifft. Eingaben in einen Rechner verlassen den Browser nicht, und Konten gibt es keine.',
    sections: [
      {
        h2: 'Was du in einen Rechner eingibst',
        body: [
          'Jede Rechnung läuft im eigenen Browser. Was auch immer du eingibst — Gehalt, Kreditsumme, Größe und Gewicht — wird nicht an einen Server gesendet.',
          'Es wird nichts gesendet, also auch nichts gespeichert. Es gibt keinen Ort, an dem ein Rechenverlauf liegt, und der Betreiber kann nicht wissen, was gerechnet wurde.',
        ],
      },
      {
        h2: 'Es gibt keine Konten',
        body: [
          'Es gibt keine Registrierung und keine Anmeldung, daher werden keine Kontodaten wie Name, E-Mail-Adresse oder Telefonnummer erhoben.',
          'Wenn du eine Anfrage per E-Mail schickst, bleibt ihr Inhalt im Postfach, damit sie beantwortet werden kann. Nach der Antwort wird sie nicht länger als nötig aufbewahrt, nicht für andere Zwecke genutzt und nicht an Dritte weitergegeben.',
        ],
      },
      {
        h2: 'Besuchsstatistik',
        body: [
          'Ein Analysewerkzeug zeigt, wie oft eine Seite geöffnet wird. Zu sehen sind zusammengefasste Zahlen, die keinen einzelnen Besucher herausgreifen; daran entscheidet sich, welche Werkzeuge als nächstes entstehen.',
          'In den Protokollen des Webservers können Dinge wie Zeitpunkt der Anfrage, angeforderte Adresse, Browsertyp und IP-Adresse festgehalten werden. Das dient dem stabilen Betrieb und der Fehlersuche.',
        ],
      },
      {
        h2: 'Werbung und Cookies',
        body: [
          'Diese Seite zeigt Werbung über Google AdSense. Dazu gilt Folgendes.',
          'Rechner und Nachschlage-Seiten funktionieren auch bei blockierten Cookies. Es gibt keine Anmeldung, also hängt keine Funktion an einem Cookie.',
        ],
        list: [
          'Drittanbieter, einschließlich Google, schalten Anzeigen auf dieser Seite.',
          'Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen auf Grundlage früherer Besuche dieser und anderer Websites auszuliefern.',
          'Personalisierte Werbung lässt sich in den Anzeigeneinstellungen von Google abschalten.',
          'Cookies können in den Browsereinstellungen auch vollständig blockiert oder gelöscht werden.',
        ],
        ads: true,
      },
      {
        h2: 'Was im Browser bleibt',
        body: [
          'Vier Dinge liegen im eigenen Browser (im lokalen Speicher) und nicht auf einem Server.',
          'Alles davon bleibt in diesem Browser, nichts wird an einen Server gesendet, und wer die Browserdaten löscht, löscht es mit. Die Sprachwahl wird nicht gespeichert — sie steht in der Adresse.',
        ],
        list: [
          'Ob du den dunklen Modus eingeschaltet hast',
          'Wie weit du in einer Checkliste gekommen bist',
          'Deine Bestleistung in den Denkspielen',
          'Die Sonderzeichen und Emoticons, die du zuletzt ausgewählt hast',
        ],
      },
      {
        h2: 'Kinder unter 14 Jahren',
        body: [
          'Diese Seite richtet sich nicht an Kinder unter 14 Jahren, und personenbezogene Daten von Kindern werden nicht bewusst erhoben.',
          'Wird bekannt, dass solche Daten gespeichert wurden, werden sie gelöscht. Wenn du auf einen solchen Fall hinweisen möchtest, nutze die Kontaktseite.',
        ],
      },
      {
        h2: 'Wenn sich diese Erklärung ändert',
        body: [
          'Ändert sich etwas, wird diese Seite bearbeitet und das Datum unten mit hochgezogen. Es gibt keinen anderen Benachrichtigungsweg, diese Seite ist also der einzige Hinweis.',
          'Fragen oder Anliegen zum Datenschutz gehen an die Adresse auf der Kontaktseite.',
        ],
      },
    ],
  },

  fr: {
    title: 'Politique de confidentialité',
    description: 'Ce que vixutil collecte et ne collecte pas, et comment la publicité et les cookies sont utilisés. Les valeurs saisies dans une calculatrice ne quittent pas ton navigateur.',
    h1: 'Politique de confidentialité',
    lead: 'Seul ce qui s’applique réellement à ce site est écrit ici. Ce que tu saisis dans une calculatrice ne quitte pas ton navigateur, et il n’y a aucun compte.',
    sections: [
      {
        h2: 'Ce que tu saisis dans une calculatrice',
        body: [
          'Chaque calcul se fait dans ton propre navigateur. Quoi que tu saisisses — un salaire, le montant d’un prêt, ta taille et ton poids — rien n’est envoyé à un serveur.',
          'Rien n’est envoyé, donc rien n’est conservé. Il n’existe aucun endroit où serait gardé un historique de calculs, et l’exploitant ne peut pas savoir ce qui a été calculé.',
        ],
      },
      {
        h2: 'Il n’y a pas de comptes',
        body: [
          'Il n’y a ni inscription ni connexion, donc aucune donnée de compte — nom, adresse e-mail, numéro de téléphone — n’est collectée.',
          'Si tu envoies un message par e-mail, son contenu reste dans la boîte afin qu’on puisse y répondre. Il n’est pas conservé plus longtemps que nécessaire après la réponse, ni utilisé à d’autres fins, ni transmis à des tiers.',
        ],
      },
      {
        h2: 'Statistiques de visite',
        body: [
          'Un outil de mesure sert à voir combien de fois chaque page est ouverte. Ce qu’il montre, ce sont des totaux agrégés qui ne désignent aucun visiteur en particulier, et ils servent à décider quels outils construire ensuite.',
          'Les journaux du serveur web peuvent conserver l’heure de la requête, l’adresse demandée, le type de navigateur et l’adresse IP. Cela existe pour maintenir le site en état de marche et examiner les erreurs.',
        ],
      },
      {
        h2: 'Publicité et cookies',
        body: [
          'Ce site affiche de la publicité via Google AdSense. À ce sujet, voici ce qu’il faut savoir.',
          'Les calculatrices et les pages de référence fonctionnent même avec les cookies bloqués. Il n’y a pas de connexion, donc aucune fonction ne dépend d’un cookie.',
        ],
        list: [
          'Des fournisseurs tiers, dont Google, diffusent des annonces sur ce site.',
          'Des fournisseurs tiers, dont Google, utilisent des cookies pour diffuser des annonces en fonction de tes visites antérieures sur ce site et sur d’autres sites.',
          'La publicité personnalisée peut être désactivée dans les paramètres des annonces Google.',
          'Les cookies peuvent aussi être entièrement bloqués ou supprimés dans les réglages du navigateur.',
        ],
        ads: true,
      },
      {
        h2: 'Ce qui reste dans ton navigateur',
        body: [
          'Quatre choses sont conservées dans ton propre navigateur (stockage local) et non sur un serveur.',
          'Tout cela reste dans ce navigateur, rien n’est envoyé à un serveur, et effacer les données du navigateur les supprime. La langue choisie n’est pas enregistrée : elle figure dans l’adresse.',
        ],
        list: [
          'Si tu as activé le mode sombre',
          'Où tu en étais dans une liste de vérification',
          'Ton meilleur score aux jeux de réflexion',
          'Les caractères spéciaux et émoticônes choisis récemment',
        ],
      },
      {
        h2: 'Les moins de 14 ans',
        body: [
          'Ce site ne s’adresse pas aux enfants de moins de 14 ans et ne collecte pas sciemment de données personnelles auprès d’enfants.',
          'S’il apparaît que de telles données ont été conservées, elles sont supprimées. Pour signaler un cas de ce genre, passe par la page de contact.',
        ],
      },
      {
        h2: 'Si cette politique change',
        body: [
          'En cas de changement, cette page est modifiée et la date ci-dessous avance avec elle. Il n’y a aucun autre canal d’information : cette page est le seul avis.',
          'Les questions ou demandes relatives à la vie privée peuvent être envoyées à l’adresse indiquée sur la page de contact.',
        ],
      },
    ],
  },

  hi: {
    title: 'गोपनीयता नीति',
    description: 'vixutil क्या एकत्र करता है और क्या नहीं, तथा विज्ञापन और कुकी का उपयोग कैसे होता है। कैलकुलेटर में डाले गए मान आपके ब्राउज़र से बाहर नहीं जाते।',
    h1: 'गोपनीयता नीति',
    lead: 'यहाँ केवल वही लिखा है जो इस साइट पर वास्तव में लागू होता है। कैलकुलेटर में डाला गया मान ब्राउज़र से बाहर नहीं जाता, और कोई खाता भी नहीं है।',
    sections: [
      {
        h2: 'कैलकुलेटर में डाले गए मान',
        body: [
          'हर गणना आपके ही ब्राउज़र के भीतर चलती है। आप जो भी भरें — वेतन, ऋण की राशि, अपनी लंबाई और वज़न — वह सर्वर पर नहीं भेजा जाता।',
          'कुछ भेजा नहीं जाता, इसलिए कुछ सहेजा भी नहीं जाता। गणनाओं का इतिहास कहीं नहीं रखा जाता, और संचालक भी नहीं जान सकता कि आपने क्या गिना।',
        ],
      },
      {
        h2: 'कोई खाता नहीं है',
        body: [
          'न पंजीकरण है, न लॉगिन — इसलिए नाम, ईमेल या फ़ोन नंबर जैसी खाते की जानकारी एकत्र नहीं की जाती।',
          'यदि आप ईमेल से कुछ पूछते हैं तो उत्तर देने के लिए उसका विषय मेलबॉक्स में रहता है। उत्तर के बाद उसे आवश्यकता से अधिक नहीं रखा जाता, किसी दूसरे काम में नहीं लिया जाता और किसी तीसरे पक्ष को नहीं दिया जाता।',
        ],
      },
      {
        h2: 'भ्रमण के आँकड़े',
        body: [
          'कौन-सा पृष्ठ कितनी बार खुलता है, यह देखने के लिए एक विश्लेषण उपकरण उपयोग होता है। वह सामूहिक गिनती दिखाता है जो किसी एक भ्रमणकर्ता को अलग से नहीं पहचानती, और उसी से तय होता है कि आगे कौन-सा उपकरण बनाना है।',
          'वेब सर्वर के अभिलेख में अनुरोध का समय, माँगा गया पता, ब्राउज़र का प्रकार और IP पता जैसी बातें दर्ज हो सकती हैं। यह साइट को चालू रखने और त्रुटियाँ जाँचने के लिए है।',
        ],
      },
      {
        h2: 'विज्ञापन और कुकी',
        body: [
          'यह साइट Google AdSense के ज़रिये विज्ञापन दिखाती है। उसके बारे में निम्नलिखित बातें लागू होती हैं।',
          'कुकी रोक देने पर भी कैलकुलेटर और संदर्भ पृष्ठ वैसे ही काम करते हैं। लॉगिन नहीं है, इसलिए कोई सुविधा कुकी पर टिकी हुई नहीं है।',
        ],
        list: [
          'Google सहित तीसरे पक्ष के विक्रेता इस साइट पर विज्ञापन दिखाते हैं।',
          'Google सहित तीसरे पक्ष के विक्रेता कुकी का उपयोग करके, इस साइट और अन्य साइटों पर आपकी पिछली यात्राओं के आधार पर विज्ञापन दिखा सकते हैं।',
          'वैयक्तिकृत विज्ञापन Google की विज्ञापन सेटिंग में बंद किए जा सकते हैं।',
          'ब्राउज़र की सेटिंग से कुकी पूरी तरह रोकी या मिटाई भी जा सकती है।',
        ],
        ads: true,
      },
      {
        h2: 'ब्राउज़र में क्या रहता है',
        body: [
          'चार चीज़ें सर्वर पर नहीं, आपके ही ब्राउज़र के भीतर (लोकल स्टोरेज में) रखी जाती हैं।',
          'ये सब उसी ब्राउज़र में रहती हैं, सर्वर पर नहीं भेजी जातीं, और ब्राउज़र का डेटा मिटाने पर साथ मिट जाती हैं। चुनी हुई भाषा सहेजी नहीं जाती — वह पते में ही होती है।',
        ],
        list: [
          'आपने गहरा रूप चालू किया या नहीं',
          'किसी जाँच-सूची में आप कहाँ तक पहुँचे',
          'दिमाग़ी खेलों में आपका सर्वोत्तम अंक',
          'विशेष चिह्न और इमोटिकॉन में हाल में चुनी गई चीज़ें',
        ],
      },
      {
        h2: '14 वर्ष से कम आयु',
        body: [
          'यह साइट 14 वर्ष से कम आयु के बच्चों के लिए नहीं है, और बच्चों से जानबूझकर व्यक्तिगत जानकारी एकत्र नहीं की जाती।',
          'यदि पता चले कि ऐसी जानकारी रखी गई है तो उसे मिटा दिया जाता है। ऐसा कोई मामला बताना हो तो संपर्क पृष्ठ का उपयोग करें।',
        ],
      },
      {
        h2: 'यह नीति बदलने पर',
        body: [
          'कुछ बदलने पर यह पृष्ठ संपादित किया जाता है और नीचे दी तिथि भी साथ आगे बढ़ाई जाती है। सूचना देने का दूसरा कोई साधन नहीं है, इसलिए यही पृष्ठ एकमात्र सूचना है।',
          'गोपनीयता से जुड़े प्रश्न या अनुरोध संपर्क पृष्ठ पर दिए पते पर भेजे जा सकते हैं।',
        ],
      },
    ],
  },

  zh: {
    title: '隐私政策',
    description: 'vixutil 收集什么、不收集什么，以及广告和 Cookie 是怎么用的。你在计算器里填的数值不会离开浏览器。',
    h1: '隐私政策',
    lead: '这里只写确实适用于本站的事情。你在计算器里填的数值不会离开浏览器，本站也没有账号。',
    sections: [
      {
        h2: '你在计算器里填的数值',
        body: [
          '所有计算都在你自己的浏览器里跑。不管填什么——工资、贷款金额、身高体重——都不会发到服务器。',
          '既然不发出去，也就不保存。任何地方都没有计算记录，运营者同样无从知道你算了什么。',
        ],
      },
      {
        h2: '没有账号',
        body: [
          '没有注册，也没有登录，因此不收集姓名、邮箱、电话这类账号信息。',
          '如果你发邮件来询问，邮件内容会留在邮箱里，以便回复。回复完不会超出必要地保留，也不会用于别的用途或转给第三方。',
        ],
      },
      {
        h2: '访问统计',
        body: [
          '为了看每个页面被打开多少次，本站使用访问分析工具。看到的是不指向某个具体访客的汇总数字，接下来做哪些工具就是照它来定的。',
          '网页服务器的日志里可能会留下请求时间、请求的网址、浏览器种类、IP 地址这类内容。这是为了让站点稳定运行和排查故障。',
        ],
      },
      {
        h2: '广告与 Cookie',
        body: [
          '本站通过 Google AdSense 投放广告。关于广告，说明以下几点。',
          '就算把 Cookie 全部拦掉，计算器和查阅页面照样能用。本站没有登录，没有任何功能依赖 Cookie。',
        ],
        list: [
          '包括 Google 在内的第三方供应商会在本站投放广告。',
          '包括 Google 在内的第三方供应商会使用 Cookie，依据你此前访问本站及其他网站的记录来投放广告。',
          '个性化广告可以在 Google 的广告设置里关掉。',
          '也可以在浏览器设置里彻底拦截或清除 Cookie。',
        ],
        ads: true,
      },
      {
        h2: '留在浏览器里的东西',
        body: [
          '有四样东西存在你自己的浏览器里（本地存储），而不是服务器上。',
          '这些都只留在那台浏览器里，不会发到服务器，清掉浏览器数据就一起消失。所选语言不做保存——它就在网址里。',
        ],
        list: [
          '你有没有打开深色界面',
          '清单勾到了哪一步',
          '脑力小游戏的最好成绩',
          '特殊符号和表情符号里最近挑过的几个',
        ],
      },
      {
        h2: '不满 14 周岁',
        body: [
          '本站不以未满 14 周岁的儿童为对象，也不会有意从儿童处收集个人信息。',
          '若得知留有这类信息，会将其删除。需要告知这类情况，请通过联系页与我们联系。',
        ],
      },
      {
        h2: '本政策变更时',
        body: [
          '内容有变时会修改本页，并把下面的更新日期一起往前挪。没有别的通知渠道，这一页就是唯一的告知。',
          '与隐私有关的疑问或请求，可以寄到联系页上的地址。',
        ],
      },
    ],
  },

  tw: {
    title: '隱私權政策',
    description: 'vixutil 蒐集什麼、不蒐集什麼，以及廣告和 Cookie 是怎麼用的。你在計算機裡填的數值不會離開瀏覽器。',
    h1: '隱私權政策',
    lead: '這裡只寫確實適用於本站的事情。你在計算機裡填的數值不會離開瀏覽器，本站也沒有帳號。',
    sections: [
      {
        h2: '你在計算機裡填的數值',
        body: [
          '所有計算都在你自己的瀏覽器裡跑。不管填什麼——薪資、貸款金額、身高體重——都不會傳到伺服器。',
          '既然不送出去，也就不保存。任何地方都沒有計算紀錄，維護者同樣無從得知你算了什麼。',
        ],
      },
      {
        h2: '沒有帳號',
        body: [
          '沒有註冊，也沒有登入，因此不蒐集姓名、電子郵件、電話這類帳號資訊。',
          '如果你寄信來詢問，信件內容會留在信箱裡，以便回覆。回覆完不會超出必要地保留，也不會用於別的用途或轉給第三方。',
        ],
      },
      {
        h2: '造訪統計',
        body: [
          '為了看每個頁面被開啟多少次，本站使用造訪分析工具。看到的是不指向某位具體訪客的匯總數字，接下來做哪些工具就是照它來定的。',
          '網頁伺服器的紀錄裡可能會留下請求時間、請求的網址、瀏覽器種類、IP 位址這類內容。這是為了讓網站穩定運作和排查故障。',
        ],
      },
      {
        h2: '廣告與 Cookie',
        body: [
          '本站透過 Google AdSense 投放廣告。關於廣告，說明以下幾點。',
          '就算把 Cookie 全部擋掉，計算機和查閱頁面照樣能用。本站沒有登入，沒有任何功能依賴 Cookie。',
        ],
        list: [
          '包括 Google 在內的第三方供應商會在本站投放廣告。',
          '包括 Google 在內的第三方供應商會使用 Cookie，依據你先前造訪本站及其他網站的紀錄來投放廣告。',
          '個人化廣告可以在 Google 的廣告設定裡關掉。',
          '也可以在瀏覽器設定裡徹底封鎖或清除 Cookie。',
        ],
        ads: true,
      },
      {
        h2: '留在瀏覽器裡的東西',
        body: [
          '有四樣東西存在你自己的瀏覽器裡（本機儲存），而不是伺服器上。',
          '這些都只留在那台瀏覽器裡，不會傳到伺服器，清掉瀏覽器資料就一起消失。所選語言不做保存——它就在網址裡。',
        ],
        list: [
          '你有沒有打開深色介面',
          '清單勾到了哪一步',
          '腦力小遊戲的最佳成績',
          '特殊符號和表情符號裡最近挑過的幾個',
        ],
      },
      {
        h2: '未滿 14 歲',
        body: [
          '本站不以未滿 14 歲的兒童為對象，也不會刻意從兒童處蒐集個人資料。',
          '若得知留有這類資料，會將其刪除。需要告知這類情況，請透過聯絡頁與我們聯繫。',
        ],
      },
      {
        h2: '本政策變更時',
        body: [
          '內容有變時會修改本頁，並把下面的更新日期一起往前挪。沒有別的通知管道，這一頁就是唯一的告知。',
          '與隱私有關的疑問或請求，可以寄到聯絡頁上的地址。',
        ],
      },
    ],
  },
};
