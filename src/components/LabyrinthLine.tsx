import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

/**
 * Motivo gráfico do site: uma linha fina que lembra os canais do labirinto.
 * Desenhada conforme a rolagem (stroke-dashoffset é composto pela GPU no SVG).
 */
export default function LabyrinthLine({ className = '', scrub = true }: { className?: string; scrub?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  useGSAP(
    () => {
      const paths = ref.current?.querySelectorAll('path')
      if (!paths) return
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: prefersReducedMotion() ? 0 : len })
      })
      if (prefersReducedMotion()) return
      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: scrub ? 'none' : 'power2.inOut',
        duration: scrub ? undefined : 2.2,
        stagger: 0.15,
        scrollTrigger: scrub
          ? { trigger: ref.current, start: 'top 90%', end: 'bottom 30%', scrub: 1 }
          : { trigger: ref.current, start: 'top 90%', once: true },
      })
    },
    { scope: ref },
  )
  return (
    <svg ref={ref} viewBox="0 0 600 600" fill="none" aria-hidden className={className}>
      <path d="M170 410C90 350 80 220 160 150s240-70 300 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M240 470c110 40 240-20 250-140S410 140 300 150" style={{ stroke: "var(--color-accent-ink)" }} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M300 300c-40 25-40 90 10 115s110-10 110-65-50-80-90-60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
