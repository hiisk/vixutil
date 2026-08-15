import type { TopicCopy } from './types.ts';

/* Português do Brasil. Fora do mundo dos hanja o sistema é procurado como "Quatro
   Pilares do Destino" ou "BaZi" — os dois entram nos títulos e nos leads. O vocabulário
   segue lib/saju-l10n/pt-br.ts: estrela de autoridade (官星), de recurso (印星), de riqueza (財星). */
export const PT: TopicCopy = {
  title: {
    love: 'Leitura do amor no BaZi',
    job: 'Leitura do emprego no BaZi',
    career: 'Leitura da mudança de emprego no BaZi',
    promotion: 'Leitura da promoção no BaZi',
    money: 'Leitura do dinheiro no BaZi',
    health: 'Leitura da saúde no BaZi',
    study: 'Leitura dos estudos no BaZi',
  },
  lead: {
    love: 'Lê nos Quatro Pilares do Destino (BaZi) o palácio do cônjuge (ramo do dia), a estrela do par e a Flor de Pessegueiro (桃花殺) para mostrar por qual caminho o amor chega até você.',
    job: 'Lê as estrelas de autoridade (官星), as de recurso (印星) e o seu ramo do mês — o palácio da profissão — para mostrar que tipo de organização combina com os seus Quatro Pilares do Destino.',
    career: 'Lê o Cavalo Viajante (驛馬) e os pontos de virada dos seus pilares de sorte para mostrar se, no seu BaZi, este é um ano de sair ou de ficar.',
    promotion: 'Lê a Autoridade reta (正官) e o ciclo autoridade-recurso (官印相生) para mostrar como o posto se abre dentro de uma organização nos Quatro Pilares do Destino (BaZi).',
    money: 'Lê as estrelas de riqueza (財星) e o ciclo produção-para-riqueza (食傷生財) para mostrar por onde o dinheiro entra no seu BaZi e por onde ele vaza.',
    health: 'Lê o excesso e a falta ao longo dos cinco elementos dos Quatro Pilares do Destino (BaZi) para mostrar que parte do corpo cansa primeiro.',
    study: 'Lê as estrelas de recurso (印星) e a Estrela Literária (文昌貴人) para mostrar como vão o estudo e as provas no seu BaZi.',
  },
  terms: {
    spouseSeat: 'Palácio do cônjuge (ramo do dia)',
    careerSeat: 'Palácio da profissão (ramo do mês)',
    authStar: 'Estrela de autoridade (官星)',
    wealthStar: 'Estrela de riqueza (財星)',
    resourceStar: 'Estrela de recurso (印星)',
    authCount: 'Estrelas de autoridade',
    wealthCount: 'Estrelas de riqueza',
    resourceCount: 'Estrelas de recurso',
    selfCount: 'Grupo do eu (比劫)',
    peach: 'Flor de Pessegueiro (桃花殺)',
    yongma: 'Cavalo Viajante (驛馬殺)',
    daewoonNow: 'Pilar de sorte atual (大運)',
    gwanIn: 'Ciclo autoridade-recurso (官印相生)',
    sanggwan: 'Choque com a autoridade (傷官見官)',
    siksangSaengJae: 'A produção alimenta a riqueza (食傷生財)',
    munchang: 'Estrela Literária (文昌貴人)',
    missingEl: 'Elemento ausente',
    dominantEl: 'Elemento mais forte',
    missingCount: 'Elementos que faltam',
    strength: 'Força do Senhor do Dia',
  },
  faqCommon: [
    {
      q: 'Esta leitura de BaZi é mesmo grátis?',
      a: 'É. Não há cadastro, não há login e não existe etapa de pagamento. O mapa inteiro é calculado no seu navegador, e os seus dados de nascimento e o seu nome nunca são enviados a um servidor.',
    },
    {
      q: 'E se eu não souber a minha hora de nascimento?',
      a: 'Dá para ler o mapa mesmo assim. Deixe a hora em branco e ele é montado com três pilares — ano, mês e dia — em vez de quatro. O pilar da hora cobre parceiro, filhos e a velhice, então informar a hora deixa a leitura mais específica. Quando você informa, ela é corrigida para a hora solar real e para o horário de verão da época antes de o pilar ser fixado.',
    },
  ],
  faqTopic: {
    love: {
      q: 'O que o mapa de BaZi olha para o amor?',
      a: 'O ramo do dia — o palácio do cônjuge — e a sua estrela de par. Na mulher é a estrela de autoridade (官星) que marca o par; no homem, a estrela de riqueza (財星). A Flor de Pessegueiro (桃花殺) mostra o charme que atrai antes de tudo. Esta página lê o amor de uma pessoa só; cruzar dois mapas é uma leitura de compatibilidade à parte.',
    },
    job: {
      q: 'O mapa de BaZi diz qual profissão combina comigo?',
      a: 'Ele mostra o formato de trabalho que combina, não um empregador específico. Uma estrela de autoridade (官星) forte se dá bem onde a regra e o posto são claros; uma estrela de produção (食傷) forte rende mais onde expressar e inventar é o ponto. O ramo do mês é lido como palácio da profissão e descreve o ambiente de trabalho ao seu redor.',
    },
    career: {
      q: 'O BaZi diz a hora de mudar de emprego?',
      a: 'Ele lê o momento, não o resultado. O Cavalo Viajante (驛馬殺) marca um mapa que se resolve no movimento, e o ano em que um pilar de sorte (大運) vira é a virada estrutural. Esta página mostra o seu pilar de sorte atual junto com a presença ou não do Cavalo Viajante, para você pesar isso contra o quanto está de fato preparado.',
    },
    promotion: {
      q: 'Em que a promoção difere da profissão no BaZi?',
      a: 'São outras letras que se leem. Que trabalho combina com você é decidido pelas estrelas de produção e de riqueza, mas se o posto se abre acima de você quem decide é a Autoridade reta (正官). Quando uma estrela de recurso se junta a ela e forma o 官印相生, o cargo chega por nomeação e não no empurrão. O caso contrário, o 傷官見官, é o Talento rebelde batendo na autoridade, onde a posição construída em anos pode se desfazer.',
    },
    money: {
      q: 'Não ter estrela de riqueza quer dizer que não consigo ganhar dinheiro?',
      a: 'Não. Quer dizer que o dinheiro chega até você por outro caminho. Quando a estrela de produção alimenta a de riqueza — a configuração 食傷生財 — a capacidade vira renda direto. Sem estrela de riqueza, o caminho melhor é transformar conhecimento e ofício em valor. Um grupo do eu (比劫) pesado significa que o dinheiro que entra também sai, e aí a gestão é o que decide.',
    },
    health: {
      q: 'O mapa de BaZi diagnostica doença?',
      a: 'Não, e nunca deve ser usado assim. A leitura de saúde olha o desequilíbrio entre os cinco elementos — qual elemento falta e qual está em excesso — e nomeia os órgãos que a tradição associa a eles, para apontar onde você costuma se exceder. Se algo não estiver bem, procure um médico.',
    },
    study: {
      q: 'O que o BaZi olha para estudo e provas?',
      a: 'As estrelas de recurso (印星) são a raiz do estudo. O Recurso direto (正印) combina com o acúmulo paciente; o Recurso indireto (偏印) absorve rápido e de lado. Acima disso está a Estrela Literária (文昌貴人), fixada pelo seu Senhor do Dia, lida como o astro favorável da escrita, das provas e dos documentos. Passar numa prova, porém, é decidido pelo preparo e não pelo mapa.',
    },
  },
  ui: {
    empty: 'Coloque a sua data de nascimento e o sexo para ler só este tema, separado.',
    evidence: 'O que o seu mapa mostra aqui',
    reading: 'Leitura',
    background: 'O que esta leitura observa',
    yes: 'Presente',
    no: 'Ausente',
    none: 'Não se aplica',
    strong: 'Forte (身强)',
    weak: 'Fraco (身弱)',
    countOf: '{n}',
    nameLabel: 'Nome (opcional)',
    namePh: 'ex.: Ana',
    nameNote: 'O seu nome fica neste navegador. Ele nunca entra no endereço e nunca é enviado a um servidor.',
    metaTitle: '{topic} grátis — calculadora de BaZi',
    metaDescSuffix: 'Grátis, sem cadastro, calculado no seu navegador.',
    titleOf: '{topic} de {name}',
    introLead: 'No seu mapa, {term} está {value}. Leia tudo o que vem abaixo a partir daí.',
    otherTopics: 'Outros temas',
    backToAll: 'Ver a leitura completa do mapa',
  },
};
