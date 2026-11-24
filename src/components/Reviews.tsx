import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { avaliacoes, mapsLink } from '../data/empresa'
import SectionTitle from './SectionTitle'
import SectionLabel from './SectionLabel'
import GoogleRating from './GoogleRating'
import Stars from './Stars'
import ButtonSecondary from './ui/ButtonSecondary'

/** Avaliações reais do Google (texto preservado na íntegra), em colunas desalinhadas de propósito. */
export default function Reviews({ label }: { label?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-review]', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-reviews-grid]', start: 'top 80%', once: true },
      })
    },
    { scope: ref },
  )
  const [destaque, ...resto] = avaliacoes
  return (
    <section ref={ref} id="depoimentos" aria-labelledby="avaliacoes-titulo" className="scroll-mt-24 py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n={label}>Depoimentos de pacientes</SectionLabel>
            <SectionTitle id="avaliacoes-titulo" text="O que os pacientes contam *depois* da consulta." className="mt-6" />
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <GoogleRating />
          </div>
        </div>

        <div data-reviews-grid className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-5">
          <figure data-review className="relative rounded-[22px] bg-navy-deep p-8 text-bone md:col-span-7 md:row-span-2 md:p-12">
            <span aria-hidden className="block font-display text-[5rem] leading-[0.6] text-accent">“</span>
            <blockquote className="mt-6 font-display text-[1.55rem] leading-[1.3] md:text-[2rem]">“{destaque.texto}”</blockquote>
            <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-bone/70">
              <strong className="text-bone">{destaque.nome}</strong>
              <Stars n={destaque.nota} />
              <span>Avaliação no Google</span>
            </figcaption>
          </figure>
          {resto.map((a, i) => (
            <figure
              data-review
              key={a.nome}
              className={`rounded-[22px] border border-line bg-bone p-7 ${['md:col-span-5', 'md:col-span-5', 'md:col-span-4 md:col-start-2', 'md:col-span-5 md:col-start-7'][i] ?? 'md:col-span-5'}`}
            >
              <div className="flex items-center justify-between">
                <Stars n={a.nota} />
                <span className="label-tech text-mist">Google</span>
              </div>
              <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-ink">“{a.texto}”</blockquote>
              <figcaption className="mt-5 text-[0.98rem] font-semibold text-navy">{a.nome}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12">
          <ButtonSecondary href={mapsLink}>Ver todas as avaliações no Google</ButtonSecondary>
        </div>
      </div>
    </section>
  )
}
