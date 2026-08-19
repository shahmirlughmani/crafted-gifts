/**
 * Studio mark — a botanical wreath around a gift basket, drawn to match the
 * green-and-gold seal used on the brand's product photography.
 */
export function LogoMark({
  className = "",
  title = "Crafted Gifts by S",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      <circle
        cx="60"
        cy="60"
        r="57"
        stroke="currentColor"
        strokeOpacity=".55"
        strokeWidth="1"
      />
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="var(--color-gold-500)"
        strokeOpacity=".75"
        strokeWidth=".8"
        strokeDasharray="1.5 4"
      />

      {/* wreath — left and right sprigs */}
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M26 76c-4-11-2-23 5-31" />
        <path d="M94 76c4-11 2-23-5-31" />
      </g>
      <g fill="currentColor" fillOpacity=".85">
        {[
          [27.5, 70, -35],
          [26.5, 62, -30],
          [27.5, 54, -22],
          [30.5, 47, -14],
        ].map(([x, y, r], i) => (
          <g key={`l${i}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse rx="5.5" ry="2.4" cx="-5" />
            <ellipse rx="5.5" ry="2.4" cx="5" transform="rotate(180)" />
          </g>
        ))}
        {[
          [92.5, 70, 35],
          [93.5, 62, 30],
          [92.5, 54, 22],
          [89.5, 47, 14],
        ].map(([x, y, r], i) => (
          <g key={`r${i}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse rx="5.5" ry="2.4" cx="-5" />
            <ellipse rx="5.5" ry="2.4" cx="5" transform="rotate(180)" />
          </g>
        ))}
      </g>

      {/* bow */}
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M60 38c-4-6-11-6-11-1s7 4 11 1z" />
        <path d="M60 38c4-6 11-6 11-1s-7 4-11 1z" />
        <path d="M60 38v5" />
      </g>

      {/* basket */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M60 43c-9 0-16 7-16 16"
          stroke="var(--color-gold-600)"
          strokeWidth="1.6"
        />
        <path
          d="M60 43c9 0 16 7 16 16"
          stroke="var(--color-gold-600)"
          strokeWidth="1.6"
        />
        <path
          d="M40 59h40l-4 21a3 3 0 0 1-3 2.5H47a3 3 0 0 1-3-2.5z"
          fill="var(--color-gold-200)"
          fillOpacity=".55"
          stroke="var(--color-gold-600)"
          strokeWidth="1.5"
        />
        <g stroke="var(--color-gold-600)" strokeWidth=".8" strokeOpacity=".8">
          <path d="M41 66h38M42 73h36" />
          <path d="M50 59.5v23M60 59.5v23M70 59.5v23" />
        </g>
      </g>

      {/* sparkles */}
      <g fill="var(--color-gold-500)">
        {[
          [36, 40, 3],
          [84, 40, 3],
          [60, 96, 3.4],
          [30, 88, 2.4],
          [90, 88, 2.4],
        ].map(([x, y, s], i) => (
          <path
            key={i}
            d={`M${x} ${y - s}c.3 ${s * 0.62} .38 ${s * 0.7} ${s} ${s}c-.62 .3-.7 .38-${s} ${s}c-.3-.62-.38-.7-${s}-${s}c.62-.3 .7-.38 ${s}-${s}z`}
          />
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-script leading-none ${className}`}>
      craftedgiftsbyS
    </span>
  );
}
