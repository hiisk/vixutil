import type { MatchCopy } from './types.ts';

/** 포르투갈어(브라질) 궁합 문구 */
export const PT: MatchCopy = {
  zodiac: {
    yukhap: {
      label: 'Par perfeito (Seis Harmonias)', headline: 'A combinação que se puxa',
      reason: 'No horóscopo chinês esses dois formam um par de Seis Harmonias: a combinação clássica, em que cada um cobre o que falta no outro.',
      love: 'A atração é fácil e ficar junto parece natural. Vocês se acomodam um no outro sem esforço.',
      advice: 'Quando encaixa tão bem, é fácil achar que é garantido. O que sustenta são os gestos pequenos e constantes.',
    },
    samhap: {
      label: 'Ótima combinação (Três Harmonias)', headline: 'Do mesmo trio: vocês simplesmente se dão bem',
      reason: 'Esses dois pertencem ao mesmo grupo de Três Harmonias, um trio que a tradição lê como naturalmente alinhado no jeito de ver as coisas.',
      love: 'Os valores batem, o que faz disso uma boa combinação de longo prazo. Acabam ficando tão à vontade quanto amigos.',
      advice: 'Quanto mais fácil o vínculo, mais as formas importam. Não deixem a intimidade virar desatenção.',
    },
    same: {
      label: 'Espelho', headline: 'Parecidos o bastante para dar certo e para bater de frente',
      reason: 'Mesmo signo, então os temperamentos correm parecidos. Vocês se entendem bem e tropeçam nas mesmas coisas.',
      love: 'Vai ter muito momento em que não precisa dizer nada. Só que talvez compartilhem o mesmo ponto cego.',
      advice: 'Aproveitem o que têm em comum e combinem de se cobrir onde os dois são fracos.',
    },
    neutral: {
      label: 'Combinação estável', headline: 'Bom enquanto se encontrarem no meio do caminho',
      reason: 'Aqui não há relação tradicional especial — é onde fica a maioria dos pares. Depende de como vocês se tratam.',
      love: 'Pode parecer sem graça no começo e depois ir crescendo. Aprofunda se não racionarem o carinho.',
      advice: 'Digam em voz alta o que esperam. Combinar o ritmo é tudo.',
    },
    clash: {
      label: 'Dá trabalho', headline: 'Signos opostos: o atrito vem sozinho',
      reason: 'Esses ficam exatamente opostos no ciclo, um par de choque. Vai ter esbarrão, mas também muito a aprender com a diferença.',
      love: 'Podem bater de frente no início. Aceitando as diferenças, viram um casal que faz o outro crescer.',
      advice: 'A chave é não ler «diferente» como «errado». Um passo de cada lado e o choque vira química.',
    },
  },
  star: {
    'same-element': {
      label: 'Par perfeito (mesmo elemento)', headline: 'Mesma sintonia: conversar é fácil',
      reason: 'Os dois signos dividem o elemento, então recebem o mundo do mesmo jeito e se entendem rápido.',
      love: 'O terreno comum é largo e a conversa flui. Corre confortável, com pouco atrito.',
      advice: 'Ser tão parecido pode virar acomodação. Busquem de propósito experiências novas juntos.',
    },
    complement: {
      label: 'Ótima combinação (elementos complementares)', headline: 'Vocês levantam um ao outro',
      reason: 'Esses elementos se complementam (fogo↔ar, terra↔água): cada um traz o que falta no outro.',
      love: 'Um traz o calor, o outro a calma. Vocês são estímulo e descanso um para o outro.',
      advice: 'A diferença é o encanto. Aproveitem o jeito do outro em vez de tentar mudá-lo.',
    },
    'same-sign': {
      label: 'Espelho', headline: 'Parecidos o bastante para dar certo, defeitos incluídos',
      reason: 'Mesmo signo, mesmo temperamento. Confortável, mas podem dividir o ponto cego e precisar se cobrir.',
      love: 'Gostos e ritmos batem, então é fácil desde o começo. Só que talvez sejam desastrados nos mesmos lugares.',
      advice: 'Aproveitem o que dividem e combinem de antemão quem cobre o que nenhum dos dois faz bem.',
    },
    challenge: {
      label: 'Dá trabalho', headline: 'Elementos diferentes: é preciso se encontrar no meio',
      reason: 'Elementos diferentes podem raspar no início. Mas quanto mais longe começam, mais há para aprender um com o outro.',
      love: 'Podem bater de frente no início. Respeitem a diferença e vira aquele tipo de relação que dura.',
      advice: 'Não leiam «diferente» como «errado». Um passo na direção do outro e o atrito vira química.',
    },
  },
  mbti: {
    best: {
      label: 'Par perfeito', headline: 'Vocês veem as coisas igual e se completam',
      reason: '',
      love: 'Valores e conversa batem, então é calmo e empolgante ao mesmo tempo. Vocês viram o lugar onde o outro pousa.',
      advice: 'Quando encaixa tão bem, é fácil achar que é garantido. O que sustenta são os gestos pequenos e constantes.',
    },
    good: {
      label: 'Boa combinação', headline: 'A conversa sai sozinha',
      reason: '',
      love: 'Vocês se sobrepõem em muita coisa, o que torna a conversa divertida. As diferenças soam refrescantes, não problemáticas.',
      advice: 'Aproveitem o que têm em comum e aceitem as diferenças em vez de tentar editá-las.',
    },
    ok: {
      label: 'Combinação estável', headline: 'Bom o bastante se se encontrarem no meio',
      reason: '',
      love: 'Precisa de um ajuste no começo e depois vai crescendo quanto mais vocês se conhecem.',
      advice: 'Digam as expectativas com clareza e os mal-entendidos caem. Combinar o ritmo é tudo.',
    },
    work: {
      label: 'Dá trabalho', headline: 'Diferentes o bastante para ter muito a aprender',
      reason: '',
      love: 'Muitas diferenças, então espere alguns embates no início. Respeitem-nas e vocês crescem juntos.',
      advice: 'Leiam como «diferente», não como «errado». Um passo na direção do outro e o atrito vira química.',
    },
  },
  axis: {
    nsSame: 'Vocês recebem o mundo do mesmo jeito (N/S), então a conversa chega',
    nsDiff: 'Vocês recebem o mundo de jeitos diferentes (N/S), então as perspectivas podem divergir',
    tfSame: 'A base para decidir (T/F) também é parecida, o que deixa as escolhas fluidas',
    tfDiff: 'A base para decidir (T/F) é diferente, o que gera atrito mas também equilíbrio',
    eiDiff: 'A energia de vocês corre em direções opostas (E/I), então um recarrega o ritmo do outro',
    jpDiff: 'Vocês vivem de jeitos diferentes (J/P), misturando flexibilidade com planejamento',
    join: '. ', end: '.',
  },
  blood: {
    'A-A': {
      label: 'Calmo e estável', headline: 'Duas pessoas que se leem com facilidade',
      reason: 'Os dois são atentos e cuidadosos, então captam rápido o humor do outro. Corre bem, sem conflito grande.',
      love: 'Um romance cuidadoso que aprofunda com o tempo. Dura se não racionarem o carinho.',
      advice: 'Os dois tendem a engolir as coisas. Digam o que doeu na hora, em vez de guardar.',
    },
    'A-B': {
      label: 'Opostos se atraem', headline: 'Atraídos pelo que o outro tem',
      reason: 'O cuidadoso A e o livre B são pessoas bem diferentes. No começo essa diferença soa como uma atração nova.',
      love: 'Um traz o planejamento, o outro a espontaneidade — raramente dá tédio.',
      advice: 'Funciona quando A não lê a liberdade de B como ameaça, e B não lê o cuidado de A como cobrança.',
    },
    'A-O': {
      label: 'Combinação sólida', headline: 'O O tranquilo abre espaço para o A detalhista',
      reason: 'O generoso O envolve com conforto o detalhista A. Cada um cobre o que falta no outro.',
      love: 'O puxa, A cuida dos detalhes, e o conjunto se assenta.',
      advice: 'O não deveria deixar passar os sinais pequenos de A; A pode se apoiar um pouco mais em O.',
    },
    'A-AB': {
      label: 'Em sintonia silenciosa', headline: 'Duas pessoas sensíveis que se entendem',
      reason: 'Os dois são sensíveis e de mundo interior, então reconhecem o que o outro realmente sente.',
      love: 'Um romance sereno, com muitos momentos que não precisam de explicação.',
      advice: 'Fica melhor se A não analisar demais o lado mais difícil de definir de AB.',
    },
    'B-B': {
      label: 'Espíritos livres', headline: 'Duas pessoas que respeitam o espaço do outro',
      reason: 'Os dois têm um eu forte e detestam se sentir presos. Reconhecendo o mundo do outro, fica confortável.',
      love: 'Um romance relaxado em que cada um faz o seu e ainda assim voltam.',
      advice: 'Aproveitem a liberdade, mas continuem dizendo as coisas para não virar indiferença.',
    },
    'B-O': {
      label: 'Muita energia', headline: 'Ficar junto é simplesmente divertido',
      reason: 'O livre B e o sociável O mantêm o clima animado. Brincam bem juntos e conversam fácil.',
      love: 'Um casal ativo que gosta de fazer coisas mais do que ficar parado.',
      advice: 'Os dois empurram forte, então vão bater às vezes. Um passo de cada lado e vocês são um par e tanto.',
    },
    'B-AB': {
      label: 'Combinação faiscante', headline: 'Dois originais que não ficam sem ideia',
      reason: 'O livre B e o inventivo AB rebatem ideias um no outro. Acham graça nas manias do outro.',
      love: 'Um romance com cara própria, tocado inteiramente do jeito de vocês.',
      advice: 'Os dois podem ser inconstantes, então fechem bem os planos que realmente importam.',
    },
    'O-O': {
      label: 'Falam direto', headline: 'Sinceros, calorosos e rápidos para virar a página',
      reason: 'Os dois são de cabeça aberta e diretos, sem nada fervendo em fogo baixo. Falam e acabou.',
      love: 'Expressão direta significa menos mal-entendido, e aqui não tem meio-termo.',
      advice: 'Nenhum dos dois gosta de perder. Pulem a queda de braço de orgulho e vocês são um par confiável.',
    },
    'O-AB': {
      label: 'Complementares', headline: 'Calor e cabeça fria juntos',
      reason: 'O sociável O e o racional AB preenchem as lacunas um do outro. O equilíbrio se sustenta bem.',
      love: 'O calor de O e a cabeça fria de AB dão a vocês estabilidade e estímulo ao mesmo tempo.',
      advice: 'Dura enquanto O não levar para o pessoal a necessidade de distância de AB.',
    },
    'AB-AB': {
      label: 'Sintonia incomum', headline: 'Duas pessoas fora do padrão que se reconhecem',
      reason: 'Os dois são originais e difíceis de prever — para os outros pode ser complicado, mas vocês se acompanham sem esforço.',
      love: 'Uma relação que roda num código que só vocês dois leem.',
      advice: 'Os dois podem oscilar emocionalmente. Limpem os mal-entendidos com frequência, conversando direto.',
    },
  },
  ui: {
    pickBoth: 'Escolha os dois lados para ver o resultado',
    you: 'Você', partner: 'A outra pessoa',
    score: 'Compatibilidade',
    why: 'Por quê',
    love: 'No relacionamento',
    advice: 'Conselho',
    reset: 'Começar de novo',
    disclaimer: 'A compatibilidade aqui segue regras tradicionais e é entretenimento. O que decide de verdade um relacionamento é como duas pessoas se tratam.',
  },
};
