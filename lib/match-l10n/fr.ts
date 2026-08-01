import type { MatchCopy } from './types.ts';

/** 프랑스어 궁합 문구 */
export const FR: MatchCopy = {
  zodiac: {
    yukhap: {
      label: 'Paire parfaite (Six Harmonies)', headline: 'La combinaison qui s’attire',
      reason: 'Dans l’horoscope chinois, ces deux-là forment une paire des Six Harmonies : l’association classique, où chacun couvre ce qui manque à l’autre.',
      love: 'L’attirance vient facilement et être ensemble paraît naturel. Vous vous ajustez l’un à l’autre sans effort.',
      advice: 'Quand cela s’emboîte aussi bien, on finit par le tenir pour acquis. Ce qui tient, ce sont les petits gestes réguliers.',
    },
    samhap: {
      label: 'Très bonne entente (Trois Harmonies)', headline: 'Du même trio — vous vous entendez, tout simplement',
      reason: 'Ces deux-là appartiennent au même groupe des Trois Harmonies, un trio que la tradition lit comme naturellement accordé dans sa manière de voir.',
      love: 'Vos valeurs coïncident, ce qui en fait une bonne entente sur la durée. Vous finissez aussi à l’aise qu’entre amis.',
      advice: 'Plus le lien est facile, plus les égards comptent. Ne laissez pas la familiarité devenir de l’inattention.',
    },
    same: {
      label: 'Miroir', headline: 'Assez semblables pour que ce soit facile — et pour se heurter',
      reason: 'Même signe, donc des tempéraments proches. Vous vous comprenez bien et vous butez sur les mêmes choses.',
      love: 'Il y aura beaucoup de moments où rien n’a besoin d’être dit. Mais vous partagez peut-être le même angle mort.',
      advice: 'Profitez de ce qui vous rassemble et convenez de vous couvrir là où vous êtes faibles tous les deux.',
    },
    neutral: {
      label: 'Entente stable', headline: 'Bien tant que vous vous rejoignez à mi-chemin',
      reason: 'Aucune relation traditionnelle particulière ici — c’est là que se trouvent la plupart des paires. Tout dépend de la façon dont vous vous traitez.',
      love: 'Cela peut sembler ordinaire au début, puis vous gagner. Cela s’approfondit si vous ne rationnez pas l’affection.',
      advice: 'Dites tout haut ce que vous attendez. Accorder le rythme, c’est tout.',
    },
    clash: {
      label: 'Demande du travail', headline: 'Signes opposés — la friction vient toute seule',
      reason: 'Ces deux-là se font face dans le cycle, une paire de choc. Il y aura des accrochages, mais aussi beaucoup à apprendre de la différence.',
      love: 'Vous pourriez vous chamailler au début. Acceptez les différences et vous devenez un couple qui se fait grandir.',
      advice: 'La clé est de ne pas lire « différent » comme « faux ». Un pas chacun et le choc devient alchimie.',
    },
  },
  star: {
    'same-element': {
      label: 'Paire parfaite (même élément)', headline: 'Même longueur d’onde — parler est facile',
      reason: 'Les deux signes partagent un élément, donc vous recevez le monde de la même façon et vous vous comprenez vite.',
      love: 'Le terrain commun est large et la conversation coule. Cela avance confortablement, avec peu de friction.',
      advice: 'Se ressembler autant peut tourner à l’habitude. Créez exprès de nouvelles expériences ensemble.',
    },
    complement: {
      label: 'Très bonne entente (éléments complémentaires)', headline: 'Vous vous élevez mutuellement',
      reason: 'Ces éléments se complètent (feu↔air, terre↔eau) : chacun fournit ce qui manque à l’autre.',
      love: 'L’un apporte la chaleur, l’autre le calme. Vous êtes à la fois stimulation et repos l’un pour l’autre.',
      advice: 'La différence est l’attrait. Savourez la manière de l’autre plutôt que d’essayer de la changer.',
    },
    'same-sign': {
      label: 'Miroir', headline: 'Assez semblables pour que ce soit facile — défauts compris',
      reason: 'Même signe, même tempérament. Confortable, mais vous partagez peut-être l’angle mort et devez vous couvrir.',
      love: 'Goûts et rythmes concordent, donc c’est facile dès le départ. Vous êtes peut-être seulement maladroits aux mêmes endroits.',
      advice: 'Profitez de ce qui vous rassemble et convenez d’avance de qui prend ce qu’aucun des deux ne sait bien faire.',
    },
    challenge: {
      label: 'Demande du travail', headline: 'Éléments différents — il faut se retrouver au milieu',
      reason: 'Des éléments différents peuvent frotter au début. Mais plus vous partez de loin, plus il y a à apprendre l’un de l’autre.',
      love: 'Vous pourriez vous chamailler au début. Respectez la différence et cela devient le genre de relation qui dure.',
      advice: 'Ne lisez pas « différent » comme « faux ». Faites un pas l’un vers l’autre et la friction devient alchimie.',
    },
  },
  mbti: {
    best: {
      label: 'Paire parfaite', headline: 'Vous voyez les choses pareil et vous vous complétez',
      reason: '',
      love: 'Valeurs et conversation s’accordent, donc c’est calme et stimulant à la fois. Vous devenez le point d’atterrissage l’un de l’autre.',
      advice: 'Quand cela s’emboîte aussi bien, on finit par le tenir pour acquis. Ce qui tient, ce sont les petits gestes réguliers.',
    },
    good: {
      label: 'Bonne entente', headline: 'La conversation vient toute seule',
      reason: '',
      love: 'Vous vous recoupez sur beaucoup de points, ce qui rend les échanges agréables. Les différences semblent rafraîchissantes plutôt que pénibles.',
      advice: 'Savourez ce qui se recoupe et acceptez les différences au lieu de les corriger.',
    },
    ok: {
      label: 'Entente stable', headline: 'Suffisant si vous vous rejoignez à mi-chemin',
      reason: '',
      love: 'Il faut un réglage au début, puis cela gagne à mesure que vous vous découvrez.',
      advice: 'Dites clairement vos attentes et les malentendus tombent. Accorder le rythme, c’est tout.',
    },
    work: {
      label: 'Demande du travail', headline: 'Assez différents pour avoir beaucoup à apprendre',
      reason: '',
      love: 'Beaucoup de différences, donc attendez-vous à quelques accrochages au début. Respectez-les et vous grandissez ensemble.',
      advice: 'Lisez-le comme « différent », pas « faux ». Un pas l’un vers l’autre et la friction devient alchimie.',
    },
  },
  axis: {
    nsSame: 'Vous recevez le monde de la même façon (N/S), donc la conversation porte',
    nsDiff: 'Vous recevez le monde différemment (N/S), donc vos perspectives peuvent diverger',
    tfSame: 'Votre base de décision (T/F) se ressemble aussi, ce qui fluidifie les choix',
    tfDiff: 'Votre base de décision (T/F) diffère, ce qui crée de la friction mais aussi de l’équilibre',
    eiDiff: 'Votre énergie va dans des directions opposées (E/I), donc vous vous rechargez le rythme',
    jpDiff: 'Vous vivez différemment (J/P), mêlant souplesse et planification',
    join: '. ', end: '.',
  },
  blood: {
    'A-A': {
      label: 'Calme et stable', headline: 'Deux personnes qui se lisent facilement',
      reason: 'Vous êtes tous deux attentifs et prévenants, donc vous captez vite l’humeur de l’autre. Cela roule sans gros conflit.',
      love: 'Une romance soigneuse qui s’approfondit avec le temps. Elle dure si vous ne rationnez pas l’affection.',
      advice: 'Vous avez tous deux tendance à ravaler. Dites ce qui a piqué sur le moment plutôt que de le stocker.',
    },
    'A-B': {
      label: 'Les opposés s’attirent', headline: 'Attirés par ce que l’autre possède',
      reason: 'Le prudent A et le libre B sont des personnes assez différentes. Au début, cette différence se lit comme un attrait neuf.',
      love: 'L’un apporte l’organisation, l’autre la spontanéité — on s’ennuie rarement.',
      advice: 'Cela marche si A ne lit pas la liberté de B comme une menace, et si B ne lit pas le soin de A comme un reproche.',
    },
    'A-O': {
      label: 'Entente solide', headline: 'Le O détendu fait de la place au A méticuleux',
      reason: 'Le généreux O enveloppe confortablement le A soucieux du détail. Chacun couvre ce qui manque à l’autre.',
      love: 'O mène, A veille aux détails, et cela s’installe dans quelque chose de stable.',
      advice: 'O ne devrait pas laisser passer les petits signaux de A ; A peut s’appuyer un peu plus sur O.',
    },
    'A-AB': {
      label: 'Accordés en silence', headline: 'Deux personnes sensibles qui se comprennent',
      reason: 'Vous êtes tous deux sensibles et tournés vers l’intérieur, donc vous reconnaissez ce que l’autre ressent vraiment.',
      love: 'Une romance paisible, avec beaucoup de moments qui n’ont pas besoin d’explication.',
      advice: 'C’est plus simple si A n’analyse pas à l’excès le côté plus insaisissable de AB.',
    },
    'B-B': {
      label: 'Esprits libres', headline: 'Deux personnes qui respectent l’espace de l’autre',
      reason: 'Vous avez tous deux un moi affirmé et détestez être ligotés. Reconnaissez le monde de l’autre et cela reste confortable.',
      love: 'Une romance détendue où chacun fait son affaire et où vous revenez quand même.',
      advice: 'Savourez la liberté, mais continuez à exprimer les choses pour que cela ne dérive pas vers l’indifférence.',
    },
    'B-O': {
      label: 'Beaucoup d’énergie', headline: 'Être ensemble est simplement agréable',
      reason: 'Le libre B et le sociable O maintiennent l’ambiance vivante. Vous jouez bien ensemble et parlez facilement.',
      love: 'Un couple actif qui préfère faire des choses plutôt que rester en place.',
      advice: 'Vous poussez fort tous les deux, donc vous vous heurterez parfois. Un pas chacun et vous formez une sacrée paire.',
    },
    'B-AB': {
      label: 'Ça fait des étincelles', headline: 'Deux originaux qui ne manquent jamais d’idées',
      reason: 'Le libre B et l’inventif AB se renvoient la balle. Vous trouvez les manies de l’autre amusantes.',
      love: 'Une histoire à part, menée entièrement selon vos propres règles.',
      advice: 'Vous pouvez être changeants tous les deux : verrouillez les plans qui comptent vraiment.',
    },
    'O-O': {
      label: 'Parlent franc', headline: 'Honnêtes, chaleureux et vite passés à autre chose',
      reason: 'Vous êtes tous deux larges d’esprit et directs, rien ne mijote. Vous le dites et c’est fini.',
      love: 'L’expression directe signifie moins de malentendus, et aucune demi-mesure.',
      advice: 'Aucun de vous n’aime perdre. Sautez les concours d’orgueil et vous êtes une paire fiable.',
    },
    'O-AB': {
      label: 'Complémentaires', headline: 'La chaleur et la tête froide ensemble',
      reason: 'Le sociable O et le rationnel AB comblent les manques de l’autre. L’équilibre tient bien.',
      love: 'La chaleur de O et la lucidité de AB vous donnent stabilité et stimulation à la fois.',
      advice: 'Cela dure tant que O ne prend pas pour lui le besoin de distance de AB.',
    },
    'AB-AB': {
      label: 'Accord rare', headline: 'Deux personnes atypiques qui se reconnaissent',
      reason: 'Vous êtes tous deux originaux et difficiles à prévoir — les autres peuvent trouver cela compliqué, mais vous vous suivez sans effort.',
      love: 'Une relation qui tourne sur un code que vous seuls savez lire.',
      advice: 'Vous pouvez tous deux osciller émotionnellement. Dissipez souvent les malentendus, avec des mots simples.',
    },
  },
  ui: {
    pickBoth: 'Choisissez les deux côtés pour voir le résultat',
    you: 'Vous', partner: 'L’autre',
    score: 'Compatibilité',
    why: 'Pourquoi',
    love: 'En couple',
    advice: 'Conseil',
    reset: 'Recommencer',
    disclaimer: 'La compatibilité indiquée suit des règles traditionnelles et relève du divertissement. Ce qui décide vraiment d’une relation, c’est la façon dont deux personnes se traitent.',
  },
};
