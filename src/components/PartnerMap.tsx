import { ChevronRight, Dumbbell } from 'lucide-react'

// HCMC coverage map. The photo and the pins live in ONE svg viewBox,
// so they crop together at any screen size — pins can never drift.
const W = 1122
const H = 1402

// Pin anchors as fractions of the map image (x, y).
const gyms = [
  { n: 'Quận 12', fx: 0.52, fy: 0.155 },
  { n: 'Bình Thạnh', fx: 0.655, fy: 0.325 },
  { n: 'Quận 1 · Bến Thành', fx: 0.55, fy: 0.505 },
]

const R = 52

function Pin({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <title>{label}</title>
      <circle r={R + 14} fill="#ffffff" opacity={0.25} className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      <circle r={R} fill="#ffffff" style={{ filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.35))' }} />
      <g transform="rotate(-30)" stroke="#131316" strokeWidth={9} strokeLinecap="round">
        <line x1={-30} y1={0} x2={30} y2={0} />
        <line x1={-38} y1={-18} x2={-38} y2={18} />
        <line x1={-24} y1={-13} x2={-24} y2={13} />
        <line x1={24} y1={-13} x2={24} y2={13} />
        <line x1={38} y1={-18} x2={38} y2={18} />
      </g>
    </g>
  )
}

export function PartnerMap() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#1e1a33] sm:min-h-[480px]">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full" role="img" aria-label="Bản đồ phủ sóng partner gym tại TP.HCM">
        <image href="/assets/owner.webp" x={0} y={0} width={W} height={H} />
        {/* {gyms.map((g) => (
          <Pin key={g.n} x={g.fx * W} y={g.fy * H} label={g.n} />
        ))} */}
      </svg>

      {/* <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d9ff3d] text-black">
            <Dumbbell size={19} />
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-[14px] font-bold">Iron Gym · ★ 4.8</p>
            <p className="text-[12px] text-black/50">+7 partner gyms quanh bạn</p>
          </div>
          <ChevronRight size={18} className="shrink-0 text-black/30" />
        </div>
      </div> */}
    </div>
  )
}
