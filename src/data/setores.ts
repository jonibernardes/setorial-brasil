export type Eixo = { nome: string; peso: number; desc: string };
export type Fonte = { rotulo: string; valor: string; tom: "bom" | "ruim" | "vazio" };
export type Evidencia = { texto: string; tom: "sim" | "nao" | "aviso" };
export type Empresa = {
  nome: string; local: string; nota: number; cnpj?: string; anos?: number;
  fontes: Fonte[]; evidencias: Evidencia[];
};
export type Alerta = { nome: string; nota: number; pontos: string[]; rodape?: string };
export type Setor = {
  slug: string; titulo: string; tituloCurto: string; categoria: string;
  resumo: string; rastreadas: number; analisadas: number;
  estado: "publicado" | "em-analise";
  eixos: Eixo[]; alertas: Alerta[]; empresas: Empresa[];
  fora?: { nome: string; motivo: string }[];
  precos?: { empresa: string; partida: string; faixa: string; prazo: string }[];
};

const EIXOS_PADRAO: Eixo[] = [
  { nome: "Compromisso declarado", peso: 25, desc: "diz prazo, preço e forma de pagamento antes de você pedir" },
  { nome: "Proteção do comprador", peso: 25, desc: "escopo por escrito, aprovação antes de pagar tudo, garantia" },
  { nome: "Você fica dono", peso: 20, desc: "o que você recebe é seu, sem trava" },
  { nome: "Reputação verificável", peso: 15, desc: "nota e volume no Google, resposta e solução no Reclame Aqui" },
  { nome: "Solidez", peso: 10, desc: "CNPJ ativo, tempo de operação, responsável identificado" },
  { nome: "Depois da entrega", peso: 5, desc: "suporte e contato com quem executou" },
];

export const SETORES: Setor[] = [
  {
    slug: "planilha-sob-medida",
    titulo: "Planilha sob medida",
    tituloCurto: "Planilha sob medida",
    categoria: "Tecnologia e dados",
    resumo:
      "Quem desenvolve planilha personalizada em Excel e Google Sheets sob encomenda. Mercado de 25 empresas, onde apenas três têm reputação pública no Google e metade não publica CNPJ.",
    rastreadas: 25, analisadas: 7, estado: "publicado", eixos: EIXOS_PADRAO,
    alertas: [
      { nome: "Planilha Sob Medida", nota: 28, pontos: [
        "CNPJ não localizado em seis consultas públicas. Não há como saber com quem você fecha contrato",
        "Endereço inválido no próprio cadastro do Reclame Aqui, preenchido como “AAAAAA/AA”",
        "Zero por cento dos clientes que reclamaram voltariam a fazer negócio",
        "Não declara preço, não declara garantia, não diz se o arquivo vem desbloqueado",
      ], rodape: "É a empresa que aparece em primeiro lugar quando você busca “planilha sob medida” no Google." },
      { nome: "The X Lab", nota: 38, pontos: [
        "Cobra a partir de R$ 1.000 e não publica CNPJ em lugar nenhum",
        "Nenhuma reputação pública: sem perfil no Google, sem ficha no Reclame Aqui",
        "Não declara garantia nem o que acontece se a planilha não atender",
      ] },
      { nome: "Excel Genial", nota: 44, pontos: [
        "Pagamento cem por cento antecipado. A própria página informa que o prazo só começa depois que o dinheiro cai",
        "Direito a uma única mudança depois da entrega, e apenas se for “simples”",
        "As planilhas vêm com células protegidas, e o desbloqueio depende de instrução da empresa",
      ] },
    ],
    empresas: [
      { nome: "Academia Excel", local: "Cascavel/PR", nota: 90, cnpj: "35.284.569/0001-00", anos: 7,
        fontes: [
          { rotulo: "GOOGLE", valor: "★ 5,0 · 150 avaliações", tom: "bom" },
          { rotulo: "RECLAME AQUI", valor: "1 reclamação · 0% respondida", tom: "ruim" }],
        evidencias: [
          { texto: "prazo 3 a 4 dias úteis", tom: "sim" },
          { texto: "a partir de R$ 300, o menor do setor", tom: "sim" },
          { texto: "paga o saldo só depois de aprovar por vídeo", tom: "sim" },
          { texto: "30 dias de ajuste ilimitado", tom: "sim" },
          { texto: "arquivo sem senha, com direito de revenda", tom: "sim" },
          { texto: "22 exemplos no portfólio", tom: "sim" },
          { texto: "Excel e Google Sheets", tom: "sim" },
          { texto: "reclamação sem resposta há 41 dias", tom: "nao" }] },
      { nome: "Ninja do Excel", local: "Curitiba/PR", nota: 61, cnpj: "29.320.577/0001-62", anos: 11,
        fontes: [
          { rotulo: "GOOGLE", valor: "perfil sem nota", tom: "vazio" },
          { rotulo: "RECLAME AQUI", valor: "100% respondidas · 8,6 em 3 anos", tom: "bom" }],
        evidencias: [
          { texto: "prazo declarado 3 a 4 dias", tom: "sim" },
          { texto: "canal B2B próprio, processo em 4 etapas", tom: "sim" },
          { texto: "1.141 empresas atendidas", tom: "sim" },
          { texto: "entrega com vídeo", tom: "sim" },
          { texto: "preço só sob consulta", tom: "nao" },
          { texto: "nenhuma avaliação no Google", tom: "nao" },
          { texto: "não declara se o arquivo vem desbloqueado", tom: "aviso" }] },
      { nome: "Smart Planilhas", local: "Sorocaba/SP", nota: 48, cnpj: "41.644.905/0001-81", anos: 4,
        fontes: [
          { rotulo: "GOOGLE", valor: "★ 5,0", tom: "bom" },
          { rotulo: "RECLAME AQUI", valor: "2 reclamações · 50% respondidas", tom: "ruim" }],
        evidencias: [
          { texto: "preço em faixas, R$ 600 a R$ 3.000", tom: "sim" },
          { texto: "três níveis de projeto declarados", tom: "sim" },
          { texto: "não declara prazo", tom: "nao" },
          { texto: "não fala em garantia", tom: "nao" },
          { texto: "o carro-chefe é a loja de planilhas prontas", tom: "aviso" },
          { texto: "CNPJ do site diverge do registrado no Reclame Aqui", tom: "aviso" }] },
      { nome: "Excel Genial", local: "Florianópolis/SC", nota: 44, cnpj: "53.794.586/0001-70", anos: 6,
        fontes: [
          { rotulo: "GOOGLE", valor: "sem perfil", tom: "vazio" },
          { rotulo: "RECLAME AQUI", valor: "sem ficha", tom: "vazio" }],
        evidencias: [
          { texto: "orçamento em 3 dias, entrega em 4 a 6 dias", tom: "sim" },
          { texto: "3 depoimentos citam a planilha entregue", tom: "sim" },
          { texto: "pagamento 100% antecipado", tom: "nao" },
          { texto: "só uma mudança depois de entregue", tom: "nao" },
          { texto: "planilhas vêm com células protegidas", tom: "nao" },
          { texto: "nenhuma reputação pública", tom: "nao" }] },
      { nome: "Excel Expert", local: "Curitiba/PR", nota: 43, anos: 18,
        fontes: [
          { rotulo: "GOOGLE", valor: "★ 5,0 · 294 avaliações", tom: "bom" },
          { rotulo: "RECLAME AQUI", valor: "sem ficha", tom: "vazio" }],
        evidencias: [
          { texto: "segunda maior reputação do setor no Google", tom: "sim" },
          { texto: "opera desde 2007", tom: "sim" },
          { texto: "projetos in company sob medida", tom: "sim" },
          { texto: "não declara prazo nem preço", tom: "nao" },
          { texto: "sem formulário de orçamento", tom: "nao" },
          { texto: "carro-chefe é treinamento, não encomenda", tom: "aviso" }] },
      { nome: "The X Lab", local: "CNPJ não localizado", nota: 38,
        fontes: [
          { rotulo: "GOOGLE", valor: "sem perfil", tom: "vazio" },
          { rotulo: "RECLAME AQUI", valor: "sem ficha", tom: "vazio" }],
        evidencias: [
          { texto: "preço declarado a partir de R$ 1.000", tom: "sim" },
          { texto: "prazo 7 a 15 dias úteis", tom: "sim" },
          { texto: "encomenda é o carro-chefe, sem modelo pronto", tom: "sim" },
          { texto: "CNPJ não localizado", tom: "nao" },
          { texto: "nenhuma reputação pública", tom: "nao" },
          { texto: "não fala em garantia", tom: "nao" }] },
      { nome: "Planilha Sob Medida", local: "São Paulo/SP", nota: 28, anos: 10,
        fontes: [
          { rotulo: "GOOGLE", valor: "perfil sem nota", tom: "vazio" },
          { rotulo: "RECLAME AQUI", valor: "0% voltariam a comprar", tom: "ruim" }],
        evidencias: [
          { texto: "prazo declarado até 7 dias úteis", tom: "sim" },
          { texto: "10 anos no ar", tom: "sim" },
          { texto: "Excel, Google Sheets e Power BI", tom: "sim" },
          { texto: "não declara preço nem garantia", tom: "nao" },
          { texto: "CNPJ não localizado", tom: "nao" },
          { texto: "endereço inválido no cadastro do Reclame Aqui", tom: "nao" }] },
    ],
    precos: [
      { empresa: "Academia Excel", partida: "R$ 300", faixa: "depende do escopo", prazo: "3 a 4 dias" },
      { empresa: "Excel Solução", partida: "R$ 100", faixa: "R$ 100 a 900", prazo: "—" },
      { empresa: "Inovar.net", partida: "R$ 450", faixa: "—", prazo: "—" },
      { empresa: "Dashboard Academy", partida: "R$ 600", faixa: "R$ 600 a 3.600+", prazo: "—" },
      { empresa: "Smart Planilhas", partida: "R$ 600", faixa: "R$ 600 a 3.000", prazo: "—" },
      { empresa: "The X Lab", partida: "R$ 1.000", faixa: "—", prazo: "7 a 15 dias" },
    ],
    fora: [
      { nome: "Hashtag Treinamentos", motivo: "não vende planilha sob encomenda. Vende curso e distribui modelos prontos. Tem a maior reputação do setor de Excel, com selo RA1000, mas em outro serviço." },
      { nome: "Doutores do Excel", motivo: "a página inicial é assinatura de curso e a página de consultoria não responde. Não foi possível comprovar venda de encomenda." },
      { nome: "Pro Inove", motivo: "vende sob medida, mas só atende empresa com faturamento acima de R$ 100 milhões." },
      { nome: "PrimeSolution", motivo: "software house corporativa. A página de Excel VBA não abriu em quatro tentativas." },
      { nome: "Planilhas.VC", motivo: "encerrou. O domínio foi tomado e hoje serve outro conteúdo." },
    ],
  },
  {
    slug: "criacao-de-site-e-loja-virtual", titulo: "Criação de site e loja virtual",
    tituloCurto: "Site e loja virtual", categoria: "Tecnologia e dados",
    resumo: "Quem desenvolve site institucional, landing page e e-commerce sob encomenda. Mercado com milhares de fornecedores, do freelancer à agência, e quase nenhuma transparência de preço e prazo.",
    rastreadas: 0, analisadas: 0, estado: "em-analise", eixos: EIXOS_PADRAO, alertas: [], empresas: [],
  },
  {
    slug: "agencia-de-trafego-pago", titulo: "Agência de tráfego pago",
    tituloCurto: "Tráfego pago", categoria: "Marketing",
    resumo: "Quem gerencia anúncio no Google e nas redes por mensalidade. Setor onde a promessa é fácil de fazer e difícil de verificar, e onde o contrato costuma esconder quem é o dono da conta de anúncio.",
    rastreadas: 0, analisadas: 0, estado: "em-analise", eixos: EIXOS_PADRAO, alertas: [], empresas: [],
  },
  {
    slug: "contabilidade-online", titulo: "Contabilidade online",
    tituloCurto: "Contabilidade online", categoria: "Financeiro e jurídico",
    resumo: "Escritórios que atendem à distância por mensalidade. Decisão que trava o empresário por anos, com multa e imposto em jogo, e onde a diferença entre planos raramente está clara.",
    rastreadas: 0, analisadas: 0, estado: "em-analise", eixos: EIXOS_PADRAO, alertas: [], empresas: [],
  },
  {
    slug: "empresa-de-mudanca", titulo: "Empresa de mudança residencial",
    tituloCurto: "Mudança residencial", categoria: "Casa e reforma",
    resumo: "Quem transporta a casa inteira de um endereço para outro. Um dos setores com maior risco para o consumidor: bem de alto valor na mão de terceiro, e seguro que quase ninguém explica.",
    rastreadas: 0, analisadas: 0, estado: "em-analise", eixos: EIXOS_PADRAO, alertas: [], empresas: [],
  },
  {
    slug: "energia-solar-residencial", titulo: "Energia solar residencial",
    tituloCurto: "Energia solar", categoria: "Casa e reforma",
    resumo: "Quem projeta e instala painel solar em casa. Investimento que passa de R$ 20 mil, com promessa de retorno difícil de conferir e garantia que varia de 1 a 25 anos conforme o componente.",
    rastreadas: 0, analisadas: 0, estado: "em-analise", eixos: EIXOS_PADRAO, alertas: [], empresas: [],
  },
];

export const getSetor = (slug: string) => SETORES.find((s) => s.slug === slug);
export const CATEGORIAS = Array.from(new Set(SETORES.map((s) => s.categoria)));
