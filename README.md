# Aura Event — Site Officiel (Haïti)

Site vitrine éditorial haut de gamme pour l’agence événementielle **Aura Event** (Haïti) : ingénierie événementielle, scénographie, protocole, accueil VIP et traiteur.

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- `npm` (inclus avec Node.js)

## Installation & Lancement en local

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## Compilation pour la production

```bash
# Vérifier le typage TypeScript
npm run lint

# Générer le dossier dist/ prêt pour le déploiement (Vercel, Netlify, Cloudflare Pages…)
npm run build

# Prévisualiser le build de production
npm run preview
```

## Structure du projet

```
├── index.html                  # Point d'entrée HTML & métadonnées SEO
├── package.json                # Dépendances et scripts npm
├── vite.config.ts              # Configuration Vite & Tailwind CSS
├── public/
│   ├── logo.png                # Logo officiel Aura Event
│   ├── images/                 # Photos réelles de la Journée du 8 Mars
│   └── assets/aistudio/        # Photos réelles de la cérémonie GNND
└── src/
    ├── main.tsx                # Montage React
    ├── index.css               # Design tokens (#6B0F1A, #B8892B, #FAF6F2) & animations
    ├── App.tsx                 # Sections, navigation, devis WhatsApp & e-mail
    ├── assets/images/          # Visuels d'ambiance hospitalité & sourires
    ├── components/
    │   ├── AgencyLogo.tsx      # Logo de l'agence avec repli automatique
    │   ├── Lightbox.tsx        # Visionneuse plein écran (clavier + flèches)
    │   └── MediaFrame.tsx      # Cadre photo accessible avec légende au survol
    └── data/
        └── auraData.ts         # Données centralisées (tarifs, équipe, galerie, FAQ, contacts)
```

## Contact & Lignes directes

- WhatsApp : `+509 31 33 2806` / `+509 47 99 33 15`
- Courriel : `eventaura64@gmail.com`
