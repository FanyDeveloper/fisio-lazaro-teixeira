/**
 * Botão principal (referência: botões de preenchimento deslizante do Uiverse).
 * O fundo azul-claro sobe por baixo no hover e a seta atravessa o círculo.
 */
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import SmartLink from '../SmartLink'

type Props = {
  children: ReactNode
  href?: string
  to?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  variant?: 'navy' | 'bone'
  disabled?: boolean
  className?: string
  icon?: ReactNode
  external?: boolean
}

export default function ButtonPrimary({ children, href, to, type = 'button', onClick, variant = 'navy', disabled, className = '', icon, external }: Props) {
  const base =
    variant === 'navy'
      ? 'bg-navy text-bone'
      : 'bg-bone text-navy'
  const cls = `group relative inline-flex items-center gap-4 overflow-hidden rounded-full py-2 pl-6 pr-2 text-[0.98rem] font-semibold transition-colors duration-500 ${base} disabled:opacity-60 ${className}`

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      />
      <span className="relative transition-colors duration-500 group-hover:text-navy-deep">{children}</span>
      <span
        className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full ${variant === 'navy' ? 'bg-bone text-navy' : 'bg-navy text-bone'}`}
      >
        <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-[150%] group-hover:translate-x-[150%]">
          {icon ?? <ArrowUpRight size={18} strokeWidth={1.75} />}
        </span>
        <span className="absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0">
          {icon ?? <ArrowUpRight size={18} strokeWidth={1.75} />}
        </span>
      </span>
    </>
  )

  let el
  if (to) el = <SmartLink to={to} className={cls}>{inner}</SmartLink>
  else if (href)
    el = (
      <a href={href} className={cls} {...(external || href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
        {inner}
      </a>
    )
  else
    el = (
      <button type={type} onClick={onClick} disabled={disabled} className={cls}>
        {inner}
      </button>
    )
  return el
}
