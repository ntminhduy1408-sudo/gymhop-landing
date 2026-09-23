import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useRef, useState, type ComponentType } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  CalendarCheck,
  Check,
  Coins,
  Copy,
  CreditCard,
  Dumbbell,
  Flame,
  Footprints,
  Gift,
  Heart,
  MapPin,
  Meh,
  MessageCircle,
  Moon,
  PartyPopper,
  PenLine,
  ShieldAlert,
  Split,
  Sprout,
  Sun,
  Sunrise,
  Sunset,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  User,
  UserPlus,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { postLead, queuePosition, referralCode, cooldownLeft } from '@/lib/sheets'
import { cn } from '@/lib/utils'

type Icon = ComponentType<{ size?: number | string; className?: string }>
type Opt = { v: string; icon: Icon }
type Q = { key: string; group: string; q: string; opts: Opt[]; other?: boolean; multi?: boolean }

const SEGMENT: Q = {
  key: 'segment',
  group: 'Làm quen',
  q: 'Bạn tập gym được bao lâu rồi?',
  opts: [
    { v: 'Mới tập (< 3 tháng)', icon: Sprout },
    { v: 'Đang tập (3–12 tháng)', icon: Dumbbell },
    { v: 'Tập lâu năm (> 1 năm)', icon: Trophy },
  ],
}

const BARRIER: Q = {
  key: 'barrier',
  multi: true,
  group: 'Người mới',
  q: 'Điều gì khiến bạn ngại bắt đầu nhất?',
  other: true,
  opts: [
    { v: 'Không biết tập gì', icon: Dumbbell },
    { v: 'Ngại phòng đông', icon: Users },
    { v: 'Sợ bị chèo kéo mua gói', icon: ShieldAlert },
    { v: 'Không có bạn dẫn đi cùng', icon: UserPlus },
  ],
}

const FREQ: Q = {
  key: 'frequency',
  group: 'Về bạn',
  q: 'Bạn đi tập thường xuyên cỡ nào?',
  opts: [
    { v: '1–2 buổi/tuần', icon: CalendarCheck },
    { v: '3–4 buổi/tuần', icon: Flame },
    { v: '5+ buổi/tuần', icon: Trophy },
  ],
}

const WITH_WHOM: Q = {
  key: 'workout_with',
  group: 'Tập cùng bạn',
  q: 'Bạn thường đi tập với ai?',
  opts: [
    { v: 'Một mình', icon: User },
    { v: 'Với 1 bạn', icon: Users },
    { v: 'Nhóm bạn', icon: PartyPopper },
  ],
}

const INVITE: Q = {
  key: 'invite_interest',
  group: 'Tập cùng bạn',
  q: 'Muốn rủ bạn tập cùng không?',
  opts: [
    { v: 'Chắc chắn, càng đông càng vui', icon: PartyPopper },
    { v: 'Tùy hôm', icon: CalendarCheck },
    { v: 'Thích tập một mình', icon: User },
  ],
}

const WHO_PAYS: Q = {
  key: 'who_pays',
  group: 'Tập cùng bạn',
  q: 'Khi đi cùng nhau, tiền tính sao?',
  other: true,
  opts: [
    { v: 'Mạnh ai nấy trả', icon: Wallet },
    { v: 'Mình hay bao bạn', icon: Gift },
    { v: 'Share đều với nhau', icon: Split },
    { v: 'Đứa nào có gói tháng thì quẹt ké', icon: CreditCard },
  ],
}

const FRIEND_FREQ: Q = {
  key: 'friend_freq',
  group: 'Tập cùng bạn',
  q: 'Bao lâu bạn tập chung với bạn bè 1 lần?',
  opts: [
    { v: 'Hàng tuần', icon: CalendarCheck },
    { v: 'Vài lần mỗi tháng', icon: Calendar },
    { v: 'Hiếm khi', icon: User },
    { v: 'Chưa từng, nhưng muốn thử', icon: Sprout },
  ],
}

const GROUP_BOOK: Q = {
  key: 'group_book',
  group: 'Tập cùng bạn',
  q: 'Nếu có app giúp bạn tập mọi nơi cùng bạn bè / đồng nghiệp, bạn có muốn trải nghiệm?',
  opts: [
    { v: 'Chắc chắn rồi', icon: Heart },
    { v: 'Nghe được', icon: ThumbsUp },
    { v: 'Chưa chắc', icon: Meh },
    { v: 'Không cần', icon: ThumbsDown },
  ],
}

const TIME_SLOT: Q = {
  key: 'time_slot',
  multi: true,
  group: 'Về bạn',
  q: 'Bạn hay tập khung giờ nào?',
  opts: [
    { v: 'Sáng sớm (< 7h)', icon: Sunrise },
    { v: 'Trưa', icon: Sun },
    { v: 'Chiều tối (17–20h)', icon: Sunset },
    { v: 'Khuya (> 20h)', icon: Moon },
  ],
}

const DISCOVERY: Q = {
  key: 'discovery',
  multi: true,
  group: 'Về bạn',
  q: 'Bạn tìm phòng tập mới bằng cách nào?',
  other: true,
  opts: [
    { v: 'Bạn bè giới thiệu', icon: Users },
    { v: 'Google Maps', icon: MapPin },
    { v: 'Facebook / TikTok', icon: MessageCircle },
    { v: 'Đi ngang thấy thì vào', icon: Footprints },
  ],
}

const PAIN: Q = {
  key: 'pain_point',
  multi: true,
  group: 'Về bạn',
  q: 'Điều gì khiến bạn bực nhất ở phòng hiện tại?',
  other: true,
  opts: [
    { v: 'Hợp đồng năm đắt đỏ', icon: CreditCard },
    { v: 'PT chèo kéo', icon: ShieldAlert },
    { v: 'Phòng quá đông', icon: Users },
    { v: 'Thiết bị cũ / thiếu', icon: Dumbbell },
  ],
}

const PAY_NOW: Q = {
  key: 'pay_now',
  group: 'Về GymHop',
  q: 'Hiện tại bạn trả tiền tập kiểu nào?',
  opts: [
    { v: 'Gói tháng / năm', icon: CreditCard },
    { v: 'Mua vé lẻ từng buổi', icon: Coins },
    { v: 'Đi ké / tập nhờ', icon: Users },
  ],
}

const BUNDLE: Q = {
  key: 'bundle_appeal',
  group: 'Về GymHop',
  q: 'Bundle 10 buổi, dùng dần trong 3 tháng ở mọi phòng, bạn thấy sao?',
  opts: [
    { v: 'Rất thích', icon: Heart },
    { v: 'Nghe được', icon: ThumbsUp },
    { v: 'Chưa chắc', icon: Meh },
    { v: 'Không hợp', icon: ThumbsDown },
  ],
}

const LIKERT: Opt[] = [
  { v: 'Rất thích', icon: Heart },
  { v: 'Nghe được', icon: ThumbsUp },
  { v: 'Chưa chắc', icon: Meh },
  { v: 'Không hợp', icon: ThumbsDown },
]

const MULTI_GYM: Q = {
  key: 'multi_gym_appeal',
  group: 'Về GymHop',
  q: 'Nếu 1 tài khoản tập được ở phòng quen + bất kỳ phòng nào khác cùng bạn bè, bạn thấy sao?',
  opts: LIKERT,
}

const QR_EASE: Q = {
  key: 'qr_ease',
  group: 'Về GymHop',
  q: 'Lần đầu tới phòng mới, chỉ cần quét QR là vào tập ngay (không cần đăng ký thẻ), bạn thấy sao?',
  opts: LIKERT,
}

const PRICE: Q = {
  key: 'price_band',
  group: 'Về bạn',
  q: 'Giá 1 buổi tập bao nhiêu là ổn?',
  opts: [
    { v: '20–25k', icon: Coins },
    { v: '25–35k', icon: Coins },
    { v: '35–45k', icon: Coins },
  ],
}

const EASE = [0.16, 1, 0.3, 1] as const

export function WaitlistModal({ open, onOpen }: { open: boolean; onOpen: (v: boolean) => void }) {
  const [stage, setStage] = useState<'intro' | 'survey' | 'contact' | 'done'>('intro')
  const [qi, setQi] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [otherOpen, setOtherOpen] = useState(false)
  const [otherText, setOtherText] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [district, setDistrict] = useState('')
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState(false)
  const [website, setWebsite] = useState('') // honeypot — humans never fill this
  const openedAt = useRef(0)
  if (open && !openedAt.current) openedAt.current = Date.now()
  if (!open && openedAt.current) openedAt.current = 0

  const isNew = answers.segment === 'Mới tập (< 3 tháng)'
  const steps = useMemo<Q[]>(
    () => [SEGMENT, isNew ? BARRIER : FREQ, WITH_WHOM, FRIEND_FREQ, INVITE, WHO_PAYS, GROUP_BOOK, TIME_SLOT, DISCOVERY, PAIN, PAY_NOW, PRICE, BUNDLE, MULTI_GYM, QR_EASE],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers.segment],
  )
  const total = steps.length + 2 // intro + contact steps
  const progress = stage === 'intro' ? 0 : stage === 'survey' ? (qi + 1) / total : stage === 'contact' ? (steps.length + 1) / total : 1

  const referredBy = useMemo(() => new URLSearchParams(location.search).get('ref') ?? '', [])
  const idKey = useMemo(() => contact.trim() || name.trim() || 'guest', [contact, name, stage])
  const code = useMemo(() => referralCode(`${name.trim()}|${idKey}`), [name, idKey])
  const queue = useMemo(() => queuePosition(`${name.trim()}|${idKey}`), [name, idKey, stage])
  const link = useMemo(() => `${location.origin}${location.pathname}?ref=${code}`, [code])

  function goQi(n: number) {
    setQi(n)
    setOtherOpen(false)
    setOtherText('')
  }

  function isSelected(q: Q, v: string) {
    if (!q.multi) return answers[q.key] === v
    return (answers[q.key] ?? '').split('; ').includes(v)
  }

  function toggle(opt: string) {
    const key = steps[qi].key
    const cur = answers[key] ? answers[key].split('; ') : []
    const next = cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt]
    setAnswers({ ...answers, [key]: next.join('; ') })
  }

  function advance() {
    if (qi < steps.length - 1) {
      setTimeout(() => goQi(qi + 1), 120)
    } else {
      setTimeout(() => setStage('contact'), 120)
    }
  }

  function answer(opt: string) {
    const key = steps[qi].key
    const next = { ...answers, [key]: opt }
    setAnswers(next)
    setOtherOpen(false)
    setOtherText('')
    if (key === 'segment') {
      // Recompute branch, stay on the same position (next question).
      setTimeout(() => setQi(1), 180)
    } else if (qi < steps.length - 1) {
      setTimeout(() => setQi(qi + 1), 180)
    } else {
      setTimeout(() => setStage('contact'), 180)
    }
  }

  function answerOther() {
    const t = otherText.trim()
    if (!t) return
    if (step.multi) {
      const key = step.key
      const cur = answers[key] ? answers[key].split('; ') : []
      setAnswers({ ...answers, [key]: [...cur, `Khác: ${t}`].join('; ') })
      setOtherText('')
      setOtherOpen(false)
    } else {
      answer(`Khác: ${t}`)
    }
  }

  async function submitContact() {
    if (!name.trim()) return setErr('Cho mình xin tên để giữ slot nhé.')
    if (website) {
      // Bot trap: pretend success, post nothing.
      setStage('done')
      return
    }
    if (Date.now() - openedAt.current < 4000) return setErr('Bạn làm nhanh quá đó — chờ 1 xíu rồi bấm lại nhé.')
    const wait = cooldownLeft()
    if (wait > 0) return setErr(`Bạn vừa gửi rồi — thử lại sau ${wait}s nhé.`)
    setErr('')
    await postLead({
      ...answers,
      name: name.trim(),
      contact: contact.trim() || undefined,
      district: district.trim() || undefined,
      referral_code: code,
      referred_by: referredBy || undefined,
      created_at: new Date().toISOString(),
    })
    setStage('done')
  }

  const step = steps[Math.min(qi, steps.length - 1)]

  return (
    <Dialog.Root open={open} onOpenChange={onOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100vw-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-8"
              >
                <div className={`flex items-center justify-between`}>
                  {stage !== 'intro' ? (<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                    <motion.div
                      className="h-full rounded-full bg-[#d9ff3d] ring-1 ring-inset ring-black/15"
                      animate={{ width: `${Math.round(progress * 100)}%` }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  </div>) : <div className="font-display text-[26px] font-extrabold leading-[1.12]">GymHop</div>}
                  <Dialog.Close className="-mr-1 -mt-1 ml-3 rounded-full p-1.5 hover:bg-black/5" aria-label="Đóng">
                    <X size={18} />
                  </Dialog.Close>
                </div>

                <AnimatePresence mode="wait">
                  {stage === 'intro' && (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: EASE }}
                      className="py-3"
                    >
                      <Dialog.Title className="font-display  text-[30px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#131316] sm:text-[24px]">
                        Nhận ngay <span className="bg-[#d9ff3d]">2 lượt tập</span> miễn phí khi thực hiện khảo sát
                      </Dialog.Title>

                      <div
                        className="relative mt-6 overflow-hidden rounded-2xl bg-[#18191a] p-5 text-white"
                        role="img"
                        aria-label="Một credit tương ứng một buổi tập tại phòng gym đối tác"
                      >
                        <div className="flex items-start justify-between">
                          <img
                            src="/assets/logo.svg"
                            
                            alt="GymHop"
                            className="h-10 w-10"
                          />
                          <span className="rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/90">
                            GYM CREDIT
                          </span>
                        </div>

                        <div className="mt-9 flex items-end justify-between border-b border-white/25 pb-4">
                          <div className="font-display text-[56px] font-black leading-none tracking-[-0.04em] text-[#d9ff3d]">
                            02
                          </div>
                          <div className="pb-1 text-right text-sm font-medium leading-5">
                            1 credit = 1 buổi tập
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-white/75">Dùng tại các phòng gym đối tác gần bạn</p>
                      </div>

                      <Button
                        variant="volt"
                        className="mt-7 w-full justify-center"
                        onClick={() => setStage('survey')}
                      >
                        Bắt đầu khảo sát
                        <ArrowRight size={16} aria-hidden="true" className="ml-2" />
                      </Button>
                    </motion.div>
                  )}
                  {stage === 'survey' && (
                    <motion.div
                      key={`q-${qi}-${step.key}`}
                      initial={{ x: 32, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -32, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <div className="mt-4 flex items-center gap-2">
                        {qi > 0 && (
                          <button onClick={() => goQi(qi - 1)} className="rounded-full p-1.5 hover:bg-black/5" aria-label="Quay lại">
                            <ArrowLeft size={16} />
                          </button>
                        )}
                        <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-black/45">
                          {step.group} · {qi + 1}/{steps.length}
                        </p>
                      </div>
                      <Dialog.Title className="font-display mt-2 text-[24px] font-bold leading-[1.15]">
                        {step.q}
                      </Dialog.Title>
                      {step.multi && (
                        <p className="mt-1.5 text-[13px] font-medium text-black/50">
                          Chọn tất cả phù hợp với bạn, rồi bấm Tiếp tục.
                        </p>
                      )}
                      <div className="mt-4 grid gap-2">
                        {step.opts.map((o) => {
                          const selected = isSelected(step, o.v)
                          const Ico = o.icon
                          return (
                            <motion.button
                              key={o.v}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => (step.multi ? toggle(o.v) : answer(o.v))}
                              className={cn(
                                'flex items-center gap-3 rounded-2xl border-2 px-3.5 py-3 text-left text-[15px] font-semibold transition-colors',
                                selected
                                  ? 'border-[#131316] bg-[#d9ff3d]'
                                  : 'border-black/10 bg-white hover:border-black/40 hover:bg-[#f7f6f3]',
                              )}
                            >
                              <span
                                className={cn(
                                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                                  selected ? 'bg-[#131316] text-[#d9ff3d]' : 'bg-black/5 text-black/60',
                                )}
                              >
                                <Ico size={18} />
                              </span>
                              <span className="flex-1">{o.v}</span>
                              {selected && <Check size={16} strokeWidth={3} />}
                            </motion.button>
                          )
                        })}
                        {step.other && (
                          <>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setOtherOpen((v) => !v)}
                              className={cn(
                                'flex items-center gap-3 rounded-2xl border-2 border-dashed px-3.5 py-3 text-left text-[15px] font-semibold transition-colors',
                                otherOpen
                                  ? 'border-[#131316] bg-[#f7f6f3]'
                                  : 'border-black/15 bg-white hover:border-black/40',
                              )}
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/5 text-black/60">
                                <PenLine size={18} />
                              </span>
                              <span className="flex-1">Ý khác, tự nhập…</span>
                            </motion.button>
                            <AnimatePresence initial={false}>
                              {otherOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: EASE }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex gap-2 pt-1">
                                    <input
                                      value={otherText}
                                      onChange={(e) => setOtherText(e.target.value)}
                                      onKeyDown={(e) => e.key === 'Enter' && answerOther()}
                                      placeholder="Nhập câu trả lời của bạn…"
                                      autoFocus
                                      className="h-[52px] flex-1 rounded-2xl border border-black/10 bg-[#f7f6f3] px-4 text-[15px] outline-none focus:border-[#131316] focus:bg-white"
                                    />
                                    <Button variant="volt" className="h-[52px] shrink-0 px-5" onClick={answerOther}>
                                      Xong →
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                        {step.multi && (
                          <Button
                            variant="volt"
                            className="mt-1 w-full"
                            disabled={!answers[step.key]}
                            onClick={advance}
                          >
                            Tiếp tục →
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {stage === 'contact' && (
                    <motion.div
                      key="contact"
                      initial={{ x: 32, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -32, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d9ff3d]">
                        <PartyPopper size={26} />
                      </div>
                      <Dialog.Title className="font-display mt-3 text-[26px] font-extrabold leading-[1.1]">
                        Xong! Nhận 2 credits khi ra mắt.
                      </Dialog.Title>
                      <p className="mt-2 text-[15px] leading-[1.55] text-[#5f6368]">
                        Để lại liên lạc, tụi mình gửi credits lúc app lên sóng. Bỏ trống vẫn giữ slot — không ép.
                      </p>
                      <div className="mt-5 space-y-3">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tên của bạn * (VD: Minh Anh)"
                          className="h-[52px] w-full rounded-2xl border border-black/10 bg-[#f7f6f3] px-4 text-[15px] outline-none focus:border-[#131316] focus:bg-white"
                        />
                        <input
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="SĐT / Zalo / Email (không bắt buộc)"
                          className="h-[52px] w-full rounded-2xl border border-black/10 bg-[#f7f6f3] px-4 text-[15px] outline-none focus:border-[#131316] focus:bg-white"
                        />
                        <input
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          placeholder="Khu vực muốn tập (VD: Bình Thạnh)"
                          className="h-[52px] w-full rounded-2xl border border-black/10 bg-[#f7f6f3] px-4 text-[15px] outline-none focus:border-[#131316] focus:bg-white"
                        />
                        {/* Honeypot: off-screen, bots fill it, humans can't see it */}
                        <input
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="Website"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden
                          className="absolute h-px w-px opacity-0"
                        />
                        {err && <p className="text-[13px] font-medium text-red-600">{err}</p>}
                        <Button variant="volt" className="w-full" onClick={submitContact}>
                          Nhận slot + 2 credits →
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {stage === 'done' && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.35, duration: 0.55 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                        className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d9ff3d] text-black"
                      >
                        <BadgeCheck size={30} />
                      </motion.div>
                      <Dialog.Title className="font-display mt-3 text-[28px] font-extrabold leading-tight">
                        {name.trim() ? `${name.trim()} là` : 'Bạn là'} #{queue}!
                      </Dialog.Title>
                      <p className="mx-auto mt-2 max-w-[340px] text-[15px] text-[#5f6368]">
                        Rủ 1 gym bro — cả hai cùng +1 credit khi ra mắt. Nhớ lưu lại mã giới thiệu nhé!
                      </p>
                      <div className="mt-4 flex items-center gap-2 rounded-full border border-black/10 bg-[#f7f6f3] p-1.5 pl-4">
                        <span className="flex-1 truncate text-left text-[13px] font-medium">{link}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(link)
                            setCopied(true)
                            setTimeout(() => setCopied(false), 1600)
                          }}
                          className="flex h-9 items-center gap-1.5 rounded-full bg-[#131316] px-4 text-[13px] font-semibold text-white"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? 'Đã copy' : 'Copy'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
