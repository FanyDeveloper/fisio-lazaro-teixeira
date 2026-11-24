import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { processo } from '../../data/empresa'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'

const num = (i: number) => String(i + 1).padStart(2, '0')

/** 05 — Processo de atendimento. Desktop: seção fixada que avança com a rolagem. Celular: linha do tempo vertical. */
export default function Processo() {
  const pin = useRef<HTMLElement>(null)
  const [etapa, setEtapa] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-step]')
        gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 12 })
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: `+=${panels.length * 70}%`,
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => setEtapa(Math.min(panels.length - 1, Math.floor(self.progress * panels.length * 0.999))),
          },
        })
        panels.forEach((p, i) => {
          if (i === 0) return
          tl.to(panels[i - 1], { autoAlpha: 0, yPercent: -12, duration: 1 }).to(p, { autoAlpha: 1, yPercent: 0, duration: 1 }, '<0.25').to({}, { duration: 0.6 })
        })
        tl.fromTo('[data-progress]', { scaleY: 1 / panels.length }, { scaleY: 1, ease: 'none', duration: tl.duration() }, 0)
        return () => setEtapa(0)
      })
    },
    { scope: pin },
  )

  return (
    <section ref={pin} id="processo" aria-labelledby="processo-titulo" className="relative scroll-mt-24 overflow-hidden bg-paper md:motion-safe:h-screen">
      <div className="container-x relative grid h-full gap-12 py-24 md:grid-cols-12 md:items-start md:motion-safe:items-center md:py-32 md:motion-safe:py-0">
        <div className="md:sticky md:top-28 md:col-span-5 md:motion-safe:static">
          <SectionLabel n="05">Processo de atendimento</SectionLabel>
          <SectionTitle id="processo-titulo" text="Cada avaliação faz parte de um *processo*." className="mt-6" />
          <p className="mt-6 max-w-md text-mist">
            Os equipamentos fazem parte de um raciocínio clínico completo. Cada etapa alimenta a seguinte, da primeira conversa ao
            acompanhamento.
          </p>
          <div className="mt-10 hidden gap-6 md:motion-safe:flex">
            <div className="relative w-px bg-line">
              <span data-progress className="absolute inset-0 origin-top bg-navy" />
            </div>
            <ol className="space-y-3" aria-label="Etapas do atendimento">
              {processo.map((e, i) => (
                <li
                  key={e.nome}
                  aria-current={etapa === i ? 'step' : undefined}
                  className={`flex items-baseline gap-4 transition-colors duration-500 ${etapa === i ? 'text-navy' : 'text-mist/60'}`}
                >
                  <span className="label-tech">{num(i)}</span>
                  <span className={`text-[1.02rem] ${etapa === i ? 'font-semibold' : ''}`}>{e.nome}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative md:col-span-6 md:col-start-7 md:motion-safe:h-[420px]">
          {/* Linha vertical da sequência no celular */}
          <span aria-hidden className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-line md:hidden" />
          {processo.map((e, i) => (
            <article
              data-step
              key={e.nome}
              className="relative mb-5 pl-14 last:mb-0 md:motion-safe:absolute md:motion-safe:inset-0 md:motion-safe:mb-0 md:flex md:flex-col md:justify-end md:rounded-[22px] md:border md:border-line md:bg-bone md:p-12"
            >
              <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-navy/25 bg-paper font-mono text-[0.8rem] text-navy md:static md:mb-auto md:h-auto md:w-auto md:place-items-start md:border-0 md:bg-transparent md:font-display md:text-[3.5rem] md:motion-safe:text-[6rem] md:leading-none md:text-navy/15">
                {num(i)}
              </span>
              <h3 className="pt-2 font-display text-[1.6rem] leading-tight text-ink md:pt-0 md:text-[2.6rem]">{e.nome}</h3>
              <p className="mt-3 max-w-md text-[1.02rem] text-mist md:mt-5">{e.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
