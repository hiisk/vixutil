/**
 * 이용약관 — 무료로 제공하고, 결과는 추정치이며, 중요한 판단은 기관 확인을 따르라는 것.
 *
 * 이 장의 핵심은 면책이 아니라 **결과의 성격을 정확히 말하는 것**이다. 계산기는
 * 공개된 공식과 고시 값으로 낸 추정치를 내놓는데, 화면에 금액이 원 단위로 찍히면
 * 사람은 그것을 확정된 숫자로 읽는다. 그 오해를 그냥 두면 급여·세금·건강처럼
 * 손해가 실제로 발생하는 자리에서 문제가 된다. 그래서 "참고용 추정치"와 "기관
 * 확인이 우선"을 앞쪽에 두고, 책임의 한계는 그 뒤에 둔다 — 순서가 뜻을 바꾼다.
 *
 * 준거법은 대한민국 법이다. 운영자가 한국에 있고 계산기 상당수가 한국 제도를
 * 따르므로, 다른 법을 적어 두면 지킬 수 없는 약속이 된다.
 */
import type { L } from '../i18n/lang.ts';
import type { LegalCopy } from './common.ts';

export const TERMS: L<LegalCopy> = {
  ko: {
    title: '이용약관',
    description: 'vixutil의 계산기와 자료를 어떤 조건으로 쓰는지 적었습니다. 결과는 참고용 추정치이며 법적·의학적·금융 조언이 아닙니다.',
    h1: '이용약관',
    lead: '무료로 제공하는 계산기와 자료를 어떤 조건으로 쓰는지 적었습니다. 사이트를 이용하면 이 내용에 동의한 것으로 봅니다.',
    sections: [
      {
        h2: '무료로 제공합니다',
        body: [
          '회원가입 없이 누구나 무료로 쓸 수 있습니다. 유지 비용은 광고로 충당합니다.',
          '도구는 예고 없이 바뀌거나 사라질 수 있고, 점검이나 장애로 잠시 열리지 않을 수 있습니다. 특정 기능이 앞으로도 계속 제공된다고 약속하지 않습니다.',
        ],
      },
      {
        h2: '결과는 참고용 추정치입니다',
        body: [
          '계산 결과는 일반적으로 알려진 공식과 공개된 값으로 낸 추정치입니다. 실제 금액이나 수치는 개인의 사정, 지역, 적용 시점에 따라 달라집니다.',
          '이 사이트의 결과는 법률·의료·세무·금융 조언이 아니며, 전문가의 판단을 대신하지 않습니다.',
        ],
      },
      {
        h2: '중요한 판단은 확인을 받으세요',
        body: [
          '급여, 세금, 보험, 건강처럼 결과에 따라 손해가 생길 수 있는 일은 관계 기관이나 전문가의 확인을 따라야 합니다.',
          '여기 나온 숫자와 기관이 알려 준 숫자가 다르면 기관 쪽이 맞습니다. 그런 경우를 알려 주시면 이쪽을 고칩니다.',
        ],
      },
      {
        h2: '책임의 한계',
        body: [
          '값을 맞추기 위해 최선을 다하지만 정확성·완전성·최신성을 보증하지는 않습니다.',
          '이 사이트의 내용을 믿고 내린 결정으로 생긴 손해에 대해, 법이 허용하는 범위에서 책임을 지지 않습니다. 틀린 것을 알려 주시면 고칩니다.',
        ],
      },
      {
        h2: '콘텐츠 이용',
        body: [
          '개인적으로 쓰는 것, 링크를 거는 것, 결과를 인용하는 것은 자유입니다. 인용할 때는 출처를 밝히고 해당 페이지로 링크를 걸어 주세요.',
          '다만 다음은 하지 말아 주세요.',
        ],
        list: [
          '페이지를 자동으로 긁어 대량으로 복제하는 것',
          '사이트의 내용을 그대로 옮겨 다른 주소에 올리는 것',
          '과도한 자동 요청으로 서비스 제공에 부담을 주는 것',
        ],
      },
      {
        h2: '외부 링크와 광고',
        body: [
          '이 사이트에는 외부 사이트로 나가는 링크와 광고가 있습니다.',
          '그 사이트의 내용, 그곳에서 이루어지는 거래에 대해서는 책임지지 않습니다. 그쪽의 약관과 개인정보 처리방침이 적용됩니다.',
        ],
      },
      {
        h2: '약관이 바뀌면',
        body: [
          '내용이 바뀌면 이 페이지를 고치고 아래 개정일을 함께 올립니다.',
          '바뀐 뒤에도 사이트를 계속 이용하면 새 내용에 동의한 것으로 봅니다.',
        ],
      },
      {
        h2: '준거법',
        body: [
          '이 약관은 대한민국 법에 따라 해석되고 적용됩니다. 분쟁이 생기면 대한민국 법원을 관할로 합니다.',
        ],
      },
    ],
  },

  en: {
    title: 'Terms of Use',
    description: 'The conditions under which vixutil\'s calculators and reference pages may be used. Results are estimates for reference and are not legal, medical or financial advice.',
    h1: 'Terms of Use',
    lead: 'These are the conditions for using the calculators and reference pages offered here free of charge. Using the site means you accept them.',
    sections: [
      {
        h2: 'Free to use',
        body: [
          'Anyone can use the site free of charge, with no sign-up. Running costs are covered by advertising.',
          'Tools may change or disappear without notice, and the site may be briefly unavailable for maintenance or because something broke. No promise is made that a particular feature will remain available.',
        ],
      },
      {
        h2: 'Results are estimates for reference',
        body: [
          'A result is an estimate produced from commonly known formulas and published figures. Real amounts depend on individual circumstances, on the region, and on when the rules applied.',
          'Nothing here is legal, medical, tax or financial advice, and none of it replaces the judgement of a professional.',
        ],
      },
      {
        h2: 'Have important decisions confirmed',
        body: [
          'Where the outcome can cost you — pay, taxes, insurance, health — follow the confirmation of the relevant authority or a professional.',
          'If a figure here disagrees with what an authority tells you, the authority is right. Tell us about it and this side gets fixed.',
        ],
      },
      {
        h2: 'Limits of liability',
        body: [
          'Every effort goes into getting the figures right, but accuracy, completeness and currency are not guaranteed.',
          'To the extent the law allows, no liability is accepted for loss arising from decisions made in reliance on this site. Report anything wrong and it will be corrected.',
        ],
      },
      {
        h2: 'Using the content',
        body: [
          'Personal use, linking, and quoting a result are all fine. When quoting, name the source and link to the page it came from.',
          'Please do not do the following.',
        ],
        list: [
          'Scraping pages automatically to reproduce them in bulk',
          'Republishing the site\'s content as-is at another address',
          'Placing a burden on the service with excessive automated requests',
        ],
      },
      {
        h2: 'External links and advertising',
        body: [
          'The site contains links that lead to other sites, and it carries advertising.',
          'No responsibility is taken for the content of those sites or for any dealings you have there. Their own terms and privacy policies apply.',
        ],
      },
      {
        h2: 'If these terms change',
        body: [
          'When something changes, this page is edited and the date below is moved up with it.',
          'Continuing to use the site after a change means you accept the new wording.',
        ],
      },
      {
        h2: 'Governing law',
        body: [
          'These terms are interpreted and applied under the laws of the Republic of Korea, and the courts of the Republic of Korea have jurisdiction over any dispute.',
        ],
      },
    ],
  },

  es: {
    title: 'Términos de uso',
    description: 'Las condiciones para usar las calculadoras y las páginas de consulta de vixutil. Los resultados son estimaciones orientativas y no constituyen asesoramiento legal, médico ni financiero.',
    h1: 'Términos de uso',
    lead: 'Estas son las condiciones para usar las calculadoras y las páginas de consulta que se ofrecen aquí de forma gratuita. Usar el sitio implica aceptarlas.',
    sections: [
      {
        h2: 'Uso gratuito',
        body: [
          'Cualquiera puede usar el sitio gratis y sin registrarse. Los gastos se cubren con publicidad.',
          'Las herramientas pueden cambiar o desaparecer sin avisar, y el sitio puede quedar un rato inaccesible por mantenimiento o por una avería. No se promete que una función concreta siga disponible.',
        ],
      },
      {
        h2: 'Los resultados son estimaciones orientativas',
        body: [
          'Un resultado es una estimación hecha con fórmulas de uso común y cifras publicadas. Los importes reales dependen de la situación de cada persona, de la región y del momento en que se aplican las normas.',
          'Nada de lo que hay aquí es asesoramiento legal, médico, fiscal ni financiero, y nada sustituye el criterio de un profesional.',
        ],
      },
      {
        h2: 'Confirma las decisiones importantes',
        body: [
          'Cuando el resultado puede costarte dinero — nómina, impuestos, seguros, salud — sigue la confirmación del organismo competente o de un profesional.',
          'Si una cifra de aquí no coincide con la que te da un organismo, el organismo tiene razón. Avísanos y lo corregimos por este lado.',
        ],
      },
      {
        h2: 'Límites de responsabilidad',
        body: [
          'Se pone todo el empeño en que las cifras estén bien, pero no se garantiza su exactitud, su integridad ni su actualidad.',
          'En la medida en que la ley lo permita, no se asume responsabilidad por pérdidas derivadas de decisiones tomadas confiando en este sitio. Si avisas de un error, se corrige.',
        ],
      },
      {
        h2: 'Uso del contenido',
        body: [
          'El uso personal, poner un enlace y citar un resultado están permitidos. Al citar, indica la fuente y enlaza a la página de la que procede.',
          'Por favor, no hagas lo siguiente.',
        ],
        list: [
          'Extraer páginas de forma automática para reproducirlas en masa',
          'Volver a publicar el contenido del sitio tal cual en otra dirección',
          'Sobrecargar el servicio con peticiones automatizadas excesivas',
        ],
      },
      {
        h2: 'Enlaces externos y publicidad',
        body: [
          'El sitio contiene enlaces que llevan a otras páginas y muestra publicidad.',
          'No se asume responsabilidad por el contenido de esos sitios ni por las operaciones que hagas allí. Se aplican sus propios términos y sus políticas de privacidad.',
        ],
      },
      {
        h2: 'Si estos términos cambian',
        body: [
          'Cuando algo cambie, se edita esta página y se actualiza con ella la fecha de abajo.',
          'Seguir usando el sitio después de un cambio significa aceptar la nueva redacción.',
        ],
      },
      {
        h2: 'Ley aplicable',
        body: [
          'Estos términos se interpretan y aplican conforme a la legislación de la República de Corea, y los tribunales de la República de Corea son competentes para cualquier controversia.',
        ],
      },
    ],
  },

  pt: {
    title: 'Termos de Uso',
    description: 'As condições para usar as calculadoras e as páginas de consulta do vixutil. Os resultados são estimativas de referência e não constituem orientação jurídica, médica ou financeira.',
    h1: 'Termos de Uso',
    lead: 'Estas são as condições para usar as calculadoras e as páginas de consulta oferecidas aqui gratuitamente. Usar o site significa aceitá-las.',
    sections: [
      {
        h2: 'Uso gratuito',
        body: [
          'Qualquer pessoa pode usar o site de graça, sem cadastro. Os custos são cobertos por publicidade.',
          'As ferramentas podem mudar ou desaparecer sem aviso, e o site pode ficar um tempo fora do ar por manutenção ou por uma falha. Não há promessa de que um recurso específico continue disponível.',
        ],
      },
      {
        h2: 'Os resultados são estimativas de referência',
        body: [
          'Um resultado é uma estimativa feita com fórmulas conhecidas e valores publicados. Os montantes reais dependem da situação de cada pessoa, da região e do momento em que as regras valem.',
          'Nada aqui é orientação jurídica, médica, tributária ou financeira, e nada substitui o julgamento de um profissional.',
        ],
      },
      {
        h2: 'Confirme as decisões importantes',
        body: [
          'Quando o resultado pode custar caro — salário, impostos, seguros, saúde — siga a confirmação do órgão competente ou de um profissional.',
          'Se um valor daqui não bater com o que um órgão informa, o órgão está certo. Avise e o lado de cá é corrigido.',
        ],
      },
      {
        h2: 'Limites de responsabilidade',
        body: [
          'Há todo o esforço para acertar os valores, mas não se garante exatidão, integridade nem atualidade.',
          'Na medida em que a lei permitir, não se assume responsabilidade por prejuízos decorrentes de decisões tomadas com base neste site. Se você avisar de um erro, ele é corrigido.',
        ],
      },
      {
        h2: 'Uso do conteúdo',
        body: [
          'Uso pessoal, criar um link e citar um resultado são livres. Ao citar, indique a fonte e faça o link para a página de origem.',
          'Por favor, não faça o seguinte.',
        ],
        list: [
          'Raspar páginas automaticamente para reproduzi-las em massa',
          'Republicar o conteúdo do site do jeito que está em outro endereço',
          'Sobrecarregar o serviço com pedidos automatizados em excesso',
        ],
      },
      {
        h2: 'Links externos e publicidade',
        body: [
          'O site contém links que levam a outros sites e exibe publicidade.',
          'Não se assume responsabilidade pelo conteúdo desses sites nem pelas transações feitas lá. Valem os termos e as políticas de privacidade deles.',
        ],
      },
      {
        h2: 'Se estes termos mudarem',
        body: [
          'Quando algo mudar, esta página é editada e a data abaixo é atualizada junto.',
          'Continuar usando o site depois de uma mudança significa aceitar o novo texto.',
        ],
      },
      {
        h2: 'Lei aplicável',
        body: [
          'Estes termos são interpretados e aplicados conforme as leis da República da Coreia, e os tribunais da República da Coreia têm jurisdição sobre qualquer disputa.',
        ],
      },
    ],
  },

  ja: {
    title: '利用規約',
    description: 'vixutil の計算機と資料をどんな条件で使えるかを書いています。結果は参考のための概算であり、法律・医療・金融の助言ではありません。',
    h1: '利用規約',
    lead: '無料で提供している計算機と資料をどんな条件で使えるかを書いています。サイトを利用された場合、この内容に同意したものとみなします。',
    sections: [
      {
        h2: '無料で提供します',
        body: [
          '会員登録なしで誰でも無料で使えます。維持にかかる費用は広告でまかなっています。',
          '道具は予告なく変わったり無くなったりすることがあり、点検や障害で一時的に開けないこともあります。特定の機能が今後も提供され続けることを約束するものではありません。',
        ],
      },
      {
        h2: '結果は参考のための概算です',
        body: [
          '計算結果は、一般に知られた式と公開されている値から出した概算です。実際の金額や数値は、個々の事情、地域、適用される時期によって変わります。',
          'ここにあるものは法律・医療・税務・金融の助言ではなく、専門家の判断に代わるものでもありません。',
        ],
      },
      {
        h2: '大事な判断は確認を受けてください',
        body: [
          '給与、税、保険、健康のように結果次第で損害が生じうることは、関係機関や専門家の確認に従ってください。',
          'ここに出た数字と機関が示した数字が違う場合は、機関のほうが正しいです。お知らせいただければこちらを直します。',
        ],
      },
      {
        h2: '責任の範囲',
        body: [
          '値を合わせるために最善を尽くしていますが、正確性・完全性・最新性を保証するものではありません。',
          'このサイトの内容を信じて下した判断によって生じた損害について、法が許す範囲で責任を負いません。誤りをお知らせいただければ直します。',
        ],
      },
      {
        h2: 'コンテンツの利用',
        body: [
          '個人的に使うこと、リンクを張ること、結果を引用することは自由です。引用の際は出典を示し、そのページへリンクしてください。',
          'ただし次のことはお控えください。',
        ],
        list: [
          'ページを自動で取得して大量に複製すること',
          'サイトの内容をそのまま別のアドレスに載せること',
          '過度な自動リクエストで提供に負担をかけること',
        ],
      },
      {
        h2: '外部リンクと広告',
        body: [
          'このサイトには外部サイトへのリンクがあり、広告も掲載しています。',
          'それらのサイトの内容や、そこで行われる取引について責任を負いません。相手方の規約とプライバシーポリシーが適用されます。',
        ],
      },
      {
        h2: '規約を変えるとき',
        body: [
          '内容が変わったときはこのページを直し、下の更新日も一緒に繰り上げます。',
          '変更後も利用を続けられた場合、新しい内容に同意したものとみなします。',
        ],
      },
      {
        h2: '準拠法',
        body: [
          'この規約は大韓民国の法に従って解釈・適用され、紛争が生じた場合は大韓民国の裁判所を管轄とします。',
        ],
      },
    ],
  },

  de: {
    title: 'Nutzungsbedingungen',
    description: 'Zu welchen Bedingungen die Rechner und Nachschlage-Seiten von vixutil genutzt werden dürfen. Ergebnisse sind Schätzwerte zur Orientierung und keine rechtliche, medizinische oder finanzielle Beratung.',
    h1: 'Nutzungsbedingungen',
    lead: 'Hier stehen die Bedingungen für die kostenlos angebotenen Rechner und Nachschlage-Seiten. Wer die Seite nutzt, nimmt sie an.',
    sections: [
      {
        h2: 'Kostenlose Nutzung',
        body: [
          'Jede und jeder kann die Seite kostenlos nutzen, ohne Registrierung. Die laufenden Kosten trägt Werbung.',
          'Werkzeuge können sich ohne Vorankündigung ändern oder verschwinden, und die Seite kann wegen Wartung oder einer Störung kurz nicht erreichbar sein. Es wird nicht zugesagt, dass eine bestimmte Funktion erhalten bleibt.',
        ],
      },
      {
        h2: 'Ergebnisse sind Schätzwerte zur Orientierung',
        body: [
          'Ein Ergebnis ist ein Schätzwert aus allgemein bekannten Formeln und veröffentlichten Zahlen. Tatsächliche Beträge hängen von den persönlichen Umständen, der Region und dem Zeitpunkt der geltenden Regeln ab.',
          'Nichts hier ist rechtliche, medizinische, steuerliche oder finanzielle Beratung, und nichts ersetzt das Urteil einer Fachperson.',
        ],
      },
      {
        h2: 'Wichtige Entscheidungen bestätigen lassen',
        body: [
          'Wo das Ergebnis Geld kosten kann — Lohn, Steuern, Versicherung, Gesundheit —, gilt die Bestätigung der zuständigen Stelle oder einer Fachperson.',
          'Weicht eine Zahl hier von der Auskunft einer Behörde ab, hat die Behörde recht. Gib uns Bescheid, dann wird diese Seite korrigiert.',
        ],
      },
      {
        h2: 'Haftungsgrenzen',
        body: [
          'Es wird alles daran gesetzt, die Zahlen richtig zu halten; Richtigkeit, Vollständigkeit und Aktualität werden aber nicht garantiert.',
          'Soweit das Gesetz es zulässt, wird keine Haftung für Schäden aus Entscheidungen übernommen, die im Vertrauen auf diese Seite getroffen wurden. Melde einen Fehler, und er wird behoben.',
        ],
      },
      {
        h2: 'Nutzung der Inhalte',
        body: [
          'Private Nutzung, Verlinken und das Zitieren eines Ergebnisses sind frei. Beim Zitieren nenne die Quelle und verlinke die Seite, von der es kommt.',
          'Bitte unterlasse Folgendes.',
        ],
        list: [
          'Seiten automatisiert abgreifen, um sie massenhaft zu vervielfältigen',
          'Inhalte der Seite unverändert unter einer anderen Adresse veröffentlichen',
          'Den Dienst mit übermäßigen automatisierten Anfragen belasten',
        ],
      },
      {
        h2: 'Externe Links und Werbung',
        body: [
          'Die Seite enthält Links zu anderen Seiten und zeigt Werbung.',
          'Für die Inhalte jener Seiten und für Geschäfte, die dort zustande kommen, wird keine Verantwortung übernommen. Dort gelten die jeweiligen Bedingungen und Datenschutzerklärungen.',
        ],
      },
      {
        h2: 'Wenn sich diese Bedingungen ändern',
        body: [
          'Ändert sich etwas, wird diese Seite bearbeitet und das Datum unten mit hochgezogen.',
          'Wer die Seite nach einer Änderung weiter nutzt, nimmt die neue Fassung an.',
        ],
      },
      {
        h2: 'Anwendbares Recht',
        body: [
          'Diese Bedingungen werden nach dem Recht der Republik Korea ausgelegt und angewendet; für Streitigkeiten sind die Gerichte der Republik Korea zuständig.',
        ],
      },
    ],
  },

  fr: {
    title: 'Conditions d’utilisation',
    description: 'À quelles conditions utiliser les calculatrices et les pages de référence de vixutil. Les résultats sont des estimations indicatives et ne constituent pas un conseil juridique, médical ou financier.',
    h1: 'Conditions d’utilisation',
    lead: 'Voici les conditions d’usage des calculatrices et des pages de référence proposées gratuitement ici. Utiliser le site vaut acceptation.',
    sections: [
      {
        h2: 'Gratuit',
        body: [
          'Tout le monde peut utiliser le site gratuitement, sans inscription. Les frais sont couverts par la publicité.',
          'Les outils peuvent changer ou disparaître sans préavis, et le site peut être brièvement indisponible pour maintenance ou à cause d’une panne. Aucune fonction n’est garantie dans le temps.',
        ],
      },
      {
        h2: 'Les résultats sont des estimations indicatives',
        body: [
          'Un résultat est une estimation obtenue à partir de formules connues et de valeurs publiées. Les montants réels dépendent de la situation de chacun, de la région et de la période où les règles s’appliquent.',
          'Rien ici n’est un conseil juridique, médical, fiscal ou financier, et rien ne remplace le jugement d’un professionnel.',
        ],
      },
      {
        h2: 'Fais confirmer les décisions importantes',
        body: [
          'Quand le résultat peut coûter cher — salaire, impôts, assurance, santé — suis la confirmation de l’organisme compétent ou d’un professionnel.',
          'Si un chiffre d’ici diffère de ce qu’un organisme t’indique, c’est l’organisme qui a raison. Signale-le et ce côté sera corrigé.',
        ],
      },
      {
        h2: 'Limites de responsabilité',
        body: [
          'Tout est fait pour que les chiffres soient justes, mais l’exactitude, l’exhaustivité et l’actualité ne sont pas garanties.',
          'Dans la mesure permise par la loi, aucune responsabilité n’est acceptée pour les pertes issues de décisions prises en se fiant à ce site. Signale une erreur et elle sera corrigée.',
        ],
      },
      {
        h2: 'Utilisation du contenu',
        body: [
          'L’usage personnel, les liens et la citation d’un résultat sont libres. En citant, indique la source et fais un lien vers la page d’origine.',
          'Merci de ne pas faire ce qui suit.',
        ],
        list: [
          'Aspirer les pages automatiquement pour les reproduire en masse',
          'Republier le contenu du site tel quel à une autre adresse',
          'Charger le service avec des requêtes automatisées excessives',
        ],
      },
      {
        h2: 'Liens externes et publicité',
        body: [
          'Le site contient des liens vers d’autres sites et affiche de la publicité.',
          'Aucune responsabilité n’est prise quant au contenu de ces sites ni aux transactions qui y sont faites. Leurs propres conditions et politiques de confidentialité s’appliquent.',
        ],
      },
      {
        h2: 'Si ces conditions changent',
        body: [
          'En cas de changement, cette page est modifiée et la date ci-dessous avance avec elle.',
          'Continuer à utiliser le site après un changement vaut acceptation du nouveau texte.',
        ],
      },
      {
        h2: 'Droit applicable',
        body: [
          'Ces conditions sont interprétées et appliquées selon le droit de la République de Corée, et les tribunaux de la République de Corée sont compétents pour tout litige.',
        ],
      },
    ],
  },

  hi: {
    title: 'उपयोग की शर्तें',
    description: 'vixutil के कैलकुलेटर और संदर्भ पृष्ठ किन शर्तों पर उपयोग किए जा सकते हैं। परिणाम केवल संदर्भ के लिए अनुमान हैं और विधिक, चिकित्सीय या वित्तीय सलाह नहीं हैं।',
    h1: 'उपयोग की शर्तें',
    lead: 'यहाँ निःशुल्क दिए जा रहे कैलकुलेटर और संदर्भ पृष्ठों के उपयोग की शर्तें लिखी हैं। साइट का उपयोग करने का अर्थ है कि आपने इन्हें स्वीकार किया।',
    sections: [
      {
        h2: 'निःशुल्क उपलब्ध',
        body: [
          'कोई भी बिना पंजीकरण के इसे मुफ़्त उपयोग कर सकता है। चलाने का खर्च विज्ञापनों से पूरा होता है।',
          'उपकरण बिना सूचना बदल सकते हैं या हटाए जा सकते हैं, और रखरखाव या किसी ख़राबी के कारण साइट कुछ समय न खुले — यह भी हो सकता है। किसी विशेष सुविधा के आगे भी बने रहने का वादा नहीं किया जाता।',
        ],
      },
      {
        h2: 'परिणाम संदर्भ के लिए अनुमान हैं',
        body: [
          'परिणाम आम तौर पर ज्ञात सूत्रों और प्रकाशित मानों से निकाला गया अनुमान होता है। वास्तविक रक़म या संख्या व्यक्ति की स्थिति, क्षेत्र और नियम लागू होने के समय पर निर्भर करती है।',
          'यहाँ की कोई भी बात विधिक, चिकित्सीय, कर या वित्तीय सलाह नहीं है, और किसी विशेषज्ञ के निर्णय का स्थान नहीं लेती।',
        ],
      },
      {
        h2: 'महत्वपूर्ण निर्णय की पुष्टि कराएँ',
        body: [
          'जहाँ परिणाम से नुक़सान हो सकता है — वेतन, कर, बीमा, स्वास्थ्य — वहाँ संबंधित संस्था या विशेषज्ञ की पुष्टि का पालन करें।',
          'यहाँ दिया अंक और संस्था का बताया अंक भिन्न हों तो संस्था सही है। ऐसा हो तो बताएँ, इस ओर सुधार कर दिया जाएगा।',
        ],
      },
      {
        h2: 'उत्तरदायित्व की सीमा',
        body: [
          'मानों को सही रखने का पूरा प्रयास होता है, पर उनकी शुद्धता, पूर्णता और नवीनता की गारंटी नहीं दी जाती।',
          'इस साइट पर भरोसा करके लिए गए निर्णयों से हुई हानि के लिए, क़ानून जितनी छूट देता है उस सीमा तक, कोई उत्तरदायित्व स्वीकार नहीं किया जाता। ग़लती बताएँ, वह सुधारी जाएगी।',
        ],
      },
      {
        h2: 'सामग्री का उपयोग',
        body: [
          'व्यक्तिगत उपयोग, लिंक देना और परिणाम उद्धृत करना स्वतंत्र है। उद्धृत करते समय स्रोत बताएँ और उसी पृष्ठ का लिंक दें।',
          'कृपया निम्नलिखित न करें।',
        ],
        list: [
          'पृष्ठों को स्वतः खींचकर बड़े पैमाने पर प्रतिलिपि बनाना',
          'साइट की सामग्री जैसी है वैसी किसी दूसरे पते पर प्रकाशित करना',
          'अत्यधिक स्वचालित अनुरोधों से सेवा पर भार डालना',
        ],
      },
      {
        h2: 'बाहरी लिंक और विज्ञापन',
        body: [
          'इस साइट पर दूसरी साइटों की ओर जाने वाले लिंक हैं और विज्ञापन भी दिखते हैं।',
          'उन साइटों की सामग्री और वहाँ होने वाले लेन-देन के लिए कोई ज़िम्मेदारी नहीं ली जाती। वहाँ उनकी अपनी शर्तें और गोपनीयता नीतियाँ लागू होती हैं।',
        ],
      },
      {
        h2: 'ये शर्तें बदलने पर',
        body: [
          'कुछ बदलने पर यह पृष्ठ संपादित किया जाता है और नीचे दी तिथि भी साथ आगे बढ़ाई जाती है।',
          'बदलाव के बाद भी साइट का उपयोग जारी रखने का अर्थ है कि आपने नया पाठ स्वीकार किया।',
        ],
      },
      {
        h2: 'लागू विधि',
        body: [
          'ये शर्तें कोरिया गणराज्य की विधि के अनुसार समझी और लागू की जाती हैं, और किसी विवाद पर कोरिया गणराज्य के न्यायालयों का क्षेत्राधिकार होगा।',
        ],
      },
    ],
  },

  zh: {
    title: '使用条款',
    description: 'vixutil 的计算器和查阅页面可以在什么条件下使用。结果只是供参考的估算，不构成法律、医疗或金融方面的建议。',
    h1: '使用条款',
    lead: '这里写的是免费提供的计算器和查阅页面的使用条件。使用本站即视为同意这些内容。',
    sections: [
      {
        h2: '免费提供',
        body: [
          '任何人都可以免费使用，不需要注册。维持的开销靠广告。',
          '工具可能在没有预告的情况下变动或撤下，站点也可能因维护或故障短时间打不开。不承诺某项功能会一直保留。',
        ],
      },
      {
        h2: '结果是供参考的估算',
        body: [
          '计算结果是用通行的公式和公开的数值得出的估算。实际金额或数字会因个人情况、所在地区以及规则适用的时点而不同。',
          '这里的任何内容都不是法律、医疗、税务或金融建议，也不能代替专业人士的判断。',
        ],
      },
      {
        h2: '重要判断请去核实',
        body: [
          '工资、税费、保险、健康这类一旦算错就可能造成损失的事，请以有关机构或专业人士的确认为准。',
          '本站的数字和机构告知的数字不一致时，机构那边是对的。告诉我们，这边会改。',
        ],
      },
      {
        h2: '责任范围',
        body: [
          '我们尽力让数值准确，但不保证其准确性、完整性和及时性。',
          '因信赖本站内容而做出的决定所产生的损失，在法律允许的范围内不承担责任。发现错误请告知，我们会更正。',
        ],
      },
      {
        h2: '内容的使用',
        body: [
          '自己使用、加链接、引用结果都可以。引用时请注明出处并链接到对应页面。',
          '但请不要做下面这些事。',
        ],
        list: [
          '用程序自动抓取页面并大量复制',
          '把本站内容原样搬到别的网址上发布',
          '用过量的自动请求给服务造成负担',
        ],
      },
      {
        h2: '外部链接与广告',
        body: [
          '本站有通向其他网站的链接，也刊载广告。',
          '对那些网站的内容以及在那里发生的交易不承担责任，适用的是对方的条款和隐私政策。',
        ],
      },
      {
        h2: '本条款变更时',
        body: [
          '内容有变时会修改本页，并把下面的更新日期一起往前挪。',
          '变更之后继续使用本站，即视为同意新的内容。',
        ],
      },
      {
        h2: '适用法律',
        body: [
          '本条款依大韩民国法律解释和适用，发生争议时以大韩民国法院为管辖法院。',
        ],
      },
    ],
  },

  tw: {
    title: '使用條款',
    description: 'vixutil 的計算機和查閱頁面可以在什麼條件下使用。結果只是供參考的估算，不構成法律、醫療或金融方面的建議。',
    h1: '使用條款',
    lead: '這裡寫的是免費提供的計算機和查閱頁面的使用條件。使用本站即視為同意這些內容。',
    sections: [
      {
        h2: '免費提供',
        body: [
          '任何人都可以免費使用，不需要註冊。維持的開銷靠廣告。',
          '工具可能在沒有預告的情況下變動或撤下，網站也可能因維護或故障短時間打不開。不承諾某項功能會一直保留。',
        ],
      },
      {
        h2: '結果是供參考的估算',
        body: [
          '計算結果是用通行的公式和公開的數值得出的估算。實際金額或數字會因個人情況、所在地區以及規則適用的時點而不同。',
          '這裡的任何內容都不是法律、醫療、稅務或金融建議，也不能代替專業人士的判斷。',
        ],
      },
      {
        h2: '重要判斷請去查證',
        body: [
          '薪資、稅費、保險、健康這類一旦算錯就可能造成損失的事，請以有關機構或專業人士的確認為準。',
          '本站的數字和機構告知的數字不一致時，機構那邊是對的。告訴我們，這邊會改。',
        ],
      },
      {
        h2: '責任範圍',
        body: [
          '我們盡力讓數值準確，但不保證其準確性、完整性和及時性。',
          '因信賴本站內容而做出的決定所產生的損失，在法律允許的範圍內不承擔責任。發現錯誤請告知，我們會更正。',
        ],
      },
      {
        h2: '內容的使用',
        body: [
          '自己使用、加連結、引用結果都可以。引用時請註明出處並連結到對應頁面。',
          '但請不要做下面這些事。',
        ],
        list: [
          '用程式自動抓取頁面並大量複製',
          '把本站內容原樣搬到別的網址上發布',
          '用過量的自動請求給服務造成負擔',
        ],
      },
      {
        h2: '外部連結與廣告',
        body: [
          '本站有通往其他網站的連結，也刊載廣告。',
          '對那些網站的內容以及在那裡發生的交易不承擔責任，適用的是對方的條款和隱私權政策。',
        ],
      },
      {
        h2: '本條款變更時',
        body: [
          '內容有變時會修改本頁，並把下面的更新日期一起往前挪。',
          '變更之後繼續使用本站，即視為同意新的內容。',
        ],
      },
      {
        h2: '適用法律',
        body: [
          '本條款依大韓民國法律解釋和適用，發生爭議時以大韓民國法院為管轄法院。',
        ],
      },
    ],
  },
};
