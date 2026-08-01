import type { Checklist } from '../types.ts';

/**
 * 스페인어 체크리스트.
 *
 * 영어판 12종을 옮긴 것이다. 한국어 128종은 연말정산·전세사기처럼 한국 제도에
 * 묶인 항목이 많아 옮기지 않았지만([[lib/checklist-en.ts]] 주석), 이 12종은
 * 이사·해외여행·면접처럼 어디서나 같은 일이다.
 *
 * **id는 언어와 무관하게 같아야 한다** — 체크 상태를 id로 저장하기 때문에,
 * 바꾸면 언어를 옮길 때 체크가 날아간다.
 */
export const CHECKLISTS_ES: Checklist[] = [
  {
    slug: 'moving',
    title: 'Lista para la mudanza',
    desc: 'Desde el contrato hasta la primera semana en la casa nueva',
    icon: '📦',
    category: 'Casa y vida',
    sections: [
      {
        title: 'Gestiones y papeleo', icon: '📋',
        items: [
          { id: 'm01', text: 'Pide presupuesto a tres empresas de mudanzas como mínimo', note: 'Reserva con 2–3 semanas para el mejor precio' },
          { id: 'm02', text: 'Confirma la fecha de la mudanza y resérvala' },
          { id: 'm03', text: 'Avisa al casero por escrito', note: 'Mira el plazo de preaviso en el contrato' },
          { id: 'm04', text: 'Actualiza tu dirección en bancos, empresa y administración' },
          { id: 'm05', text: 'Solicita el reenvío del correo' },
          { id: 'm06', text: 'Acuerda la fecha y la forma de devolución de la fianza' },
          { id: 'm07', text: 'Fotografía la casa vieja antes de entregar las llaves', note: 'Las fotos con fecha zanjan las discusiones por la fianza' },
        ],
      },
      {
        title: 'Embalaje', icon: '📦',
        items: [
          { id: 'm08', text: 'Reúne cajas, cinta y material de relleno', note: 'Muchos supermercados regalan cajas' },
          { id: 'm09', text: 'Vende, dona o tira lo que no te vas a llevar' },
          { id: 'm10', text: 'Mete documentos y objetos de valor en una caja que lleves tú' },
          { id: 'm11', text: 'Desmonta los muebles y guarda los tornillos con cada pieza' },
          { id: 'm12', text: 'Etiqueta cada caja con el contenido y la habitación de destino' },
          { id: 'm13', text: 'Vacía la nevera y el congelador', note: 'Empieza a gastar lo congelado una semana antes' },
          { id: 'm14', text: 'Vacía la lavadora y pon los tornillos de transporte' },
          { id: 'm15', text: 'Prepara una bolsa para la primera noche: sábanas, toallas, cargadores, hervidor' },
        ],
      },
      {
        title: 'La casa nueva', icon: '🏠',
        items: [
          { id: 'm16', text: 'Revisa el estado de suelos, paredes e instalaciones' },
          { id: 'm17', text: 'Comprueba que agua, luz y gas están dados de alta' },
          { id: 'm18', text: 'Pide el traslado o la instalación de internet', note: 'Con una semana de antelación al menos: las citas se llenan' },
          { id: 'm19', text: 'Cambia la cerradura o los códigos de la puerta' },
          { id: 'm20', text: 'Anota las lecturas de los contadores el primer día' },
          { id: 'm21', text: 'Fotografía cualquier desperfecto antes de desembalar' },
        ],
      },
      {
        title: 'Después de instalarte', icon: '✅',
        items: [
          { id: 'm22', text: 'Empadrónate en el ayuntamiento' },
          { id: 'm23', text: 'Localiza la llave de paso, el cuadro eléctrico y el día de la basura' },
          { id: 'm24', text: 'Actualiza el carné de conducir y el permiso de circulación' },
          { id: 'm25', text: 'Prueba los detectores de humo y de monóxido de carbono' },
          { id: 'm26', text: 'Preséntate a los vecinos' },
        ],
      },
    ],
  },
  {
    slug: 'travel-abroad',
    title: 'Lista para viajar al extranjero',
    desc: 'Documentos, dinero, equipaje y lo que siempre se olvida',
    icon: '✈️',
    category: 'Viajes',
    sections: [
      {
        title: 'Antes de reservar', icon: '🗓️',
        items: [
          { id: 't01', text: 'Comprueba la caducidad del pasaporte', note: 'Muchos países exigen seis meses de validez desde la entrada' },
          { id: 't02', text: 'Mira si necesitas visado o autorización de viaje' },
          { id: 't03', text: 'Consulta las vacunas obligatorias o recomendadas' },
          { id: 't04', text: 'Lee las recomendaciones oficiales de viaje para ese país' },
          { id: 't05', text: 'Contrata un seguro de viaje que cubra asistencia médica' },
        ],
      },
      {
        title: 'Dinero y documentos', icon: '💳',
        items: [
          { id: 't06', text: 'Avisa al banco de que viajas, o comprueba que la tarjeta funciona fuera' },
          { id: 't07', text: 'Lleva una segunda tarjeta guardada aparte de la primera' },
          { id: 't08', text: 'Lleva algo de efectivo local para la llegada' },
          { id: 't09', text: 'Guarda copias del pasaporte, el seguro y las reservas sin conexión', note: 'Una foto en el móvil y una copia impresa' },
          { id: 't10', text: 'Mira las comisiones por pago en el extranjero antes de fiarlo todo a la tarjeta' },
        ],
      },
      {
        title: 'Equipaje', icon: '🎒',
        items: [
          { id: 't11', text: 'Comprueba la franquicia de equipaje de cada tramo' },
          { id: 't12', text: 'Lleva la medicación en el equipaje de mano y en su envase original' },
          { id: 't13', text: 'Adaptador de enchufe correcto y batería externa', note: 'Las baterías externas van siempre en cabina' },
          { id: 't14', text: 'Líquidos por debajo del límite de cabina y en bolsa transparente' },
          { id: 't15', text: 'Mete una muda en el equipaje de mano' },
        ],
      },
      {
        title: 'La víspera', icon: '⏰',
        items: [
          { id: 't16', text: 'Haz el check-in en línea y descarga la tarjeta de embarque' },
          { id: 't17', text: 'Confirma el transporte al aeropuerto y cuánto tarda' },
          { id: 't18', text: 'Descarga mapas sin conexión y un paquete de traducción' },
          { id: 't19', text: 'Pon el aviso de ausencia y deja tu itinerario a alguien' },
          { id: 't20', text: 'Vacía la nevera, saca la basura y desenchufa lo que puedas' },
        ],
      },
    ],
  },
  {
    slug: 'job-interview',
    title: 'Lista para una entrevista de trabajo',
    desc: 'La preparación y el seguimiento que de verdad cambian algo',
    icon: '💼',
    category: 'Trabajo y carrera',
    sections: [
      {
        title: 'Investigación', icon: '🔍',
        items: [
          { id: 'j01', text: 'Vuelve a leer la oferta y marca cada requisito' },
          { id: 'j02', text: 'Prepara un ejemplo concreto para cada requisito', note: 'Situación, qué hiciste, qué cambió' },
          { id: 'j03', text: 'Lee las últimas noticias, el producto y las cifras públicas de la empresa' },
          { id: 'j04', text: 'Averigua quién te entrevista y en qué trabaja' },
          { id: 'j05', text: 'Escribe tres preguntas que de verdad quieras que te respondan' },
        ],
      },
      {
        title: 'Preparación', icon: '📝',
        items: [
          { id: 'j06', text: 'Ensaya en voz alta tu presentación de dos minutos' },
          { id: 'j07', text: 'Prepara una respuesta honesta para tu mayor laguna' },
          { id: 'j08', text: 'Ten clara tu horquilla salarial y el mínimo que no vas a bajar' },
          { id: 'j09', text: 'Prueba el enlace de vídeo, la cámara, el micro y la luz', note: 'La víspera, no cinco minutos antes' },
          { id: 'j10', text: 'Planifica la ruta y añade 30 minutos de margen' },
        ],
      },
      {
        title: 'El día', icon: '🎯',
        items: [
          { id: 'j11', text: 'Lleva copias impresas del currículum y del porfolio' },
          { id: 'j12', text: 'Llega con tiempo para sentarte y respirar' },
          { id: 'j13', text: 'Pide que te aclaren la pregunta antes que adivinarla' },
          { id: 'j14', text: 'Toma notas — no es de mala educación, se lee como interés' },
          { id: 'j15', text: 'Pregunta cuál es el siguiente paso y los plazos' },
        ],
      },
      {
        title: 'Después', icon: '✉️',
        items: [
          { id: 'j16', text: 'Manda un breve mensaje de agradecimiento en 24 horas' },
          { id: 'j17', text: 'Anota las preguntas que se te atragantaron mientras las recuerdas' },
          { id: 'j18', text: 'Haz un seguimiento una vez si pasa el plazo que te dieron' },
        ],
      },
    ],
  },
  {
    slug: 'remote-work',
    title: 'Lista para montar el teletrabajo',
    desc: 'Una mesa, una rutina y unos límites que aguanten',
    icon: '🏡',
    category: 'Trabajo y carrera',
    sections: [
      {
        title: 'El montaje físico', icon: '🪑',
        items: [
          { id: 'r01', text: 'Sube la pantalla hasta la altura de los ojos', note: 'Una pila de libros va igual de bien que un soporte' },
          { id: 'r02', text: 'Silla a la altura en que los pies apoyan y los codos quedan cerca de 90°' },
          { id: 'r03', text: 'Pon una luz detrás de la cámara, no detrás de ti' },
          { id: 'r04', text: 'Usa teclado y ratón aparte si trabajas con un portátil' },
          { id: 'r05', text: 'Prueba el micrófono — el audio importa más que el vídeo' },
          { id: 'r06', text: 'Usa cable de red o siéntate cerca del router' },
        ],
      },
      {
        title: 'Rutina', icon: '⏰',
        items: [
          { id: 'r07', text: 'Fija una hora de inicio y otra de fin, y déjalas por escrito' },
          { id: 'r08', text: 'Mantén un sustituto del trayecto: un paseo antes y otro después' },
          { id: 'r09', text: 'Bloquea tiempo de concentración en el calendario para que no te lo coman' },
          { id: 'r10', text: 'Come de verdad, lejos de la mesa de trabajo' },
          { id: 'r11', text: 'Sal a la calle una vez con luz de día' },
        ],
      },
      {
        title: 'Trabajar con otros', icon: '💬',
        items: [
          { id: 'r12', text: 'Acordad en el equipo en cuánto tiempo se espera respuesta' },
          { id: 'r13', text: 'Comparte el avance más de la cuenta — la visibilidad sustituye a que te vean' },
          { id: 'r14', text: 'Pon tu horario en el calendario y en el estado' },
          { id: 'r15', text: 'Apaga las notificaciones fuera de ese horario' },
        ],
      },
    ],
  },
  {
    slug: 'gym-start',
    title: 'Lista para empezar en el gimnasio',
    desc: 'El primer mes, sin lesiones y sin abandonar',
    icon: '💪',
    category: 'Salud y forma física',
    sections: [
      {
        title: 'Antes de empezar', icon: '📋',
        items: [
          { id: 'g01', text: 'Decide cuántos días por semana puedes cumplir de verdad', note: 'Dos días sostenibles ganan a cinco que abandonas' },
          { id: 'g02', text: 'Elige un gimnasio que te pille de paso — la distancia mata la constancia' },
          { id: 'g03', text: 'Mira la permanencia y las condiciones de baja' },
          { id: 'g04', text: 'Pasa antes por el médico si tienes algo de corazón, articulaciones o tensión' },
          { id: 'g05', text: 'Hazte una foto y toma medidas al empezar, no solo el peso' },
        ],
      },
      {
        title: 'Equipo', icon: '👟',
        items: [
          { id: 'g06', text: 'Zapatillas de entrenamiento con suela plana y estable' },
          { id: 'g07', text: 'Ropa con la que puedas moverte y estar a gusto' },
          { id: 'g08', text: 'Botella de agua y una toalla pequeña' },
          { id: 'g09', text: 'Candado para la taquilla' },
        ],
      },
      {
        title: 'El primer mes', icon: '🏋️',
        items: [
          { id: 'g10', text: 'Aprende la técnica antes que la carga: reserva una sesión de iniciación' },
          { id: 'g11', text: 'Empieza más flojo de lo que te pide el ego', note: 'Cuatro días de agujetas significan que te pasaste' },
          { id: 'g12', text: 'Apunta cada sesión: qué, cuánto y cómo te fue' },
          { id: 'g13', text: 'Calienta cinco minutos antes y estira después' },
          { id: 'g14', text: 'Descansa al menos un día entero entre sesiones duras' },
          { id: 'g15', text: 'Come suficiente proteína y duerme bastante: el cambio ocurre ahí' },
        ],
      },
    ],
  },
  {
    slug: 'online-security',
    title: 'Lista de seguridad en internet',
    desc: 'La higiene de cuentas que de verdad evita un mal día',
    icon: '🔐',
    category: 'Digital',
    sections: [
      {
        title: 'Contraseñas', icon: '🔑',
        items: [
          { id: 's01', text: 'Instala un gestor de contraseñas y deja que las genere todas' },
          { id: 's02', text: 'Cambia cualquier contraseña repetida en más de un sitio', note: 'La repetición convierte una filtración en diez' },
          { id: 's03', text: 'Que la del correo sea la más fuerte que tengas' },
          { id: 's04', text: 'Comprueba tus direcciones en un servicio de aviso de filtraciones' },
        ],
      },
      {
        title: 'Doble factor', icon: '📱',
        items: [
          { id: 's05', text: 'Activa el doble factor en correo, banca y almacenamiento en la nube' },
          { id: 's06', text: 'Mejor una app de autenticación que un SMS', note: 'El duplicado de SIM se salta los códigos por SMS' },
          { id: 's07', text: 'Guarda los códigos de respaldo en algún sitio sin conexión' },
          { id: 's08', text: 'Registra un segundo dispositivo para que perder el móvil no te deje fuera' },
        ],
      },
      {
        title: 'Dispositivos y cuentas', icon: '💻',
        items: [
          { id: 's09', text: 'Activa las actualizaciones automáticas del sistema y del navegador' },
          { id: 's10', text: 'Activa el cifrado del disco y el bloqueo de pantalla' },
          { id: 's11', text: 'Revisa qué aplicaciones tienen acceso a tu cuenta de Google o Apple' },
          { id: 's12', text: 'Quita los dispositivos y las sesiones que ya no uses' },
          { id: 's13', text: 'Configura la localización y el borrado remoto del dispositivo' },
        ],
      },
      {
        title: 'Costumbres', icon: '🧠',
        items: [
          { id: 's14', text: 'Escribe tú la dirección para cualquier cosa que implique dinero' },
          { id: 's15', text: 'Trata la urgencia de un mensaje como la señal de alarma que suele ser' },
          { id: 's16', text: 'Haz copias en un sitio al que el ordenador no llegue solo', note: 'El ransomware cifra también los discos conectados' },
        ],
      },
    ],
  },
  {
    slug: 'new-laptop',
    title: 'Lista para configurar un ordenador nuevo',
    desc: 'Hazlo bien una vez en vez de ir arreglándolo durante un mes',
    icon: '💻',
    category: 'Digital',
    sections: [
      {
        title: 'La primera hora', icon: '⚡',
        items: [
          { id: 'n01', text: 'Pasa todas las actualizaciones del sistema antes que nada' },
          { id: 'n02', text: 'Crea una cuenta sin permisos de administrador para el día a día, si puedes' },
          { id: 'n03', text: 'Activa el cifrado del disco' },
          { id: 'n04', text: 'Pon bloqueo de pantalla con un tiempo de espera corto' },
          { id: 'n05', text: 'Entra primero en el gestor de contraseñas: lo demás lo necesita' },
        ],
      },
      {
        title: 'Migración', icon: '📁',
        items: [
          { id: 'n06', text: 'Verifica la copia de seguridad del equipo viejo antes de borrar nada' },
          { id: 'n07', text: 'Traslada archivos a conciencia en vez de clonar el desorden' },
          { id: 'n08', text: 'Desautoriza el equipo viejo en el software con licencia' },
          { id: 'n09', text: 'Exporta los marcadores del navegador y los datos locales de las aplicaciones' },
        ],
      },
      {
        title: 'Configuración', icon: '⚙️',
        items: [
          { id: 'n10', text: 'Instala solo lo que de verdad usabas en el equipo anterior' },
          { id: 'n11', text: 'Activa la sincronización en la nube para los documentos' },
          { id: 'n12', text: 'Configura copias automáticas y prueba una restauración', note: 'Una copia que nunca has restaurado es una suposición' },
          { id: 'n13', text: 'Ajusta el escalado de pantalla, la repetición de teclas y el trackpad a tu gusto' },
          { id: 'n14', text: 'Apunta el número de serie y registra la garantía' },
        ],
      },
    ],
  },
  {
    slug: 'camping',
    title: 'Lista para ir de acampada',
    desc: 'Refugio, abrigo, comida y los detalles que arruinan una salida',
    icon: '🏕️',
    category: 'Viajes',
    sections: [
      {
        title: 'Refugio y descanso', icon: '⛺',
        items: [
          { id: 'c01', text: 'Monta la tienda en casa una vez antes de salir', note: 'Mejor encontrar la varilla que falta en el jardín que al anochecer' },
          { id: 'c02', text: 'Saco de dormir con temperatura adecuada a la mínima real de la noche' },
          { id: 'c03', text: 'Esterilla — el frío entra por abajo' },
          { id: 'c04', text: 'Piquetas, vientos y un mazo' },
          { id: 'c05', text: 'Lona o suelo protector para debajo de la tienda' },
        ],
      },
      {
        title: 'Cocina y agua', icon: '🍳',
        items: [
          { id: 'c06', text: 'Hornillo, combustible y mechero, más cerillas de repuesto' },
          { id: 'c07', text: 'Cazo, taza, plato, cubiertos y un cuchillo que corte' },
          { id: 'c08', text: 'Bidones de agua y forma de potabilizarla si hace falta' },
          { id: 'c09', text: 'Nevera portátil y acumuladores de frío para los dos primeros días' },
          { id: 'c10', text: 'Bolsas de basura: lo que entra contigo, sale contigo' },
        ],
      },
      {
        title: 'Ropa y seguridad', icon: '🧥',
        items: [
          { id: 'c11', text: 'Capas, incluida una prenda de abrigo más de lo que crees' },
          { id: 'c12', text: 'Chubasquero, diga lo que diga el pronóstico' },
          { id: 'c13', text: 'Linterna frontal y pilas de repuesto' },
          { id: 'c14', text: 'Botiquín, analgésicos y tu medicación habitual' },
          { id: 'c15', text: 'Batería externa y un mapa sin conexión', note: 'Da por hecho que no habrá cobertura' },
          { id: 'c16', text: 'Dile a alguien adónde vas y cuándo vuelves' },
        ],
      },
    ],
  },
  {
    slug: 'sleep-better',
    title: 'Lista para dormir mejor',
    desc: 'Los cambios que tienen pruebas de verdad detrás',
    icon: '😴',
    category: 'Salud y forma física',
    sections: [
      {
        title: 'Horarios', icon: '⏰',
        items: [
          { id: 'b01', text: 'Levántate a la misma hora todos los días, fines de semana incluidos', note: 'La hora de levantarse ancla el ritmo más que la de acostarse' },
          { id: 'b02', text: 'Toma luz natural en la primera hora tras despertarte' },
          { id: 'b03', text: 'Deja la cafeína 8–10 horas antes de acostarte' },
          { id: 'b04', text: 'Siestas de menos de 30 minutos y antes de media tarde' },
        ],
      },
      {
        title: 'Entorno', icon: '🛏️',
        items: [
          { id: 'b05', text: 'Deja la habitación bien a oscuras' },
          { id: 'b06', text: 'Mantenla fresca: unos 18 °C le va bien a casi todo el mundo' },
          { id: 'b07', text: 'Aleja el cargador del móvil de donde alcanzas con el brazo' },
          { id: 'b08', text: 'Usa la cama solo para dormir, no para trabajar' },
        ],
      },
      {
        title: 'Antes de acostarte', icon: '🌙',
        items: [
          { id: 'b09', text: 'Baja las luces una hora antes' },
          { id: 'b10', text: 'No uses el alcohol para dormir: fragmenta la segunda mitad de la noche' },
          { id: 'b11', text: 'Apunta la lista de mañana para dejar de repasarla mentalmente' },
          { id: 'b12', text: 'Si llevas 20 minutos despierto, levántate y haz algo aburrido con poca luz' },
        ],
      },
    ],
  },
  {
    slug: 'wedding',
    title: 'Lista para organizar la boda',
    desc: 'De doce meses antes hasta el día en sí',
    icon: '💍',
    category: 'Eventos',
    sections: [
      {
        title: 'De 12 a 9 meses antes', icon: '📅',
        items: [
          { id: 'w01', text: 'Acordad el presupuesto total y quién aporta qué' },
          { id: 'w02', text: 'Haced un borrador de la lista de invitados: de ahí sale todo el gasto' },
          { id: 'w03', text: 'Reservad el sitio y cerrad la fecha' },
          { id: 'w04', text: 'Reservad al oficiante o el registro civil' },
          { id: 'w05', text: 'Reservad fotógrafo y grupo o DJ', note: 'Son los que se llenan con más antelación' },
        ],
      },
      {
        title: 'De 9 a 3 meses antes', icon: '📋',
        items: [
          { id: 'w06', text: 'Encargad la ropa y fijad las pruebas' },
          { id: 'w07', text: 'Confirmad el catering y haced una degustación' },
          { id: 'w08', text: 'Enviad las invitaciones con fecha límite de confirmación' },
          { id: 'w09', text: 'Resolved el papeleo legal y los trámites de cambio de apellido si los hay' },
          { id: 'w10', text: 'Organizad transporte y bloques de alojamiento para los invitados' },
        ],
      },
      {
        title: 'El último mes', icon: '⏳',
        items: [
          { id: 'w11', text: 'Dad el número definitivo al catering' },
          { id: 'w12', text: 'Escribid el orden del día y compartidlo con todos los proveedores' },
          { id: 'w13', text: 'Encargad a alguien los anillos, los documentos y los pagos' },
          { id: 'w14', text: 'Confirmad por escrito la hora de llegada de cada uno' },
          { id: 'w15', text: 'Preparad un plan de lluvia si hay algo al aire libre' },
        ],
      },
      {
        title: 'El día', icon: '💐',
        items: [
          { id: 'w16', text: 'Desayunad — en serio, se olvida' },
          { id: 'w17', text: 'Kit de emergencia: imperdibles, tiritas, quitamanchas, analgésicos' },
          { id: 'w18', text: 'Dadle el móvil a otra persona' },
          { id: 'w19', text: 'Sacad diez minutos a solas los dos durante el día' },
        ],
      },
    ],
  },
  {
    slug: 'language-learning',
    title: 'Lista para aprender un idioma',
    desc: 'Móntalo de forma que dentro de tres meses sigas',
    icon: '🗣️',
    category: 'Aprendizaje',
    sections: [
      {
        title: 'Para empezar', icon: '🎯',
        items: [
          { id: 'l01', text: 'Escribe para qué: la situación concreta que quieres poder resolver' },
          { id: 'l02', text: 'Fija un mínimo diario tan pequeño que nunca lo saltes', note: 'Diez minutos de verdad ganan a una hora heroica dos veces' },
          { id: 'l03', text: 'Elige un curso principal y deja de buscar otros' },
          { id: 'l04', text: 'Aprende los sonidos antes de amontonar vocabulario' },
        ],
      },
      {
        title: 'Práctica diaria', icon: '📚',
        items: [
          { id: 'l05', text: 'Usa repetición espaciada para el vocabulario' },
          { id: 'l06', text: 'Aprende palabras dentro de frases, no en parejas sueltas' },
          { id: 'l07', text: 'Escucha algo cada día, aunque sea de fondo' },
          { id: 'l08', text: 'Habla en voz alta desde la primera semana' },
          { id: 'l09', text: 'Ve anotando las palabras que te hicieron falta y no tenías' },
        ],
      },
      {
        title: 'Que no se caiga', icon: '🌱',
        items: [
          { id: 'l10', text: 'Busca un compañero de conversación o un profesor fijo' },
          { id: 'l11', text: 'Cambia al idioma algo que ya consumes' },
          { id: 'l12', text: 'Cuenta días seguidos, no horas' },
          { id: 'l13', text: 'Cuenta con un estancamiento en el nivel intermedio y planifica para atravesarlo' },
        ],
      },
    ],
  },
  {
    slug: 'declutter',
    title: 'Lista para ordenar y despejar',
    desc: 'Una pasada por habitaciones que no se atasca a la mitad',
    icon: '🧹',
    category: 'Casa y vida',
    sections: [
      {
        title: 'Antes de empezar', icon: '📦',
        items: [
          { id: 'd01', text: 'Prepara cuatro cajas: quedarme, donar, vender, tirar' },
          { id: 'd02', text: 'Reserva ya la cita para llevarlo a la ONG o para que lo recojan', note: 'Las bolsas que se quedan en el recibidor acaban vaciándose otra vez' },
          { id: 'd03', text: 'Empieza por un cajón, no por la casa entera' },
          { id: 'd04', text: 'Trabaja por categorías más que por habitaciones cuando puedas' },
        ],
      },
      {
        title: 'Habitación por habitación', icon: '🏠',
        items: [
          { id: 'd05', text: 'Armario: lo que no te has puesto en un año' },
          { id: 'd06', text: 'Cocina: utensilios repetidos y todo lo caducado' },
          { id: 'd07', text: 'Baño: medicamentos viejos y cosmética pasada' },
          { id: 'd08', text: 'Cables y cargadores que ya no cargan nada' },
          { id: 'd09', text: 'Papeles: escanea lo necesario y destruye el resto' },
          { id: 'd10', text: 'El cajón donde acaba todo' },
        ],
      },
      {
        title: 'Mantenerlo así', icon: '✅',
        items: [
          { id: 'd11', text: 'Entra uno, sale uno con ropa y con cosas de cocina' },
          { id: 'd12', text: 'Dale un sitio fijo a cada categoría' },
          { id: 'd13', text: 'Haz un repaso de diez minutos al final del día' },
          { id: 'd14', text: 'Ponte 24 horas de espera para las compras no imprescindibles' },
        ],
      },
    ],
  },
];

export const CHECKLISTS_ES_MAP: Record<string, Checklist> = Object.fromEntries(
  CHECKLISTS_ES.map(c => [c.slug, c]),
);
