import { useSEO } from '../hooks/useSEO'
import Hero from '../components/home/Hero'
import Apresentacao from '../components/home/Apresentacao'
import Areas from '../components/home/Areas'
import Tecnologia from '../components/home/Tecnologia'
import Processo from '../components/home/Processo'
import Envelhecimento from '../components/home/Envelhecimento'
import Academico from '../components/home/Academico'
import Publicacoes from '../components/home/Publicacoes'
import Contato from '../components/home/Contato'
import Reviews from '../components/Reviews'
import Agenda from '../components/Agenda'

/**
 * Início — arquitetura em 10 seções (âncoras usadas no menu):
 * 01 #inicio · 02 #sobre · 03 #areas · 04 #tecnologia · 05 #processo · 06 #envelhecimento
 * 07 #academico · 08 #publicacoes · 09 #depoimentos · 10 #contato (+ agenda online #agenda)
 */
export default function Home() {
  useSEO({
    title: 'Fisioterapia Neurofuncional Vestibular em Balneário Camboriú | Lázaro Juliano Teixeira',
    description:
      'Lázaro Juliano Teixeira, fisioterapeuta neurofuncional vestibular desde 1998 e mestre pela UNIFESP. Avaliação de tontura, equilíbrio, marcha e risco de quedas com tecnologia, no Centro de Balneário Camboriú.',
    path: '/',
  })

  return (
    <main>
      <Hero />
      <Apresentacao />
      <Areas />
      <Tecnologia />
      <Processo />
      <Envelhecimento />
      <Academico />
      <Publicacoes />
      <Reviews label="09" />
      <Contato />
      <Agenda />
    </main>
  )
}
