import type { Test } from '../types.ts';

/** 프랑스어 심리테스트 — 구조와 점수는 [[lib/test-en.ts]]와 같다. */
export const TESTS_FR: Test[] = [
  {
    slug: 'social-battery',
    title: 'Test de la batterie sociale',
    desc: 'À quelle vitesse les autres te vident — et ce qui te recharge vraiment',
    icon: '🔋',
    category: 'Personnalité',
    questions: [
      { q: 'Après une longue journée entouré de monde, tu veux surtout :', opts: [
        { text: 'Être complètement seul', score: 0 }, { text: 'Une compagnie silencieuse', score: 1 },
        { text: 'Quelque chose de tranquille avec un ami', score: 2 }, { text: 'Que la soirée continue', score: 3 }] },
      { q: 'Une invitation imprévue tombe sur une soirée libre.', opts: [
        { text: 'Je refuse presque automatiquement', score: 0 }, { text: 'Je pèse le pour et le contre', score: 1 },
        { text: 'J’accepte en général', score: 2 }, { text: 'J’accepte avant d’avoir lu les détails', score: 3 }] },
      { q: 'Dans une conversation de groupe, tu as tendance à :', opts: [
        { text: 'Écouter et parler rarement', score: 0 }, { text: 'Parler surtout à la personne à côté de moi', score: 1 },
        { text: 'Participer sans effort', score: 2 }, { text: 'Finir par la mener', score: 3 }] },
      { q: 'Un week-end sans rien de prévu, ça te semble :', opts: [
        { text: 'Le meilleur scénario possible', score: 0 }, { text: 'Bien, avec un petit plan', score: 1 },
        { text: 'Un peu vide', score: 2 }, { text: 'Comme si quelque chose avait raté', score: 3 }] },
      { q: 'Travailler dans un open space animé :', opts: [
        { text: 'Détruit ma concentration', score: 0 }, { text: 'Passe avec un casque', score: 1 },
        { text: 'Va bien la plupart du temps', score: 2 }, { text: 'Me maintient en énergie', score: 3 }] },
      { q: 'Tu arrives à une fête où tu connais une seule personne.', opts: [
        { text: 'Je reste à côté d’elle toute la soirée', score: 0 }, { text: 'Je rencontre quelques gens par son intermédiaire', score: 1 },
        { text: 'Je circule et parle à plusieurs groupes', score: 2 }, { text: 'À la fin je connais la moitié de la salle', score: 3 }] },
      { q: 'Le téléphone sonne, numéro inconnu.', opts: [
        { text: 'Je ne réponds jamais', score: 0 }, { text: 'Je laisse sonner et je regarde après', score: 1 },
        { text: 'Je réponds si je suis libre', score: 2 }, { text: 'Je réponds tout de suite', score: 3 }] },
      { q: 'Que penses-tu des longs voyages en groupe ?', opts: [
        { text: 'Il me faut ma chambre et mes horaires', score: 0 }, { text: 'Ça va, avec des pauses seul', score: 1 },
        { text: 'J’aime beaucoup', score: 2 }, { text: 'Plus on est nombreux, mieux c’est', score: 3 }] },
      { q: 'Après une belle soirée entre gens, tu te sens :', opts: [
        { text: 'Vidé, même si c’était bien', score: 0 }, { text: 'Content mais prêt à m’arrêter', score: 1 },
        { text: 'Encore porté un bon moment', score: 2 }, { text: 'Prêt à recommencer demain', score: 3 }] },
      { q: 'Être au centre de l’attention, c’est :', opts: [
        { text: 'Vraiment inconfortable', score: 0 }, { text: 'Supportable brièvement', score: 1 },
        { text: 'Agréable dans la bonne salle', score: 2 }, { text: 'Là où je suis le plus moi-même', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🕯️', title: 'Recharge profonde', color: 'from-slate-500 to-slate-700',
        desc: 'Ta batterie se vide vite en compagnie et ne se remplit que dans la solitude. Ce n’est pas de la timidité : c’est un coût énergétique réel, et plus tôt tu organises ta semaine autour de lui au lieu de t’en excuser, mieux elle se passe. Réserve le temps de récupération dans l’agenda comme tu réserverais une réunion.',
        traits: ['Besoin de solitude', 'Concentration profonde', 'Sélectif', 'Stable'] },
      { min: 8, max: 14, emoji: '🌙', title: 'Réserve tranquille', color: 'from-indigo-500 to-violet-600',
        desc: 'Tu gères bien la compagnie mais tu la paies après. Les petits groupes et les visages connus ne te coûtent presque rien ; les grands groupes inconnus, beaucoup. Protéger une soirée vraiment vide par semaine suffit en général à rester d’aplomb.',
        traits: ['Petits groupes', 'Récupère seul', 'Réfléchi', 'Chaleureux en tête-à-tête'] },
      { min: 15, max: 21, emoji: '🌤️', title: 'Charge équilibrée', color: 'from-sky-500 to-blue-600',
        desc: 'Tu passes de la compagnie à la solitude sans grande friction, et c’est un vrai atout. Le risque est de ne pas voir l’usure avant qu’elle se soit accumulée : demande-toi comment tu vas avant d’accepter la quatrième sortie d’affilée, pas après.',
        traits: ['Adaptable', 'Sociable', 'Lucide sur soi', 'Équilibré'] },
      { min: 22, max: 30, emoji: '⚡', title: 'Alimenté par les autres', color: 'from-amber-400 to-orange-500',
        desc: 'Ton énergie vient des autres, donc un agenda vide se lit comme un problème et non comme un repos. Il vaut la peine de savoir que la solitude te fait toujours quelque chose que la compagnie ne peut pas : même un court moment de calme aiguise en général tout le reste.',
        traits: ['Se recharge auprès des gens', 'Se lie vite', 'Expressif', 'Spontané'] },
    ],
  },
  {
    slug: 'stress-style',
    title: 'Comment tu gères le stress',
    desc: 'Ta réaction par défaut sous pression, et quoi en faire',
    icon: '🌊',
    category: 'Bien-être',
    questions: [
      { q: 'Une échéance est avancée d’une semaine. Ton premier geste :', opts: [
        { text: 'Me figer et fixer ça un moment', score: 0 }, { text: 'Avoir mal au ventre, puis lister les tâches', score: 1 },
        { text: 'Replanifier immédiatement', score: 2 }, { text: 'Être un peu stimulé', score: 3 }] },
      { q: 'Sous stress, ton sommeil :', opts: [
        { text: 'S’effondre complètement', score: 0 }, { text: 'Raccourcit', score: 1 },
        { text: 'Reste à peu près normal', score: 2 }, { text: 'N’est pas touché', score: 3 }] },
      { q: 'Sous pression, tu en parles aux autres :', opts: [
        { text: 'Pas du tout — je me referme', score: 0 }, { text: 'Seulement une fois que c’est passé', score: 1 },
        { text: 'À une personne de confiance', score: 2 }, { text: 'Ouvertement, pendant que ça se passe', score: 3 }] },
      { q: 'Ton corps sous stress :', opts: [
        { text: 'Tête, ventre, tensions — tout y passe', score: 0 }, { text: 'Un symptôme fidèle', score: 1 },
        { text: 'Juste un peu de tension', score: 2 }, { text: 'S’en aperçoit à peine', score: 3 }] },
      { q: 'Quand quelque chose se passe mal, tu as tendance à :', opts: [
        { text: 'Le rejouer pendant des jours', score: 0 }, { text: 'Y penser une soirée', score: 1 },
        { text: 'Noter la leçon et avancer', score: 2 }, { text: 'Passer à autre chose presque aussitôt', score: 3 }] },
      { q: 'Face à trop de tâches, tu :', opts: [
        { text: 'N’en fais aucune', score: 0 }, { text: 'Commences par la plus facile', score: 1 },
        { text: 'Les classes et attaques la première', score: 2 }, { text: 'Délègues ou en supprimes', score: 3 }] },
      { q: 'Une critique au travail te touche :', opts: [
        { text: 'Très fort, et longtemps', score: 0 }, { text: 'Fort, puis ça s’estompe', score: 1 },
        { text: 'Comme une information', score: 2 }, { text: 'Comme quelque chose d’utile', score: 3 }] },
      { q: 'Ta soupape habituelle, c’est :', opts: [
        { text: 'Je n’en ai pas', score: 0 }, { text: 'Scroller ou grignoter', score: 1 },
        { text: 'Une marche, du sport, un bain', score: 2 }, { text: 'Quelque chose de prévu et régulier', score: 3 }] },
      { q: 'Dans une vraie crise, tu es :', opts: [
        { text: 'Celui qui panique', score: 0 }, { text: 'Tremblant mais fonctionnel', score: 1 },
        { text: 'Assez calme', score: 2 }, { text: 'La personne la plus solide de la pièce', score: 3 }] },
      { q: 'En repensant à ton dernier mois difficile :', opts: [
        { text: 'Je le porte encore', score: 0 }, { text: 'J’ai mis longtemps à m’en défaire', score: 1 },
        { text: 'Je m’en suis remis correctement', score: 2 }, { text: 'J’en suis sorti meilleur', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🫧', title: 'Absorbe tout', color: 'from-blue-500 to-indigo-700',
        desc: 'La pression traverse tes défenses et reste dans le corps. Cela mérite d’être pris au sérieux plutôt que d’être encaissé : le schéma où le stress apparaît en perte de sommeil et symptômes physiques a tendance à s’accumuler. Une soupape concrète et une personne à qui le dire changent d’ordinaire plus que n’importe quelle dose de volonté.',
        traits: ['Très sensible', 'Garde pour soi', 'Besoin de récupérer', 'Empathique'] },
      { min: 8, max: 14, emoji: '🌧️', title: 'Encaisse lentement', color: 'from-sky-500 to-blue-600',
        desc: 'Tu traverses les périodes dures, mais elles te coûtent, et la récupération est plus lente que tu ne voudrais. Le geste utile est de le repérer plus tôt : le moment d’intervenir, c’est quand le sommeil bouge en premier, pas quand tout s’est déjà empilé.',
        traits: ['Endurant', 'Récupère lentement', 'Consciencieux', 'Solide en silence'] },
      { min: 15, max: 21, emoji: '⛅', title: 'Stable sous charge', color: 'from-emerald-500 to-teal-600',
        desc: 'Tu encaisses la pression sans dérailler, surtout parce que tu continues de fonctionner en la ressentant. Le risque est de supposer que tout va bien parce que tu travailles encore : être productif sous stress n’est pas la même chose que ne pas en être affecté.',
        traits: ['Pratique', 'Posé', 'Récupère bien', 'Fiable'] },
      { min: 22, max: 30, emoji: '🗿', title: 'Calme dans la tempête', color: 'from-slate-600 to-slate-800',
        desc: 'Tu restes d’aplomb quand ça tourne mal, ce qui fait de toi la personne vers qui on se tourne en cas de crise. À surveiller : les gens aussi stables sous-estiment souvent la charge accumulée, et leur entourage arrête de leur demander si ça va.',
        traits: ['Imperturbable', 'Décidé', 'Digne de confiance', 'Peu réactif'] },
    ],
  },
  {
    slug: 'decision-style',
    title: 'Comment tu décides',
    desc: 'Instinct, logique, ou quelque part entre les deux',
    icon: '🧭',
    category: 'Personnalité',
    questions: [
      { q: 'Choisir où manger avec des amis :', opts: [
        { text: 'Je lis tous les avis d’abord', score: 0 }, { text: 'J’en regarde deux ou trois', score: 1 },
        { text: 'Je propose un endroit que j’ai aimé', score: 2 }, { text: 'Je prends ce qui a l’air bien', score: 3 }] },
      { q: 'Un gros achat — tu délibères combien de temps ?', opts: [
        { text: 'Des semaines, avec des tableaux', score: 0 }, { text: 'Quelques jours', score: 1 },
        { text: 'Un jour ou deux', score: 2 }, { text: 'Si ça me parle, j’achète', score: 3 }] },
      { q: 'Une fois décidé, tu y reviens ?', opts: [
        { text: 'Sans arrêt', score: 0 }, { text: 'Parfois', score: 1 },
        { text: 'Rarement', score: 2 }, { text: 'Jamais — c’est réglé', score: 3 }] },
      { q: 'Quelqu’un te demande conseil. Tu :', opts: [
        { text: 'Poses beaucoup de questions pour comprendre', score: 0 }, { text: 'Étales les options', score: 1 },
        { text: 'Dis ce que je ferais', score: 2 }, { text: 'Le dis franchement tout de suite', score: 3 }] },
      { q: 'Deux bonnes options, aucune ne l’emporte :', opts: [
        { text: 'Je traîne jusqu’à ce que les circonstances tranchent', score: 0 }, { text: 'Je fais une liste', score: 1 },
        { text: 'Je dors dessus une fois', score: 2 }, { text: 'Je suis mon instinct', score: 3 }] },
      { q: 'À quelle fréquence regrettes-tu tes décisions ?', opts: [
        { text: 'Souvent, et longtemps', score: 0 }, { text: 'Parfois', score: 1 },
        { text: 'Rarement', score: 2 }, { text: 'Presque jamais', score: 3 }] },
      { q: 'Dans une réunion où personne ne tranche :', opts: [
        { text: 'J’attends quelqu’un d’autre', score: 0 }, { text: 'Je demande ce qui nous échappe', score: 1 },
        { text: 'Je propose quelque chose', score: 2 }, { text: 'Je tranche et on avance', score: 3 }] },
      { q: 'Fais-tu confiance à une première impression ?', opts: [
        { text: 'Pas du tout', score: 0 }, { text: 'Un peu', score: 1 },
        { text: 'En général', score: 2 }, { text: 'Presque entièrement', score: 3 }] },
      { q: 'Quand une information nouvelle contredit ton choix :', opts: [
        { text: 'Toute la décision se défait', score: 0 }, { text: 'Je reconsidère sérieusement', score: 1 },
        { text: 'J’ajuste si ça compte', score: 2 }, { text: 'Je garde le cap la plupart du temps', score: 3 }] },
      { q: 'Ton pire piège au moment de décider :', opts: [
        { text: 'Ne jamais décider', score: 0 }, { text: 'Décider trop tard', score: 1 },
        { text: 'Décider sans vérifier une chose', score: 2 }, { text: 'Décider trop vite pour faire marche arrière', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🔍', title: 'Celui qui délibère', color: 'from-slate-500 to-slate-700',
        desc: 'Tu veux le tableau complet avant de t’engager, donc tes décisions sont bien fondées et lentes. Le coût est réel : les options expirent pendant que tu cherches, et l’angoisse d’une décision ouverte pèse souvent plus lourd que le risque de se tromper un peu. Mets une échéance au choix lui-même, pas seulement au résultat.',
        traits: ['Minutieux', 'Conscient du risque', 'Analytique', 'Lent à s’engager'] },
      { min: 8, max: 14, emoji: '⚖️', title: 'Celui qui pèse', color: 'from-sky-500 to-indigo-600',
        desc: 'Tu rassembles assez pour te sentir sûr, puis tu décides — un bon réglage par défaut. Surveille le schéma où les derniers 10 % de recherche prennent 90 % du temps et ne changent rien.',
        traits: ['Équilibré', 'Réfléchi', 'Pratique', 'Raisonnable'] },
      { min: 15, max: 21, emoji: '🎯', title: 'Celui qui tranche', color: 'from-emerald-500 to-teal-600',
        desc: 'Tu avances vite avec assez d’informations et tu regardes rarement en arrière, ce qui te rend utile dans les salles où personne d’autre ne veut trancher. La seule habitude à garder : nomme l’hypothèse sur laquelle tu paries, pour t’apercevoir si elle se révèle fausse.',
        traits: ['Décidé', 'Sûr de lui', 'Tourné vers l’avant', 'Peu de regrets'] },
      { min: 22, max: 30, emoji: '⚡', title: 'L’instinctif', color: 'from-amber-400 to-rose-500',
        desc: 'Tu fais confiance à ton intuition et tu agis vite, ce qui est un vrai avantage dans les situations mouvantes. Cela devient un handicap sur les décisions irréversibles : la règle utile est de ralentir précisément pour ce qu’on ne peut pas défaire, et de garder la vitesse pour tout le reste.',
        traits: ['Rapide', 'Intuitif', 'Orienté action', 'Décidé'] },
    ],
  },
  {
    slug: 'work-style',
    title: 'Ta façon de travailler',
    desc: 'Comment tu avances vraiment, pas comme tu penses que tu devrais',
    icon: '💼',
    category: 'Travail',
    questions: [
      { q: 'Ton meilleur travail se fait :', opts: [
        { text: 'Dans un long bloc sans interruption', score: 0 }, { text: 'En deux ou trois plages concentrées', score: 1 },
        { text: 'Par courtes salves dans la journée', score: 2 }, { text: 'Dès que quelque chose est urgent', score: 3 }] },
      { q: 'Ta liste de tâches est :', opts: [
        { text: 'Détaillée et tenue à jour', score: 0 }, { text: 'Une liste approximative que je suis à peu près', score: 1 },
        { text: 'Quelques notes', score: 2 }, { text: 'Dans ma tête', score: 3 }] },
      { q: 'Un gros projet arrive sans échéance :', opts: [
        { text: 'Je m’en fixe une et je la tiens', score: 0 }, { text: 'Je m’en fixe une et je la tiens à peu près', score: 1 },
        { text: 'Je commence quand je me sens prêt', score: 2 }, { text: 'Ça attend que quelque chose l’impose', score: 3 }] },
      { q: 'Quand tu bloques, tu :', opts: [
        { text: 'Continues à t’acharner', score: 0 }, { text: 'Fais une courte pause et reviens', score: 1 },
        { text: 'Passes à une autre tâche', score: 2 }, { text: 'Demandes tout de suite', score: 3 }] },
      { q: 'Les réunions dans ta semaine :', opts: [
        { text: 'Cassent ma journée entière', score: 0 }, { text: 'Sont supportables si elles sont groupées', score: 1 },
        { text: 'Font partie du travail', score: 2 }, { text: 'Sont là où je pense le mieux', score: 3 }] },
      { q: 'Tu préfères un travail :', opts: [
        { text: 'Profond et solitaire', score: 0 }, { text: 'Surtout seul avec des points réguliers', score: 1 },
        { text: 'En équipe', score: 2 }, { text: 'En conversation permanente', score: 3 }] },
      { q: 'Ton rapport aux échéances :', opts: [
        { text: 'Je finis bien en avance', score: 0 }, { text: 'Je finis avec de la marge', score: 1 },
        { text: 'Je finis juste à temps', score: 2 }, { text: 'Je travaille mieux au bord du gouffre', score: 3 }] },
      { q: 'Une tâche qui t’ennuie :', opts: [
        { text: 'Je la fais en premier pour m’en débarrasser', score: 0 }, { text: 'Je la planifie', score: 1 },
        { text: 'Je la repousse un moment', score: 2 }, { text: 'Elle reste là indéfiniment', score: 3 }] },
      { q: 'Les retours sur un travail en cours :', opts: [
        { text: 'Je préfère finir d’abord', score: 0 }, { text: 'À quelques points d’étape', score: 1 },
        { text: 'Assez souvent', score: 2 }, { text: 'En continu, au fur et à mesure', score: 3 }] },
      { q: 'Ton bureau :', opts: [
        { text: 'Doit être rangé pour que je commence', score: 0 }, { text: 'Est à peu près organisé', score: 1 },
        { text: 'Est vécu', score: 2 }, { text: 'Est un chaos qui marche', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🎯', title: 'Travail en profondeur', color: 'from-indigo-500 to-violet-700',
        desc: 'Tu fais ton meilleur travail sur de longues plages calmes et tu organises tout le reste pour les protéger. Cela produit une vraie profondeur, mais te rend fragile à l’interruption : l’investissement utile est de défendre deux ou trois blocs par semaine sans négocier, et d’être souple sur tout le reste.',
        traits: ['Concentré', 'Structuré', 'Autonome', 'Allergique aux interruptions'] },
      { min: 8, max: 14, emoji: '📋', title: 'Planification régulière', color: 'from-sky-500 to-blue-600',
        desc: 'Tu planifies, tu doses, et les choses arrivent quand tu as dit qu’elles arriveraient. Cette fiabilité vaut plus que la plupart des gens ne le croient. Vérifie juste de temps en temps que le plan sert encore le travail et pas l’inverse.',
        traits: ['Fiable', 'Organisé', 'Bien dosé', 'Constant'] },
      { min: 15, max: 21, emoji: '🔄', title: 'Souple et mobile', color: 'from-emerald-500 to-teal-600',
        desc: 'Tu travailles par salves, tu changes de tâche sans effort et tu restes disponible pour ce qui arrive. Cela convient bien aux environnements rapides. Ce qu’il faut surveiller, c’est que changer sans arrêt donne une impression de productivité tout en rendant les problèmes vraiment durs plus difficiles à finir.',
        traits: ['Adaptable', 'Réactif', 'Collaboratif', 'Rapide'] },
      { min: 22, max: 30, emoji: '🔥', title: 'Performant sous pression', color: 'from-amber-400 to-rose-500',
        desc: 'C’est l’urgence qui t’allume, et tu produis bien juste à l’échéance. Ça marche — jusqu’à ce que deux échéances tombent ensemble. Se fabriquer des échéances plus petites et plus tôt est la solution classique, et elle marche mieux que d’essayer de devenir un autre type de travailleur.',
        traits: ['Rapide sous pression', 'Improvise', 'Énergique', 'Mû par les délais'] },
    ],
  },
  {
    slug: 'love-language',
    title: 'Comment tu montres ton affection',
    desc: 'La façon dont tu exprimes l’attention, et celle dont tu veux la recevoir',
    icon: '💝',
    category: 'Relations',
    questions: [
      { q: 'Ton partenaire a passé une journée horrible. Tu :', opts: [
        { text: 'Lui dis exactement ce que j’apprécie chez lui', score: 0 },
        { text: 'M’assois à côté sans dire grand-chose', score: 1 },
        { text: 'Lui enlève discrètement quelque chose des épaules', score: 2 },
        { text: 'Rapporte quelque chose qu’il aime', score: 3 }] },
      { q: 'Qu’est-ce qui te fait le plus te sentir aimé ?', opts: [
        { text: 'Qu’on me le dise à voix haute', score: 0 }, { text: 'Du temps ensemble sans partage', score: 1 },
        { text: 'Que quelqu’un règle une chose pour moi', score: 2 }, { text: 'Un objet choisi avec attention', score: 3 }] },
      { q: 'Ton réflexe pour un anniversaire :', opts: [
        { text: 'Écrire quelque chose', score: 0 }, { text: 'Prévoir une journée entière ensemble', score: 1 },
        { text: 'Faire une chose pratique qui manquait', score: 2 }, { text: 'Trouver le bon cadeau', score: 3 }] },
      { q: 'Qu’est-ce qui fait le plus mal dans une relation ?', opts: [
        { text: 'Ne jamais entendre que ça va bien', score: 0 }, { text: 'Être là physiquement mais distrait', score: 1 },
        { text: 'Devoir tout porter seul', score: 2 }, { text: 'Être oublié le jour qui comptait', score: 3 }] },
      { q: 'Un ami traverse quelque chose de difficile :', opts: [
        { text: 'Je lui dis ce que je pense de lui', score: 0 }, { text: 'Je lui libère une soirée', score: 1 },
        { text: 'Je règle un truc pratique', score: 2 }, { text: 'Je lui envoie quelque chose', score: 3 }] },
      { q: 'Tu montres que quelqu’un t’a manqué en :', opts: [
        { text: 'Le disant directement', score: 0 }, { text: 'Dégageant du temps tout de suite', score: 1 },
        { text: 'Faisant quelque chose pour cette personne', score: 2 }, { text: 'Rapportant quelque chose', score: 3 }] },
      { q: 'Le compliment qui te touche le plus :', opts: [
        { text: 'Quelque chose de précis sur qui je suis', score: 0 }, { text: '« Je veux toujours plus de temps avec toi »', score: 1 },
        { text: '« Tu t’occupes toujours de tout »', score: 2 }, { text: '« J’ai vu ça et j’ai pensé à toi »', score: 3 }] },
      { q: 'Dans une dispute, qu’est-ce qui répare le plus vite ?', opts: [
        { text: 'Entendre ce qu’il apprécie encore chez moi', score: 0 }, { text: 'S’asseoir et en parler vraiment', score: 1 },
        { text: 'Qu’il fasse quelque chose qui le montre', score: 2 }, { text: 'Un geste qui dit qu’il y a pensé', score: 3 }] },
      { q: 'Ton partenaire part un mois. Tu :', opts: [
        { text: 'Envoies de longs messages', score: 0 }, { text: 'Planifies des appels sans jamais manquer', score: 1 },
        { text: 'T’occupes de tout à la maison pour qu’il n’ait pas à s’inquiéter', score: 2 }, { text: 'Lui envoies des choses par la poste', score: 3 }] },
      { q: 'Qu’est-ce qui te manquerait en premier ?', opts: [
        { text: 'Qu’on me dise ce qu’on ressent', score: 0 }, { text: 'Du vrai temps ensemble', score: 1 },
        { text: 'Être aidé sans avoir à demander', score: 2 }, { text: 'Les petites surprises pensées', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '💬', title: 'Les mots', color: 'from-sky-500 to-blue-600',
        desc: 'Tu donnes et reçois l’affection par ce qui se dit. Qu’on te dise clairement ce qu’on apprécie chez toi touche plus fort que n’importe quel geste, et le silence se lit comme de la distance même quand rien ne va mal. Il vaut la peine de le dire à l’autre : ceux qui montrent l’amour autrement croient souvent que c’est évident.',
        traits: ['Verbal', 'Direct', 'Expressif', 'Rassurant'] },
      { min: 8, max: 14, emoji: '⏳', title: 'Le temps', color: 'from-violet-500 to-purple-600',
        desc: 'Pour toi la monnaie, c’est l’attention. Quelqu’un vraiment présent, téléphone rangé, compte plus que tout ce qu’on pourrait acheter ou dire. Le revers : un partenaire physiquement là mais distrait s’enregistre comme une absence, et mieux vaut le nommer que d’en garder rancune.',
        traits: ['Présent', 'Attentif', 'Patient', 'Guidé par le lien'] },
      { min: 15, max: 21, emoji: '🛠️', title: 'Les actes', color: 'from-emerald-500 to-teal-600',
        desc: 'Tu montres ton attention en faisant des choses, et tu remarques quand quelqu’un règle en silence ce que tu redoutais. Ton affection peut être invisible pour ceux qui attendent de l’entendre : de temps en temps, il vaut la peine de le dire en plus de le faire.',
        traits: ['Pratique', 'Fiable', 'Observateur', 'Discret'] },
      { min: 22, max: 30, emoji: '🎁', title: 'Les attentions', color: 'from-rose-400 to-pink-600',
        desc: 'Pour toi un objet porte la pensée qui va avec — « j’ai vu ça et j’ai pensé à toi » est tout l’enjeu, pas le prix. Du coup être oublié à une date qui comptait pique bien plus qu’il n’y paraît, et cela vaut la peine de l’expliquer plutôt que d’attendre qu’on le devine.',
        traits: ['Attentionné', 'Symbolique', 'Attentif aux détails', 'Gardien des souvenirs'] },
    ],
  },
];

export const TESTS_FR_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_FR.map(t => [t.slug, t]),
);
