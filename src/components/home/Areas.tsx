import { areas } from '../../data/empresa'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import ButtonSecondary from '../ui/ButtonSecondary'

/** 03 — Áreas de atuação, agrupadas por tema para leitura rápida. */
export default function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-titulo" className="scroll-mt-24 bg-bone py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n="03">Áreas de atuação</SectionLabel>
            <SectionTitle id="areas-titulo" text="Quando o equilíbrio, a marcha ou a *autonomia* ficam comprometidos." className="mt-6" />
          </div>
          <p className="max-w-md text-mist md:col-span-4 md:col-start-9">
            Os nomes técnicos importam menos do que aquilo que você sente. Estas são as principais situações avaliadas e tratadas no
            consultório.
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          {areas.map((g, gi) => (
            <article key={g.titulo} className="grid gap-8 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <header className="md:col-span-4">
                <p className="label-tech text-accent-ink">{String(gi + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-navy md:text-[2.1rem]">{g.titulo}</h3>
                <p className="mt-3 max-w-xs text-[0.98rem] text-mist">{g.intro}</p>
              </header>
              <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 md:col-span-8">
                {g.itens.map((it) => (
                  <li key={it.nome} className="border-l border-navy/20 pl-5">
                    <p className="text-[1.08rem] font-semibold text-ink">{it.nome}</p>
                    <p className="mt-1 text-[0.97rem] text-mist">{it.texto}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[0.95rem] text-mist">
            Cada indicação é definida a partir da avaliação individual. Não há tratamento padrão para todos os casos.
          </p>
          <ButtonSecondary to="/servicos">Conheça os tratamentos</ButtonSecondary>
        </div>
      </div>
    </section>
  )
}
