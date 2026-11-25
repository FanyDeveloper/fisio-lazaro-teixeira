import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { empresa } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'
import SmartLink from '../SmartLink'

/**
 * 01 — Abertura (Hero).
 * Desktop: 100svh, conteúdo à esquerda (~55%) e a fotografia real à direita, sobre fundo preto/azul-marinho.
 * Celular: composição vertical própria (foto no topo fundindo no escuro, texto abaixo).
 * O logotipo fica no cabeçalho fixo, que ocupa o canto superior esquerdo da Hero.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-h="foto"]', { opacity: 0, scale: 1.04, duration: 1.6, ease: 'power2.out' })
          .from('[data-h="txt"]', { opacity: 0, y: 22, duration: 0.9, stagger: 0.1 }, 0.25)
      })
    },
    { scope: ref },
  )

  const titulo = (id?: string) => (
    <h1 id={id} data-h="txt" className="font-caps font-normal text-white [text-wrap:balance]">
      <span className="sr-only">Lázaro Juliano Teixeira, fisioterapeuta neurofuncional vestibular: </span>
      “Se for para fazer, <br />
      faça o melhor que puder.”
    </h1>
  )
  const subtitulo = (
    <p data-h="txt" className="font-editorial text-white/85">
      Fisioterapia especializada, baseada em evidências e tecnologia, <br className="hidden lg:block" />
      para avaliar, tratar e acompanhar você com precisão.
    </p>
  )
  const assinatura = (
    <div data-h="txt" className="font-editorial text-white">
      <p className="font-semibold">Lázaro Juliano Teixeira</p>
      <p className="text-white/80">{empresa.especialidade}</p>
    </div>
  )
  const botoes = (cls = '') => (
    <div data-h="txt" className={`flex gap-4 font-editorial ${cls}`}>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        className="hero-btn-primary inline-flex min-h-[48px] items-center justify-center rounded-full px-8 text-[clamp(1.05rem,1.2vw,1.25rem)] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Agende sua avaliação
      </a>
      <SmartLink
        to="/#sobre"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/70 px-7 text-[clamp(1.05rem,1.2vw,1.25rem)] font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Minha trajetória
      </SmartLink>
    </div>
  )

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-titulo" className="hero-dark relative isolate overflow-hidden">
      {/* ---------------- Desktop ---------------- */}
      <div className="hero-desk relative hidden h-[100svh] min-h-[640px] lg:block">
        <div aria-hidden className="hero-glow absolute inset-0" />
        <img
          data-h="foto"
          src="/images/hero-lazaro-1920.webp"
          srcSet="/images/hero-lazaro-1280.webp 1280w, /images/hero-lazaro-1920.webp 1920w"
          sizes="100vw"
          width={1920}
          height={1080}
          fetchPriority="high"
          alt="Lázaro Juliano Teixeira sorrindo, de braços cruzados, com camisa e paletó escuros, sobre fundo azul"
          className="hero-photo"
        />
        <div aria-hidden className="hero-scrim absolute inset-0" />

        <div className="relative z-10 flex h-full max-w-[66%] flex-col justify-between px-[var(--hero-pad)] pb-[12svh] pt-[27svh]">
          <div>
            <p data-h="txt" className="font-caps text-[clamp(0.78rem,0.85vw,1rem)] tracking-[0.04em] text-white/80">
              Fisioterapia Neurofuncional Vestibular · Balneário Camboriú
            </p>
            <div className="mt-[clamp(0.6rem,1.2vw,1.2rem)] text-[clamp(2.4rem,4.05vw,5.3rem)] leading-[1.16]">{titulo('hero-titulo')}</div>
            <div className="mt-[clamp(0.8rem,1.4vw,1.6rem)] text-[clamp(1.2rem,1.85vw,2.05rem)] leading-[1.32]">{subtitulo}</div>
          </div>
          <div>
            <div className="text-[clamp(1.3rem,1.9vw,2.05rem)] leading-tight [&_p+p]:mt-1 [&_p+p]:text-[clamp(1rem,1.3vw,1.4rem)]">
              {assinatura}
            </div>
            {botoes('mt-[clamp(1.4rem,3svh,2.4rem)]')}
          </div>
        </div>
      </div>

      {/* ---------------- Celular e tablet ---------------- */}
      <div className="hero-mob relative pt-[84px] lg:hidden">
        <div className="relative aspect-[4/5] max-h-[72svh] min-h-[380px] w-full overflow-hidden">
          <div aria-hidden className="hero-glow absolute inset-0" />
          <img
            data-h="foto"
            src="/images/hero-lazaro-mobile-800.webp"
            width={800}
            height={771}
            alt="Lázaro Juliano Teixeira sorrindo, de braços cruzados, com camisa e paletó escuros, sobre fundo azul"
            className="absolute inset-0 h-full w-full object-cover object-[50%_0%]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--hero-bg)]" />
        </div>
        <div className="relative z-10 -mt-12 px-[var(--hero-pad)] pb-16">
          <p data-h="txt" className="font-caps text-[0.82rem] tracking-[0.04em] text-white/80">
            Fisioterapia Neurofuncional Vestibular<span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            Balneário Camboriú
          </p>
          <div className="mt-3 text-[clamp(1.45rem,6.3vw,2.8rem)] leading-[1.18]">{titulo()}</div>
          <div className="mt-4 max-w-xl text-[1.22rem] leading-[1.4] sm:text-[1.4rem]">{subtitulo}</div>
          <div className="mt-9 border-l border-white/30 pl-4 text-[1.3rem] leading-tight [&_p+p]:mt-1 [&_p+p]:text-[1.05rem]">{assinatura}</div>
          {botoes('mt-8 flex-col sm:flex-row [&>a]:w-full sm:[&>a]:w-auto')}
        </div>
      </div>
    </section>
  )
}
