import { envelhecimento } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import ButtonPrimary from '../ui/ButtonPrimary'
import { WaIcon } from '../Header'

/** Régua discreta: elemento gráfico técnico que remete a medida. */
function Regua() {
  return (
    <svg aria-hidden viewBox="0 0 120 12" className="h-3 w-24 text-navy/30" preserveAspectRatio="none">
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={i * 10} x2={i * 10} y1={i % 4 === 0 ? 0 : 5} y2={12} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  )
}

/** 06 — Envelhecimento e prevenção de quedas. */
export default function Envelhecimento() {
  return (
    <section id="envelhecimento" aria-labelledby="env-titulo" className="scroll-mt-24 bg-bone py-24 md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionLabel n="06">Envelhecimento e prevenção de quedas</SectionLabel>
          <SectionTitle id="env-titulo" text="Envelhecer com autonomia começa *antes* da perda de função." className="mt-6" />
          <p className="mt-8 max-w-md text-[1.06rem] text-mist">
            Avaliar equilíbrio, marcha, mobilidade e desempenho funcional permite compreender melhor as necessidades de cada pessoa e
            orientar estratégias individualizadas de prevenção e cuidado.
          </p>
          <p className="mt-6 max-w-md border-l-2 border-navy pl-5 text-[1.06rem] text-ink">
            O objetivo é preservar autonomia, funcionalidade e qualidade de vida, para continuar fazendo o que importa no dia a dia.
          </p>
          <div className="mt-10">
            <ButtonPrimary href={waLink('Olá! Gostaria de agendar uma avaliação de equilíbrio e risco de quedas.')} icon={<WaIcon size={18} />}>
              Agende uma avaliação
            </ButtonPrimary>
          </div>
        </div>

        <ol className="md:col-span-6 md:col-start-7">
          {envelhecimento.map((e, i) => (
            <li key={e.nome} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7 last:border-b md:grid-cols-[3rem_1fr_auto] md:items-center md:py-8">
              <span className="label-tech text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-[1.5rem] leading-tight text-navy md:text-[1.8rem]">{e.nome}</h3>
                <p className="mt-1 text-[0.98rem] text-mist">{e.texto}</p>
              </div>
              <span className="hidden md:block">
                <Regua />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
