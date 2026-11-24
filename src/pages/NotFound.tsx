import { useSEO } from '../hooks/useSEO'
import { waLink } from '../lib/whatsapp'
import SplitText from '../components/reactbits/SplitText'
import LabyrinthLine from '../components/LabyrinthLine'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ButtonSecondary from '../components/ui/ButtonSecondary'

export default function NotFound() {
  useSEO({ title: 'Página não encontrada | Dr. Lázaro Teixeira Fisioterapia', description: 'Esta página não existe.', path: '/404', noindex: true })
  return (
    <main className="relative flex min-h-[88vh] items-center overflow-hidden pt-28">
      <LabyrinthLine scrub={false} className="pointer-events-none absolute -right-20 top-10 w-[560px] rotate-12 text-navy/25 md:right-10 md:w-[720px]" />
      <div className="container-x relative">
        <p className="font-display text-[7rem] leading-none text-accent md:text-[11rem]">404</p>
        <SplitText as="h1" trigger="load" text="Esta página *perdeu o equilíbrio.*" className="mt-4 max-w-3xl font-display text-[2.6rem] leading-[1] md:text-[4.4rem]" />
        <p className="mt-6 max-w-lg text-[1.1rem] text-mist">O endereço pode ter mudado ou foi digitado errado. Mas o consultório continua no mesmo lugar.</p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <ButtonPrimary to="/">Voltar ao início</ButtonPrimary>
          <ButtonSecondary href={waLink()}>Falar no WhatsApp</ButtonSecondary>
        </div>
      </div>
    </main>
  )
}
