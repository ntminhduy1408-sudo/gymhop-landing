import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/assets/scan.webp', alt: 'Tìm partner gym gần bạn trên GymHop', bubble: 'Gym nào gần cũng là gym của bạn', pill: 'Workout everywhere' },
  { src: '/assets/gymbro.webp', alt: 'Check-in GymHop bằng QR tại quầy lễ tân', bubble: '1 tap · 2 người · 2 credits', pill: 'Bring a gym bro' },
  { src: '/assets/credit.webp', alt: 'Danh sách partner gym với đánh giá và khoảng cách', bubble: 'Credits không bao giờ hết hạn', pill: 'No expiry pressure' },
  { src: '/assets/location.webp', alt: 'Quét mã QR để trừ 1 credit vào tập ngay', bubble: 'Vào, tập, về — không ai chào sale', pill: 'Gymtimidation-free' },
]

const EASE = [0.16, 1, 0.3, 1] as const

// Lifestyle photo card à la Klarna: frosted chat bubble on top,
// dark pill label at the bottom. Photo + copy sync with the Why
// accordion — new photo slides in vertically, old scales out anchored
// to the travel edge. Direction reverses when moving back up.
export function LifestyleCard({ active }: { active: number }) {
  const [[index, dir], setIndex] = useState([0, 1])
  if (active !== index) setIndex([active, active > index ? 1 : -1])

  // Preload the alternate photo so switches never flash.
  useEffect(() => {
    for (const s of slides) {
      const img = new Image()
      img.src = s.src
    }
  }, [])

  const o = slides[index] ?? slides[0]

  return (
    <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[32px] shadow-[0_32px_80px_-32px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[4/5] w-full">
        <AnimatePresence custom={dir} initial={false}>
          <motion.img
            key={index}
            src={o.src}
            alt={o.alt}
            custom={dir}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ y: 90 * dir, scale: 1.06 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ scale: 0.9, opacity: 0.35 }}
            style={{ transformOrigin: dir === 1 ? '50% 0%' : '50% 100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            draggable={false}
          />
        </AnimatePresence>
      </div>
      {/* <div className="absolute inset-x-4 top-4 rounded-[24px] bg-white/20 p-2.5 backdrop-blur-xl sm:inset-x-5 sm:top-5">
        <div className="flex items-center gap-3 rounded-[18px] bg-white py-2.5 pl-3 pr-4 shadow-lg">
          <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9ff3d] text-[16px] font-black">
            G
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="text-[14px] font-semibold leading-snug"
            >
              {o.bubble}
            </motion.p>
          </AnimatePresence>
        </div>
      </div> */}
      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="rounded-full bg-black/55 px-5 py-2.5 text-[14px] font-bold text-white backdrop-blur-md"
          >
            {o.pill}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
