import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { useSEO } from '../hooks/useSEO'
import { empresa, mapsLink, servicos } from '../data/empresa'
import { telLink, waLink } from '../lib/whatsapp'
import SplitText from '../components/reactbits/SplitText'
import RotatingText from '../components/reactbits/RotatingText'
import LogoLoop from '../components/reactbits/LogoLoop'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import MagicBento from '../components/reactbits/MagicBento'
import Magnet from '../components/reactbits/Magnet'
import CountUp from '../components/reactbits/CountUp'
import Noise from '../components/reactbits/Noise'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ButtonSecondary from '../components/ui/ButtonSecondary'
import SectionTitle from '../components/SectionTitle'
import RevealImage from '../components/RevealImage'
import GoogleRating from '../components/GoogleRating'
import LabyrinthLine from '../components/LabyrinthLine'
import Reviews from '../components/Reviews'
import MapEmbed from '../components/MapEmbed'
import FinalCTA from '../components/FinalCTA'
import Stars from '../components/Stars'
import { WaIcon } from '../components/Header'

const etapas = [
  {
    nome: 'Conversa',
    titulo: 'Primeiro, a sua história.',
    texto:
      'Quando começou, o que piora, o que você já tentou. A consulta começa ouvindo, sem pressa, porque é na conversa que aparecem as pistas mais importantes.',
  },
  {
    nome: 'Avaliação',
    titulo: 'Depois, os testes certos.',
    texto:
      'Questionários, testes de movimento e equilíbrio e equipamentos de avaliação. Cada um escolhido para o seu caso, não um protocolo igual para todo mundo.',
  },
  {
    nome: 'Explicação',
    titulo: 'Você entende o que tem.',
    texto:
      'O diagnóstico é explicado em linguagem simples: o que está acontecendo, por que acontece e o que dá para fazer. Você pode perguntar à vontade.',
  },
  {
    nome: 'Plano',
    titulo: 'E sai com um caminho.',
    texto:
      'Exercícios, orientações para casa e, se for o caso, o plano de sessões. Nos retornos, comparamos com a avaliação inicial para medir a evolução.',
  },
]

export default function Home() {
  useSEO({
    title: 'Fisioterapia Neurofuncional em Balneário Camboriú | Dr. Lázaro Juliano Teixeira',
    description:
      'Fisioterapia para tontura, labirintite, equilíbrio e reabilitação neurológica no Centro de Balneário Camboriú. Diagnóstico explicado com clareza. Nota 4,9 no Google.',
    path: '/',
  })

  const hero = useRef<HTMLElement>(null)
  const pin = useRef<HTMLElement>(null)
  const [etapa, setEtapa] = useState(0)

  // Entrada do hero (título em SplitText; aqui o resto da coreografia, < 1,5s no total)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ delay: 0.55 })
          .from('[data-h="sub"]', { y: 22, opacity: 0, duration: 0.7 })
          .from('[data-h="cta"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
          .from('[data-h="meta"]', { opacity: 0, duration: 0.5 }, '-=0.4')
      })
    },
    { scope: hero },
  )

  // Seção fixada: o atendimento avança com a rolagem (desktop e sem reduced-motion)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-step]')
        gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 14 })
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: `+=${panels.length * 75}%`,
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => setEtapa(Math.min(panels.length - 1, Math.floor(self.progress * panels.length * 0.999))),
          },
        })
        panels.forEach((p, i) => {
          if (i === 0) return
          tl.to(panels[i - 1], { autoAlpha: 0, yPercent: -14, duration: 1 }).to(p, { autoAlpha: 1, yPercent: 0, duration: 1 }, '<0.25').to({}, { duration: 0.6 })
        })
        tl.fromTo('[data-progress]', { scaleY: 0.08 }, { scaleY: 1, ease: 'none', duration: tl.duration() }, 0)
        return () => setEtapa(0)
      })
    },
    { scope: pin },
  )

  return (
    <main>
      {/* HERO */}
      <section ref={hero} className="relative overflow-hidden pt-28 md:pt-36">
        <Noise />
        <LabyrinthLine scrub={false} className="pointer-events-none absolute -right-48 top-16 w-[560px] text-pine/15 md:-right-20 md:w-[720px]" />
        <div className="container-x relative grid gap-12 pb-16 md:grid-cols-12 md:gap-8 md:pb-24">
          <div className="flex flex-col justify-center md:col-span-7 md:pr-6">
            <div data-h="meta" className="mb-8">
              <GoogleRating compact />
            </div>
            <SplitText
              as="h1"
              trigger="load"
              delay={0.1}
              stagger={0.05}
              text="Fisioterapia para tontura e reabilitação neurológica, com um diagnóstico que *você entende.*"
              className="font-display text-[2.65rem] leading-[0.98] text-ink sm:text-[3.4rem] lg:text-[4.6rem]"
            />
            <p data-h="sub" className="mt-8 max-w-xl text-[1.1rem] text-mist md:text-[1.2rem]">
              Consultório do Dr. Lázaro Juliano Teixeira, fisioterapeuta neurofuncional no Centro de Balneário Camboriú. Atendimento
              para <RotatingText words={['tontura', 'labirintite', 'desequilíbrio', 'sequelas de AVC', 'Parkinson']} className="font-semibold text-pine" />.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <div data-h="cta">
                <Magnet>
                  <ButtonPrimary href={waLink()} icon={<WaIcon size={18} />}>
                    Agendar avaliação
                  </ButtonPrimary>
                </Magnet>
              </div>
              <div data-h="cta">
                <ButtonSecondary to="/servicos">Ver os tratamentos</ButtonSecondary>
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
              alt="Dr. Lázaro Juliano Teixeira, fisioterapeuta, sorrindo de braços cruzados, com barba grisalha e jaleco grafite sobre camisa preta"
              className="aspect-[4/5] rounded-t-[999px] rounded-b-[28px] bg-sand"
              imgClassName="object-[50%_20%]"
            />
            <div data-h="meta" className="absolute -bottom-5 left-4 rounded-2xl border border-line bg-paper/95 px-5 py-4 shadow-[0_18px_40px_-24px_rgba(20,39,41,0.5)] backdrop-blur md:-left-10">
              <p className="font-display text-lg leading-tight text-pine">Dr. Lázaro J. Teixeira</p>
              <p className="text-sm text-mist">{empresa.especialidade}</p>
            </div>
          </div>
        </div>

        {/* Faixa contínua */}
        <div className="border-y border-line bg-paper/60 py-5 font-display text-[1.35rem] text-pine md:text-[1.6rem]">
          <LogoLoop items={[...servicos.map((s) => s.nome), 'Centro · Balneário Camboriú']} />
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section aria-labelledby="sobre-titulo" className="py-24 md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 md:col-start-1">
            <RevealImage
              src="/images/lazaro-labirinto-1000.webp"
              srcSet="/images/lazaro-labirinto-600.webp 600w, /images/lazaro-labirinto-1000.webp 1000w"
              sizes="(min-width: 768px) 38vw, 92vw"
              width={1000}
              height={1476}
              alt="Dr. Lázaro Teixeira segurando uma lupa sobre um modelo ampliado do labirinto do ouvido interno, estrutura ligada ao equilíbrio"
              className="aspect-[3/4] rounded-[28px] bg-sand"
            />
            <p className="mt-4 text-sm text-mist">O labirinto, no ouvido interno: uma das peças que mantêm você em equilíbrio.</p>
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <h2 id="sobre-titulo" className="sr-only">Sobre o consultório</h2>
            <ScrollReveal
              as="p"
              className="font-display text-[1.9rem] leading-[1.18] text-ink md:text-[2.6rem]"
              text="Aqui a consulta começa com conversa. O Dr. Lázaro ouve, testa e só depois explica, com calma, o que está acontecendo e o que fazer."
            />
            <p className="mt-8 max-w-lg text-mist">
              O consultório fica no Centro de Balneário Camboriú e atende moradores da cidade, da região e até quem vem de fora do
              país para uma avaliação. A proposta é simples: você não sai daqui sem entender o seu caso.
            </p>
            <div className="mt-8">
              <ButtonSecondary to="/sobre">Conheça o Dr. Lázaro</ButtonSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section aria-labelledby="servicos-titulo" className="grain bg-pine py-24 text-bone md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
            <SectionTitle id="servicos-titulo" text="O que tratamos" className="text-bone" />
            <p className="mt-6 max-w-sm text-bone/70">
              Cada tratamento parte da avaliação. Os nomes técnicos importam menos do que aquilo que você quer voltar a fazer.
            </p>
            <div className="mt-8">
              <ButtonSecondary to="/servicos" tone="bone">Todos os serviços</ButtonSecondary>
            </div>
          </div>
          <ul className="md:col-span-7 md:col-start-6">
            {servicos.map((s) => (
              <li key={s.slug} className="border-t border-bone/15 last:border-b">
                <Link to={`/servicos/${s.slug}`} className="group grid grid-cols-[1fr_auto] items-start gap-6 py-9 md:py-11">
                  <div>
                    <h3 className="font-display text-[1.9rem] leading-tight transition-colors duration-300 group-hover:text-amber md:text-[2.5rem]">{s.nome}</h3>
                    <p className="mt-2 text-bone/65">{s.resumo}</p>
                    <p className="mt-4 max-w-md text-[1.05rem] text-bone md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-700 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-visible:max-h-24 md:group-focus-visible:opacity-100">
                      {s.beneficio}
                    </p>
                  </div>
                  <span className="mt-2 grid h-12 w-12 place-items-center rounded-full border border-bone/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-amber group-hover:bg-amber group-hover:text-pine-deep">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DIFERENCIAIS (bento) */}
      <section aria-labelledby="dif-titulo" className="py-24 md:py-36">
        <div className="container-x">
          <div className="mb-14 max-w-3xl md:mb-20">
            <SectionTitle id="dif-titulo" text="O que os pacientes mais *destacam*" />
            <p className="mt-6 max-w-xl text-mist">Não são promessas nossas. São os pontos que mais aparecem nas avaliações do Google.</p>
          </div>
          <MagicBento
            items={[
              {
                title: 'Atendimento humanizado',
                text: 'Tempo para ouvir, explicar e responder. Pacientes contam que se sentiram acolhidos, seguros e tranquilos.',
                tone: 'pine',
                className: 'md:col-span-4',
                extra: <LabyrinthLine scrub={false} className="h-28 w-28 self-end text-bone/40" />,
              },
              {
                title: 'Nota no Google',
                text: `${empresa.google.avaliacoes} avaliações de pacientes.`,
                tone: 'sand',
                className: 'md:col-span-2',
                extra: (
                  <div>
                    <p className="font-display text-[4.2rem] leading-none text-pine">
                      <CountUp to={empresa.google.nota} decimals={1} />
                    </p>
                    <Stars className="mt-3" />
                  </div>
                ),
              },
              { title: 'Diagnóstico claro', text: 'Você entende o que tem, por que tem e o que fazer, sem termos difíceis.', className: 'md:col-span-2' },
              { title: 'Equipamentos modernos', text: 'Recursos de avaliação atualizados para dar precisão ao diagnóstico.', className: 'md:col-span-2' },
              {
                title: 'Orientação desde a primeira consulta',
                text: 'Você já sai da avaliação com exercícios e próximos passos para começar.',
                className: 'md:col-span-2',
              },
            ]}
          />
        </div>
      </section>

      {/* COMO FUNCIONA (seção fixada) */}
      <section ref={pin} aria-labelledby="como-titulo" className="relative overflow-hidden bg-sand md:h-screen">
        <Noise opacity={0.3} />
        <div className="container-x relative grid h-full gap-12 py-24 md:grid-cols-12 md:items-center md:py-0">
          <div className="md:col-span-5">
            <h2 id="como-titulo" className="font-display text-[2.3rem] leading-[1.02] md:text-[3.6rem]">
              Como funciona o atendimento
            </h2>
            <div className="mt-10 hidden gap-6 md:flex">
              <div className="relative w-px bg-line">
                <span data-progress className="absolute inset-0 origin-top bg-pine" />
              </div>
              <ol className="space-y-4" aria-label="Etapas do atendimento">
                {etapas.map((e, i) => (
                  <li key={e.nome} className={`font-display text-2xl transition-all duration-500 ${etapa === i ? 'translate-x-1 italic text-pine' : 'text-mist/60'}`}>
                    {e.nome}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="relative md:col-span-6 md:col-start-7 md:h-[420px]">
            {etapas.map((e) => (
              <article
                data-step
                key={e.nome}
                className="mb-6 rounded-[24px] bg-paper p-8 last:mb-0 md:absolute md:inset-0 md:mb-0 md:flex md:flex-col md:justify-end md:p-12"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-ink md:hidden">{e.nome}</p>
                <h3 className="mt-2 font-display text-[1.9rem] leading-tight md:text-[2.8rem]">{e.titulo}</h3>
                <p className="mt-5 max-w-md text-[1.05rem] text-mist">{e.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* LOCALIZAÇÃO */}
      <section aria-labelledby="local-titulo" className="pb-24 md:pb-36">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionTitle id="local-titulo" text="No Centro de *Balneário Camboriú*" />
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-amber-ink" size={22} strokeWidth={1.5} />
                <div>
                  <a href={mapsLink} target="_blank" rel="noopener" className="text-[1.08rem] text-ink underline-offset-4 hover:underline">
                    {empresa.endereco.completo}
                  </a>
                  <p className="mt-1 text-sm text-mist">Como chegar: [CONFIRMAR: ponto de referência e estacionamento]</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 shrink-0 text-amber-ink" size={22} strokeWidth={1.5} />
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[1.02rem]">
                  {empresa.horarios.map((h) => (
                    <div key={h.dias} className="contents">
                      <dt className="text-mist">{h.dias}</dt>
                      <dd className="text-ink">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-amber-ink" size={22} strokeWidth={1.5} />
                <a href={telLink} className="text-[1.08rem] text-ink underline-offset-4 hover:underline">{empresa.telefone}</a>
              </li>
            </ul>
          </div>
          <MapEmbed className="min-h-[340px] md:col-span-7 md:min-h-[460px]" />
        </div>
      </section>

      <FinalCTA />
    </main>
  )
}
