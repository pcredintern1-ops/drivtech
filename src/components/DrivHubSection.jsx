import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Facility data ───────────────────────────────────────────────── */
const facilities = [
  {
    id: 'washing',
    left: '50%', top: '6%',
    title: 'Washing Center',
    desc: 'High pressure fleet wash bays keeping every vehicle road ready and spotless.',
    tip: 'bottom',
    delay: 0.25,
  },
  {
    id: 'parking',
    left: '88%', top: '34%',
    title: 'Fleet Parking',
    desc: 'Secured multi bay parking for 500+ vehicles, fully operational 24/7.',
    tip: 'left',
    delay: 0.35,
  },
  {
    id: 'monitoring',
    left: '78%', top: '76%',
    title: 'Vehicle Monitoring',
    desc: 'Live GPS tracking and real time fleet performance dashboards.',
    tip: 'left',
    delay: 0.45,
  },
  {
    id: 'dispatch',
    left: '22%', top: '76%',
    title: 'Dispatch Management',
    desc: 'Centralised dispatch command and intelligent route allocation system.',
    tip: 'right',
    delay: 0.55,
  },
  {
    id: 'helpdesk',
    left: '12%', top: '34%',
    title: 'Driver Help Desk',
    desc: 'On site driver support, documentation, and real time query resolution.',
    tip: 'right',
    delay: 0.65,
  },
]

/* ── Decorative truck positions ──────────────────────────────────── */
const truckSpots = [
  { left: '50%', top: '27%', rotate:   0, delay: 0.8 },
  { left: '74%', top: '54%', rotate:  80, delay: 0.9 },
  { left: '26%', top: '54%', rotate: -80, delay: 1.0 },
]

/* ═══════════════════════════════════════════════════════════════════
   BUILDING SVGs — high-contrast, professional dark-themed
═══════════════════════════════════════════════════════════════════ */

/* ── DRIV HUB — main HQ tower ───────────────────────────────────── */
function HubBuilding() {
  return (
    <svg viewBox="0 0 90 118" width="90" height="118" xmlns="http://www.w3.org/2000/svg">
      {/* Glow behind building */}
      <ellipse cx="45" cy="95" rx="38" ry="8" fill="rgba(249,115,22,0.18)" />
      {/* Antenna */}
      <line x1="45" y1="0" x2="45" y2="11" stroke="#fb923c" strokeWidth="1.5"/>
      <circle cx="45" cy="0" r="3" fill="#f97316"/>
      <circle cx="45" cy="0" r="5" fill="rgba(249,115,22,0.25)"/>
      {/* Penthouse */}
      <rect x="30" y="10" width="30" height="8" rx="1" fill="#1e293b" stroke="#f97316" strokeWidth="1.2"/>
      {/* Roof bar */}
      <rect x="2" y="17" width="86" height="5" rx="1" fill="#0f172a" stroke="#f97316" strokeWidth="1.2"/>
      {/* HVAC boxes */}
      <rect x="6" y="10" width="14" height="8" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.9"/>
      <rect x="70" y="10" width="14" height="8" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.9"/>
      {/* Main tower body */}
      <rect x="4" y="21" width="82" height="90" rx="2" fill="#0f172a" stroke="#f97316" strokeWidth="1.8"/>
      {/* Vertical glass strips */}
      <rect x="12" y="21" width="3" height="90" fill="rgba(249,115,22,0.07)"/>
      <rect x="75" y="21" width="3" height="90" fill="rgba(249,115,22,0.07)"/>
      {/* Window row 1 — lit amber */}
      <rect x="10" y="26" width="14" height="8" rx="0.8" fill="#fb923c" opacity="0.85"/>
      <rect x="28" y="26" width="14" height="8" rx="0.8" fill="#f97316" opacity="0.95"/>
      <rect x="48" y="26" width="14" height="8" rx="0.8" fill="#fb923c" opacity="0.80"/>
      <rect x="66" y="26" width="14" height="8" rx="0.8" fill="#f97316" opacity="0.70"/>
      {/* Window row 2 */}
      <rect x="10" y="38" width="14" height="8" rx="0.8" fill="#fbbf24" opacity="0.60"/>
      <rect x="28" y="38" width="14" height="8" rx="0.8" fill="#fb923c" opacity="0.80"/>
      <rect x="48" y="38" width="14" height="8" rx="0.8" fill="#f97316" opacity="0.90"/>
      <rect x="66" y="38" width="14" height="8" rx="0.8" fill="#fb923c" opacity="0.65"/>
      {/* Window row 3 */}
      <rect x="10" y="50" width="14" height="8" rx="0.8" fill="#f97316" opacity="0.75"/>
      <rect x="28" y="50" width="14" height="8" rx="0.8" fill="#fbbf24" opacity="0.55"/>
      <rect x="48" y="50" width="14" height="8" rx="0.8" fill="#fb923c" opacity="0.70"/>
      <rect x="66" y="50" width="14" height="8" rx="0.8" fill="#f97316" opacity="0.85"/>
      {/* DRIV HUB sign — bright neon */}
      <rect x="8" y="62" width="74" height="15" rx="1.5" fill="#f97316" opacity="0.18"/>
      <rect x="8" y="62" width="74" height="15" rx="1.5" stroke="#f97316" strokeWidth="1.2"/>
      <text x="45" y="73" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800" fontFamily="Inter,sans-serif" letterSpacing="2">DRIV HUB</text>
      {/* Side windows above entrance */}
      <rect x="10" y="80" width="14" height="8" rx="0.8" fill="#fbbf24" opacity="0.70"/>
      <rect x="66" y="80" width="14" height="8" rx="0.8" fill="#fb923c" opacity="0.60"/>
      {/* Entrance */}
      <rect x="28" y="78" width="34" height="33" rx="2" fill="#1e293b" stroke="#f97316" strokeWidth="1.1"/>
      <rect x="36" y="92" width="18" height="19" rx="1.2" fill="#0f172a" stroke="#fb923c" strokeWidth="0.9"/>
      <circle cx="52" cy="102" r="1.4" fill="#f97316"/>
      {/* Steps */}
      <rect x="20" y="109" width="50" height="2.5" rx="0.5" fill="#f97316" opacity="0.45"/>
      <rect x="14" y="111" width="62" height="2.5" rx="0.5" fill="#f97316" opacity="0.30"/>
      <rect x="6" y="113" width="78" height="2" rx="0.5" fill="#f97316" opacity="0.18"/>
    </svg>
  )
}

/* ── Washing Center ──────────────────────────────────────────────── */
function WashBuilding() {
  return (
    <svg viewBox="0 0 78 75" width="78" height="75" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="39" cy="67" rx="30" ry="5" fill="rgba(249,115,22,0.15)" />
      {/* Roof */}
      <rect x="0" y="8" width="78" height="6" rx="0.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.2"/>
      {/* Main body */}
      <rect x="2" y="13" width="74" height="55" rx="1" fill="#0f172a" stroke="#f97316" strokeWidth="1.4"/>
      {/* Sign */}
      <rect x="6" y="16" width="66" height="11" rx="1" fill="#f97316" opacity="0.20"/>
      <rect x="6" y="16" width="66" height="11" rx="1" stroke="#f97316" strokeWidth="0.9"/>
      <text x="39" y="24.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="700" fontFamily="Inter,sans-serif" letterSpacing="1">WASH CENTER</text>
      {/* Water drops */}
      <circle cx="20" cy="5" r="2.2" fill="#38bdf8"/>
      <circle cx="28" cy="2" r="2.2" fill="#7dd3fc"/>
      <circle cx="36" cy="5" r="2.2" fill="#38bdf8"/>
      <circle cx="44" cy="2" r="2.2" fill="#7dd3fc"/>
      <circle cx="52" cy="5" r="2.2" fill="#38bdf8"/>
      <circle cx="60" cy="2" r="2.2" fill="#7dd3fc"/>
      {/* Wash bay arch */}
      <rect x="10" y="31" width="58" height="37" rx="2" fill="#1e293b" stroke="#fb923c" strokeWidth="0.9"/>
      <path d="M10,46 Q39,30 68,46" fill="none" stroke="#38bdf8" strokeWidth="1.4"/>
      {/* Water spray lines */}
      <line x1="18" y1="36" x2="14" y2="50" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2"/>
      <line x1="22" y1="34" x2="20" y2="52" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="2 2"/>
      <line x1="56" y1="36" x2="60" y2="50" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2"/>
      <line x1="60" y1="34" x2="62" y2="52" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="2 2"/>
      {/* Car silhouette */}
      <rect x="22" y="56" width="34" height="9" rx="3" fill="#334155" stroke="#f97316" strokeWidth="0.9"/>
      <rect x="28" y="49" width="22" height="8" rx="3" fill="#475569" stroke="#fb923c" strokeWidth="0.8"/>
      <circle cx="30" cy="65" r="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.9"/>
      <circle cx="50" cy="65" r="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.9"/>
    </svg>
  )
}

/* ── Fleet Parking ───────────────────────────────────────────────── */
function ParkBuilding() {
  return (
    <svg viewBox="0 0 78 75" width="78" height="75" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="39" cy="69" rx="30" ry="4" fill="rgba(249,115,22,0.15)" />
      {/* Top rail */}
      <rect x="0" y="6" width="78" height="4" rx="0.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.1"/>
      {/* Main structure */}
      <rect x="2" y="9" width="74" height="63" rx="1" fill="#0f172a" stroke="#f97316" strokeWidth="1.5"/>
      {/* Level dividers */}
      <line x1="2" y1="30" x2="76" y2="30" stroke="#f97316" strokeWidth="0.9" opacity="0.6"/>
      <line x1="2" y1="51" x2="76" y2="51" stroke="#f97316" strokeWidth="0.9" opacity="0.6"/>
      {/* Level 3 bays */}
      <rect x="6" y="13" width="18" height="14" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      <rect x="30" y="13" width="18" height="14" rx="0.5" fill="#334155" stroke="#f97316" strokeWidth="0.8"/>
      <rect x="54" y="13" width="18" height="14" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      {/* Level 2 */}
      <rect x="6" y="34" width="18" height="14" rx="0.5" fill="#334155" stroke="#f97316" strokeWidth="0.8"/>
      <rect x="30" y="34" width="18" height="14" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      <rect x="54" y="34" width="18" height="14" rx="0.5" fill="#334155" stroke="#f97316" strokeWidth="0.8"/>
      {/* Level 1 — P sign */}
      <rect x="6" y="55" width="38" height="14" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      <text x="25" y="66" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="900" fontFamily="Inter,sans-serif">P</text>
      {/* Entry ramp */}
      <rect x="52" y="55" width="20" height="14" rx="0.5" fill="#1e293b" stroke="#f97316" strokeWidth="0.8"/>
      <polyline points="55,68 68,58 72,62" fill="none" stroke="#fb923c" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Vehicle Monitoring ──────────────────────────────────────────── */
function MonitorBuilding() {
  return (
    <svg viewBox="0 0 76 80" width="76" height="80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="74" rx="30" ry="5" fill="rgba(249,115,22,0.15)" />
      {/* Antenna */}
      <line x1="38" y1="0" x2="38" y2="14" stroke="#f97316" strokeWidth="1.8"/>
      <line x1="32" y1="5" x2="38" y2="2" stroke="#fb923c" strokeWidth="1.1"/>
      <line x1="44" y1="5" x2="38" y2="2" stroke="#fb923c" strokeWidth="1.1"/>
      <circle cx="38" cy="0" r="3" fill="#f97316"/>
      <circle cx="38" cy="0" r="5" fill="rgba(249,115,22,0.3)"/>
      {/* Radar dish */}
      <path d="M24,14 Q38,6 52,14" fill="none" stroke="#fb923c" strokeWidth="1.4"/>
      <line x1="38" y1="14" x2="38" y2="10" stroke="#fb923c" strokeWidth="1.2"/>
      {/* Roof */}
      <rect x="0" y="13" width="76" height="5" rx="0.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.2"/>
      {/* Signal dots */}
      <circle cx="8" cy="11" r="2.2" fill="#22c55e"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite"/></circle>
      <circle cx="16" cy="11" r="2.2" fill="#4ade80"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="0.3s" repeatCount="indefinite"/></circle>
      <circle cx="60" cy="11" r="2.2" fill="#4ade80"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="0.6s" repeatCount="indefinite"/></circle>
      <circle cx="68" cy="11" r="2.2" fill="#22c55e"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="0.9s" repeatCount="indefinite"/></circle>
      {/* Main body */}
      <rect x="2" y="17" width="72" height="60" rx="1.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.5"/>
      {/* Monitoring screen */}
      <rect x="8" y="22" width="60" height="32" rx="1.5" fill="#0c1a2e" stroke="#fb923c" strokeWidth="1.1"/>
      {/* Screen content */}
      <polyline points="10,42 15,42 18,34 22,50 26,38 29,44 33,44 38,44" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="40,38 44,38 47,30 51,48 54,36 57,44 62,44 66,44" fill="none" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Screen label */}
      <text x="38" y="58" textAnchor="middle" fill="rgba(251,146,60,0.6)" fontSize="4" fontFamily="Inter,sans-serif">LIVE FLEET MONITORING</text>
      {/* Sign */}
      <rect x="8" y="60" width="60" height="10" rx="1" fill="#f97316" opacity="0.20"/>
      <rect x="8" y="60" width="60" height="10" rx="1" stroke="#f97316" strokeWidth="0.9"/>
      <text x="38" y="67.5" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="700" fontFamily="Inter,sans-serif" letterSpacing="0.8">MONITORING</text>
      {/* Entrance */}
      <rect x="26" y="70" width="24" height="7" rx="0.8" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
    </svg>
  )
}

/* ── Dispatch Management ─────────────────────────────────────────── */
function DispatchBuilding() {
  return (
    <svg viewBox="0 0 82 72" width="82" height="72" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="41" cy="66" rx="35" ry="5" fill="rgba(249,115,22,0.15)" />
      {/* Roof with skylights */}
      <rect x="0" y="9" width="82" height="5" rx="0.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.2"/>
      <rect x="10" y="4" width="10" height="6" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      <rect x="36" y="4" width="10" height="6" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      <rect x="62" y="4" width="10" height="6" rx="0.5" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      {/* Main body */}
      <rect x="1" y="13" width="80" height="56" rx="1" fill="#0f172a" stroke="#f97316" strokeWidth="1.5"/>
      {/* Sign */}
      <rect x="5" y="16" width="72" height="10" rx="1" fill="#f97316" opacity="0.20"/>
      <rect x="5" y="16" width="72" height="10" rx="1" stroke="#f97316" strokeWidth="0.9"/>
      <text x="41" y="23.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif" letterSpacing="0.8">DISPATCH CENTER</text>
      {/* Rolling doors */}
      <rect x="5" y="30" width="34" height="36" rx="1" fill="#1e293b" stroke="#fb923c" strokeWidth="1.1"/>
      <line x1="5" y1="34" x2="39" y2="34" stroke="#f97316" strokeWidth="0.6" opacity="0.5"/>
      <line x1="5" y1="38" x2="39" y2="38" stroke="#f97316" strokeWidth="0.6" opacity="0.5"/>
      <line x1="5" y1="42" x2="39" y2="42" stroke="#f97316" strokeWidth="0.6" opacity="0.5"/>
      <line x1="5" y1="46" x2="39" y2="46" stroke="#f97316" strokeWidth="0.6" opacity="0.5"/>
      <line x1="5" y1="50" x2="39" y2="50" stroke="#f97316" strokeWidth="0.6" opacity="0.5"/>
      <rect x="20" y="46" width="2" height="8" rx="1" fill="#f97316" opacity="0.9"/>
      {/* Office section */}
      <rect x="45" y="30" width="32" height="36" rx="1" fill="#1e293b" stroke="#fb923c" strokeWidth="0.9"/>
      <rect x="5" y="64" width="34" height="5" rx="0.5" fill="#f97316" opacity="0.35"/>
      {/* Office windows — lit */}
      <rect x="48" y="34" width="12" height="9" rx="0.5" fill="#fbbf24" opacity="0.75" stroke="#f97316" strokeWidth="0.7"/>
      <rect x="63" y="34" width="12" height="9" rx="0.5" fill="#fb923c" opacity="0.65" stroke="#f97316" strokeWidth="0.7"/>
      {/* Staff silhouette */}
      <rect x="50" y="50" width="8" height="12" rx="0.5" fill="#334155"/>
      <circle cx="54" cy="48" r="2.5" fill="#475569"/>
    </svg>
  )
}

/* ── Driver Help Desk ────────────────────────────────────────────── */
function HelpBuilding() {
  return (
    <svg viewBox="0 0 70 80" width="70" height="80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="74" rx="28" ry="5" fill="rgba(249,115,22,0.15)" />
      {/* Roof gable */}
      <polygon points="0,16 35,2 70,16" fill="#0f172a" stroke="#f97316" strokeWidth="1.2"/>
      {/* Flag */}
      <line x1="35" y1="2" x2="35" y2="14" stroke="#fb923c" strokeWidth="1.1"/>
      <polygon points="35,2 35,7 42,4.5" fill="#f97316"/>
      {/* Main body */}
      <rect x="3" y="15" width="64" height="62" rx="1" fill="#0f172a" stroke="#f97316" strokeWidth="1.5"/>
      {/* Sign banner */}
      <rect x="6" y="18" width="58" height="12" rx="1" fill="#f97316" opacity="0.22"/>
      <rect x="6" y="18" width="58" height="12" rx="1" stroke="#f97316" strokeWidth="0.9"/>
      <text x="35" y="27" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="700" fontFamily="Inter,sans-serif">DRIVER HELP DESK</text>
      {/* Reception window */}
      <rect x="8" y="33" width="54" height="22" rx="1" fill="#0c1a2e" stroke="#fb923c" strokeWidth="0.9"/>
      <line x1="8" y1="44" x2="62" y2="44" stroke="#f97316" strokeWidth="0.8" opacity="0.5"/>
      {/* Staff */}
      <circle cx="25" cy="40" r="4" fill="#475569" stroke="#fb923c" strokeWidth="0.8"/>
      <rect x="19" y="43" width="12" height="9" rx="1" fill="#334155" stroke="#fb923c" strokeWidth="0.6"/>
      {/* Desk */}
      <rect x="8" y="49" width="54" height="4" rx="0.5" fill="#f97316" opacity="0.40"/>
      {/* Visitor */}
      <circle cx="52" cy="40" r="4" fill="#334155" stroke="#64748b" strokeWidth="0.8"/>
      {/* Side windows — lit */}
      <rect x="8" y="59" width="14" height="14" rx="0.8" fill="#fbbf24" opacity="0.55" stroke="#f97316" strokeWidth="0.8"/>
      <rect x="48" y="59" width="14" height="14" rx="0.8" fill="#fb923c" opacity="0.50" stroke="#f97316" strokeWidth="0.8"/>
      {/* Entrance */}
      <rect x="26" y="59" width="18" height="18" rx="1" fill="#1e293b" stroke="#fb923c" strokeWidth="0.8"/>
      <circle cx="42" cy="69" r="1.4" fill="#f97316"/>
    </svg>
  )
}

/* ── Mini decorative truck ───────────────────────────────────────── */
function MiniTruck() {
  return (
    <svg viewBox="0 0 44 20" width="44" height="20" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="28" height="11" rx="2" fill="#f97316"/>
      <rect x="28" y="1" width="14" height="14" rx="2" fill="#ea580c"/>
      <rect x="30" y="3" width="8" height="5" rx="0.8" fill="rgba(186,230,253,0.7)"/>
      <circle cx="8" cy="16" r="3.5" fill="#1e293b" stroke="#f97316" strokeWidth="1"/>
      <circle cx="22" cy="16" r="3.5" fill="#1e293b" stroke="#f97316" strokeWidth="1"/>
      <circle cx="36" cy="16" r="3.5" fill="#1e293b" stroke="#ea580c" strokeWidth="1"/>
      <circle cx="41" cy="10" r="1.4" fill="rgba(255,230,100,1)"/>
    </svg>
  )
}

function getBuildingComponent(id) {
  switch (id) {
    case 'washing':    return <WashBuilding />
    case 'parking':    return <ParkBuilding />
    case 'monitoring': return <MonitorBuilding />
    case 'dispatch':   return <DispatchBuilding />
    case 'helpdesk':   return <HelpBuilding />
    default:           return null
  }
}

/* ── Tooltip placement ───────────────────────────────────────────── */
function tipStyle(dir) {
  switch (dir) {
    case 'bottom': return { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
    case 'left':   return { top: '50%', right: 'calc(100% + 8px)', transform: 'translateY(-50%)' }
    case 'right':  return { top: '50%', left: 'calc(100% + 8px)', transform: 'translateY(-50%)' }
    default:       return { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
  }
}

/* ── Convert facility % positions to SVG coords ─────────────────── */
function facilityToSvgCoords(f) {
  // The SVG viewBox is "0 0 100 72" with preserveAspectRatio="none"
  // f.left is "X%" → x = X
  // f.top  is "Y%" → y = Y * 0.72  (because height = 72, coords = top% * 72/100)
  const x = parseFloat(f.left)
  const y = parseFloat(f.top) * 0.72
  return { x, y }
}

/* ════════════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════════════ */
export default function DrivHubSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="hub" className="relative py-12 md:py-20 lg:py-24 overflow-x-clip section-sep bg-[#ebecf0]">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #A3E635 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Green radial glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(163,230,53,0.07) 0%, transparent 65%)' }} />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(163,230,53,0.5), transparent)' }} />
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(163,230,53,0.3), transparent)' }} />

      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75 }}
          className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="flex items-center justify-center gap-2.5 text-[#65a30d] text-sm font-bold uppercase tracking-[0.3em] mb-4">
            <span className="w-8 h-px bg-[#A3E635]/60"/>
            <span className="w-2 h-2 rounded-full bg-[#A3E635]"/>
            Operations Hub
            <span className="w-2 h-2 rounded-full bg-[#A3E635]"/>
            <span className="w-8 h-px bg-[#A3E635]/60"/>
          </span>
          <div className="w-fit mx-auto mb-4 md:mb-6">
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] text-gray-900 leading-[1.08] mb-2 text-center">
              The DRIV <span className="gradient-text">HUB</span>
            </h2>
          </div>
          <p className="text-black text-lg sm:text-xl md:text-xl lg:text-xl max-w-2xl mx-auto leading-relaxed">
            A centralised fleet and operations command centre in Bhiwandi, designed to power enterprise
            logistics across Mumbai and beyond.
          </p>
        </motion.div>

        {/* ── Radial campus diagram — shown from md and up ─── */}
        <div className="hidden md:block relative w-full max-w-2xl mx-auto" style={{ paddingBottom: '72%' }}>
          <div className="absolute inset-0">

            {/* Spoke lines SVG underlay */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 72" preserveAspectRatio="none">
              {/* Outer ring guide */}
              <ellipse cx="50" cy="36" rx="44" ry="32"
                fill="none" stroke="rgba(249,115,22,0.08)" strokeWidth="0.3" strokeDasharray="2 4"/>

              {facilities.map((f, i) => {
                const { x, y } = facilityToSvgCoords(f)
                return (
                  <motion.line key={i}
                    x1="50" y1="36"
                    x2={x} y2={y}
                    stroke="rgba(249,115,22,0.5)"
                    strokeWidth="0.5"
                    strokeDasharray="60"
                    initial={{ strokeDashoffset: 60, opacity: 0 }}
                    whileInView={{ strokeDashoffset: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.9, delay: f.delay - 0.1 }}
                  />
                )
              })}

              {/* Dots at endpoints */}
              {facilities.map((f, i) => {
                const { x, y } = facilityToSvgCoords(f)
                return (
                  <motion.circle key={`dot-${i}`} cx={x} cy={y} r="1"
                    fill="#f97316"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ delay: f.delay }}
                  />
                )
              })}
            </svg>

            {/* Decorative mini trucks */}
            {truckSpots.map((t, i) => (
              <motion.div key={i}
                className="absolute pointer-events-none"
                style={{ left: t.left, top: t.top, transform: `translate(-50%,-50%) rotate(${t.rotate}deg)` }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }}
                viewport={{ once: true, amount: 0.05 }} transition={{ delay: t.delay }}>
                <MiniTruck />
              </motion.div>
            ))}

            {/* Centre DRIV HUB building */}
            <motion.div
              className="absolute z-10"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              {/* Glow ring around centre */}
              <div className="absolute inset-0 -m-4 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)' }} />
              <HubBuilding />
            </motion.div>

            {/* Facility buildings */}
            {facilities.map((f) => (
              <motion.div
                key={f.id}
                className="absolute z-20 cursor-pointer"
                style={{ left: f.left, top: f.top, transform: 'translate(-50%,-50%)' }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.7, delay: f.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.12, zIndex: 30 }}
                onHoverStart={() => setHovered(f.id)}
                onHoverEnd={() => setHovered(null)}>

                {/* Building icon */}
                {getBuildingComponent(f.id)}

                {/* Label below each building */}
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[9px] font-bold text-[#fb923c] uppercase tracking-wide bg-[#060d1a]/80 px-1.5 py-0.5 rounded">
                    {f.title.split(' ')[0]}
                  </span>
                </div>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hovered === f.id && (
                    <motion.div
                      className="absolute z-50 w-52 rounded-xl p-3 pointer-events-none"
                      style={{
                        ...tipStyle(f.tip),
                        background: 'rgba(6,13,26,0.96)',
                        border: '1px solid rgba(249,115,22,0.40)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(249,115,22,0.10)',
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.18 }}>
                      <p className="text-[#fb923c] text-xs font-bold mb-1.5 leading-tight">{f.title}</p>
                      <p className="text-black text-sm leading-relaxed">{f.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Mobile/tablet fallback — simple grid of facility cards */}
        <motion.div
          className="md:hidden mt-4 grid grid-cols-2 gap-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.05 }}>
          {/* Centre hub card */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
            className="col-span-2 bg-[#0f172a] border border-[#f97316]/40 rounded-xl p-4 text-center shadow-[0_4px_24px_rgba(249,115,22,0.10)]">
            <div className="text-[#fb923c] text-sm font-black mb-1">DRIV HUB</div>
            <p className="text-gray-400 text-xs">Central fleet operations command centre · Bhiwandi, Mumbai</p>
          </motion.div>
          {facilities.map((f, i) => (
            <motion.div
              key={f.id}
              variants={{
                hidden: { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
                show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="bg-[#0f172a] border border-[#f97316]/25 rounded-xl p-3 shadow-sm">
              <p className="text-[#fb923c] text-xs font-bold mb-1">{f.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom feature tags */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-10 md:mt-14 flex flex-wrap justify-center gap-3">
          {[
            { label: '500+ Vehicle Capacity', color: 'green' },
            { label: '24/7 Operations',       color: 'orange' },
            { label: 'Bhiwandi, Mumbai',       color: 'green' },
            { label: 'GPS Fleet Tracking',     color: 'orange' },
            { label: 'On site Driver Support', color: 'green' },
          ].map(({ label, color }) => (
            <span key={label}
              className={`px-4 py-2 rounded-full text-xs font-semibold ${
                color === 'green'
                  ? 'bg-[#A3E635]/10 border border-[#A3E635]/35 text-[#65a30d]'
                  : 'bg-[#F97316]/10 border border-[#F97316]/35 text-[#ea6c0a]'
              }`}>
              {label}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
