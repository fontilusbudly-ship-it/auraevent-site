export interface WhatsAppLine {
  id: 'line1' | 'line2';
  display: string;
  waDigits: string;
  telHref: string;
  label: string;
}

export interface KeyIndicator {
  id: string;
  iconKey: 'shield' | 'sparkles' | 'compass' | 'heart' | 'smile' | 'clock';
  label: string;
  detail: string;
}

export interface SmilingMoment {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
}

export interface ServicePillar {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface MethodologyStep {
  step: string;
  title: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: '8mars' | 'gnnd';
  categoryLabel: string;
  featured?: boolean;
  spanClass?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  guests: string;
  recommended?: boolean;
  features: string[];
  note?: string;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  scope: string;
  accentBg: 'bx' | 'ink';
}

export type EventCategory = 'all' | 'institutionnel' | 'prive' | 'entreprise' | 'culturel';

export interface EventTypeItem {
  id: string;
  category: Exclude<EventCategory, 'all'>;
  categoryLabel: string;
  title: string;
  description: string;
  highlights: string[];
  recommendedTier: string;
  previewSrc: string;
  previewAlt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const WHATSAPP_LINES: WhatsAppLine[] = [
  {
    id: 'line1',
    display: '+509 31 33 2806',
    waDigits: '50931332806',
    telHref: 'tel:+50931332806',
    label: 'Ligne principale · Direction & devis',
  },
  {
    id: 'line2',
    display: '+509 47 99 33 15',
    waDigits: '50947993315',
    telHref: 'tel:+50947993315',
    label: 'Ligne directe · Coordination & suivi client',
  },
];

export const AGENCY_CONTACT = {
  location: 'Haïti',
  availability: 'Sur rendez-vous en Haïti pour la conception et la direction de vos événements',
  email: 'eventaura64@gmail.com',
  instagram: 'https://www.instagram.com/theaura.event?dlrf=MTdheTVtOWN3MWhsMg==',
  tiktok: 'https://www.tiktok.com/@theauraevent?_r=1&_t=ZS-9BGxSCqynKP',
};

export const KEY_INDICATORS: KeyIndicator[] = [
  {
    id: 'rigueur-protocolaire',
    iconKey: 'shield',
    label: 'Rigueur protocolaire',
    detail: 'Respect attentif des préséances, du séquençage officiel et de chaque temps fort.',
  },
  {
    id: 'decors-sur-mesure',
    iconKey: 'sparkles',
    label: 'Décors conçus sur-mesure',
    detail: 'Scénographies exclusives pensées selon l’identité et l’atmosphère de chaque hôte.',
  },
  {
    id: 'precision-logistique',
    iconKey: 'compass',
    label: 'Précision logistique',
    detail: 'Un pilotage unifié de la conception technique jusqu’au dernier détail du démontage.',
  },
  {
    id: 'excellence-accueil',
    iconKey: 'heart',
    label: 'Excellence de l’accueil VIP',
    detail: 'Hôtesses formées, courtoisie irréprochable et attention sincère portée à chaque invité.',
  },
  {
    id: 'hospitalite-souriante',
    iconKey: 'smile',
    label: 'Hospitalité humaine & chaleureuse',
    detail: 'Des visages bienveillants et une présence rassurante qui mettent vos convives en confiance.',
  },
  {
    id: 'serenite-jour-j',
    iconKey: 'clock',
    label: 'Sérénité totale le jour J',
    detail: 'Vous profitez pleinement de vos proches et partenaires pendant que nous veillons sur tout.',
  },
];

export const SMILING_MOMENTS: SmilingMoment[] = [
  {
    id: 'smile-host-banner',
    src: '/src/assets/images/aura_smiling_host_banner_1795033057541.jpg',
    alt: 'Invitée souriante en robe champagne lors d’une réception en plein air signée Aura Event en Haïti',
    title: 'La joie d’un accueil sans fausse note',
    subtitle: 'Chaque détail est pensé pour offrir à vos invités détente, élégance et sourires.',
    categoryLabel: 'Art de recevoir',
  },
  {
    id: 'smile-vip-welcome',
    src: '/src/assets/images/aura_smiling_vip_welcome_1795033058566.jpg',
    alt: 'Hôtesse Aura Event en tailleur bordeaux accueillant chaleureusement deux invités souriants en Haïti',
    title: 'Un accueil VIP chaleureux dès l’entrée',
    subtitle: 'Nos hôtesses allient distinction protocolaire et sourire authentique dès le premier pas.',
    categoryLabel: 'Accueil VIP',
  },
  {
    id: 'smile-gala-toast',
    src: '/src/assets/images/aura_smiling_gala_toast_1795033059049.jpg',
    alt: 'Convives souriants réunis autour d’une table de réception ivoire et or champagne en Haïti',
    title: 'Des instants partagés autour de la table',
    subtitle: 'Une scénographie lumineuse et conviviale propice aux échanges et aux beaux souvenirs.',
    categoryLabel: 'Réception & table',
  },
  {
    id: 'smile-ceremony',
    src: '/src/assets/images/aura_smiling_ceremony_moment_1795033059671.jpg',
    alt: 'Participants souriants applaudissant lors d’une cérémonie officielle sous drapés ivoire et or en Haïti',
    title: 'La fierté des cérémonies réussies',
    subtitle: 'Des prises de parole fluides et des remises de distinctions vécues dans l’émotion.',
    categoryLabel: 'Cérémonies',
  },
];

export const AGENCY_PILLARS: ServicePillar[] = [
  {
    index: '01',
    title: 'Ingénierie & direction événementielle',
    description:
      'Une structuration rigoureuse de votre projet : planification stratégique, rétroplanning, maîtrise budgétaire, coordination des prestataires et direction sereine le jour J.',
    deliverables: ['Rétroplanning détaillé', 'Pilotage budgétaire', 'Direction technique sur site'],
  },
  {
    index: '02',
    title: 'Scénographie & décoration sur-mesure',
    description:
      'Des espaces pensés comme de véritables tableaux vivants : aménagement architectural, compositions florales, habillage de tables d’honneur et espaces photo immersifs.',
    deliverables: ['Direction artistique', 'Décors floraux & végétaux', 'Espaces photo signature'],
  },
  {
    index: '03',
    title: 'Protocole & hôtesses d’accueil VIP',
    description:
      'L’art de recevoir avec grâce et précision : hôtesses formées aux usages diplomatiques et corporatifs, gestion fluide des accès, placement officiel et accueil des personnalités.',
    deliverables: ['Hôtesses bilingues formées', 'Contrôle & placement VIP', 'Gestion des remises officielles'],
  },
  {
    index: '04',
    title: 'Traiteur & gastronomie',
    description:
      'Une table à la hauteur de vos réceptions : sélection et coordination culinaire, cocktails raffinés, service des boissons et brigade de serveurs attentifs.',
    deliverables: ['Cocktails & dîners assis', 'Brigade de service dédiée', 'Arts de la table soignés'],
  },
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: '01',
    title: 'Écoute & cadrage institutionnel',
    description:
      'Nous prenons le temps de comprendre votre histoire, vos exigences protocolaires, vos invités et l’émotion exacte que vous souhaitez transmettre.',
  },
  {
    step: '02',
    title: 'Direction artistique & scénographie',
    description:
      'Palette chromatique, matières, lumière et circulation des espaces : chaque détail visuel est dessiné sur-mesure avant même la mise en place.',
  },
  {
    step: '03',
    title: 'Orchestration logistique',
    description:
      'Sélection des prestataires, séquençage minute par minute et brief complet des équipes d’accueil afin qu’aucun imprévu ne vienne troubler la réception.',
  },
  {
    step: '04',
    title: 'Maîtrise sereine du jour J',
    description:
      'Sur place du premier montage au dernier départ, nous veillons discrètement sur chaque instant pour vous laisser vivre pleinement votre événement.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '8mars-05',
    src: 'images/8mars-05.jpg',
    alt: 'Portrait d’une invitée assise sur la balançoire canapé en bois fleurie lors du 8 Mars',
    caption: 'Espace photo signature · Invitée posant sur la balançoire en bois fleurie du 8 Mars',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    featured: true,
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'gnnd-03',
    src: '/assets/aistudio/image_449c39f5.png',
    alt: 'Moment fort de la cérémonie GNND : remise d’un panier cadeau pendant l’événement',
    caption: 'Cérémonie GNND · Remise officielle d’un panier cadeau et accueil chaleureux des invitées d’honneur',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
    featured: true,
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: '8mars-06',
    src: 'images/8mars-06.jpg',
    alt: 'Portrait sur la balançoire décorée de fleurs, événement du 8 Mars',
    caption: 'Canapé-balançoire fleuri · Mise en scène sur-mesure de l’espace photo',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:row-span-2',
  },
  {
    id: '8mars-02',
    src: 'images/8mars-02.jpg',
    alt: 'Les organisatrices et participantes devant le mur végétal du 8 Mars',
    caption: 'Mur végétal & fresque · Réunion des organisatrices et invitées',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:col-span-2',
  },
  {
    id: '8mars-04',
    src: 'images/8mars-04.jpg',
    alt: 'Portrait à la table d’honneur devant la fresque du 8 Mars',
    caption: 'Table d’honneur · Habillage floral et accueil des intervenantes',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:row-span-2',
  },
  {
    id: '8mars-01',
    src: 'images/8mars-01.jpg',
    alt: 'Photo de groupe devant le décor institutionnel du 8 Mars',
    caption: 'Photo officielle · Ensemble des participantes devant le décor du 8 Mars',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-09',
    src: 'images/8mars-09.jpg',
    alt: 'Détail du décor : lettres sculptées jaunes et compositions florales',
    caption: 'Détail scénographique · Lettrage et composition florale',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-07',
    src: 'images/8mars-07.jpg',
    alt: 'Deux invitées souriantes assises sur la balançoire de l’espace photo',
    caption: 'Instants partagés · Deux invitées sur la balançoire décorée',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-10',
    src: 'images/8mars-10.jpg',
    alt: 'Table d’honneur devant la fresque florale du 8 Mars',
    caption: 'Table d’honneur · Mise en place protocolaire et florale',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-03',
    src: 'images/8mars-03.jpg',
    alt: 'Une intervenante prend la parole devant l’auditoire du 8 Mars',
    caption: 'Prise de parole · Coordination technique des interventions',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:col-span-2',
  },
  {
    id: '8mars-08',
    src: 'images/8mars-08.jpg',
    alt: 'Une participante s’exprimant debout au cœur du public',
    caption: 'Échanges avec l’assemblée · Micro et gestion de salle',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-11',
    src: 'images/8mars-11.jpg',
    alt: 'Le public attentif pendant les conférences du 8 Mars',
    caption: 'Salle comble · Confort et placement des invitées',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: 'gnnd-01',
    src: '/assets/aistudio/image_94c04e86.png',
    alt: 'Deux invitées souriantes devant le rideau doré et les ballons blancs et or de la cérémonie GNND',
    caption: 'Cérémonie GNND · Accueil VIP devant le drapé blanc et or',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
    spanClass: 'md:row-span-2',
  },
  {
    id: 'gnnd-02',
    src: '/assets/aistudio/image_8ade4c61.png',
    alt: 'Défilé de mode devant le public, décor blanc et doré de la cérémonie GNND',
    caption: 'Cérémonie GNND · Orchestration du défilé et des temps forts',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
    spanClass: 'md:col-span-2',
  },
  {
    id: 'gnnd-04',
    src: '/assets/aistudio/image_0cd8f1da.png',
    alt: 'Portrait de deux participantes devant les rideaux blanc et doré de la cérémonie GNND',
    caption: 'Cérémonie GNND · Portrait souvenir devant les drapés blanc et or',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '400 USD',
    guests: 'Jusqu’à 30 invités',
    features: [
      'Planification & coordination de votre réception',
      'Décoration épurée des tables',
      '2 hôtesses d’accueil',
      'Supervision complète le jour J',
    ],
    note: 'Sans service traiteur',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '650 USD',
    guests: 'De 31 à 50 invités',
    features: [
      'Consultation & coordination générale',
      'Décoration personnalisée & espace photo',
      '2 hôtesses d’accueil',
      'Service traiteur',
      'Personnel de service & supervision',
    ],
  },
  {
    id: 'confort',
    name: 'Confort',
    price: '950 USD',
    guests: 'De 51 à 80 invités',
    recommended: true,
    features: [
      'Conception du thème & planification complète',
      'Décoration personnalisée & centres de table',
      'Espace photo décoré sur-mesure',
      '3 hôtesses, service traiteur & serveurs',
      'Coordination générale de bout en bout',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '1 400 USD',
    guests: 'De 81 à 120 invités',
    features: [
      'Concept & scénographie raffinée',
      'Espace photo personnalisé & tapis rouge',
      '4 hôtesses, traiteur & cocktails',
      'Serveurs & coordination des prestataires',
      'Supervision intégrale sur site',
    ],
  },
  {
    id: 'prestige',
    name: 'Prestige',
    price: '2 000 USD',
    guests: 'De 121 à 180 invités',
    features: [
      'Planification intégrale & direction artistique',
      'Décoration haut de gamme & salon VIP',
      'Tapis rouge & brigade de 5 hôtesses',
      'Traiteur gastronomique, cocktails & serveurs',
      'Protocole complet & supervision jour J',
    ],
  },
];

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    initials: 'DS',
    name: 'Dayna Jennifer Sylvain',
    role: 'Présidente',
    scope: 'Vision stratégique, représentation institutionnelle & direction générale',
    accentBg: 'bx',
  },
  {
    initials: 'NT',
    name: 'Naama Laura Toussaint',
    role: 'Directrice événementielle',
    scope: 'Conception scénographique, protocole & direction artistique des réceptions',
    accentBg: 'bx',
  },
  {
    initials: 'CJ',
    name: 'Christelle M. Jacquet',
    role: 'Finances & trésorerie',
    scope: 'Ingénierie budgétaire, facturation & rigueur financière des projets',
    accentBg: 'bx',
  },
  {
    initials: 'DB',
    name: 'Davinchi Bazile',
    role: 'Responsable administratif',
    scope: 'Administration générale, secrétariat de direction & suivi contractuel',
    accentBg: 'ink',
  },
  {
    initials: 'BF',
    name: 'Budly Fontilus',
    role: 'Responsable technologies',
    scope: 'Solutions numériques, outils de gestion & expérience digitale',
    accentBg: 'ink',
  },
  {
    initials: 'LM',
    name: 'Loukendy Marseille',
    role: 'Communication & logistique',
    scope: 'Image de marque, relations partenaires & coordination opérationnelle',
    accentBg: 'ink',
  },
];

export const EVENT_CATEGORY_TABS: {id: EventCategory; label: string}[] = [
  {id: 'all', label: 'Tous les formats'},
  {id: 'institutionnel', label: 'Institutionnel'},
  {id: 'prive', label: 'Privé'},
  {id: 'entreprise', label: 'Entreprise'},
  {id: 'culturel', label: 'Culturel'},
];

export const EVENT_TYPES: EventTypeItem[] = [
  {
    id: 'ceremonies-officielles',
    category: 'institutionnel',
    categoryLabel: 'Institutionnel',
    title: 'Cérémonies officielles & remises de certificats',
    description:
      'Graduations, distinctions et protocoles officiels : nous gérons l’ordre des prises de parole, le placement des personnalités et l’accueil VIP.',
    highlights: ['Protocole & préséances', 'Remise de distinctions', 'Hôtesses d’accueil'],
    recommendedTier: 'Confort (950USD)',
    previewSrc: '/assets/aistudio/image_449c39f5.png',
    previewAlt: 'Remise officielle d’un panier cadeau lors de la cérémonie GNND',
  },
  {
    id: 'receptions-privees',
    category: 'prive',
    categoryLabel: 'Privé',
    title: 'Réceptions privées & dîners sur-mesure',
    description:
      'Dîners d’honneur et soirées privées pensés autour de votre style : dressage de table, ambiance florale et service discret.',
    highlights: ['Décoration de table', 'Service & traiteur', 'Accueil des convives'],
    recommendedTier: 'Standard (650USD)',
    previewSrc: '/src/assets/images/aura_smiling_gala_toast_1795033059049.jpg',
    previewAlt: 'Convives souriants autour d’une table habillée en ivoire et or champagne',
  },
  {
    id: 'anniversaires',
    category: 'prive',
    categoryLabel: 'Privé',
    title: 'Anniversaires & célébrations familiales',
    description:
      'Un décor personnalisé et un espace photo mémorable pour réunir vos proches en toute légèreté pendant que nous veillons au bon déroulement.',
    highlights: ['Thème sur-mesure', 'Espace photo dédié', 'Supervision jour J'],
    recommendedTier: 'Confort (950USD)',
    previewSrc: '/assets/aistudio/image_94c04e86.png',
    previewAlt: 'Deux invitées souriantes devant le décor doré et blanc',
  },
  {
    id: 'conferences',
    category: 'entreprise',
    categoryLabel: 'Entreprise',
    title: 'Conférences, forums & colloques',
    description:
      'Accueil des participants, contrôle des accès, placement en salle et enchaînement fluide de vos intervenants.',
    highlights: ['Contrôle des accès', 'Placement de salle', 'Timing des prises de parole'],
    recommendedTier: 'Premium (1400USD)',
    previewSrc: '/src/assets/images/aura_smiling_ceremony_moment_1795033059671.jpg',
    previewAlt: 'Participants souriants et applaudissements lors d’une conférence officielle',
  },
  {
    id: 'calendrier-entreprise',
    category: 'entreprise',
    categoryLabel: 'Entreprise',
    title: 'Calendrier d’entreprise, séminaires & galas',
    description:
      'Vos rendez-vous professionnels tout au long de l’année : lancements, réunions annuelles, galas de fin d’année et accueil de partenaires.',
    highlights: ['Rétroplanning dédié', 'Salon VIP & tapis rouge', 'Coordination prestataires'],
    recommendedTier: 'Prestige (2000USD)',
    previewSrc: '/src/assets/images/aura_smiling_vip_welcome_1795033058566.jpg',
    previewAlt: 'Accueil souriant des invités par une hôtesse en tailleur bordeaux',
  },
  {
    id: 'lancements-culturels',
    category: 'culturel',
    categoryLabel: 'Culturel',
    title: 'Lancements culturels & journées thématiques',
    description:
      'Défilés, expositions et célébrations engagées (comme le 8 Mars) portés par une scénographie forte et une coordination terrain sans faille.',
    highlights: ['Scénographie immersive', 'Défilés & temps forts', 'Direction artistique'],
    recommendedTier: 'Premium (1400USD)',
    previewSrc: '/assets/aistudio/image_8ade4c61.png',
    previewAlt: 'Défilé officiel devant le public dans un décor blanc et or',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-reservation',
    question: 'Comment réserver une date et confirmer mon événement ?',
    answer:
      'Prenez contact avec notre équipe via le formulaire ou directement sur l’une de nos deux lignes WhatsApp (+509 31 33 2806 ou +509 47 99 33 15). Après étude de vos besoins et validation du devis, la date est officiellement réservée dès le versement de l’acompte.',
  },
  {
    id: 'faq-duree',
    question: 'Quelle durée d’intervention est incluse dans les formules ?',
    answer:
      'Nos formules incluent une présence et une supervision standard de 4 à 5 heures le jour de votre événement, hors temps de préparation en amont. Une extension horaire peut être prévue sur devis selon votre programme.',
  },
  {
    id: 'faq-au-dela-180',
    question: 'Que se passe-t-il si nous attendons plus de 180 invités ?',
    answer:
      'Au-delà de 180 personnes, nous réalisons une étude personnalisée sur devis afin d’adapter précisément le dispositif d’accueil, le nombre d’hôtesses, la logistique de salle et la coordination générale.',
  },
  {
    id: 'faq-prestations-externes',
    question: 'La salle, la sonorisation ou la photographie sont-elles comprises ?',
    answer:
      'Le transport, la location de salle, la sonorisation et la photographie sont facturés séparément lorsqu’ils ne sont pas intégrés à votre formule, mais notre équipe assure leur coordination complète sur place.',
  },
  {
    id: 'faq-zones',
    question: 'Dans quelles zones d’Haïti Aura Event intervient-elle ?',
    answer:
      'Aura Event intervient en Haïti sur rendez-vous. Chaque projet fait l’objet d’une préparation rigoureuse adaptée au site choisi et à ses contraintes logistiques.',
  },
];

