import { Clock, MapPin, Phone } from 'lucide-react'
import { empresa, mapsLink } from '../../data/empresa'
import { telLink, waLink } from '../../lib/whatsapp'
import SectionTitle from '../SectionTitle'
import SectionLabel from '../SectionLabel'
import MapEmbed from '../MapEmbed'
import Magnet from '../reactbits/Magnet'
import ButtonPrimary from '../ui/ButtonPrimary'
import ButtonSecondary from '../ui/ButtonSecondary'
import { WaIcon } from '../Header'

/** 10 — Contato e agendamento. Dados de contato e endereço vêm de empresa.ts (não alterar aqui). */
export default function Contato() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-24 py-24 md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <SectionLabel n="10">Contato e agendamento</SectionLabel>
          <SectionTitle id="contato-titulo" text="Vamos começar pela sua *avaliação*?" className="mt-6" />
          <p className="mt-6 max-w-lg text-[1.08rem] text-mist">
            Conheça uma abordagem individualizada, fundamentada na experiência clínica, no conhecimento científico e em recursos
            tecnológicos de avaliação.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Magnet>
              <ButtonPrimary href={waLink()} icon={<WaIcon size={18} />}>
                Agende sua avaliação
              </ButtonPrimary>
            </Magnet>
            <ButtonSecondary to="/#agenda">Escolher dia e horário</ButtonSecondary>
          </div>

          <ul className="mt-14 space-y-6 border-t border-line pt-10">
            <li className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-accent-ink" size={20} strokeWidth={1.5} />
              <a href={mapsLink} target="_blank" rel="noopener" className="text-[1.05rem] text-ink underline-offset-4 hover:underline">
                {empresa.endereco.completo}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-accent-ink" size={20} strokeWidth={1.5} />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[1.02rem]">
                {empresa.horarios.map((h) => (
                  <div key={h.dias} className="contents">
                    <dt className="text-mist">{h.dias}</dt>
                    <dd className="text-ink">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-accent-ink" size={20} strokeWidth={1.5} />
              <a href={telLink} className="text-[1.05rem] text-ink underline-offset-4 hover:underline">
                {empresa.telefone}
              </a>
            </li>
          </ul>
        </div>
        <MapEmbed className="min-h-[340px] md:col-span-6 md:min-h-[520px]" />
      </div>
    </section>
  )
}
