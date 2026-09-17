// ponytail: GSheet over Supabase — validation data isn't private, sheet is directly readable. Upgrade to Supabase when auth/quotas matter.

export type WaitlistPayload = {
  segment?: string
  barrier?: string
  workout_with?: string
  invite_interest?: string
  who_pays?: string
  frequency?: string
  price_band?: string
  name: string
  contact?: string
  district?: string
  referral_code?: string
  referred_by?: string
  created_at: string
}

const OUTBOX = 'GYMHOP_outbox'
const LAST_SUBMIT = 'GYMHOP_last_submit'
export const SUBMIT_COOLDOWN_MS = 60_000

export function referralCode(phone: string) {
  let h = 0
  for (const c of phone) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h.toString(36).slice(-6).toUpperCase().padStart(6, 'T')
}

// Mock queue position: stable per phone, base 127 + local increment.
export function queuePosition(phone: string) {
  const seen: string[] = JSON.parse(localStorage.getItem('GYMHOP_queue') ?? '[]')
  let idx = seen.indexOf(phone)
  if (idx === -1) {
    seen.push(phone)
    localStorage.setItem('GYMHOP_queue', JSON.stringify(seen))
    idx = seen.length - 1
  }
  let h = 0
  for (const c of phone) h = (h * 33 + c.charCodeAt(0)) >>> 0
  return 127 + (h % 23) + idx
}

// Per-device cooldown: returns seconds left before another submit is allowed.
export function cooldownLeft(): number {
  const last = Number(localStorage.getItem(LAST_SUBMIT) ?? 0)
  const left = Math.ceil((SUBMIT_COOLDOWN_MS - (Date.now() - last)) / 1000)
  return left > 0 ? left : 0
}

export async function postLead(payload: WaitlistPayload) {
  const base = import.meta.env.VITE_SHEETS_URL as string | undefined
  const token = import.meta.env.VITE_SHEETS_TOKEN as string | undefined
  const url = base && token ? `${base}${base.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}` : base
  const queue: WaitlistPayload[] = JSON.parse(localStorage.getItem(OUTBOX) ?? '[]')
  // Dedupe by contact (or name): re-submits update the row instead of cloning it.
  const key = (payload.contact ?? '').trim() || payload.name.trim().toLowerCase()
  const dup = key ? queue.findIndex((r) => ((r.contact ?? '').trim() || r.name.trim().toLowerCase()) === key) : -1
  if (dup >= 0) queue[dup] = payload
  else queue.push(payload)
  localStorage.setItem(OUTBOX, JSON.stringify(queue))
  localStorage.setItem(LAST_SUBMIT, String(Date.now()))
  if (!url) return { ok: true, mocked: true }
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    })
    return { ok: true, mocked: false }
  } catch {
    return { ok: false, mocked: true }
  }
}
