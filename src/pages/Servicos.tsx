import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import { servicos } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import PageHero from '../components/PageHero'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import SectionTitle from '../components/SectionTitle'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import FinalCTA from '../components/FinalCTA'
import { WaIcon } from '../components/Header'

export default function Servicos() {
  useSEO({
    title: 'Serviços de Fisioterapia em Balneário Camboriú | Tontura, AVC e Equilíbrio',
    description:
      'Reabilitação vestibular, fisioterapia neurofuncional, avaliação funcional e prevenção de quedas no Centro de Balneário Camboriú com o Dr. Lázaro Teixeira.',
    path: '/servicos',
  })
  return (
    <main>
      <PageHero
        title="Tratamentos que começam pela *causa*."
        intro="Tontura que volta, equilíbrio que falha, movimento que ficou difícil depois de um problema neurológico. Veja como cada atendimento funciona e para quem ele é."
      />

      <section aria-label="Lista de serviços" className="pb-24 md:pb-32">
        <div className="container-x grid gap-4 md:grid-cols-12 md:gap-5">
          {servicos.map((s, i) => (
            <Link
              key={s.slug}
              to={`/servicos/${s.slug}`}
              className={`block ${i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5 md:mt-20' : i === 2 ? 'md:col-span-5' : 'md:col-span-7 md:-mt-20'}`}
            >
              <SpotlightCard className={`h-full rounded-[26px] p-8 transition-colors md:p-11 ${i % 3 === 0 ? 'bg-pine text-bone' : 'border border-line bg-paper'}`}>
                <div className="flex items-start justify-between gap-6">
                  <h2 className="font-display text-[2rem] leading-tight md:text-[2.6rem]">{s.nome}</h2>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-transform duration-500 group-hover:rotate-45 ${i % 3 === 0 ? 'border-bone/30' : 'border-line'}`}>
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </div>
                <p className={`mt-4 text-[1.1rem] ${i % 3 === 0 ? 'text-amber' : 'text-amber-ink'}`}>{s.beneficio}</p>
                <ul className={`mt-8 space-y-2.5 text-[0.98rem] ${i % 3 === 0 ? 'text-bone/75' : 'text-mist'}`}>
                  {s.paraQuem.slice(0, 3).map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check size={18} strokeWidth={1.6} className="mt-1 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-8 border-t border-line pt-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionTitle text="Não sabe em qual caso você se encaixa?" />
            <p className="mt-6 max-w-xl text-mist">
              Normal. É para isso que existe a avaliação. Conte pelo WhatsApp o que você está sentindo e o Dr. Lázaro orienta o melhor
              caminho.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <ButtonPrimary href={waLink('Olá! Não sei bem qual tratamento preciso e gostaria de agendar uma avaliação.')} icon={<WaIcon size={18} />}>
              Pedir orientação
            </ButtonPrimary>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  )
}
