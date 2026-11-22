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
  {id: 'cadrage', iconKey: 'compass', label: 'Cadrage et logistique', detail: 'Un plan de travail unique, du montage au démontage, avec un budget et un calendrier suivis.'},
  {id: 'protocole', iconKey: 'shield', label: 'Protocole et accueil', detail: 'Hôtesses briefées, placement des invités et respect des préséances.'},
  {id: 'coordination', iconKey: 'sparkles', label: 'Coordination sur place', detail: 'Une équipe présente le jour J pour piloter les prestataires et régler les imprévus.'},
  {id: 'delais', iconKey: 'clock', label: 'Respect des délais', detail: 'Calendrier validé en amont, brief des équipes et vérifications avant l’arrivée des invités.'},
];

export const SMILING_MOMENTS: SmilingMoment[] = [
  {id: 'm-groupe', src: '/images/8mars-01.jpg', alt: 'Les organisatrices et invitées devant le décor de la Journée du 8 Mars', title: 'Journée du 8 Mars', subtitle: 'Décor, accueil des invitées et coordination de la journée.', categoryLabel: 'Réalisation'},
  {id: 'm-photo', src: '/images/8mars-07.jpg', alt: 'Deux invitées sur la balançoire de l’espace photo du 8 Mars', title: 'Espace photo', subtitle: 'Une balançoire en bois habillée de tissu doré pour les portraits des invitées.', categoryLabel: 'Espace photo'},
  {id: 'm-decor', src: '/images/8mars-05.jpg', alt: 'Portrait dans l’espace photo décoré du 8 Mars', title: 'Décor floral et végétal', subtitle: 'Lettrage, fleurs et gazon pour un décor lisible en photo.', categoryLabel: 'Décor'},
];

export const AGENCY_PILLARS: ServicePillar[] = [
  {index: '01', title: 'Ingénierie & direction événementielle', description: 'Planification, rétroplanning, suivi du budget et coordination des prestataires, avec une direction sur place le jour de l’événement.', deliverables: ['Rétroplanning détaillé', 'Suivi budgétaire', 'Direction sur site']},
  {index: '02', title: 'Scénographie & décoration', description: 'Aménagement de la salle, décors floraux et végétaux, habillage des tables d’honneur et espaces photo, selon votre thème.', deliverables: ['Direction artistique', 'Décors floraux et végétaux', 'Espaces photo']},
  {index: '03', title: 'Protocole & hôtesses d’accueil', description: 'Accueil des invités, contrôle des accès, placement officiel et prise en charge des personnalités par des hôtesses briefées.', deliverables: ['Hôtesses d’accueil', 'Contrôle et placement VIP', 'Gestion des remises officielles']},
  {index: '04', title: 'Traiteur & service', description: 'Coordination du traiteur, des boissons et des serveurs pour un service fluide, du cocktail au dîner assis.', deliverables: ['Cocktails et dîners assis', 'Équipe de service', 'Dressage des tables']},
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {step: '01', title: 'Cadrage', description: 'Réunion de lancement : objectifs, budget, nombre d’invités, lieu et contraintes protocolaires.'},
  {step: '02', title: 'Conception', description: 'Thème, plan de salle, décor et déroulé, présentés dans un devis détaillé à valider.'},
  {step: '03', title: 'Préparation', description: 'Réservation des prestataires, planning minuté et briefing des hôtesses et des équipes.'},
  {step: '04', title: 'Jour J', description: 'Installation, accueil, coordination sur place et démontage, avec un responsable joignable en continu.'},
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '8mars-05',
    src: 'images/8mars-05.jpg',
    alt: 'Portrait d’une invitée assise sur la balançoire canapé en bois fleurie lors du 8 Mars',
    caption: 'Espace photo : balançoire décorée',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    featured: true,
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'gnnd-03',
    src: '/images/gnnd-03.jpg',
    alt: 'Moment fort de la cérémonie GNND : remise d’un panier cadeau pendant l’événement',
    caption: 'Remise d’un panier cadeau',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
    featured: true,
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: '8mars-06',
    src: 'images/8mars-06.jpg',
    alt: 'Portrait sur la balançoire décorée de fleurs, événement du 8 Mars',
    caption: 'Espace photo : balançoire décorée',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:row-span-2',
  },
  {
    id: '8mars-02',
    src: 'images/8mars-02.jpg',
    alt: 'Les organisatrices et participantes devant le mur végétal du 8 Mars',
    caption: 'Les organisatrices devant le mur végétal',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:col-span-2',
  },
  {
    id: '8mars-04',
    src: 'images/8mars-04.jpg',
    alt: 'Portrait à la table d’honneur devant la fresque du 8 Mars',
    caption: 'Table d’honneur et fresque florale',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:row-span-2',
  },
  {
    id: '8mars-01',
    src: 'images/8mars-01.jpg',
    alt: 'Photo de groupe devant le décor institutionnel du 8 Mars',
    caption: 'Organisatrices et invitées devant le décor',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-09',
    src: 'images/8mars-09.jpg',
    alt: 'Détail du décor : lettres sculptées jaunes et compositions florales',
    caption: 'Détail du décor : lettrage et fleurs',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-07',
    src: 'images/8mars-07.jpg',
    alt: 'Deux invitées souriantes assises sur la balançoire de l’espace photo',
    caption: 'Invitées dans l’espace photo',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-10',
    src: 'images/8mars-10.jpg',
    alt: 'Table d’honneur devant la fresque florale du 8 Mars',
    caption: 'Table d’honneur devant la fresque',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-03',
    src: 'images/8mars-03.jpg',
    alt: 'Une intervenante prend la parole devant l’auditoire du 8 Mars',
    caption: 'Prise de parole devant le public',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
    spanClass: 'md:col-span-2',
  },
  {
    id: '8mars-08',
    src: 'images/8mars-08.jpg',
    alt: 'Une participante s’exprimant debout au cœur du public',
    caption: 'Participante dans le public',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: '8mars-11',
    src: 'images/8mars-11.jpg',
    alt: 'Le public attentif pendant les conférences du 8 Mars',
    caption: 'Public pendant les interventions',
    category: '8mars',
    categoryLabel: 'Journée du 8 Mars',
  },
  {
    id: 'gnnd-01',
    src: '/images/gnnd-01.jpg',
    alt: 'Deux invitées souriantes devant le rideau doré et les ballons blancs et or de la cérémonie GNND',
    caption: 'Accueil des invitées devant le décor blanc et or',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
    spanClass: 'md:row-span-2',
  },
  {
    id: 'gnnd-02',
    src: '/images/gnnd-02.jpg',
    alt: 'Défilé de mode devant le public, décor blanc et doré de la cérémonie GNND',
    caption: 'Défilé devant le public',
    category: 'gnnd',
    categoryLabel: 'Cérémonie GNND',
    spanClass: 'md:col-span-2',
  },
  {
    id: 'gnnd-04',
    src: '/images/gnnd-04.jpg',
    alt: 'Portrait de deux participantes devant les rideaux blanc et doré de la cérémonie GNND',
    caption: 'Participantes devant les rideaux blanc et doré',
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
    role: 'Secrétariat général & administration',
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
      'Graduations, remises de distinctions et cérémonies officielles. Nous gérons l’ordre des prises de parole, le placement des personnalités et l’accueil des invités.',
    highlights: ['Protocole et préséances', 'Remise de distinctions', 'Hôtesses d’accueil', 'Coordination du déroulé'],
    recommendedTier: 'Confort (950USD)',
    previewSrc: '/images/gnnd-03.jpg',
    previewAlt: 'Remise officielle d’un panier cadeau lors de la cérémonie GNND',
  },
  {
    id: 'receptions-privees',
    category: 'prive',
    categoryLabel: 'Privé',
    title: 'Réceptions privées & dîners',
    description:
      'Dîners et réceptions pour un petit ou un grand nombre d’invités. Nous organisons la salle, la table, le service et l’accueil.',
    highlights: ['Plan de salle et décor', 'Coordination du traiteur', 'Serveurs et service', 'Accueil des invités'],
    recommendedTier: 'Standard (650USD)',
    previewSrc: '/images/gnnd-04.jpg',
    previewAlt: 'Deux participantes souriantes devant les drapés blanc et or d’une cérémonie Aura Event',
  },
  {
    id: 'anniversaires',
    category: 'prive',
    categoryLabel: 'Privé',
    title: 'Anniversaires & célébrations familiales',
    description:
      'Anniversaires, fiançailles et fêtes de famille. Nous préparons le thème, la décoration, l’espace photo et le déroulé de la soirée.',
    highlights: ['Thème et décoration', 'Espace photo', 'Coordination des prestataires', 'Supervision sur place'],
    recommendedTier: 'Confort (950USD)',
    previewSrc: '/images/gnnd-01.jpg',
    previewAlt: 'Deux invitées souriantes devant le décor doré et blanc',
  },
  {
    id: 'conferences',
    category: 'entreprise',
    categoryLabel: 'Entreprise',
    title: 'Conférences, forums & colloques',
    description:
      'Conférences, forums et colloques. Nous gérons l’accueil des participants, la mise en place de la salle et le passage des intervenants.',
    highlights: ['Accueil et enregistrement', 'Mise en place de la salle', 'Gestion des intervenants', 'Coordination technique'],
    recommendedTier: 'Premium (1400USD)',
    previewSrc: '/images/8mars-03.jpg',
    previewAlt: 'Prise de parole devant l’auditoire lors de la Journée du 8 Mars',
  },
  {
    id: 'calendrier-entreprise',
    category: 'entreprise',
    categoryLabel: 'Entreprise',
    title: 'Calendrier d’entreprise, séminaires & galas',
    description:
      'Séminaires, galas et événements d’entreprise. Nous coordonnons le programme, les invités, la logistique et le service.',
    highlights: ['Programme minuté', 'Accueil et placement VIP', 'Logistique et prestataires', 'Supervision le jour J'],
    recommendedTier: 'Prestige (2000USD)',
    previewSrc: '/images/8mars-10.jpg',
    previewAlt: 'Table d’honneur devant la fresque florale lors de la Journée du 8 Mars',
  },
  {
    id: 'lancements-culturels',
    category: 'culturel',
    categoryLabel: 'Culturel',
    title: 'Lancements culturels & journées thématiques',
    description:
      'Lancements culturels, expositions et journées thématiques. Nous concevons le décor, l’accueil du public et le déroulé de la journée.',
    highlights: ['Décor thématique', 'Accueil du public', 'Coordination des intervenants', 'Déroulé de la journée'],
    recommendedTier: 'Premium (1400USD)',
    previewSrc: '/images/gnnd-02.jpg',
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


export const GALLERY_GROUPS = {
  '8mars': {title: 'Journée Internationale des Droits des Femmes (8 Mars)', text: 'Décor végétal et floral, espace photo, table d’honneur, accueil des invitées et coordination des prises de parole.'},
  gnnd: {title: 'Cérémonie GNND', text: 'Décor blanc et or, défilé, remise de distinctions et de cadeaux, accueil des invitées.'},
} as const;

export const GALLERY_ORDER = {
  '8mars': ['8mars-06', '8mars-02', '8mars-03', '8mars-04', '8mars-09', '8mars-10'],
  gnnd: ['gnnd-03', 'gnnd-02', 'gnnd-01', 'gnnd-04'],
} as const;
