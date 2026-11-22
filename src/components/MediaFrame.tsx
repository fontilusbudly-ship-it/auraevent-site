type Props = {
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
  className?: string;
  priority?: boolean;
  onOpen?: () => void;
};

/** Cadre photo : zoom doux au survol, étiquette et légende, ouverture dans la visionneuse. */
export function MediaFrame({src, alt, caption, badge, className = '', priority = false, onOpen}: Props) {
  const content = (
    <>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B0F1A] backdrop-blur">
          {badge}
        </span>
      )}
      {caption && (
        <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-left text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {caption}
        </span>
      )}
    </>
  );
  const base = `group relative block overflow-hidden rounded-2xl bg-[#F3ECE6] ${className}`;
  return onOpen ? (
    <button type="button" onClick={onOpen} aria-label={`Agrandir la photo : ${alt}`} className={`${base} cursor-zoom-in`}>
      {content}
    </button>
  ) : (
    <div className={base}>{content}</div>
  );
}
