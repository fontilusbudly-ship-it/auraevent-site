// Données du Forum Universitaire de Jacmel : modifier ici pour mettre à jour le site.
export const FORUM = {
  edition: '1ʳᵉ édition',
  title: 'Forum Universitaire de Jacmel',
  theme: 'Entre formation académique et engagement social : quelle responsabilité pour les élites intellectuelles ?',
  start: '2026-11-27T00:00:00-05:00',
  end: '2026-11-30T00:00:00-05:00',
  dates: '27 au 29 novembre 2026',
  venue: 'Centre Convention de Jacmel',
  fee: '1 500 gourdes',
  waMain: '50947993315',
  waAlt: '50931332806',
  email: 'eventaura64@gmail.com',
  mainPoster: '/images/forum/forum-08.jpg',
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSepyVtqTt_I3-HMvSWPfWaNcRd8Q7jV1fplZPNHzMDe0IOVag/viewform',
};

export type Talk = {id: string; speakers: {name: string; role: string}[]; subject: string; poster: string};

// Un bloc par affiche reçue. Pour ajouter une conférence : copier un bloc, ajouter l'affiche dans public/images/forum.
export const TALKS: Talk[] = [
  {id: 'justice', poster: '/images/forum/forum-07.jpg', subject: 'Droit et société : comment rendre la justice et les droits réellement accessibles aux jeunes, aux femmes et aux communautés du Sud-Est ?', speakers: [{name: 'Maître Ronald Charles', role: 'Juriste'}]},
  {id: 'gouvernance', poster: '/images/forum/forum-03.jpg', subject: 'De l’élite intellectuelle à l’action publique : un engagement nécessaire pour transformer la gouvernance territoriale', speakers: [{name: 'Jean Odelin Casséus', role: 'Enseignant-chercheur · sciences politiques, aménagement du territoire · doctorant à l’INSA Lyon'}, {name: 'Loudie César', role: 'Ancienne mairesse de Jacmel · diplômée en gouvernance locale · ancienne journaliste'}]},
  {id: 'competences', poster: '/images/forum/forum-02.jpg', subject: 'Fuite des compétences vs réancrage territorial : comment valoriser les talents locaux et retenir les diplômés dans le Sud-Est ?', speakers: [{name: 'Wendy Colas', role: 'Comptable · étudiant en Master 2 Comptabilité-Audit-Finance'}, {name: 'Ronald Andris', role: 'Enseignant et sociologue'}]},
  {id: 'jeunesse', poster: '/images/forum/forum-09.jpg', subject: 'Jeunesse, pouvoir économique et participation politique : vers une nouvelle conception du leadership national', speakers: [{name: 'Pierre Jacques Junior Khawly', role: 'Intervenant'}]},
  {id: 'sante', poster: '/images/forum/forum-06.jpg', subject: 'Santé, bien-être mental et prise en charge dans le Sud-Est : rôle des intellectuels, de la médecine et de la psychologie dans la transformation sociale', speakers: [{name: 'Dubuche Claude Junior', role: 'Psychologue social'}, {name: 'Dr Dave Lawson Ortega', role: 'Médecin · responsable de projets de santé · entrepreneur'}]},
  {id: 'patrimoine', poster: '/images/forum/forum-04.jpg', subject: 'Valorisation du patrimoine de Jacmel : comment transformer la culture et l’artisanat en une industrie rentable et créatrice d’emplois ?', speakers: [{name: 'Lenz H. Mathéus Natoux', role: 'Intervenant'}]},
  {id: 'apiculture', poster: '/images/forum/forum-01.jpg', subject: 'L’apiculture, moteur économique et écologique : histoire, fonctionnement des abeilles et revenus possibles pour les jeunes du Sud-Est', speakers: [{name: 'Jean Nathanaël Natoux', role: 'Intervenant'}]},
  {id: 'leadership', poster: '/images/forum/forum-05.jpg', subject: 'Leadership de service et développement communautaire : ce que l’Église et l’Université peuvent construire ensemble pour Jacmel et le Sud-Est', speakers: [{name: 'Pasteur Farah Alexis', role: 'Pasteur'}]},
  {id: 'transmission', poster: '/images/forum/forum-10.jpg', subject: 'Transmission et militantisme : quel héritage les générations d’engagés laissent-elles à la jeunesse universitaire d’aujourd’hui ?', speakers: [{name: 'Djina Guillet Delatour', role: 'Intervenante'}]},
  {id: 'civique', poster: '/images/forum/forum-11.jpg', subject: 'Savoir et devoir civique : quelle responsabilité éthique pour l’Université face aux défis de Jacmel ?', speakers: [{name: 'Serges Benoit', role: 'Intervenant'}]},
  {id: 'universites', poster: '/images/forum/forum-12.jpg', subject: 'Rôle et responsabilité des universités en région : comment l’institution académique peut-elle devenir le moteur du développement local et de l’émancipation sociale dans le Sud-Est ?', speakers: [{name: 'Dr Christophe Providence', role: 'Intervenant'}]},
  {id: 'diplomatie', poster: '/images/forum/forum-13.jpg', subject: 'Diplomatie, droit et action sociale : comment les jeunes élites diplômées peuvent changer la gouvernance et le développement d’Haïti', speakers: [{name: 'Givelt Vilméus', role: 'M2 en Diplomatie et Coopération internationale · juriste et diplomate de formation · professeur de droit international public'}, {name: 'Macken Guerrier', role: 'M2 en Diplomatie et Coopération internationale · diplomate et activiste social · coordonnateur général de JEACHA'}]},
  {id: 'economie', poster: '/images/forum/forum-14.jpg', subject: 'Formation académique et réalité économique : comment aligner les diplômes universitaires sur le potentiel du Sud-Est ?', speakers: [{name: 'Garencha Moïse', role: 'Intervenante'}]},
];

export type Supporter = {name: string; logo: string};

export const SUPPORTERS: Supporter[] = [
  {name: 'Institut Universitaire des Sciences (IUS)', logo: '/images/partners/ius.png'},
  {name: 'IUSInnova', logo: '/images/partners/iusinnova.png'},
  {name: 'Fondation Jacques Khawly', logo: '/images/partners/fondation-jacques-khawly.png'},
  {name: 'Radio Voix de la Jeunesse Haïtienne', logo: '/images/partners/rvjh.png'},
  {name: 'Service-Protech', logo: '/images/partners/service-protech.png'},
  {name: 'Ministère de la Culture et de la Communication', logo: '/images/partners/ministere-culture.png'},
  {name: 'CorrectPro', logo: '/images/partners/correctpro.png'},
  {name: 'Presses universitaires (PIUS)', logo: '/images/partners/pius.png'},
];

export const OFFICIAL_SPONSOR: Supporter = {name: 'Fondation Jacques Khawly', logo: '/images/partners/fondation-jacques-khawly.png'};

export function forumStatus() {
  const now = Date.now();
  const s = new Date(FORUM.start).getTime();
  const e = new Date(FORUM.end).getTime();
  if (now < s) {
    const d = Math.ceil((s - now) / 864e5);
    return d === 1 ? 'Demain' : `Dans ${d} jours`;
  }
  return now < e ? 'En cours' : 'Édition terminée';
}
