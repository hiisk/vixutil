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
};
