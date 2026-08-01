import type { MatchCopy } from './types.ts';

/** 스페인어 궁합 문구 */
export const ES: MatchCopy = {
  zodiac: {
    yukhap: {
      label: 'Pareja perfecta (Seis Armonías)', headline: 'La combinación que se atrae',
      reason: 'En el horóscopo chino estos dos forman una pareja de Seis Armonías: la combinación clásica, en la que cada uno cubre lo que al otro le falta.',
      love: 'La atracción es fácil y estar juntos resulta natural. Se acomodan el uno al otro sin esfuerzo.',
      advice: 'Cuando encaja tan bien, es fácil darlo por hecho. Lo que lo sostiene son los gestos pequeños y constantes.',
    },
    samhap: {
      label: 'Gran combinación (Tres Armonías)', headline: 'Del mismo trío: simplemente se llevan bien',
      reason: 'Estos dos pertenecen al mismo grupo de Tres Armonías, un trío que la tradición lee como naturalmente afín en su manera de ver las cosas.',
      love: 'Sus valores coinciden, y eso hace de esta una buena combinación a largo plazo. Acaban siendo tan cómodos como amigos.',
      advice: 'Cuanto más fácil es el vínculo, más importan las formas. No dejen que la confianza se vuelva descuido.',
    },
    same: {
      label: 'Espejo', headline: 'Lo bastante parecidos para llevarse bien y para chocar',
      reason: 'Mismo signo, así que sus temperamentos corren parecidos. Se entienden bien y tropiezan con las mismas cosas.',
      love: 'Habrá muchos momentos en que no haga falta decir nada. Eso sí, puede que compartan el mismo punto ciego.',
      advice: 'Disfruten lo que comparten y acuerden cubrirse donde ambos flojean.',
    },
    neutral: {
      label: 'Combinación estable', headline: 'Bien mientras se encuentren a mitad de camino',
      reason: 'Aquí no hay una relación tradicional especial, que es donde está la mayoría de las parejas. Todo depende de cómo se traten.',
      love: 'Puede parecer sosa al principio y luego ir gustando. Se profundiza si no racionan el cariño.',
      advice: 'Digan en voz alta lo que esperan. Igualar el ritmo lo es todo.',
    },
    clash: {
      label: 'Requiere trabajo', headline: 'Signos opuestos: la fricción llega sola',
      reason: 'Estos están justo enfrentados en el ciclo, una pareja de choque. Habrá roces, pero también mucho que aprender de la diferencia.',
      love: 'Puede que discutan al principio. Si aceptan las diferencias, se convierten en una pareja que se hace crecer.',
      advice: 'La clave es no leer «diferente» como «equivocado». Un paso cada uno y el choque se vuelve química.',
    },
  },
  star: {
    'same-element': {
      label: 'Pareja perfecta (mismo elemento)', headline: 'La misma longitud de onda: hablar es fácil',
      reason: 'Ambos signos comparten elemento, así que reciben el mundo de la misma manera y se entienden rápido.',
      love: 'El terreno común es amplio y la conversación fluye. Va cómodo, con poca fricción.',
      advice: 'Parecerse tanto puede volverse acomodo. Busquen a propósito experiencias nuevas juntos.',
    },
    complement: {
      label: 'Gran combinación (elementos complementarios)', headline: 'Se levantan mutuamente',
      reason: 'Estos elementos se complementan (fuego↔aire, tierra↔agua): cada uno aporta lo que al otro le escasea.',
      love: 'Uno pone el calor y el otro la calma. Son a la vez estímulo y descanso el uno para el otro.',
      advice: 'La diferencia es el atractivo. Disfruten su manera de hacer las cosas en lugar de intentar cambiarla.',
    },
    'same-sign': {
      label: 'Espejo', headline: 'Lo bastante parecidos para llevarse bien, defectos incluidos',
      reason: 'Mismo signo, mismo temperamento. Cómodo, pero puede que compartan el punto ciego y tengan que cubrirse.',
      love: 'Gustos y ritmos coinciden, así que es fácil desde el principio. Solo que quizá sean torpes en los mismos sitios.',
      advice: 'Disfruten lo que comparten y acuerden de antemano quién cubre lo que a ninguno se le da bien.',
    },
    challenge: {
      label: 'Requiere trabajo', headline: 'Elementos distintos: hay que encontrarse en medio',
      reason: 'Elementos distintos pueden rozar al principio. Pero cuanto más lejos empiezan, más hay que aprender del otro.',
      love: 'Puede que discutan al principio. Respeten la diferencia y se convierte en la clase de relación que dura.',
      advice: 'No lean «diferente» como «equivocado». Un paso hacia el otro y la fricción se vuelve química.',
    },
  },
  mbti: {
    best: {
      label: 'Pareja perfecta', headline: 'Ven las cosas igual y se completan',
      reason: '',
      love: 'Los valores y la conversación coinciden, así que es tranquilo y emocionante a la vez. Se vuelven el sitio donde el otro aterriza.',
      advice: 'Cuando encaja tan bien, es fácil darlo por hecho. Lo que lo sostiene son los gestos pequeños y constantes.',
    },
    good: {
      label: 'Buena combinación', headline: 'La conversación sale sola',
      reason: '',
      love: 'Coinciden en muchas cosas, y eso hace divertido hablar. Las diferencias se leen como refrescantes, no como problema.',
      advice: 'Disfruten lo que comparten y acepten las diferencias en lugar de corregirlas.',
    },
    ok: {
      label: 'Combinación estable', headline: 'Suficiente si se encuentran a mitad de camino',
      reason: '',
      love: 'Necesita algún ajuste al principio y luego va gustando cuanto más se conocen.',
      advice: 'Digan sus expectativas con claridad y los malentendidos bajan. Igualar el ritmo lo es todo.',
    },
    work: {
      label: 'Requiere trabajo', headline: 'Bastante distintos, así que hay mucho que aprender',
      reason: '',
      love: 'Hay muchas diferencias, así que habrá roces al principio. Respétenlas y crecen juntos.',
      advice: 'Léanlo como «diferente», no como «equivocado». Un paso hacia el otro y la fricción se vuelve química.',
    },
  },
  axis: {
    nsSame: 'Reciben el mundo de la misma manera (N/S), así que la conversación aterriza',
    nsDiff: 'Reciben el mundo de forma distinta (N/S), así que sus perspectivas pueden separarse',
    tfSame: 'Su base para decidir (T/F) también se parece, lo que hace fluidas las elecciones',
    tfDiff: 'Su base para decidir (T/F) es distinta, lo que genera fricción pero también equilibrio',
    eiDiff: 'Su energía corre en direcciones opuestas (E/I), así que se recargan el ritmo mutuamente',
    jpDiff: 'Viven de manera distinta (J/P), mezclando flexibilidad con planificación',
    join: '. ', end: '.',
  },
  blood: {
    'A-A': {
      label: 'Tranquilo y estable', headline: 'Dos personas que se leen con facilidad',
      reason: 'Los dos son atentos y considerados, así que captan rápido el ánimo del otro. Funciona sin grandes conflictos.',
      love: 'Un romance cuidadoso que se hace más hondo con el tiempo. Dura si no racionan el cariño.',
      advice: 'Los dos tienden a tragarse las cosas. Digan lo que dolió cuando pasa, en lugar de guardarlo.',
    },
    'A-B': {
      label: 'Los opuestos se atraen', headline: 'Atraídos por lo que el otro tiene',
      reason: 'El cuidadoso A y el libre B son personas bastante distintas. Al principio esa diferencia se lee como una atracción fresca.',
      love: 'Uno pone la planificación y el otro la espontaneidad: rara vez se aburren.',
      advice: 'Funciona si A no lee la libertad de B como amenaza, y B no lee el cuidado de A como reproche.',
    },
    'A-O': {
      label: 'Combinación sólida', headline: 'El O relajado hace sitio al A minucioso',
      reason: 'El generoso O envuelve con comodidad al detallista A. Cada uno cubre lo que al otro le falta.',
      love: 'O lleva la iniciativa, A cuida los detalles, y el conjunto se asienta.',
      advice: 'O no debería dejar pasar las señales pequeñas de A; A puede apoyarse un poco más en O.',
    },
    'A-AB': {
      label: 'En sintonía silenciosa', headline: 'Dos personas sensibles que se entienden',
      reason: 'Los dos son sensibles y de mundo interior, así que reconocen lo que el otro siente de verdad.',
      love: 'Un romance sereno, con muchos momentos que no hace falta explicar.',
      advice: 'Va mejor si A no analiza de más el lado más difícil de definir de AB.',
    },
    'B-B': {
      label: 'Espíritus libres', headline: 'Dos personas que respetan el espacio del otro',
      reason: 'Los dos tienen un yo fuerte y detestan sentirse atados. Si reconocen el mundo del otro, se está cómodo.',
      love: 'Un romance relajado en el que cada uno hace lo suyo y aun así vuelven.',
      advice: 'Disfruten la libertad, pero sigan diciendo las cosas para que no derive en indiferencia.',
    },
    'B-O': {
      label: 'Mucha energía', headline: 'Estar juntos es sencillamente divertido',
      reason: 'El libre B y el sociable O mantienen el ánimo animado. Juegan bien juntos y hablan con facilidad.',
      love: 'Una pareja activa a la que le gusta hacer cosas más que quedarse quieta.',
      advice: 'Los dos empujan fuerte, así que chocarán a veces. Un paso cada uno y son una pareja formidable.',
    },
    'B-AB': {
      label: 'Chispa asegurada', headline: 'Dos originales a los que no se les acaban las ideas',
      reason: 'El libre B y el inventivo AB se rebotan ideas. Las rarezas del otro les hacen gracia.',
      love: 'Un romance con carácter propio, hecho enteramente a su manera.',
      advice: 'Los dos pueden ser cambiantes, así que fijen bien los planes que de verdad importan.',
    },
    'O-O': {
      label: 'Hablan claro', headline: 'Sinceros, cálidos y rápidos para pasar página',
      reason: 'Los dos son de miras amplias y directos, sin nada quedándose a fuego lento. Lo dicen y ahí se acaba.',
      love: 'Expresarse directamente reduce los malentendidos, y aquí no hay medias tintas.',
      advice: 'A ninguno le gusta perder. Sáltense los pulsos de orgullo y son una pareja de fiar.',
    },
    'O-AB': {
      label: 'Complementarios', headline: 'Calidez y cabeza clara juntas',
      reason: 'El sociable O y el racional AB rellenan los huecos del otro. El equilibrio se sostiene bien.',
      love: 'El calor de O y la cabeza fría de AB les dan estabilidad y estímulo a la vez.',
      advice: 'Dura mientras O no se tome como algo personal la necesidad de distancia de AB.',
    },
    'AB-AB': {
      label: 'Sintonía poco común', headline: 'Dos personas inusuales que se reconocen',
      reason: 'Los dos son originales y difíciles de prever: a los demás puede costarles, pero entre ustedes se siguen sin esfuerzo.',
      love: 'Una relación que funciona con un código que solo ustedes dos leen.',
      advice: 'Los dos pueden oscilar emocionalmente. Aclaren los malentendidos a menudo, hablando claro.',
    },
  },
  ui: {
    pickBoth: 'Elige ambos lados para ver el resultado',
    you: 'Tú', partner: 'La otra persona',
    score: 'Compatibilidad',
    why: 'Por qué',
    love: 'En pareja',
    advice: 'Consejo',
    reset: 'Empezar de nuevo',
    disclaimer: 'La compatibilidad aquí sigue reglas tradicionales y es un entretenimiento. Lo que decide de verdad una relación es cómo se tratan dos personas.',
  },
};
