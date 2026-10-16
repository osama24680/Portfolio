/*
 * Exploded-view blueprint of the ShoesFit sole: the TPU sole, the slots that
 * hold the PCB and battery, and the sensor layer — drawn like an engineering
 * drawing (grid, callouts, dimension line). Layers drift apart on hover.
 */
const layers = [
  { y: 40, label: "Sensor layer", note: "MAX30102 · DHT22 · MPU6050", color: "#22d3ee" },
  { y: 100, label: "Custom PCB + ESP32", note: "Wi-Fi / BLE", color: "#4db5ff" },
  { y: 160, label: "Battery slot", note: "protected cavity", color: "#a78bfa" },
  { y: 220, label: "TPU sole", note: "3D-printed · flexible", color: "#8b5cf6" },
];

// an isometric sole outline at a given vertical offset
const solePath = (y) =>
  `M40 ${y + 18} C40 ${y + 4} 70 ${y} 110 ${y + 2} L250 ${y + 8} C290 ${y + 10} 300 ${y + 22} 290 ${y + 32}
   C280 ${y + 42} 250 ${y + 44} 210 ${y + 42} L90 ${y + 38} C55 ${y + 36} 40 ${y + 30} 40 ${y + 18} Z`;

export default function SoleBlueprint() {
  return (
    <svg
      className="sole_blueprint"
      viewBox="0 0 520 290"
      role="img"
      aria-label="Exploded view of the ShoesFit sole: sensor layer, PCB with ESP32, battery slot, and TPU sole"
    >
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="#4db5ff" strokeOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="520" height="290" fill="url(#bp-grid)" />

      {/* vertical assembly axis */}
      <line x1="165" y1="20" x2="165" y2="270" stroke="#4db5ff" strokeOpacity="0.35" strokeDasharray="4 6" />

      {layers.map((l, i) => (
        <g key={l.label} className="bp_layer" style={{ "--i": i, "--c": l.color }}>
          <path d={solePath(l.y)} fill={l.color} fillOpacity="0.08" stroke={l.color} strokeWidth="1.6" />

          {/* layer contents */}
          {i === 0 &&
            [80, 140, 200, 250].map((x) => <circle key={x} cx={x} cy={l.y + 20} r="5" fill={l.color} className="bp_dot" />)}
          {i === 1 && (
            <g stroke={l.color} fill="none">
              <rect x="120" y={l.y + 10} width="80" height="22" rx="3" />
              <path d={`M128 ${l.y + 21} h16 m8 0 h16 m8 0 h16`} strokeDasharray="2 3" />
            </g>
          )}
          {i === 2 && <rect x="150" y={l.y + 12} width="50" height="18" rx="4" fill="none" stroke={l.color} strokeDasharray="3 3" />}

          {/* callout */}
          <path d={`M292 ${l.y + 22} H330`} stroke={l.color} strokeOpacity="0.6" />
          <circle cx="292" cy={l.y + 22} r="2.5" fill={l.color} />
          <text x="338" y={l.y + 20} className="bp_label">{l.label}</text>
          <text x="338" y={l.y + 34} className="bp_note">{l.note}</text>
        </g>
      ))}

      {/* overall height dimension */}
      <g className="bp_dim">
        <line x1="20" y1="40" x2="20" y2="262" />
        <line x1="14" y1="40" x2="26" y2="40" />
        <line x1="14" y1="262" x2="26" y2="262" />
        <text x="12" y="155" transform="rotate(-90 12 155)" textAnchor="middle">ASSEMBLY · 4 LAYERS</text>
      </g>
    </svg>
  );
}
