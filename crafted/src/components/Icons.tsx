type P = { className?: string };
const base = "none";

export const IconBag = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8h12l-1 12H7z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const IconHeart = ({ className, filled }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20s-7-4.6-9.2-9A5 5 0 0 1 12 6.6 5 5 0 0 1 21.2 11c-2.2 4.4-9.2 9-9.2 9z" />
  </svg>
);

export const IconMenu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconX = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.7" className={className} strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const IconChevron = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export const IconWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.86 9.86 0 0 0 4.7 1.2h.01c5.43 0 9.86-4.43 9.86-9.87 0-2.64-1.03-5.12-2.9-6.98A9.79 9.79 0 0 0 12.04 2zm0 18.05h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.8 2.41 8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.17-8.2 8.17z" />
  </svg>
);

/**
 * Instagram's current brand gradient — warm yellow through magenta to indigo.
 * One constant so the FAB, the order buttons and the CTAs can't drift apart.
 */
export const IG_GRADIENT =
  "radial-gradient(circle at 28% 108%, #fdf497 0%, #fdf497 5%, #fd5949 42%, #d6249f 62%, #285aeb 92%)";

export const IconInstagram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.7" className={className}>
    {/* Corners are rounder and the lens smaller than the older mark. */}
    <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.8" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 2" />
  </svg>
);

export const IconTruck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" />
    <circle cx="6.5" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </svg>
);

export const IconSparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2c.9 4.6 2.4 6.5 7 7.4-4.6.9-6.1 2.8-7 7.4-.9-4.6-2.4-6.5-7-7.4 4.6-.9 6.1-2.8 7-7.4z" />
    <path d="M19 15c.45 2.3 1.2 3.25 3.5 3.7-2.3.45-3.05 1.4-3.5 3.7-.45-2.3-1.2-3.25-3.5-3.7 2.3-.45 3.05-1.4 3.5-3.7z" opacity=".55" />
  </svg>
);

export const IconGift = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.4" className={className} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="18" height="12" rx="1.5" />
    <path d="M3 13h18M12 9v12" />
    <path d="M12 9S9.5 3.5 7 5s1 4 5 4zM12 9s2.5-5.5 5-4-1 4-5 4z" />
  </svg>
);

export const IconShare = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v13M8 7l4-4 4 4" />
    <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
  </svg>
);

export const IconCopy = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

export const IconUpload = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16V4M8 8l4-4 4 4" />
    <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const IconSearch = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const IconLeaf = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill={base} stroke="currentColor" strokeWidth="1.4" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 4C10 4 4 9 4 16c0 2 1 4 1 4s7-1 11-5c3-3 4-8 4-11z" />
    <path d="M5 20 14 10" />
  </svg>
);
