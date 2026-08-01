import type { DreamCopy } from './types.ts';

/** 프랑스어 꿈해몽 */
export const FR: DreamCopy = {
  categories: {
    Animals: 'Animaux', Body: 'Corps', Movement: 'Mouvement', Nature: 'Nature',
    Objects: 'Objets', People: 'Personnes', Places: 'Lieux', Situations: 'Situations',
  },
  luck: { '2': 'Très bon', '1': 'Bon', '0': 'Neutre', '-1': 'Prudence', '-2': 'Avertissement' },
  ui: {
    title: 'Dictionnaire des rêves',
    lead: 'Vingt symboles oniriques que l’on retrouve d’une culture à l’autre, et comment on les lit habituellement',
    search: 'Chercher un symbole…',
    all: 'Tous',
    none: 'Aucun résultat pour cette recherche.',
    note: 'L’interprétation des rêves n’a aucune validité scientifique. Ce qui est décrit ici, c’est la lecture traditionnelle de ces symboles et les situations dans lesquelles on les rapporte — pas une prédiction.',
  },
  entries: {
    falling: {
      keyword: 'Tomber', summary: 'Une perte de contrôle quelque part dans la vie éveillée',
      detail: [
        'Les rêves de chute apparaissent en général quand quelque chose vous échappe : un poste, une relation, une décision qu’on vous a prise.',
        'Le détail qui compte est ce qui se passe pendant la chute. Atterrir sans dommage, ou se réveiller avant l’impact, se lit comme une situation surmontable.',
        'Ils comptent parmi les rêves les plus fréquents et se concentrent dans les périodes de changement plutôt que d’annoncer quoi que ce soit.',
      ],
    },
    teeth: {
      keyword: 'Perdre ses dents', summary: 'L’inquiétude sur la manière dont on vous voit',
      detail: [
        'Les dents qui tombent comptent parmi les rêves les plus rapportés au monde, et cela se rattache d’ordinaire au souci de l’apparence, de l’âge ou de l’impression donnée.',
        'Il apparaît souvent avant une situation où vous serez évalué : une présentation, un entretien, une première rencontre.',
        'Certaines traditions y lisent des nouvelles de la famille. La lecture de l’angoisse est la plus courante et colle en général mieux.',
      ],
    },
    flying: {
      keyword: 'Voler', summary: 'La liberté, ou l’envie qu’on en a',
      detail: [
        'Les rêves de vol se lisent comme un sentiment de relâchement : d’une contrainte, d’un rôle ou d’une période qui pesait.',
        'Voler haut et sans effort est la forme positive. Peiner à se maintenir, ou ne pas décoller, indique quelque chose qui vous retient encore.',
        'On les rapporte souvent pendant ou juste après la fin d’une passe difficile.',
      ],
    },
    chased: {
      keyword: 'Être poursuivi', summary: 'Quelque chose que vous évitez',
      detail: [
        'Être poursuivi se lit généralement comme de l’évitement : une conversation, une décision ou une émotion que vous fuyez.',
        'Ce qui vous poursuit compte moins que le fait que vous couriez. Se retourner pour faire face dans le rêve est souvent rapporté comme le moment où les choses basculent.',
        'Ces rêves reviennent tant que la chose évitée reste non réglée, et cessent en général une fois qu’on s’en occupe.',
      ],
    },
    water: {
      keyword: 'L’eau', summary: 'L’état de vos émotions',
      detail: [
        'L’eau se lit comme l’émotion, et son état est la lecture. Une eau claire et calme suggère que les choses sont posées ; trouble ou agitée, l’inverse.',
        'L’eau profonde est souvent associée à ce que vous n’avez pas complètement regardé. Y être à l’aise est bon signe.',
        'L’inondation apparaît surtout quand le ressenti s’est accumulé plus vite qu’il ne pouvait être digéré.',
      ],
    },
    snake: {
      keyword: 'Un serpent', summary: 'Transformation, ou une inquiétude cachée',
      detail: [
        'Les serpents portent deux lectures à la fois : renouvellement, parce qu’ils muent, et menace, parce que ce sont des serpents. Laquelle s’applique dépend du ressenti du rêve.',
        'Un serpent calme se lit d’ordinaire comme un changement déjà engagé. Un serpent menaçant renvoie à quelque chose que vous pressentez sans l’avoir nommé.',
        'La couleur compte dans plusieurs traditions : les serpents dorés ou blancs se lisent bien plus positivement que les sombres.',
      ],
    },
    house: {
      keyword: 'Une maison', summary: 'Vous-même, en forme de bâtiment',
      detail: [
        'Une maison en rêve se lit couramment comme le soi, chaque pièce représentant une partie différente de votre vie.',
        'Découvrir une pièce dont on ignorait l’existence est l’une des variantes les plus rapportées, lue comme la découverte d’une capacité inutilisée.',
        'Une maison en mauvais état renvoie plutôt à quelque chose de négligé qu’au bâtiment lui-même.',
      ],
    },
    death: {
      keyword: 'La mort', summary: 'Une fin, pas une prédiction',
      detail: [
        'Les rêves de mort se lisent presque universellement comme des fins et des transitions, non comme des avertissements littéraux.',
        'Rêver de sa propre mort se lit en général comme une phase qui se referme : un poste, une relation, une version de soi.',
        'Ces rêves se concentrent autour de vrais changements de vie, ce qui explique qu’ils paraissent importants même si la lecture littérale n’est pas la bonne.',
      ],
    },
    baby: {
      keyword: 'Un bébé', summary: 'Quelque chose de neuf qui commence',
      detail: [
        'Les bébés se lisent comme des commencements : un projet, une relation, une version de votre vie qui démarre.',
        'S’occuper du bébé sans peine est la forme positive. Le perdre ou l’oublier indique quelque chose de neuf auquel vous n’accordez pas assez d’attention.',
        'Ils sont fréquents lors de périodes de responsabilité réellement nouvelle, qu’il y ait des enfants ou non.',
      ],
    },
    money: {
      keyword: 'L’argent', summary: 'Valeur et estime de soi',
      detail: [
        'L’argent en rêve parle moins de finances concrètes que de la valeur que vous vous accordez.',
        'Trouver de l’argent est associé au fait de reconnaître quelque chose que vous aviez déjà. En perdre renvoie au sentiment d’être sous-estimé.',
        'Les traditions divergent nettement ici : le ressenti dans le rêve est un meilleur guide que n’importe quel sens fixe.',
      ],
    },
    exam: {
      keyword: 'Un examen', summary: 'Se sentir testé ou mal préparé',
      detail: [
        'Les rêves d’examen — non préparé, en retard, dans la mauvaise salle — comptent parmi les rêves d’angoisse les plus courants et persistent des décennies après l’école.',
        'Ils apparaissent typiquement avant une situation où vous serez jugé, pas avant de vrais examens.',
        'La version récurrente correspond en général à une situation précise où vous vous sentez évalué.',
      ],
    },
    naked: {
      keyword: 'Être nu en public', summary: 'La peur d’être vu tel qu’on est',
      detail: [
        'Être exposé en public se lit comme de la vulnérabilité : la crainte que quelque chose de vous soit vu avant que vous soyez prêt.',
        'Que personne ne réagisse dans le rêve est un détail fréquent, généralement lu comme : la peur est plus grande que la réalité.',
        'Ces rêves surviennent souvent avant quelque chose de réellement exposant : un nouveau poste, une prise de parole, une relation qui devient sérieuse.',
      ],
    },
    fire: {
      keyword: 'Le feu', summary: 'L’intensité — créatrice ou destructrice',
      detail: [
        'Le feu porte les deux lectures : la passion et l’élan d’un côté, la destruction et la colère de l’autre.',
        'Un feu maîtrisé se lit positivement — de l’énergie mise à profit. Un feu incontrôlé indique quelque chose qui vous échappe.',
        'Dans plusieurs traditions, le feu est spécifiquement associé à la richesse et au changement rapide.',
      ],
    },
    lost: {
      keyword: 'Être perdu', summary: 'L’incertitude sur la direction',
      detail: [
        'Être perdu se lit comme une incertitude sur la direction que vous prenez, au travail ou dans la vie en général.',
        'Des lieux familiers devenus étrangers sont une variante fréquente, qui renvoie d’ordinaire à une situation qui a changé sous vos pieds.',
        'Retrouver son chemin dans le rêve est rapporté comme un tournant plus souvent qu’autrement.',
      ],
    },
    cat: {
      keyword: 'Un chat', summary: 'L’indépendance, et ce que vous gardez pour vous',
      detail: [
        'Les chats se lisent couramment comme l’indépendance et l’intuition, et parfois comme les parts de vous que vous gardez pour vous.',
        'Un chat amical se lit positivement. Un chat agressif est souvent associé à une relation où quelque chose n’est pas dit.',
        'Les traditions varient beaucoup au sujet des chats, plus que pour presque n’importe quel autre animal.',
      ],
    },
    bird: {
      keyword: 'Des oiseaux', summary: 'Des nouvelles, ou l’envie d’être ailleurs',
      detail: [
        'Les oiseaux se lisent largement comme des messages et comme la liberté, selon qu’ils arrivent ou qu’ils partent.',
        'Un oiseau en cage est un symbole fort et constant d’une tradition à l’autre — quelque chose en vous qu’on ne laisse pas sortir.',
        'Les nuées sont souvent associées à des nouvelles qui arrivent, parfois de loin.',
      ],
    },
    mountain: {
      keyword: 'Une montagne', summary: 'Un obstacle, ou une ambition',
      detail: [
        'Les montagnes se lisent comme quelque chose de grand devant vous — cela peut être un obstacle ou un but, et souvent les deux.',
        'Grimper est la forme positive. Rester au pied sans pouvoir commencer renvoie à quelque chose qui semble hors de portée.',
        'Atteindre le sommet est l’une des images de rêve les plus constamment positives d’une tradition à l’autre.',
      ],
    },
    mirror: {
      keyword: 'Un miroir', summary: 'La façon dont vous vous voyez',
      detail: [
        'Les miroirs se lisent comme la perception de soi — comment vous vous voyez, non comment les autres vous voient.',
        'Un reflet déformé ou flou est généralement associé à une incertitude sur l’identité ou la direction.',
        'Les miroirs brisés traînent la superstition du malheur ; en lecture onirique, ils renvoient plus souvent à une image de soi fêlée qu’à une malchance.',
      ],
    },
    rain: {
      keyword: 'La pluie', summary: 'Le relâchement, et ce qui vient après',
      detail: [
        'La pluie se lit comme relâchement et lavage — elle apparaît le plus souvent après une période émotionnellement lourde, pas avant.',
        'Une pluie douce se lit positivement. Un orage renvoie à quelque chose d’encore non réglé.',
        'Être à l’abri ou rester sous la pluie : c’est le détail sur lequel tourne la plupart des lectures.',
      ],
    },
    road: {
      keyword: 'Une route', summary: 'Le chemin sur lequel vous êtes',
      detail: [
        'Les routes se lisent comme la direction de vie, les bifurcations représentant des décisions dont vous avez conscience mais que vous différez peut-être.',
        'Une route dégagée devant soi est simplement positive. Une route bloquée ou qui s’arrête renvoie à un plan à repenser.',
        'Qui voyage avec vous est souvent le détail le plus parlant.',
      ],
    },
  },
};
