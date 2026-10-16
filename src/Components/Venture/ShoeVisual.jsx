/*
 * "Smart scan" of the ShoesFit shoe, drawn in SVG: a glowing side profile,
 * sensor nodes in the sole that pulse, and data lines streaming to readouts.
 * Pure SVG + CSS animation — no image download, sharp at any size.
 */
const sensors = [
  { id: "hr", x: 128, y: 150, label: "Heart rate", value: "72 bpm", lx: 30, ly: 40, color: "#f87171" },
  { id: "spo2", x: 222, y: 238, label: "SpO₂", value: "98 %", lx: 250, ly: 330, color: "#22d3ee" },
  { id: "temp", x: 168, y: 238, label: "Temperature", value: "36.6 °C", lx: 40, ly: 320, color: "#fbbf24" },
  { id: "motion", x: 452, y: 232, label: "Motion", value: "6.2 km/h", lx: 470, ly: 320, color: "#a78bfa" },
];

export default function ShoeVisual() {
  return (
    <svg
      className="shoe_visual"
      viewBox="0 0 600 360"
      role="img"
      aria-label="ShoesFit smart shoe with sensors for heart rate, blood oxygen, temperature and motion"
    >
      <defs>
        <linearGradient id="sv-sig" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#4db5ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="sv-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4db5ff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="sv-sole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.35" />
        </linearGradient>
        <filter id="sv-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="sv-mesh" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#4db5ff" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
      </defs>

      {/* scan floor */}
      <ellipse cx="305" cy="272" rx="250" ry="14" fill="#8b5cf6" opacity="0.18" />

      {/* sole (midsole + outsole) */}
      <path
        className="sv_sole"
        d="M62 232 Q56 262 92 264 L522 264 Q562 262 556 230 Q548 214 520 214 L80 214 Q60 216 62 232 Z"
        fill="url(#sv-sole)"
        stroke="url(#sv-sig)"
        strokeWidth="2.5"
      />
      {/* outsole tread */}
      <path d="M90 256 H520" stroke="url(#sv-sig)" strokeWidth="1" strokeDasharray="6 8" opacity="0.6" />

      {/* upper */}
      <path
        className="sv_upper"
        d="M74 214 C64 168 70 122 98 104 C122 90 154 96 170 114 C190 134 214 140 244 136 L304 128
           C364 140 432 162 490 182 C530 196 552 206 548 214 Z"
        fill="url(#sv-fill)"
        stroke="url(#sv-sig)"
        strokeWidth="3"
        strokeLinejoin="round"
        filter="url(#sv-glow)"
      />
      <path
        d="M74 214 C64 168 70 122 98 104 C122 90 154 96 170 114 C190 134 214 140 244 136 L304 128
           C364 140 432 162 490 182 C530 196 552 206 548 214 Z"
        fill="url(#sv-mesh)"
      />

      {/* heel counter + toe cap accents */}
      <path d="M78 206 C72 170 78 140 96 124" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M470 176 C506 188 532 198 544 210" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.8" />

      {/* signature stripe */}
      <path
        className="sv_stripe"
        d="M120 196 C200 150 300 170 420 186"
        stroke="url(#sv-sig)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        filter="url(#sv-glow)"
      />

      {/* laces */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={236 + i * 30}
          y1={132 + i * 6}
          x2={256 + i * 30}
          y2={152 + i * 6}
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {/* embedded PCB + battery (x-ray) */}
      <rect x="250" y="222" width="70" height="20" rx="3" fill="none" stroke="#22d3ee" strokeOpacity="0.7" strokeDasharray="3 3" />
      <rect x="340" y="224" width="40" height="16" rx="3" fill="none" stroke="#a78bfa" strokeOpacity="0.7" strokeDasharray="3 3" />
      <text x="285" y="236" className="sv_tiny" textAnchor="middle">ESP32</text>
      <text x="360" y="236" className="sv_tiny" textAnchor="middle">BAT</text>

      {/* scanning beam sweeping across the shoe */}
      <rect className="sv_beam" x="60" y="80" width="6" height="190" fill="url(#sv-sig)" opacity="0.6" />

      {/* sensors, data lines and readouts */}
      {sensors.map((s) => {
        const tx = s.lx + 55;
        // line ends exactly on the readout's nearest edge
        const ty = s.ly < s.y ? s.ly + 18 : s.ly - 18;
        return (
          <g key={s.id} className="sv_sensor" style={{ "--c": s.color }}>
            <path className="sv_link" d={`M${s.x} ${s.y} L${tx} ${ty}`} stroke={s.color} />
            <circle className="sv_ping" cx={s.x} cy={s.y} r="6" fill={s.color} />
            <circle cx={s.x} cy={s.y} r="5" fill={s.color} filter="url(#sv-glow)" />
            <g transform={`translate(${s.lx} ${s.ly - 18})`}>
              <rect width="110" height="36" rx="9" className="sv_tag" stroke={s.color} />
              <text x="10" y="14" className="sv_tag_label">{s.label}</text>
              <text x="10" y="29" className="sv_tag_value" fill={s.color}>{s.value}</text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
