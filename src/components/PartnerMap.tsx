// HCMC coverage map. The photo and the pins live in ONE svg viewBox,
// so they crop together at any screen size — pins can never drift.
const W = 1122
const H = 1402

export function PartnerMap() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#1e1a33] sm:min-h-[480px]">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full" role="img" aria-label="Bản đồ phủ sóng partner gym tại TP.HCM">
        <image href="/assets/owner.webp" x={0} y={0} width={W} height={H} />
        {/* {gympaer */}
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
