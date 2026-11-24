import { empresa } from '../../data/empresa'
import RevealImage from '../RevealImage'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import ButtonSecondary from '../ui/ButtonSecondary'

/** 02 — Apresentação profissional: composição editorial com foto real, formação e experiência. */
export default function Apresentacao() {
  const credenciais = [
    { tipo: 'Atuação', texto: empresa.especialidade },
    ...empresa.formacao.map((f) => ({
      tipo: f.titulo.startsWith('Mestre') ? 'Mestrado' : 'Especialização',
      texto: f.instituicao ? `${f.titulo} — ${f.instituicao}` : f.titulo,
    })),
    { tipo: 'Clínica', texto: `Atuação clínica desde ${empresa.atuacaoDesde}` },
  ]
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="scroll-mt-24 py-24 md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-5">
          <RevealImage
            src="/images/lazaro-labirinto-1000.webp"
            srcSet="/images/lazaro-labirinto-600.webp 600w, /images/lazaro-labirinto-1000.webp 1000w"
            sizes="(min-width: 768px) 38vw, 92vw"
            width={1000}
            height={1476}
            alt="Lázaro Juliano Teixeira de jaleco, com o bordado Fisioterapeuta Neurofuncional, observando com uma lupa um modelo ampliado do labirinto do ouvido interno"
            className="aspect-[3/4] rounded-[22px] bg-sand"
          />
          <div className="mt-6 flex items-end justify-between gap-6 border-t border-line pt-5">
            <p className="font-display text-[3.6rem] leading-none text-navy md:text-[4.4rem]">{empresa.atuacaoDesde}</p>
            <p className="max-w-[12rem] pb-1 text-right text-sm leading-snug text-mist">Início da atuação clínica em fisioterapia</p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-6">
          <SectionLabel n="02">Apresentação</SectionLabel>
          <SectionTitle id="sobre-titulo" text="Experiência clínica, conhecimento e *dedicação* à saúde." className="mt-6 text-ink" />
          <p className="mt-8 max-w-lg text-[1.08rem] text-mist">
            Lázaro Juliano Teixeira atua na fisioterapia desde {empresa.atuacaoDesde}. Ao longo dessa trajetória, uniu a prática clínica à
            formação acadêmica, com dedicação ao sistema vestibular, ao equilíbrio e ao movimento.
          </p>

          <dl className="mt-12 border-t border-line">
            {credenciais.map((c, i) => (
              <div key={i} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="label-tech pt-1 text-mist">{c.tipo}</dt>
                <dd className="text-[1.04rem] font-medium text-ink">{c.texto}</dd>
              </div>
            ))}
          </dl>

          <h3 className="label-tech mt-12 text-mist">Experiência em</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {empresa.experiencias.map((e) => (
              <li key={e} className="rounded-full border border-line px-4 py-1.5 text-[0.95rem] text-navy">
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <ButtonSecondary to="/sobre">Trajetória completa</ButtonSecondary>
          </div>
        </div>
      </div>
    </section>
  )
}
