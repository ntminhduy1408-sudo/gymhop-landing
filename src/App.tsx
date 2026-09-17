import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  QrCode,
} from 'lucide-react'
import { WaitlistModal } from '@/components/WaitlistModal'
import { PartnerMap } from '@/components/PartnerMap'
import { LifestyleCard } from '@/components/LifestyleCard'
import { Button } from '@/components/ui/button'
import { HowItWorks } from '@/components/HowItWorks'
import { Reveal } from '@/components/ui/Reveal'
const eyebrow = 'w-fit text-center text-[13px] font-bold uppercase tracking-[0.08em] text-black bg-volt'

const EASE = [0.16, 1, 0.3, 1] as const

// Number-scramble: digits spin, then lock into the real value on scroll into view.
function ScrambleValue({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!inView) return
    const pool = '0123456789'
    const chars = text.split('')
    const start = performance.now()
    const dur = 1600
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setOut(
        chars
          .map((c, i) => {
            if (!/[0-9]/.test(c)) return c
            const lockAt = 0.25 + 0.65 * (i / Math.max(1, chars.length - 1))
            if (p >= lockAt) return c
            return pool[Math.floor(Math.random() * pool.length)]
          })
          .join(''),
      )
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text])
  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const features = [
    { t: 'Tập đâu cũng được', d: 'Nay gần trường, mai gần trọ, mốt tập cùng bạn ở quận khác. Một tài khoản, mọi partner gym.' },
    { t: 'Tập với bạn bè', d: 'Một tap đốt N credits cho N người. Rủ bạn theo mà khỏi trả giá walk-in trên trời.' },
    { t: 'Credit linh hoạt', d: 'Credits nằm yên trong tài khoản. Nghỉ ôn thi hay đi du lịch cũng không mất tiền.' },
    { t: 'Không lo chèo kéo', d: 'Không ai xin CCCD để chào hợp đồng 12 tháng. Vào, tập, về.' },
  ]

  return (

    <div className="min-h-screen bg-[#f7f6f3] text-[#131316]">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[#f7f6f3]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logofill.svg" alt="GymHop" className="h-8 w-8" />
            <span className="font-display text-[20px] font-extrabold">GymHop</span>
          </div>
          <nav className="hidden items-center gap-1 text-[15px] font-medium lg:flex">
            <a href="#top" className="rounded-full px-4 py-2 font-semibold hover:bg-black/5">Khám phá GymHop</a>
            <a href="#why" className="rounded-full px-4 py-2 hover:bg-black/5">Tại sao chọn GymHop</a>
            <a href="#how" className="rounded-full px-4 py-2 hover:bg-black/5">Cách hoạt động</a>
            <a href="#owner" className="rounded-full px-4 py-2 hover:bg-black/5">Cho chủ gym</a>
          </nav>
          <div className="flex items-center gap-2">
            {/* <span className="hidden rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold sm:inline">VI</span> */}
            <Button variant="dark" className="h-11 px-6 text-sm" onClick={() => setOpen(true)}>
              Tham gia waitlist
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — unchanged Klarna card, content left / photo right */}
      <section id="top" className="mx-auto max-w-[1440px] px-3 sm:px-5">
        {/* Mobile hero — Klarna pattern: image card first, text below on plain bg */}
        <div className="md:hidden">
          <div className="overflow-hidden rounded-[32px]">
            <motion.img
              src="/assets/bg.webp"
              alt="App GymHop: tìm partner gym gần bạn và quét QR check-in"
              className="h-[320px] w-full object-cover object-center"
              loading="eager"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { delayChildren: 0.6, staggerChildren: 0.14 } } }}
            className="flex flex-col items-center px-2 pt-8 text-center"
          >
            <motion.h1
              variants={{ hidden: { y: 26, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[32px] font-black leading-[1.35] tracking-[-0.02em]"
            >
              Gym nào bạn thích thì là<br />
              <mark className="rounded-xl bg-volt px-3 py-0.5">gym của bạn.</mark>
            </motion.h1>
            <motion.p
              variants={{ hidden: { y: 26, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-[420px] text-[15px] leading-[1.6] text-[#3f434a]"
            >
              1 credit = 1 buổi tập ở bất kỳ partner gym nào. Tìm gym gần nhà, trường, chỗ làm — quét QR check-in, không hợp đồng năm, không sale PT.
            </motion.p>
            <motion.div
              variants={{ hidden: { y: 26, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <Button variant="volt" onClick={() => setOpen(true)}>
                Tham gia waitlist <ArrowRight size={16} className="ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop hero — overlay card, content left / photo right */}
        <div className="relative hidden overflow-hidden rounded-[32px] bg-white md:block sm:mt-4 mt-8">
          <motion.img
            src="/assets/bg.webp"
            alt="App GymHop: tìm partner gym gần bạn và quét QR check-in"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0" aria-hidden />
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { delayChildren: 0.6, staggerChildren: 0.14 } } }}
            className="relative flex min-h-[600px] flex-col justify-center p-16"
          >
            {[
              <h1 key="h" className="font-display max-w-[560px] text-[56px] font-black leading-[1.05] text-white tracking-[-0.02em]">
                Gym nào bạn thích thì là<br/>
                <mark className="rounded-xl bg-volt px-4 py-1">gym của bạn.</mark>
              </h1>,
              <p key="s" className="mt-8 max-w-[440px] text-[16px] leading-[1.6] text-[#bababa]">
                1 credit = 1 buổi tập ở bất kỳ partner gym nào. Tìm gym gần nhà, trường, chỗ làm — quét QR check-in, không hợp đồng năm, không sale PT.
              </p>,
            ].map((el, i) => (
              <motion.div key={i} variants={{ hidden: { y: 26, opacity: 0 }, show: { y: 0, opacity: 1 } }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                {el}
              </motion.div>
            ))}
            <motion.div
              variants={{ hidden: { y: 26, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Button variant="volt" onClick={() => setOpen(true)}>
                Tham gia waitlist <ArrowRight size={16} className="ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust strip — Klarna: statement left, stats right */}
        <div className="flex flex-col jusitfy-center items-center gap-10 px-2 py-16 sm:px-4 lg:flex-row lg:items-center lg:justify-between">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ show: { transition: { delayChildren: 0.15, staggerChildren: 0.13 } } }}
            className="font-display text-center sm:text-left text-[22px] font-extrabold leading-[1.1] sm:text-[28px]"
          >
            {[
              { t: 'Tập' },
              { t: 'mọi' },
              { t: 'nơi,' },
              { t: 'chuẩn', mark: true },
              { t: 'mọi' },
              { t: 'quận' },
            ].map((w, i, arr) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                <motion.span
                  className={`inline-block ${w.mark ? 'rounded-lg bg-volt px-2' : ''} ${i < arr.length - 1 ? 'mr-[0.26em]' : ''}`}
                  variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
                  transition={{ duration: 0.85, ease: EASE }}
                >
                  {w.t}
                </motion.span>
              </span>
            ))}
          </motion.p>
          <div className="flex justify-center sm:justify-start flex-wrap gap-x-12 gap-y-5">
            {[
              ['8+', 'gyms quanh bạn'],
              ['1 = 1', 'credit = buổi tập'],
              ['10 / 15', 'bundle linh hoạt'],
              ['0', 'hợp đồng, sale PT'],
            ].map(([v, l]) => (
              <div key={l}>
                <ScrambleValue text={v} className="font-display block text-[26px] font-extrabold leading-none sm:text-[32px]" />
                <p className="mt-1.5 text-[14px] text-[#5f6368]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why — Klarna pattern: centered title top, lifestyle card + accordion below */}
      <section id="why" className="mx-auto max-w-[1320px] scroll-mt-24 min-h-screen flex items-center justify-center flex-col">
        <Reveal className="text-center">
          <h2 className="font-display text-[32px] font-black leading-[1.05] tracking-[-0.02em] sm:text-[48px]">
             <mark className="rounded-xl bg-volt px-4 py-1">GymHop</mark> - Đăng ký 1 lần tập ở mọi nơi
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#5f6368]">
            Một tài khoản, mọi partner gym — tìm chỗ tập gần nhất, rủ bạn theo cùng, check-in một chạm mà không nghe một lời chào sale nào.
          </p>
        </Reveal>
        <div className="mt-12 grid items-center lg:grid-cols-2 gap-8">
          <Reveal className="order-2 lg:order-1">
            <LifestyleCard active={active} />
          </Reveal>
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <Reveal delay={0.1}>
              <div className="mt-8 sm:mt-0">
                {features.map((f, i) => {
                  const isActive = i === active
                  return (
                    <div key={f.t} className="">
                      <button type="button" onClick={() => setActive(i)} className="group flex w-full items-baseline gap-3 text-left">
                        {/* <span className={`font-display text-[13px] font-black ${isActive ? 'text-[#016BFE]' : 'text-black/25'}`}>0{i + 1}</span> */}
                        <span className={`font-display text-[20px] font-black tracking-[-0.01em] transition-colors sm:text-[42px] ${isActive ? 'text-[#131316]' : 'text-black/30 group-hover:text-black/60 pb-2'}`}>
                          {f.t}
                        </span>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[440px] pb-8 pt-2 text-[18px] leading-[1.6] text-[#5f6368]">{f.d}</p>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works — centered intro + clean cards (no more indented rows) */}
      <HowItWorks eyebrow={eyebrow} />



      {/* Final CTA — big rounded volt card (Klarna "Get started in minutes"), not full-bleed */}
      <section className="mx-auto pb-24 lg:pb-32">
        <Reveal>
          <div className="relative overflow-hidden bg-volt px-8 py-14 sm:px-14 lg:px-20 lg:py-20">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/40 blur-2xl" aria-hidden />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/30 blur-2xl" aria-hidden />
            <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="">
                <p className="inline-flex items-center rounded-full bg-[#131316] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-volt">
                  Early access · slot giới hạn
                </p>
                <h2 className="font-display mt-6 text-[28px] font-black leading-[1.08] tracking-[-0.02em] sm:text-[38px]">
                  Giữ slot hôm nay. Vô là tập.
                </h2>
                <p className="mt-5 text-[16px] font-medium leading-[1.6] text-black/70">
                  Để lại tên + SĐT, làm survey 30 giây. Bạn và người bạn rủ đều nhận +1 credit khi ra mắt.
                </p>
                <Button variant="dark" className="mt-8 h-14 px-8 text-[15px]" onClick={() => setOpen(true)}>
                  Giữ slot của tôi <ArrowRight size={17} className="ml-1" />
                </Button>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-4 rounded-[28px] bg-[#131316] p-8 text-white">
                <QrCode size={140} strokeWidth={1.25} className="text-volt" />
                <p className="text-[13px] font-semibold text-white/70">App iOS & Android · sắp ra mắt</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Owner — Klarna split: copy left, partner map right */}
      <section id="owner" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className={eyebrow}>Cho chủ gym</p>
            <h2 className="font-display mt-4 text-[28px] font-black leading-[1.08] tracking-[-0.02em] sm:text-[38px]">
              Lấp giờ trống bằng khách trả tiền thật.
            </h2>
            <p className="mt-5 max-w-[460px] text-[16px] leading-[1.6] text-[#3f434a]">
              Zero phí setup, zero rủi ro. Chỉ nhận tiền khi có check-in thật từ cộng đồng GymHop.
            </p>
            <a
              href="mailto:hello@gymhop.vn"
              className="font-display mt-6 inline-flex items-center gap-2 text-[17px] font-extrabold underline decoration-volt decoration-4 underline-offset-8 hover:bg-volt/40"
            >
              Liên hệ hợp tác <ArrowRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <PartnerMap />
          </Reveal>
        </div>
      </section>

      {/* Footer — Klarna dark footer + giant wordmark (brand unified to GymHop) */}
      <footer className="bg-[#131316] text-white">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid gap-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:pt-20">
            <div>
              <div className="flex items-center gap-2.5">
                <img src="/assets/logo.svg" alt="" className="h-8 w-8" />
                <span className="font-display text-[20px] font-extrabold">GymHop</span>
              </div>
              <p className="mt-4 max-w-[300px] text-[14px] leading-[1.6] text-white/55">
                1 credit = 1 buổi tập ở bất kỳ partner gym nào. Không hợp đồng. Made for Vietnam lifters.
              </p>
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/40">Khám phá</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-white/75">
                <li><a href="#how" className="transition-colors hover:text-volt">Cách hoạt động</a></li>
                <li><a href="#why" className="transition-colors hover:text-volt">Tại sao chọn GymHop</a></li>
                <li><a href="#owner" className="transition-colors hover:text-volt">Cho chủ gym</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/40">Liên hệ</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-white/75">
                <li><a href="mailto:hello@gymhop.vn" className="transition-colors hover:text-volt">hello@gymhop.vn</a></li>
                <li><a href="#" className="transition-colors hover:text-volt">Instagram</a></li>
                <li><a href="#" className="transition-colors hover:text-volt">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 overflow-hidden" aria-hidden>
            <p className="font-display select-none whitespace-nowrap text-center text-[17vw] font-black leading-[0.85] tracking-[-0.04em]">
              GYMHOP
            </p>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2025 GymHop · Đang sớm ra mắt tại TP.HCM</span>
            <span>Miễn phí khi ra mắt · Credits không hết hạn</span>
          </div>
        </div>
      </footer>

      <WaitlistModal open={open} onOpen={setOpen} />
    </div>
  )
}