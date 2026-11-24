import { empresa } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import SectionTitle from './SectionTitle'
import ButtonPrimary from './ui/ButtonPrimary'
import Magnet from './reactbits/Magnet'
import LabyrinthLine from './LabyrinthLine'
import { WaIcon } from './Header'

type Props = { title?: string; text?: string; mensagem?: string }

export default function FinalCTA({
  title = 'Vamos começar pela sua *avaliação*?',
  text = 'Conheça uma abordagem individualizada, fundamentada na experiência clínica, no conhecimento científico e em recursos tecnológicos de avaliação.',
  mensagem,
}: Props) {
  return (
    <section className="px-3 pb-3">
      <div className="relative overflow-hidden rounded-[28px] bg-sand px-6 py-20 md:px-16 md:py-28">
        <LabyrinthLine className="pointer-events-none absolute -right-24 -top-16 hidden w-[520px] text-navy/25 md:block" />
        <div className="relative max-w-3xl">
          <SectionTitle text={title} />
          <p className="mt-6 max-w-xl text-[1.08rem] text-mist">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Magnet>
              <ButtonPrimary href={waLink(mensagem)} icon={<WaIcon size={18} />}>
                Agende sua avaliação
              </ButtonPrimary>
            </Magnet>
            <span className="text-[0.95rem] text-mist">{empresa.telefone} · {empresa.horarioResumo}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
