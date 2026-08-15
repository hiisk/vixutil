import type { TopicCopy } from './types.ts';

/* Français. Hors du monde des hanja, le système se cherche sous « Quatre Piliers du
   destin » ou « BaZi » — les deux figurent dans les titres et les leads. Le vocabulaire
   suit lib/saju-l10n/fr.ts : étoile d’autorité (官星), de ressource (印星), de richesse (財星). */
export const FR: TopicCopy = {
  title: {
    love: 'Lecture de l’amour en BaZi',
    job: 'Lecture de l’emploi en BaZi',
    career: 'Lecture du changement de poste en BaZi',
    promotion: 'Lecture de la promotion en BaZi',
    money: 'Lecture de l’argent en BaZi',
    health: 'Lecture de la santé en BaZi',
    study: 'Lecture des études en BaZi',
  },
  lead: {
    love: 'Lit dans les Quatre Piliers du destin (BaZi) le palais du conjoint (branche du jour), l’étoile du partenaire et la Fleur de Pêcher (桃花殺) pour montrer par quel chemin l’amour vous arrive.',
    job: 'Lit les étoiles d’autorité (官星), les étoiles de ressource (印星) et votre branche du mois — le palais du métier — pour montrer quel type d’organisation convient à vos Quatre Piliers du destin.',
    career: 'Lit le Cheval Voyageur (驛馬) et les points de bascule de vos piliers de chance pour montrer si, dans votre BaZi, l’année est à bouger ou à rester.',
    promotion: 'Lit l’Autorité droite (正官) et le cycle autorité-ressource (官印相生) pour montrer comment le rang s’ouvre à l’intérieur d’une organisation dans les Quatre Piliers du destin (BaZi).',
    money: 'Lit les étoiles de richesse (財星) et le cycle production-vers-richesse (食傷生財) pour montrer par où l’argent entre dans votre BaZi et par où il fuit.',
    health: 'Lit l’excès et le manque à travers les cinq éléments des Quatre Piliers du destin (BaZi) pour montrer quelle partie du corps fatigue en premier.',
    study: 'Lit les étoiles de ressource (印星) et l’Étoile Littéraire (文昌貴人) pour montrer comment se passent l’étude et les examens dans votre BaZi.',
  },
  terms: {
    spouseSeat: 'Palais du conjoint (branche du jour)',
    careerSeat: 'Palais du métier (branche du mois)',
    authStar: 'Étoile d’autorité (官星)',
    wealthStar: 'Étoile de richesse (財星)',
    resourceStar: 'Étoile de ressource (印星)',
    authCount: 'Étoiles d’autorité',
    wealthCount: 'Étoiles de richesse',
    resourceCount: 'Étoiles de ressource',
    selfCount: 'Groupe du soi (比劫)',
    peach: 'Fleur de Pêcher (桃花殺)',
    yongma: 'Cheval Voyageur (驛馬殺)',
    daewoonNow: 'Pilier de chance actuel (大運)',
    gwanIn: 'Cycle autorité-ressource (官印相生)',
    sanggwan: 'Heurt avec l’autorité (傷官見官)',
    siksangSaengJae: 'La production nourrit la richesse (食傷生財)',
    munchang: 'Étoile Littéraire (文昌貴人)',
    missingEl: 'Élément absent',
    dominantEl: 'Élément le plus fort',
    missingCount: 'Éléments manquants',
    strength: 'Force du Maître du Jour',
  },
  faqCommon: [
    {
      q: 'Cette lecture BaZi est-elle vraiment gratuite ?',
      a: 'Oui. Pas d’inscription, pas de connexion, aucune étape de paiement. Tout le thème est calculé dans votre navigateur, et vos données de naissance comme votre prénom ne sont jamais envoyés à un serveur.',
    },
    {
      q: 'Et si je ne connais pas mon heure de naissance ?',
      a: 'Vous pouvez tout de même lire le thème. Laissez l’heure vide et il est dressé sur trois piliers — année, mois et jour — au lieu de quatre. Le pilier de l’heure couvre le conjoint, les enfants et la fin de vie : donner une heure rend donc la lecture plus précise. Quand vous en donnez une, elle est corrigée en heure solaire réelle et selon l’heure d’été de l’époque avant que le pilier soit posé.',
    },
  ],
  faqTopic: {
    love: {
      q: 'Sur quoi le BaZi s’appuie-t-il pour l’amour ?',
      a: 'Sur la branche du jour — le palais du conjoint — et sur votre étoile de partenaire. Chez une femme, c’est l’étoile d’autorité (官星) qui marque le partenaire ; chez un homme, l’étoile de richesse (財星). La Fleur de Pêcher (桃花殺) indique le charme qui attire en premier. Cette page lit l’amour d’une seule personne ; confronter deux thèmes est une lecture de compatibilité distincte.',
    },
    job: {
      q: 'Le BaZi peut-il dire quel métier me convient ?',
      a: 'Il montre la forme de travail qui convient, pas un employeur précis. Une étoile d’autorité (官星) forte réussit là où les règles et le rang sont nets ; une étoile de production (食傷) forte réussit mieux là où l’expression et l’invention sont l’essentiel. La branche du mois se lit comme palais du métier et décrit le milieu de travail autour de vous.',
    },
    career: {
      q: 'Le BaZi peut-il dire quand changer de poste ?',
      a: 'Il lit le moment, pas le résultat. Le Cheval Voyageur (驛馬殺) marque un thème qui se dénoue par le mouvement, et l’année où bascule un pilier de chance (大運) est le pivot structurel. Cette page affiche votre pilier de chance actuel et la présence ou non du Cheval Voyageur, pour que vous les pesiez avec votre préparation réelle.',
    },
    promotion: {
      q: 'En quoi la promotion diffère-t-elle du métier en BaZi ?',
      a: 'Ce ne sont pas les mêmes caractères qui se lisent. Le travail qui vous convient est décidé par les étoiles de production et de richesse, mais l’ouverture d’un rang au-dessus de vous est décidée par l’Autorité droite (正官). Quand une étoile de ressource s’y joint et forme le 官印相生, le poste arrive par nomination plutôt qu’en forçant. Le cas inverse, le 傷官見官, est le heurt du Talent rebelle avec l’autorité, où une position bâtie sur des années peut se défaire.',
    },
    money: {
      q: 'Sans étoile de richesse, suis-je incapable de gagner de l’argent ?',
      a: 'Non. Cela veut dire que l’argent vous parvient par une autre voie. Quand l’étoile de production nourrit l’étoile de richesse — la configuration 食傷生財 — la capacité se convertit directement en revenu. Sans étoile de richesse, la meilleure voie est de transformer le savoir et le métier en valeur. Un groupe du soi (比劫) lourd signifie que l’argent qui entre repart aussi, et la gestion devient alors décisive.',
    },
    health: {
      q: 'Un thème BaZi peut-il diagnostiquer une maladie ?',
      a: 'Non, et il ne doit jamais servir à cela. La lecture de santé regarde le déséquilibre des cinq éléments — quel élément manque et lequel est en excès — et nomme les organes que la tradition leur associe, pour désigner l’endroit où vous risquez d’en faire trop. Si quelque chose ne va pas, consultez un médecin.',
    },
    study: {
      q: 'Que regarde le BaZi pour l’étude et les examens ?',
      a: 'Les étoiles de ressource (印星) sont la racine de l’étude. La Ressource directe (正印) convient à l’accumulation patiente ; la Ressource indirecte (偏印) absorbe vite et de côté. Au-dessus vient l’Étoile Littéraire (文昌貴人), fixée par votre Maître du Jour, lue comme l’astre favorable de l’écrit, des examens et des documents. Réussir un examen, cela dit, tient à la préparation et non à un thème.',
    },
  },
  ui: {
    empty: 'Entrez votre date de naissance et votre sexe pour lire ce seul thème à part.',
    evidence: 'Ce que montre ici votre thème',
    reading: 'Lecture',
    background: 'Ce que cette lecture regarde',
    yes: 'Présent',
    no: 'Absent',
    none: 'Sans objet',
    strong: 'Fort (身强)',
    weak: 'Faible (身弱)',
    countOf: '{n}',
    nameLabel: 'Prénom (facultatif)',
    namePh: 'ex. Camille',
    nameNote: 'Votre prénom reste dans ce navigateur. Il ne passe jamais dans l’adresse et n’est jamais envoyé à un serveur.',
    metaTitle: '{topic} gratuite — calculateur de BaZi',
    metaDescSuffix: 'Gratuit, sans inscription, calculé dans votre navigateur.',
    titleOf: '{topic} de {name}',
    introLead: 'Dans votre thème, {term} est {value}. Lisez tout ce qui suit à partir de là.',
    otherTopics: 'Autres thèmes',
    backToAll: 'Voir la lecture complète du thème',
  },
};
