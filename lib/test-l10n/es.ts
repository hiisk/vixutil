import type { Test } from '../types.ts';

/**
 * 스페인어 심리테스트.
 *
 * 영어판 다섯 종을 옮긴 것이다. 한국어 264종(2026-08-07)은 회사 문화·연애 관습처럼 한국
 * 맥락에 묶여 있어 옮기지 않았지만([[lib/test-en.ts]] 주석), 이 다섯은 주제
 * 자체가 문화 중립이라 어느 언어권에서도 그대로 검색된다.
 *
 * 점수·구간·아이콘·색은 언어와 무관하므로 영어판과 같게 둔다. 구간이 겹치면
 * 앞의 것이 항상 이기고, 비면 그 점수에 해당하는 결과가 없어 화면이 빈다.
 */
export const TESTS_ES: Test[] = [
  {
    slug: 'social-battery',
    title: 'Test de batería social',
    desc: 'Cuánto te desgasta la gente y qué te recarga de verdad',
    icon: '🔋',
    category: 'Personalidad',
    questions: [
      { q: 'Después de un día largo rodeado de gente, ¿qué te apetece más?', opts: [
        { text: 'Estar completamente a solas', score: 0 }, { text: 'Compañía tranquila', score: 1 },
        { text: 'Algo sencillo con un amigo', score: 2 }, { text: 'Que la noche siga', score: 3 }] },
      { q: 'Te cae una invitación imprevista en una tarde libre.', opts: [
        { text: 'Digo que no casi sin pensarlo', score: 0 }, { text: 'Me lo pienso bien', score: 1 },
        { text: 'Suelo decir que sí', score: 2 }, { text: 'Digo que sí antes de leer los detalles', score: 3 }] },
      { q: 'En una conversación de grupo sueles:', opts: [
        { text: 'Escuchar y hablar poco', score: 0 }, { text: 'Hablar sobre todo con quien tengo al lado', score: 1 },
        { text: 'Participar sin esfuerzo', score: 2 }, { text: 'Acabar llevando la conversación', score: 3 }] },
      { q: 'Un fin de semana sin nada planeado te parece:', opts: [
        { text: 'Lo mejor que podía pasar', score: 0 }, { text: 'Bien, con algún plan pequeño', score: 1 },
        { text: 'Un poco vacío', score: 2 }, { text: 'Como si algo hubiera salido mal', score: 3 }] },
      { q: 'Trabajar en una oficina abierta y con movimiento:', opts: [
        { text: 'Me destroza la concentración', score: 0 }, { text: 'Se lleva con auriculares', score: 1 },
        { text: 'Casi siempre me va bien', score: 2 }, { text: 'Me mantiene con energía', score: 3 }] },
      { q: 'Llegas a una fiesta donde solo conoces a una persona.', opts: [
        { text: 'Me quedo a su lado toda la noche', score: 0 }, { text: 'Conozco a algunos a través de ella', score: 1 },
        { text: 'Voy circulando y hablo con varios grupos', score: 2 }, { text: 'Al final conozco a media sala', score: 3 }] },
      { q: 'Suena el teléfono, número desconocido.', opts: [
        { text: 'No lo cojo nunca', score: 0 }, { text: 'Lo dejo sonar y luego miro', score: 1 },
        { text: 'Contesto si estoy libre', score: 2 }, { text: 'Contesto al momento', score: 3 }] },
      { q: '¿Qué tal llevas los viajes largos en grupo?', opts: [
        { text: 'Necesito mi habitación y mis horarios', score: 0 }, { text: 'Bien, con ratos a solas', score: 1 },
        { text: 'Los disfruto', score: 2 }, { text: 'Cuanta más gente, mejor', score: 3 }] },
      { q: 'Después de una gran noche con gente te sientes:', opts: [
        { text: 'Agotado, aunque haya salido bien', score: 0 }, { text: 'A gusto, pero con ganas de parar', score: 1 },
        { text: 'Con subidón un buen rato', score: 2 }, { text: 'Listo para repetir mañana', score: 3 }] },
      { q: 'Ser el centro de atención te resulta:', opts: [
        { text: 'Realmente incómodo', score: 0 }, { text: 'Llevadero si es poco rato', score: 1 },
        { text: 'Agradable en el sitio adecuado', score: 2 }, { text: 'Donde más yo mismo me siento', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🕯️', title: 'Recarga profunda', color: 'from-slate-500 to-slate-700',
        desc: 'Tu batería se vacía deprisa en compañía y solo se llena a solas. Eso no es timidez: es un gasto de energía real, y cuanto antes organices la semana contando con él en vez de disculparte por él, mejor te irá. Reserva el tiempo de recuperación en el calendario como reservarías una reunión.',
        traits: ['Necesita soledad', 'Concentración profunda', 'Selectivo', 'Constante'] },
      { min: 13, max: 14, emoji: '🌙', title: 'Reserva tranquila', color: 'from-indigo-500 to-violet-600',
        desc: 'Te manejas bien con gente, pero luego lo pagas. Los grupos pequeños y las caras conocidas casi no te cuestan; los grandes y desconocidos, mucho. Con proteger una tarde de verdad vacía a la semana suele bastar para no descompensarte.',
        traits: ['Grupos pequeños', 'Se recupera a solas', 'Reflexivo', 'Cercano de uno en uno'] },
      { min: 15, max: 17, emoji: '🌤️', title: 'Carga equilibrada', color: 'from-sky-500 to-blue-600',
        desc: 'Pasas de la compañía a la soledad sin apenas fricción, y eso es una ventaja real. El riesgo es no notar el desgaste hasta que se ha acumulado: pregúntate cómo estás antes de decir que sí a la cuarta salida seguida, no después.',
        traits: ['Adaptable', 'Sociable', 'Consciente de sí', 'Equilibrado'] },
      { min: 18, max: 30, emoji: '⚡', title: 'Te enciende la gente', color: 'from-amber-400 to-orange-500',
        desc: 'Tu energía viene de los demás, así que un calendario vacío lo lees como un problema y no como un descanso. Conviene saber que la soledad todavía te aporta algo que la compañía no puede: hasta un rato corto de silencio suele afinar todo lo demás.',
        traits: ['Se carga con gente', 'Conecta rápido', 'Expresivo', 'Espontáneo'] },
    ],
  },
  {
    slug: 'stress-style',
    title: 'Cómo llevas el estrés',
    desc: 'Tu reacción por defecto bajo presión, y qué hacer con ella',
    icon: '🌊',
    category: 'Bienestar',
    questions: [
      { q: 'Te adelantan una entrega una semana. Lo primero que haces es:', opts: [
        { text: 'Quedarme bloqueado mirándolo un rato', score: 0 }, { text: 'Sentir un nudo y luego listar tareas', score: 1 },
        { text: 'Replanificar de inmediato', score: 2 }, { text: 'Activarme un poco con el reto', score: 3 }] },
      { q: 'Cuando estás estresado, tu sueño:', opts: [
        { text: 'Se rompe del todo', score: 0 }, { text: 'Se acorta', score: 1 },
        { text: 'Sigue más o menos igual', score: 2 }, { text: 'No se entera', score: 3 }] },
      { q: 'Bajo presión, hablarlo con otros:', opts: [
        { text: 'Nada — me cierro', score: 0 }, { text: 'Solo cuando ya ha pasado', score: 1 },
        { text: 'Con una persona de confianza', score: 2 }, { text: 'Abiertamente, mientras pasa', score: 3 }] },
      { q: 'Tu cuerpo bajo estrés:', opts: [
        { text: 'Dolor de cabeza, estómago, tensión — todo', score: 0 }, { text: 'Un síntoma fijo', score: 1 },
        { text: 'Algo de tensión y poco más', score: 2 }, { text: 'Apenas lo nota', score: 3 }] },
      { q: 'Cuando algo sale mal sueles:', opts: [
        { text: 'Darle vueltas durante días', score: 0 }, { text: 'Rumiarlo una tarde', score: 1 },
        { text: 'Sacar la lección y seguir', score: 2 }, { text: 'Pasar página casi al momento', score: 3 }] },
      { q: 'Con demasiadas tareas encima:', opts: [
        { text: 'No hago ninguna', score: 0 }, { text: 'Empiezo por la más fácil', score: 1 },
        { text: 'Las ordeno y ataco la primera', score: 2 }, { text: 'Delego o recorto algunas', score: 3 }] },
      { q: 'Una crítica en el trabajo te llega:', opts: [
        { text: 'Muy adentro, y por mucho tiempo', score: 0 }, { text: 'Fuerte, pero se pasa', score: 1 },
        { text: 'Como información', score: 2 }, { text: 'Como algo útil', score: 3 }] },
      { q: 'Tu válvula de escape habitual es:', opts: [
        { text: 'No tengo ninguna', score: 0 }, { text: 'El móvil o picar algo', score: 1 },
        { text: 'Un paseo, entrenar, un baño', score: 2 }, { text: 'Algo planificado y regular', score: 3 }] },
      { q: 'En una crisis de verdad eres:', opts: [
        { text: 'El que se pone nervioso', score: 0 }, { text: 'Tembloroso pero funcional', score: 1 },
        { text: 'Bastante tranquilo', score: 2 }, { text: 'El más entero de todos', score: 3 }] },
      { q: 'Mirando atrás a tu último mes duro:', opts: [
        { text: 'Todavía lo arrastro', score: 0 }, { text: 'Tardé mucho en quitármelo', score: 1 },
        { text: 'Me recuperé razonablemente', score: 2 }, { text: 'Salí mejor de lo que entré', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🫧', title: 'Lo absorbes todo', color: 'from-blue-500 to-indigo-700',
        desc: 'La presión atraviesa tus defensas y se te queda en el cuerpo. Merece la pena tomárselo en serio en vez de tirar hacia delante: el patrón en el que el estrés aparece como insomnio y síntomas físicos tiende a acumularse. Una vía de escape concreta y una persona a quien contárselo suelen cambiar más que cualquier cantidad de fuerza de voluntad.',
        traits: ['Muy sensible', 'Se lo guarda dentro', 'Necesita recuperarse', 'Empático'] },
      { min: 13, max: 14, emoji: '🌧️', title: 'Aguantas despacio', color: 'from-sky-500 to-blue-600',
        desc: 'Sales de las temporadas duras, pero te cuestan, y te recuperas más lento de lo que querrías. Lo útil es detectarlo antes: el momento de intervenir es cuando el sueño empieza a moverse, no cuando ya se ha amontonado todo.',
        traits: ['Resistente', 'Recuperación lenta', 'Concienzudo', 'Fuerte en silencio'] },
      { min: 15, max: 17, emoji: '⛅', title: 'Firme bajo carga', color: 'from-emerald-500 to-teal-600',
        desc: 'Llevas la presión sin que te descarrile, sobre todo porque sigues funcionando mientras la sientes. El riesgo es dar por hecho que estás bien porque sigues trabajando: rendir bajo estrés no es lo mismo que no acusarlo.',
        traits: ['Práctico', 'Sereno', 'Se recupera bien', 'Fiable'] },
      { min: 18, max: 30, emoji: '🗿', title: 'Calma en la tormenta', color: 'from-slate-600 to-slate-800',
        desc: 'Te mantienes entero cuando las cosas se tuercen, y por eso los demás acuden a ti en una crisis. Ojo con esto: quien es así de estable suele subestimar la carga acumulada, y la gente de alrededor deja de preguntarle si está bien.',
        traits: ['Imperturbable', 'Resolutivo', 'De confianza', 'Poco reactivo'] },
    ],
  },
  {
    slug: 'decision-style',
    title: 'Cómo tomas decisiones',
    desc: 'Instinto, lógica o algo intermedio',
    icon: '🧭',
    category: 'Personalidad',
    questions: [
      { q: 'Elegir dónde comer con amigos:', opts: [
        { text: 'Me leo todas las reseñas antes', score: 0 }, { text: 'Miro un par', score: 1 },
        { text: 'Propongo un sitio que me gustó', score: 2 }, { text: 'Elijo lo que tenga buena pinta', score: 3 }] },
      { q: 'Una compra grande: ¿cuánto le das vueltas?', opts: [
        { text: 'Semanas, con hoja de cálculo', score: 0 }, { text: 'Unos días', score: 1 },
        { text: 'Un día o dos', score: 2 }, { text: 'Si me encaja, lo compro', score: 3 }] },
      { q: 'Una vez decidido, ¿vuelves sobre ello?', opts: [
        { text: 'Constantemente', score: 0 }, { text: 'A veces', score: 1 },
        { text: 'Pocas veces', score: 2 }, { text: 'Nunca — está cerrado', score: 3 }] },
      { q: 'Alguien te pide consejo. Tú:', opts: [
        { text: 'Hago muchas preguntas para entenderlo', score: 0 }, { text: 'Le pongo las opciones sobre la mesa', score: 1 },
        { text: 'Le digo qué haría yo', score: 2 }, { text: 'Se lo digo directamente', score: 3 }] },
      { q: 'Dos buenas opciones, ninguna gana claramente:', opts: [
        { text: 'Lo dejo pasar hasta que decidan las circunstancias', score: 0 }, { text: 'Hago una lista', score: 1 },
        { text: 'Lo consulto con la almohada una vez', score: 2 }, { text: 'Tiro de instinto', score: 3 }] },
      { q: '¿Con qué frecuencia te arrepientes de una decisión?', opts: [
        { text: 'A menudo, y durante mucho tiempo', score: 0 }, { text: 'A veces', score: 1 },
        { text: 'Pocas veces', score: 2 }, { text: 'Casi nunca', score: 3 }] },
      { q: 'En una reunión donde nadie decide:', opts: [
        { text: 'Espero a que lo haga otro', score: 0 }, { text: 'Pregunto qué se nos escapa', score: 1 },
        { text: 'Propongo algo', score: 2 }, { text: 'Lo cierro y seguimos', score: 3 }] },
      { q: '¿Te fías de la primera impresión de una persona?', opts: [
        { text: 'Nada', score: 0 }, { text: 'Un poco', score: 1 },
        { text: 'Normalmente sí', score: 2 }, { text: 'Casi del todo', score: 3 }] },
      { q: 'Si aparece información que contradice tu elección:', opts: [
        { text: 'Se me deshace la decisión entera', score: 0 }, { text: 'Me lo replanteo en serio', score: 1 },
        { text: 'Ajusto si es importante', score: 2 }, { text: 'Suelo mantener el rumbo', score: 3 }] },
      { q: 'Tu peor trampa al decidir es:', opts: [
        { text: 'No decidir nunca', score: 0 }, { text: 'Decidir demasiado tarde', score: 1 },
        { text: 'Decidir sin comprobar una cosa', score: 2 }, { text: 'Decidir tan rápido que ya no hay marcha atrás', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🔍', title: 'El que delibera', color: 'from-slate-500 to-slate-700',
        desc: 'Quieres el cuadro completo antes de comprometerte, así que tus decisiones están bien fundadas y llegan tarde. El coste es real: las opciones caducan mientras investigas, y la angustia de una decisión abierta suele pesar más que el riesgo de equivocarse un poco. Ponle fecha límite a la elección, no solo al resultado.',
        traits: ['Minucioso', 'Consciente del riesgo', 'Analítico', 'Le cuesta cerrar'] },
      { min: 13, max: 14, emoji: '⚖️', title: 'El que sopesa', color: 'from-sky-500 to-indigo-600',
        desc: 'Reúnes lo suficiente para sentirte seguro y entonces decides: un buen punto de partida. Vigila el patrón en el que el último 10 % de la investigación se lleva el 90 % del tiempo y no cambia nada.',
        traits: ['Equilibrado', 'Ponderado', 'Práctico', 'Sensato'] },
      { min: 15, max: 17, emoji: '🎯', title: 'El que decide', color: 'from-emerald-500 to-teal-600',
        desc: 'Te mueves rápido con información suficiente y rara vez miras atrás, lo que te hace valioso en salas donde nadie más se moja. Un hábito que conviene conservar: di en voz alta la suposición sobre la que estás apostando, para darte cuenta si resulta falsa.',
        traits: ['Resolutivo', 'Seguro', 'Va hacia delante', 'Poco arrepentimiento'] },
      { min: 18, max: 30, emoji: '⚡', title: 'El instintivo', color: 'from-amber-400 to-rose-500',
        desc: 'Te fías de tu instinto y actúas rápido, lo que es una ventaja de verdad en situaciones cambiantes. Se vuelve un problema en las decisiones irreversibles: la regla útil es frenar solo en lo que no se puede deshacer y mantener la velocidad en todo lo demás.',
        traits: ['Rápido', 'Intuitivo', 'Va a la acción', 'Decidido'] },
    ],
  },
  {
    slug: 'work-style',
    title: 'Tu forma de trabajar',
    desc: 'Cómo sacas el trabajo de verdad, no cómo crees que deberías',
    icon: '💼',
    category: 'Trabajo',
    questions: [
      { q: 'Tu mejor trabajo sale:', opts: [
        { text: 'En un bloque largo sin interrupciones', score: 0 }, { text: 'En un par de tramos concentrados', score: 1 },
        { text: 'En ratos cortos a lo largo del día', score: 2 }, { text: 'Cuando algo es urgente', score: 3 }] },
      { q: 'Tu lista de tareas es:', opts: [
        { text: 'Detallada y al día', score: 0 }, { text: 'Una lista aproximada que casi sigo', score: 1 },
        { text: 'Cuatro notas', score: 2 }, { text: 'Mental', score: 3 }] },
      { q: 'Llega un proyecto grande sin fecha de entrega:', opts: [
        { text: 'Me pongo una y la cumplo', score: 0 }, { text: 'Me pongo una y casi la cumplo', score: 1 },
        { text: 'Empiezo cuando me siento listo', score: 2 }, { text: 'Espera hasta que algo lo empuje', score: 3 }] },
      { q: 'Cuando te atascas:', opts: [
        { text: 'Sigo dándole sin parar', score: 0 }, { text: 'Corto un rato y vuelvo', score: 1 },
        { text: 'Me paso a otra tarea', score: 2 }, { text: 'Pregunto enseguida', score: 3 }] },
      { q: 'Las reuniones en tu semana:', opts: [
        { text: 'Me parten el día entero', score: 0 }, { text: 'Se llevan si van seguidas', score: 1 },
        { text: 'Son parte normal del trabajo', score: 2 }, { text: 'Es donde mejor pienso', score: 3 }] },
      { q: 'Prefieres un trabajo:', opts: [
        { text: 'Profundo y en solitario', score: 0 }, { text: 'Sobre todo solo, con puestas en común', score: 1 },
        { text: 'En equipo', score: 2 }, { text: 'Hablando constantemente', score: 3 }] },
      { q: 'Tu relación con las fechas de entrega:', opts: [
        { text: 'Termino mucho antes', score: 0 }, { text: 'Termino con margen', score: 1 },
        { text: 'Termino justo a tiempo', score: 2 }, { text: 'Rindo mejor al filo', score: 3 }] },
      { q: 'Una tarea que te aburre:', opts: [
        { text: 'La hago la primera para quitármela', score: 0 }, { text: 'La programo', score: 1 },
        { text: 'La aplazo un tiempo', score: 2 }, { text: 'Se queda ahí indefinidamente', score: 3 }] },
      { q: 'Que te comenten el trabajo a medias:', opts: [
        { text: 'Prefiero terminarlo antes', score: 0 }, { text: 'En algunos puntos de control', score: 1 },
        { text: 'Bastante a menudo', score: 2 }, { text: 'Constantemente, sobre la marcha', score: 3 }] },
      { q: 'Tu mesa de trabajo:', opts: [
        { text: 'Tiene que estar recogida para empezar', score: 0 }, { text: 'Está más o menos ordenada', score: 1 },
        { text: 'Está vivida', score: 2 }, { text: 'Es un caos que funciona', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🎯', title: 'Trabajo profundo', color: 'from-indigo-500 to-violet-700',
        desc: 'Rindes al máximo en tramos largos y tranquilos, y organizas todo lo demás para protegerlos. Eso da profundidad de verdad, pero te vuelve frágil ante la interrupción: la inversión que compensa es defender dos o tres bloques a la semana de forma innegociable y ser flexible con todo lo demás.',
        traits: ['Concentrado', 'Estructurado', 'Autónomo', 'Odia las interrupciones'] },
      { min: 13, max: 14, emoji: '📋', title: 'Planificador constante', color: 'from-sky-500 to-blue-600',
        desc: 'Planificas, dosificas y las cosas llegan cuando dijiste que llegarían. Esa fiabilidad vale más de lo que la gente cree. Solo comprueba de vez en cuando que el plan sigue al servicio del trabajo y no al revés.',
        traits: ['Fiable', 'Organizado', 'Con ritmo', 'Constante'] },
      { min: 15, max: 17, emoji: '🔄', title: 'Ágil y flexible', color: 'from-emerald-500 to-teal-600',
        desc: 'Trabajas a rachas, cambias de tarea sin esfuerzo y respondes a lo que vaya surgiendo. Eso encaja bien con entornos rápidos. Lo que hay que vigilar es que cambiar de tarea sin parar da sensación de productividad mientras hace más difícil rematar los problemas realmente duros.',
        traits: ['Adaptable', 'Receptivo', 'Colaborativo', 'Rápido'] },
      { min: 18, max: 30, emoji: '🔥', title: 'Rinde bajo presión', color: 'from-amber-400 to-rose-500',
        desc: 'La urgencia es lo que te enciende, y produces bien justo al borde de la entrega. Funciona — hasta que dos entregas caen a la vez. Fabricarte plazos intermedios más pequeños es el arreglo de siempre, y funciona mejor que intentar convertirte en otro tipo de trabajador.',
        traits: ['Rápido bajo presión', 'Improvisa', 'Enérgico', 'Movido por plazos'] },
    ],
  },
  {
    slug: 'love-language',
    type: 'category',
    title: 'Cómo demuestras cariño',
    desc: 'La forma en que expresas afecto y la forma en que quieres recibirlo',
    icon: '💝',
    category: 'Relaciones',
    questions: [
      { q: 'Tu pareja ha tenido un día horrible. Tú:', opts: [
        { text: 'Le digo exactamente lo que valoro de ella', score: 0, k: 'words' },
        { text: 'Me siento a su lado sin decir mucho', score: 1, k: 'time' },
        { text: 'Le quito algo de encima sin avisar', score: 2, k: 'acts' },
        { text: 'Le traigo algo que le gusta', score: 3, k: 'gifts' }] },
      { q: '¿Qué te hace sentir más cuidado?', opts: [
        { text: 'Que me lo digan en voz alta', score: 0, k: 'words' }, { text: 'Tiempo juntos sin distracciones', score: 1, k: 'time' },
        { text: 'Que alguien me resuelva algo', score: 2, k: 'acts' }, { text: 'Un detalle bien pensado', score: 3, k: 'gifts' }] },
      { q: 'Tu instinto en un aniversario:', opts: [
        { text: 'Escribir algo', score: 0, k: 'words' }, { text: 'Planear un día entero juntos', score: 1, k: 'time' },
        { text: 'Hacer algo práctico que le hacía falta', score: 2, k: 'acts' }, { text: 'Encontrar el regalo adecuado', score: 3, k: 'gifts' }] },
      { q: '¿Qué es lo que más duele en una relación?', opts: [
        { text: 'No oír nunca que las cosas van bien', score: 0, k: 'words' }, { text: 'Que esté delante pero a otra cosa', score: 1, k: 'time' },
        { text: 'Que me dejen todo a mí', score: 2, k: 'acts' }, { text: 'Que se olviden del día que importaba', score: 3, k: 'gifts' }] },
      { q: 'Un amigo está pasando por algo duro:', opts: [
        { text: 'Le digo lo que pienso de él', score: 0, k: 'words' }, { text: 'Le dejo una tarde libre', score: 1, k: 'time' },
        { text: 'Le resuelvo algo práctico', score: 2, k: 'acts' }, { text: 'Le mando algo', score: 3, k: 'gifts' }] },
      { q: 'Demuestras que has echado de menos a alguien:', opts: [
        { text: 'Diciéndoselo directamente', score: 0, k: 'words' }, { text: 'Haciendo hueco enseguida', score: 1, k: 'time' },
        { text: 'Haciendo algo por esa persona', score: 2, k: 'acts' }, { text: 'Trayéndole algo', score: 3, k: 'gifts' }] },
      { q: 'El cumplido que más te llega:', opts: [
        { text: 'Algo concreto sobre cómo soy', score: 0, k: 'words' }, { text: '«Siempre quiero más tiempo contigo»', score: 1, k: 'time' },
        { text: '«Siempre te ocupas de todo»', score: 2, k: 'acts' }, { text: '«Vi esto y me acordé de ti»', score: 3, k: 'gifts' }] },
      { q: 'En una discusión, ¿qué la arregla antes?', opts: [
        { text: 'Oír qué sigue valorando de mí', score: 0, k: 'words' }, { text: 'Sentarnos a hablarlo en serio', score: 1, k: 'time' },
        { text: 'Que haga algo que lo demuestre', score: 2, k: 'acts' }, { text: 'Un gesto que diga que lo ha pensado', score: 3, k: 'gifts' }] },
      { q: 'Tu pareja se va un mes. Tú:', opts: [
        { text: 'Mando mensajes largos', score: 0, k: 'words' }, { text: 'Programo llamadas sin fallar', score: 1, k: 'time' },
        { text: 'Me ocupo de todo en casa para que no se preocupe', score: 2, k: 'acts' }, { text: 'Le envío cosas por correo', score: 3, k: 'gifts' }] },
      { q: '¿Qué echarías en falta primero?', opts: [
        { text: 'Que me digan lo que siente', score: 0, k: 'words' }, { text: 'Tiempo de verdad juntos', score: 1, k: 'time' },
        { text: 'Que me echen una mano sin pedirlo', score: 2, k: 'acts' }, { text: 'Las sorpresas pequeñas y pensadas', score: 3, k: 'gifts' }] },
    ],
    results: [
      { min: 0, max: 0, k: 'words', emoji: '💬', title: 'Palabras', color: 'from-sky-500 to-blue-600',
        desc: 'Das y recibes cariño a través de lo que se dice. Que te digan con claridad qué valoran de ti te llega más hondo que cualquier gesto, y el silencio lo lees como distancia aunque no pase nada. Vale la pena decírselo a la pareja: quien demuestra el cariño de otra manera suele dar por hecho que se nota.',
        traits: ['Verbal', 'Directo', 'Expresivo', 'Tranquilizador'] },
      { min: 0, max: 0, k: 'time', emoji: '⏳', title: 'Tiempo', color: 'from-violet-500 to-purple-600',
        desc: 'Para ti la moneda es la atención. Alguien de verdad presente, con el móvil guardado, vale más que cualquier cosa que pudiera comprar o decir. La otra cara: una pareja que está delante pero distraída se te registra como ausencia, y conviene decirlo en vez de guardar rencor.',
        traits: ['Presente', 'Atento', 'Paciente', 'Busca el vínculo'] },
      { min: 0, max: 0, k: 'acts', emoji: '🛠️', title: 'Hechos', color: 'from-emerald-500 to-teal-600',
        desc: 'Demuestras cariño haciendo cosas, y notas cuando alguien te resuelve en silencio eso que te daba pereza. Tu afecto puede ser invisible para quien está esperando oírlo, así que de vez en cuando conviene decirlo además de hacerlo.',
        traits: ['Práctico', 'De fiar', 'Observador', 'Discreto'] },
      { min: 0, max: 0, k: 'gifts', emoji: '🎁', title: 'Detalles', color: 'from-rose-400 to-pink-600',
        desc: 'Para ti el objeto lleva dentro el pensamiento: «vi esto y me acordé de ti» es todo el sentido, no el precio. Por eso que se olviden de una fecha que importaba escuece más de lo que parece razonable, y merece la pena explicarlo en vez de esperar que lo adivinen.',
        traits: ['Detallista', 'Simbólico', 'Atento al detalle', 'Guarda los recuerdos'] },
    ],
  },
];

export const TESTS_ES_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_ES.map(t => [t.slug, t]),
);
