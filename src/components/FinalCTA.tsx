import { empresa } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import SectionTitle from './SectionTitle'
import ButtonPrimary from './ui/ButtonPrimary'
import Magnet from './reactbits/Magnet'
import LabyrinthLine from './LabyrinthLine'
import { WaIcon } from './Header'

type Props = { title?: string; text?: string; mensagem?: string }

export default function FinalCTA({
  title = 'A primeira consulta é para *entender*. O resto a gente combina junto.',
  text = `Mande uma mensagem contando o que você está sentindo. O consultório atende de segunda a sexta à tarde, no Centro de Balneário Camboriú.`,
  mensagem,
}: Props) {
  return (
    <section className="px-3 pb-3">
      <div className="grain relative overflow-hidden rounded-[28px] bg-sand px-6 py-20 md:px-16 md:py-28">
        <LabyrinthLine className="pointer-events-none absolute -right-24 -top-16 hidden w-[520px] text-pine/25 md:block" />
        <div className="relative max-w-3xl">
          <SectionTitle text={title} />
          <p className="mt-6 max-w-xl text-[1.08rem] text-mist">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Magnet>
              <ButtonPrimary href={waLink(mensagem)} icon={<WaIcon size={18} />}>
                Agendar pelo WhatsApp
              </ButtonPrimary>
            </Magnet>
            <span className="text-[0.95rem] text-mist">{empresa.telefone} · {empresa.horarioResumo}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
