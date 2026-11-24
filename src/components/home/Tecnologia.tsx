import { useRef, useState, type KeyboardEvent } from 'react'
import { tecnologias, type Tecnologia as Tec } from '../../data/empresa'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import PhotoSlot from '../PhotoSlot'

const num = (i: number) => String(i + 1).padStart(2, '0')

function Foto({ t, className = '' }: { t: Tec; className?: string }) {
  if (t.foto)
    return (
      <img
        src={t.foto.src}
        alt={t.foto.alt}
        loading="lazy"
        decoding="async"
        className={`photo-grade w-full rounded-[18px] object-cover ${className}`}
      />
    )
  return <PhotoSlot titulo={t.nome} detalhe="Fotografia real do equipamento no consultório" className={`text-bone ${className}`} />
}

function Detalhes({ t }: { t: Tec }) {
  return (
    <dl className="grid gap-6 sm:grid-cols-2">
      <div>
        <dt className="label-tech text-accent">O que avalia</dt>
        <dd className="mt-2 text-[1rem] leading-relaxed text-bone/85">{t.avalia}</dd>
      </div>
      <div>
        <dt className="label-tech text-accent">Por que importa</dt>
        <dd className="mt-2 text-[1rem] leading-relaxed text-bone/85">{t.importancia}</dd>
      </div>
    </dl>
  )
}

/** 04 — Tecnologia e avaliação. Desktop: índice + painel. Celular: lista com todos os detalhes. */
export default function Tecnologia() {
  const [ativo, setAtivo] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const t = tecnologias[ativo]

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (ativo + d + tecnologias.length) % tecnologias.length
    setAtivo(n)
    tabs.current[n]?.focus()
  }

  return (
    <section id="tecnologia" aria-labelledby="tec-titulo" className="relative scroll-mt-24 overflow-hidden bg-navy-deep py-24 text-bone [--em:var(--color-accent)] md:py-36">
      <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 text-bone opacity-60" style={{ maskImage: 'linear-gradient(to bottom, black, transparent 55%)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 55%)' }} />
      <div className="container-x relative">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel n="04" tone="bone">Avaliação e tecnologia</SectionLabel>
            <SectionTitle id="tec-titulo" text="Tecnologia a serviço de uma avaliação mais *precisa*." className="mt-6 text-bone" />
          </div>
          <p className="self-end text-[1.06rem] text-bone/75 md:col-span-4 md:col-start-9">
            A tecnologia amplia as possibilidades de avaliação clínica, permitindo analisar funções, identificar alterações e acompanhar a
            evolução de cada paciente com maior precisão.
          </p>
        </div>

        <blockquote className="mt-16 max-w-4xl border-l border-accent/60 pl-6 md:mt-20 md:pl-10">
          <p className="font-display text-[1.7rem] italic leading-[1.25] text-bone md:text-[2.4rem]">
            Tecnologia não substitui o olhar clínico. Ela amplia a capacidade de avaliar, medir e acompanhar resultados.
          </p>
        </blockquote>

        {/* Desktop: índice + painel */}
        <div className="mt-20 hidden gap-10 md:grid md:grid-cols-12">
          <div role="tablist" aria-label="Recursos de avaliação" aria-orientation="vertical" onKeyDown={onKey} className="md:col-span-5">
            {tecnologias.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`tec-tab-${x.id}`}
                aria-selected={ativo === i}
                aria-controls="tec-painel"
                tabIndex={ativo === i ? 0 : -1}
                onClick={() => setAtivo(i)}
                onMouseEnter={() => setAtivo(i)}
                className={`group grid w-full grid-cols-[3rem_1fr] items-baseline border-t border-bone/15 py-5 text-left transition-colors duration-300 last:border-b ${ativo === i ? 'text-bone' : 'text-bone/50 hover:text-bone/80'}`}
              >
                <span className={`label-tech ${ativo === i ? 'text-accent' : ''}`}>{num(i)}</span>
                <span>
                  <span className="block font-display text-[1.6rem] leading-tight">{x.nome}</span>
                  <span className="mt-1 block text-[0.88rem] opacity-80">{x.subtitulo}</span>
                </span>
              </button>
            ))}
          </div>
          <div id="tec-painel" role="tabpanel" aria-labelledby={`tec-tab-${t.id}`} className="md:col-span-6 md:col-start-7">
            <div key={t.id} className="panel-in md:sticky md:top-28">
              <Foto t={t} className="aspect-[4/3]" />
              <div className="mt-8 flex items-baseline gap-4">
                <span className="label-tech text-accent">{num(ativo)}</span>
                <h3 className="font-display text-[2rem] leading-tight">{t.nome}</h3>
              </div>
              <p className="mt-1 pl-[2.6rem] text-[0.95rem] text-bone/60">{t.subtitulo}</p>
              <div className="mt-8">
                <Detalhes t={t} />
              </div>
            </div>
          </div>
        </div>

        {/* Celular: todos os recursos em sequência */}
        <ol className="mt-14 space-y-12 md:hidden">
          {tecnologias.map((x, i) => (
            <li key={x.id} className="border-t border-bone/15 pt-6">
              <p className="label-tech text-accent">{num(i)}</p>
              <h3 className="mt-2 font-display text-[1.8rem] leading-tight">{x.nome}</h3>
              <p className="text-[0.92rem] text-bone/60">{x.subtitulo}</p>
              {x.foto && <Foto t={x} className="mt-6 aspect-[16/10]" />}
              <div className="mt-6">
                <Detalhes t={x} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
