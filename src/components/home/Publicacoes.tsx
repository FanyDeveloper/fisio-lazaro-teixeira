import { ArrowUpRight } from 'lucide-react'
import { empresa, publicacoes, tiposPublicacao, type Publicacao } from '../../data/empresa'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import PhotoSlot from '../PhotoSlot'
import ButtonPrimary from '../ui/ButtonPrimary'

function Item({ p, placeholder }: { p: Publicacao; placeholder?: boolean }) {
  return (
    <article className="grid grid-cols-[5.5rem_1fr] gap-5 border-t border-line py-8 sm:grid-cols-[7rem_1fr] md:gap-8">
      {p.capa ? (
        <img src={p.capa.src} alt={p.capa.alt} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-[10px] border border-line object-cover" />
      ) : (
        <PhotoSlot titulo="Capa" className="aspect-[3/4] rounded-[10px] !p-2 text-navy [&_span.font-display]:text-sm" />
      )}
      <div>
        <p className="label-tech text-accent-ink">{p.tipo}</p>
        <h3 className={`mt-2 font-display text-[1.35rem] leading-snug md:text-[1.6rem] ${placeholder ? 'text-mist' : 'text-ink'}`}>{p.titulo}</h3>
        <p className="mt-2 text-[0.95rem] text-mist">
          {[p.autores, p.veiculo, p.ano].filter(Boolean).join(' · ')}
        </p>
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-navy underline-offset-4 hover:underline">
            Acessar publicação <ArrowUpRight size={16} strokeWidth={1.6} />
          </a>
        )}
      </div>
    </article>
  )
}

const exemplos: Publicacao[] = [
  { tipo: 'Artigo', titulo: '[CONFIRMAR: título do artigo]', veiculo: '[revista]', ano: '[ano]', autores: '[autores]' },
  { tipo: 'Revisão sistemática', titulo: '[CONFIRMAR: título da revisão sistemática]', veiculo: '[revista]', ano: '[ano]', autores: '[autores]' },
  { tipo: 'Evento científico', titulo: '[CONFIRMAR: participação em evento científico]', veiculo: '[evento]', ano: '[ano]' },
]

/** 08 — Produção científica. Só exibe dados reais; sem dados, mostra a estrutura com espaços reservados. */
export default function Publicacoes() {
  const vazio = publicacoes.length === 0
  const lista = vazio ? exemplos : publicacoes
  const cta = empresa.curriculoAcademico
  return (
    <section id="publicacoes" aria-labelledby="pub-titulo" className="scroll-mt-24 bg-bone py-24 md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionLabel n="08">Produção científica</SectionLabel>
            <SectionTitle id="pub-titulo" text="Conhecimento que também se constrói na *ciência*." className="mt-6" />
            <p className="mt-6 max-w-md text-mist">
              Uma seleção de destaques da trajetória científica: publicações, revisões sistemáticas, participação em eventos e outras
              atividades acadêmicas.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] text-navy">
              {tiposPublicacao.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent-ink" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonPrimary {...(cta ? { href: cta, external: true } : { to: '/sobre' })}>Conheça minha trajetória acadêmica</ButtonPrimary>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          {vazio && (
            <p className="mb-4 rounded-xl border border-dashed border-accent-ink/40 px-4 py-3 text-sm text-accent-ink">
              Espaço preparado para as publicações reais (título, autores, revista, ano, DOI e capa). Nenhum dado foi inventado.
            </p>
          )}
          {lista.map((p, i) => (
            <Item key={i} p={p} placeholder={vazio} />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  )
}
