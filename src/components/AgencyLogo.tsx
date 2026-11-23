import {useState} from 'react';

type Props = {className?: string; size?: number};

/** Logo officiel (public/logo.png) avec repli sur les initiales si le fichier est introuvable. */
export function AgencyLogo({className = '', size = 48}: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className={`inline-grid place-items-center rounded-full bg-[#6B0F1A] font-display font-bold text-[#D9B25F] ${className}`}
        style={{width: size, height: size}}
        aria-hidden="true"
      >
        AE
      </span>
    );
  }
  return <img src="/logo.png" alt="Logo Aura Event" width={size} height={size} className={className} onError={() => setFailed(true)} />;
}
