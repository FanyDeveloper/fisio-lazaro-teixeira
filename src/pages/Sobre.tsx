import { useSEO } from '../hooks/useSEO'
import { empresa } from '../data/empresa'
import PageHero from '../components/PageHero'
import RevealImage from '../components/RevealImage'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import GoogleRating from '../components/GoogleRating'
import FinalCTA from '../components/FinalCTA'
import Reviews from '../components/Reviews'

const valores = [
  {
    nome: 'Escuta',
    texto: 'A consulta começa pela sua história. Questionários e conversa vêm antes de qualquer aparelho ou exercício.',
  },
  {
    nome: 'Clareza',
    texto: 'Você tem direito de entender o próprio diagnóstico. Tudo é explicado em palavras simples, quantas vezes for preciso.',
  },
  {
    nome: 'Atualização',
    texto: 'Técnicas e equipamentos de avaliação atuais, escolhidos para dar precisão e não para impressionar.',
  },
]

export default function Sobre() {
  useSEO({
    title: 'Sobre o Dr. Lázaro Juliano Teixeira | Fisioterapeuta em Balneário Camboriú',
    description:
      'Conheça o Dr. Lázaro Juliano Teixeira, fisioterapeuta neurofuncional com consultório no Centro de Balneário Camboriú. Atendimento humanizado e diagnóstico claro.',
    path: '/sobre',
  })
  return (
    <main>
      <PageHero
        title="Tempo para ouvir, *clareza* para explicar."
        intro="O consultório do Dr. Lázaro Juliano Teixeira fica no Centro de Balneário Camboriú. É um espaço pensado para atender com calma, uma pessoa de cada vez."
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
              alt="Dr. Lázaro Teixeira de jaleco grafite com o bordado Fisioterapeuta Neurofuncional, segurando uma lupa e um modelo do labirinto do ouvido interno"
              className="aspect-[3/4] rounded-[28px] bg-sand md:sticky md:top-28"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionTitle id="dr-titulo" text="Dr. Lázaro Juliano Teixeira" />
            <p className="mt-3 text-[1.05rem] font-semibold text-amber-ink">
              {empresa.especialidade} · {empresa.registro}
            </p>
            <div className="mt-10 space-y-6 text-[1.08rem] text-mist">
              <p>
                O Dr. Lázaro é fisioterapeuta neurofuncional: trabalha com o sistema nervoso e com tudo o que depende dele, como o
                equilíbrio, a coordenação e o movimento. Atende pessoas com tontura e labirintite, quem está se recuperando de um AVC,
                quem convive com Parkinson e quem simplesmente perdeu a confiança para andar.
              </p>
              <p>{empresa.formacao}</p>
              <p>
                Experiência: {empresa.anosDeAtuacao}.
              </p>
            </div>
            <ScrollReveal
              className="mt-14 border-l-2 border-amber pl-6 font-display text-[1.6rem] leading-snug text-ink md:text-[2rem]"
              text="Quem sai daqui precisa saber o que tem e o que fazer. Se isso não acontecer, a consulta não terminou."
            />
            <p className="mt-3 pl-7 text-sm text-mist">[CONFIRMAR: frase com aprovação do Dr. Lázaro ou substituir por uma dele]</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="valores-titulo" className="grain bg-pine py-24 text-bone md:py-32">
        <div className="container-x">
          <SectionTitle id="valores-titulo" text="Como pensamos o atendimento" className="max-w-2xl text-bone" />
          <dl className="mt-16 grid gap-y-12 md:grid-cols-12">
            {valores.map((v, i) => (
              <div key={v.nome} className={`border-t border-bone/20 pt-6 md:col-span-4 ${i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-32' : ''} md:pr-10`}>
                <dt className="font-display text-[2.2rem] italic text-amber">{v.nome}</dt>
                <dd className="mt-4 text-bone/75">{v.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="ambiente-titulo" className="py-24 md:py-36">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <SectionTitle id="ambiente-titulo" text="O consultório" />
            <p className="mt-6 text-mist">
              Um ambiente reservado no Centro de Balneário Camboriú, com os equipamentos de avaliação à mão e espaço para os exercícios
              de equilíbrio e movimento. {empresa.endereco.complemento}
            </p>
          </div>
          {/* Espaço reservado: substituir pela foto real do consultório */}
          <figure className="grain flex aspect-[16/10] flex-col items-center justify-center rounded-[28px] border border-dashed border-pine/30 bg-sand p-8 text-center md:col-span-7">
            <p className="font-display text-xl text-pine">Foto do consultório</p>
            <figcaption className="mt-2 max-w-sm text-sm text-mist">
              [CONFIRMAR: foto horizontal da sala de atendimento, com luz natural, mostrando a maca e os equipamentos de avaliação]
            </figcaption>
          </figure>
        </div>
      </section>

      <Reviews />
      <FinalCTA />
    </main>
  )
}
