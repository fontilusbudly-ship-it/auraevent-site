import {type FormEvent, useEffect, useMemo, useState} from 'react';
import {AnimatePresence, MotionConfig, motion, useScroll, useSpring} from 'motion/react';
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  Heart,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  ShieldCheck,
  Smile,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import {AgencyLogo} from './components/AgencyLogo';
import {Lightbox} from './components/Lightbox';
import {MediaFrame} from './components/MediaFrame';
import {LuxuryFX} from './components/LuxuryFX';
import {Manifesto} from './components/Manifesto';
import {ForumSection} from './components/ForumSection';
import {
  AGENCY_CONTACT,
  AGENCY_PILLARS,
  EVENT_CATEGORY_TABS,
  EVENT_TYPES,
  FAQ_ITEMS,
  GALLERY_PHOTOS,
  KEY_INDICATORS,
  LEADERSHIP_TEAM,
  METHODOLOGY_STEPS,
  PRICING_TIERS,
  SMILING_MOMENTS,
  WHATSAPP_LINES,
  type EventCategory,
  type EventTypeItem,
  type GalleryPhoto,
  type KeyIndicator,
} from './data/auraData';

type GalleryFilter = 'all' | '8mars' | 'gnnd';

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function App() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 220, damping: 32, restDelta: 0.001});

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventCategoryFilter, setEventCategoryFilter] = useState<EventCategory>('all');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const [activeMomentIdx, setActiveMomentIdx] = useState(0);
  const [signaturePaused, setSignaturePaused] = useState(false);
  const [expertisePaused, setExpertisePaused] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string>(EVENT_TYPES[0]?.id ?? '');

  // Quote Form state
  const [fullName, setFullName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedEventFormat, setSelectedEventFormat] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('Confort (950USD)');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [details, setDetails] = useState('');
  const [preferredLine, setPreferredLine] = useState<'line1' | 'line2'>('line1');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedPayload, setSubmittedPayload] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const filteredEventTypes = useMemo(() => {
    if (eventCategoryFilter === 'all') return EVENT_TYPES;
    return EVENT_TYPES.filter((item) => item.category === eventCategoryFilter);
  }, [eventCategoryFilter]);

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.category === galleryFilter);
  }, [galleryFilter]);

  const openLightboxForPhoto = (photo: GalleryPhoto) => {
    const idx = GALLERY_PHOTOS.findIndex((item) => item.id === photo.id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const handleSelectPackage = (pkgLabel: string) => {
    setSelectedPackage(pkgLabel);
    setSubmittedPayload(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleSelectEventType = (item: EventTypeItem) => {
    setSelectedEventFormat(item.title);
    setSelectedPackage(item.recommendedTier);
    setSubmittedPayload(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleQuoteSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    const trimmedName = fullName.trim();
    const trimmedPhone = clientPhone.trim();

    if (trimmedName.length < 2) {
      setFormError('Veuillez renseigner votre nom complet.');
      return;
    }

    if (trimmedPhone.replace(/\D/g, '').length < 7) {
      setFormError('Veuillez indiquer un numéro de téléphone ou WhatsApp valide.');
      return;
    }

    const messageLines = [
      'Bonjour Aura Event,',
      'Je souhaite obtenir un devis / réserver un accompagnement :',
      `• Nom : ${trimmedName}`,
      `• Téléphone / WhatsApp : ${trimmedPhone}`,
      selectedEventFormat.trim() ? `• Type d’événement : ${selectedEventFormat.trim()}` : null,
      `• Formule envisagée : ${selectedPackage}`,
      eventLocation.trim() ? `• Lieu de l’événement : ${eventLocation.trim()}` : null,
      eventDate.trim() ? `• Date souhaitée : ${eventDate.trim()}` : null,
      details.trim() ? `• Précisions : ${details.trim()}` : null,
    ].filter(Boolean);

    const formattedText = messageLines.join('\n');
    setSubmittedPayload(formattedText);
    setCopiedMessage(false);
  };

  const buildWhatsAppUrl = (waDigits: string, text?: string) => {
    const base = `https://wa.me/${waDigits}`;
    if (!text) return base;
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  const handleCopyPayload = async () => {
    if (!submittedPayload) return;
    try {
      await navigator.clipboard.writeText(submittedPayload);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = submittedPayload;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2500);
      } catch {
        setCopiedMessage(false);
      }
    }
  };

  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);

  const activeSmilingMoment = SMILING_MOMENTS[activeMomentIdx] ?? SMILING_MOMENTS[0];
  const activeEventType =
    filteredEventTypes.find((item) => item.id === activeEventId) ??
    filteredEventTypes[0] ??
    EVENT_TYPES[0];

  const renderSignatureIcon = (iconKey: KeyIndicator['iconKey']) => {
    const cls = 'w-7 h-7 text-[#6B0F1A] stroke-[1.75]';
    switch (iconKey) {
      case 'shield':
        return <ShieldCheck className={cls} />;
      case 'sparkles':
        return <Sparkles className={cls} />;
      case 'compass':
        return <Compass className={cls} />;
      case 'heart':
        return <Heart className={cls} />;
      case 'smile':
        return <Smile className={cls} />;
      case 'clock':
        return <Clock className={cls} />;
    }
  };

  const renderExpertiseIcon = (index: string) => {
    const cls = 'w-5 h-5 text-[#6B0F1A] stroke-[1.75]';
    switch (index) {
      case '01':
        return <Compass className={cls} />;
      case '02':
        return <Sparkles className={cls} />;
      case '03':
        return <ShieldCheck className={cls} />;
      default:
        return <Utensils className={cls} />;
    }
  };

  const renderMethodologyIcon = (step: string) => {
    const cls = 'w-7 h-7 text-[#6B0F1A] stroke-[1.75]';
    switch (step) {
      case '01':
        return <MessageCircle className={cls} />;
      case '02':
        return <Layers className={cls} />;
      case '03':
        return <CalendarCheck className={cls} />;
      default:
        return <Award className={cls} />;
    }
  };

  const handleSelectExpertise = (pillarTitle: string) => {
    setDetails((prev) =>
      prev.trim()
        ? prev.includes(pillarTitle)
          ? prev
          : `${pillarTitle} — ${prev}`
        : `Intéressé(e) par : ${pillarTitle}. `
    );
    setSubmittedPayload(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({behavior: 'smooth'});
    }
  };

  const spotlight8MarsSwing = GALLERY_PHOTOS.find((p) => p.id === '8mars-05');
  const spotlightGnndGift = GALLERY_PHOTOS.find((p) => p.id === 'gnnd-03');
  const heroMainPhoto = GALLERY_PHOTOS.find((p) => p.id === '8mars-06');
  const heroTopPhoto = GALLERY_PHOTOS.find((p) => p.id === '8mars-01');
  const heroBottomPhoto = GALLERY_PHOTOS.find((p) => p.id === '8mars-10');

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#111111] overflow-x-clip">
        <LuxuryFX />
        {/* Top scroll progress hairline */}
        <motion.div
          style={{scaleX}}
          className="fixed top-0 inset-x-0 h-[2px] origin-left bg-gradient-to-r from-[#6B0F1A] via-[#B8892B] to-[#D9B25F] z-[70]"
          aria-hidden="true"
        />

        {/* Top Bar Contract: Zone 1 Brand (no subtitle) — Zone 2 Nav (5 links) — Zone 3 Single Primary CTA */}
        <header
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'bg-white/90 backdrop-blur-sm border-black/5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between gap-8">
            <a
              href="#"
              aria-label="Aura Event — Accueil"
              className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B8892B] rounded-lg"
            >
              <AgencyLogo className="w-11 h-11" size={44} />
              <span className="font-display font-extrabold text-xl tracking-tight text-[#111111]">
                Aura <span className="text-[#6B0F1A]">Event</span>
              </span>
            </a>

            <nav
              aria-label="Navigation principale"
              className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#111111]/80"
            >
              <a
                href="#forum"
                className="nav-underline font-semibold text-[#6B0F1A] transition-colors whitespace-nowrap shrink-0"
              >
                Forum
              </a>
              <a
                href="#agence"
                className="nav-underline hover:text-[#6B0F1A] transition-colors whitespace-nowrap shrink-0"
              >
                L’agence
              </a>
              <a
                href="#services"
                className="nav-underline hover:text-[#6B0F1A] transition-colors whitespace-nowrap shrink-0"
              >
                Services
              </a>
              <a
                href="#realisations"
                className="nav-underline hover:text-[#6B0F1A] transition-colors whitespace-nowrap shrink-0"
              >
                Réalisations
              </a>
              <a
                href="#tarifs"
                className="nav-underline hover:text-[#6B0F1A] transition-colors whitespace-nowrap shrink-0"
              >
                Tarifs
              </a>
              <a
                href="#equipe"
                className="nav-underline hover:text-[#6B0F1A] transition-colors whitespace-nowrap shrink-0"
              >
                Équipe
              </a>
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#6B0F1A] hover:bg-[#111111] text-white text-sm font-bold px-5 py-2.5 transition-colors duration-200 whitespace-nowrap shrink-0 btn-shimmer"
              >
                Demander un devis
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#EADFD6] text-[#111111] hover:border-[#B8892B] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{opacity: 0, y: -12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -12}}
              transition={{duration: 0.25, ease: EASE_LUXURY}}
              className="fixed inset-0 z-40 bg-white pt-28 pb-10 px-6 flex flex-col justify-between lg:hidden overflow-y-auto"
            >
              <nav aria-label="Menu mobile" className="flex flex-col gap-5 font-display text-3xl font-bold">
                {[
                  {href: '#forum', label: 'Forum universitaire'},
                  {href: '#agence', label: 'L’agence'},
                  {href: '#services', label: 'Services'},
                  {href: '#realisations', label: 'Réalisations'},
                  {href: '#tarifs', label: 'Tarifs'},
                  {href: '#equipe', label: 'Équipe'},
                  {href: '#contact', label: 'Contact & devis'},
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 border-b border-[#EADFD6] text-[#111111] hover:text-[#6B0F1A] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-8 space-y-3 text-sm text-[#111111]/75">
                <p className="font-bold uppercase tracking-[0.18em] text-xs text-[#B8892B]">
                  Lignes directes WhatsApp
                </p>
                <div className="flex flex-col gap-2">
                  {WHATSAPP_LINES.map((line) => (
                    <a
                      key={line.id}
                      href={buildWhatsAppUrl(line.waDigits)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-[#6B0F1A]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{line.display}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* HERO SECTION */}
          <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-[#B8892B]/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-center relative">
              <div className="lg:col-span-7">
                <motion.p
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.6, ease: EASE_LUXURY}}
                  className="editorial-kicker"
                >
                  Haïti · Ingénierie, scénographie &amp; protocole
                </motion.p>

                <motion.h1
                  initial={{opacity: 0, y: 18}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.75, delay: 0.08, ease: EASE_LUXURY}}
                  className="mt-5 font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.02] text-[#111111] text-balance"
                >
                  L’architecture de vos moments{' '}
                  <span className="text-shimmer">d’exception.</span>
                </motion.h1>

                <motion.p
                  initial={{opacity: 0, y: 16}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.75, delay: 0.16, ease: EASE_LUXURY}}
                  className="mt-6 text-base sm:text-lg text-[#111111]/70 leading-relaxed max-w-xl"
                >
                  Chez Aura Event, chaque réception est pensée comme une œuvre d’hospitalité.
                  Partout en Haïti, nous concevons, décorons et orchestrons vos événements privés,
                  institutionnels et culturels avec rigueur et élégance.
                </motion.p>

                <motion.div
                  initial={{opacity: 0, y: 14}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.7, delay: 0.24, ease: EASE_LUXURY}}
                  className="mt-8 flex flex-wrap items-center gap-3.5"
                >
                  <a
                    href="#contact"
                    className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-[#6B0F1A] hover:bg-[#111111] text-white font-bold text-sm px-7 py-3.5 transition-colors duration-200 whitespace-nowrap shrink-0"
                  >
                    <span>Demander un devis</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#realisations"
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-sm px-7 py-3.5 transition-colors duration-200 whitespace-nowrap shrink-0"
                  >
                    Voir nos réalisations
                  </a>
                </motion.div>

                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.7, delay: 0.34}}
                  className="mt-8 pt-6 border-t border-[#EADFD6] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#111111]/65"
                >
                  <span className="font-semibold text-[#6B0F1A]">Lignes directes WhatsApp :</span>
                  {WHATSAPP_LINES.map((line) => (
                    <a
                      key={line.id}
                      href={buildWhatsAppUrl(line.waDigits)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#111111] hover:text-[#6B0F1A] transition-colors tabular-nums"
                    >
                      {line.display}
                    </a>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.85, delay: 0.15, ease: EASE_LUXURY}}
                className="lg:col-span-5 relative"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="seal-spin absolute -left-5 -bottom-7 w-24 h-24 sm:w-28 sm:h-28 z-10 hidden sm:block pointer-events-none"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="aura-seal-path"
                      d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
                    />
                  </defs>
                  <circle cx="60" cy="60" r="59" fill="#ffffff" stroke="#B8892B" strokeWidth="0.7" />
                  <text
                    fontSize="8.8"
                    fontWeight="700"
                    fill="#6B0F1A"
                    fontFamily="Bricolage Grotesque, sans-serif"
                    textLength="290"
                    lengthAdjust="spacing"
                  >
                    <textPath href="#aura-seal-path">
                      AURA EVENT ✦ HAÏTI ✦ AURA EVENT ✦ HAÏTI ✦{' '}
                    </textPath>
                  </text>
                </svg>

                <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                  {heroMainPhoto && (
                    <MediaFrame
                      src={heroMainPhoto.src}
                      alt={heroMainPhoto.alt}
                      caption={heroMainPhoto.caption}
                      badge="8 Mars"
                      priority
                      className="row-span-2 h-[22rem] sm:h-[27rem]"
                      onOpen={() => openLightboxForPhoto(heroMainPhoto)}
                    />
                  )}
                  {heroTopPhoto && (
                    <MediaFrame
                      src={heroTopPhoto.src}
                      alt={heroTopPhoto.alt}
                      caption={heroTopPhoto.caption}
                      badge="8 Mars"
                      priority
                      className="h-[10.5rem] sm:h-[13rem]"
                      onOpen={() => openLightboxForPhoto(heroTopPhoto)}
                    />
                  )}
                  {heroBottomPhoto && (
                    <MediaFrame
                      src={heroBottomPhoto.src}
                      alt={heroBottomPhoto.alt}
                      caption={heroBottomPhoto.caption}
                      badge="8 Mars"
                      priority
                      className="h-[10.5rem] sm:h-[13rem]"
                      onOpen={() => openLightboxForPhoto(heroBottomPhoto)}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="bg-[#111111] text-[#D9B25F] py-4 overflow-hidden" aria-hidden="true">
            <div className="marquee-track font-display font-bold text-sm sm:text-base uppercase tracking-[0.18em] whitespace-nowrap">
              <span className="px-6">
                Ingénierie événementielle ✦ Scénographie sur-mesure ✦ Protocole &amp; hôtesses VIP ✦
                Traiteur &amp; gastronomie ✦ Direction artistique ✦{' '}
              </span>
              <span className="px-6">
                Ingénierie événementielle ✦ Scénographie sur-mesure ✦ Protocole &amp; hôtesses VIP ✦
                Traiteur &amp; gastronomie ✦ Direction artistique ✦{' '}
              </span>
            </div>
          </div>

          <ForumSection />

          <Manifesto />

          {/* LUXURY HUMAN BANNER + INTERACTIVE SIGNATURE CAROUSEL (UX inspired by reference) */}
          <section id="agence" className="py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-5 space-y-20">
              {/* Overlapping Bordeaux & Champagne Luxury Banner */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.7, ease: EASE_LUXURY}}
                className="relative rounded-[2rem] bg-gradient-to-br from-[#6B0F1A] via-[#530A13] to-[#3A0810] text-white px-7 py-10 sm:px-12 sm:py-14 lg:py-16 shadow-[0_32px_64px_-28px_rgba(107,15,26,0.55)]"
              >
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B25F]">
                      Notre maison &amp; promesse · Haïti
                    </p>
                    <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.08] text-white text-balance">
                      Vous souhaitez vivre votre prochain événement en toute sérénité ?
                    </h2>
                    <p className="text-base sm:text-lg text-white/82 leading-relaxed max-w-xl">
                      Avec Aura Event, vous ne faites pas qu’organiser une réception : vous offrez à
                      vos invités des sourires sincères, un accueil attentif et des souvenirs qui
                      traversent le temps.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <a
                        href="#contact"
                        className="btn-shimmer inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-[#D9B25F] text-[#6B0F1A] hover:text-[#111111] font-bold text-sm px-6 py-3.5 transition-colors duration-200 whitespace-nowrap shrink-0 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Planifier votre réception</span>
                      </a>
                      <a
                        href="#realisations"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#D9B25F] hover:text-white transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Explorer nos galeries</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Overlapping Framed Smiling Portrait Card with Switcher Arrow */}
                  <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[320px] lg:-my-20 rounded-[2rem] bg-white p-2.5 shadow-[0_30px_65px_-20px_rgba(0,0,0,0.5)] border border-[#D9B25F]/40">
                      {/* Floating dark message icon badge */}
                      <a
                        href="#contact"
                        aria-label="Contacter l’agence Aura Event"
                        className="absolute -left-5 top-12 z-20 w-12 h-12 rounded-full bg-[#111111] hover:bg-[#D9B25F] text-white hover:text-[#111111] flex items-center justify-center shadow-lg transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>

                      {/* Portrait image viewport */}
                      <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-[#f3ece6]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSmilingMoment.id}
                            initial={{opacity: 0, scale: 1.03}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.4, ease: EASE_LUXURY}}
                            className="absolute inset-0"
                          >
                            <img
                              src={activeSmilingMoment.src}
                              alt={activeSmilingMoment.alt}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                              aria-hidden="true"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9B25F]">
                                {activeSmilingMoment.categoryLabel}
                              </span>
                              <p className="mt-1 font-display text-lg font-bold leading-snug">
                                {activeSmilingMoment.title}
                              </p>
                              <div className="mt-3 flex items-center gap-1.5" role="group" aria-label="Choisir un aperçu">
                                {SMILING_MOMENTS.map((m, idx) => (
                                  <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => setActiveMomentIdx(idx)}
                                    aria-label={`Afficher : ${m.categoryLabel}`}
                                    aria-current={idx === activeMomentIdx ? 'true' : undefined}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                      idx === activeMomentIdx
                                        ? 'w-6 bg-[#D9B25F]'
                                        : 'w-2 bg-white/45 hover:bg-white/80'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Floating right switcher arrow button */}
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMomentIdx((prev) => (prev + 1) % SMILING_MOMENTS.length)
                        }
                        aria-label="Voir un autre moment de joie"
                        className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white hover:bg-[#D9B25F] text-[#6B0F1A] hover:text-[#111111] flex items-center justify-center shadow-lg border border-[#EADFD6] transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GLIDING SIGNATURE STRIP (Right-to-Left, zero numbers/percentages, easy to scan) */}
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
                  <div>
                    <p className="editorial-kicker">Notre signature</p>
                    <h3 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] text-balance">
                      Notre engagement, en gestes et en attentions
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#111111]/68 max-w-xl">
                      Des connexions vraies. Une organisation rigoureuse. Une hospitalité
                      chaleureuse partout en Haïti.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSignaturePaused((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#EADFD6] bg-[#FAF6F2] hover:border-[#B8892B] px-4 py-2 text-xs font-bold text-[#111111] transition-colors whitespace-nowrap shrink-0 self-start sm:self-end"
                  >
                    {signaturePaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#6B0F1A]" />
                        <span>Reprendre</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#6B0F1A]" />
                        <span>Mettre en pause</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <div
                    className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10"
                    aria-hidden="true"
                  />

                  <div
                    className={`no-scrollbar pb-2 ${
                      signaturePaused ? 'overflow-x-auto' : 'overflow-x-auto sm:overflow-hidden'
                    }`}
                  >
                    <div
                      className="signature-marquee-rtl gap-6"
                      data-paused={signaturePaused ? 'true' : 'false'}
                    >
                      {[...KEY_INDICATORS, ...KEY_INDICATORS].map((item, idx) => {
                        const isClone = idx >= KEY_INDICATORS.length;
                        return (
                          <div
                            key={`${item.id}-${idx}`}
                            aria-hidden={isClone ? true : undefined}
                            className="w-[270px] sm:w-[310px] shrink-0 rounded-2xl border border-[#EADFD6] bg-[#FAF6F2]/70 p-6 space-y-3"
                          >
                            <div className="w-11 h-11 rounded-xl bg-white border border-[#EADFD6] flex items-center justify-center">
                              {renderSignatureIcon(item.iconKey)}
                            </div>
                            <h4 className="font-display text-xl font-extrabold text-[#111111] leading-snug">
                              {item.label}
                            </h4>
                            <p className="text-sm text-[#111111]/68 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES (Compact Left-to-Right Marquee) & INSTITUTIONAL METHODOLOGY */}
          <section id="services" className="py-16 sm:py-20 bg-[#FAF6F2] overflow-hidden">
            <div className="max-w-7xl mx-auto px-5">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <p className="editorial-kicker">Nos expertises</p>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
                    Une prise en charge <span className="text-shimmer">clé en main.</span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#111111]/68 leading-relaxed">
                    Survolez une expertise ou cliquez pour lancer votre devis : une seule équipe
                    coordonne vos prestataires et temps forts partout en Haïti.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setExpertisePaused((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#EADFD6] bg-white hover:border-[#B8892B] px-4 py-2 text-xs font-bold text-[#111111] transition-colors whitespace-nowrap shrink-0"
                  >
                    {expertisePaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#6B0F1A]" />
                        <span>Reprendre le défilement</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#6B0F1A]" />
                        <span>Mettre en pause</span>
                      </>
                    )}
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#6B0F1A] hover:bg-[#111111] text-white px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Devis rapide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Left-to-right compact scrolling track */}
            <div className="relative max-w-[1440px] mx-auto">
              <div
                className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FAF6F2] to-transparent z-10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FAF6F2] to-transparent z-10"
                aria-hidden="true"
              />

              <div
                className={`no-scrollbar px-5 sm:px-0 pb-2 ${
                  expertisePaused ? 'overflow-x-auto' : 'overflow-x-auto sm:overflow-hidden'
                }`}
              >
                <div
                  className="expertise-marquee-ltr gap-5"
                  data-paused={expertisePaused ? 'true' : 'false'}
                >
                  {[...AGENCY_PILLARS, ...AGENCY_PILLARS].map((pillar, idx) => {
                    const isClone = idx >= AGENCY_PILLARS.length;
                    return (
                      <article
                        key={`${pillar.index}-${idx}`}
                        aria-hidden={isClone ? true : undefined}
                        className="luxury-card w-[285px] sm:w-[340px] shrink-0 p-6 flex flex-col justify-between bg-white"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FAF6F2] border border-[#EADFD6]">
                              {renderExpertiseIcon(pillar.index)}
                            </span>
                            <span className="text-xs font-bold tracking-[0.2em] text-[#B8892B] tabular-nums">
                              {pillar.index}
                            </span>
                          </div>
                          <h3 className="mt-4 font-display text-xl font-bold text-[#6B0F1A] leading-snug">
                            {pillar.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-[#111111]/70 leading-relaxed line-clamp-3">
                            {pillar.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-[#EADFD6] space-y-3">
                          <p className="text-[11px] font-medium text-[#111111]/58 truncate">
                            {pillar.deliverables.join(' · ')}
                          </p>
                          <button
                            type="button"
                            tabIndex={isClone ? -1 : 0}
                            onClick={() => handleSelectExpertise(pillar.title)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#6B0F1A] hover:text-[#111111] transition-colors whitespace-nowrap"
                          >
                            <span>Choisir cette expertise</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Institutional 4-step methodology (Reference screenshot style, luxury palette) */}
            <div className="max-w-6xl mx-auto px-5 mt-16 pt-14 border-t border-[#EADFD6]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="editorial-kicker">Méthode institutionnelle</p>
                <h3 className="mt-3 font-display text-2xl sm:text-4xl font-extrabold text-[#111111] text-balance">
                  De la première intention au dernier au revoir.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {METHODOLOGY_STEPS.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={{opacity: 0, y: 16}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.25}}
                    transition={{duration: 0.5, delay: idx * 0.06, ease: EASE_LUXURY}}
                    className="text-center flex flex-col items-center"
                  >
                    <div className="relative inline-flex items-center justify-center w-24 h-20 mb-2">
                      <span
                        className="font-display text-6xl font-extrabold text-[#EADFD6] select-none leading-none tabular-nums"
                        aria-hidden="true"
                      >
                        {item.step}
                      </span>
                      <span className="relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF6F2]/90 border border-[#B8892B]/35 shadow-xs">
                        {renderMethodologyIcon(item.step)}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-extrabold text-[#111111] leading-snug">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 text-sm text-[#111111]/68 leading-relaxed max-w-[260px]">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TYPES D'ÉVÉNEMENTS COUVERTS (Compact Editorial Directory + Photo Spotlight) */}
          <section id="evenements" className="py-16 sm:py-20 bg-white border-b border-[#EADFD6]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <p className="editorial-kicker">Formats d’intervention</p>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
                    Les types d’événements <span className="text-shimmer">couverts.</span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#111111]/68 leading-relaxed">
                    Cliquez sur un format pour voir en un coup d’œil ce que nous orchestrons en
                    Haïti.
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Filtrer par type d’événement"
                  className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF6F2] border border-[#EADFD6] rounded-2xl sm:rounded-full self-start lg:self-end"
                >
                  {EVENT_CATEGORY_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setEventCategoryFilter(tab.id);
                        const nextList =
                          tab.id === 'all'
                            ? EVENT_TYPES
                            : EVENT_TYPES.filter((e) => e.category === tab.id);
                        if (nextList[0]) {
                          setActiveEventId(nextList[0].id);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        eventCategoryFilter === tab.id
                          ? 'bg-[#6B0F1A] text-white'
                          : 'text-[#111111]/70 hover:text-[#111111]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left: Clean hairline editorial list (no heavy AI card boxes) */}
                <div className="lg:col-span-5 divide-y divide-[#EADFD6] border-y border-[#EADFD6] flex flex-col justify-center">
                  {filteredEventTypes.map((item) => {
                    const isActive = activeEventType.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveEventId(item.id)}
                        className={`w-full text-left py-4 px-3 sm:px-4 flex items-center justify-between gap-4 transition-colors ${
                          isActive
                            ? 'bg-[#FAF6F2] text-[#6B0F1A]'
                            : 'hover:bg-[#FAF6F2]/60 text-[#111111]'
                        }`}
                      >
                        <div>
                          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#B8892B]">
                            {item.categoryLabel}
                          </span>
                          <span className="mt-0.5 block font-display text-base sm:text-lg font-bold leading-snug">
                            {item.title}
                          </span>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isActive ? 'translate-x-1 text-[#6B0F1A]' : 'text-[#111111]/35'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right: Active Event Format Spotlight with real/authentic visual & CTA */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeEventType.id}
                      initial={{opacity: 0, x: 18}}
                      animate={{opacity: 1, x: 0}}
                      exit={{opacity: 0, x: -18}}
                      transition={{duration: 0.3, ease: EASE_LUXURY}}
                      className="h-full rounded-3xl border border-[#EADFD6] bg-[#FAF6F2] p-5 sm:p-7 grid sm:grid-cols-12 gap-6 items-center"
                    >
                      <div className="sm:col-span-6 h-60 sm:h-72 rounded-2xl overflow-hidden bg-[#f3ece6] border border-[#EADFD6]">
                        <img
                          src={activeEventType.previewSrc}
                          alt={activeEventType.previewAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="sm:col-span-6 flex flex-col justify-between space-y-5">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8892B]">
                              {activeEventType.categoryLabel}
                            </p>
                            <span className="text-[11px] font-semibold text-[#6B0F1A]">
                              Conseillé : {activeEventType.recommendedTier.replace('USD', ' USD')}
                            </span>
                          </div>
                          <h3 className="mt-2 font-display text-2xl font-bold text-[#111111] leading-snug">
                            {activeEventType.title}
                          </h3>
                          <p className="mt-3 text-sm text-[#111111]/72 leading-relaxed">
                            {activeEventType.description}
                          </p>
                          <p className="mt-4 pt-3 border-t border-[#EADFD6] text-xs font-medium text-[#111111]/60">
                            {activeEventType.highlights.join(' · ')}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectEventType(activeEventType)}
                          className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-[#6B0F1A] hover:bg-[#111111] text-white font-bold text-xs sm:text-sm px-6 py-3.5 transition-colors whitespace-nowrap shrink-0 self-start"
                        >
                          <span>Demander un devis pour ce format</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* REALISATIONS & SPOTLIGHT PHOTOS (Requirement #5) */}
          <section id="realisations" className="py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-5">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <p className="editorial-kicker">Réalisations &amp; terrain</p>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
                    Des moments vécus, <span className="text-shimmer">signés Aura.</span>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-[#111111]/68 leading-relaxed">
                    Découvrez nos productions réelles en images : de la scénographie florale et
                    balançoire signature du <b>8 Mars</b> jusqu’aux temps protocolaires et remises de
                    distinctions de la <b>Cérémonie officielle GNND</b>.
                  </p>
                </div>

                {/* Interactive Filter Controls */}
                <div
                  role="group"
                  aria-label="Filtrer les réalisations"
                  className="inline-flex items-center gap-1 p-1 bg-[#FAF6F2] border border-[#EADFD6] rounded-full self-start lg:self-end"
                >
                  {(
                    [
                      {id: 'all', label: 'Toutes'},
                      {id: '8mars', label: 'Journée du 8 Mars'},
                      {id: 'gnnd', label: 'Cérémonie GNND'},
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setGalleryFilter(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        galleryFilter === tab.id
                          ? 'bg-[#6B0F1A] text-white'
                          : 'text-[#111111]/70 hover:text-[#111111]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editorial Spotlight Pair: 8 Mars Swing & GNND Gift Presentation */}
              {galleryFilter === 'all' && spotlight8MarsSwing && spotlightGnndGift && (
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <motion.div
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.6, ease: EASE_LUXURY}}
                    className="rounded-2xl border border-[#EADFD6] bg-[#FAF6F2] p-4 sm:p-5 flex flex-col gap-4"
                  >
                    <MediaFrame
                      src={spotlight8MarsSwing.src}
                      alt={spotlight8MarsSwing.alt}
                      badge="Temps fort · 8 Mars"
                      caption={spotlight8MarsSwing.caption}
                      className="h-[21rem] sm:h-[25rem]"
                      onOpen={() => openLightboxForPhoto(spotlight8MarsSwing)}
                    />
                    <div className="px-1">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8892B]">
                        Scénographie &amp; espace photo · 8 Mars
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#111111]">
                        La balançoire fleurie, pièce maîtresse de l’accueil
                      </h3>
                      <p className="mt-1.5 text-sm text-[#111111]/68">
                        Conçue en bois et habillée de compositions florales pour offrir aux invitées
                        un espace portrait chaleureux et mémorable.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.6, delay: 0.08, ease: EASE_LUXURY}}
                    className="rounded-2xl border border-[#EADFD6] bg-[#FAF6F2] p-4 sm:p-5 flex flex-col gap-4"
                  >
                    <MediaFrame
                      src={spotlightGnndGift.src}
                      alt={spotlightGnndGift.alt}
                      badge="Protocole & remise officielle · GNND"
                      caption={spotlightGnndGift.caption}
                      className="h-[21rem] sm:h-[25rem]"
                      onOpen={() => openLightboxForPhoto(spotlightGnndGift)}
                    />
                    <div className="px-1">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8892B]">
                        Cérémonie officielle · GNND
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#111111]">
                        L’art du protocole lors de la remise des présents
                      </h3>
                      <p className="mt-1.5 text-sm text-[#111111]/68">
                        Un instant d’échange authentique capturé en pleine cérémonie : remise d’un
                        panier cadeau avec élégance, attention et maîtrise des temps forts.
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Full Interactive Bento Photo Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[185px] md:auto-rows-[230px] gap-3.5 sm:gap-4">
                {filteredGallery.map((photo) => (
                  <MediaFrame
                    key={photo.id}
                    src={photo.src}
                    alt={photo.alt}
                    badge={photo.categoryLabel}
                    caption={photo.caption}
                    className={galleryFilter === 'all' ? photo.spanClass || '' : ''}
                    onOpen={() => openLightboxForPhoto(photo)}
                  />
                ))}
              </div>

              {/* Human Smiling Hospitality Showcase */}
              <div className="mt-12 pt-10 border-t border-[#EADFD6]">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="editorial-kicker">L’humain au cœur de l’événement</p>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#111111]">
                      Des sourires authentiques, de l’accueil jusqu’au toast final.
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#111111]/60 max-w-sm">
                    Ambiances chaleureuses et accueil attentionné pensés pour vos convives en Haïti.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SMILING_MOMENTS.map((moment) => (
                    <div
                      key={moment.id}
                      className="rounded-2xl border border-[#EADFD6] bg-[#FAF6F2] p-3 flex flex-col gap-3"
                    >
                      <MediaFrame
                        src={moment.src}
                        alt={moment.alt}
                        badge={moment.categoryLabel}
                        caption={moment.subtitle}
                        className="aspect-[4/3]"
                      />
                      <div className="px-1 pb-1">
                        <p className="font-display font-bold text-sm text-[#111111]">
                          {moment.title}
                        </p>
                        <p className="mt-1 text-xs text-[#111111]/62 leading-relaxed">
                          {moment.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institutional GNND Banner */}
              <motion.div
                initial={{opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                transition={{duration: 0.6, ease: EASE_LUXURY}}
                className="mt-8 rounded-3xl bg-[#6B0F1A] text-white p-7 sm:p-10 grid md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B25F]">
                    Partenariat institutionnel
                  </p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
                    Cérémonie officielle de remise de certificats — GNND
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                    Défilé, remise de distinctions et de paniers cadeaux aux invitées d’honneur,
                    orchestration des prises de parole et accueil VIP dans une scénographie blanc et
                    or champagne.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <a
                    href="#contact"
                    className="btn-shimmer inline-flex items-center justify-center rounded-full bg-[#D9B25F] hover:bg-white text-[#111111] font-bold text-sm px-6 py-3.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    Planifier votre cérémonie
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* TARIFS (Requirement #4: Standard package says "Service traiteur" without "de base") */}
          <section id="tarifs" className="py-20 sm:py-24 bg-[#FAF6F2]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="editorial-kicker">Grille tarifaire transparente</p>
                <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
                  Cinq formules, <span className="text-shimmer">selon vos invités.</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#111111]/68">
                  Chaque package est modulable selon le lieu, l’ampleur scénographique et vos
                  impératifs protocolaires.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {PRICING_TIERS.map((tier, idx) => {
                  const isRecommended = Boolean(tier.recommended);
                  const isLastPrestige = tier.id === 'prestige';
                  return (
                    <motion.div
                      key={tier.id}
                      initial={{opacity: 0, y: 20}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true, amount: 0.15}}
                      transition={{duration: 0.55, delay: idx * 0.06, ease: EASE_LUXURY}}
                      className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                        isRecommended
                          ? 'bg-[#6B0F1A] border border-[#6B0F1A] text-white shadow-[0_28px_60px_-24px_rgba(107,15,26,0.45)]'
                          : 'luxury-card bg-white text-[#111111]'
                      } ${isLastPrestige ? 'lg:col-span-2' : ''}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-xs font-bold uppercase tracking-[0.2em] ${
                              isRecommended ? 'text-[#D9B25F]' : 'text-[#B8892B]'
                            }`}
                          >
                            {tier.name}
                          </p>
                          {isRecommended && (
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#D9B25F]">
                              Sélection recommandée
                            </span>
                          )}
                        </div>

                        <p className="mt-3 font-display text-4xl font-extrabold tabular-nums">
                          {tier.price}
                        </p>
                        <p
                          className={`mt-1 text-sm ${
                            isRecommended ? 'text-white/75' : 'text-[#111111]/58'
                          }`}
                        >
                          {tier.guests}
                        </p>

                        <ul
                          className={`mt-6 pt-5 border-t ${
                            isRecommended ? 'border-white/15' : 'border-[#EADFD6]'
                          } ${
                            isLastPrestige
                              ? 'grid sm:grid-cols-2 gap-x-6 gap-y-2.5'
                              : 'space-y-2.5'
                          } text-sm`}
                        >
                          {tier.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5">
                              <Check
                                className={`w-4 h-4 mt-0.5 shrink-0 ${
                                  isRecommended ? 'text-[#D9B25F]' : 'text-[#6B0F1A]'
                                }`}
                              />
                              <span className={isRecommended ? 'text-white/90' : 'text-[#111111]/80'}>
                                {feat}
                              </span>
                            </li>
                          ))}
                          {tier.note && (
                            <li
                              className={`text-xs italic pl-6 ${
                                isRecommended ? 'text-white/60' : 'text-[#111111]/50'
                              }`}
                            >
                              {tier.note}
                            </li>
                          )}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleSelectPackage(`${tier.name} (${tier.price.replace(/\s/g, '')})`)
                        }
                        className={`mt-7 w-full inline-flex items-center justify-center rounded-full font-bold text-sm px-6 py-3 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                          isRecommended
                            ? 'bg-[#D9B25F] hover:bg-white text-[#111111]'
                            : 'border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
                        }`}
                      >
                        Choisir {tier.name}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-[#B8892B]/35 bg-white p-6 sm:p-7 text-sm text-[#111111]/72 space-y-1.5">
                <p className="font-display font-bold text-base text-[#6B0F1A] mb-2">
                  Conditions &amp; informations pratiques
                </p>
                <p>
                  · Au-delà de 180 personnes : étude personnalisée sur devis selon l’architecture
                  logistique souhaitée.
                </p>
                <p>
                  · Transport, location de salle, sonorisation et photographie sont facturés
                  séparément lorsqu’ils ne sont pas intégrés au cahier des charges.
                </p>
                <p>
                  · Durée standard d’exécution : 4 à 5 heures. La date est définitivement bloquée
                  après validation du devis et versement de l’acompte.
                </p>
              </div>

              {/* FAQ PRATIQUE AVANT DEVIS */}
              <div className="mt-14 pt-12 border-t border-[#EADFD6] max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <p className="editorial-kicker">Questions fréquentes</p>
                  <h3 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-[#111111]">
                    Préparer votre réservation sereinement.
                  </h3>
                </div>

                <div className="space-y-3">
                  {FAQ_ITEMS.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-2xl border border-[#EADFD6] bg-white overflow-hidden transition-colors hover:border-[#B8892B]/60"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-[#111111] focus-visible:outline-2 focus-visible:outline-[#B8892B]"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-[#6B0F1A] shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 pt-0 text-sm sm:text-base text-[#111111]/70 leading-relaxed border-t border-[#EADFD6]/60">
                            <p className="pt-4">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ÉQUIPE DIRIGEANTE (Requirement #3: Naïka removed; Davinchi Bazile handles admin/secretarial governance) */}
          <section id="equipe" className="py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-5">
              <div className="max-w-2xl mb-12">
                <p className="editorial-kicker">Gouvernance &amp; talents</p>
                <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
                  L’équipe <span className="text-shimmer">dirigeante.</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#111111]/68">
                  Une direction collégiale complémentaire alliant création artistique, administration,
                  ingénierie financière, logistique et innovation numérique.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {LEADERSHIP_TEAM.map((member, idx) => (
                  <motion.div
                    key={member.name}
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.55, delay: idx * 0.06, ease: EASE_LUXURY}}
                    className="luxury-card p-6 sm:p-7 flex items-start gap-4"
                  >
                    <div
                      className={`w-14 h-14 rounded-full shrink-0 font-display font-bold text-lg flex items-center justify-center ${
                        member.accentBg === 'bx'
                          ? 'bg-[#6B0F1A] text-[#D9B25F]'
                          : 'bg-[#111111] text-[#D9B25F]'
                      }`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#111111]">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#B8892B] mt-0.5">{member.role}</p>
                      <p className="mt-2 text-xs sm:text-sm text-[#111111]/65 leading-relaxed">
                        {member.scope}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT & DUAL WHATSAPP LINES (Requirement #1) */}
          <section id="contact" className="py-20 sm:py-28 bg-[#111111] text-white">
            <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B25F]">
                    Contact &amp; réservation
                  </p>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-balance">
                    Confiez-nous votre vision, nous en ferons{' '}
                    <span className="text-[#D9B25F]">un succès éclatant.</span>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
                    Notre équipe répond personnellement à chaque demande sur nos deux lignes
                    WhatsApp et par courriel pour préparer votre première consultation.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-white/85">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D9B25F] mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">{AGENCY_CONTACT.location}</p>
                      <p className="text-xs text-white/60 mt-0.5">{AGENCY_CONTACT.availability}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#D9B25F] mt-1 shrink-0" />
                    <div className="space-y-1.5">
                      {WHATSAPP_LINES.map((line) => (
                        <div key={line.id} className="flex flex-wrap items-center gap-x-2">
                          <a
                            href={line.telHref}
                            className="font-semibold text-white hover:text-[#D9B25F] transition-colors tabular-nums"
                          >
                            {line.display}
                          </a>
                          <span className="text-xs text-white/50">· {line.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D9B25F] shrink-0" />
                    <a
                      href={`mailto:${AGENCY_CONTACT.email}`}
                      className="font-medium hover:text-[#D9B25F] transition-colors"
                    >
                      {AGENCY_CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Both WhatsApp direct action buttons */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    Discussion directe WhatsApp
                  </p>
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                    {WHATSAPP_LINES.map((line) => (
                      <a
                        key={line.id}
                        href={buildWhatsAppUrl(line.waDigits)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-[#D9B25F] hover:bg-white text-[#111111] font-bold text-sm px-5 py-3 transition-colors whitespace-nowrap shrink-0 tabular-nums"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        <span>WhatsApp : {line.display}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Form */}
              <div className="lg:col-span-7 bg-white text-[#111111] rounded-3xl p-6 sm:p-10 shadow-2xl">
                {!submittedPayload ? (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5" noValidate>
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold">
                        Demande de devis &amp; réservation
                      </h3>
                      <p className="mt-1 text-sm text-[#111111]/60">
                        Complétez vos informations pour préparer votre message WhatsApp sur mesure.
                      </p>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="rounded-xl border border-[#6B0F1A]/30 bg-[#6B0F1A]/5 px-4 py-3 text-sm font-medium text-[#6B0F1A]"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block text-sm font-medium">
                        Nom &amp; prénom
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Votre nom complet"
                          className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                        />
                      </label>

                      <label className="block text-sm font-medium">
                        Téléphone / WhatsApp
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+509 XX XX XXXX"
                          className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                        />
                      </label>

                      <label className="block text-sm font-medium">
                        Type d’événement
                        <select
                          value={selectedEventFormat}
                          onChange={(e) => setSelectedEventFormat(e.target.value)}
                          className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                        >
                          <option value="">Sélectionner un format (optionnel)</option>
                          {EVENT_TYPES.map((item) => (
                            <option key={item.id} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                          <option value="Autre type d’événement">Autre type d’événement</option>
                        </select>
                      </label>

                      <label className="block text-sm font-medium">
                        Package souhaité
                        <select
                          value={selectedPackage}
                          onChange={(e) => setSelectedPackage(e.target.value)}
                          className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                        >
                          <option value="Essentiel (400USD)">Essentiel (400 USD)</option>
                          <option value="Standard (650USD)">Standard (650 USD)</option>
                          <option value="Confort (950USD)">Confort (950 USD)</option>
                          <option value="Premium (1400USD)">Premium (1 400 USD)</option>
                          <option value="Prestige (2000USD)">Prestige (2 000 USD)</option>
                          <option value="Sur-mesure (plus de 180 personnes)">
                            Sur-mesure (plus de 180 personnes)
                          </option>
                        </select>
                      </label>

                      <label className="block text-sm font-medium">
                        Lieu de l’événement
                        <input
                          type="text"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          placeholder="Port-au-Prince, Pétion-Ville, Cap-Haïtien…"
                          className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                        />
                      </label>

                      <label className="block text-sm font-medium">
                        Date envisagée (optionnel)
                        <input
                          type="date"
                          min={todayIso}
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                        />
                      </label>
                    </div>

                    <div className="text-sm font-medium">
                      <span>Ligne WhatsApp destinataire</span>
                      <div className="mt-1.5 grid sm:grid-cols-2 gap-3">
                        {WHATSAPP_LINES.map((line) => (
                          <button
                            key={line.id}
                            type="button"
                            onClick={() => setPreferredLine(line.id)}
                            className={`px-4 py-3 rounded-xl border text-xs font-bold transition-colors tabular-nums ${
                              preferredLine === line.id
                                ? 'border-[#6B0F1A] bg-[#6B0F1A] text-white'
                                : 'border-black/15 bg-[#FAF6F2] text-[#111111] hover:border-[#B8892B]'
                            }`}
                          >
                            {line.display}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="block text-sm font-medium">
                      Détails &amp; attentes particulières
                      <textarea
                        rows={4}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Type de réception, nombre d’invités estimé, ambiance souhaitée, services additionnels…"
                        className="mt-1.5 block w-full rounded-xl border border-black/15 px-4 py-3 text-sm bg-white resize-none focus:outline-none focus:border-[#B8892B] focus:ring-2 focus:ring-[#B8892B]/20 transition"
                      />
                    </label>

                    <button
                      type="submit"
                      className="btn-shimmer w-full rounded-full bg-[#6B0F1A] hover:bg-[#111111] text-white font-bold text-sm py-4 px-6 transition-colors"
                    >
                      Préparer l’envoi sur WhatsApp
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8892B]">
                          Demande prête
                        </p>
                        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#111111]">
                          Votre récapitulatif est prêt à être envoyé
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmittedPayload(null)}
                        className="text-xs font-bold underline text-[#6B0F1A] hover:text-[#111111] shrink-0"
                      >
                        Modifier
                      </button>
                    </div>

                    <pre className="rounded-2xl bg-[#FAF6F2] border border-[#EADFD6] p-4 sm:p-5 text-xs sm:text-sm text-[#111111]/85 whitespace-pre-wrap font-sans leading-relaxed">
                      {submittedPayload}
                    </pre>

                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#111111]/60">
                        Choisissez une ligne WhatsApp pour envoyer votre devis :
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {WHATSAPP_LINES.map((line) => (
                          <a
                            key={line.id}
                            href={buildWhatsAppUrl(line.waDigits, submittedPayload)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm px-5 py-3.5 transition-colors tabular-nums ${
                              preferredLine === line.id
                                ? 'bg-[#6B0F1A] hover:bg-[#111111] text-white'
                                : 'border-2 border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111]'
                            }`}
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>Envoyer au {line.display}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#EADFD6]">
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#111111]/75 hover:text-[#6B0F1A] transition-colors"
                      >
                        {copiedMessage ? (
                          <>
                            <Check className="w-4 h-4 text-[#6B0F1A]" />
                            <span>Message copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copier le texte du devis</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`mailto:${AGENCY_CONTACT.email}?subject=${encodeURIComponent(
                          `Demande de devis Aura Event — ${fullName.trim() || 'Client'}`
                        )}&body=${encodeURIComponent(submittedPayload)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B0F1A] hover:text-[#111111] transition-colors underline underline-offset-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Envoyer par e-mail ({AGENCY_CONTACT.email})</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* QUIET FOOTER */}
        <footer className="bg-[#111111] text-white/75 border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-5">
            <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center pb-8 border-b border-white/10">
              <a href="#" className="flex items-center gap-4">
                <span className="bg-white rounded-full p-1.5 inline-flex items-center justify-center">
                  <AgencyLogo className="w-12 h-12" size={48} />
                </span>
                <span>
                  <span className="font-display font-extrabold text-xl text-white block">
                    Aura Event
                  </span>
                  <span className="text-xs text-white/65">
                    Une expertise au service de vos événements
                  </span>
                </span>
              </a>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {WHATSAPP_LINES.map((line) => (
                  <a
                    key={line.id}
                    href={buildWhatsAppUrl(line.waDigits)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D9B25F] transition-colors tabular-nums"
                  >
                    {line.display}
                  </a>
                ))}
                <a
                  href={AGENCY_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D9B25F] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={AGENCY_CONTACT.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D9B25F] transition-colors"
                >
                  TikTok
                </a>
                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  className="hover:text-[#D9B25F] transition-colors"
                >
                  {AGENCY_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-white/55">
              <p>© 2026 Aura Event. Tous droits réservés. Haïti.</p>
              <div className="flex items-center gap-5">
                <p>Ingénierie · Scénographie · Protocole &amp; Accueil VIP</p>
                <a
                  href="#"
                  className="font-semibold text-[#D9B25F] hover:text-white transition-colors whitespace-nowrap"
                >
                  Haut de page ↑
                </a>
              </div>
            </div>
          </div>
        </footer>

        <Lightbox
          photos={GALLERY_PHOTOS}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      </div>
    </MotionConfig>
  );
}
