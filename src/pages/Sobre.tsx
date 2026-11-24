import { useSEO } from '../hooks/useSEO'
import { academico, empresa } from '../data/empresa'
import PageHero from '../components/PageHero'
import RevealImage from '../components/RevealImage'
import SectionTitle from '../components/SectionTitle'
import SectionLabel from '../components/SectionLabel'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import GoogleRating from '../components/GoogleRating'
import FinalCTA from '../components/FinalCTA'
import Reviews from '../components/Reviews'
import PhotoSlot from '../components/PhotoSlot'
import ButtonSecondary from '../components/ui/ButtonSecondary'

const valores = [
  {
    nome: 'Escuta',
    texto: 'A avaliação começa pela sua história. Conversa e questionários vêm antes de qualquer equipamento ou exercício.',
  },
  {
    nome: 'Precisão',
    texto: 'Recursos tecnológicos para medir e acompanhar, sempre a serviço do raciocínio clínico, nunca no lugar dele.',
  },
  {
    nome: 'Clareza',
    texto: 'Os resultados são explicados em linguagem simples, para que você entenda o próprio caso e participe das decisões.',
  },
]

export default function Sobre() {
  useSEO({
    title: 'Trajetória | Lázaro Juliano Teixeira, Fisioterapeuta Neurofuncional Vestibular',
    description:
      'Fisioterapeuta neurofuncional vestibular desde 1998, mestre em Medicina Interna e Terapêutica pela UNIFESP e professor de pós-graduação. Consultório no Centro de Balneário Camboriú.',
    path: '/sobre',
  })
  return (
    <main>
      <PageHero
        kicker="Trajetória"
        title="Clínica, ensino e *ciência* desde 1998."
        intro="Lázaro Juliano Teixeira é fisioterapeuta neurofuncional vestibular, com consultório no Centro de Balneário Camboriú e atuação na formação de novos fisioterapeutas."
        aside={<GoogleRating />}
      />

      <section aria-labelledby="dr-titulo" className="pb-24 md:pb-36">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <RevealImage
              src="/images/lazaro-labirinto-1000.webp"
              srcSet="/images/lazaro-labirinto-600.webp 600w, /images/lazaro-labirinto-1000.webp 1000w"
              sizes="(min-width: 768px) 38vw, 92vw"
              width={1000}
              height={1476}
              alt="Lázaro Juliano Teixeira de jaleco com o bordado Fisioterapeuta Neurofuncional, segurando uma lupa e um modelo do labirinto do ouvido interno"
              className="aspect-[3/4] rounded-[22px] bg-sand md:sticky md:top-28"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionTitle id="dr-titulo" text="Lázaro Juliano Teixeira" className="text-ink" />
            <p className="mt-3 text-[1.02rem] font-semibold text-accent-ink">
              {empresa.especialidade} · {empresa.registro}
            </p>
            <div className="mt-10 space-y-6 text-[1.08rem] text-mist">
              <p>
                Fisioterapeuta com atuação clínica desde {empresa.atuacaoDesde}, Lázaro trabalha com o sistema vestibular e com tudo o
                que depende dele: o equilíbrio, a estabilidade do olhar, a marcha e a segurança para se movimentar.
              </p>
              <p>
                No consultório, a avaliação combina exame clínico, testes funcionais e recursos tecnológicos, para entender a origem
                das queixas e acompanhar a evolução de cada paciente com dados.
              </p>
            </div>

            <div id="formacao" className="scroll-mt-28">
              <h2 className="label-tech mt-14 text-mist">Formação</h2>
              <ul className="mt-4 border-t border-line">
                {empresa.formacao.map((f) => (
                  <li key={f.titulo} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                    <span className="text-[1.04rem] font-medium text-ink">{f.titulo}</span>
                    {f.instituicao && <span className="label-tech text-accent-ink">{f.instituicao}</span>}
                  </li>
                ))}
                <li className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-line py-4">
                  <span className="text-[1.04rem] font-medium text-ink">Atuação clínica</span>
                  <span className="label-tech text-accent-ink">desde {empresa.atuacaoDesde}</span>
                </li>
              </ul>

              <h2 className="label-tech mt-12 text-mist">Experiência em</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {empresa.experiencias.map((e) => (
                  <li key={e} className="rounded-full border border-line px-4 py-1.5 text-[0.95rem] text-navy">
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <ScrollReveal
              className="mt-14 border-l-2 border-navy pl-6 font-display text-[1.7rem] leading-snug text-ink md:text-[2.1rem]"
              text={empresa.lema}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="valores-titulo" className="bg-navy-deep py-24 text-bone [--em:var(--color-accent)] md:py-32">
        <div className="container-x">
          <SectionTitle id="valores-titulo" text="Como o atendimento é *conduzido*" className="max-w-2xl text-bone" />
          <dl className="mt-16 grid gap-y-12 md:grid-cols-12">
            {valores.map((v, i) => (
              <div key={v.nome} className={`border-t border-bone/20 pt-6 md:col-span-4 ${i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-32' : ''} md:pr-10`}>
                <dt className="font-display text-[2.1rem] italic text-accent">{v.nome}</dt>
                <dd className="mt-4 text-bone/75">{v.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="ensino-titulo" className="py-24 md:py-32">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel>Ensino e ciência</SectionLabel>
            <SectionTitle id="ensino-titulo" text="Clínica e ciência caminham *juntas*." className="mt-6" />
            <p className="mt-6 max-w-xl text-mist">
              Professor e coordenador de pós-graduação, com atuação em {academico.atividades.slice(2).map((a) => a.toLowerCase()).join(', ')}.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            <ButtonSecondary to="/#academico">Atuação acadêmica</ButtonSecondary>
            <ButtonSecondary to="/#publicacoes">Produção científica</ButtonSecondary>
          </div>
        </div>
      </section>

      <section aria-labelledby="ambiente-titulo" className="bg-bone py-24 md:py-32">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <SectionTitle id="ambiente-titulo" text="O consultório" />
            <p className="mt-6 text-mist">
              Um ambiente reservado no Centro de Balneário Camboriú, com os recursos de avaliação à mão e espaço para os exercícios de
              equilíbrio e movimento. {empresa.endereco.complemento}
            </p>
          </div>
          <PhotoSlot
            titulo="Foto do consultório"
            detalhe="[CONFIRMAR: foto horizontal da sala de atendimento, com luz natural, mostrando os equipamentos de avaliação]"
            className="aspect-[16/10] text-navy md:col-span-7"
          />
        </div>
      </section>

      <Reviews />
      <FinalCTA />
    </main>
  )
}
