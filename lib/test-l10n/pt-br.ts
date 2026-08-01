import type { Test } from '../types.ts';

/** 포르투갈어(브라질) 심리테스트 — 구조와 점수는 [[lib/test-en.ts]]와 같다. */
export const TESTS_PT: Test[] = [
  {
    slug: 'social-battery',
    title: 'Teste da bateria social',
    desc: 'O quanto as pessoas te esgotam — e o que de fato te recarrega',
    icon: '🔋',
    category: 'Personalidade',
    questions: [
      { q: 'Depois de um dia longo cercado de gente, o que você mais quer?', opts: [
        { text: 'Ficar completamente sozinho', score: 0 }, { text: 'Companhia em silêncio', score: 1 },
        { text: 'Algo tranquilo com um amigo', score: 2 }, { text: 'Que a noite continue', score: 3 }] },
      { q: 'Chega um convite de última hora numa noite livre.', opts: [
        { text: 'Recuso quase no automático', score: 0 }, { text: 'Penso bem antes', score: 1 },
        { text: 'Geralmente aceito', score: 2 }, { text: 'Aceito antes de ler os detalhes', score: 3 }] },
      { q: 'Numa conversa em grupo você costuma:', opts: [
        { text: 'Ouvir e falar pouco', score: 0 }, { text: 'Falar mais com quem está do meu lado', score: 1 },
        { text: 'Participar numa boa', score: 2 }, { text: 'Acabar conduzindo a conversa', score: 3 }] },
      { q: 'Um fim de semana sem nada marcado parece:', opts: [
        { text: 'A melhor coisa possível', score: 0 }, { text: 'Bom, com um programa pequeno', score: 1 },
        { text: 'Um pouco vazio', score: 2 }, { text: 'Como se algo tivesse dado errado', score: 3 }] },
      { q: 'Trabalhar num escritório aberto e movimentado:', opts: [
        { text: 'Acaba com a minha concentração', score: 0 }, { text: 'Dá para levar com fone', score: 1 },
        { text: 'Na maioria dos dias tudo bem', score: 2 }, { text: 'Me mantém com energia', score: 3 }] },
      { q: 'Você chega numa festa onde conhece uma pessoa só.', opts: [
        { text: 'Fico do lado dela a noite toda', score: 0 }, { text: 'Conheço algumas pessoas por meio dela', score: 1 },
        { text: 'Circulo e falo com vários grupos', score: 2 }, { text: 'No fim conheço metade da sala', score: 3 }] },
      { q: 'O telefone toca, número desconhecido.', opts: [
        { text: 'Nunca atendo', score: 0 }, { text: 'Deixo tocar e vejo depois', score: 1 },
        { text: 'Atendo se estiver livre', score: 2 }, { text: 'Atendo na hora', score: 3 }] },
      { q: 'O que você acha de viagens longas em grupo?', opts: [
        { text: 'Preciso do meu quarto e dos meus horários', score: 0 }, { text: 'Tranquilo, com pausas sozinho', score: 1 },
        { text: 'Curto bastante', score: 2 }, { text: 'Quanto mais gente, melhor', score: 3 }] },
      { q: 'Depois de uma ótima noite com gente você se sente:', opts: [
        { text: 'Esgotado, mesmo tendo sido bom', score: 0 }, { text: 'Satisfeito, mas pronto para parar', score: 1 },
        { text: 'Ligado por um bom tempo', score: 2 }, { text: 'Pronto para repetir amanhã', score: 3 }] },
      { q: 'Ser o centro das atenções é:', opts: [
        { text: 'Realmente desconfortável', score: 0 }, { text: 'Tranquilo por pouco tempo', score: 1 },
        { text: 'Gostoso no lugar certo', score: 2 }, { text: 'Onde eu sou mais eu mesmo', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🕯️', title: 'Recarga profunda', color: 'from-slate-500 to-slate-700',
        desc: 'Sua bateria se esvazia rápido em companhia e só enche na solidão. Isso não é timidez: é um custo real de energia, e quanto antes você organizar a semana contando com ele em vez de se desculpar por ele, melhor. Reserve o tempo de recuperação na agenda como reservaria uma reunião.',
        traits: ['Precisa de solidão', 'Foco profundo', 'Seletivo', 'Constante'] },
      { min: 8, max: 14, emoji: '🌙', title: 'Reserva silenciosa', color: 'from-indigo-500 to-violet-600',
        desc: 'Você lida bem com gente, mas paga depois. Grupos pequenos e rostos conhecidos quase não custam; os grandes e desconhecidos custam muito. Proteger uma noite realmente vazia por semana costuma bastar para não desandar.',
        traits: ['Grupos pequenos', 'Recupera sozinho', 'Reflexivo', 'Caloroso a dois'] },
      { min: 15, max: 21, emoji: '🌤️', title: 'Carga equilibrada', color: 'from-sky-500 to-blue-600',
        desc: 'Você transita entre companhia e solidão sem muito atrito, e isso é uma vantagem de verdade. O risco é não perceber o desgaste até ele acumular — se pergunte como está antes de aceitar a quarta saída seguida, não depois.',
        traits: ['Adaptável', 'Sociável', 'Autoconsciente', 'Equilibrado'] },
      { min: 22, max: 30, emoji: '⚡', title: 'Movido a gente', color: 'from-amber-400 to-orange-500',
        desc: 'Sua energia vem dos outros, então uma agenda vazia soa como problema e não como descanso. Vale saber que a solidão ainda faz por você algo que a companhia não faz: até um intervalo curto de silêncio costuma afinar todo o resto.',
        traits: ['Recarrega com gente', 'Conecta rápido', 'Expressivo', 'Espontâneo'] },
    ],
  },
  {
    slug: 'stress-style',
    title: 'Como você lida com o estresse',
    desc: 'Sua reação padrão sob pressão, e o que fazer com ela',
    icon: '🌊',
    category: 'Bem-estar',
    questions: [
      { q: 'Um prazo é antecipado em uma semana. Sua primeira reação é:', opts: [
        { text: 'Travar e ficar encarando um tempo', score: 0 }, { text: 'Sentir um nó e então listar tarefas', score: 1 },
        { text: 'Replanejar na hora', score: 2 }, { text: 'Ficar um pouco animado com o desafio', score: 3 }] },
      { q: 'Quando você está estressado, seu sono:', opts: [
        { text: 'Desmonta por completo', score: 0 }, { text: 'Encurta', score: 1 },
        { text: 'Fica mais ou menos igual', score: 2 }, { text: 'Nem sente', score: 3 }] },
      { q: 'Sob pressão, falar com os outros:', opts: [
        { text: 'Nada — eu me fecho', score: 0 }, { text: 'Só depois que passa', score: 1 },
        { text: 'Com uma pessoa de confiança', score: 2 }, { text: 'Abertamente, enquanto acontece', score: 3 }] },
      { q: 'Seu corpo sob estresse:', opts: [
        { text: 'Dor de cabeça, estômago, tensão — tudo', score: 0 }, { text: 'Um sintoma certeiro', score: 1 },
        { text: 'Só um pouco de tensão', score: 2 }, { text: 'Mal registra', score: 3 }] },
      { q: 'Quando algo dá errado você costuma:', opts: [
        { text: 'Remoer por dias', score: 0 }, { text: 'Remoer por uma noite', score: 1 },
        { text: 'Anotar a lição e seguir', score: 2 }, { text: 'Virar a página quase na hora', score: 3 }] },
      { q: 'Diante de tarefas demais, você:', opts: [
        { text: 'Não faço nenhuma', score: 0 }, { text: 'Começo pela mais fácil', score: 1 },
        { text: 'Ordeno e ataco a primeira', score: 2 }, { text: 'Delego ou corto algumas', score: 3 }] },
      { q: 'Uma crítica no trabalho cai:', opts: [
        { text: 'Muito fundo, e por muito tempo', score: 0 }, { text: 'Pesado, mas passa', score: 1 },
        { text: 'Como informação', score: 2 }, { text: 'Como algo útil', score: 3 }] },
      { q: 'Sua válvula de escape costuma ser:', opts: [
        { text: 'Não tenho nenhuma', score: 0 }, { text: 'Rolar o feed ou beliscar algo', score: 1 },
        { text: 'Uma caminhada, treino, banho', score: 2 }, { text: 'Algo planejado e regular', score: 3 }] },
      { q: 'Numa crise de verdade você é:', opts: [
        { text: 'Quem entra em pânico', score: 0 }, { text: 'Trêmulo mas funcional', score: 1 },
        { text: 'Calmo o suficiente', score: 2 }, { text: 'O mais firme da sala', score: 3 }] },
      { q: 'Olhando para o seu último mês difícil:', opts: [
        { text: 'Ainda estou carregando', score: 0 }, { text: 'Demorei muito para me livrar', score: 1 },
        { text: 'Me recuperei razoavelmente', score: 2 }, { text: 'Saí melhor do que entrei', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🫧', title: 'Absorve tudo', color: 'from-blue-500 to-indigo-700',
        desc: 'A pressão atravessa suas defesas e fica no corpo. Vale levar a sério em vez de empurrar com a barriga: o padrão em que o estresse aparece como perda de sono e sintomas físicos tende a se acumular. Uma válvula de escape concreta e uma pessoa para contar costumam mudar mais do que qualquer dose de força de vontade.',
        traits: ['Muito sensível', 'Guarda para si', 'Precisa se recuperar', 'Empático'] },
      { min: 8, max: 14, emoji: '🌧️', title: 'Aguenta devagar', color: 'from-sky-500 to-blue-600',
        desc: 'Você atravessa as fases difíceis, mas elas cobram, e a recuperação é mais lenta do que você gostaria. O jeito é perceber mais cedo: a hora de agir é quando o sono começa a mudar, não quando tudo já se empilhou.',
        traits: ['Resistente', 'Recuperação lenta', 'Caprichoso', 'Forte em silêncio'] },
      { min: 15, max: 21, emoji: '⛅', title: 'Firme sob carga', color: 'from-emerald-500 to-teal-600',
        desc: 'Você segura a pressão sem descarrilar, principalmente porque continua funcionando enquanto sente. O risco é supor que está bem porque ainda está trabalhando: render sob estresse não é o mesmo que não ser afetado por ele.',
        traits: ['Prático', 'Sereno', 'Recupera bem', 'Confiável'] },
      { min: 22, max: 30, emoji: '🗿', title: 'Calmo na tempestade', color: 'from-slate-600 to-slate-800',
        desc: 'Você se mantém inteiro quando as coisas desandam, e por isso os outros recorrem a você numa crise. Fique de olho: quem é assim tão firme costuma subestimar a carga acumulada, e quem está em volta para de perguntar se está tudo bem.',
        traits: ['Imperturbável', 'Decidido', 'Confiável', 'Pouco reativo'] },
    ],
  },
  {
    slug: 'decision-style',
    title: 'Como você decide',
    desc: 'Instinto, lógica ou algo no meio',
    icon: '🧭',
    category: 'Personalidade',
    questions: [
      { q: 'Escolher onde comer com os amigos:', opts: [
        { text: 'Leio todas as avaliações antes', score: 0 }, { text: 'Dou uma olhada em duas', score: 1 },
        { text: 'Sugiro um lugar de que gostei', score: 2 }, { text: 'Escolho o que parecer bom', score: 3 }] },
      { q: 'Uma compra grande — quanto tempo você pensa?', opts: [
        { text: 'Semanas, com planilha', score: 0 }, { text: 'Alguns dias', score: 1 },
        { text: 'Um ou dois dias', score: 2 }, { text: 'Se fizer sentido, compro', score: 3 }] },
      { q: 'Depois de decidir, você volta atrás para reavaliar?', opts: [
        { text: 'O tempo todo', score: 0 }, { text: 'Às vezes', score: 1 },
        { text: 'Raramente', score: 2 }, { text: 'Nunca — está fechado', score: 3 }] },
      { q: 'Alguém pede seu conselho. Você:', opts: [
        { text: 'Faço muitas perguntas para entender', score: 0 }, { text: 'Coloco as opções na mesa', score: 1 },
        { text: 'Digo o que eu faria', score: 2 }, { text: 'Falo direto', score: 3 }] },
      { q: 'Duas boas opções, nenhuma ganha com clareza:', opts: [
        { text: 'Empurro até as circunstâncias decidirem', score: 0 }, { text: 'Faço uma lista', score: 1 },
        { text: 'Durmo sobre o assunto uma vez', score: 2 }, { text: 'Vou no instinto', score: 3 }] },
      { q: 'Com que frequência você se arrepende de decisões?', opts: [
        { text: 'Muito, e por bastante tempo', score: 0 }, { text: 'Às vezes', score: 1 },
        { text: 'Raramente', score: 2 }, { text: 'Quase nunca', score: 3 }] },
      { q: 'Numa reunião em que ninguém decide:', opts: [
        { text: 'Espero outra pessoa', score: 0 }, { text: 'Pergunto o que está faltando', score: 1 },
        { text: 'Proponho algo', score: 2 }, { text: 'Bato o martelo e seguimos', score: 3 }] },
      { q: 'Você confia na primeira impressão de uma pessoa?', opts: [
        { text: 'Nada', score: 0 }, { text: 'Um pouco', score: 1 },
        { text: 'Geralmente', score: 2 }, { text: 'Quase totalmente', score: 3 }] },
      { q: 'Quando uma informação nova contraria sua escolha:', opts: [
        { text: 'A decisão inteira desmorona', score: 0 }, { text: 'Repenso a sério', score: 1 },
        { text: 'Ajusto se for importante', score: 2 }, { text: 'Geralmente mantenho o rumo', score: 3 }] },
      { q: 'Sua pior armadilha ao decidir é:', opts: [
        { text: 'Nunca decidir', score: 0 }, { text: 'Decidir tarde demais', score: 1 },
        { text: 'Decidir sem checar uma coisa', score: 2 }, { text: 'Decidir rápido demais para voltar atrás', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🔍', title: 'O que delibera', color: 'from-slate-500 to-slate-700',
        desc: 'Você quer o quadro completo antes de se comprometer, então suas decisões são bem fundamentadas e lentas. O custo é real: as opções vencem enquanto você pesquisa, e a angústia de uma decisão em aberto costuma pesar mais do que o risco de errar um pouco. Ponha prazo na escolha, não só no resultado.',
        traits: ['Minucioso', 'Atento ao risco', 'Analítico', 'Custa a fechar'] },
      { min: 8, max: 14, emoji: '⚖️', title: 'O que pondera', color: 'from-sky-500 to-indigo-600',
        desc: 'Você junta o bastante para se sentir seguro e então decide — um bom padrão. Fique de olho no ponto em que os últimos 10% da pesquisa levam 90% do tempo e não mudam nada.',
        traits: ['Equilibrado', 'Ponderado', 'Prático', 'Sensato'] },
      { min: 15, max: 21, emoji: '🎯', title: 'O que decide', color: 'from-emerald-500 to-teal-600',
        desc: 'Você anda rápido com informação suficiente e raramente olha para trás, o que te torna útil em salas onde ninguém quer bater o martelo. Um hábito que vale manter: diga em voz alta em que suposição você está apostando, para notar se ela não se confirmar.',
        traits: ['Decidido', 'Confiante', 'Vai em frente', 'Pouco arrependimento'] },
      { min: 22, max: 30, emoji: '⚡', title: 'O instintivo', color: 'from-amber-400 to-rose-500',
        desc: 'Você confia no instinto e age rápido, o que é uma vantagem real em situações que mudam o tempo todo. Vira problema nas decisões irreversíveis: a regra útil é frear justamente no que não dá para desfazer e manter a velocidade em todo o resto.',
        traits: ['Rápido', 'Intuitivo', 'Vai à ação', 'Resolutivo'] },
    ],
  },
  {
    slug: 'work-style',
    title: 'Seu jeito de trabalhar',
    desc: 'Como você realmente entrega, não como acha que deveria',
    icon: '💼',
    category: 'Trabalho',
    questions: [
      { q: 'Seu melhor trabalho acontece:', opts: [
        { text: 'Num bloco longo sem interrupção', score: 0 }, { text: 'Em duas ou três janelas de foco', score: 1 },
        { text: 'Em picos curtos ao longo do dia', score: 2 }, { text: 'Quando algo é urgente', score: 3 }] },
      { q: 'Sua lista de tarefas é:', opts: [
        { text: 'Detalhada e sempre atualizada', score: 0 }, { text: 'Uma lista mais ou menos seguida', score: 1 },
        { text: 'Umas anotações', score: 2 }, { text: 'Na minha cabeça', score: 3 }] },
      { q: 'Chega um projeto grande sem prazo:', opts: [
        { text: 'Crio um e cumpro', score: 0 }, { text: 'Crio um e quase sempre cumpro', score: 1 },
        { text: 'Começo quando me sinto pronto', score: 2 }, { text: 'Fica esperando até algo forçar', score: 3 }] },
      { q: 'Quando você empaca:', opts: [
        { text: 'Insisto sem parar', score: 0 }, { text: 'Dou uma pausa curta e volto', score: 1 },
        { text: 'Troco de tarefa', score: 2 }, { text: 'Pergunto na hora', score: 3 }] },
      { q: 'As reuniões da sua semana:', opts: [
        { text: 'Quebram meu dia inteiro', score: 0 }, { text: 'Dão para levar se ficarem juntas', score: 1 },
        { text: 'São parte normal do trabalho', score: 2 }, { text: 'É onde eu penso melhor', score: 3 }] },
      { q: 'Você prefere um trabalho:', opts: [
        { text: 'Profundo e sozinho', score: 0 }, { text: 'Quase todo sozinho, com alinhamentos', score: 1 },
        { text: 'Em equipe', score: 2 }, { text: 'Conversando o tempo todo', score: 3 }] },
      { q: 'Sua relação com prazos:', opts: [
        { text: 'Termino bem antes', score: 0 }, { text: 'Termino com folga', score: 1 },
        { text: 'Termino em cima da hora', score: 2 }, { text: 'Rendo melhor no limite', score: 3 }] },
      { q: 'Uma tarefa chata:', opts: [
        { text: 'Faço primeiro para me livrar', score: 0 }, { text: 'Agendo', score: 1 },
        { text: 'Empurro um tempo', score: 2 }, { text: 'Fica lá para sempre', score: 3 }] },
      { q: 'Comentários sobre o trabalho em andamento:', opts: [
        { text: 'Prefiro terminar antes', score: 0 }, { text: 'Em alguns pontos de checagem', score: 1 },
        { text: 'Com certa frequência', score: 2 }, { text: 'O tempo todo, enquanto faço', score: 3 }] },
      { q: 'Sua mesa:', opts: [
        { text: 'Precisa estar limpa para eu começar', score: 0 }, { text: 'É mais ou menos organizada', score: 1 },
        { text: 'É vivida', score: 2 }, { text: 'É um caos que funciona', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '🎯', title: 'Trabalho profundo', color: 'from-indigo-500 to-violet-700',
        desc: 'Você rende mais em blocos longos e silenciosos, e organiza tudo em volta para protegê-los. Isso gera profundidade de verdade, mas te deixa frágil a interrupções: o investimento que compensa é defender dois ou três blocos por semana de forma inegociável e ser flexível com o resto.',
        traits: ['Focado', 'Estruturado', 'Autônomo', 'Detesta interrupção'] },
      { min: 8, max: 14, emoji: '📋', title: 'Planejador constante', color: 'from-sky-500 to-blue-600',
        desc: 'Você planeja, dosa e as coisas chegam quando você disse que chegariam. Essa confiabilidade vale mais do que a maioria imagina. Só confira de vez em quando se o plano ainda serve ao trabalho e não o contrário.',
        traits: ['Confiável', 'Organizado', 'No ritmo', 'Consistente'] },
      { min: 15, max: 21, emoji: '🔄', title: 'Flexível e ágil', color: 'from-emerald-500 to-teal-600',
        desc: 'Você trabalha em picos, troca de tarefa com facilidade e responde ao que aparece. Isso combina com ambientes rápidos. O que vale vigiar é que trocar de tarefa o tempo todo dá sensação de produtividade enquanto torna mais difícil terminar os problemas realmente duros.',
        traits: ['Adaptável', 'Responsivo', 'Colaborativo', 'Rápido'] },
      { min: 22, max: 30, emoji: '🔥', title: 'Rende sob pressão', color: 'from-amber-400 to-rose-500',
        desc: 'A urgência é o que te liga, e você produz bem bem na hora do prazo. Funciona — até dois prazos caírem juntos. Fabricar prazos menores mais cedo é a solução de sempre, e funciona melhor do que tentar virar outro tipo de profissional.',
        traits: ['Rápido sob pressão', 'Improvisa', 'Enérgico', 'Movido a prazo'] },
    ],
  },
  {
    slug: 'love-language',
    title: 'Como você demonstra carinho',
    desc: 'O jeito como você expressa afeto e como quer recebê-lo',
    icon: '💝',
    category: 'Relacionamentos',
    questions: [
      { q: 'Seu par teve um dia horrível. Você:', opts: [
        { text: 'Digo exatamente o que admiro nele', score: 0 },
        { text: 'Fico do lado sem falar muito', score: 1 },
        { text: 'Tiro alguma coisa do prato dele sem alarde', score: 2 },
        { text: 'Levo algo de que ele gosta', score: 3 }] },
      { q: 'O que mais te faz sentir cuidado?', opts: [
        { text: 'Ouvir dito em voz alta', score: 0 }, { text: 'Tempo junto sem distração', score: 1 },
        { text: 'Alguém resolver algo por mim', score: 2 }, { text: 'Um mimo bem pensado', score: 3 }] },
      { q: 'Seu instinto num aniversário de namoro:', opts: [
        { text: 'Escrever algo', score: 0 }, { text: 'Planejar um dia inteiro juntos', score: 1 },
        { text: 'Resolver algo prático que fazia falta', score: 2 }, { text: 'Achar o presente certo', score: 3 }] },
      { q: 'O que mais dói num relacionamento?', opts: [
        { text: 'Nunca ouvir que está indo bem', score: 0 }, { text: 'Estar presente mas distraído', score: 1 },
        { text: 'Ficar com tudo nas costas', score: 2 }, { text: 'Ser esquecido no dia que importava', score: 3 }] },
      { q: 'Um amigo está passando por algo difícil:', opts: [
        { text: 'Digo o que penso dele', score: 0 }, { text: 'Abro uma noite para ele', score: 1 },
        { text: 'Resolvo algo prático', score: 2 }, { text: 'Mando alguma coisa', score: 3 }] },
      { q: 'Você mostra que sentiu falta de alguém:', opts: [
        { text: 'Falando direto', score: 0 }, { text: 'Abrindo espaço na agenda na hora', score: 1 },
        { text: 'Fazendo algo por essa pessoa', score: 2 }, { text: 'Trazendo alguma coisa', score: 3 }] },
      { q: 'O elogio que mais te pega:', opts: [
        { text: 'Algo específico sobre quem eu sou', score: 0 }, { text: '"Eu sempre quero mais tempo com você"', score: 1 },
        { text: '"Você sempre dá conta de tudo"', score: 2 }, { text: '"Vi isso e lembrei de você"', score: 3 }] },
      { q: 'Numa briga, o que resolve mais rápido?', opts: [
        { text: 'Ouvir o que ainda valoriza em mim', score: 0 }, { text: 'Sentar e conversar de verdade', score: 1 },
        { text: 'A pessoa fazer algo que mostre', score: 2 }, { text: 'Um gesto que diga que ela pensou nisso', score: 3 }] },
      { q: 'Seu par vai viajar por um mês. Você:', opts: [
        { text: 'Mando mensagens longas', score: 0 }, { text: 'Marco chamadas religiosamente', score: 1 },
        { text: 'Cuido de tudo em casa para ele não se preocupar', score: 2 }, { text: 'Mando coisas pelo correio', score: 3 }] },
      { q: 'O que você sentiria falta primeiro?', opts: [
        { text: 'Ouvir o que a pessoa sente', score: 0 }, { text: 'Tempo de verdade juntos', score: 1 },
        { text: 'Receber ajuda sem pedir', score: 2 }, { text: 'As pequenas surpresas pensadas', score: 3 }] },
    ],
    results: [
      { min: 0, max: 7, emoji: '💬', title: 'Palavras', color: 'from-sky-500 to-blue-600',
        desc: 'Você dá e recebe afeto pelo que é dito. Ouvir com clareza o que alguém valoriza em você pega mais fundo do que qualquer gesto, e o silêncio soa como distância mesmo quando não há nada errado. Vale dizer isso a quem está com você: quem demonstra amor de outro jeito costuma achar que já está óbvio.',
        traits: ['Verbal', 'Direto', 'Expressivo', 'Tranquilizador'] },
      { min: 8, max: 14, emoji: '⏳', title: 'Tempo', color: 'from-violet-500 to-purple-600',
        desc: 'Para você a moeda é a atenção. Alguém realmente presente, com o celular guardado, vale mais do que qualquer coisa que pudesse comprar ou dizer. O outro lado: um par que está ali mas distraído registra como ausência, e isso é melhor dizer do que guardar mágoa.',
        traits: ['Presente', 'Atento', 'Paciente', 'Guiado pelo vínculo'] },
      { min: 15, max: 21, emoji: '🛠️', title: 'Atitudes', color: 'from-emerald-500 to-teal-600',
        desc: 'Você demonstra carinho fazendo coisas, e percebe quando alguém resolve em silêncio aquilo que você estava adiando. Seu afeto pode ser invisível para quem está esperando ouvir, então de vez em quando vale dizer além de fazer.',
        traits: ['Prático', 'De confiança', 'Observador', 'Discreto'] },
      { min: 22, max: 30, emoji: '🎁', title: 'Mimos', color: 'from-rose-400 to-pink-600',
        desc: 'Para você o objeto carrega o pensamento por trás dele — "vi isso e lembrei de você" é o ponto inteiro, não o preço. Por isso ser esquecido numa data que importava dói mais do que parece razoável, e vale explicar em vez de esperar que adivinhem.',
        traits: ['Atencioso', 'Simbólico', 'Repara nos detalhes', 'Guarda memórias'] },
    ],
  },
];

export const TESTS_PT_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_PT.map(t => [t.slug, t]),
);
