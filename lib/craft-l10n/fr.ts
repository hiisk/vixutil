import type { FormulaText } from '../formula/types.ts';

/**
 * Textes français des 48 calculateurs de loisirs créatifs (/craft).
 *
 * Ici, uniquement le titre, la description, le corps et la mise en garde : les
 * calculs restent dans lib/craft/*.ts, comme pour lib/rate-l10n.
 *
 * Un mot par notion : échantillon (tricot), marge de couture, biais, molleton,
 * surgraissage, taux de parfum. Les mêmes mots servent dans TERMS et DESC de
 * lib/formula/l10n/fr.ts, pour que l’étiquette et le texte se répondent.
 *
 * Les nombres du texte d’origine sont conservés (500 g à 8 % = 40 g) afin que la
 * prose reste vérifiable ; virgule décimale à la française.
 */
export const CRAFT_FR: Record<string, FormulaText> = {
  /* ───────── Tricot et crochet ───────── */
  'yarn-needed': {
    title: 'Calculateur de laine : quantité',
    desc: 'Le poids de laine qu’exige un ouvrage fini, à partir d’un échantillon pesé.',
    long: 'Tricote un carré de 10 cm et pèse-le : tu obtiens le nombre de grammes par centimètre carré. Multiplie par la surface de l’ouvrage fini et tu as le poids de laine. La quantité imprimée sur le modèle suppose l’échantillon du modèle : dès que le tien s’en écarte, elle dérive d’autant.',
    note: 'Prévois environ 15 % de marge. Manches, encolures et finitions consomment plus que la surface à plat ne le laisse croire, et quand un bain de teinture est épuisé, la même nuance est introuvable.',
  },
  'yarn-skeins': {
    title: 'Combien de pelotes de laine ?',
    desc: 'Le nombre de pelotes à acheter, d’après la longueur nécessaire et le métrage d’une pelote.',
    long: 'On n’achète pas une demi-pelote : la division est donc arrondie au-dessus. L’ordre compte, ajoute la marge d’abord et arrondis ensuite — dans l’autre sens, une pelote qui manque vraiment disparaît du résultat.',
    note: 'Le métrage de l’étiquette est nominal. Deux pelotes de même poids peuvent différer de plusieurs mètres : acheter le compte juste, c’est risquer de tomber court dans les derniers rangs.',
  },
  'gauge-stitches': {
    title: 'Échantillon tricot : mailles à monter',
    desc: 'Le nombre de mailles à monter, d’après l’échantillon et la largeur voulue.',
    long: '22 mailles sur 10 cm font 2,2 mailles par centimètre ; multiplie par la largeur que tu veux. Si le point se répète sur un nombre fixe de mailles, arrondis au multiple le plus proche.',
    note: 'Mesure l’échantillon après lavage et blocage. La largeur sortie des aiguilles change dès que la laine a été mouillée.',
  },
  'gauge-convert': {
    title: 'Convertir un échantillon tricot',
    desc: 'Recalculer les mailles quand ton échantillon diffère de celui du modèle.',
    long: 'Si un modèle écrit à 22 mailles pour 10 cm demande d’en monter 110 et que tu tricotes à 20, ces 110 mailles donnent plus large que prévu. Mettre le nombre à l’échelle du rapport des deux échantillons rétablit la largeur.',
    note: 'Ajuster les mailles corrige la largeur, pas la longueur. Les rangs se calculent à part, avec ton échantillon en rangs.',
  },
  'yarn-weight-length': {
    title: 'Laine : du poids aux mètres',
    desc: 'Retrouver la longueur restante en pesant le reste de la pelote.',
    long: 'Le métrage et le poids de l’étiquette fixent les mètres par gramme. Pose le reste sur la balance et tu sais ce qu’il te reste — et, sachant ce qu’un rang consomme, combien de rangs cela porte encore.',
    note: 'Retire le tube en carton ou la bande si la pelote est encore montée dessus. Cinq grammes d’erreur déplacent la réponse d’une vingtaine de mètres.',
  },
  'wpi-weight': {
    title: 'WPI : épaisseur du fil',
    desc: 'Trouver la catégorie d’épaisseur d’un fil à partir des tours par pouce.',
    long: 'Enroule le fil tour contre tour sur une règle jusqu’à remplir un pouce : ce nombre est le WPI, et il se lit sur l’échelle habituelle des épaisseurs. C’est ainsi qu’on classe un fil sans étiquette, ou un reste — autour de 12 WPI, on est en général sur du worsted, le n° 4.',
    note: 'Enrouler en tirant fait monter le WPI et rend le fil plus fin qu’il n’est. Pose les tours côte à côte sans les écraser.',
  },
  'hat-cast-on': {
    title: 'Bonnet : mailles à monter',
    desc: 'Le montage d’un bonnet, d’après le tour de tête et l’aisance négative.',
    long: 'Un bonnet doit finir plus petit que la tête, sinon il remonte. Retirer environ 10 % du tour mesuré est le point de départ habituel, et des côtes très élastiques en acceptent davantage.',
    note: 'Arrondis à un multiple du motif. Des côtes 2×2 demandent un multiple de quatre, sans quoi la jonction ne tombe pas juste.',
  },
  'sleeve-decrease': {
    title: 'Diminutions de manche',
    desc: 'Répartir les diminutions entre les mailles de départ et celles d’arrivée.',
    long: 'Un rang de diminution enlève une maille de chaque côté : deux mailles partent à la fois. La moitié de l’écart donne le nombre de rangs de diminution, et les rangs divisés par ce nombre donnent l’intervalle.',
    note: 'Quand la division ne tombe pas juste, place les rangs en trop tout en haut, sous l’emmanchure. Un espacement irrégulier se voit surtout près du poignet.',
  },

  'row-gauge-length': {
    title: 'Échantillon en rangs : combien de rangs',
    desc: 'Le nombre de rangs à tricoter, d’après ton échantillon en rangs et la longueur voulue.',
    long: '28 rangs pour 10 cm font 2,8 rangs par centimètre, donc 60 cm demandent 168 rangs — soit exactement 21 répétitions d’un motif de 8 rangs. Demande 63 cm et tu obtiens 176,4 ; un rang ne se coupe pas, ce sera donc 176 rangs, qui mesurent 62,9 cm. Le millimètre ne se voit pas ; la répétition cassée, si.',
    note: 'L’échantillon en rangs dérive plus que celui en mailles. Le jersey et l’alpaga s’allongent sous leur propre poids : suspends l’échantillon bloqué avant de le mesurer, c’est plus proche de ce que fera le vêtement.',
  },
  'yarn-substitute': {
    title: 'Substitution de laine : combien de pelotes',
    desc: 'Le nombre de pelotes d’une laine de remplacement qu’un modèle demande.',
    long: 'Ce qu’on égalise en changeant de laine, c’est la longueur et non le poids. Un modèle qui réclame huit pelotes de 50 g d’une laine à 400 m pour 100 g veut 1 600 m. Une laine de substitution à 320 m pour 100 g ne porte que 160 m par pelote : il en faut dix — achète les mêmes huit et il te manque 320 m.',
    note: 'Égaliser la longueur n’égalise pas l’épaisseur. Deux laines au même métrage pour 100 g ne tombent ni ne s’étirent pareil dès que l’une est de l’alpaga et l’autre du coton : tricote un échantillon avant de t’engager. Si la pelote de remplacement pèse autrement, divise le total de mètres ci-dessus par ce qu’annonce son étiquette.',
  },
  'sweater-ease': {
    title: 'Aisance d’un pull (ease)',
    desc: 'La circonférence finie et le nombre de mailles, d’après un tour de poitrine et l’aisance.',
    long: 'La taille d’un vêtement, c’est la mesure du corps plus l’aisance, pas la mesure du corps. Ajouter 8 % à une poitrine de 96 cm donne une circonférence finie de 103,7 cm, soit 228 mailles à 22 mailles pour 10 cm. Mets l’aisance à −5 % et tu obtiens 91,2 cm, près du corps — le tricot s’étire, l’aisance négative est donc un vrai choix.',
    note: 'Le tableau des tailles d’un modèle donne d’ordinaire le tour de poitrine fini, pas le corps auquel il est destiné. Mélanger les deux te met une taille entière à côté. L’aisance change aussi d’un endroit à l’autre : un pull avec 8 cm à la poitrine dépasse rarement 4 cm au haut du bras.',
  },
  'sock-cast-on': {
    title: 'Montage de chaussette : mailles à monter',
    desc: 'Le montage d’une chaussette, d’après le tour de pied, l’échantillon et l’aisance négative.',
    long: 'Retire 10 % d’un tour de pied de 22 cm et tu tricotes à 19,8 cm, soit 59,4 mailles à 30 mailles pour 10 cm. Arrondis à 60, un multiple de quatre. Quatre compte deux fois : des côtes 2×2 se répètent sur quatre mailles, et le dessus du pied et la semelle doivent se partager exactement en deux (30 chacun) pour que le talon et les goussets sortent symétriques.',
    note: 'L’aisance négative n’est pas optionnelle sur une chaussette. Tricote au tour mesuré et elle se relâche en plis sous le pied et glisse du talon. Mesure aussi l’échantillon en rond — la même laine et les mêmes aiguilles ne donnent pas le même compte à plat.',
  },
  'stripe-repeat': {
    title: 'Rapport de rayures : répétitions et reste',
    desc: 'Combien de répétitions entières de rayures tiennent, et combien de rangs restent.',
    long: '160 rangs avec une répétition de 12 rangs donnent 13 répétitions (156 rangs) et 4 rangs de reste. Ce qui compte, c’est où vont ces 4 rangs. Répartis-les un peu partout et une rayure finit visiblement plus épaisse que les autres. Mets-les toutes là où quelque chose interrompt déjà — juste au-dessus des côtes du bas, ou sous le bras — et personne ne les trouve.',
    note: 'Un nombre impair de rangs par répétition fait démarrer chaque rayure à l’extrémité opposée sur deux couleurs, ce qui oblige à couper le fil. Garde la répétition paire et la couleur au repos se remonte le long du bord : deux fois moins de fils à rentrer.',
  },
  'colorwork-yardage': {
    title: 'Jacquard : laine par couleur',
    desc: 'Répartir un besoin total de laine en grammes par couleur.',
    long: 'Un vêtement qui mange 400 g avec 70 % de couleur principale se partage en 280 g et 120 g. Le pourcentage se lit sur la grille : compte les cases de chaque couleur dans une répétition, c’est le rapport aussi loin que le motif court. Le corps uni et les côtes vont tous sur la couleur principale.',
    note: 'La couleur minoritaire tombe rarement sur le chiffre de la grille. Les fils portés à l’envers, les flottés, consomment plus que les mailles de l’endroit, et la laine tenue en couleur dominante fait des mailles un peu plus grandes et part plus vite. Achète une pelote de plus de la couleur contrastante — retrouver un bain de teinture épuisé est le manque le plus difficile à réparer.',
  },
  'yarn-per-row': {
    title: 'Laine par rang',
    desc: 'Les mètres de laine qu’un rang consomme, et les rangs que le reste porte encore.',
    long: 'Une bande qui annonce 200 m pour 50 g fait 4 m par gramme. Si un échantillon de 12 g a pris 40 rangs, 48 m sont partis dans 40 rangs : un rang fait 1,2 m. Les 60 g qui te restent sont 240 m, de quoi tenir 200 rangs de plus. La version la plus juste consiste à peser l’ouvrage en cours, tricoter dix rangs et le repeser — le nombre de mailles par rang est alors déjà le vrai.',
    note: 'Les mètres par rang suivent les mailles de ce rang. Reporter 1,2 m d’un échantillon de 40 mailles sur un corps de 200 mailles sous-estime de cinq fois : multiplie par le rapport des deux nombres de mailles. Le montage, les coutures et les finitions ne sont pas dans ce chiffre.',
  },
  'blanket-size': {
    title: 'Taille de couverture au tricot',
    desc: 'Les dimensions d’une couverture et les mailles à monter, d’après le matelas et la retombée.',
    long: 'Une couverture finit à la taille du matelas plus la retombée sur les côtés, pas à la taille du matelas. La largeur prend la retombée deux fois, une par côté ; la longueur la prend une fois, au pied, parce que le bord du haut s’arrête devant les oreillers. Sur un lit de 150 × 200 cm avec une retombée de 25 cm, cela fait 200 × 225 cm, et à 16 mailles pour 10 cm le montage est de 320 mailles.',
    note: 'Tenir 200 cm de mailles demande une aiguille circulaire de 100 cm ou plus, et dès que l’ouvrage fini dépasse le kilo il s’allonge sous son propre poids — mesure ton échantillon en gardant ce poids en tête. Les couvertures de bébé partent des dimensions du lit ou du siège auto : il ne doit rien y avoir qui retombe.',
  },

  /* ───────── Couture et tissu ───────── */
  'fabric-yardage': {
    title: 'Métrage de tissu à acheter',
    desc: 'Le tissu à acheter, d’après la taille des pièces, leur nombre et la laize.',
    long: 'Le tissu vient en largeur fixe : la première chose à établir est le nombre de pièces qui tiennent côte à côte. Une pièce de 40 cm tient deux fois dans 110 cm et les 30 cm restants sont perdus ; six pièces demandent donc trois rangées, soit 3 × 50 = 150 cm. Si trois tiennent en largeur, les mêmes six pièces ne coûtent que 100 cm.',
    note: 'Si une pièce est plus large que le tissu, le calcul compte une pièce par rangée ; en vrai, il faudra l’assembler en deux morceaux ou tourner le placement. Les imprimés à sens ne se tournent pas et demandent plus que ce chiffre.',
  },
  'fabric-pieces': {
    title: 'Combien de pièces dans le tissu',
    desc: 'Le nombre de pièces identiques que donne un tissu que tu as déjà.',
    long: 'Dans la largeur, ⌊110 ÷ 40⌋ = 2 ; dans la longueur, ⌊200 ÷ 50⌋ = 4 rangées : huit pièces. Les deux divisions arrondissent vers le bas, et c’est pour cela que la bande de 30 cm qui reste ne compte pas — y glisser des pièces plus petites est un autre calcul.',
    note: 'Entre des dimensions de coupe, marge de couture comprise. Partir des mesures finies fait monter le compte mais ne laisse rien pour assembler. Un tissu non lavé perd en plus son rétrécissement avant même la coupe.',
  },
  'seam-allowance': {
    title: 'Marge de couture : dimensions de coupe',
    desc: 'Passer de la mesure finie et de la marge à la dimension à couper.',
    long: 'La marge s’ajoute sur les deux bords opposés : chaque direction gagne donc deux fois la marge. Une pièce finie de 40 × 50 cm se coupe en 42 × 52 cm avec 1 cm de marge. Ne l’ajouter qu’une fois donne une pièce 2 cm trop petite.',
    note: 'La marge standard change selon les traditions : 1 cm sur les patrons coréens et japonais, 5/8 de pouce (1,6 cm) sur les américains, 1/4 de pouce (0,6 cm) en patchwork. Un ourlet replié deux fois demande en plus le double de la profondeur du repli.',
  },
  'bias-binding': {
    title: 'Biais continu : taille du carré',
    desc: 'La taille du carré de tissu qui donne une longueur de biais donnée.',
    long: 'Le biais se coupe à 45° : impossible d’en tirer une longue bande dans le droit-fil, on coupe un carré en diagonale et on l’assemble, ou on l’enroule en tube pour couper en continu. Ce que la longueur fixe vraiment, c’est une surface : 300 cm × 4 cm = 1 200 cm², plus 10 % pour les jonctions et l’égalisage, soit un carré de √1 320 ≈ 36,3 cm.',
    note: 'Un biais double pli qui finit à 1 cm se coupe quatre fois plus large, soit 4 cm. Entrer la largeur finie ne laisse rien à replier. Les mailles s’étirent déjà d’elles-mêmes et n’ont presque jamais besoin d’un biais.',
  },
  'gather-ratio': {
    title: 'Ratio de fronces',
    desc: 'La longueur de tissu à couper pour un bord froncé ou une ruche.',
    long: 'Le ratio de fronces dit combien de fois la longueur finie tu coupes avant de resserrer. Deux fois une ouverture de 60 cm, c’est couper 120 cm et froncer jusqu’à 60 : 60 cm disparaissent dans les plis. Les tissus fins acceptent 2,5 à 3, les épais s’arrêtent vers 1,5 — à ratio égal, le volume n’a rien à voir d’un tissu à l’autre.',
    note: 'Fixe le ratio avant de couper : tirer sur le fil de fronce n’ajoute pas de longueur. Ruches et volants se calculent pareil, en général à 2 ou plus.',
  },
  'elastic-length': {
    title: 'Longueur d’élastique à couper',
    desc: 'La longueur d’élastique à couper, d’après une mesure du corps et l’étirement.',
    long: 'L’élastique se coupe plus court que la partie du corps qu’il doit tenir. Retire 10 % d’un tour de taille de 76 cm, soit 68,4 cm, ajoute 2,5 cm pour superposer les extrémités et coupe 70,9 cm. L’anneau fini doit alors s’étirer de 11,1 % (10 ÷ 90) pour atteindre 76 cm, et c’est bien là l’effort demandé à l’élastique.',
    note: 'Au-delà d’environ 30 % d’étirement, il passe encore mais marque la peau toute la journée. Le retour élastique varie beaucoup d’une qualité à l’autre : l’enrouler autour du corps et chercher la longueur confortable bat n’importe quelle formule.',
  },
  'fabric-shrinkage': {
    title: 'Rétrécissement du tissu',
    desc: 'Le taux de rétrécissement et le tissu à acheter en plus, d’après un test de lavage.',
    long: 'Mesure une longue portion plutôt que 10 cm. Si 100 cm reviennent à 96, le rétrécissement est de 4 %. Pour qu’il reste 200 cm après lavage, il faut 200 ÷ 0,96 = 208,3 cm : 8,3 cm partent au lavage. Ajouter 4 % donnerait 208 cm, soit un peu trop court — la bonne opération est une division, pas une addition.',
    note: 'Coton et lin perdent 3 à 10 % au premier lavage, le denim davantage. La laize rétrécit aussi : vérifie-la à part quand une pièce passe tout juste en largeur. Laver le tissu avant de couper supprime toute cette incertitude.',
  },
  'pattern-scale': {
    title: 'Agrandir un patron (échelle)',
    desc: 'La mesure obtenue quand tu agrandis ou réduis un patron imprimé.',
    long: 'Les longueurs suivent le pourcentage, la consommation de tissu suit son carré. Une ligne de 20 cm passée à 120 % fait 24 cm, mais la surface de la même pièce passe à 144 % — voilà pourquoi un patron à peine agrandi tombe en panne de tissu. Le zoom de l’imprimante, c’est ce même 120 %.',
    note: 'Désactive l’ajustement à la page à l’impression et saisis l’échelle toi-même, puis mesure le carré de contrôle imprimé sur le patron avant de couper quoi que ce soit. Les marges de couture gardent leur largeur d’origine, on ne les met pas à l’échelle.',
  },

  'zipper-length': {
    title: 'Longueur de fermeture éclair',
    desc: 'Quelle taille de fermeture acheter pour une ouverture, arrondie à une taille qui existe.',
    long: 'Une ouverture de 22 cm plus 2 cm de marge en haut et en bas demande 24 cm — et personne ne vend de fermeture de 24 cm. Les tailles courantes montent par 10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 70 · 80 · 90 cm : tu achètes donc la 25. Les boutiques qui vendent en pouces montent par 4 · 5 · 7 · 9 · 12 · 14 · 16 · 18 · 20 · 22 · 24 po.',
    note: 'La longueur annoncée mesure la partie à dents que parcourt le curseur, pas le ruban, qui continue au-delà des deux côtés. Acheter long et raccourcir ne marche que sur les fermetures à spirale : coupe les dents d’un modèle métal ou Vislon et le curseur sort, et une fermeture séparable ne se touche pas du tout en bas.',
  },
  'buttonhole-spacing': {
    title: 'Espacement des boutonnières',
    desc: 'L’espacement régulier des boutonnières le long d’une patte de boutonnage.',
    long: 'Sur une patte de 60 cm avec 2 cm libres à chaque bout, les boutonnières occupent 56 cm. Six boutons divisent cette portée par cinq et non par six : la première et la dernière sont aux extrémités, il n’y a donc que cinq intervalles entre elles. Cela fait 56 ÷ 5 = 11,2 cm. Divise par six à la place et tu obtiens 9,3 cm, la dernière boutonnière restant loin du bord.',
    note: 'Sur une blouse, place d’abord une boutonnière au point le plus fort de la poitrine et répartis les autres depuis là — une répartition seulement régulière laisse ce point entre deux boutonnières, c’est-à-dire exactement là où le devant bâille. La boutonnière elle-même doit toujours mesurer le diamètre du bouton plus son épaisseur.',
  },
  'pleat-fabric': {
    title: 'Plis : largeur de tissu à couper',
    desc: 'La largeur de tissu qu’un panneau plissé demande, d’après la largeur finie et les plis.',
    long: 'Ce calcul travaille en plis couchés. Un pli couché consomme trois fois sa profondeur, mais l’une de ces trois est la face visible, déjà comptée dans la largeur finie — ce qu’il faut ajouter, c’est donc deux fois la profondeur par pli. Un panneau fini de 50 cm avec dix plis de 4 cm se coupe à 50 + 10 × 8 = 130 cm. Serre-les jusqu’à ce que la face visible égale la profondeur et 12,5 plis tiennent : le tissu fait alors exactement 3 fois la largeur finie, 150 cm — c’est de là que vient l’idée que les plis couchés prennent trois fois leur profondeur. Les plis creux se replient des deux côtés et en prennent quatre fois.',
    note: 'Les plis sont pris pliés dans la couture de taille : trois épaisseurs de tissu s’y empilent. Sur du denim ou du tweed, il faut réduire la profondeur ou le nombre avant que l’aiguille passe. Sur un imprimé, accorde la profondeur au raccord du motif, sinon les plis découpent le dessin.',
  },
  'hem-allowance': {
    title: 'Ourlet : longueur à couper',
    desc: 'La longueur de coupe d’après la longueur finie, la profondeur d’ourlet et le nombre de replis.',
    long: 'Le nombre de replis, c’est le nombre de fois où le tissu est dépensé. Un double repli (2) remonte deux fois la même profondeur pour enfermer le bord vif : une longueur finie de 70 cm avec un ourlet de 2 cm se coupe à 70 + 2 × 2 = 74 cm. Surfile le bord et ne replie qu’une fois (1) et 72 cm suffisent. Contrairement à une marge de couture, un ourlet n’est qu’à une extrémité : rien n’est doublé ici pour le bord opposé.',
    note: 'Sur un ourlet courbe, l’excédent n’a nulle part où aller dès que le repli est profond : l’intérieur fronce et gondole. Garde l’ourlet d’une jupe évasée sous 1 cm, ou finis-le au biais. Les mailles veulent le contraire — un ourlet profond et une aiguille double ou un zigzag, pour que la piqûre s’étire avec le tissu.',
  },
  'dart-intake': {
    title: 'Pinces : valeur à pincer',
    desc: 'Combien chaque pince supprime, d’après la différence entre deux tours.',
    long: 'Les 20 cm entre une poitrine de 96 cm et une taille de 76 cm sont ce que les pinces doivent avaler. Quatre pinces — deux devant, deux dos — en prennent 5 cm chacune, et comme une pince s’ouvre de part et d’autre de son axe, chaque branche se trace 2,5 cm en dehors. Ce sont ces 2,5 cm que tu marques vraiment sur le patron.',
    note: 'Partager 20 cm en quatre ne veut pas dire quatre pinces égales. Le côté le plus galbé en prend davantage : 6 cm devant et 4 cm dos est le genre de répartition habituel. Dès qu’une seule pince dépasse environ 4 cm, sa pointe fait une bosse, et le remède est deux pinces plus petites côte à côte.',
  },
  'fabric-nap-layout': {
    title: 'Sens du poil : métrage de tissu',
    desc: 'La longueur de tissu quand toutes les pièces doivent être posées dans le même sens.',
    long: 'Velours, velours côtelé, tissus grattés et imprimés à sens veulent toutes les pièces posées dans le même sens, sinon la couleur change d’un panneau à l’autre. Six pièces de 40 × 50 cm posées debout sur un tissu de 110 cm tiennent deux de front, trois rangées, 150 cm. Tournées sur le côté, elles tiennent toujours deux de front (110 ÷ 50) sur trois rangées, mais chaque rangée ne fait que 40 cm de long, donc 120 cm suffisent — et un tissu à poil ne peut pas réclamer ces 30 cm. Le calculateur de métrage suppose que tu es libre de tourner les pièces, et c’est pourquoi il annonce moins.',
    note: 'Le velours paraît plus sombre poil vers le haut et plus clair poil vers le bas ; les deux vont, tant que tout le vêtement s’accorde. Un grand imprimé à raccord coûte encore plus : chaque pièce demande jusqu’à une répétition entière de longueur en plus pour se raccorder aux coutures.',
  },
  'sewing-thread-length': {
    title: 'Longueur de fil à coudre',
    desc: 'Le fil qu’une couture consomme, et le nombre de bobines que cela fait.',
    long: 'Le point noué droit entrelace le fil d’aiguille et celui de canette à l’intérieur du tissu : il mange donc bien plus de fil que la couture est longue. À 2,5×, une couture de 200 cm prend 500 cm — 5 m. Piquer plus fin ne change presque rien à ce total, parce que deux fois plus de points utilisent chacun deux fois moins de fil. Ce que la densité (200 × 4 = 800 points) fixe vraiment, c’est la solidité de la couture et le nombre de trous percés dans le tissu.',
    note: 'Le facteur grimpe avec l’épaisseur. Un tissu fin au point noué reste près de 2,5, plusieurs épaisseurs de denim passent 3, et une surjeteuse à quatre fils va de 12 à 18 fois la longueur de couture, parce que son fil enveloppe l’extérieur du tissu au lieu de se nouer dedans. Les longueurs de bobine sont nominales elles aussi, et les derniers mètres sont souvent enroulés trop lâche pour être cousus.',
  },
  'sticker-sheet-yield': {
    title: 'Étiquettes par planche',
    desc: 'Combien d’étiquettes tiennent sur une feuille imprimée, les deux orientations comparées.',
    long: 'Sur de l’A4 (21 × 29,7 cm), une marge de 0,5 cm tout autour laisse 20 × 28,7 cm utilisables. Avec des étiquettes de 5 × 3 cm espacées de 0,2 cm, en largeur cela donne (20 + 0,2) ÷ (5 + 0,2) = 3,88 → 3, et en hauteur (28,7 + 0,2) ÷ (3 + 0,2) = 9,03 → 9, soit 27 étiquettes. On ajoute un écart avant de diviser parce que trois étiquettes n’ont que deux écarts entre elles. Tourne-les de 90° et cela devient 6 de large sur 5 de haut — 30 étiquettes, trois de plus. Compte les deux sens avant de monter la planche.',
    note: 'Les vraies marges d’imprimante varient d’un modèle à l’autre et sont plus larges du côté de l’entraînement : une marge de zéro coupe silencieusement la dernière rangée, fais donc un essai avant de lancer la série. Si une machine de découpe fait la coupe, garde au moins 0,2 cm d’écart pour le passage de la lame et ajoute le fond perdu à la taille de l’étiquette, puisque le trait de coupe tombe légèrement en dehors.',
  },

  /* ───────── Quilt et broderie ───────── */
  'quilt-binding': {
    title: 'Biais de finition pour quilt',
    desc: 'La longueur de biais et le nombre de bandes à couper pour un quilt.',
    long: 'Le périmètre fait 2 × (150 + 200) = 700 cm. Ajoute une largeur de bande à chacun des quatre angles (6,4 × 4 = 25,6 cm) et 25 cm pour les jonctions en diagonale et le recouvrement final : 750,6 cm. Les bandes se coupent dans la largeur du tissu et, lisières retirées sur 2 cm, chacune fait 105 cm — d’où huit bandes.',
    note: 'Une bande de 2,5 pouces (6,4 cm) pliée en deux et cousue à 1/4 de pouce finit à environ 1 cm. Assemble les bandes en diagonale à 45° : les jonctions droites s’empilent en épaisseur et bloquent dans les angles.',
  },
  'quilt-backing': {
    title: 'Quilt : tissu du dos',
    desc: 'La longueur de tissu du dos, d’après le quilt, la marge et la laize.',
    long: 'Les trois couches glissent pendant le quiltage, le dos se coupe donc plus grand de tous les côtés. À 10 cm par côté il faut 170 × 220 cm, et 170 cm dépassent la largeur utile (107 − 2 = 105 cm) : il faut assembler deux longueurs, soit 220 × 2 = 440 cm à acheter.',
    note: 'Coupe les lisières avant d’assembler — tissées plus serré, elles tirent la couture en bourrelet. Les quilteuses longarm demandent souvent 10 cm ou plus par côté, renseigne-toi avant de couper. Un tissu de dos extra-large, à partir de 240 cm, évite la couture.',
  },
  'quilt-batting': {
    title: 'Molleton pour quilt',
    desc: 'La coupe et la surface du molleton, d’après le quilt et la marge.',
    long: 'Le molleton demande moins de marge que le dos. À 5 cm par côté, cela fait 160 × 210 cm, soit 3,36 m². Coupé aussi grand que le dos, l’excédent forme un pli épais qui accroche sous le pied-de-biche.',
    note: 'Le molleton se vend en tailles nommées, fixées en pouces — crib, twin, queen. Au mètre, les chutes se raccordent : mets les bords bord à bord plutôt que superposés et couds-les au zigzag, l’épaisseur reste régulière. Le molleton de coton rétrécit de 3 à 5 % au lavage.',
  },
  'quilt-blocks': {
    title: 'Quilt : nombre de blocs',
    desc: 'Les blocs en largeur, en longueur et au total pour un quilt donné.',
    long: '150 ÷ 25 = 6 en largeur et 200 ÷ 25 = 8 en longueur, soit 48 blocs. Quand la division ne tombe pas juste, garde les blocs entiers et comble la différence par des bandes de séparation (sashing) ou des bordures — ajuster une bordure est bien plus simple que redimensionner chaque bloc.',
    note: 'La taille de bloc est ici la taille finie. Un bloc fini de 25 cm se coupe à 26,2 cm, avec 0,6 cm sur chaque bord, et cette marge disparaît dans chaque couture. Douze pouces (30,5 cm) est la taille de bloc la plus courante.',
  },
  'hst-squares': {
    title: 'Triangles HST : taille de coupe',
    desc: 'La taille des carrés de départ pour un HST fini donné.',
    long: 'Deux carrés cousus le long de la diagonale puis coupés donnent deux HST. Ce carré doit porter la taille finie, les deux marges latérales (0,6 × 2 = 1,2 cm) et la couture diagonale (√2 × 0,6 ≈ 0,85 cm), soit 12,05 cm. Mets la marge à 1/4 de pouce exact (0,64 cm) et le résultat devient taille finie + 7/8 de pouce (2,2 cm) : la règle que les quilteuses retiennent par cœur.',
    note: 'Couper un peu large et égaliser ensuite vaut mieux que couper juste. La diagonale est dans le biais et s’allonge quand on la manipule, une coupe exacte finit donc trop petit. Égalise l’unité cousue à 11,2 cm — taille finie plus deux marges — et le bloc tombera juste.',
  },
  'aida-size': {
    title: 'Point de croix : taille du motif',
    desc: 'La taille finie du motif, d’après la grille et le compte de la toile.',
    long: 'Le compte est le nombre de points par pouce. En 14, chaque point mesure 2,54 ÷ 14 = 0,18 cm : 100 points de large font 18,1 cm (7,1 pouces) et 140 de haut, 25,4 cm (10 pouces). La même grille sur une toile 18 tombe à 14,1 × 19,8 cm.',
    note: 'Le lin et l’even-weave se brodent le plus souvent sur deux fils : entre alors la moitié du compte — du lin 28 fils finit à la taille d’une Aida 14. Si le cadre est déjà choisi, changer de toile ajuste le motif bien plus facilement que redessiner la grille.',
  },
  'aida-fabric': {
    title: 'Toile Aida : taille à couper',
    desc: 'La coupe de la toile, d’après la taille finie du motif et la marge.',
    long: 'La toile se coupe avec une marge tout autour du motif. À 8 cm par côté, un motif de 18 × 25 cm demande 34 × 41 cm. Cette marge est ce qui se replie derrière au moment de l’encadrement : la rogner pour économiser ne laisse rien à tendre sur le carton.',
    note: 'Prévois 7,5 cm (3 pouces) par côté pour l’encadrement, et jamais moins de 5 cm. Dans un tambour il en faut encore plus, la toile devant dépasser du cercle. L’Aida s’effiloche vite depuis la coupe : passe un zigzag ou du ruban dès que tu as coupé.',
  },
  'floss-length': {
    title: 'Fil à broder : longueur nécessaire',
    desc: 'La longueur de fil, d’après le nombre de points, les brins et le compte.',
    long: 'En 14, chaque point tient dans un carré de 0,18 cm, et une croix, c’est deux de ses diagonales — 0,51 cm. Les trajets à l’envers et les arrêts au départ et à la fin consomment à peu près autant : compte environ 1,03 cm par point et par brin. Deux brins sur 1 000 points font 20,5 m.',
    note: 'Un écheveau DMC, c’est six brins de 8 m, soit 48 m en brin simple, de quoi couvrir environ 2 300 points à deux brins. Les grands sauts à l’envers et les changements de couleur fréquents l’épuisent bien plus vite : prévois large pour une couleur dispersée sur toute la grille.',
  },

  'quilt-sashing': {
    title: 'Sashing de quilt : bandes de séparation',
    desc: 'La longueur totale de sashing et le tissu, d’après la disposition des blocs et la largeur des bandes.',
    long: 'Quatre blocs en largeur sur cinq en longueur, des blocs de 25 cm avec un sashing de 6 cm, finissent à 4 × 25 + 5 × 6 = 130 cm de large. Le sashing part en deux sortes de pièces : les courtes, entre les blocs, font 5 rangées × 5 × 25 cm = 625 cm, et les longues bandes entre les rangées et le long du haut et du bas font 6 × 130 cm = 780 cm, soit 1 405 cm en tout. Un tissu de 107 cm donne 105 cm une fois la lisière coupée : cela fait 14 bandes, et 14 × 6 = 84 cm de tissu à acheter.',
    note: 'La largeur de sashing saisie est la largeur finie. Pour finir à 6 cm, coupe à 7,2 cm — deux marges de 1/4 de pouce. Toutes les pièces courtes doivent avoir la même longueur, et cette longueur est la taille de coupe du bloc et non sa taille finie, parce que la marge de couture du bord du bloc est encore là.',
  },
  'quilt-border': {
    title: 'Bordures de quilt',
    desc: 'La longueur des bandes et le tissu pour une ou deux bordures autour d’un quilt.',
    long: 'Sur un quilt de 150 × 200 cm, une bordure de 6 cm demande deux bandes latérales de 200 cm et deux bandes en haut et en bas de 150 + 12 = 162 cm, puisque les côtés sont déjà posés — 724 cm ensemble. Une seconde bordure de 10 cm fait le tour du dessus agrandi à 162 × 212 cm : côtés de 212, haut et bas de 182 chacun, soit 788 cm de plus et 1 512 cm en tout. Le quilt finit à 182 × 232 cm.',
    note: 'Coupe la bordure extérieure aux dimensions sans bordure et elle manque de la largeur de la bordure intérieure à chaque angle. Ce calcul travaille dans l’ordre côtés d’abord ; si tu poses le haut et le bas en premier, échange la largeur et la longueur. Le tissu est compté à la largeur finie plus deux marges de 1/4 de pouce (1,2 cm) — si les deux bordures sont dans des tissus différents, répartis le nombre de bandes entre elles.',
  },
  'fat-quarter-yield': {
    title: 'Fat quarter : combien de pièces',
    desc: 'Combien de pièces d’une taille donnée sortent d’un fat quarter.',
    long: 'Un fat quarter est un yard coupé en quatre — 18 × 22 pouces, environ 50 × 55 cm. Y couper des carrés de 4,5 pouces (11,4 cm) en donne quatre en largeur et quatre en longueur, soit 16 carrés et 671 cm² de reste. Quand la pièce n’est pas carrée, la tourner peut en donner plus : les deux orientations sont comptées et la meilleure est affichée.',
    note: 'Saisis la taille de coupe, pas la taille finie ; partir des mesures finies laisse de côté la marge de couture et surestime le rendement. Les fat quarters sont souvent coupés de travers en boutique : considère environ 1 cm d’un bord comme inutilisable, et si le plan tombe tout juste, prends-en un second.',
  },
  'jelly-roll-yield': {
    title: 'Jelly roll : taille du quilt obtenu',
    desc: 'La surface utile et la taille finie d’un rouleau de bandes précoupées.',
    long: 'Un jelly roll, ce sont 40 bandes de 2,5 pouces (6,4 cm) coupées dans une laize de 42 pouces (107 cm). Les assembler enlève 1/4 de pouce à chaque long bord : une bande finit donc à 5,2 cm de large sur 105,8 cm de long. Cousues côte à côte, 40 d’entre elles font 208 × 105,8 cm — une surface de 2,2 m².',
    note: 'Cousues telles quelles, les bandes donnent un panneau court et large de 208 cm. Pour une taille de lit, coupe-le en deux et rassemble les moitiés (104 × 211 cm), ou assemble un long jeu de bandes et recoupe-le en travers. Plus la bande est étroite, plus les coutures en mangent : 19 % à 6,4 cm, 32 % à 3,8 cm (1,5 pouce).',
  },
  'mitred-corner': {
    title: 'Angles à onglet d’une bordure',
    desc: 'La longueur de coupe de chaque bande à onglet et l’endroit où tombe la coupe à 45°.',
    long: 'Un angle à onglet, c’est là où deux bordures se rejoignent à 45° comme un cadre. Pour faire cette diagonale, la bande doit dépasser le bord du quilt de la largeur de bordure à chaque bout, plus 5 cm de sécurité. Sur un côté de 150 cm avec une bordure de 15 cm, coupe 150 + 2 × 20 = 190 cm, marque 20 cm depuis chaque bout et ne pique qu’entre les repères. La diagonale à couper mesure 15 × √2 = 21,2 cm.',
    note: 'Piquer jusqu’aux bouts de la bande rend l’angle impossible à replier. Couds seulement entre les deux repères et arrête les deux extrémités. La diagonale est dans le biais et s’allonge sous le fer : assemble d’abord les deux bandes à 45°, puis recoupe l’excédent — recouper d’abord ne se rattrape pas.',
  },
  'floss-skeins': {
    title: 'Fil à broder : écheveaux à acheter',
    desc: 'Combien d’écheveaux acheter pour une longueur de fil donnée.',
    long: 'Un écheveau, ce sont six brins de 8 m, qui se déroulent en 48 m de brin simple. Soixante mètres de besoin plus 10 % de marge font 66 m ; divisés par 48, cela fait 1,4, arrondi à deux écheveaux, avec 30 m qui restent pour la grille suivante.',
    note: 'Saisis la longueur en brin simple. Broder à deux brins consomme deux fois la longueur que tu tires, et non la longueur que tu tires. Si tu comptes racheter une couleur plus tard, vérifie le bain de teinture — le même numéro dans un autre bain se décale légèrement, et la jonction se voit sur une grande surface remplie.',
  },
  'hoop-size': {
    title: 'Tambour à broder : quel diamètre',
    desc: 'Le plus petit diamètre de tambour qui laisse passer un motif et sa marge.',
    long: 'Un tambour est rond et un motif rectangulaire : ce qui doit tenir n’est ni la largeur ni la hauteur mais la diagonale. Un motif de 18 × 25 cm avec 2 cm de marge de travail devient 22 × 29 cm, et la diagonale vaut √(22² + 29²) = 36,4 cm, soit 14,3 pouces. Choisir un tambour de 8 pouces (20 cm) parce que le motif ne fait que 22 cm de large en met une partie hors du cercle.',
    note: 'Il faut au moins 8 cm de toile au-delà du tambour de chaque côté pour avoir de quoi tenir près de la vis. Les grands motifs se brodent en déplaçant le tambour plutôt qu’en en achetant un plus grand, mais serrer le cercle sur des points déjà faits les écrase et laisse une marque — un cadre à rouleaux ou un cadre fixe évite cela.',
  },
  'thread-count-convert': {
    title: 'Even-weave : conversion de compte',
    desc: 'Les points par pouce effectifs et la taille finie quand un point couvre plusieurs fils.',
    long: 'Le compte, ce sont les fils par pouce. L’Aida groupe ses fils par quatre, si bien qu’un point couvre un bloc, mais le lin et l’even-weave se brodent normalement sur deux fils. Broder du 28 fils sur deux donne 14 points par pouce effectifs : une grille de 100 × 140 finit à 18,1 × 25,4 cm — la même taille que sur de l’Aida 14. L’échelle de 200 % veut dire que le motif fait le double de ce qu’il ferait sur un seul fil.',
    note: 'Que le « 28 fils » d’un modèle signifie déjà 14 effectifs ou non dépend de la créatrice ; une taille finie qui sort de moitié ou du double vient presque toujours de là. Broder sur un seul fil, le petit point, fait des points minuscules qui fatiguent l’œil, et les lignes de point arrière louvoient en diagonale à mesure que le tissage les tire.',
  },

  /* ───────── Bougies ───────── */
  'wax-weight': {
    title: 'Calcul de cire pour bougie',
    desc: 'Passer du volume du contenant au poids de cire à faire fondre.',
    long: 'Remplis le contenant d’eau et pèse-le : tu as le volume en millilitres. La cire est plus légère que l’eau, le même volume pèse donc moins — le soja tourne autour de 0,9 g/cm³.',
    note: 'Ne remplis pas à ras bord. Laisser le dixième du haut libre donne de la place à la mèche et à la diffusion, et le soja creuse souvent en figeant : une seconde coulée de rattrapage est normale.',
  },
  'wax-multi': {
    title: 'Cire pour plusieurs bougies',
    desc: 'Le total de cire pour une série de contenants identiques.',
    long: 'Prends le poids nécessaire pour un contenant et multiplie par le nombre. Le calcul suppose un remplissage aux neuf dixièmes.',
    note: 'Fais fondre environ 5 % de plus. Il en reste toujours dans le pichet, et tomber court sur la dernière bougie oblige à refaire fondre un lot entier pour elle seule.',
  },
  'fragrance-load': {
    title: 'Taux de parfum pour bougie',
    desc: 'Passer d’un poids de cire et d’un pourcentage aux grammes de parfum.',
    long: 'Le taux de parfum est un pourcentage de la cire, pas de la bougie finie. Huit pour cent de 500 g font 40 g de parfum, soit un lot de 540 g. Chaque cire a une limite de ce qu’elle peut retenir ; au-delà, le parfum reste en surface au lieu de se lier.',
    note: 'Pèse le parfum au lieu de le mesurer en volume : sa densité n’est pas celle de l’eau, les millilitres te font dériver de plusieurs pour cent. Suis la température d’ajout indiquée pour la cire, pas celle du parfum.',
  },
  'fragrance-percent': {
    title: 'Taux de parfum à l’envers',
    desc: 'Remonter au taux réel à partir du parfum que tu as versé.',
    long: 'Utile pour noter une recette, ou après avoir vidé le fond d’un flacon et voulu savoir à quel pourcentage cela correspond. Certains fournisseurs rapportent le taux au lot entier, si bien que le même chiffre désigne des quantités différentes — ici, il est rapporté à la cire.',
    note: 'Dépasser le maximum indiqué pour la cire fait suinter le parfum en surface ou encrasse la mèche. Monter le pourcentage est rarement le remède d’une bougie qui sent peu.',
  },
  'candle-burn-time': {
    title: 'Durée de combustion d’une bougie',
    desc: 'Estimer les heures de combustion d’après le poids de cire et la consommation horaire.',
    long: 'Allume la bougie une fois et pèse-la avant et après : tu obtiens les grammes par heure. La cire divisée par ce chiffre donne les heures restantes. C’est la mèche qui fixe la consommation : la même cire brûle plus vite avec une mèche plus grosse.',
    note: 'Ne dépasse pas quatre heures par allumage. Au-delà, la cire surchauffe et du noir de carbone s’installe sur la mèche. La première combustion mérite d’être menée jusqu’à ce que toute la surface ait fondu.',
  },
  'container-volume': {
    title: 'Volume d’un contenant à bougie',
    desc: 'Le volume utile et le poids de cire, d’après le diamètre et la hauteur.',
    long: 'Un pot à parois droites ne demande que son diamètre et sa hauteur intérieurs. Le remplir d’eau reste la méthode la plus juste, mais celle-ci te donne le chiffre avant même que les contenants arrivent.',
    note: 'Un pot qui se resserre en bas contient moins que cela. Pour un contenant carré, prendre un côté comme diamètre surestime le volume — celui-là, vérifie-le à l’eau.',
  },
  'melt-pour-batch': {
    title: 'Base à fondre pour des moules',
    desc: 'La quantité de base à faire fondre pour un ensemble de moules.',
    long: 'Les bases à fondre et couler sont souvent un peu plus denses que l’eau, la valeur par défaut est donc 1,05. On ajoute 5 % pour ce qui reste dans le pichet et la casserole.',
    note: 'La base qui reste se refond : viser large ne coûte rien. Viser court laisse le dernier moule à moitié vide, et cela coûte.',
  },
  'wax-cost-per-candle': {
    title: 'Coût matière par bougie',
    desc: 'Additionner la cire et les fournitures en un coût matière par bougie.',
    long: 'La cire s’achète au kilo et s’emploie au gramme. À 9 000 le kilo, une bougie de 180 g porte 1 620 de cire. Mets le contenant, la mèche, le parfum et l’étiquette dans le champ des fournitures.',
    note: 'Les matières ne sont qu’une part du coût. Si tu vends, souviens-toi que ce chiffre ignore les ratés, l’emballage, l’envoi et les commissions.',
  },

  'wax-topup': {
    title: 'Seconde coulée : cire de rattrapage',
    desc: 'Le poids de la coulée de rattrapage et la cire totale à faire fondre, d’après un taux de retrait.',
    long: 'Le soja s’affaisse autour de la mèche en figeant et laisse un creux en surface. Une première coulée de 180 g à 10 % de retrait demande 18 g pour combler : fais donc fondre 198 g dès le départ. Le retrait dépend de la cire, du contenant et de la vitesse de refroidissement — la même cire ne se comporte pas pareil dans du verre et dans une boîte en métal.',
    note: 'Fais le rattrapage quand la première couche a figé, et coule-le 5 à 10 °C plus froid que la première. Une cire versée trop chaude refait fondre la couche du dessous, qui s’affaisse à nouveau. Réchauffer le reste dans la casserole chasse le parfum : mieux vaut mettre la part du rattrapage de côté séparément.',
  },
  'candle-dye-load': {
    title: 'Taux de colorant pour bougie',
    desc: 'Le poids de colorant d’après la cire et le pourcentage, avec le taux d’additifs total.',
    long: 'Le colorant tourne normalement entre 0,1 et 1 % du poids de cire. Un demi pour cent de 500 g fait 2,5 g — un morceau de bloc de la taille d’un ongle. Ajoute 8 % de parfum et la cire porte 8,5 % au total, et c’est bien ce total qu’il faut comparer à la charge maximale annoncée par le fabricant.',
    note: 'Colorant et parfum se disputent la même capacité dans la cire. Foncer la couleur alors que le parfum est déjà au maximum laisse de l’huile suinter en surface ou encrasse la mèche. N’utilise pas de crayons de couleur — les particules de pigment ne se dissolvent pas et étouffent la mèche. Une cire colorée s’éclaircit d’un ton en figeant : juge la couleur froide, pas fondue.',
  },
  'wax-blend': {
    title: 'Mélange de deux cires',
    desc: 'Répartir un poids total de cire entre deux cires selon un rapport choisi.',
    long: 'Mélanger une cire dure et une cire molle règle les propriétés. Un kilo en 7 : 3 fait 700 g de A et 300 g de B. Ajouter 10 à 30 % de paraffine ou de cire d’abeille à un soja pour contenant lisse le dessus et retient le parfum plus longtemps, mais la cire d’abeille élève le point de fusion, ce qui veut d’ordinaire dire monter d’une taille de mèche.',
    note: 'Un mélange se place entre ses deux cires, mais des valeurs comme le point de fusion ne varient pas en ligne droite. Une fois le rapport fixé, coule une bougie, laisse-la mûrir deux jours et brûle-la — chaque changement de mélange demande de retester la mèche. Le soja et la paraffine figent à des vitesses différentes : la limite peut givrer ou marbrer.',
  },
  'layer-pour': {
    title: 'Bougie en couches',
    desc: 'La cire par couche et par bougie pour une coulée en couches.',
    long: 'Un contenant de 200 mL rempli à 90 % tient 180 mL, soit 162 g de cire. Réparti en trois couches, cela fait 60 mL et 54 g chacune. Pour des couches inégales, prends ce chiffre et applique un rapport à chacune — une couche du bas plus épaisse pose le poids visuel en bas et paraît plus stable.',
    note: 'Coule la couche suivante quand celle du dessous a assez figé pour qu’un doigt n’y laisse pas de marque. Versée sur une couche encore molle, les couleurs se mêlent ; versée sur une couche complètement froide, les couches ne se lient pas et se fendent à la combustion. Un parfum différent par couche est une mauvaise idée — la flamme réchauffe les couches du dessous et les mélange de toute façon.',
  },
  'container-fill-height': {
    title: 'Hauteur de cire dans le contenant',
    desc: 'À quelle hauteur un poids de cire monte dans un contenant d’un diamètre intérieur donné.',
    long: 'Diviser 180 g par une densité de 0,9 donne 200 mL, et un diamètre intérieur de 7 cm a une surface de base de 38,5 cm² : la cire monte donc à 5,2 cm. Connaître cette hauteur avant de couler, c’est ainsi qu’on vérifie que le socle de la mèche est recouvert et que le remplissage reste sous le haut de l’étiquette.',
    note: 'Les socles de mèche font 3 à 6 mm d’épaisseur ; une cire moins profonde laisse le socle à nu et envoie la fin de la chaleur dans le fond du verre. Un contenant qui se resserre en bas monte plus haut que cela, et saisir un côté au lieu d’un diamètre pour un pot carré donne un résultat trop bas. Pose l’étiquette sous la ligne de cire — une étiquette au-dessus de la surface se décolle quand la bougie chauffe.',
  },
  'fragrance-max': {
    title: 'Taux de parfum maximal',
    desc: 'Le plafond d’huile d’une cire et la marge que ton taux prévu laisse encore.',
    long: 'Si la cire annonce un maximum de 10 %, 500 g peuvent porter 50 g d’huile. Prévoir 8 % en met 40 g et laisse 10 g de marge. Cette marge n’est pas réservée au parfum seul — le colorant et tout autre additif partagent la même allocation.',
    note: 'Une marge négative veut dire que le plafond est déjà dépassé. L’huile en trop ne se lie pas : elle suinte de la surface figée ou s’accumule au fond, et elle remonte par la mèche pour donner une flamme trop grande. Si la bougie sent encore faible au maximum, la réponse est l’huile, la température d’ajout ou la maturation plutôt que le pourcentage — le soja demande une à deux semaines pour diffuser correctement.',
  },
  'candle-price': {
    title: 'Prix de vente d’une bougie',
    desc: 'Le prix de vente pour une marge visée, et la marge qu’un prix choisi donne réellement.',
    long: 'La marge se mesure sur le prix de vente. Pour garder 60 % sur un coût matière de 4 000, le prix est 4 000 ÷ (1 − 0,6) = 10 000. Ajouter 60 % au coût donne au contraire 6 400, ce qui fait une marge de 37,5 % et non de 60 %. Vendre à 9 000 laisse 5 000 de bénéfice et une marge de 55,6 %.',
    note: 'Seules les matières sont dans ce chiffre. Les coulées ratées, l’emballage et le calage, l’affranchissement, les commissions de plateforme (souvent 3 à 10 % du prix) et les heures passées aux photos et aux étiquettes sont tous en dehors. Si tu vends aussi en gros, le prix de gros doit valoir au moins deux fois ce coût matière pour que le prix de détail survive.',
  },
  'candles-from-wax': {
    title: 'Combien de bougies avec ta cire',
    desc: 'Combien de bougies d’une taille donnée une quantité de cire permet de faire.',
    long: 'Prends un sac de 5 kg, perds 5 % dans la casserole et le pichet, et 4 750 g sont ce qui est réellement coulé. À 180 g chacune, cela fait 26 bougies et 70 g de reste. Ajoute ces 70 g au lot suivant ou coule-les en fondant parfumé — il reste chaque fois un peu moins qu’une bougie.',
    note: 'Le parfum n’est pas dans ce compte. L’huile s’ajoute par-dessus le poids de cire : elle ne réduit pas le nombre de bougies, mais c’est un coût à part. Le taux de perte dépend de la taille du lot : 5 % est généreux pour fondre 5 kg d’un coup, mais fondre 500 g dix fois laisse le même résidu dix fois et dépasse 10 %.',
  },

  /* ───────── Savon et résine ───────── */
  'lye-naoh': {
    title: 'Calculateur de soude (NaOH) pour savon',
    desc: 'Passer du poids d’huile et de l’indice SAP à la soude nécessaire.',
    long: 'Les indices SAP sont publiés en milligrammes d’hydroxyde de potassium par gramme d’huile : pour s’en servir avec de la soude, on divise par 1402,5 — le rapport molaire entre KOH à 56,1 et NaOH à 40,0, ramené des milligrammes aux grammes. L’huile d’olive a un SAP de 190 : 500 g avec 5 % de surgraissage demandent 64 g de soude. L’indice appartient à l’huile, pas au savon en général : cet outil traite une huile à la fois, et une recette mélangée se calcule huile par huile avant d’additionner les soudes. L’eau est affichée à côté, au double de la soude, comme point de départ.',
    note: 'La soude va dans l’eau, jamais l’eau sur la soude — dans le mauvais sens, cela peut bouillir et projeter en quelques secondes. Porte des lunettes et des gants, et mélange dans de l’inox ou du HDPE, jamais dans de l’aluminium, que la soude attaque en dégageant de l’hydrogène. La solution monte d’elle-même à 80–90 °C au contact : pas de verre, pas de plastique fin. Trop peu de soude laisse un savon mou qui ne durcit jamais ; trop de soude, un savon caustique.',
  },
  'lye-koh': {
    title: 'Calculateur de potasse (KOH)',
    desc: 'La potasse caustique pour le savon liquide, pureté comprise.',
    long: 'Les indices SAP sont déjà exprimés en KOH : pas de 1402,5 ici, seulement les 1000 qui transforment les milligrammes en grammes. Les paillettes de KOH captent l’humidité de l’air et se vendent en général à 90 % de pureté ; il faut donc diviser le besoin pur par cette pureté pour obtenir le poids qui passe réellement sur la balance. 500 g d’huile à SAP 190, 3 % de surgraissage et 90 % de pureté donnent 102 g. L’indice reste celui de l’huile : les mélanges se calculent huile par huile, puis on additionne.',
    note: 'Ici aussi, l’alcali va dans l’eau — dans l’autre sens, cela bout et projette. Lunettes, gants et récipient en inox ou en HDPE ; l’aluminium est attaqué par l’alcali. Le KOH chauffe plus fort que le NaOH, le pic de température est plus haut. Le savon liquide garde un surgraissage bas, de 0 à 3 %, car l’huile non saponifiée ne se dissout pas et trouble le savon fini. Trop peu d’alcali et l’huile libre surnage ; trop, et le pH grimpe au-delà de l’utilisable.',
  },
  'water-lye-ratio': {
    title: 'Rapport eau / soude',
    desc: 'Passer d’un poids de soude et d’un rapport eau : soude à l’eau et à la concentration.',
    long: 'L’eau ne fait que porter la soude dans les huiles : elle ne participe pas à la saponification et repart pendant la cure. C’est donc la concentration de la solution qui compte : 2 : 1 donne une solution à 33 %, 1,5 : 1 une solution à 40 %. Soixante-cinq grammes de soude à 2 : 1 demandent 130 g d’eau, et avec 500 g d’huile la pâte fait 695 g.',
    note: 'Plus d’eau donne une pâte plus fluide, plus facile à marbrer, mais qui démoule plus tard et se retire davantage à la cure. Une solution plus concentrée chauffe plus fort : part d’eau froide. Si tu remplaces une partie de l’eau par de la glace, la glace compte toujours dans le poids d’eau.',
  },
  'soap-batch-scale': {
    title: 'Redimensionner une recette de savon',
    desc: 'Mettre les huiles, la soude et l’eau d’une recette à l’échelle d’un autre lot.',
    long: 'Dans une recette de savon, tout bouge ensemble : 1,5 fois les huiles, c’est 1,5 fois la soude et 1,5 fois l’eau. Le volume du moule est la façon simple de choisir le facteur — passer d’un moule de 1 200 mL à un moule de 1 800 mL, c’est 1,5. Une recette de 500 g d’huiles, 65 g de soude et 130 g d’eau multipliée par 1,5 devient 750 g, 97,5 g et 195 g.',
    note: 'Ne recalcule pas la soude depuis le début, mets-la simplement à l’échelle : tant que les huiles sont les mêmes, l’indice SAP n’a pas changé. Le comportement, lui, change : un gros lot garde sa chaleur plus longtemps et épaissit plus vite, et les couleurs ou parfums soutenus accélèrent encore. Change une huile et c’est l’indice SAP, pas le facteur, qu’il faut refaire.',
  },
  'resin-volume': {
    title: 'Résine époxy : quantité à couler',
    desc: 'Le poids de résine pour un moule rectangulaire, densité comprise.',
    long: 'Un moule rectangulaire, c’est largeur × profondeur × hauteur, et un centimètre cube fait un millilitre. La résine est un peu plus lourde que l’eau — l’époxy tourne autour de 1,1 g/cm³ — donc un moule à dessous de verre de 10 × 10 × 2 cm fait 200 mL et 220 g. Pour un moule rond, élève au carré la moitié du diamètre, multiplie par π, puis par la profondeur. Dans les deux cas, mesure à l’intérieur.',
    note: 'Prépare 5 à 10 % de plus que le résultat. Il en reste plus que tu ne crois sur le gobelet et le bâtonnet, et tomber court en pleine coulée laisse une ligne visible là où le second mélange a rejoint le premier. Chaque résine a aussi une épaisseur de coulée maximale, souvent 5 à 10 mm : un moule profond se coule en couches, divise donc ce poids par le nombre de couches.',
  },
  'resin-mix': {
    title: 'Résine époxy : dosage A / B',
    desc: 'Répartir un poids total de résine entre le composant A et le composant B.',
    long: 'Une résine 2 : 1 partage le total en trois parts — deux de résine, une de durcisseur — donc 220 g font 146,7 g de A et 73,3 g de B. Le rapport utilisé ici est un rapport en poids. Les fabricants impriment couramment les deux, un 2 : 1 en volume à côté d’un 100 : 45 en poids : sur une balance, c’est le rapport en poids qu’il faut lire.',
    note: 'Une résine hors dosage ne durcit pas. Plus de durcisseur ne la rend pas plus dure : elle reste collante, ou la chaleur se concentre et elle fissure. Prends une balance au 0,1 g et, pour les petites coulées sous 20 g, prépare un peu plus que nécessaire et verse dedans, car l’erreur y pèse plus lourd que la résine. Transvaser dans un second gobelet décale le rapport de tout ce qui est resté dans le premier.',
  },
  'resin-pigment': {
    title: 'Résine époxy : dosage du pigment',
    desc: 'Passer d’un poids de résine et d’un taux de pigment aux grammes de couleur.',
    long: 'Le taux de pigment se rapporte au total mélangé, résine plus durcisseur. Trois pour cent de 220 g font 6,6 g. La poudre de mica est déjà forte à 1–3 %, et les colorants liquides teintent avec quelques gouttes, autour d’un demi pour cent — reste sous 0,5 % si la pièce doit rester translucide.',
    note: 'Trop de pigment empêche la prise. Environ 6 % du total est la limite pratique ; au-delà, la couleur gêne la réaction et la surface reste collante. Ajoute la couleur seulement quand A et B sont parfaitement réunis — teinter avant, c’est se priver de voir si les deux composants ont vraiment été mélangés. Les couleurs à l’eau, aquarelle ou acrylique, troublent la résine et ralentissent la prise.',
  },
  'silicone-mould': {
    title: 'Moule en silicone : quantité',
    desc: 'Retirer le modèle du volume de la boîte pour trouver le silicone nécessaire.',
    long: 'Le silicone, c’est tout ce que le modèle ne remplit pas. La façon la plus fiable d’obtenir le volume du modèle est le déplacement : plonge-le dans un verre rempli à ras bord et mesure ce qui déborde. Une boîte de 500 mL autour d’un modèle de 120 mL demande 380 mL de silicone, soit 437 g à une densité de 1,15. Mesure la boîte à l’intérieur : largeur × profondeur × hauteur en centimètres donnent des millilitres.',
    note: 'Laisse au moins un centimètre de silicone entre le modèle et les parois. Des parois minces laissent le moule s’écarter, la résine fuit, et il se déchire au bout de quelques coulées. Le silicone se mélange aussi en deux composants : passe ce poids par l’outil de dosage A / B, et ajoute 5 % pour ce qui reste dans le gobelet — une coulée de silicone reprise à mi-hauteur se fend à la jonction.',
  },

  'multi-oil-lye': {
    title: 'Calculateur de soude pour un mélange d’huiles',
    desc: 'Additionne trois huiles, chacune avec son indice SAP, et donne la soude que le mélange demande.',
    long: 'Une recette mélangée se calcule huile par huile avant d’additionner, parce que l’indice SAP appartient à l’huile et non au savon en général — prends chaque valeur sur les données de cette huile, fiche du fournisseur ou table SAP standard. L’huile d’olive à 300 g (SAP 190), l’huile de coco à 150 g (SAP 258) et l’huile de ricin à 50 g (SAP 180) donnent 300 × 190 + 150 × 258 + 50 × 180 = 104 700, qui divisé par 1402,5 fait 74,7 g de NaOH ; en retirant 5 % de surgraissage il reste 70,9 g. L’indice SAP du mélange affiché à côté, 209,4 ici, est la moyenne pondérée par les poids : c’est le nombre à reprendre si tu traites plus tard ce mélange comme une huile unique. Change une huile et il bouge, donc la soude doit être refaite.',
    note: 'La soude va dans l’eau, jamais l’eau sur la soude — dans le mauvais sens, cela peut bouillir et projeter en quelques secondes. Porte des lunettes et des gants, et mélange dans de l’inox ou du HDPE, jamais dans de l’aluminium, que la soude attaque en dégageant de l’hydrogène. La solution monte d’elle-même à 80–90 °C au contact : pas de verre, pas de plastique fin. Un seul poids d’huile mal saisi fait dériver la soude — trop peu laisse un savon mou qui ne durcit jamais, trop laisse un savon caustique. Mets à zéro le poids d’une huile que tu n’utilises pas : un indice SAP resté seul dans sa case ne change rien.',
  },
  'water-discount': {
    title: 'Réduction d’eau du savon (water discount)',
    desc: 'Retire un pourcentage de l’eau de référence et vois le poids d’eau et la concentration de la solution.',
    long: 'L’eau ne participe pas à la saponification : elle porte la soude dans les huiles puis repart pendant la cure. La réduire n’est donc pas une économie de matière mais une façon de concentrer la solution. Soixante et onze grammes de soude à 2 : 1 font 142 g d’eau, une solution à 33 %. Retires-en 20 % et il reste 113,6 g d’eau à 38,5 %. Une solution plus concentrée met moins d’eau dans la pâte : la trace arrive nettement plus tôt — moins de temps pour marbrer, mais assez de fermeté pour démouler dans la journée, une cure plus courte et moins de retrait. C’est pourquoi la réduction convient aux savons unis et aux lots pressés, tandis qu’un marbrage compliqué veut une réduction à zéro, ou même de l’eau en plus.',
    note: 'Environ 50 % est la limite pratique : au-delà, la soude ne se dissout pas entièrement et laisse des grains qui finissent dans le savon. Plus la réduction est forte, plus la solution monte haut en température : part d’eau froide — et garde l’ordre, la soude dans l’eau, sinon cela bout et projette. Lunettes, gants, inox ou HDPE, jamais d’aluminium. Réduire l’eau ne change jamais le poids de soude : réduis la soude en même temps que l’eau et tu obtiens un savon mou qui ne prend pas, pèse par erreur de la soude dans la case de l’eau et tu obtiens un savon caustique.',
  },
  'soap-mold-fill': {
    title: 'Volume de moule à savon',
    desc: 'Passer du volume d’un moule et d’une densité de pâte au poids du lot, et aux huiles qu’il contient.',
    long: 'Les moules se mesurent en volume, les recettes en poids, et c’est la densité de la pâte qui les relie — la pâte à savon est un peu plus légère que l’eau, 0,9 à 1,0 g/mL, et 0,95 est la valeur par défaut ici. Un moule de 1 200 mL tient donc environ 1 140 g de pâte. En retirer les huiles demande une hypothèse : la soude est une part fixe du poids d’huiles (13,5 % par défaut, un chiffre réaliste pour les mélanges courants) et l’eau un multiple de la soude (2× par défaut). La pâte vaut alors 1 + 0,135 + 0,27 = 1,405 fois les huiles, donc 1 140 ÷ 1,405 = 811 g d’huiles, 109,5 g de soude et 219 g d’eau. La vraie part de soude est fixée par ton mélange d’huiles : dès qu’il est arrêté, mets dans cette case le rapport soude ÷ huiles donné par le calculateur de soude pour un mélange. Mesure le moule à l’eau, et attends-toi à ce qu’un moule en silicone prenne environ 5 % de plus que l’arithmétique, parce que ses parois s’écartent sous la pâte.',
    note: 'Ne remplis pas à ras bord. La pâte monte en chauffant, et un lot qui passe en phase de gel par-dessus le bord fige en flaque autour du moule — laisse 1 à 1,5 cm de libre. Verse trop peu et les barres sortent basses et s’effritent à la coupe. La densité bouge avec la recette : les huiles dures comme la coco l’alourdissent, une pâte fouettée est bien plus légère. Une fois un moule coulé, note le poids de pâte divisé par son volume et sers-t’en — ton propre chiffre bat n’importe quelle valeur par défaut.',
  },
  'soap-cure-progress': {
    title: 'Cure du savon : où en est-elle',
    desc: 'Les jours écoulés face à une cure visée donnent le pourcentage atteint et les jours restants.',
    long: 'La cure, c’est l’eau qui part, pas la saponification. La réaction elle-même est d’ordinaire finie en 24 à 48 heures, le pain est donc déjà du savon à ce moment-là, mais il est mou et s’use vite parce que l’eau du mélange est encore dedans. En quatre à six semaines cette eau s’évapore, la barre durcit et la mousse devient plus fine et plus tenace. Face à une cure visée de 42 jours, le jour 14 fait 33 % avec 28 jours à courir. L’objectif est un repère, pas une échéance — les savons continuent de s’améliorer au-delà de 100 %, et un savon de Castille riche en huile d’olive est visiblement meilleur à deux ou trois mois, meilleur encore à six. Pour le suivre vraiment, prends une balance : pèse une barre, note son poids, et repèse tous les quelques jours ; quand le poids cesse de baisser, l’eau est partie, en général 5 à 10 % sous le point de départ.',
    note: 'Ce pourcentage compte des jours et ne sait rien de ta pièce. Dans un été humide, le poids baisse encore bien après le jour 42 ; dans l’air sec de l’hiver, cela finit plus tôt. Pose les barres sur chant, espacées, sur une étagère ventilée — empilées ou en carton, les jours passent et l’eau reste. L’emballage en film ou en plastique vient après la cure, pas pendant. Et une barre molle par manque de soude ne durcit jamais : la cure corrige l’humidité, pas une recette mal pesée.',
  },
  'resin-coverage': {
    title: 'Résine : quantité pour une surface',
    desc: 'Le volume et le poids de résine pour couvrir une surface à une épaisseur donnée.',
    long: 'Un revêtement, c’est la surface fois l’épaisseur, et le seul piège est l’unité : des centimètres carrés multipliés par des millimètres doivent être divisés par 10 pour tomber sur des centimètres cubes, qui sont des millilitres. Un plateau de 60 × 60 cm, 3 600 cm², à 3 mm prend 1 080 mL, soit 1 188 g à une densité de 1,1. Les grandes surfaces comme un plateau de table se coulent rarement plus épais qu’environ 3 mm d’un coup : l’épaisseur se découpe donc en couches — saisis l’épaisseur d’une couche et répète la coulée plutôt que de recalculer chaque fois. Une résine autolissante s’égalise seule sur un plan de niveau, mais un demi-degré d’inclinaison épaissit le bord bas et affame le bord haut : un niveau à bulle compte plus que l’arithmétique.',
    note: 'Prévois ce qui coule à côté. Une surface sans rebord — un plateau de table, l’extérieur d’un plateau — perd de la résine par les bords : compte 10 à 20 % au-dessus du chiffre et pose du ruban en digue ou un bac dessous. Mélange toujours 5 à 10 % de plus pour ce qui reste au gobelet et au bâtonnet. Couler toute l’épaisseur d’un coup concentre l’exothermie et la plaque jaunit ou fissure : respecte l’épaisseur maximale par coulée indiquée sur le flacon. Les surfaces poreuses comme le bois nu boivent la première couche : scelle-les d’une couche fine avant la vraie.',
  },
  'resin-doming': {
    title: 'Résine : dôme (doming)',
    desc: 'La résine d’une coulée bombée, d’après le diamètre de la pièce et la hauteur du dôme.',
    long: 'Un dôme est une tranche de sphère et non un cylindre : multiplier le diamètre par la hauteur le surestime largement. La bonne formule est πh(3a² + h²)/6, avec a le rayon. Un support de 25 mm bombé de 3 mm contient 750 mm³, soit 0,75 mL ; dix pièces font 7,5 mL, ou 8,3 g à 1,1 g/cm³. Un dôme naturel vaut à peu près 8 à 12 % du diamètre — 2 à 3 mm sur une pièce de 25 mm — et vouloir aller au-delà échoue, parce que la tension superficielle est l’hypothèse qui porte tout ce calcul. La résine construit sa propre lentille là où tu la poses, et cette hauteur est fixée par la viscosité et la tension superficielle plutôt que par l’arithmétique. Prends le résultat comme « la résine que contient un dôme de cette hauteur », puis remplis jusqu’au bord et ajoute des gouttes à l’œil.',
    note: 'Les dômes coulent. Sans une arête au bord, la résine passe par-dessus, fige au dos, et la poncer prend plus longtemps que de recouler — mets du ruban sous la pièce ou choisis un support à rebord. Une résine de faible viscosité, vendue pour les coulées de surface, s’étalera au lieu de bomber, aussi peu que tu en mettes. Laisse le mélange reposer une demi-heure avant de couler et la plupart des bulles remontent seules ; passe vite un chalumeau sur celles qui restent, car le tenir en place creuse la surface.',
  },
  'resin-cups': {
    title: 'Résine : répartir les couleurs en gobelets',
    desc: 'Répartir un poids total de résine en gobelets, un par couleur, à égalité ou avec un fond plus grand.',
    long: 'Travailler en plusieurs couleurs veut dire diviser la résine en gobelets, et l’ordre compte : réunis d’abord complètement A et B, puis répartis. Deux cent vingt grammes sur trois couleurs font 73,3 g chacune ; donne 40 % à la couleur de fond et cela devient 88 g plus 66 g pour chacune des deux autres. Laisser la part principale à zéro rend une répartition égale. Les répartitions égales sont rares en pratique — le fond prend d’ordinaire plus de la moitié tandis qu’un accent ne demande que quelques grammes — donc fixer la part du fond puis diviser le reste correspond à la façon dont les pièces sont vraiment coulées. Prépare un gobelet de plus que nécessaire : une couleur devenue terne ne se rattrape pas, et quelques grammes de résine transparente gardés de côté sont ce qui la sauve.',
    note: 'Réunis complètement chaque gobelet avant d’y mettre le moindre pigment. Teinte d’abord et tu ne peux plus voir si A et B se sont vraiment mariés, et un gobelet mal mélangé reste collant tout seul. Le temps passé à transvaser sort aussi du temps de travail : avec six gobelets, le dernier épaissit déjà, donc pour beaucoup de couleurs pèse en deux tournées plutôt qu’une. Chaque transfert laisse 1 à 2 g sur la paroi : un peu moins que les chiffres arrive dans le moule. Les petits gobelets ont une base étroite qui fait vaciller la balance — pose le gobelet, remets à zéro et remplis un gobelet à la fois.',
  },
  'silicone-ratio': {
    title: 'Silicone : dosage A : B',
    desc: 'Répartir un poids total de silicone entre le composant A et le composant B, en poids.',
    long: 'Le rapport dépend de la famille de silicone. La réticulation platine, par addition, est d’ordinaire 1 : 1, le total se coupe donc en deux ; la réticulation étain, par condensation, utilise une petite charge de catalyseur, typiquement 10 : 1 ou 100 : 5, c’est-à-dire 20 : 1. Cinq cents grammes en 10 : 1 font 454,5 g de A et 45,5 g de B, le catalyseur pesant 9,1 % du lot. Les mêmes 500 g en 1 : 1 font 250 g chacun et 50 % de catalyseur — une pesée complètement différente, et c’est pourquoi couper le total en deux sans lire le bidon est l’erreur classique. Ce sont des rapports en poids ; beaucoup de produits impriment aussi un rapport en volume, alors lis le chiffre en poids quand tu travailles à la balance. Le calcul est le même que pour le dosage de la résine, mais le silicone pardonne beaucoup moins en petit lot, parce que le catalyseur pèse très lourd d’un seul côté.',
    note: 'Quand le côté catalyseur ne fait que 45 g, se tromper de 1 g est déjà une erreur de 2 % — prends une balance au 0,1 g et ne dose jamais le composant B à l’œil. Trop peu de catalyseur et le moule reste collant à l’intérieur et ne démoule pas ; trop, et il prend avant que tu aies fini de couler. La réticulation platine est aussi sensible à la contamination : une pâte à modeler soufrée, des gants en latex ou un gobelet qui a contenu de l’étain laissent une zone qui ne durcira jamais, alors teste un coin discret si tu doutes du modèle. Ne mélange jamais les deux familles. Pèse 5 % de plus là aussi — un silicone coulé en deux fois se fend le long de la jonction.',
  },

  /* ───────── Perles et emballage ───────── */
  'bead-count': {
    title: 'Nombre de perles pour un collier',
    desc: 'Combien de perles remplissent un fil, d’après sa longueur et le diamètre.',
    long: 'Une perle occupe son propre diamètre sur le fil : la longueur divisée par le diamètre donne le nombre. Un fil de 45 cm en perles de 8 mm en porte 56 et se remplit sur 44,8 cm. Si des intercalaires ou des nœuds se glissent entre les perles, mets cet écart dans le champ de marge — le pas devient diamètre plus écart.',
    note: 'La division arrondit vers le bas : il n’y a pas de demi-perle, et les derniers millimètres finissent près du fermoir. Retire d’abord 1 à 2 cm de la longueur pour le fermoir et les perles à écraser. Les diamètres annoncés sont nominaux et la pierre naturelle varie d’une perle à l’autre : compte une ou deux perles d’écart en pratique.',
  },
  'bead-weight': {
    title: 'Poids des perles',
    desc: 'Multiplier un nombre de perles par le poids d’une perle.',
    long: 'Dès que tu sais ce que pèse une perle, il ne reste qu’une multiplication : les rondes en verre de 8 mm font environ 0,6 g, donc 100 perles pèsent 60 g. Une perle seule s’affiche à 0,0 g sur une balance de cuisine : pèses-en vingt et divise par vingt, c’est la façon juste d’obtenir le poids unitaire. La deuxième ligne indique combien de perles tient un sachet de 100 g.',
    note: 'Les perles se vendent le plus souvent au poids et non à l’unité : convertir le poids d’un sachet en perles est le seul moyen de savoir s’il couvre le modèle. La même perle de 8 mm peut varier du triple entre verre, acrylique et métal, repèse dès que le matériau change. Le poids du sachet comprend aussi la poussière et les éclats.',
  },
  'wire-length-wrap': {
    title: 'Fil à bijoux : longueur d’enroulement',
    desc: 'Le fil nécessaire pour un nombre de tours autour d’un mandrin.',
    long: 'Un fil enroulé autour d’un mandrin ou d’une perle suit le cercle que trace sa propre ligne médiane, et le diamètre de ce cercle vaut le mandrin plus le fil. Cinq tours de fil de 0,8 mm sur un mandrin de 8 mm prennent 138 mm. La partie enroulée mesure tours × diamètre du fil de haut, ici 4 mm : c’est le chiffre à vérifier pour dimensionner une bélière.',
    note: 'Coupe 2 à 3 cm de plus à chaque extrémité. Sans un bout à saisir à la pince, impossible de serrer le dernier tour, et le fil s’allonge un peu quand on le serre. Un fil épais, 0,8 mm ou calibre 20 et plus, résiste à l’enroulement à la main : les spirales réelles sortent plus lâches que le calcul.',
  },
  'jump-ring': {
    title: 'Anneaux de jonction : combien',
    desc: 'Passer des diamètres de mandrin et de fil au nombre d’anneaux et au fil par anneau.',
    long: 'Un anneau est un cercle, et le diamètre de sa ligne médiane vaut le mandrin plus le fil. Un mandrin de 6 mm avec du fil de 1 mm prend 22 mm par anneau : un mètre de fil en donne 45. Enroulée en spirale, celle-ci mesure nombre d’anneaux × diamètre du fil — 45 anneaux font une spirale de 45 mm, et c’est ainsi qu’on décide de la longueur de mandrin quand on enroule d’abord et qu’on coupe ensuite.',
    note: 'Le mandrin divisé par le diamètre du fil est le rapport d’aspect, l’AR. En dessous de 4 environ, l’anneau est trop serré pour se refermer proprement, et les motifs de chainmaille imposent un AR : changer l’un des deux diamètres seul casse le tissage. Chaque coupe perd en plus l’épaisseur de la lame : le rendement réel est inférieur d’un ou deux anneaux.',
  },
  'macrame-cord': {
    title: 'Macramé : longueur de corde',
    desc: 'La longueur à couper par brin et le total, d’après la section à nouer.',
    long: 'Les nœuds mangent de la corde. Le nœud plat suit la règle des quatre fois la longueur finie : une section nouée de 30 cm veut donc des brins de 120 cm, et huit brins font 9,6 m en tout. Un brin plié en deux sur un anneau perd la moitié de sa longueur dans la pliure : celui-là se coupe à huit fois.',
    note: 'Le facteur dépend du nœud : quatre fois pour le nœud plat, six et plus pour la torsade, jusqu’à huit pour les motifs denses. Une corde plus épaisse consomme plus à nœud égal : nouer un court échantillon et le mesurer est la manière fiable de fixer le facteur. Une corde trop courte ne se raccorde pas en cours de route — il faut recommencer.',
  },
  'ribbon-length': {
    title: 'Longueur de ruban cadeau',
    desc: 'Le ruban pour un croisillon, d’après la boîte et la marge pour le nœud.',
    long: 'Un croisillon fait deux fois le tour de la boîte — une fois dans un sens, une fois dans l’autre — et la hauteur compte deux fois à chaque tour. Une boîte de 20 × 15 × 8 cm prend 102 cm pour les deux tours, plus 30 cm pour le nœud, soit 132 cm.',
    note: 'C’est la marge du nœud qui décide de la réponse : un nœud fait à la main veut 25 à 35 cm, un gros nœud décoratif plus de 60 cm. Un ruban étroit fait un nœud plus petit et en demande moins. Le satin s’effiloche à la coupe : garde un centimètre pour le recouper en biais.',
  },
  'giftwrap-size': {
    title: 'Taille du papier cadeau',
    desc: 'La feuille qu’il faut pour une boîte, recouvrement compris.',
    long: 'Un sens doit faire tout le tour de la boîte : c’est (largeur + hauteur) × 2 plus le recouvrement — 59 cm pour une section de 20 × 8 cm. L’autre sens, c’est la profondeur plus de quoi replier chaque extrémité, environ trois quarts de la hauteur de chaque côté, soit profondeur plus 1,5 × hauteur : 30 cm. Ces deux chiffres sont la feuille à couper.',
    note: 'Le papier cadeau vient en rouleaux de largeur fixe, souvent autour de 70 cm. Si la plus petite mesure dépasse la largeur du rouleau, il faut tourner la boîte ou raccorder deux feuilles. Les motifs à sens ne se tournent pas : vérifie la largeur du rouleau avant d’acheter. Couper au ras fait moins net que laisser 2 cm à replier.',
  },
  'clay-weight': {
    title: 'Pâte polymère : poids nécessaire',
    desc: 'Convertir un volume et une densité en poids de pâte à acheter.',
    long: 'On modèle au volume et on achète au poids. La pâte polymère tourne autour de 1,7 g/cm³ : une pièce de 60 cm³ demande 102 g, soit deux pains standard de 57 g. La pâte autodurcissante est plus légère, 1,2 à 1,5, le même volume pèse donc moins, mais elle perd son eau en séchant et se retire de plus de 10 %, ce qu’il faut prévoir dès le modelage.',
    note: 'Remplir le cœur de papier aluminium réduit le poids de pâte de plus de moitié — et une pâte polymère épaisse ne cuit pas uniformément jusqu’au centre, elle fissure en refroidissant. Les grosses pièces reçoivent une armature pour éviter les fissures, pas seulement pour économiser. Le poids des pains varie selon la marque : Fimo 57 g, Fimo Professional 85 g.',
  },
  'necklace-length': {
    title: 'Longueur de collier : nombre de perles',
    desc: 'Passer d’une longueur de collier finie et d’un diamètre de perle au nombre de perles et à la part du fermoir.',
    long: 'Les longueurs de collier ont des noms : ras-de-cou 40 cm, princesse 45 cm, matinée 55 cm, opéra 75 cm, sautoir 105 cm. Un ras-de-cou doit encore passer le tour de cou, d’ordinaire 33 à 35 cm, tandis que la princesse tombe sur la clavicule et la matinée sous la poitrine. L’objectif choisi, le reste est une soustraction : sur un collier de 45 cm, le fermoir et les perles à écraser prennent 20 mm, il reste 430 mm pour les perles, donc des rondes de 8 mm donnent 53 perles et un fini de 44,4 cm. Oublie cette soustraction, divise 450 par 8, enfile 56 perles, et le collier se ferme à 46,8 cm — au-delà de la longueur voulue. La longueur de fil indiquée à côté est l’objectif plus 10 cm, les bouts que tu repasses dans les perles à écraser à chaque extrémité.',
    note: 'Le compte arrondit vers le bas : les millimètres en trop se rassemblent au fermoir et il n’y a pas de demi-perle. Les diamètres imprimés sont nominaux et la pierre naturelle varie d’un demi-millimètre par perle : compte une ou deux perles d’écart. La part du fermoir varie plus que tout le reste — un petit mousqueton fait 10 mm, un fermoir magnétique à boule ou un modèle à chaînette d’extension dépasse 40 mm. Les colliers pendent aussi vers l’avant sous leur poids et paraissent un peu plus longs devant : dans le doute, retire un centimètre à l’objectif.',
  },
  'bracelet-size': {
    title: 'Taille de bracelet',
    desc: 'Ajouter l’aisance à un tour de poignet pour obtenir la longueur du fil et le nombre de perles.',
    long: 'Un bracelet ne se construit pas au tour de poignet nu, parce que le fil passe par l’extérieur des perles et non contre la peau — plus la perle est grosse, plus la circonférence effective augmente. L’aisance courante est de 1 à 1,5 cm pour un bracelet élastique et de 1,5 à 2 cm pour un bracelet à fermoir, puisqu’un fermoir doit tourner autour du poignet et ne se ferme pas sans jeu. Un poignet de 16 cm plus 1,5 cm donne un fil de 17,5 cm, qui porte 21 perles de 8 mm. Pour un bracelet à fermoir, prends la longueur du fermoir — d’ordinaire 10 à 15 mm — sur les perles plutôt que sur le fil : tu en enfiles environ deux de moins. Le fil élastique n’a pas de fermoir, les perles remplissent donc tout le fil. La longueur de corde indiquée est le fil plus 8 cm, les bouts nécessaires pour nouer et rentrer le nœud.',
    note: 'Le fil élastique casse plus souvent qu’il ne se dénoue. Prends du 0,8 mm ou plus épais et pré-étire-le en tirant les extrémités quelques fois avant d’enfiler, sinon le bracelet se détend en quelques jours. Fais deux fois un nœud de chirurgien, ajoute une goutte de colle et tire le nœud à l’intérieur d’une perle. Les pierres et les perles métalliques à trou rugueux scient le fil : celles-là vont sur un bracelet à fermoir. Le poignet gonfle aussi d’un demi-centimètre au cours de la journée : pour un cadeau, vise l’aisance généreuse.',
  },
  'chain-links': {
    title: 'Chaîne : nombre de maillons',
    desc: 'Combien de maillons une longueur de chaîne demande, et la longueur que des maillons entiers donnent vraiment.',
    long: 'Une chaîne ne se coupe qu’à un maillon. Pour atteindre 45 cm avec des maillons de 7 mm, 450 ÷ 7 fait 64,3 : tu prends 64 maillons — et 64 maillons mesurent 44,8 cm. Il n’y a aucun moyen de tomber pile sur 45 cm ; le choix est entre 44,8 cm et 45,5 cm à 65 maillons. Mesure la longueur d’un maillon en posant la chaîne le long d’une règle, en comptant dix maillons et en divisant par dix : mesure un seul maillon et une erreur de 0,5 mm se multiplie par 64 en un écart de 3 cm. Les apprêts mangent aussi de la longueur — un fermoir plus deux anneaux de jonction font d’ordinaire 15 à 20 mm, retire-les de la longueur finie avant ce calcul. Les chaînes régulières comme la forçat ou la corde se prêtent directement au calcul ; sur un motif répété comme la figaro, saisis la longueur d’une répétition entière, par exemple un maillon long plus trois courts.',
    note: 'Une fois l’endroit de coupe connu, la manière compte : certains maillons s’ouvrent et se referment, d’autres doivent être sectionnés. Une chaîne soudée demande une pince coupante, et le maillon coupé est perdu : la longueur réelle sort un maillon plus court. Pour une chaîne qui porte un pendentif lourd, l’épaisseur compte plus que le nombre — un maillon léger s’ouvre sous la charge et le pendentif s’en va. Quand deux chaînes doivent être identiques, comme sur des boucles d’oreilles, pose-les côte à côte et compte les maillons plutôt que de mesurer chacune au mètre ruban, qui s’étire différemment chaque fois.',
  },
  'earring-wire': {
    title: 'Boucles d’oreilles : longueur de fil',
    desc: 'Le fil par boucle et par paire, d’après le diamètre de l’anneau, les tours et la marge de boucle.',
    long: 'Un tour d’anneau vaut diamètre × π. Un anneau de 20 mm fait 62,8 mm, donc deux tours superposés font 125,7 mm, et avec 15 mm de marge de boucle cela donne 140,7 mm par boucle d’oreille, 281,3 mm pour la paire. La marge de boucle couvre la formation de la boucle qui pend du crochet et la finition du bout : une simple boucle à la pince ronde prend 8 à 10 mm, une boucle enroulée 20 à 25 mm. Les tours se saisissent par demi-pas — 1,5 tour donne un anneau à demi-recouvrement, qui se lit comme un double trait de face. Pour une pendeloque plutôt qu’un anneau, mets sa largeur dans la case du diamètre et 1 dans celle des tours pour obtenir une seule circonférence. Faire la paire est le vrai but de ce calcul : mesure et coupe les deux séparément et elles sortent à 1 ou 2 mm l’une de l’autre, ce qui se voit de face. Coupe la longueur de la paire, plie-la en deux, coupe une seule fois.',
    note: 'Rogne la marge et tu ne peux pas finir la pièce. Sans un bout à saisir, impossible de serrer la boucle, et le fil s’allonge un peu quand tu le tires : la longueur réelle dépasse l’arithmétique. Un fil épais — 0,8 mm, calibre 20 et plus — ne fait pas un cercle propre à la main et doit être enroulé sur un mandrin, ce qui rend l’anneau plus grand que calculé, du diamètre du mandrin plus celui du fil. Tout ce qui traverse l’oreille doit être en acier chirurgical, en titane ou en argent fin ; garde le fil de bijouterie contenant du nickel pour le corps de l’anneau. Ajoute un millimètre par coupe pour limer les bouts.',
  },
  'bubble-wrap': {
    title: 'Papier bulle : quelle longueur',
    desc: 'Combien de film à bulles une boîte demande, d’après ses dimensions et le nombre de couches.',
    long: 'Le papier bulle, ou film à bulles, se vend au rouleau, la réponse doit donc être une longueur — mais ce qui fixe la quantité, c’est la surface extérieure de la boîte. Une boîte de 20 × 15 × 8 cm a 2 × (20×15 + 20×8 + 15×8) = 1 160 cm² de surface. Enveloppe-la deux fois et ajoute 15 % pour le recouvrement et les plis dans les angles : cela fait 2 668 cm², soit 53 cm sur un rouleau de 50 cm de large — 0,53 m. Ces 15 % sont la marge dont ce calcul dépend : les bouts doivent se chevaucher pour que le ruban tienne, et les angles consomment plus que la surface à plat. Le nombre de couches est fixé par le contenu : une pour un objet incassable, trois ou plus pour le verre, la céramique et l’électronique, plus un tour de plus autour des angles et des poignées. Pour une série de 100 colis, multiplie la longueur par 100 et divise par la longueur du rouleau — un rouleau de 50 cm en fait d’ordinaire 50 m.',
    note: 'Si le rouleau est plus étroit que la boîte, un calcul juste ne t’aidera pas à l’envelopper : le rouleau doit couvrir la face la plus courte — ici les 15 cm de profondeur ou les 8 cm de hauteur — vérifie donc la largeur avant d’acheter. Enroule les bulles vers l’intérieur ; tournées vers l’extérieur, elles ne se compriment jamais et éclatent, et l’amorti disparaît. Souviens-toi aussi que le but est d’empêcher le contenu de bouger dans la boîte : bien envelopper en laissant des vides ne sert pas à grand-chose. Là où le transporteur facture au poids volumétrique, gonfler la boîte de couches supplémentaires augmente la facture — s’il faut trois couches, passe plutôt à la taille de boîte au-dessus.',
  },
  'tissue-paper': {
    title: 'Papier de soie : quelle taille de feuille',
    desc: 'Dimensionner la feuille de papier de soie d’une boîte, et compter les feuilles pour une série de colis.',
    long: 'Le papier de soie tapisse la boîte : il couvre le fond, remonte les deux parois et se replie sur le contenu par le dessus. Un côté vaut donc la largeur de la boîte plus deux fois la hauteur, pour les deux parois, plus environ 5 cm de recouvrement sur le dessus — pour une boîte de 20 × 15 × 8 cm cela fait 20 + 16 + 5 = 41 cm, et 15 + 16 + 5 = 36 cm dans l’autre sens. La feuille standard qui couvre 41 × 36 cm est du 50 × 70 cm, la taille la plus courante ; coupée en deux, elle devient 35 × 50 cm, un peu court pour cette boîte. C’est vraiment ce que ce calcul décide : feuilles entières ou feuilles recoupées. Deux feuilles par colis est normal — une posée en croix pour envelopper l’objet, une par-dessus ou froissée pour combler les vides. Dix colis font 20 feuilles, un paquet de 100 couvre donc cinq séries comme celle-là.',
    note: 'Un papier de soie très coloré déteint. Des mains humides ou un local humide transfèrent la teinture sur un contenu clair : prends du blanc sans acide pour tout ce qui absorbe, vêtements, savons ou bougies. Le papier de soie n’est pas un calage : il présente l’objet et évite les frottements, mais il n’absorbe aucun choc, alors un article fragile reçoit d’abord du film à bulles et le papier de soie par-dessus. Un papier qui a un sens de fibre se fend au pli si on plie en travers : plie une feuille avant de couper toute une pile. Et mesure l’intérieur de la boîte — pris à l’extérieur, la feuille sera trop courte de l’épaisseur des parois.',
  },
  'ribbon-bow': {
    title: 'Nœud en ruban : longueur nécessaire',
    desc: 'Le ruban qu’un nœud demande à lui seul, d’après les boucles, leur longueur et les pans.',
    long: 'Chaque boucle part et revient : elle mange donc deux fois sa propre longueur. Six boucles de 6 cm font 72 cm, deux pans de 12 cm ajoutent 24 cm, et 5 cm pour serrer le centre portent le total à 101 cm. Le nœud fini mesure à peu près deux fois la longueur de boucle en largeur — 12 cm ici — et environ un tiers de la largeur de la boîte paraît juste. Le nombre de boucles donne le caractère : deux boucles font un nœud simple noué à la main, six se superposent en couches, et au-delà de dix cela se lit comme une fleur en pompon. Cet outil ne traite que le nœud. Le ruban qui fait le tour de la boîte relève du calculateur de longueur de ruban cadeau, 2 × (largeur + hauteur) + 2 × (profondeur + hauteur) pour un croisillon — additionne les deux chiffres si un seul ruban entoure et noue, ou garde celui-ci seul si tu fabriques le nœud à part pour le poser ensuite.',
    note: 'La largeur du ruban décide de l’allure du nœud. À 25 mm et au-delà, les boucles se tiennent debout et une boucle de 6 cm paraît généreuse ; à 6 mm, la même boucle retombe, il faut donc plus de boucles pour remplir. Un ruban à bord métallique garde sa forme, tandis qu’un ruban ordinaire s’écrase dès qu’on serre le centre, ce qui rend le nœud plus petit que les chiffres ne le suggèrent. Un ruban tissé comme le satin s’effiloche à la coupe : recoupe en biais ou passe la flamme, et garde un centimètre pour cela. Et le nœud que tu rates n’est pas dans l’arithmétique — achète 20 à 30 % de plus la première fois que tu essaies une forme.',
  },
  'mailer-size': {
    title: 'Pochette d’expédition : quelle taille',
    desc: 'Dimensionner une pochette plastique ou à bulles d’après la largeur, la longueur et l’épaisseur de l’objet.',
    long: 'Une pochette est un fourreau plat : l’épaisseur de l’objet sort donc de la largeur. La circonférence du fourreau vaut 2 × sa largeur et l’objet demande 2 × (largeur + épaisseur), ce qui veut dire que la pochette doit valoir au moins la largeur de l’objet plus une épaisseur. Ajoute 2 cm pour entrer et sortir l’objet : un article de 25 cm de large et 4 cm d’épais veut une pochette de 31 cm. La longueur marche pareil, longueur de l’objet plus épaisseur plus jeu, puis 4 cm pour le rabat adhésif, ce qui donne 40 cm — le rabat se replie et aucun contenu ne peut s’y trouver. La réponse est donc « 31 × 40 cm ou plus », et tu achètes la taille de stock juste au-dessus, disons 32 × 45 cm. Mesure les articles compressibles comme les vêtements à leur épaisseur écrasée. Regarde aussi comment le fournisseur annonce ses tailles : certains donnent l’intérieur, d’autres l’extérieur rabat compris, et un chiffre extérieur doit perdre le rabat avant toute comparaison.',
    note: 'Les pochettes n’amortissent pas. Même doublée de bulles, une pochette ne résiste qu’au frottement et à la pression : tout ce qui est cassable va dans une boîte. Rogne le jeu et le contenu remonte dans le rabat adhésif, la fermeture ne colle jamais bien et le sac s’ouvre en transit — passe à la taille au-dessus plutôt que de réduire la marge. Le surdimensionné a ses propres ennuis : l’objet glisse, les angles se cognent, et le mou se replie sur l’étiquette là où le scanner ne peut plus la lire. Forcer un article épais tend le film jusqu’à ce qu’il se déchire dans un angle : au-delà d’environ 5 cm d’épaisseur, prends une boîte. La taille de la pochette aide pour le poids volumétrique, mais calcule le port selon les règles de ton propre transporteur.',
  },

  /* ───────── Crochet ───────── */
  'crochet-chain': {
    title: 'Calculateur de chaînette au crochet',
    desc: 'La chaînette de départ, d’après ton échantillon, la largeur voulue et les mailles pour tourner.',
    long: '16 mailles sur 10 cm font 1,6 par centimètre : une couverture de 100 cm demande donc 160 mailles. La chaînette, ce sont ces mailles plus les mailles en l’air pour tourner — 3 pour la bride, 2 pour la demi-bride, 1 pour la maille serrée —, soit 163 mailles en l’air ici. Ces mailles pour tourner remplacent la première maille ou ne servent qu’à gagner la hauteur : elles ne comptent jamais dans la largeur.',
    note: 'Une maille en l’air est plus petite que la maille qu’on travaille dedans : les mêmes mains font la chaînette plus serrée qu’elles ne crochètent. Ces 163 mailles en l’air peuvent tomber juste sur la règle et le bas rentrer quand même dès que le premier rang est posé. Fais la chaînette avec un crochet une taille au-dessus, ou saute-la entièrement et travaille un rang de fondation (fdc). Si le motif se répète sur un nombre fixe de mailles, arrondis d’abord les 160 à ce multiple, puis ajoute les mailles pour tourner.',
  },
  'crochet-gauge-rounds': {
    title: 'Calculateur de rangs et de tours au crochet',
    desc: 'Les rangs ou les tours à travailler, d’après l’échantillon en mailles et la hauteur de la maille.',
    long: 'Au crochet, c’est la maille elle-même qui fixe la hauteur. À 16 mailles pour 10 cm, une maille fait 0,625 cm de large et une bride se tient environ deux fois plus haut : un rang vaut donc 1,25 cm et 60 cm demandent 48 rangs. Passe la même laine en maille serrée (rapport 1,1) et le rang tombe à 0,69 cm — 87 rangs, presque le double du temps et de la laine.',
    note: 'Les rapports sont approximatifs : maille serrée 1,0–1,2, demi-bride 1,4–1,6, bride 1,9–2,1, double bride 2,6–3,0, et ils dérivent avec ta tension. Pour un vêtement qui doit tomber juste, travaille dix rangs, mesure la hauteur et divise par dix. Les points texturés — brides en V, motifs, points boules — ne suivent pas du tout le rapport : mesure alors une répétition entière.',
  },
  'granny-square-size': {
    title: 'Calculateur de taille d’un carré grand-mère',
    desc: 'La taille finie d’un motif, d’après le nombre de tours et la croissance par tour.',
    long: 'Un motif pousse vers l’extérieur des quatre côtés : chaque tour ajoute donc deux fois sa propre profondeur au côté. Avec un tour qui mesure 2 cm, six tours donnent un carré de 24 cm. Demander 30 cm impose huit tours (32 cm), parce que sept s’arrêtent à 28 — on ne travaille pas un demi-tour, et une taille visée tombe donc rarement pile.',
    note: 'La profondeur d’un tour vient de la laine et du crochet. Le premier tour est un paquet de brides tassé dans le cercle magique et sort plus étroit que les autres, et le nombre de mailles en l’air à chaque angle déplace chaque tour de 2 à 3 mm. Travaille trois tours, mesure un côté et divise par six — deux fois le nombre de tours, puisque chaque tour allonge les deux bouts de ce côté. Un côté de 12 cm veut dire 2 cm par tour, et c’est ce chiffre-là qu’il faut remettre dans ce calculateur.',
  },
  'granny-blanket-squares': {
    title: 'Calculateur de couverture en carrés grand-mère',
    desc: 'Combien de motifs une couverture demande, et combien en largeur et en longueur.',
    long: 'Un motif de 20 cm assemblé par une jonction de 0,5 cm occupe 20,5 cm, et comme rien ne vient après le dernier motif, on ajoute une jonction avant de diviser. Sur 120 cm cela donne (120 + 0,5) ÷ 20,5 = 5,87 → 5 motifs ; sur 150 cm de long, 7 — soit 35 carrés. Ces cinq motifs font une largeur finie de 5 × 20 + 4 × 0,5 = 102 cm.',
    note: '102 cm, c’est 18 cm de moins que les 120 cm demandés, parce que la division arrondit vers le bas. Il faut choisir : ajouter une sixième colonne et dépasser à 122,5 cm, ou crocheter une bordure de 9 cm pour combler l’écart. Les motifs faits main varient aussi d’un carré à l’autre : bloque-les tous à la même taille avant de les assembler. La largeur de la jonction dépend de la méthode — presque nulle en mailles coulées, 0,5 à 1 cm avec des mailles en l’air, plus de 1 cm en mailles serrées.',
  },
  'amigurumi-increase': {
    title: 'Calculateur d’augmentations amigurumi (cercle magique)',
    desc: 'Le départ dans le cercle magique et les tours d’augmentation, d’après une circonférence visée et l’échantillon.',
    long: 'Un amigurumi commence par 6 mailles serrées dans un cercle magique et en ajoute 6 à chaque tour — 6, 12, 18, 24, toujours des multiples du compte de départ. Une circonférence de 30 cm à 25 mailles pour 10 cm demande 75 mailles, soit 30 ÷ π = 9,5 cm de diamètre, et 75 ÷ 6 arrondi au-dessus fait 13 tours d’augmentation. On ne travaille pas un demi-tour : tu tombes donc sur 78 mailles et la circonférence grimpe à 31,2 cm. Commence plutôt à 8 et tu augmentes de 8 par tour, pour 80 mailles en 10 tours et une base plus plate.',
    note: 'La règle veut que les augmentations d’un tour égalent le compte de départ. Commence à 6 et augmente de 8 par tour : le cercle passe le plat et ondule ; n’augmente que de 4 et il se creuse en coupelle au lieu de rester ouvert. L’échantillon d’un amigurumi est bien plus serré que celui d’un vêtement, parce que le crochet est volontairement 1 à 1,5 taille sous ce que la laine réclame, pour que le rembourrage ne se voie pas à travers. Saisir ici l’échantillon imprimé sur la bande de la laine te donnera une peluche nettement plus grande que voulu.',
  },
  'crochet-yarn-per-stitch': {
    title: 'Calculateur de laine par maille au crochet',
    desc: 'La laine qu’avale une maille, et le total d’un projet, à partir d’un échantillon.',
    long: 'Chaque maille au crochet jette la laine sur le crochet et la tire à travers : une maille avale donc plus de longueur qu’une maille tricotée. Si 200 mailles ont pris 12 m, une maille fait 6 cm. Une couverture de 200 mailles de large sur 40 rangs, c’est 8 000 mailles, donc 8 000 × 6 cm = 480 m, et 15 % de marge la portent à 552 m. Les mailles se comptent directement sur le modèle (mailles par rang × rangs), ce qui est plus fiable que de mesurer une surface.',
    note: 'Change la maille et ce nombre change avec elle. Une bride prend presque deux fois la laine d’une maille serrée, mais elle se tient aussi deux fois plus haut — sur la même surface, la maille serrée dense reste donc la plus gourmande au total. Fais l’échantillon dans la maille que tu vas vraiment travailler. Mesure-la soit en coupant une longueur connue que tu épuises, soit en pesant l’échantillon et en multipliant par les mètres au gramme ; sur un échantillon de 3 à 4 g, les fils de début et de fin pèsent une part bien réelle de ce poids.',
  },
  'hook-from-gauge': {
    title: 'Calculateur de taille de crochet d’après l’échantillon',
    desc: 'Transformer l’écart entre ton échantillon et celui du modèle en changement de crochet.',
    long: 'La largeur d’une maille suit à peu près le diamètre du crochet. Si un crochet de 5 mm te donne 18 mailles pour 10 cm et que le modèle en veut 16, tes mailles sont trop petites et le crochet doit grossir : 5 × 18 ÷ 16 = 5,63 mm, un écart de 0,63 mm. Personne ne vend de crochet de 5,63 mm : tu prends donc le 5,5, qui atterrit vers 16,4 mailles et n’atteint jamais tout à fait 16.',
    note: 'Les tailles de crochet vont par paliers. Autour de 4 mm elles sont espacées de 0,25 mm, mais au-delà de 7 mm elles sautent un millimètre entier : avec de la laine épaisse, une seule taille peut déplacer l’échantillon de deux ou trois mailles et dépasser la cible. À ce moment-là, la solution est une autre laine, une autre maille ou une autre texture, pas un autre crochet. Ta propre tension bouge l’échantillon autant qu’une taille de crochet — deux personnes avec le même crochet de 5 mm peuvent être à deux mailles d’écart. Travaille l’échantillon dans le point du modèle, dans le même sens que l’ouvrage, et mesure après blocage.',
  },
  'crochet-vs-knit-yarn': {
    title: 'Crochet ou tricot : combien de laine en plus',
    desc: 'Combien de laine la même surface finie demande en plus au crochet.',
    long: 'Un modèle tricot qui réclame 500 g, travaillé à la même taille au crochet, veut 665 g au chiffre de 33 % — 165 g de plus, soit plus de trois pelotes de 50 g supplémentaires. Chaque maille au crochet demande plus de jetés, et l’étoffe crochetée est plus épaisse et plus dense : il rentre donc plus de laine dans le même mètre carré.',
    note: '33 % est le milieu de la fourchette, et c’est la maille qui décide où tu tombes. La maille serrée dense monte à 40–50 %, alors que la bride ajourée ou les motifs grand-mère s’arrêtent à 20–25 %, parce que les trous entre les groupes remplacent la laine. Le crochet filet, à moitié fait de vides, peut même passer sous le chiffre du tricot. S’il faut être exact, travaille le même échantillon des deux façons et pèse-les. Et cette réponse est un poids : convertis-la en pelotes avec les mètres pour 100 g de l’étiquette, plutôt qu’en comptant des pelotes.',
  },
  'round-increase-even': {
    title: 'Calculateur de répartition des augmentations sur un tour',
    desc: 'Où placer les augmentations régulièrement sur un tour, et quoi faire du reste.',
    long: 'Ajouter 8 mailles à un tour de 60 : 60 ÷ 8 = 7,5, donc tu augmentes toutes les 7 mailles. Cela dépense 7 × 8 = 56 mailles et en laisse 4. Ces 4 ne sont pas perdues — quatre des huit intervalles passent à 8 mailles au lieu de 7, et alterner 7, 8, 7, 8, 7, 8, 7, 8 les cache complètement. Tu termines le tour à 68 mailles.',
    note: 'Entasse le reste au même endroit et il gonfle comme une couture. Arrondis dans l’autre sens — « toutes les 8 mailles » — et 8 × 8 = 64 te laisse 4 mailles trop court pour la dernière augmentation. En travaillant en rond, des augmentations empilées au même point à chaque tour s’alignent en rayons bien visibles ; si ce n’est pas l’effet voulu, décale le point de départ de quelques mailles à chaque tour. Pour un amigurumi, où le compte est verrouillé sur des multiples du départ, utilise plutôt le calculateur de tours d’augmentation.',
  },
  'crochet-border': {
    title: 'Calculateur de bordure au crochet',
    desc: 'Les mailles du premier tour d’une bordure, angles compris.',
    long: 'Une couverture de 100 × 120 cm a un périmètre de 2 × (100 + 120) = 440 cm. À 16 mailles pour 10 cm cela fait 704 mailles, plus 2 à chacun des quatre angles : tu travailles donc 712 mailles au premier tour. Sans les mailles d’angle, la bordure tire aux coins jusqu’à ce que la couverture ait l’air pentagonale — une bordure en mailles serrées veut d’ordinaire 2 à 3 mailles par angle, une bordure en brides 2 mailles en l’air plus un groupe de 5 brides.',
    note: 'Les bords du haut et du bas ne se comptent pas comme les côtés. En haut, tu poses une maille dans chaque tête de maille, mais les côtés sont des fins de rangs et aucun échantillon ne te dit combien il en tient : environ 2 dans le côté d’un rang de brides, 1 dans un rang de mailles serrées. Prends ce chiffre comme la cible vers laquelle tu corriges pendant le premier tour. Une bordure à motif — coquilles, picots — doit tomber sur un multiple de sa répétition : arrondis les 712 à ce multiple et absorbe la différence dans les angles.',
  },
  'chain-to-length': {
    title: 'Chaînette au crochet : vérifier sa longueur',
    desc: 'La longueur qu’une chaînette de départ donne réellement, comparée au premier rang.',
    long: '163 mailles en l’air travaillées à 20 mailles en l’air pour 10 cm mesurent 81,5 cm. Travaille le premier rang dedans à 16 mailles pour 10 cm et ce rang veut 101,9 cm — un écart de 20,4 cm. La chaînette doit s’étirer d’autant pour que le rang tombe plat : le bas reste tendu et l’étoffe s’élargit en montant, un trapèze et non un rectangle.',
    note: 'C’est le ratage le plus courant au crochet, et mesurer la chaînette contre une règle ne l’attrapera jamais, parce que tu l’étires en la mesurant. Fais vingt mailles en l’air, lâche tout et mesure-les détendues. Si l’écart est grand, fais la chaînette avec un crochet une ou deux tailles au-dessus, ou saute-la et prends un rang de fondation (fsc, fdc) qui fabrique la chaînette et le premier rang d’un seul geste — la base sort alors à l’échantillon du rang et ce calcul cesse de compter. Un écart négatif veut dire que la chaînette est plus lâche que le rang, et le bas ondulera au lieu de tirer.',
  },
  'crochet-hook-yarn-match': {
    title: 'Calculateur de crochet selon l’épaisseur de la laine',
    desc: 'La plage de tailles de crochet et l’échantillon courant pour un numéro d’épaisseur.',
    long: 'Les numéros vont de 0 (dentelle) à 7 (jumbo). L’épaisseur 4 — worsted ou aran — prend un crochet de 5,5 à 6,5 mm pour environ 11 à 14 mailles serrées sur 10 cm : le milieu de la plage est donc 6,0 mm et 12,5 mailles. L’épaisseur 3 (DK) va de 4,5 à 5,5 mm pour 12 à 17 mailles, l’épaisseur 5 (chunky) de 6,5 à 9 mm pour 8 à 11. L’amigurumi descend volontairement de 1 à 1,5 taille sous cette plage, pour une étoffe assez dense pour cacher le rembourrage.',
    note: 'Cette correspondance est une convention, pas de la physique. Le numéro d’épaisseur est une catégorie fixée par les fabricants et les organismes nationaux plutôt qu’une plage mesurée : deux laines étiquetées 4 peuvent faire 180 m et 230 m pour 100 g. L’échantillon d’une bande de laine est en général un chiffre de tricot, et sur la même laine le crochet prend un outil plus gros et fait des mailles plus grandes. Prends la taille donnée ici comme le crochet avec lequel tu fais ton premier échantillon. Quand un modèle annonce son propre échantillon, c’est lui qui bat ce tableau.',
  },

  /* ───────── Couture : ajustement et finitions ───────── */
  'sleeve-cap-ease': {
    title: 'Calculateur d’embu de tête de manche',
    desc: 'La longueur de la tête de manche et l’embu à résorber, d’après l’emmanchure et un pourcentage.',
    long: 'Une tête de manche doit être plus longue que l’emmanchure pour couvrir l’arrondi de l’épaule. Sur une emmanchure de 46 cm à 8 %, la tête mesure 49,7 cm et 3,7 cm doivent disparaître sans un seul pli. Ces 3,7 cm ne se répartissent pas uniformément : l’essentiel va dans le tiers supérieur, entre les crans devant et dos, et rien dans les 3 à 4 cm juste au-dessus de la couture de dessous de bras, où la courbe est presque droite et où il n’y a nulle part pour les mettre.',
    note: 'C’est le tissu qui fixe le pourcentage. La laine et la flanelle laissent partir 5 cm sous le fer, tandis que le coton enduit, le taffetas et le cuir plissent au-delà d’environ 1 cm, et les mailles n’en prennent aucun (0–2 %). Une manche de chemise montée à plat n’en veut que 2 à 3 % ; une veste tailleur, épaulette derrière, en prend 8 à 12 %. Mesure l’emmanchure le long de la ligne de couture, mètre ruban posé sur la tranche — passé à l’intérieur de la marge, il donne environ 2 cm de moins.',
  },
  'waistband-length': {
    title: 'Calculateur de ceinture : longueur à couper',
    desc: 'La longueur et la largeur de coupe d’une ceinture, d’après le tour de taille, l’aisance, la croisure et les marges.',
    long: 'Un tour de taille de 76 cm plus 2 cm d’aisance finit à 78 cm. Ajoute une croisure de 3 cm pour que le bouton ait sa place et 1 cm de marge de couture à chaque bout : tu coupes 83 cm. La largeur est pliée en deux, donc deux fois les 3,5 cm finis plus 1 cm de marge en haut et en bas, soit 9 cm. Coupe-la à la largeur finie et il ne reste rien à replier.',
    note: 'La croisure est fixée par la position du bouton et non par son diamètre : avec une croisure de 3 cm et le bouton à 1,5 cm du bout, le bouton tombe sur le milieu devant. Les 2 cm d’aisance sont ce que la taille gagne quand tu t’assieds : ne les mets jamais à zéro sur un pantalon ou une jupe. Entoile la ceinture, sinon la taille s’effondre — et n’entoile que les 3,5 cm finis, pas les marges de couture. Une ceinture en maille n’est pas ce calcul du tout : elle se coupe plus courte que la taille et s’étire au montage.',
  },
  'curved-hem-facing': {
    title: 'Calculateur de parementure pour ourlet courbe',
    desc: 'La longueur de la bande de parementure sur un ourlet courbe, et l’excédent que la courbe laisse.',
    long: 'Un ourlet courbe est un morceau de cercle. Si ce cercle a un rayon de 60 cm et que l’arc de l’ourlet fait 200 cm, replier une parementure de 5 cm place son bord libre sur un rayon de 55 cm. La longueur d’un arc suit le rayon : ce bord libre n’a donc besoin que de 200 × 55 ÷ 60 = 183,3 cm. Pose une bande droite de 200 cm et 16,7 cm n’ont nulle part où aller sinon en vagues à l’intérieur. La bande elle-même se coupe à 202 cm, avec 1 cm à chaque bout pour la fermer.',
    note: 'Il y a trois remèdes. Coupe la parementure selon la même courbe — un anneau, pas une bande droite — et elle tombe exactement. Prends du biais, dont tu peux faire rentrer le bord intérieur au fer à mesure : c’est le plus rapide sur les petites largeurs. Ou réduis la largeur de la parementure : l’excédent suit la largeur, et les 16,7 cm à 5 cm deviennent 3,3 cm à 1 cm — c’est exactement pour cela que l’ourlet d’une jupe évasée se replie traditionnellement sur 1 cm ou moins. Le rayon se prend par circonférence ÷ 2π sur une jupe cercle, ou en posant un cercle contre la courbe de l’ourlet.',
  },
  'buttonhole-size': {
    title: 'Calculateur de taille de boutonnière',
    desc: 'La longueur d’une boutonnière, d’après le diamètre du bouton et son épaisseur.',
    long: 'Un bouton passe sur la tranche : son diamètre seul ne suffit pas. Un bouton de 1,5 cm épais de 0,3 cm demande 1,8 cm, plus 0,3 cm de jeu : tu piques donc 2,1 cm. Oublier l’épaisseur est l’erreur classique — sur un bouton de chemise à 0,15 cm personne ne le remarque, mais un bouton de manteau peut dépasser 0,5 cm d’épaisseur et la fente sort visiblement trop courte. Un bouton boule dépend plutôt de sa demi-circonférence : π × 1,5 ÷ 2 = 2,36 cm.',
    note: 'Un pied à boutonnière automatique mesure le vrai bouton, épaisseur comprise, et tombe donc en général près de ce chiffre. Fais quand même un essai sur une chute du même tissu — l’entoilage et le nombre d’épaisseurs le déplacent de deux ou trois millimètres. Une boutonnière horizontale doit commencer 2 à 3 mm au-delà du milieu devant, vers le bord, parce que le bouton fermé est tiré vers ce bout de la fente et doit finir sur le milieu devant. Sur une maille, coupe 2 mm plus court que calculé et renforce la zone à l’entoilage, car l’ouverture s’étire.',
  },
  'interfacing-yardage': {
    title: 'Calculateur d’entoilage : combien acheter',
    desc: 'La longueur d’entoilage à acheter, d’après la surface à entoiler et la largeur du rouleau.',
    long: 'Additionne chaque pièce qui reçoit de l’entoilage — sur une chemise, deux cols, deux pieds de col, deux poignets et deux bandes de devant, soit environ 3 000 cm² (0,3 m²). Sur un entoilage de 90 cm, 3 000 ÷ 90 = 33,3 cm suffiraient, mais les pièces ne sont pas des rectangles et laissent des vides : 25 % en plus font 41,7 cm. Les 8,3 cm d’écart, c’est ce qui finit en chutes.',
    note: 'Diviser par une surface est toujours un peu optimiste : les pièces courbes comme un col se coupent dans un carré puis se recoupent, et seul un vrai plan de coupe donne le chiffre juste. L’entoilage thermocollant rétrécit en plus de 2 à 3 % sous le fer, d’où l’intérêt de thermocoller en bloc — presser un morceau trop grand et couper ensuite. Respecte aussi le droit-fil : l’entoilage en a un, et posé en travers il fait vriller un col. Les entoilages maille et tissés se vendent dans des largeurs différentes, souvent 90 cm et 112 cm, et la même surface peut donc varier de plus de 20 % à l’achat.',
  },
  'french-seam-allowance': {
    title: 'Calculateur de marge pour couture anglaise',
    desc: 'La marge qu’une couture anglaise demande, d’après ses deux piqûres.',
    long: 'Une couture anglaise se pique d’abord envers contre envers, endroits vers l’extérieur, puis se retourne et se repique pour enfermer la première couture. La seconde ligne se mesure depuis la première couture : vue du bord de coupe d’origine, la couture finie se place donc à la somme des deux piqûres, 0,6 + 0,9 = 1,5 cm. C’est pour cela que la marge de 1,5 cm imprimée sur la plupart des patrons se convertit directement en couture anglaise. Après la première piqûre, tu recoupes la marge à 0,6 cm, ce qui laisse 0,3 cm de dégagement à l’intérieur de la seconde piqûre de 0,9 cm.',
    note: 'Recoupe plus large que la seconde piqûre et les fils coupés sortent en barbes de la couture finie — c’est presque toujours là que la couture anglaise échoue. Recoupe trop court et un tissu fin s’effiloche jusqu’à ce que la couture lâche. Une couture anglaise doit aussi se plier dans sa longueur, ce qui la rend malcommode sur une courbe comme une tête de manche, et dans un tissu épais elle empile quatre épaisseurs en bourrelet. La mousseline de soie, la batiste et la gaze — légères et effilochables — sont sa vraie place.',
  },
  'zip-fly-length': {
    title: 'Braguette : longueur d’ouverture et de fermeture éclair',
    desc: 'La longueur de l’ouverture de braguette et la taille de fermeture à acheter, d’après la hauteur de fourche devant.',
    long: 'Retire la ceinture de 3,5 cm d’une hauteur de fourche devant de 26 cm et il reste 22,5 cm sous la ceinture. La braguette prend les 70 % du haut — 15,8 cm — parce que les 30 % du bas sont la courbe de fourche, où une ouverture ne peut pas aller. Les tailles vendues montent par 10 · 12 · 15 · 18 · 20 · 23 · 25 cm : tu achètes donc la 15, puisque la surpiqûre se règle sur la fermeture et qu’une taille exacte n’est pas nécessaire.',
    note: 'Mesure la hauteur de fourche devant au milieu devant, de la couture de ceinture au point de fourche, et ne la confonds pas avec celle du dos, plus longue. La part change selon le vêtement : 65 à 70 % sur un jean ou un pantalon taille basse, 55 à 60 % sur un pantalon taille haute, sinon l’ouverture remonte au-dessus du nombril. Si la fermeture est plus longue que le calcul, une fermeture à spirale se raccourcit par le bas avec un arrêt cousu à la main, mais couper les dents d’un modèle métal ou Vislon libère le curseur. Arrête toujours le bas de l’ouverture par un point d’arrêt ou une bride — s’asseoir met toute la charge sur ce seul point.',
  },
  'bust-dart-rotation': {
    title: 'Calculateur de rotation de pince de poitrine',
    desc: 'L’angle qu’une pince représente, et de combien l’ourlet s’ouvre quand tu la fais pivoter.',
    long: 'Une pince est un pli de papier autour de sa pointe : elle se traite donc comme un angle. Avec une valeur de 5 cm comme corde et 12 cm jusqu’à la pointe comme rayon, cela donne 2 × asin(2,5 ÷ 12) = 24,0°. L’angle ne change pas où que tu la déplaces : ferme la pince de côté et ouvre une pince de taille, ou emmène-la à l’épaule ou à l’encolure, ce sont les mêmes 24,0° qui voyagent. Avec 30 cm de la pointe à l’ourlet, faire pivoter la pince ouvre l’ourlet de 0,42 rad × 30 = 12,6 cm.',
    note: 'Le même angle donne des valeurs différentes à des longueurs différentes — 24,0° pris à 6 cm de la pointe ne font que 2,5 cm. Recopier « une pince de 5 cm » à un autre endroit double donc l’angle et fait pointer la poitrine comme un cône. Arrête la pointe de la pince 1,5 à 2 cm avant le point de poitrine plutôt que dessus, sinon tu construis ce cône exprès. Au-delà d’environ 30°, une seule pince n’avale plus la mise en forme : coupe-la en deux pinces côte à côte, ou passe à une couture princesse. Faire vraiment pivoter le papier est toujours plus fiable que le calcul.',
  },
  'grainline-shrink-adjust': {
    title: 'Retrait selon le droit-fil : corriger la coupe',
    desc: 'Les dimensions de coupe quand le retrait diffère en chaîne et en trame.',
    long: 'Le retrait n’est pas le même dans les deux sens. Sur un tissu qui perd 5 % en longueur (chaîne) et 3 % en largeur (trame), une pièce qui doit finir à 100 × 50 cm se coupe à 100 ÷ 0,95 = 105,3 cm sur 50 ÷ 0,97 = 51,5 cm. Ce sont 5,3 cm qui partent au lavage dans la longueur — et ajouter 5 % à la place, pour 105 cm, tombe un peu court. La bonne opération est une division, pas une addition.',
    note: 'Le chiffre en longueur est d’ordinaire le plus gros, parce que le tissage et les apprêts tiennent la chaîne sous tension ; le denim se partage souvent entre 3 à 10 % en longueur contre 1 à 2 % en largeur. Prends ceci comme le recours pour un tissu que tu ne peux vraiment pas prélaver, par exemple une maille qui doit être coupée telle qu’elle sort du rouleau. Laver avant de couper enlève toute la devinette et reste toujours plus juste. Certains tissus continuent aussi de rétrécir au deuxième et au troisième lavage : se fier à un seul essai peut raccourcir le vêtement une deuxième fois.',
  },
  'thread-cone-yield': {
    title: 'Calculateur de rendement d’un cône de fil',
    desc: 'Les vêtements qu’un cône coud, et le nombre de cônes qu’une série demande.',
    long: 'Un cône de 5 000 m à 60 m par vêtement donne 83 vêtements — 83,3, arrondi vers le bas, puisqu’on ne vend pas un vêtement à moitié cousu. Une série de 120 demande 7 200 m : tu achètes deux cônes et il reste 2 800 m. Les mètres par vêtement viennent de la longueur de couture × le facteur de fil : un tee-shirt, surtout surjeté, tourne entre 60 et 120 m, une chemise, surtout au point noué, entre 100 et 150 m.',
    note: 'Quand un cône ne couvre pas la série, la vraie contrainte est la couleur. Les bains de teinture diffèrent légèrement même sous le même numéro, et changer de cône au milieu d’un vêtement se voit en coutures dépareillées — c’est pourquoi le fil s’achète par bain et non par vêtement. Une surjeteuse tire aussi trois ou quatre cônes à la fois : une machine demande autant de cônes de la même couleur en réserve, et ce n’est pas cette réponse multipliée par trois, parce que le chiffre par vêtement compte déjà tous ces fils. Laisse les dernières dizaines de mètres d’un cône hors du plan : le bobinage se relâche et la tension se met à bouger.',
  },
  'full-bust-adjustment': {
    title: 'Calculateur de FBA (ajustement de poitrine forte)',
    desc: 'De combien écarter une pièce de patron, d’après l’écart entre ton tour de poitrine et celui du modèle.',
    long: 'Choisir la taille au tour de poitrine haute laisse le tour de poitrine du patron plus petit que le tien. À 104 cm de tour de poitrine réel contre 92 cm au patron, l’écart est de 12 cm. Mais un devant coupé au pli est un quart du corps : l’écartement sur la pièce vaut donc 12 ÷ 4 = 3 cm, et la valeur de la pince grandit des mêmes 3 cm. Écarte les 12 cm entiers et le vêtement sort quatre fois trop grand.',
    note: 'Le tour de poitrine du patron doit être la mesure du corps du tableau des tailles, pas le tour de poitrine fini — le chiffre fini contient déjà l’aisance de dessin, et l’utiliser efface l’ajustement ou laisse le haut flotter. Un écart négatif n’est pas une FBA mais son contraire, une SBA, qu’on replie de la même valeur. Sous environ 2,5 cm, la plupart des couturières sautent l’ajustement : le fer et l’aisance de confort avalent cela. Sur un patron dont le devant est en deux pièces au lieu d’être coupé au pli — couture princesse ou couture milieu devant —, chaque pièce est la moitié du devant, et ce sont donc 12 ÷ 2 = 6 cm à répartir dessus.',
  },
  'piping-strip-width': {
    title: 'Passepoil : largeur de la bande de biais',
    desc: 'La largeur à couper pour la bande de biais d’un passepoil, selon le cordon.',
    long: 'La bande fait tout le tour du cordon : ce qu’elle doit couvrir est la circonférence et non le diamètre. Un cordon de 5 mm mesure π × 0,5 = 1,57 cm de tour, et avec 1 cm de marge de couture de chaque côté tu coupes une bande de 3,57 cm — tout près de la règle en pouces d’une bande de 1,5 po (3,8 cm) pour un cordon de 1/8 po avec une marge de 1/2 po. Pour la longueur, une couture de 200 cm plus 10 % pour les jonctions et les angles fait 220 cm, et comme le cordon se vend au mètre, tu achètes 3 m.',
    note: 'Coupe la bande dans le biais, à 45°. Une bande de droit-fil se casse dans les courbes et les angles, et un passepoil suit presque toujours quelque chose de courbe. Transformer une longueur de biais nécessaire en carré de tissu est le travail du calculateur de biais continu. Plus le cordon grossit, plus la part qui l’enveloppe dépasse la marge : recalcule au lieu de reprendre une ancienne largeur. Si tu achètes du passepoil tout fait, vérifie que sa bavette correspond à la marge de couture de ton patron — sinon l’épaisseur visible à la couture change. Le cordon de coton rétrécit : prélave le cordon comme le tissu.',
  },
};
