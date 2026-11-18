/**
 * Recriação do SplitText (reactbits.dev) em React + GSAP.
 * Divide o texto em palavras com máscara e revela de baixo para cima.
 * Palavras entre *asteriscos* ficam em itálico de destaque.
 */
import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  trigger?: 'load' | 'scroll'
  id?: string
}

export default function SplitText({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.06, trigger = 'scroll', id }: Props) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(' ')
  const plain = text.replace(/\*/g, '')

  useGSAP(
    () => {
      const els = ref.current?.querySelectorAll<HTMLElement>('[data-word]')
      if (!els?.length) return
      if (prefersReducedMotion()) {
        gsap.from(ref.current, { opacity: 0, duration: 0.6, delay })
        return
      }
      gsap.set(els, { yPercent: 115 })
      gsap.to(els, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger,
        delay,
        scrollTrigger: trigger === 'scroll' ? { trigger: ref.current, start: 'top 88%', once: true } : undefined,
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} aria-label={plain} id={id}>
      {words.map((w, i) => {
        const em = w.startsWith('*') && w.replace(/[.,;:!?]$/, '').endsWith('*')
        const clean = w.replace(/\*/g, '')
        return (
          <span key={i} className="mask-line" aria-hidden="true">
            <span data-word className={`inline-block will-change-transform ${em ? 'italic text-amber-ink' : ''}`}>
              {clean}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}
