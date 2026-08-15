import type { TopicCopy } from './types.ts';

/* Español. Fuera del ámbito del hanja el sistema se busca como "Cuatro Pilares del
   Destino" o "BaZi" — ambos van en los títulos y en los leads. El vocabulario sigue a
   lib/saju-l10n/es.ts: estrella de autoridad (官星), de recurso (印星), de riqueza (財星). */
export const ES: TopicCopy = {
  title: {
    love: 'Lectura del amor en BaZi',
    job: 'Lectura del empleo en BaZi',
    career: 'Lectura del cambio de trabajo en BaZi',
    promotion: 'Lectura del ascenso en BaZi',
    money: 'Lectura del dinero en BaZi',
    health: 'Lectura de la salud en BaZi',
    study: 'Lectura de los estudios en BaZi',
  },
  lead: {
    love: 'Lee en los Cuatro Pilares del Destino (BaZi) el palacio del cónyuge (rama del día), la estrella de pareja y la Flor de Melocotón (桃花殺) para mostrar por qué camino te llega el amor.',
    job: 'Lee las estrellas de autoridad (官星), las de recurso (印星) y tu rama del mes —el palacio de la profesión— para mostrar qué tipo de organización encaja con tus Cuatro Pilares del Destino.',
    career: 'Lee el Caballo Viajero (驛馬) y los puntos de giro de tus pilares de fortuna para mostrar si en tu BaZi este es un año de moverse o de quedarse.',
    promotion: 'Lee la Autoridad recta (正官) y el ciclo autoridad-recurso (官印相生) para mostrar cómo se abre el rango dentro de una organización en los Cuatro Pilares del Destino (BaZi).',
    money: 'Lee las estrellas de riqueza (財星) y el ciclo producción-hacia-riqueza (食傷生財) para mostrar por dónde entra el dinero en tu BaZi y por dónde se escapa.',
    health: 'Lee el exceso y la carencia en los cinco elementos de los Cuatro Pilares del Destino (BaZi) para mostrar qué parte del cuerpo se cansa antes.',
    study: 'Lee las estrellas de recurso (印星) y la Estrella Literaria (文昌貴人) para mostrar cómo van el estudio y los exámenes en tu BaZi.',
  },
  terms: {
    spouseSeat: 'Palacio del cónyuge (rama del día)',
    careerSeat: 'Palacio de la profesión (rama del mes)',
    authStar: 'Estrella de autoridad (官星)',
    wealthStar: 'Estrella de riqueza (財星)',
    resourceStar: 'Estrella de recurso (印星)',
    authCount: 'Estrellas de autoridad',
    wealthCount: 'Estrellas de riqueza',
    resourceCount: 'Estrellas de recurso',
    selfCount: 'Grupo del yo (比劫)',
    peach: 'Flor de Melocotón (桃花殺)',
    yongma: 'Caballo Viajero (驛馬殺)',
    daewoonNow: 'Pilar de fortuna actual (大運)',
    gwanIn: 'Ciclo autoridad-recurso (官印相生)',
    sanggwan: 'Choque con la autoridad (傷官見官)',
    siksangSaengJae: 'La producción alimenta la riqueza (食傷生財)',
    munchang: 'Estrella Literaria (文昌貴人)',
    missingEl: 'Elemento ausente',
    dominantEl: 'Elemento más fuerte',
    missingCount: 'Elementos que faltan',
    strength: 'Fuerza del Amo del Día',
  },
  faqCommon: [
    {
      q: '¿Esta lectura de BaZi es realmente gratis?',
      a: 'Sí. No hay registro, ni inicio de sesión, ni ningún paso de pago. La carta entera se calcula en tu navegador, y tus datos de nacimiento y tu nombre nunca se envían a un servidor.',
    },
    {
      q: '¿Y si no sé mi hora de nacimiento?',
      a: 'Puedes leer la carta igual. Deja la hora en blanco y se levanta con tres pilares —año, mes y día— en lugar de cuatro. El pilar de la hora cubre la pareja, los hijos y la vejez, así que dar una hora hace la lectura más concreta. Cuando la das, se corrige a la hora solar real y al horario de verano de la época antes de fijar el pilar.',
    },
  ],
  faqTopic: {
    love: {
      q: '¿En qué se fija el BaZi para el amor?',
      a: 'En la rama del día —el palacio del cónyuge— y en tu estrella de pareja. En una mujer la marca la estrella de autoridad (官星); en un hombre, la estrella de riqueza (財星). La Flor de Melocotón (桃花殺) señala el atractivo que llega antes que nada. Esta página lee el amor de una sola persona; cruzar dos cartas es una lectura de compatibilidad aparte.',
    },
    job: {
      q: '¿Puede el BaZi decirme qué trabajo me conviene?',
      a: 'Muestra la forma de trabajo que encaja, no una empresa concreta. Una estrella de autoridad (官星) fuerte se mueve bien donde las normas y el rango están claros; una estrella de producción (食傷) fuerte rinde más donde lo que cuenta es expresar e inventar. La rama del mes se lee como palacio de la profesión y describe el ambiente de trabajo que te rodea.',
    },
    career: {
      q: '¿Puede el BaZi decirme cuándo cambiar de trabajo?',
      a: 'Lee el momento, no el resultado. El Caballo Viajero (驛馬殺) marca una carta que se resuelve moviéndose, y el año en que cambia un pilar de fortuna (大運) es el giro estructural. Esta página te muestra tu pilar de fortuna actual junto con la presencia o ausencia del Caballo Viajero, para que lo sopeses con lo preparado que estás de verdad.',
    },
    promotion: {
      q: '¿En qué se diferencia el ascenso del empleo en BaZi?',
      a: 'Se leen letras distintas. Qué trabajo te encaja lo deciden las estrellas de producción y de riqueza, pero si el rango se abre por encima de ti lo decide la Autoridad recta (正官). Cuando una estrella de recurso se le suma y forma el 官印相生, el puesto llega por nombramiento y no a base de empujar. El caso contrario, el 傷官見官, es el choque del Talento rebelde con la autoridad, donde la posición levantada durante años puede deshacerse.',
    },
    money: {
      q: '¿Si no tengo estrella de riqueza no puedo ganar dinero?',
      a: 'No. Significa que el dinero te llega por otra vía. Cuando la estrella de producción alimenta a la de riqueza —la configuración 食傷生財— la capacidad se convierte en ingresos de forma directa. Sin estrella de riqueza, el mejor camino es convertir conocimiento y oficio en valor. Un grupo del yo (比劫) pesado significa que el dinero que entra también se va, y entonces la gestión es lo que decide.',
    },
    health: {
      q: '¿Puede una carta de BaZi diagnosticar una enfermedad?',
      a: 'No, y nunca debe usarse así. La lectura de salud mira el desequilibrio de los cinco elementos —qué elemento falta y cuál sobra— y nombra los órganos que la tradición les asocia, para señalar por dónde sueles forzar. Si algo no va bien, acude a un médico.',
    },
    study: {
      q: '¿En qué se fija el BaZi para el estudio y los exámenes?',
      a: 'Las estrellas de recurso (印星) son la raíz del estudio. El Recurso directo (正印) va con la acumulación paciente; el Recurso indirecto (偏印) absorbe rápido y de lado. Por encima de eso está la Estrella Literaria (文昌貴人), fijada por tu Amo del Día, que se lee como el astro propicio de la escritura, los exámenes y los documentos. Aprobar, eso sí, lo decide la preparación y no la carta.',
    },
  },
  ui: {
    empty: 'Pon tu fecha de nacimiento y tu sexo para leer solo este tema.',
    evidence: 'Lo que muestra aquí tu carta',
    reading: 'Lectura',
    background: 'Qué mira esta lectura',
    yes: 'Presente',
    no: 'Ausente',
    none: 'No aplica',
    strong: 'Fuerte (身强)',
    weak: 'Débil (身弱)',
    countOf: '{n}',
    nameLabel: 'Nombre (opcional)',
    namePh: 'p. ej. Lucía',
    nameNote: 'Tu nombre se queda en este navegador. Nunca va en la dirección ni se envía a ningún servidor.',
    metaTitle: '{topic} gratis — calculadora de BaZi',
    metaDescSuffix: 'Gratis, sin registro y calculado en tu navegador.',
    titleOf: '{topic} de {name}',
    introLead: 'En tu carta, {term} es {value}. Lee todo lo de abajo desde ahí.',
    otherTopics: 'Otros temas',
    backToAll: 'Ver la lectura completa de la carta',
  },
};
