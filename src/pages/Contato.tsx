import { Clock, MapPin, Phone } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import { empresa, mapsLink } from '../data/empresa'
import { telLink, waLink } from '../lib/whatsapp'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import MapEmbed from '../components/MapEmbed'
import Magnet from '../components/reactbits/Magnet'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import { WaIcon } from '../components/Header'

export default function Contato() {
  useSEO({
    title: 'Contato e Agendamento | Fisioterapia no Centro de Balneário Camboriú',
    description:
      'Agende sua avaliação com o Dr. Lázaro Teixeira. WhatsApp (47) 99118-8680. Rua 300, 31 – Centro, Balneário Camboriú. Segunda a sexta, das 13h30 às 18h.',
    path: '/contato',
  })
  return (
    <main>
      <PageHero
        title="Agende sua *avaliação*"
        intro="O jeito mais rápido é o WhatsApp. Se preferir, preencha o formulário: ele abre a conversa com a mensagem pronta."
      >
        <Magnet>
          <ButtonPrimary href={waLink('Olá! Gostaria de agendar uma avaliação. Qual o próximo horário disponível?')} icon={<WaIcon size={18} />}>
            Chamar no WhatsApp
          </ButtonPrimary>
        </Magnet>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <address className="space-y-10 not-italic md:col-span-4">
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-mist">WhatsApp e telefone</h2>
              <a href={telLink} className="mt-3 flex items-center gap-3 font-display text-[1.9rem] text-pine hover:text-amber-ink">
                <Phone size={22} strokeWidth={1.4} /> {empresa.telefone}
              </a>
            </div>
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-mist">Endereço</h2>
              <a href={mapsLink} target="_blank" rel="noopener" className="mt-3 flex gap-3 text-[1.1rem] text-ink hover:text-pine">
                <MapPin size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-amber-ink" />
                <span>
                  Rua 300, 31 – Centro
                  <br />
                  Balneário Camboriú – SC, 88330-645
                  <br />
                  <span className="text-sm text-mist">{empresa.endereco.complemento}</span>
                </span>
              </a>
            </div>
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-mist">Horários</h2>
              <dl className="mt-3 space-y-2">
                {empresa.horarios.map((h) => (
                  <div key={h.dias} className="flex items-center gap-3 text-[1.05rem]">
                    <Clock size={18} strokeWidth={1.4} className="shrink-0 text-amber-ink" />
                    <dt className="text-mist">{h.dias}:</dt>
                    <dd className="text-ink">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-sand p-6 text-[0.98rem] text-mist">
              <p className="font-semibold text-ink">Como chegar</p>
              <p className="mt-2">[CONFIRMAR: ponto de referência próximo]</p>
              <p className="mt-2">{empresa.estacionamento}</p>
            </div>
          </address>

          <div id="agendar" className="scroll-mt-28 rounded-[26px] border border-line bg-paper p-6 md:col-span-8 md:p-10">
            <h2 className="font-display text-[2rem] md:text-[2.6rem]">Formulário de agendamento</h2>
            <p className="mb-8 mt-2 text-mist">Leva menos de um minuto. Respondemos no horário de atendimento.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-label="Mapa" className="px-3 pb-3">
        <MapEmbed className="h-[420px] md:h-[520px]" />
      </section>
    </main>
  )
}
