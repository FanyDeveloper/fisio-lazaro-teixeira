import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import ServicoDetalhe from './pages/ServicoDetalhe'
import Faq from './pages/Faq'
import Contato from './pages/Contato'
import Privacidade from './pages/Privacidade'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="servicos" element={<Servicos />} />
        <Route path="servicos/:slug" element={<ServicoDetalhe />} />
        <Route path="perguntas-frequentes" element={<Faq />} />
        <Route path="contato" element={<Contato />} />
        {/* Agendamento acontece no formulário da página de contato */}
        <Route path="agendamento" element={<Navigate to="/contato#agendar" replace />} />
        <Route path="politica-de-privacidade" element={<Privacidade />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
