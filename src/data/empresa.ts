/**
 * TODOS os dados do consultório ficam aqui.
 * Edite este arquivo para atualizar textos, contatos, horários, serviços e avaliações.
 * Tudo marcado com [CONFIRMAR] precisa ser validado com o cliente antes de publicar.
 */

export const empresa = {
  nome: 'Consultório de Fisioterapia Dr. Lázaro Juliano Teixeira',
  nomeCurto: 'Dr. Lázaro Teixeira',
  profissional: 'Dr. Lázaro Juliano Teixeira',
  especialidade: 'Fisioterapeuta Neurofuncional', // visível no jaleco da foto
  registro: '[CONFIRMAR: número do CREFITO]',
  categoria: 'Fisioterapia',

  // [CONFIRMAR: domínio definitivo — também em index.html, robots.txt e sitemap.xml]
  site: 'https://www.drlazaroteixeira.com.br',

  telefone: '(47) 99118-8680',
  telefoneE164: '+5547991188680',
  whatsapp: '5547991188680',
  email: '[CONFIRMAR: e-mail de contato]',
  instagram: '', // [CONFIRMAR: @ do Instagram — deixe vazio para ocultar]

  endereco: {
    rua: 'Rua 300, 31',
    bairro: 'Centro',
    cidade: 'Balneário Camboriú',
    uf: 'SC',
    cep: '88330-645',
    completo: 'Rua 300, 31 – Centro, Balneário Camboriú – SC, 88330-645',
    complemento: '[CONFIRMAR: sala/andar, se houver]',
  },
  // [CONFIRMAR: coordenadas exatas — copie do Google Maps (clique direito no pino)]
  geo: null as null | { lat: number; lng: number },

  horarios: [
    { dias: 'Segunda a sexta', horas: '13:30 – 18:00' },
    { dias: 'Sábado e domingo', horas: 'Fechado' },
  ],
  horarioResumo: 'Seg. a sex., das 13h30 às 18h',
  // formato schema.org
  horariosSchema: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:30', closes: '18:00' },
  ],

  google: {
    nota: 4.9,
    avaliacoes: 135,
  },

  destaques: [
    'Atendimento humanizado e profissional',
    'Diagnóstico claro',
    'Equipamentos modernos',
    'Resultados desde a primeira consulta',
  ],

  /**
   * Agenda online (seção "Agende um horário" na Início).
   * Gera os horários livres só dentro do expediente, no fuso de Brasília.
   * Sem integração com calendário, o pedido é enviado pelo WhatsApp e o consultório confirma.
   */
  agenda: {
    fuso: 'America/Sao_Paulo',
    diasSemana: [1, 2, 3, 4, 5], // 0 = domingo … 6 = sábado
    inicio: '13:30',
    fim: '18:00',
    intervaloMin: 30, // [CONFIRMAR: duração de cada consulta (30, 45 ou 60 min)]
    antecedenciaMin: 120, // não oferece horários que comecem em menos de 2h
    semanas: 3, // quantas semanas à frente aparecem
    // Feriados nacionais (sem atendimento). [CONFIRMAR: feriados municipais, recesso de fim de ano e férias]
    feriados: [
      '2026-11-20', // Consciência Negra
      '2026-12-25', // Natal
      '2027-01-01', // Confraternização Universal
      '2027-02-08', // Carnaval
      '2027-02-09', // Carnaval
      '2027-03-26', // Sexta-feira Santa
      '2027-04-21', // Tiradentes
      '2027-05-27', // Corpus Christi
      '2027-07-20', // Aniversário de Balneário Camboriú
      '2027-09-07', // Independência
      '2027-10-12', // Nossa Senhora Aparecida
      '2027-11-02', // Finados
      '2027-11-15', // Proclamação da República
      '2027-12-25', // Natal
    ],
  },

  anosDeAtuacao: '[CONFIRMAR: ano de formação ou anos de atuação]',
  formacao: '[CONFIRMAR: graduação, especializações e cursos do Dr. Lázaro]',
  estacionamento: '[CONFIRMAR: há estacionamento próprio ou conveniado perto?]',
  pagamento: '[CONFIRMAR: formas de pagamento aceitas (Pix, cartão, parcelamento)]',
  convenios: '[CONFIRMAR: atende convênios ou só particular com recibo para reembolso?]',
  valorConsulta: '[CONFIRMAR: valor da avaliação ou se prefere informar só pelo WhatsApp]',
  duracaoConsulta: '[CONFIRMAR: duração média da primeira consulta]',
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Consultório de Fisioterapia Dr Lázaro Juliano Teixeira, ' + empresa.endereco.completo,
)}`
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  'Consultório de Fisioterapia Dr Lázaro Juliano Teixeira, ' + empresa.endereco.completo,
)}&output=embed`

/* ------------------------------------------------------------------ */
/* Avaliações reais do Google (coladas pelo cliente). Não inventar.     */
/* ------------------------------------------------------------------ */
export type Avaliacao = { nome: string; nota: number; texto: string }
export const avaliacoes: Avaliacao[] = [
  {
    nome: 'Marcela',
    nota: 5,
    texto:
      'O atendimento do Dr. Lázaro foi impecável e extremamente profissional. Conversas, questionários, diagnósticos… Técnicas muito inovadoras e atualizadas! Equipamentos de última tecnologia… Moro no exterior e a visita valeu muito a pena, recomendo fortemente!',
  },
  {
    nome: 'Camila',
    nota: 5,
    texto:
      'Dr Lazzaro fez eu me sentir acolhida com seu atendimento humanizado, aliado a um diagnóstico preciso por meio da utilização de equipamentos modernos o que garantiu que eu ficasse mais segura e tranquila. Obrigada Dr',
  },
  {
    nome: 'Claiton',
    nota: 5,
    texto:
      'Excelente atendimento. Deixa claro os seus problemas e da sugestões para melhorar suas saúde com bastante clareza',
  },
  { nome: 'Tânia', nota: 5, texto: 'Um atendimento excelente! Fui muito bem atendida. Obrigada' },
  { nome: 'Roseli', nota: 5, texto: 'A experiência foi muito boa. Excelente profissional.' },
]

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* [CONFIRMAR: lista de serviços] — os dados do Google Maps só dizem    */
/* "Fisioterapia". Esta lista foi deduzida das fotos (jaleco           */
/* "Fisioterapeuta Neurofuncional", selo da associação de fisioterapia */
/* neurofuncional e o modelo do labirinto do ouvido interno na mão).   */
/* Valide cada item com o Dr. Lázaro antes de publicar.                */
/* ------------------------------------------------------------------ */
export type Servico = {
  slug: string
  nome: string
  resumo: string
  beneficio: string
  descricao: string[]
  paraQuem: string[]
  comoFunciona: { titulo: string; texto: string }[]
  faq: { p: string; r: string }[]
  seoTitle: string
  seoDescription: string
}

export const servicos: Servico[] = [
  {
    slug: 'reabilitacao-vestibular',
    nome: 'Reabilitação vestibular',
    resumo: 'Tontura, vertigem e sensação de desequilíbrio.',
    beneficio: 'Voltar a virar a cabeça, deitar e caminhar sem medo da tontura.',
    descricao: [
      'O labirinto, no ouvido interno, é uma das peças que mantêm você em pé e com a visão estável. Quando ele perde o ajuste, aparecem a tontura ao deitar ou levantar, a vertigem ao virar a cabeça e aquela insegurança ao andar na rua.',
      'A reabilitação vestibular é um conjunto de manobras e exercícios escolhidos a partir da sua avaliação. O objetivo é que o cérebro e o labirinto voltem a trabalhar juntos, e que você retome a rotina com segurança.',
    ],
    paraQuem: [
      'Quem sente tontura ao deitar, levantar ou virar na cama',
      'Quem tem crises de vertigem ou diagnóstico de labirintite',
      'Quem ficou inseguro para caminhar, dirigir ou subir escadas',
      'Quem já tratou com remédio e a tontura continua voltando',
    ],
    comoFunciona: [
      { titulo: 'Conversa e questionários', texto: 'Entendemos quando a tontura aparece, quanto dura e o que ela já tirou da sua rotina.' },
      { titulo: 'Testes do equilíbrio', texto: 'Avaliação dos movimentos dos olhos, da cabeça e da postura para localizar a origem do problema.' },
      { titulo: 'Manobras e exercícios', texto: 'Quando indicado, as manobras são feitas já no consultório. Você sai com exercícios simples para fazer em casa.' },
      { titulo: 'Reavaliação', texto: 'A cada retorno comparamos com a primeira avaliação e ajustamos o plano.' },
    ],
    faq: [
      { p: 'A tontura melhora já na primeira sessão?', r: 'Em alguns casos, como a vertigem posicional, a manobra certa traz alívio no mesmo dia. Em outros, a melhora é gradual. Você sai da avaliação sabendo o que esperar.' },
      { p: 'Preciso trazer exames?', r: 'Se você tiver exames de audição, de imagem ou relatório do otorrino, traga. Eles ajudam, mas não são obrigatórios para a avaliação.' },
      { p: 'Quantas sessões são necessárias?', r: 'Depende da causa e de como você responde. O número estimado é explicado depois da avaliação. [CONFIRMAR: média de sessões que o Dr. Lázaro costuma indicar]' },
    ],
    seoTitle: 'Reabilitação Vestibular e Tontura em Balneário Camboriú | Dr. Lázaro Teixeira',
    seoDescription: 'Tratamento fisioterapêutico para tontura, vertigem e labirintite no Centro de Balneário Camboriú. Avaliação do equilíbrio e manobras no consultório.',
  },
  {
    slug: 'fisioterapia-neurofuncional',
    nome: 'Fisioterapia neurofuncional',
    resumo: 'Reabilitação após AVC, Parkinson e outras condições neurológicas.',
    beneficio: 'Recuperar movimento e independência nas tarefas do dia a dia.',
    descricao: [
      'Depois de um AVC, com a evolução do Parkinson ou em outras condições neurológicas, tarefas simples como levantar da cadeira, vestir uma roupa ou caminhar até a padaria podem ficar difíceis.',
      'A fisioterapia neurofuncional trabalha força, coordenação, marcha e equilíbrio com um objetivo claro: devolver o máximo de autonomia possível, com metas combinadas entre o paciente, a família e o fisioterapeuta.',
    ],
    paraQuem: [
      'Pessoas em recuperação de AVC (derrame)',
      'Pessoas com doença de Parkinson ou outras doenças neurológicas',
      'Quem perdeu força, coordenação ou segurança para andar',
      'Familiares que querem entender como ajudar em casa',
    ],
    comoFunciona: [
      { titulo: 'Avaliação completa', texto: 'Força, tônus, coordenação, marcha e equilíbrio, sempre com foco no que importa para a sua rotina.' },
      { titulo: 'Metas combinadas', texto: 'Definimos juntos o que é prioridade: andar sem apoio, subir escadas, voltar a dirigir.' },
      { titulo: 'Sessões direcionadas', texto: 'Exercícios e técnicas escolhidos para cada meta, com progressão a cada etapa.' },
      { titulo: 'Orientação para casa', texto: 'Paciente e família recebem orientações claras para continuar o trabalho entre as sessões.' },
    ],
    faq: [
      { p: 'Quanto tempo depois do AVC posso começar?', r: 'Quanto antes, melhor, desde que haja liberação médica. Mas também há ganhos para quem teve o AVC há mais tempo.' },
      { p: 'Um familiar pode acompanhar a sessão?', r: 'Pode e é bem-vindo. Entender os exercícios ajuda muito na continuidade em casa.' },
      { p: 'Vocês fazem atendimento domiciliar?', r: '[CONFIRMAR: o Dr. Lázaro atende em domicílio?]' },
    ],
    seoTitle: 'Fisioterapia Neurofuncional em Balneário Camboriú | AVC e Parkinson',
    seoDescription: 'Fisioterapia neurofuncional no Centro de Balneário Camboriú para reabilitação após AVC, Parkinson e outras condições neurológicas.',
  },
  {
    slug: 'avaliacao-funcional',
    nome: 'Avaliação e diagnóstico funcional',
    resumo: 'Entender a causa antes de começar qualquer tratamento.',
    beneficio: 'Sair da consulta sabendo o que você tem e o que fazer.',
    descricao: [
      'Muita gente chega ao consultório depois de passar por vários tratamentos sem entender o que realmente tem. Por isso a primeira consulta é dedicada a ouvir, testar e explicar.',
      'Usamos conversa, questionários e equipamentos de avaliação para chegar a um diagnóstico fisioterapêutico claro. No final, você recebe a explicação em linguagem simples e um plano com próximos passos.',
    ],
    paraQuem: [
      'Quem quer uma segunda opinião sobre um problema que não melhora',
      'Quem mora fora e precisa de uma avaliação completa em poucas visitas',
      'Quem foi encaminhado pelo médico para avaliação fisioterapêutica',
      'Quem quer entender o próprio corpo antes de começar a tratar',
    ],
    comoFunciona: [
      { titulo: 'Escuta', texto: 'Sua história, seus sintomas e o que você já tentou.' },
      { titulo: 'Questionários e testes', texto: 'Instrumentos padronizados e testes físicos para medir onde estão as limitações.' },
      { titulo: 'Equipamentos', texto: 'Recursos tecnológicos de avaliação para dar precisão ao diagnóstico. [CONFIRMAR: nomes dos equipamentos]' },
      { titulo: 'Explicação e plano', texto: 'Você entende o resultado e sai com recomendações claras, mesmo que não continue o tratamento aqui.' },
    ],
    faq: [
      { p: 'Quanto tempo dura a avaliação?', r: empresa.duracaoConsulta },
      { p: 'Recebo algum relatório?', r: '[CONFIRMAR: o paciente recebe relatório escrito da avaliação?]' },
      { p: 'Moro em outra cidade. Vale a pena ir só para a avaliação?', r: 'Sim. Pacientes de fora, inclusive do exterior, fazem a avaliação e voltam para casa com orientações e exercícios.' },
    ],
    seoTitle: 'Avaliação Fisioterapêutica em Balneário Camboriú | Diagnóstico Funcional',
    seoDescription: 'Avaliação fisioterapêutica detalhada no Centro de Balneário Camboriú: conversa, questionários, testes e equipamentos modernos para um diagnóstico claro.',
  },
  {
    slug: 'equilibrio-e-prevencao-de-quedas',
    nome: 'Equilíbrio e prevenção de quedas',
    resumo: 'Mais firmeza para quem tem medo de cair.',
    beneficio: 'Caminhar com confiança, dentro e fora de casa.',
    descricao: [
      'Uma queda pode mudar a rotina de uma pessoa por meses. E o medo de cair, sozinho, já faz muita gente deixar de sair de casa.',
      'O treino de equilíbrio identifica o que está falhando (força, visão, labirinto, sensibilidade dos pés) e trabalha cada ponto com exercícios seguros e progressivos.',
    ],
    paraQuem: [
      'Idosos que já caíram ou têm medo de cair',
      'Quem sente as pernas fracas ou instáveis',
      'Familiares preocupados com a segurança de pais e avós',
      'Quem quer manter a independência com o passar dos anos',
    ],
    comoFunciona: [
      { titulo: 'Teste de risco de quedas', texto: 'Avaliação de equilíbrio, marcha, força e visão em situações do dia a dia.' },
      { titulo: 'Treino progressivo', texto: 'Exercícios seguros que ficam mais desafiadores conforme você evolui.' },
      { titulo: 'Casa mais segura', texto: 'Orientações simples sobre tapetes, iluminação, banheiro e calçados.' },
      { titulo: 'Acompanhamento', texto: 'Reavaliações periódicas para mostrar a evolução em números.' },
    ],
    faq: [
      { p: 'Meu pai tem 85 anos. Ainda dá para melhorar o equilíbrio?', r: 'Sim. O corpo responde ao treino em qualquer idade. Os exercícios são adaptados à condição de cada pessoa.' },
      { p: 'O consultório tem acessibilidade?', r: '[CONFIRMAR: acesso para cadeira de rodas, elevador ou térreo]' },
      { p: 'Preciso de pedido médico?', r: 'Não é obrigatório para a fisioterapia particular. Se você tiver um encaminhamento, traga para a consulta.' },
    ],
    seoTitle: 'Equilíbrio e Prevenção de Quedas em Balneário Camboriú | Fisioterapia',
    seoDescription: 'Treino de equilíbrio e prevenção de quedas para idosos no Centro de Balneário Camboriú. Avaliação do risco e exercícios seguros.',
  },
]

/* ------------------------------------------------------------------ */
/* Perguntas frequentes gerais                                         */
/* ------------------------------------------------------------------ */
export const faqGeral: { p: string; r: string }[] = [
  {
    p: 'Como faço para agendar?',
    r: `Pelo WhatsApp ${empresa.telefone}. Você conta rapidamente o que está sentindo e combinamos o melhor horário.`,
  },
  {
    p: 'Quais são os horários de atendimento?',
    r: 'De segunda a sexta, das 13h30 às 18h. Sábados e domingos o consultório fica fechado.',
  },
  { p: 'Quanto custa a consulta?', r: empresa.valorConsulta },
  { p: 'Atende convênio?', r: empresa.convenios },
  { p: 'Quais as formas de pagamento?', r: empresa.pagamento },
  {
    p: 'Preciso de pedido médico?',
    r: 'Para a fisioterapia particular, não é obrigatório. Se você tiver encaminhamento, exames ou relatórios, traga na primeira consulta.',
  },
  {
    p: 'Onde fica o consultório? Tem estacionamento?',
    r: `Na ${empresa.endereco.completo}, no Centro de Balneário Camboriú. ${empresa.estacionamento}`,
  },
  { p: 'Quanto tempo dura a primeira consulta?', r: empresa.duracaoConsulta },
]

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/perguntas-frequentes', label: 'Dúvidas' },
  { to: '/contato', label: 'Contato' },
]
