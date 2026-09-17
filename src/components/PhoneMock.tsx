import { motion } from 'motion/react'
import { ChevronRight, Dumbbell, Home, MapPin, QrCode, Search, Star, User } from 'lucide-react'

const gyms = [
  { name: 'Iron Gym', tag: '#RackSquat', rating: '4.8 (124)', dist: '350m' },
  { name: 'FitLife Gym', tag: '#Hyrox', rating: '4.6 (89)', dist: '600m' },
  { name: 'Power House', tag: '#Strength', rating: '4.7 (156)', dist: '1.2km' },
]

// CSS replica of the bg.webp app UI — no raster, swaps with real BG later.
export function PhoneMock() {
  return (
    <motion.div
      initial={{ y: 32, opacity: 0, rotate: 2 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-[300px] rounded-[44px] border-[10px] border-[#1c1d20] bg-white shadow-[0_32px_80px_-24px_rgb(0_0_0/0.3)] sm:w-[320px]"
    >
      <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-[#1c1d20]" />
      <div className="overflow-hidden rounded-[34px] bg-[#f6f7f9] px-3 pb-3 pt-10 text-left">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3ecff] text-[#016BFE]">
              <User size={16} />
            </span>
            <p className="font-display text-[15px] font-bold">Hoàng Nam</p>
          </div>
          <span className="rounded-full bg-[#dff3e3] px-2.5 py-1 text-[10px] font-bold text-[#15803d]">
            ● 12 CREDITS
          </span>
        </div>

        <div className="mt-3 flex h-11 items-center gap-2 rounded-full border border-black/5 bg-white px-4 text-[12px] text-gray-500 shadow-sm">
          <Search size={15} className="text-[#016BFE]" />
          Tìm phòng gym, khu vực…
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e3ecff] text-[#016BFE]">
            <MapPin size={18} />
          </span>
          <div className="flex-1">
            <p className="text-[12px] font-bold">CLB Cô Anh Ba</p>
            <span className="rounded-full bg-[#e8f7ee] px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
              Giá tốt
            </span>
            <p className="text-[11px] text-gray-500">350m away</p>
          </div>
          <ChevronRight size={16} className="text-[#016BFE]" />
        </div>

        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#016BFE] p-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <QrCode size={22} />
          </span>
          <div className="flex-1">
            <p className="font-display text-[13px] font-bold leading-tight">
              Instant Scan QR
              <br />
              to Check-in
            </p>
            <p className="text-[10px] opacity-80">Tập ngay · Tính điểm liền</p>
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#016BFE]">
            <ChevronRight size={15} />
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-[12px] font-bold">Phòng gym gần bạn</p>
          <p className="text-[11px] font-semibold text-[#016BFE]">Xem tất cả ›</p>
        </div>
        <div className="mt-1.5 space-y-1.5">
          {gyms.map((g) => (
            <div key={g.name} className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131316] text-white">
                <Dumbbell size={16} />
              </span>
              <div className="flex-1">
                <p className="text-[12px] font-bold">{g.name}</p>
                <p className="text-[10px] font-semibold text-[#016BFE]">{g.tag}</p>
                <p className="text-[10px] text-gray-500">
                  <Star size={9} className="mr-0.5 inline fill-amber-400 text-amber-400" />
                  {g.rating} <MapPin size={9} className="ml-1 inline" /> {g.dist}
                </p>
              </div>
              <ChevronRight size={15} className="text-[#016BFE]" />
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-around rounded-2xl bg-white py-2 text-[9px] text-gray-500">
          <span className="flex flex-col items-center gap-0.5 font-bold text-[#016BFE]">
            <Home size={16} /> Trang chủ
          </span>
          <span className="flex flex-col items-center gap-0.5">
            <Dumbbell size={16} /> Phòng gym
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#016BFE] text-white">
            <QrCode size={18} />
          </span>
          <span className="flex flex-col items-center gap-0.5">Lịch tập</span>
          <span className="flex flex-col items-center gap-0.5">Cá nhân</span>
        </div>
      </div>
    </motion.div>
  )
}
