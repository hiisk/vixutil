import type { DreamCopy } from './types.ts';

/** 스페인어 꿈해몽 */
export const ES: DreamCopy = {
  categories: {
    Animals: 'Animales', Body: 'Cuerpo', Movement: 'Movimiento', Nature: 'Naturaleza',
    Objects: 'Objetos', People: 'Personas', Places: 'Lugares', Situations: 'Situaciones',
  },
  luck: { '2': 'Muy bueno', '1': 'Bueno', '0': 'Neutro', '-1': 'Cautela', '-2': 'Aviso' },
  ui: {
    title: 'Diccionario de sueños',
    lead: 'Veinte símbolos oníricos que aparecen en muchas culturas, y cómo suelen leerse',
    search: 'Busca un símbolo…',
    all: 'Todos',
    none: 'No hay resultados para esa búsqueda.',
    note: 'La interpretación de los sueños no tiene respaldo científico. Aquí se describe cómo se leen tradicionalmente estos símbolos y en qué situaciones se suelen reportar, no una predicción.',
  },
  entries: {
    falling: {
      keyword: 'Caer', summary: 'Pérdida de control en algún punto de la vida despierta',
      detail: [
        'Los sueños de caída suelen aparecer cuando algo se te escapa de las manos: un trabajo, una relación, una decisión que te quitaron.',
        'El detalle que importa es lo que pasa durante la caída. Aterrizar bien, o despertar antes del impacto, se lee como que la situación es sobrellevable.',
        'Están entre los sueños más comunes que existen, y se concentran en épocas de cambio en lugar de anticipar nada.',
      ],
    },
    teeth: {
      keyword: 'Perder los dientes', summary: 'Inquietud por cómo te ven',
      detail: [
        'Que se caigan los dientes es uno de los sueños más reportados del mundo, y suele estar ligado a la preocupación por el aspecto, la edad o la impresión que das.',
        'Aparece a menudo antes de algo donde vas a ser evaluado: una presentación, una entrevista, conocer a alguien.',
        'Algunas tradiciones lo leen como noticias de la familia. La lectura de la ansiedad es la más común y suele encajar mejor.',
      ],
    },
    flying: {
      keyword: 'Volar', summary: 'Libertad, o ganas de tenerla',
      detail: [
        'Los sueños de vuelo se leen como una sensación de soltar: una atadura, un papel o una etapa que pesaba.',
        'Volar alto y con facilidad es la forma positiva. Costar mantenerse arriba, o no lograr despegar, apunta a algo que aún te sujeta.',
        'Mucha gente los reporta durante o justo después del final de una etapa difícil.',
      ],
    },
    chased: {
      keyword: 'Que te persigan', summary: 'Algo que estás evitando',
      detail: [
        'Que te persigan se lee como evitación: una conversación, una decisión o un sentimiento del que llevas huyendo.',
        'Qué te persigue importa menos que el hecho de que corres. Girarse a mirarlo dentro del sueño suele reportarse como el punto en que las cosas cambian.',
        'Se repiten mientras lo evitado sigue sin resolver, y tienden a parar cuando se aborda.',
      ],
    },
    water: {
      keyword: 'Agua', summary: 'El estado de tus emociones',
      detail: [
        'El agua se lee como emoción, y su estado es la lectura. Agua clara y calma sugiere que las cosas están asentadas; turbia o revuelta, que no.',
        'El agua profunda suele asociarse a algo que no has mirado del todo. Estar cómodo en ella es buena señal.',
        'La inundación en concreto aparece cuando el sentimiento se ha acumulado más rápido de lo que se puede procesar.',
      ],
    },
    snake: {
      keyword: 'Serpiente', summary: 'Transformación, o una inquietud oculta',
      detail: [
        'Las serpientes traen dos lecturas a la vez: renovación, porque mudan la piel, y amenaza, porque son serpientes. Cuál se aplica depende de cómo se sintió el sueño.',
        'Una serpiente tranquila suele leerse como un cambio ya en marcha. Una amenazante apunta a algo que intuyes pero no has nombrado.',
        'El color importa en varias tradiciones: las serpientes doradas o blancas se leen bastante mejor que las oscuras.',
      ],
    },
    house: {
      keyword: 'Una casa', summary: 'Tú mismo, en forma de edificio',
      detail: [
        'Una casa en sueños suele leerse como el propio yo, con cada habitación representando una parte distinta de tu vida.',
        'Encontrar una habitación que no sabías que existía es una de las variantes más reportadas, y se lee como descubrir una capacidad que no habías usado.',
        'Una casa deteriorada apunta a algo desatendido más que al edificio en sí.',
      ],
    },
    death: {
      keyword: 'La muerte', summary: 'Un final, no una predicción',
      detail: [
        'Los sueños con la muerte se leen casi siempre como finales y transiciones, no como avisos literales.',
        'Soñar con la propia muerte suele leerse como una etapa que se cierra: un trabajo, una relación, una versión de ti.',
        'Se concentran en cambios vitales reales, y por eso se sienten importantes aunque la lectura literal no sea la útil.',
      ],
    },
    baby: {
      keyword: 'Un bebé', summary: 'Algo nuevo que empieza',
      detail: [
        'Los bebés se leen como comienzos: un proyecto, una relación, una versión de tu vida que arranca.',
        'Cuidar al bebé sin dificultad es la forma positiva. Perderlo u olvidarlo apunta a algo nuevo al que no estás dando suficiente atención.',
        'Son frecuentes en épocas de responsabilidad realmente nueva, haya niños de por medio o no.',
      ],
    },
    money: {
      keyword: 'Dinero', summary: 'Valor y autoestima',
      detail: [
        'El dinero en sueños habla menos de finanzas literales y más de cuánto sientes que vales.',
        'Encontrar dinero se asocia a reconocer algo que ya tenías. Perderlo apunta a sentirte poco valorado.',
        'Aquí las tradiciones difieren mucho, así que la sensación dentro del sueño es mejor guía que cualquier significado fijo.',
      ],
    },
    exam: {
      keyword: 'Un examen', summary: 'Sentirse examinado o sin preparar',
      detail: [
        'Los sueños de examen —sin preparar, tarde, en el aula equivocada— están entre los sueños de ansiedad más comunes y siguen apareciendo décadas después de dejar los estudios.',
        'Suelen aparecer antes de algo donde vas a ser juzgado, no antes de exámenes reales.',
        'La versión recurrente casi siempre corresponde a una situación concreta en la que te sientes evaluado.',
      ],
    },
    naked: {
      keyword: 'Estar desnudo en público', summary: 'Miedo a que te vean tal como eres',
      detail: [
        'Quedar expuesto en público se lee como vulnerabilidad: el temor a que algo tuyo se vea antes de que estés listo.',
        'Que nadie en el sueño reaccione es un detalle habitual, y suele leerse como que el miedo es mayor que la realidad.',
        'Aparecen a menudo antes de algo que expone de verdad: un trabajo nuevo, una charla, una relación que se vuelve seria.',
      ],
    },
    fire: {
      keyword: 'Fuego', summary: 'Intensidad: creativa o destructiva',
      detail: [
        'El fuego trae ambas lecturas: pasión y empuje por un lado, destrucción y rabia por el otro.',
        'Un fuego controlado se lee bien: energía puesta a trabajar. Uno descontrolado apunta a algo que se te está yendo de las manos.',
        'En varias tradiciones el fuego se asocia específicamente a la riqueza y al cambio rápido.',
      ],
    },
    lost: {
      keyword: 'Estar perdido', summary: 'Incertidumbre sobre el rumbo',
      detail: [
        'Estar perdido se lee como incertidumbre sobre hacia dónde vas, en el trabajo o en la vida en general.',
        'Lugares conocidos que se han vuelto extraños son una variante habitual, y suelen apuntar a una situación que ha cambiado bajo tus pies.',
        'Encontrar el camino dentro del sueño se reporta como un punto de giro más veces que no.',
      ],
    },
    cat: {
      keyword: 'Un gato', summary: 'Independencia, y lo que guardas para ti',
      detail: [
        'Los gatos se leen normalmente como independencia e intuición, y a veces como las partes de ti que te guardas.',
        'Un gato amistoso se lee bien. Uno agresivo suele asociarse a una relación en la que algo no se ha dicho.',
        'Las tradiciones varían mucho con los gatos, más que con casi cualquier otro animal.',
      ],
    },
    bird: {
      keyword: 'Pájaros', summary: 'Noticias, o ganas de estar en otra parte',
      detail: [
        'Los pájaros se leen ampliamente como mensajes y como libertad, según lleguen o se vayan.',
        'Un pájaro enjaulado es un símbolo fuerte y constante entre tradiciones: algo tuyo que no se está dejando salir.',
        'Las bandadas suelen asociarse a noticias que llegan, a veces desde lejos.',
      ],
    },
    mountain: {
      keyword: 'Una montaña', summary: 'Un obstáculo, o una ambición',
      detail: [
        'Las montañas se leen como algo grande delante de ti, que puede ser un obstáculo o una meta, y a menudo ambas cosas.',
        'Escalar es la forma positiva. Quedarte al pie sin poder empezar apunta a algo que sientes fuera de alcance.',
        'Llegar a la cima es una de las imágenes oníricas más consistentemente positivas entre tradiciones.',
      ],
    },
    mirror: {
      keyword: 'Un espejo', summary: 'Cómo te ves a ti mismo',
      detail: [
        'Los espejos se leen como autopercepción: cómo te ves tú, no cómo te ven los demás.',
        'Un reflejo deformado o poco claro suele asociarse a incertidumbre sobre la identidad o el rumbo.',
        'Los espejos rotos arrastran la superstición de la mala suerte, pero en la lectura de sueños apuntan más a una autoimagen agrietada que a una desgracia.',
      ],
    },
    rain: {
      keyword: 'Lluvia', summary: 'Descarga, y lo que viene después',
      detail: [
        'La lluvia se lee como descarga y limpieza, y suele aparecer después de una época emocionalmente pesada, no antes.',
        'La lluvia suave se lee bien. Una tormenta apunta a algo aún sin resolver.',
        'Estar a cubierto o quedarse bajo la lluvia es el detalle sobre el que gira la mayoría de las lecturas.',
      ],
    },
    road: {
      keyword: 'Un camino', summary: 'La ruta por la que vas',
      detail: [
        'Los caminos se leen como el rumbo vital, y las bifurcaciones representan decisiones que ves venir pero quizá estés aplazando.',
        'Un camino despejado por delante es sencillamente positivo. Uno bloqueado o que se acaba apunta a un plan que hay que repensar.',
        'Quién viaja contigo suele ser el detalle más informativo.',
      ],
    },
  },
};
