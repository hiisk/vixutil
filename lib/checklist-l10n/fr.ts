import type { Checklist } from '../types.ts';

/** 프랑스어 체크리스트 — id는 [[lib/checklist-en.ts]]와 같다. */
export const CHECKLISTS_FR: Checklist[] = [
  {
    slug: 'moving',
    title: 'Checklist de déménagement',
    desc: 'Du bail jusqu’à la première semaine dans le nouveau logement',
    icon: '📦',
    category: 'Maison et quotidien',
    sections: [
      {
        title: 'Démarches et paperasse', icon: '📋',
        items: [
          { id: 'm01', text: 'Demander un devis à au moins trois déménageurs', note: 'Réserver 2–3 semaines à l’avance pour le meilleur tarif' },
          { id: 'm02', text: 'Fixer la date du déménagement et la réserver' },
          { id: 'm03', text: 'Donner congé au propriétaire par écrit', note: 'Vérifier le préavis dans le bail' },
          { id: 'm04', text: 'Changer d’adresse auprès de la banque, de l’employeur et de l’administration' },
          { id: 'm05', text: 'Mettre en place la réexpédition du courrier' },
          { id: 'm06', text: 'Convenir de la date et du mode de restitution du dépôt de garantie' },
          { id: 'm07', text: 'Photographier l’ancien logement avant de rendre les clés', note: 'Des photos datées règlent les litiges sur la caution' },
        ],
      },
      {
        title: 'Emballage', icon: '📦',
        items: [
          { id: 'm08', text: 'Récupérer cartons, adhésif et calage', note: 'Les supermarchés donnent souvent des cartons' },
          { id: 'm09', text: 'Vendre, donner ou jeter ce que tu n’emportes pas' },
          { id: 'm10', text: 'Mettre papiers et objets de valeur dans un carton que tu transportes toi-même' },
          { id: 'm11', text: 'Démonter les meubles et ensacher les vis avec chaque élément' },
          { id: 'm12', text: 'Étiqueter chaque carton avec son contenu et la pièce de destination' },
          { id: 'm13', text: 'Vider le frigo et le congélateur', note: 'Commencer à manger les surgelés une semaine avant' },
          { id: 'm14', text: 'Vidanger le lave-linge et remettre les brides de transport' },
          { id: 'm15', text: 'Préparer un sac pour la première nuit : draps, serviettes, chargeurs, bouilloire' },
        ],
      },
      {
        title: 'Le nouveau logement', icon: '🏠',
        items: [
          { id: 'm16', text: 'Vérifier l’état des sols, des murs et des équipements' },
          { id: 'm17', text: 'S’assurer que l’eau, l’électricité et le gaz sont ouverts' },
          { id: 'm18', text: 'Demander le transfert ou l’installation de la connexion', note: 'Au moins une semaine avant : les créneaux partent vite' },
          { id: 'm19', text: 'Changer la serrure ou les codes de porte' },
          { id: 'm20', text: 'Relever les compteurs dès le premier jour' },
          { id: 'm21', text: 'Photographier les dégâts existants avant de déballer' },
        ],
      },
      {
        title: 'Une fois installé', icon: '✅',
        items: [
          { id: 'm22', text: 'Se signaler à la mairie ou à l’administration locale' },
          { id: 'm23', text: 'Repérer la vanne d’arrêt, le tableau électrique et le jour des poubelles' },
          { id: 'm24', text: 'Mettre à jour le permis de conduire et la carte grise' },
          { id: 'm25', text: 'Tester les détecteurs de fumée et de monoxyde de carbone' },
          { id: 'm26', text: 'Se présenter aux voisins' },
        ],
      },
    ],
  },
  {
    slug: 'travel-abroad',
    title: 'Checklist pour partir à l’étranger',
    desc: 'Documents, argent, bagages et ce que tout le monde oublie',
    icon: '✈️',
    category: 'Voyage',
    sections: [
      {
        title: 'Avant de réserver', icon: '🗓️',
        items: [
          { id: 't01', text: 'Vérifier la date d’expiration du passeport', note: 'Beaucoup de pays exigent six mois de validité à l’entrée' },
          { id: 't02', text: 'Vérifier s’il faut un visa ou une autorisation de voyage' },
          { id: 't03', text: 'Vérifier les vaccins obligatoires ou recommandés' },
          { id: 't04', text: 'Lire les conseils aux voyageurs du ministère pour ce pays' },
          { id: 't05', text: 'Souscrire une assurance voyage couvrant les soins médicaux' },
        ],
      },
      {
        title: 'Argent et documents', icon: '💳',
        items: [
          { id: 't06', text: 'Prévenir la banque du voyage, ou vérifier que la carte marche à l’étranger' },
          { id: 't07', text: 'Emporter une seconde carte rangée séparément de la première' },
          { id: 't08', text: 'Avoir un peu de monnaie locale pour l’arrivée' },
          { id: 't09', text: 'Enregistrer hors ligne des copies du passeport, de l’assurance et des réservations', note: 'Une photo dans le téléphone plus un exemplaire papier' },
          { id: 't10', text: 'Vérifier les frais à l’étranger avant de tout miser sur la carte' },
        ],
      },
      {
        title: 'Bagages', icon: '🎒',
        items: [
          { id: 't11', text: 'Vérifier la franchise bagages sur chaque tronçon' },
          { id: 't12', text: 'Mettre les médicaments en cabine, dans leur boîte d’origine' },
          { id: 't13', text: 'Prendre le bon adaptateur de prise et une batterie externe', note: 'Les batteries externes vont obligatoirement en cabine' },
          { id: 't14', text: 'Liquides sous la limite cabine, dans un sac transparent' },
          { id: 't15', text: 'Glisser une tenue de rechange dans le bagage à main' },
        ],
      },
      {
        title: 'La veille', icon: '⏰',
        items: [
          { id: 't16', text: 'Faire l’enregistrement en ligne et télécharger la carte d’embarquement' },
          { id: 't17', text: 'Confirmer le trajet vers l’aéroport et sa durée' },
          { id: 't18', text: 'Télécharger des cartes hors ligne et un pack de traduction' },
          { id: 't19', text: 'Activer la réponse automatique et laisser l’itinéraire à quelqu’un' },
          { id: 't20', text: 'Vider le frigo, sortir les poubelles, débrancher ce qui peut l’être' },
        ],
      },
    ],
  },
  {
    slug: 'job-interview',
    title: 'Checklist d’entretien d’embauche',
    desc: 'La recherche, la préparation et le suivi qui changent vraiment la donne',
    icon: '💼',
    category: 'Travail et carrière',
    sections: [
      {
        title: 'Recherche', icon: '🔍',
        items: [
          { id: 'j01', text: 'Relire l’offre et surligner chaque exigence' },
          { id: 'j02', text: 'Préparer un exemple concret pour chaque exigence', note: 'La situation, ce que tu as fait, ce qui a changé' },
          { id: 'j03', text: 'Lire l’actualité récente, le produit et les chiffres publics de l’entreprise' },
          { id: 'j04', text: 'Chercher qui te reçoit et sur quoi cette personne travaille' },
          { id: 'j05', text: 'Écrire trois questions dont tu veux vraiment la réponse' },
        ],
      },
      {
        title: 'Préparation', icon: '📝',
        items: [
          { id: 'j06', text: 'Répéter à voix haute ta présentation de deux minutes' },
          { id: 'j07', text: 'Préparer une réponse honnête sur ton plus gros manque' },
          { id: 'j08', text: 'Connaître ta fourchette de salaire et le seuil sous lequel tu ne descends pas' },
          { id: 'j09', text: 'Tester le lien visio, la caméra, le micro et l’éclairage', note: 'La veille, pas cinq minutes avant' },
          { id: 'j10', text: 'Prévoir le trajet et ajouter 30 minutes de marge' },
        ],
      },
      {
        title: 'Le jour J', icon: '🎯',
        items: [
          { id: 'j11', text: 'Apporter des exemplaires papier du CV et du portfolio' },
          { id: 'j12', text: 'Arriver assez tôt pour s’asseoir et respirer' },
          { id: 'j13', text: 'Demander une précision plutôt que de deviner la question' },
          { id: 'j14', text: 'Prendre des notes — ce n’est pas impoli, ça montre de l’intérêt' },
          { id: 'j15', text: 'Demander l’étape suivante et le calendrier' },
        ],
      },
      {
        title: 'Après', icon: '✉️',
        items: [
          { id: 'j16', text: 'Envoyer un court message de remerciement sous 24 heures' },
          { id: 'j17', text: 'Noter les questions où tu as buté tant que c’est frais' },
          { id: 'j18', text: 'Relancer une fois si le délai annoncé est dépassé' },
        ],
      },
    ],
  },
  {
    slug: 'remote-work',
    title: 'Checklist pour installer le télétravail',
    desc: 'Un bureau, une routine et des limites qui tiennent',
    icon: '🏡',
    category: 'Travail et carrière',
    sections: [
      {
        title: 'L’installation matérielle', icon: '🪑',
        items: [
          { id: 'r01', text: 'Remonter l’écran à hauteur des yeux', note: 'Une pile de livres vaut un support' },
          { id: 'r02', text: 'Régler la chaise pour avoir les pieds à plat et les coudes vers 90°' },
          { id: 'r03', text: 'Mettre une lumière derrière la caméra, pas derrière toi' },
          { id: 'r04', text: 'Utiliser un clavier et une souris séparés si tu es sur un portable' },
          { id: 'r05', text: 'Tester le micro — le son compte plus que l’image' },
          { id: 'r06', text: 'Se brancher en filaire ou s’asseoir près de la box' },
        ],
      },
      {
        title: 'Routine', icon: '⏰',
        items: [
          { id: 'r07', text: 'Fixer une heure de début et de fin, et l’écrire' },
          { id: 'r08', text: 'Garder un substitut de trajet : une marche avant et après' },
          { id: 'r09', text: 'Bloquer du temps de concentration dans l’agenda pour qu’on ne le mange pas' },
          { id: 'r10', text: 'Déjeuner pour de vrai, loin du bureau' },
          { id: 'r11', text: 'Sortir une fois pendant qu’il fait jour' },
        ],
      },
      {
        title: 'Travailler avec les autres', icon: '💬',
        items: [
          { id: 'r12', text: 'Convenir en équipe des délais de réponse attendus' },
          { id: 'r13', text: 'Partager l’avancement plus que de raison — la visibilité remplace le fait d’être vu' },
          { id: 'r14', text: 'Indiquer tes horaires dans l’agenda et le statut' },
          { id: 'r15', text: 'Couper les notifications en dehors de ces heures' },
        ],
      },
    ],
  },
  {
    slug: 'gym-start',
    title: 'Checklist pour débuter la salle de sport',
    desc: 'Le premier mois, sans blessure et sans abandon',
    icon: '💪',
    category: 'Santé et forme',
    sections: [
      {
        title: 'Avant de commencer', icon: '📋',
        items: [
          { id: 'g01', text: 'Décider combien de jours par semaine tu peux vraiment tenir', note: 'Deux jours tenables valent mieux que cinq abandonnés' },
          { id: 'g02', text: 'Choisir une salle sur ton chemin — la distance tue l’assiduité' },
          { id: 'g03', text: 'Vérifier la durée d’engagement et les conditions de résiliation' },
          { id: 'g04', text: 'Voir un médecin d’abord en cas de souci cardiaque, articulaire ou de tension' },
          { id: 'g05', text: 'Prendre une photo et des mesures de départ, pas seulement le poids' },
        ],
      },
      {
        title: 'Équipement', icon: '👟',
        items: [
          { id: 'g06', text: 'Chaussures d’entraînement à semelle plate et stable' },
          { id: 'g07', text: 'Des vêtements où tu bouges bien et où tu es à l’aise' },
          { id: 'g08', text: 'Gourde et petite serviette' },
          { id: 'g09', text: 'Cadenas pour le casier' },
        ],
      },
      {
        title: 'Le premier mois', icon: '🏋️',
        items: [
          { id: 'g10', text: 'Apprendre le geste avant la charge — prendre une séance d’initiation' },
          { id: 'g11', text: 'Commencer plus léger que ce que l’ego réclame', note: 'Quatre jours de courbatures veut dire que tu en as trop fait' },
          { id: 'g12', text: 'Noter chaque séance : quoi, combien, comment tu l’as sentie' },
          { id: 'g13', text: 'Cinq minutes d’échauffement avant, des étirements après' },
          { id: 'g14', text: 'Au moins un jour complet de repos entre deux séances dures' },
          { id: 'g15', text: 'Manger assez de protéines et dormir assez : c’est là que le changement se fait' },
        ],
      },
    ],
  },
  {
    slug: 'online-security',
    title: 'Checklist de sécurité en ligne',
    desc: 'L’hygiène de comptes qui évite vraiment une mauvaise journée',
    icon: '🔐',
    category: 'Numérique',
    sections: [
      {
        title: 'Mots de passe', icon: '🔑',
        items: [
          { id: 's01', text: 'Installer un gestionnaire de mots de passe et lui laisser tout générer' },
          { id: 's02', text: 'Changer tout mot de passe réutilisé sur plusieurs sites', note: 'La réutilisation transforme une fuite en dix' },
          { id: 's03', text: 'Faire du mot de passe de la messagerie le plus solide que tu aies' },
          { id: 's04', text: 'Vérifier tes adresses sur un service d’alerte aux fuites' },
        ],
      },
      {
        title: 'Double facteur', icon: '📱',
        items: [
          { id: 's05', text: 'Activer le double facteur sur la messagerie, la banque et le stockage en ligne' },
          { id: 's06', text: 'Préférer une application d’authentification au SMS', note: 'Le détournement de carte SIM contourne les codes par SMS' },
          { id: 's07', text: 'Conserver les codes de secours quelque part hors ligne' },
          { id: 's08', text: 'Enregistrer un second appareil pour qu’un téléphone perdu ne te bloque pas dehors' },
        ],
      },
      {
        title: 'Appareils et comptes', icon: '💻',
        items: [
          { id: 's09', text: 'Activer les mises à jour automatiques du système et du navigateur' },
          { id: 's10', text: 'Activer le chiffrement du disque et le verrouillage d’écran' },
          { id: 's11', text: 'Passer en revue les applications qui accèdent à ton compte Google ou Apple' },
          { id: 's12', text: 'Supprimer les anciens appareils et les sessions que tu n’utilises plus' },
          { id: 's13', text: 'Configurer la localisation et l’effacement à distance' },
        ],
      },
      {
        title: 'Habitudes', icon: '🧠',
        items: [
          { id: 's14', text: 'Taper l’adresse toi-même dès qu’il est question d’argent' },
          { id: 's15', text: 'Traiter l’urgence d’un message comme le signal d’alerte qu’elle est le plus souvent' },
          { id: 's16', text: 'Sauvegarder quelque part que l’ordinateur ne peut pas atteindre seul', note: 'Un rançongiciel chiffre aussi les disques connectés' },
        ],
      },
    ],
  },
  {
    slug: 'new-laptop',
    title: 'Checklist pour un ordinateur neuf',
    desc: 'Le configurer bien une fois plutôt que le rafistoler un mois',
    icon: '💻',
    category: 'Numérique',
    sections: [
      {
        title: 'La première heure', icon: '⚡',
        items: [
          { id: 'n01', text: 'Passer toutes les mises à jour système avant tout le reste' },
          { id: 'n02', text: 'Créer si possible un compte sans droits d’administrateur pour l’usage courant' },
          { id: 'n03', text: 'Activer le chiffrement du disque' },
          { id: 'n04', text: 'Mettre un verrouillage d’écran avec un délai court' },
          { id: 'n05', text: 'Se connecter d’abord au gestionnaire de mots de passe — tout le reste en dépend' },
        ],
      },
      {
        title: 'Migration', icon: '📁',
        items: [
          { id: 'n06', text: 'Vérifier la sauvegarde de l’ancienne machine avant d’effacer quoi que ce soit' },
          { id: 'n07', text: 'Déplacer les fichiers à dessein plutôt que cloner le fouillis' },
          { id: 'n08', text: 'Désautoriser l’ancienne machine dans les logiciels sous licence' },
          { id: 'n09', text: 'Exporter les favoris du navigateur et les données locales des applications' },
        ],
      },
      {
        title: 'Configuration', icon: '⚙️',
        items: [
          { id: 'n10', text: 'N’installer que ce que tu utilisais vraiment avant' },
          { id: 'n11', text: 'Mettre en place la synchronisation des documents' },
          { id: 'n12', text: 'Configurer des sauvegardes automatiques et tester une restauration', note: 'Une sauvegarde jamais restaurée n’est qu’une hypothèse' },
          { id: 'n13', text: 'Régler la mise à l’échelle, la répétition des touches et le pavé tactile à ton goût' },
          { id: 'n14', text: 'Noter le numéro de série et enregistrer la garantie' },
        ],
      },
    ],
  },
  {
    slug: 'camping',
    title: 'Checklist camping',
    desc: 'Abri, chaleur, nourriture et les détails qui gâchent un séjour',
    icon: '🏕️',
    category: 'Voyage',
    sections: [
      {
        title: 'Abri et couchage', icon: '⛺',
        items: [
          { id: 'c01', text: 'Monter la tente une fois chez toi avant de partir', note: 'Mieux vaut trouver l’arceau manquant dans le jardin qu’à la tombée du jour' },
          { id: 'c02', text: 'Un sac de couchage adapté à la vraie température de la nuit' },
          { id: 'c03', text: 'Un matelas — le froid vient du sol' },
          { id: 'c04', text: 'Sardines, haubans et un maillet' },
          { id: 'c05', text: 'Bâche ou tapis de sol à placer sous la tente' },
        ],
      },
      {
        title: 'Cuisine et eau', icon: '🍳',
        items: [
          { id: 'c06', text: 'Réchaud, combustible et briquet, plus des allumettes en secours' },
          { id: 'c07', text: 'Casserole, tasse, assiette, couverts, couteau qui coupe' },
          { id: 'c08', text: 'Bidons d’eau et de quoi la purifier si nécessaire' },
          { id: 'c09', text: 'Glacière et pains de glace pour les deux premiers jours' },
          { id: 'c10', text: 'Sacs-poubelle — tout ce qui entre repart avec toi' },
        ],
      },
      {
        title: 'Vêtements et sécurité', icon: '🧥',
        items: [
          { id: 'c11', text: 'Des couches, dont une épaisseur chaude de plus que prévu' },
          { id: 'c12', text: 'Une veste imperméable quoi que dise la météo' },
          { id: 'c13', text: 'Lampe frontale et piles de rechange' },
          { id: 'c14', text: 'Trousse de secours, antidouleurs et tes médicaments' },
          { id: 'c15', text: 'Batterie externe et une carte hors ligne', note: 'Pars du principe qu’il n’y aura pas de réseau' },
          { id: 'c16', text: 'Dire à quelqu’un où tu vas et quand tu rentres' },
        ],
      },
    ],
  },
  {
    slug: 'sleep-better',
    title: 'Checklist pour mieux dormir',
    desc: 'Les changements qui ont de vraies preuves derrière eux',
    icon: '😴',
    category: 'Santé et forme',
    sections: [
      {
        title: 'Horaires', icon: '⏰',
        items: [
          { id: 'b01', text: 'Se lever à la même heure tous les jours, week-end compris', note: 'L’heure du lever ancre le rythme plus que celle du coucher' },
          { id: 'b02', text: 'Prendre la lumière du jour dans l’heure qui suit le réveil' },
          { id: 'b03', text: 'Arrêter la caféine 8 à 10 heures avant le coucher' },
          { id: 'b04', text: 'Siestes de moins de 30 minutes et avant le milieu d’après-midi' },
        ],
      },
      {
        title: 'Environnement', icon: '🛏️',
        items: [
          { id: 'b05', text: 'Faire une vraie obscurité dans la chambre' },
          { id: 'b06', text: 'Garder au frais — autour de 18 °C convient à la plupart' },
          { id: 'b07', text: 'Éloigner le chargeur du téléphone hors de portée de bras' },
          { id: 'b08', text: 'Réserver le lit au sommeil, pas au travail' },
        ],
      },
      {
        title: 'Avant de dormir', icon: '🌙',
        items: [
          { id: 'b09', text: 'Baisser les lumières une heure avant' },
          { id: 'b10', text: 'Éviter l’alcool comme somnifère — il hache la seconde moitié de la nuit' },
          { id: 'b11', text: 'Écrire la liste de demain pour arrêter de la ressasser' },
          { id: 'b12', text: 'Au bout de 20 minutes éveillé, se lever et faire quelque chose d’ennuyeux en lumière basse' },
        ],
      },
    ],
  },
  {
    slug: 'wedding',
    title: 'Checklist d’organisation de mariage',
    desc: 'De douze mois avant jusqu’au jour même',
    icon: '💍',
    category: 'Événements',
    sections: [
      {
        title: 'De 12 à 9 mois avant', icon: '📅',
        items: [
          { id: 'w01', text: 'Fixer le budget total et qui contribue' },
          { id: 'w02', text: 'Ébaucher la liste d’invités — c’est elle qui commande tous les autres coûts' },
          { id: 'w03', text: 'Réserver le lieu et verrouiller la date' },
          { id: 'w04', text: 'Réserver l’officiant ou la mairie' },
          { id: 'w05', text: 'Réserver le photographe et le groupe ou le DJ', note: 'Ce sont eux qui se remplissent le plus tôt' },
        ],
      },
      {
        title: 'De 9 à 3 mois avant', icon: '📋',
        items: [
          { id: 'w06', text: 'Commander les tenues et caler les essayages' },
          { id: 'w07', text: 'Confirmer le traiteur et faire une dégustation' },
          { id: 'w08', text: 'Envoyer les invitations avec une date limite de réponse' },
          { id: 'w09', text: 'Régler les formalités et un éventuel changement de nom' },
          { id: 'w10', text: 'Organiser les transports et des blocs d’hébergement pour les invités' },
        ],
      },
      {
        title: 'Le dernier mois', icon: '⏳',
        items: [
          { id: 'w11', text: 'Donner le nombre définitif au traiteur' },
          { id: 'w12', text: 'Écrire le déroulé et le partager avec tous les prestataires' },
          { id: 'w13', text: 'Confier à quelqu’un les alliances, les papiers et les paiements' },
          { id: 'w14', text: 'Confirmer par écrit l’heure d’arrivée de chacun' },
          { id: 'w15', text: 'Prévoir un plan pluie si quelque chose se passe dehors' },
        ],
      },
      {
        title: 'Le jour J', icon: '💐',
        items: [
          { id: 'w16', text: 'Prendre un petit-déjeuner — sincèrement, ça s’oublie' },
          { id: 'w17', text: 'Kit d’urgence : épingles à nourrice, pansements, détachant, antidouleurs' },
          { id: 'w18', text: 'Confier son téléphone à quelqu’un d’autre' },
          { id: 'w19', text: 'Prendre dix minutes à deux dans la journée' },
        ],
      },
    ],
  },
  {
    slug: 'language-learning',
    title: 'Checklist pour apprendre une langue',
    desc: 'Monter les choses pour être encore là dans trois mois',
    icon: '🗣️',
    category: 'Apprentissage',
    sections: [
      {
        title: 'Mise en place', icon: '🎯',
        items: [
          { id: 'l01', text: 'Écrire pourquoi — la situation précise que tu veux savoir gérer' },
          { id: 'l02', text: 'Choisir un minimum quotidien assez petit pour ne jamais le sauter', note: 'Dix minutes honnêtes valent mieux qu’une heure héroïque deux fois' },
          { id: 'l03', text: 'Choisir un cours principal et arrêter d’en chercher d’autres' },
          { id: 'l04', text: 'Apprendre les sons avant d’empiler du vocabulaire' },
        ],
      },
      {
        title: 'Pratique quotidienne', icon: '📚',
        items: [
          { id: 'l05', text: 'Utiliser la répétition espacée pour le vocabulaire' },
          { id: 'l06', text: 'Apprendre les mots dans des tournures, pas en paires isolées' },
          { id: 'l07', text: 'Écouter quelque chose chaque jour, même passivement' },
          { id: 'l08', text: 'Dire des choses à voix haute dès la première semaine' },
          { id: 'l09', text: 'Tenir la liste des mots dont tu as eu besoin et qui te manquaient' },
        ],
      },
      {
        title: 'Tenir dans la durée', icon: '🌱',
        items: [
          { id: 'l10', text: 'Prendre un partenaire de conversation ou un prof régulier' },
          { id: 'l11', text: 'Basculer dans la langue une chose que tu consommes déjà' },
          { id: 'l12', text: 'Compter les jours d’affilée, pas les heures' },
          { id: 'l13', text: 'S’attendre à un palier au niveau intermédiaire et prévoir pour le franchir' },
        ],
      },
    ],
  },
  {
    slug: 'declutter',
    title: 'Checklist de désencombrement',
    desc: 'Un passage pièce par pièce qui ne cale pas à mi-chemin',
    icon: '🧹',
    category: 'Maison et quotidien',
    sections: [
      {
        title: 'Avant de commencer', icon: '📦',
        items: [
          { id: 'd01', text: 'Sortir quatre contenants : garder, donner, vendre, jeter' },
          { id: 'd02', text: 'Réserver dès maintenant le créneau de dépôt ou de collecte', note: 'Les sacs qui restent dans l’entrée finissent par se vider à l’envers' },
          { id: 'd03', text: 'Commencer par un tiroir, pas par toute la maison' },
          { id: 'd04', text: 'Travailler par catégorie plutôt que par pièce quand c’est possible' },
        ],
      },
      {
        title: 'Pièce par pièce', icon: '🏠',
        items: [
          { id: 'd05', text: 'Penderie : tout ce qui n’a pas été porté depuis un an' },
          { id: 'd06', text: 'Cuisine : ustensiles en double et tout ce qui est périmé' },
          { id: 'd07', text: 'Salle de bains : vieux médicaments et cosmétiques morts' },
          { id: 'd08', text: 'Câbles et chargeurs qui n’ont plus rien à charger' },
          { id: 'd09', text: 'Papiers : scanner ce qui sert, détruire le reste' },
          { id: 'd10', text: 'Le tiroir où tout finit par atterrir' },
        ],
      },
      {
        title: 'Que ça tienne', icon: '✅',
        items: [
          { id: 'd11', text: 'Un qui entre, un qui sort pour les vêtements et la cuisine' },
          { id: 'd12', text: 'Donner à chaque catégorie une place fixe' },
          { id: 'd13', text: 'Faire une remise en ordre de dix minutes en fin de journée' },
          { id: 'd14', text: 'S’imposer 24 heures de délai avant tout achat non essentiel' },
        ],
      },
    ],
  },
];

export const CHECKLISTS_FR_MAP: Record<string, Checklist> = Object.fromEntries(
  CHECKLISTS_FR.map(c => [c.slug, c]),
);
