import type { DreamCopy } from './types.ts';

/** 포르투갈어(브라질) 꿈해몽 */
export const PT: DreamCopy = {
  categories: {
    Animals: 'Animais', Body: 'Corpo', Movement: 'Movimento', Nature: 'Natureza',
    Objects: 'Objetos', People: 'Pessoas', Places: 'Lugares', Situations: 'Situações',
  },
  luck: { '2': 'Muito bom', '1': 'Bom', '0': 'Neutro', '-1': 'Cautela', '-2': 'Alerta' },
  ui: {
    title: 'Dicionário dos sonhos',
    lead: 'Vinte símbolos de sonho que aparecem em várias culturas, e como costumam ser lidos',
    search: 'Procure um símbolo…',
    all: 'Todos',
    none: 'Nada corresponde a essa busca.',
    note: 'A interpretação de sonhos não tem respaldo científico. O que está descrito aqui é como esses símbolos são lidos tradicionalmente e em que situações costumam ser relatados — não uma previsão.',
  },
  entries: {
    falling: {
      keyword: 'Cair', summary: 'Perda de controle em algum ponto da vida desperta',
      detail: [
        'Sonhos de queda costumam surgir quando algo escapa das suas mãos: um emprego, uma relação, uma decisão que tiraram de você.',
        'O detalhe que importa é o que acontece na descida. Aterrissar bem, ou acordar antes do impacto, é lido como situação que dá para atravessar.',
        'Estão entre os sonhos mais comuns que existem, e se concentram em épocas de mudança em vez de anteciparem qualquer coisa.',
      ],
    },
    teeth: {
      keyword: 'Perder os dentes', summary: 'Ansiedade sobre como você é visto',
      detail: [
        'Dentes caindo é um dos sonhos mais relatados no mundo, e costuma estar ligado à preocupação com a aparência, a idade ou a impressão que você passa.',
        'Aparece com frequência antes de algo em que você será avaliado: uma apresentação, uma entrevista, conhecer alguém novo.',
        'Algumas tradições leem como notícia da família. A leitura da ansiedade é a mais comum e costuma encaixar melhor.',
      ],
    },
    flying: {
      keyword: 'Voar', summary: 'Liberdade, ou vontade dela',
      detail: [
        'Sonhos de voo são lidos como sensação de soltura: de uma amarra, de um papel ou de uma fase que estava pesada.',
        'Voar alto e fácil é a forma positiva. Ter dificuldade de se manter no ar, ou não conseguir decolar, aponta algo que ainda te segura.',
        'Muita gente relata esses sonhos durante ou logo depois do fim de um período difícil.',
      ],
    },
    chased: {
      keyword: 'Ser perseguido', summary: 'Algo de que você está fugindo',
      detail: [
        'Ser perseguido é geralmente lido como fuga: uma conversa, uma decisão ou um sentimento de que você vem escapando.',
        'O que persegue importa menos do que o fato de você estar correndo. Virar e encarar dentro do sonho costuma ser relatado como o ponto em que as coisas mudam.',
        'Repetem-se enquanto o que é evitado continua sem solução, e tendem a parar quando aquilo é enfrentado.',
      ],
    },
    water: {
      keyword: 'Água', summary: 'O estado das suas emoções',
      detail: [
        'A água é lida como emoção, e o estado dela é a leitura. Água clara e calma sugere que as coisas estão assentadas; turva ou agitada, que não estão.',
        'Água funda costuma estar associada a algo que você não olhou de frente. Estar confortável nela é bom sinal.',
        'A enchente em específico aparece quando o sentimento acumulou mais rápido do que dá para processar.',
      ],
    },
    snake: {
      keyword: 'Cobra', summary: 'Transformação, ou uma inquietação escondida',
      detail: [
        'Cobras carregam duas leituras ao mesmo tempo: renovação, porque trocam de pele, e ameaça, porque são cobras. Qual delas vale depende de como o sonho pareceu.',
        'Uma cobra calma costuma ser lida como mudança já em curso. Uma ameaçadora aponta algo que você pressente mas ainda não nomeou.',
        'A cor importa em várias tradições — cobras douradas ou brancas são lidas bem mais positivamente que as escuras.',
      ],
    },
    house: {
      keyword: 'Uma casa', summary: 'Você mesmo, em forma de construção',
      detail: [
        'Uma casa no sonho é comumente lida como o próprio eu, com cada cômodo representando uma parte diferente da sua vida.',
        'Achar um cômodo que você não sabia que existia é uma das variantes mais relatadas, e é lida como descobrir uma capacidade que você não usava.',
        'Uma casa em mau estado costuma apontar algo negligenciado, mais do que a construção em si.',
      ],
    },
    death: {
      keyword: 'Morte', summary: 'Um fim, não uma previsão',
      detail: [
        'Sonhos com morte são quase sempre lidos como finais e transições, não como avisos literais.',
        'Sonhar com a própria morte costuma ser lido como uma fase que se fecha: um emprego, uma relação, uma versão de você.',
        'Esses sonhos se concentram em mudanças reais de vida, e por isso parecem significativos mesmo que a leitura literal não seja a útil.',
      ],
    },
    baby: {
      keyword: 'Um bebê', summary: 'Algo novo começando',
      detail: [
        'Bebês são lidos como começos: um projeto, uma relação, uma versão da sua vida que está começando.',
        'Cuidar do bebê com facilidade é a forma positiva. Perder ou esquecer aponta algo novo a que você não está dando atenção suficiente.',
        'São comuns em períodos de responsabilidade realmente nova, com ou sem crianças envolvidas.',
      ],
    },
    money: {
      keyword: 'Dinheiro', summary: 'Valor e autoestima',
      detail: [
        'Dinheiro em sonho fala menos de finanças literais e mais do quanto você sente que vale.',
        'Achar dinheiro está associado a reconhecer algo que você já tinha. Perder aponta a sensação de ser pouco valorizado.',
        'As tradições divergem bastante aqui, então a sensação dentro do sonho é um guia melhor que qualquer significado fixo.',
      ],
    },
    exam: {
      keyword: 'Uma prova', summary: 'Sentir-se testado ou despreparado',
      detail: [
        'Sonhos de prova — despreparado, atrasado, na sala errada — estão entre os sonhos de ansiedade mais comuns e continuam décadas depois da escola.',
        'Costumam aparecer antes de algo em que você será julgado, não antes de provas de verdade.',
        'A versão recorrente quase sempre corresponde a uma situação específica em que você se sente avaliado.',
      ],
    },
    naked: {
      keyword: 'Estar nu em público', summary: 'Medo de ser visto como você é',
      detail: [
        'Ficar exposto em público é lido como vulnerabilidade: o receio de que algo seu seja visto antes de você estar pronto.',
        'Ninguém no sonho reagir é um detalhe comum, e costuma ser lido como o medo sendo maior que a realidade.',
        'Aparecem com frequência antes de algo genuinamente expositivo: um emprego novo, uma palestra, uma relação ficando séria.',
      ],
    },
    fire: {
      keyword: 'Fogo', summary: 'Intensidade — criativa ou destrutiva',
      detail: [
        'O fogo carrega as duas leituras: paixão e impulso de um lado, destruição e raiva do outro.',
        'Um fogo controlado é lido bem — energia sendo usada. Um descontrolado aponta algo escapando das suas mãos.',
        'Em várias tradições o fogo está especificamente associado a riqueza e mudança rápida.',
      ],
    },
    lost: {
      keyword: 'Estar perdido', summary: 'Incerteza sobre a direção',
      detail: [
        'Estar perdido é lido como incerteza sobre para onde você está indo, no trabalho ou na vida em geral.',
        'Lugares conhecidos que ficaram estranhos são uma variante comum, e costumam apontar uma situação que mudou debaixo dos seus pés.',
        'Achar o caminho dentro do sonho é relatado como ponto de virada mais vezes do que não.',
      ],
    },
    cat: {
      keyword: 'Um gato', summary: 'Independência, e o que você guarda para si',
      detail: [
        'Gatos costumam ser lidos como independência e intuição, e às vezes como as partes de você que você guarda.',
        'Um gato amigável é lido bem. Um agressivo costuma estar associado a uma relação em que algo não foi dito.',
        'As tradições variam muito com gatos, mais do que com quase qualquer outro animal.',
      ],
    },
    bird: {
      keyword: 'Pássaros', summary: 'Notícias, ou vontade de estar em outro lugar',
      detail: [
        'Pássaros são amplamente lidos como mensagens e como liberdade, dependendo de chegarem ou partirem.',
        'Um pássaro na gaiola é um símbolo forte e constante entre tradições — algo em você que não está sendo deixado sair.',
        'Bandos costumam estar associados a notícias chegando, às vezes de longe.',
      ],
    },
    mountain: {
      keyword: 'Uma montanha', summary: 'Um obstáculo, ou uma ambição',
      detail: [
        'Montanhas são lidas como algo grande à sua frente — o que pode ser obstáculo ou meta, e muitas vezes os dois.',
        'Escalar é a forma positiva. Ficar na base sem conseguir começar aponta algo que parece fora de alcance.',
        'Chegar ao cume é uma das imagens de sonho mais consistentemente positivas entre tradições.',
      ],
    },
    mirror: {
      keyword: 'Um espelho', summary: 'Como você enxerga a si mesmo',
      detail: [
        'Espelhos são lidos como autopercepção — como você se vê, não como os outros te veem.',
        'Um reflexo distorcido ou embaçado costuma estar associado a incerteza sobre identidade ou rumo.',
        'Espelhos quebrados carregam a superstição do azar, mas na leitura de sonhos apontam mais para uma autoimagem rachada do que para infortúnio.',
      ],
    },
    rain: {
      keyword: 'Chuva', summary: 'Alívio, e o que vem depois',
      detail: [
        'A chuva é lida como alívio e limpeza — costuma aparecer depois de um período emocionalmente pesado, não antes.',
        'Chuva mansa é lida bem. Uma tempestade aponta algo ainda sem resolver.',
        'Estar abrigado da chuva ou ficar debaixo dela é o detalhe em que a maioria das leituras se apoia.',
      ],
    },
    road: {
      keyword: 'Uma estrada', summary: 'O caminho em que você está',
      detail: [
        'Estradas são lidas como direção de vida, e as bifurcações representam decisões que você percebe mas talvez esteja adiando.',
        'Estrada limpa à frente é positivo sem rodeios. Uma bloqueada ou que termina aponta um plano que precisa ser repensado.',
        'Quem está viajando com você costuma ser o detalhe mais revelador.',
      ],
    },
  },
};
