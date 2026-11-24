import { academico } from '../../data/empresa'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import PhotoSlot from '../PhotoSlot'

const slots = [
  { titulo: 'Aula de pós-graduação', className: 'aspect-[16/9] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[380px]' },
  { titulo: 'Palestra', className: 'aspect-[16/9] md:col-span-5 md:aspect-[16/8]' },
  { titulo: 'Evento científico', className: 'aspect-[16/9] md:col-span-5 md:aspect-[16/8]' },
]

/** 07 — Atuação acadêmica e docente. */
export default function Academico() {
  const temFotos = academico.fotos.length > 0
  return (
    <section id="academico" aria-labelledby="acad-titulo" className="scroll-mt-24 py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionLabel n="07">Atuação acadêmica e docente</SectionLabel>
            <SectionTitle id="acad-titulo" text="Clínica e ciência caminham *juntas*." className="mt-6" />
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-[1.06rem] text-mist">
              Além do consultório, Lázaro atua como professor e coordenador de cursos de pós-graduação, participando da formação de
              fisioterapeutas e da troca de conhecimento em workshops, palestras e eventos científicos.
            </p>
            {!academico.instituicoes && (
              <p className="mt-3 text-sm text-accent-ink">[CONFIRMAR: instituições e cursos em que leciona e coordena]</p>
            )}
            {academico.instituicoes && <p className="mt-3 text-sm text-mist">{academico.instituicoes}</p>}
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-t border-line sm:grid-cols-3 md:mt-20 md:grid-cols-5">
          {academico.atividades.map((a, i) => (
            <li key={a} className="border-b border-line py-6 pr-4 md:border-b-0 md:py-8">
              <span className="label-tech text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 font-display text-[1.3rem] leading-tight text-navy md:text-[1.45rem]">{a}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 text-navy md:mt-14 md:grid-cols-12 md:gap-5">
          {temFotos
            ? academico.fotos.map((f, i) => (
                <figure key={f.src} className={slots[i]?.className ?? 'md:col-span-4'}>
                  <img src={f.src} alt={f.alt} loading="lazy" decoding="async" className="photo-grade h-full w-full rounded-[18px] object-cover" />
                  <figcaption className="mt-2 text-sm text-mist">{f.legenda}</figcaption>
                </figure>
              ))
            : slots.map((s) => <PhotoSlot key={s.titulo} titulo={s.titulo} detalhe="Fotografia real de aulas, palestras ou eventos" className={s.className} />)}
        </div>
      </div>
    </section>
  )
}
