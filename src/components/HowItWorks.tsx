import { ArrowRight, MapPin, Ticket, Timer, Wallet } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

/* ---------- Mini mockups ---------- */

function PassVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* bundle — back ticket */}
      <div className="absolute h-[96px] w-[150px] translate-x-7 rotate-[7deg] rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/10 transition-transform duration-300 group-hover:translate-x-9 group-hover:rotate-[9deg]">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/40">Bundle</span>
          <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[8px] font-bold text-black/60">×10</span>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }).map((_, k) => (
            <span key={k} className="h-2 rounded-[3px] bg-black/15" />
          ))}
        </div>
      </div>

      {/* single — front ticket */}
      <div className="relative h-[96px] w-[150px] -translate-x-5 -rotate-[5deg] rounded-2xl bg-volt p-3.5 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-x-8 group-hover:-rotate-[7deg]">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/50">Single</span>
          <Ticket size={11} strokeWidth={2.5} className="text-black/60" />
        </div>
        <p className="font-display mt-2 text-[22px] font-black leading-none tracking-[-0.02em]">1 credit</p>
        <p className="mt-1.5 text-[9px] font-semibold text-black/50">Mọi gym · không hạn dùng</p>
        <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f4f5f7]" />
        <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f4f5f7]" />
      </div>
    </div>
  );
}

function MapVisual() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* streets */}
      <div className="absolute -left-[10%] top-[46%] h-[7px] w-[120%] -rotate-3 bg-white" />
      <div className="absolute left-[36%] -top-[10%] h-[120%] w-[7px] rotate-6 bg-white" />

      {/* gyms khác */}
      <span className="absolute left-[16%] top-[22%] h-2 w-2 rounded-full bg-black/25" />
      <span className="absolute left-[76%] top-[18%] h-2 w-2 rounded-full bg-black/25" />
      <span className="absolute left-[70%] top-[70%] h-2 w-2 rounded-full bg-black/25" />
      <span className="absolute left-[20%] top-[74%] h-2 w-2 rounded-full bg-black/25" />

      {/* bạn ở đây */}
      <span className="absolute left-[44%] top-[80%] h-2.5 w-2.5 rounded-full bg-black ring-2 ring-white" />

      {/* bán kính tìm kiếm */}
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-black/15" />

      {/* gym gần nhất */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-volt/60" />
        <MapPin size={30} strokeWidth={2.2} className="relative fill-volt text-black" />
      </div>
      <span className="absolute left-1/2 top-[58%] -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-bold shadow-sm ring-1 ring-black/10">
        Iron House · 650m
      </span>
    </div>
  );
}

function QrVisual() {
  const modules = [
    [27, 3], [39, 3], [51, 9], [33, 15], [45, 21], [57, 21], [27, 27], [45, 33],
    [9, 27], [3, 39], [15, 45], [21, 51], [33, 45], [39, 57], [27, 69], [45, 63],
    [51, 51], [33, 75], [51, 69], [63, 45], [75, 51], [69, 27], [75, 63], [9, 57],
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
      <div className="relative rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/10">
        {/* khung scanner */}
        <span className="absolute -left-1.5 -top-1.5 h-4 w-4 rounded-tl-md border-l-[3px] border-t-[3px] border-black" />
        <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-tr-md border-r-[3px] border-t-[3px] border-black" />
        <span className="absolute -bottom-1.5 -left-1.5 h-4 w-4 rounded-bl-md border-b-[3px] border-l-[3px] border-black" />
        <span className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-br-md border-b-[3px] border-r-[3px] border-black" />

        <svg viewBox="0 0 84 84" className="h-[68px] w-[68px]" aria-hidden="true">
          {[[3, 3], [63, 3], [3, 63]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="18" height="18" rx="3" fill="#151515" />
              <rect x={x + 4} y={y + 4} width="10" height="10" rx="1.5" fill="#fff" />
              <rect x={x + 7} y={y + 7} width="4" height="4" rx="1" fill="#151515" />
            </g>
          ))}
          <rect x="60" y="60" width="12" height="12" rx="2" fill="#151515" />
          <rect x="64" y="64" width="4" height="4" fill="#fff" />
          {modules.map(([x, y], k) => (
            <rect key={k} x={x} y={y} width="6" height="6" rx="1" fill={k % 7 === 3 ? 'currentColor' : '#151515'} className="text-volt" />
          ))}
        </svg>

        {/* tia quét */}
        <span className="absolute left-1 right-1 h-[3px] animate-[how-qscan_2.6s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-volt to-transparent" />
      </div>

      <span className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-[10px] font-bold text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
        Đang quét…
      </span>
    </div>
  );
}

/* ---------- Section ---------- */

const steps = [
  { t: 'Chọn pass', d: 'Single 1 credit hoặc bundle 10 / 15 linh hoạt. Mua một lần, dùng dần ở mọi partner gym.', meta: 'Từ 90k · không hạn dùng', Icon: Wallet, Visual: PassVisual },
  { t: 'Tìm gym gần nhất', d: 'Mở map, thấy gym quanh nhà, trường, công ty — kèm khoảng cách, rating, tag như #RackSquat.', meta: '100+ gym HCM & Hà Nội', Icon: MapPin, Visual: MapVisual },
  { t: 'Quét QR là tập', d: 'Đưa máy cho lễ tân quét QR check-in. Zero hợp đồng, zero chào mời.', meta: 'Check-in dưới 5 giây', Icon: Timer, Visual: QrVisual },
];

export function HowItWorks({ eyebrow }: { eyebrow: string }) {
  return (
    <section id="how" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <style>{`
        @keyframes how-qscan { 0%, 100% { top: 12%; } 50% { top: 84%; } }
      `}</style>

      <Reveal className="mx-auto flex max-w-[680px] flex-col items-center text-center">
        <p className={eyebrow}>Cách hoạt động</p>
        <h2 className="font-display mt-4 text-[28px] font-black leading-[1.08] tracking-[-0.02em] sm:text-[36px]">
          <span className="relative inline-block">
            Ba bước
            <svg viewBox="0 0 100 9" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-1 left-0 h-[7px] w-full text-volt">
              <path d="M2 6.5 Q 26 1.5 50 4.5 T 98 3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{' '}
          là vào tập.
        </h2>
        <p className="mt-5 text-[16px] leading-[1.6] text-[#5f6368]">
          Không hợp đồng, không lời chào mời — mua pass, chọn gym gần nhất, quét QR.
        </p>
      </Reveal>

      <div className="relative mt-16">
        {/* dashed connector */}
        <div aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-6 hidden border-t-2 border-dashed border-black/10 md:block" />

        <div className="grid gap-12 md:grid-cols-3 md:gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col">
                <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-volt font-display text-[15px] font-black ring-4 ring-white">
                  0{i + 1}
                </span>

                <div className="group mt-6 flex h-full flex-col rounded-[28px] bg-white p-6 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.22)]">
                  <div className="relative h-[168px] overflow-hidden rounded-2xl bg-[#f4f5f7] ring-1 ring-black/[0.06]">
                    <s.Visual />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h3 className="font-display mt-6 text-[21px] font-black tracking-[-0.01em]">{s.t}</h3>
                    <p className="mt-2.5 text-[15px] leading-[1.65] text-[#5f6368]">{s.d}</p>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between border-t border-black/[0.07] pt-4">
                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-black/55">
                          <s.Icon size={13} strokeWidth={2.5} className="text-black/70" />
                          {s.meta}
                        </span>
                        <ArrowRight size={16} className="text-black/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.3} className="mt-10 text-center">
        <p className="text-[13px] font-semibold text-black/45">
          Trung bình từ tải app tới rep đầu tiên:{' '}
          <span className="font-bold text-black underline decoration-volt decoration-[3px] underline-offset-4">10 phút</span>
        </p>
      </Reveal>
    </section>
  );
}