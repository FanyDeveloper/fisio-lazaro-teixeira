import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import { servicos } from '../data/empresa'
import { waServico } from '../lib/whatsapp'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import ScrollStack from '../components/reactbits/ScrollStack'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import Magnet from '../components/reactbits/Magnet'
import Accordion from '../components/ui/Accordion'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ContactForm from '../components/ContactForm'
import GoogleRating from '../components/GoogleRating'
import { WaIcon } from '../components/Header'
import NotFound from './NotFound'

export default function ServicoDetalhe() {
  const { slug } = useParams()
  const s = servicos.find((x) => x.slug === slug)
  useSEO({
    title: s?.seoTitle ?? 'Página não encontrada | Dr. Lázaro Teixeira',
    description: s?.seoDescription ?? '',
    path: s ? `/servicos/${s.slug}` : '/404',
    noindex: !s,
  })
  if (!s) return <NotFound />
  const outros = servicos.filter((x) => x.slug !== s.slug)

  return (
    <main>
      <PageHero
        kicker={
            <nav aria-label="Você está em">
              <Link to="/servicos" className="hover:text-navy">Serviços</Link> <span aria-hidden>/</span> <span aria-current="page">{s.nome}</span>
            </nav>
        }
        title={s.nome}
        intro={s.resumo + ' No Centro de Balneário Camboriú, com o Dr. Lázaro Teixeira.'}
        aside={<GoogleRating compact />}
      >
        <Magnet>
          <ButtonPrimary href={waServico(s.nome)} icon={<WaIcon size={18} />}>
            Falar sobre {s.nome.toLowerCase()}
          </ButtonPrimary>
        </Magnet>
      </PageHero>

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <ScrollReveal as="p" text={s.beneficio} className="font-display text-[2rem] leading-[1.12] text-navy md:text-[2.8rem]" />
          </div>
          <div className="space-y-6 text-[1.08rem] text-mist md:col-span-6 md:col-start-7">
            {s.descricao.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="paraquem" className="bg-bone py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <SectionTitle id="paraquem" text="Para quem é" className="md:col-span-4" />
          <ul className="grid gap-x-10 md:col-span-8 md:grid-cols-2">
            {s.paraQuem.map((p) => (
              <li key={p} className="flex gap-4 border-t border-navy/15 py-6 text-[1.1rem] text-ink">
                <Check className="mt-1 shrink-0 text-accent-ink" size={20} strokeWidth={1.6} /> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="como" className="py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
            <SectionTitle id="como" text="Como funciona" />
            <p className="mt-6 text-mist">Do primeiro contato aos retornos, você sabe o que vai acontecer em cada passo.</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ScrollStack
              items={s.comoFunciona.map((c, i) => ({
                key: c.titulo,
                content: (
                  <article className={`rounded-[24px] p-8 shadow-[0_20px_45px_-30px_rgba(7,31,61,0.5)] md:p-10 ${i % 2 ? 'bg-navy text-bone' : 'border border-line bg-paper'}`}>
                    <h3 className="font-display text-[1.7rem] md:text-[2.2rem]">{c.titulo}</h3>
                    <p className={`mt-4 max-w-lg ${i % 2 ? 'text-bone/75' : 'text-mist'}`}>{c.texto}</p>
                  </article>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="duvidas" className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <SectionTitle id="duvidas" text="Dúvidas comuns" className="md:col-span-4" />
          <div className="md:col-span-8">
            <Accordion items={s.faq} />
            <p className="mt-6 text-mist">
              Outras perguntas? Veja as <Link to="/perguntas-frequentes" className="text-navy underline underline-offset-2">dúvidas frequentes</Link>.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="agendar-servico" className="px-3 pb-3">
        <div className="rounded-[28px] bg-navy-deep [--em:var(--color-accent)] px-6 py-20 text-bone md:px-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionTitle id="agendar-servico" text="Vamos falar sobre o seu caso?" className="text-bone" />
              <p className="mt-6 text-bone/70">Preencha e o WhatsApp abre com a mensagem pronta. Ou chame direto pelo botão verde.</p>
            </div>
            <div className="rounded-[22px] bg-bone p-6 text-ink md:col-span-7 md:p-9">
              <ContactForm servicoInicial={s.nome} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="outros" className="py-24">
        <div className="container-x">
          <h2 id="outros" className="font-display text-3xl">Outros tratamentos</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link to={`/servicos/${o.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-navy">
                  <span className="font-display text-xl">{o.nome}</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
