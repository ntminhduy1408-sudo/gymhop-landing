import { motion } from 'motion/react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// shadcn-style pill button with Klarna tactile press + motion micro-interaction
export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'dark' | 'volt'
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, opacity: 0.96 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-semibold leading-none transition-colors disabled:opacity-50',
        variant === 'primary' && 'bg-[#016BFE] text-white',
        variant === 'dark' && 'bg-[#131316] text-white',
        variant === 'volt' && 'bg-[#d9ff3d] text-[#131316]',
        variant === 'outline' && 'border-[1.5px] border-current bg-transparent',
        className,
      )}
      {...(props as object)}
    />
  )
}
