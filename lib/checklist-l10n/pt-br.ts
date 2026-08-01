import type { Checklist } from '../types.ts';

/** 포르투갈어(브라질) 체크리스트 — id는 [[lib/checklist-en.ts]]와 같다. */
export const CHECKLISTS_PT: Checklist[] = [
  {
    slug: 'moving',
    title: 'Checklist de mudança',
    desc: 'Do contrato até a primeira semana na casa nova',
    icon: '📦',
    category: 'Casa e vida',
    sections: [
      {
        title: 'Burocracia e papelada', icon: '📋',
        items: [
          { id: 'm01', text: 'Peça orçamento a pelo menos três transportadoras', note: 'Reserve com 2–3 semanas para pegar o melhor preço' },
          { id: 'm02', text: 'Confirme a data da mudança e feche' },
          { id: 'm03', text: 'Avise o proprietário por escrito', note: 'Confira o prazo de aviso no contrato' },
          { id: 'm04', text: 'Atualize seu endereço em bancos, empresa e órgãos públicos' },
          { id: 'm05', text: 'Peça o redirecionamento das correspondências' },
          { id: 'm06', text: 'Combine a data e a forma de devolução do depósito' },
          { id: 'm07', text: 'Fotografe o imóvel antigo antes de devolver as chaves', note: 'Foto com data resolve discussão sobre o depósito' },
        ],
      },
      {
        title: 'Embalagem', icon: '📦',
        items: [
          { id: 'm08', text: 'Junte caixas, fita e material de proteção', note: 'Mercados costumam dar caixas de graça' },
          { id: 'm09', text: 'Venda, doe ou descarte o que não vai levar' },
          { id: 'm10', text: 'Ponha documentos e objetos de valor numa caixa que você mesmo carrega' },
          { id: 'm11', text: 'Desmonte os móveis e ensaque os parafusos junto de cada peça' },
          { id: 'm12', text: 'Etiquete cada caixa com o conteúdo e o cômodo de destino' },
          { id: 'm13', text: 'Esvazie a geladeira e o freezer', note: 'Comece a consumir o congelado uma semana antes' },
          { id: 'm14', text: 'Escoe a máquina de lavar e coloque os parafusos de transporte' },
          { id: 'm15', text: 'Monte uma bolsa da primeira noite: roupa de cama, toalhas, carregadores, chaleira' },
        ],
      },
      {
        title: 'A casa nova', icon: '🏠',
        items: [
          { id: 'm16', text: 'Confira o estado do piso, das paredes e das instalações' },
          { id: 'm17', text: 'Verifique se água, luz e gás estão ligados' },
          { id: 'm18', text: 'Agende a transferência ou instalação da internet', note: 'Peça com pelo menos uma semana — a agenda lota' },
          { id: 'm19', text: 'Troque a fechadura ou os códigos da porta' },
          { id: 'm20', text: 'Anote a leitura dos medidores no primeiro dia' },
          { id: 'm21', text: 'Fotografe qualquer dano existente antes de desencaixotar' },
        ],
      },
      {
        title: 'Depois de entrar', icon: '✅',
        items: [
          { id: 'm22', text: 'Atualize seu cadastro na prefeitura ou órgão local' },
          { id: 'm23', text: 'Descubra o registro geral de água, o quadro de luz e o dia do lixo' },
          { id: 'm24', text: 'Atualize a habilitação e o documento do veículo' },
          { id: 'm25', text: 'Teste os detectores de fumaça e de monóxido de carbono' },
          { id: 'm26', text: 'Apresente-se aos vizinhos' },
        ],
      },
    ],
  },
  {
    slug: 'travel-abroad',
    title: 'Checklist de viagem internacional',
    desc: 'Documentos, dinheiro, mala e o que todo mundo esquece',
    icon: '✈️',
    category: 'Viagem',
    sections: [
      {
        title: 'Antes de reservar', icon: '🗓️',
        items: [
          { id: 't01', text: 'Confira a validade do passaporte', note: 'Muitos países exigem seis meses de validade a partir da entrada' },
          { id: 't02', text: 'Veja se precisa de visto ou autorização de viagem' },
          { id: 't03', text: 'Confira as vacinas exigidas ou recomendadas' },
          { id: 't04', text: 'Leia as orientações oficiais de viagem para o país' },
          { id: 't05', text: 'Contrate um seguro viagem que cubra atendimento médico' },
        ],
      },
      {
        title: 'Dinheiro e documentos', icon: '💳',
        items: [
          { id: 't06', text: 'Avise o banco da viagem, ou confira se o cartão funciona lá fora' },
          { id: 't07', text: 'Leve um segundo cartão guardado separado do primeiro' },
          { id: 't08', text: 'Leve um pouco de dinheiro local para a chegada' },
          { id: 't09', text: 'Salve cópias do passaporte, do seguro e das reservas para acesso offline', note: 'Uma foto no celular e uma cópia impressa' },
          { id: 't10', text: 'Confira as taxas de compra internacional antes de depender do cartão' },
        ],
      },
      {
        title: 'Mala', icon: '🎒',
        items: [
          { id: 't11', text: 'Confira a franquia de bagagem de cada trecho' },
          { id: 't12', text: 'Leve os remédios na bagagem de mão, na embalagem original' },
          { id: 't13', text: 'Adaptador de tomada certo e uma bateria portátil', note: 'Bateria portátil só pode ir na bagagem de mão' },
          { id: 't14', text: 'Líquidos dentro do limite de cabine e em saco transparente' },
          { id: 't15', text: 'Ponha uma muda de roupa na bagagem de mão' },
        ],
      },
      {
        title: 'Na véspera', icon: '⏰',
        items: [
          { id: 't16', text: 'Faça o check-in on-line e baixe o cartão de embarque' },
          { id: 't17', text: 'Confirme o traslado ao aeroporto e quanto tempo leva' },
          { id: 't18', text: 'Baixe mapas offline e um pacote de tradução' },
          { id: 't19', text: 'Configure a resposta automática e deixe o roteiro com alguém' },
          { id: 't20', text: 'Esvazie a geladeira, tire o lixo e desligue o que der da tomada' },
        ],
      },
    ],
  },
  {
    slug: 'job-interview',
    title: 'Checklist de entrevista de emprego',
    desc: 'A preparação e o retorno que realmente fazem diferença',
    icon: '💼',
    category: 'Trabalho e carreira',
    sections: [
      {
        title: 'Pesquisa', icon: '🔍',
        items: [
          { id: 'j01', text: 'Releia a descrição da vaga e marque cada requisito' },
          { id: 'j02', text: 'Prepare um exemplo concreto para cada requisito', note: 'A situação, o que você fez, o que mudou' },
          { id: 'j03', text: 'Leia as notícias recentes, o produto e os números públicos da empresa' },
          { id: 'j04', text: 'Descubra quem vai te entrevistar e com o que a pessoa trabalha' },
          { id: 'j05', text: 'Anote três perguntas que você realmente quer ver respondidas' },
        ],
      },
      {
        title: 'Preparação', icon: '📝',
        items: [
          { id: 'j06', text: 'Ensaie em voz alta sua apresentação de dois minutos' },
          { id: 'j07', text: 'Prepare uma resposta honesta para a sua maior lacuna' },
          { id: 'j08', text: 'Saiba sua faixa salarial e o número abaixo do qual você não desce' },
          { id: 'j09', text: 'Teste o link de vídeo, a câmera, o microfone e a iluminação', note: 'Na véspera, não cinco minutos antes' },
          { id: 'j10', text: 'Planeje o trajeto e reserve 30 minutos de folga' },
        ],
      },
      {
        title: 'No dia', icon: '🎯',
        items: [
          { id: 'j11', text: 'Leve cópias impressas do currículo e do portfólio' },
          { id: 'j12', text: 'Chegue cedo o bastante para sentar e respirar' },
          { id: 'j13', text: 'Peça que esclareçam a pergunta em vez de adivinhar' },
          { id: 'j14', text: 'Faça anotações — não é falta de educação, passa interesse' },
          { id: 'j15', text: 'Pergunte qual é o próximo passo e o prazo' },
        ],
      },
      {
        title: 'Depois', icon: '✉️',
        items: [
          { id: 'j16', text: 'Mande um agradecimento curto em até 24 horas' },
          { id: 'j17', text: 'Anote as perguntas em que você travou, enquanto estão frescas' },
          { id: 'j18', text: 'Cobre uma vez se o prazo combinado passar' },
        ],
      },
    ],
  },
  {
    slug: 'remote-work',
    title: 'Checklist para montar o home office',
    desc: 'Uma mesa, uma rotina e limites que se sustentem',
    icon: '🏡',
    category: 'Trabalho e carreira',
    sections: [
      {
        title: 'A montagem física', icon: '🪑',
        items: [
          { id: 'r01', text: 'Suba a tela até a altura dos olhos', note: 'Uma pilha de livros funciona tão bem quanto um suporte' },
          { id: 'r02', text: 'Cadeira na altura em que os pés apoiam e os cotovelos ficam perto de 90°' },
          { id: 'r03', text: 'Coloque uma luz atrás da câmera, não atrás de você' },
          { id: 'r04', text: 'Use teclado e mouse separados se estiver no notebook' },
          { id: 'r05', text: 'Teste o microfone — o áudio importa mais que o vídeo' },
          { id: 'r06', text: 'Use cabo de rede ou sente perto do roteador' },
        ],
      },
      {
        title: 'Rotina', icon: '⏰',
        items: [
          { id: 'r07', text: 'Defina um horário fixo de começar e de parar, e deixe por escrito' },
          { id: 'r08', text: 'Mantenha um substituto do deslocamento: uma caminhada antes e depois' },
          { id: 'r09', text: 'Bloqueie tempo de foco na agenda para não ser engolido' },
          { id: 'r10', text: 'Almoce de verdade, longe da mesa' },
          { id: 'r11', text: 'Saia de casa uma vez enquanto ainda é dia' },
        ],
      },
      {
        title: 'Trabalhar com os outros', icon: '💬',
        items: [
          { id: 'r12', text: 'Combine com o time em quanto tempo se espera resposta' },
          { id: 'r13', text: 'Comunique o andamento mais do que o normal — visibilidade substitui estar à vista' },
          { id: 'r14', text: 'Coloque seu horário na agenda e no status' },
          { id: 'r15', text: 'Desligue as notificações fora desse horário' },
        ],
      },
    ],
  },
  {
    slug: 'gym-start',
    title: 'Checklist para começar na academia',
    desc: 'O primeiro mês, sem lesão e sem desistir',
    icon: '💪',
    category: 'Saúde e forma',
    sections: [
      {
        title: 'Antes de começar', icon: '📋',
        items: [
          { id: 'g01', text: 'Decida quantos dias por semana você consegue cumprir de verdade', note: 'Dois dias sustentáveis ganham de cinco que você abandona' },
          { id: 'g02', text: 'Escolha uma academia no seu caminho — distância acaba com a constância' },
          { id: 'g03', text: 'Confira o prazo de fidelidade e as condições de cancelamento' },
          { id: 'g04', text: 'Procure um médico antes se tiver questão cardíaca, articular ou de pressão' },
          { id: 'g05', text: 'Tire uma foto e tome as medidas no início, não só o peso' },
        ],
      },
      {
        title: 'Equipamento', icon: '👟',
        items: [
          { id: 'g06', text: 'Tênis de treino com solado plano e estável' },
          { id: 'g07', text: 'Roupa em que você se mexa bem e se sinta à vontade' },
          { id: 'g08', text: 'Garrafa de água e uma toalha pequena' },
          { id: 'g09', text: 'Cadeado para o armário' },
        ],
      },
      {
        title: 'O primeiro mês', icon: '🏋️',
        items: [
          { id: 'g10', text: 'Aprenda a técnica antes da carga: marque uma aula de iniciação' },
          { id: 'g11', text: 'Comece mais leve do que o ego quer', note: 'Dor por quatro dias é sinal de que você exagerou' },
          { id: 'g12', text: 'Registre cada treino: o quê, quanto e como foi' },
          { id: 'g13', text: 'Aqueça cinco minutos antes e alongue depois' },
          { id: 'g14', text: 'Descanse pelo menos um dia inteiro entre treinos pesados' },
          { id: 'g15', text: 'Coma proteína suficiente e durma bastante: é aí que a mudança acontece' },
        ],
      },
    ],
  },
  {
    slug: 'online-security',
    title: 'Checklist de segurança on-line',
    desc: 'A higiene de contas que de fato evita um dia ruim',
    icon: '🔐',
    category: 'Digital',
    sections: [
      {
        title: 'Senhas', icon: '🔑',
        items: [
          { id: 's01', text: 'Instale um gerenciador de senhas e deixe que ele gere tudo' },
          { id: 's02', text: 'Troque qualquer senha repetida em mais de um site', note: 'A repetição é o que transforma um vazamento em dez' },
          { id: 's03', text: 'Faça da senha do e-mail a mais forte que você tem' },
          { id: 's04', text: 'Cheque seus endereços num serviço de aviso de vazamentos' },
        ],
      },
      {
        title: 'Dois fatores', icon: '📱',
        items: [
          { id: 's05', text: 'Ative dois fatores no e-mail, no banco e no armazenamento em nuvem' },
          { id: 's06', text: 'Prefira um aplicativo autenticador ao SMS', note: 'A troca de chip derruba os códigos por SMS' },
          { id: 's07', text: 'Guarde os códigos de recuperação em algum lugar offline' },
          { id: 's08', text: 'Cadastre um segundo aparelho para que perder o celular não te tranque de fora' },
        ],
      },
      {
        title: 'Aparelhos e contas', icon: '💻',
        items: [
          { id: 's09', text: 'Ative as atualizações automáticas do sistema e do navegador' },
          { id: 's10', text: 'Ative a criptografia do disco e o bloqueio de tela' },
          { id: 's11', text: 'Revise quais aplicativos têm acesso à sua conta Google ou Apple' },
          { id: 's12', text: 'Remova aparelhos e sessões que você não usa mais' },
          { id: 's13', text: 'Configure o rastreamento e o apagamento remoto do aparelho' },
        ],
      },
      {
        title: 'Hábitos', icon: '🧠',
        items: [
          { id: 's14', text: 'Digite você mesmo o endereço em qualquer coisa que envolva dinheiro' },
          { id: 's15', text: 'Trate a urgência de uma mensagem como o sinal de alerta que ela costuma ser' },
          { id: 's16', text: 'Faça backup em algum lugar que o computador não alcance sozinho', note: 'Ransomware criptografa também os discos conectados' },
        ],
      },
    ],
  },
  {
    slug: 'new-laptop',
    title: 'Checklist de computador novo',
    desc: 'Configure direito uma vez em vez de ficar consertando por um mês',
    icon: '💻',
    category: 'Digital',
    sections: [
      {
        title: 'A primeira hora', icon: '⚡',
        items: [
          { id: 'n01', text: 'Rode todas as atualizações do sistema antes de qualquer coisa' },
          { id: 'n02', text: 'Crie uma conta sem privilégios de administrador para o uso diário, se der' },
          { id: 'n03', text: 'Ative a criptografia do disco' },
          { id: 'n04', text: 'Configure bloqueio de tela com tempo curto' },
          { id: 'n05', text: 'Entre primeiro no gerenciador de senhas — o resto depende dele' },
        ],
      },
      {
        title: 'Migração', icon: '📁',
        items: [
          { id: 'n06', text: 'Confirme o backup da máquina antiga antes de apagar qualquer coisa' },
          { id: 'n07', text: 'Mova arquivos com critério em vez de clonar a bagunça' },
          { id: 'n08', text: 'Desautorize a máquina antiga nos softwares licenciados' },
          { id: 'n09', text: 'Exporte os favoritos do navegador e os dados locais dos aplicativos' },
        ],
      },
      {
        title: 'Configuração', icon: '⚙️',
        items: [
          { id: 'n10', text: 'Instale só o que você realmente usava na máquina antiga' },
          { id: 'n11', text: 'Configure a sincronização em nuvem para os documentos' },
          { id: 'n12', text: 'Configure backups automáticos e teste uma restauração', note: 'Backup que você nunca restaurou é palpite' },
          { id: 'n13', text: 'Ajuste a escala da tela, a repetição do teclado e o trackpad ao seu gosto' },
          { id: 'n14', text: 'Anote o número de série e registre a garantia' },
        ],
      },
    ],
  },
  {
    slug: 'camping',
    title: 'Checklist de acampamento',
    desc: 'Abrigo, agasalho, comida e as miudezas que estragam a viagem',
    icon: '🏕️',
    category: 'Viagem',
    sections: [
      {
        title: 'Abrigo e sono', icon: '⛺',
        items: [
          { id: 'c01', text: 'Monte a barraca em casa uma vez antes de sair', note: 'Melhor achar a vareta que falta no quintal do que no anoitecer' },
          { id: 'c02', text: 'Saco de dormir adequado à mínima real da noite' },
          { id: 'c03', text: 'Isolante térmico — o frio vem de baixo' },
          { id: 'c04', text: 'Estacas, cordas e um martelo' },
          { id: 'c05', text: 'Lona ou piso protetor para colocar sob a barraca' },
        ],
      },
      {
        title: 'Cozinha e água', icon: '🍳',
        items: [
          { id: 'c06', text: 'Fogareiro, combustível e isqueiro, mais fósforos de reserva' },
          { id: 'c07', text: 'Panela, caneca, prato, talheres e uma faca que corte' },
          { id: 'c08', text: 'Galões de água e um jeito de purificar, se precisar' },
          { id: 'c09', text: 'Caixa térmica e gelo reutilizável para os dois primeiros dias' },
          { id: 'c10', text: 'Sacos de lixo — tudo que entra com você sai com você' },
        ],
      },
      {
        title: 'Roupa e segurança', icon: '🧥',
        items: [
          { id: 'c11', text: 'Camadas, incluindo uma peça de frio a mais do que você imagina' },
          { id: 'c12', text: 'Capa de chuva, diga o que disser a previsão' },
          { id: 'c13', text: 'Lanterna de cabeça e pilhas extras' },
          { id: 'c14', text: 'Kit de primeiros socorros, analgésicos e a sua medicação' },
          { id: 'c15', text: 'Bateria portátil e um mapa offline', note: 'Parta do princípio de que não haverá sinal' },
          { id: 'c16', text: 'Diga a alguém para onde vai e quando volta' },
        ],
      },
    ],
  },
  {
    slug: 'sleep-better',
    title: 'Checklist para dormir melhor',
    desc: 'As mudanças que têm evidência de verdade por trás',
    icon: '😴',
    category: 'Saúde e forma',
    sections: [
      {
        title: 'Horários', icon: '⏰',
        items: [
          { id: 'b01', text: 'Levante no mesmo horário todo dia, fim de semana incluído', note: 'A hora de acordar ancora o ritmo mais do que a de deitar' },
          { id: 'b02', text: 'Pegue luz do dia na primeira hora depois de acordar' },
          { id: 'b03', text: 'Corte a cafeína 8–10 horas antes de dormir' },
          { id: 'b04', text: 'Cochilos de menos de 30 minutos e antes do meio da tarde' },
        ],
      },
      {
        title: 'Ambiente', icon: '🛏️',
        items: [
          { id: 'b05', text: 'Deixe o quarto realmente escuro' },
          { id: 'b06', text: 'Mantenha fresco — perto de 18 °C serve para a maioria' },
          { id: 'b07', text: 'Tire o carregador do celular do alcance do braço' },
          { id: 'b08', text: 'Use a cama só para dormir, não para trabalhar' },
        ],
      },
      {
        title: 'Antes de deitar', icon: '🌙',
        items: [
          { id: 'b09', text: 'Diminua as luzes uma hora antes' },
          { id: 'b10', text: 'Não use álcool para dormir — ele fragmenta a segunda metade da noite' },
          { id: 'b11', text: 'Escreva a lista de amanhã para parar de repassá-la na cabeça' },
          { id: 'b12', text: 'Se estiver 20 minutos acordado, levante e faça algo sem graça com pouca luz' },
        ],
      },
    ],
  },
  {
    slug: 'wedding',
    title: 'Checklist de casamento',
    desc: 'De doze meses antes até o dia em si',
    icon: '💍',
    category: 'Eventos',
    sections: [
      {
        title: 'De 12 a 9 meses antes', icon: '📅',
        items: [
          { id: 'w01', text: 'Acertem o orçamento total e quem contribui com o quê' },
          { id: 'w02', text: 'Rascunhem a lista de convidados: é ela que puxa todo o custo' },
          { id: 'w03', text: 'Reservem o local e travem a data' },
          { id: 'w04', text: 'Reservem o celebrante ou o cartório' },
          { id: 'w05', text: 'Reservem fotógrafo e banda ou DJ', note: 'São os que lotam a agenda com mais antecedência' },
        ],
      },
      {
        title: 'De 9 a 3 meses antes', icon: '📋',
        items: [
          { id: 'w06', text: 'Encomendem as roupas e marquem as provas' },
          { id: 'w07', text: 'Confirmem o bufê e façam uma degustação' },
          { id: 'w08', text: 'Enviem os convites com prazo de confirmação' },
          { id: 'w09', text: 'Resolvam a documentação e a mudança de nome, se houver' },
          { id: 'w10', text: 'Organizem transporte e bloco de hospedagem para os convidados' },
        ],
      },
      {
        title: 'Último mês', icon: '⏳',
        items: [
          { id: 'w11', text: 'Passem o número final para o bufê' },
          { id: 'w12', text: 'Escrevam o roteiro do dia e compartilhem com todos os fornecedores' },
          { id: 'w13', text: 'Deixem alguém responsável pelas alianças, documentos e pagamentos' },
          { id: 'w14', text: 'Confirmem por escrito o horário de chegada de cada um' },
          { id: 'w15', text: 'Montem um plano de chuva se algo for ao ar livre' },
        ],
      },
      {
        title: 'O dia', icon: '💐',
        items: [
          { id: 'w16', text: 'Tomem café da manhã — sério, isso é esquecido' },
          { id: 'w17', text: 'Kit de emergência: alfinetes, curativos, tira-manchas, analgésicos' },
          { id: 'w18', text: 'Entreguem o celular para outra pessoa' },
          { id: 'w19', text: 'Reservem dez minutos a sós durante o dia' },
        ],
      },
    ],
  },
  {
    slug: 'language-learning',
    title: 'Checklist para aprender um idioma',
    desc: 'Monte de um jeito que daqui a três meses você ainda esteja nele',
    icon: '🗣️',
    category: 'Aprendizado',
    sections: [
      {
        title: 'Preparando o terreno', icon: '🎯',
        items: [
          { id: 'l01', text: 'Escreva para quê: a situação concreta que você quer dar conta' },
          { id: 'l02', text: 'Defina um mínimo diário pequeno o bastante para nunca pular', note: 'Dez minutos honestos ganham de uma hora heroica duas vezes' },
          { id: 'l03', text: 'Escolha um curso principal e pare de procurar outros' },
          { id: 'l04', text: 'Aprenda os sons antes de empilhar vocabulário' },
        ],
      },
      {
        title: 'Prática diária', icon: '📚',
        items: [
          { id: 'l05', text: 'Use repetição espaçada para o vocabulário' },
          { id: 'l06', text: 'Aprenda palavras dentro de frases, não em pares soltos' },
          { id: 'l07', text: 'Escute alguma coisa todo dia, nem que seja de fundo' },
          { id: 'l08', text: 'Fale em voz alta já na primeira semana' },
          { id: 'l09', text: 'Mantenha uma lista das palavras de que você precisou e não tinha' },
        ],
      },
      {
        title: 'Para não largar', icon: '🌱',
        items: [
          { id: 'l10', text: 'Marque um parceiro de conversa ou um professor fixo' },
          { id: 'l11', text: 'Troque para o idioma uma coisa que você já consome' },
          { id: 'l12', text: 'Conte dias seguidos, não horas' },
          { id: 'l13', text: 'Conte com um platô no nível intermediário e planeje atravessá-lo' },
        ],
      },
    ],
  },
  {
    slug: 'declutter',
    title: 'Checklist para desapegar e organizar',
    desc: 'Uma passada cômodo a cômodo que não empaca no meio',
    icon: '🧹',
    category: 'Casa e vida',
    sections: [
      {
        title: 'Antes de começar', icon: '📦',
        items: [
          { id: 'd01', text: 'Separe quatro caixas: ficar, doar, vender, descartar' },
          { id: 'd02', text: 'Agende já a entrega na instituição ou a coleta', note: 'Sacola parada no corredor acaba sendo esvaziada de novo' },
          { id: 'd03', text: 'Comece por uma gaveta, não pela casa inteira' },
          { id: 'd04', text: 'Trabalhe por categoria em vez de por cômodo sempre que der' },
        ],
      },
      {
        title: 'Cômodo a cômodo', icon: '🏠',
        items: [
          { id: 'd05', text: 'Guarda-roupa: o que não foi usado em um ano' },
          { id: 'd06', text: 'Cozinha: utensílios repetidos e tudo que está vencido' },
          { id: 'd07', text: 'Banheiro: remédio velho e cosmético passado' },
          { id: 'd08', text: 'Cabos e carregadores que não carregam mais nada' },
          { id: 'd09', text: 'Papelada: digitalize o necessário e destrua o resto' },
          { id: 'd10', text: 'A gaveta onde tudo é jogado' },
        ],
      },
      {
        title: 'Manter assim', icon: '✅',
        items: [
          { id: 'd11', text: 'Entrou um, sai um em roupas e utensílios de cozinha' },
          { id: 'd12', text: 'Dê um lugar fixo a cada categoria' },
          { id: 'd13', text: 'Faça uma arrumação de dez minutos no fim do dia' },
          { id: 'd14', text: 'Espere 24 horas antes de compras não essenciais' },
        ],
      },
    ],
  },
];

export const CHECKLISTS_PT_MAP: Record<string, Checklist> = Object.fromEntries(
  CHECKLISTS_PT.map(c => [c.slug, c]),
);
