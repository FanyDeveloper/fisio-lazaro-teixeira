import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { empresa } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'
import SplitText from '../reactbits/SplitText'
import Magnet from '../reactbits/Magnet'
import ButtonPrimary from '../ui/ButtonPrimary'
import ButtonSecondary from '../ui/ButtonSecondary'
import RevealImage from '../RevealImage'
import SectionLabel from '../SectionLabel'
import { WaIcon } from '../Header'

/** 01 — Abertura: lema, posicionamento, quem é e como agendar. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ delay: 0.6 })
          .from('[data-h="sub"]', { y: 20, opacity: 0, duration: 0.7 })
          .from('[data-h="cta"]', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
          .from('[data-h="fact"]', { y: 12, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.4')
      })
    },
    { scope: ref },
  )

  const fatos = [
    { valor: `Desde ${empresa.atuacaoDesde}`, texto: 'Atuação clínica' },
    { valor: 'Mestre', texto: 'Medicina Interna e Terapêutica · UNIFESP' },
    { valor: 'Especialista', texto: 'Fisioterapia Neurofuncional Vestibular' },
    { valor: '4,9', texto: `Média no Google · ${empresa.google.avaliacoes} avaliações` },
  ]

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-nome" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Grade técnica discreta, só no canto da foto */}
      <div
        aria-hidden
        className="tech-grid pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] text-navy md:block"
        style={{ maskImage: 'radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)' }}
      />
      <div className="container-x relative grid gap-12 pb-14 md:grid-cols-12 md:gap-8 md:pb-20">
        <div className="flex flex-col justify-center md:col-span-7 md:pr-4">
          <SectionLabel className="mb-12 md:mb-14">Fisioterapia Neurofuncional Vestibular · Balneário Camboriú</SectionLabel>

          <div className="relative">
            <span aria-hidden className="absolute -left-1 -top-10 font-display text-[6rem] leading-none text-accent md:-left-3 md:-top-14 md:text-[8rem]">
              “
            </span>
            <SplitText
              as="p"
              trigger="load"
              delay={0.1}
              stagger={0.05}
              text="Se for para fazer, faça o *melhor* que puder."
              className="relative font-display text-[2.7rem] leading-[1.02] text-navy sm:text-[3.5rem] lg:text-[4.5rem]"
            />
          </div>

          <p data-h="sub" className="mt-8 max-w-xl text-[1.12rem] leading-relaxed text-mist md:text-[1.22rem]">
            Fisioterapia especializada, baseada em evidências e tecnologia, para avaliar, tratar e acompanhar você com precisão.
          </p>

          <div data-h="sub" className="mt-8 border-l-2 border-navy pl-5">
            <h1 id="hero-nome" className="font-display text-[1.65rem] leading-tight text-ink md:text-[1.9rem]">
              Lázaro Juliano Teixeira
            </h1>
            <p className="mt-1 text-[0.98rem] font-medium text-mist">{empresa.especialidade}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <div data-h="cta">
              <Magnet>
                <ButtonPrimary href={waLink()} icon={<WaIcon size={18} />}>
                  Agende sua avaliação
                </ButtonPrimary>
              </Magnet>
            </div>
            <div data-h="cta">
              <ButtonSecondary to="/#sobre">Conheça minha trajetória</ButtonSecondary>
            </div>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <RevealImage
            priority
            src="/images/lazaro-retrato-1200.webp"
            srcSet="/images/lazaro-retrato-640.webp 640w, /images/lazaro-retrato-1200.webp 1200w"
            sizes="(min-width: 768px) 40vw, 92vw"
            width={1200}
            height={1200}
            alt="Lázaro Juliano Teixeira, fisioterapeuta, sorrindo de braços cruzados, com barba grisalha e jaleco escuro"
            className="aspect-[4/5] rounded-[22px] bg-sand"
            imgClassName="object-[50%_20%]"
          />
          {/* Marcas de enquadramento: referência visual a um campo de medição */}
          <span aria-hidden className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l border-t border-navy/40" />
          <span aria-hidden className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b border-r border-navy/40" />
        </div>
      </div>

      {/* Fatos da trajetória (estáticos, sem animação contínua) */}
      <div className="border-y border-line bg-bone">
        <dl className="container-x grid grid-cols-2 md:grid-cols-4">
          {fatos.map((f, i) => (
            <div
              data-h="fact"
              key={f.texto}
              className={`py-6 pr-4 md:py-8 md:pl-6 ${i > 0 ? 'md:border-l md:border-line' : 'md:pl-0'} ${i % 2 ? 'border-l border-line pl-4 md:pl-6' : ''} ${i > 1 ? 'border-t border-line md:border-t-0' : ''}`}
            >
              <dt className="sr-only">{f.texto}</dt>
              <dd>
                <span className="block font-display text-[1.6rem] leading-none text-navy md:text-[2rem]">{f.valor}</span>
                <span className="mt-2 block text-[0.85rem] leading-snug text-mist">{f.texto}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
