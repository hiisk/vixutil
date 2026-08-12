// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ImageTool } from './image-tools.ts';
import { IMAGE_TOOLS } from './image-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { relatedBySlug } from './related-window.ts';

/**
 * 이미지 도구(/image) 섹션의 번역 메타데이터.
 *
 * time·color와 같은 방침 — slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는
 * 문구만 갈아 끼운다. slug를 공유해야 hreflang이 여덟 언어를 짝지을 수 있다.
 *
 * 이 섹션의 판매 포인트는 "사진이 브라우저를 떠나지 않는다"는 점이다. 사진을
 * 서버로 올리는 무료 도구가 흔하니 어느 언어에서도 이 이야기를 앞세운다.
 */
export type ImageIntlLang = Exclude<AnyLocale10, 'ko'>;

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<ImageIntlLang, Record<string, ToolCopy>> = {
  en: {
    compress: {
      title: 'Image Compressor', desc: 'Shrink a photo file by trading off quality', category: 'Size',
      metaTitle: 'Image Compressor — Reduce Photo File Size Free',
      long: 'For when an attachment is over the size limit. Lower the quality step by step, compare the original and the result side by side, and see exactly what percentage you saved. Your photo is processed inside the browser and never uploaded.',
      features: ['Quality slider to set compression', 'Saving shown as a percentage instantly', 'Original and result side by side', 'Save as JPG or WebP'],
    },
    resize: {
      title: 'Image Resizer', desc: 'Change width and height to any pixel size', category: 'Size',
      metaTitle: 'Image Resizer — Change Photo Dimensions in Pixels',
      long: 'Type the width and height directly or scale by percentage, and lock the aspect ratio so the photo does not stretch. Common sizes — Instagram posts, YouTube thumbnails, profile pictures — are one button away.',
      features: ['Enter pixels or scale by percentage', 'Lock the aspect ratio', 'Presets for common sizes', 'Preview the resulting file size'],
    },
    convert: {
      title: 'Image Format Converter', desc: 'Convert between JPG, PNG and WebP', category: 'Size',
      metaTitle: 'Image Converter — JPG, PNG and WebP Both Ways',
      long: 'For uploading somewhere that will not take WebP, or the other way round when you want a smaller file. A PNG with a transparent background gets that background filled when it becomes a JPG, so you can pick the fill colour too.',
      features: ['JPG, PNG and WebP in any direction', 'Quality control for lossy formats', 'Choose the colour that fills transparency', 'Before and after file size'],
    },
    crop: {
      title: 'Image Cropper', desc: 'Keep only the part you need', category: 'Edit',
      metaTitle: 'Image Cropper — Crop a Photo to Any Area or Ratio',
      long: 'Drag over the photo to keep only the part you want. Lock to 1:1, 16:9 or a profile ratio to match a spec, or leave it free and take whatever shape you like.',
      features: ['Drag to set the crop area', 'Lock to 1:1, 4:3, 16:9 and more', 'Cropped size shown live', 'Saved at the original quality'],
    },
    rotate: {
      title: 'Rotate and Flip Image', desc: 'Straighten a sideways photo, mirror it left to right', category: 'Edit',
      metaTitle: 'Rotate and Flip Image — Turn a Photo, Mirror It',
      long: 'Turn a photo that saved sideways back upright in 90° steps, and undo a mirrored selfie with a horizontal flip. You can also nudge the angle one degree at a time to level a horizon.',
      features: ['Rotate 90° left or right', 'Flip horizontally or vertically', 'Fine angle adjustment by 1°', 'Pick the colour that fills the corners'],
    },
    mosaic: {
      title: 'Photo Blur and Pixelate', desc: 'Brush over faces or addresses to hide them', category: 'Edit',
      metaTitle: 'Blur or Pixelate a Photo — Hide Faces and Personal Details',
      long: 'Brush with a finger or the mouse over anything you need hidden — an address in a marketplace photo, someone else’s face in a group shot — and only that spot gets pixelated. Nothing is uploaded, so screens holding personal details are safe to work on.',
      features: ['Pixelate only where you brush', 'Adjustable brush size', 'Cover completely in solid black', 'Undo just the part you got wrong'],
    },
    merge: {
      title: 'Combine Images', desc: 'Join several photos into one, vertically or side by side', category: 'Edit',
      metaTitle: 'Combine Images — Merge Several Photos Into One',
      long: 'For stitching chat screenshots into a single image, or putting a before and after next to each other. Photos of different widths are aligned for you, and you can set the gap between them and the background colour.',
      features: ['Vertical or horizontal', 'Different widths aligned automatically', 'Set the gap and background colour', 'Reorder the photos'],
    },
    palette: {
      title: 'Image Colour Extractor', desc: 'Pull the dominant colours out of a photo as HEX', category: 'Analyse',
      metaTitle: 'Image Colour Extractor — Get HEX Codes From a Photo',
      long: 'When you want to reuse the mood of a photo you like, this pulls out the colours it uses most and gives you the HEX and RGB codes. Tap anywhere on the photo and you get the colour at that exact point.',
      features: ['Dominant colour palette extracted for you', 'Share of the image per colour', 'Eyedropper for any point you pick', 'One click to copy a HEX code'],
    },
    watermark: {
      title: "Add a Watermark", desc: "Lay a text watermark over your photo", category: "Edit",
      metaTitle: "Add a Watermark — Put Text Over a Photo",
      long: "Puts a text watermark on your photo. You choose the position, size, opacity and colour, and you can repeat it diagonally across the whole image so it cannot simply be cropped off. The photo is processed inside your browser and never uploaded.",
      features: ["Nine positions to choose from", "Repeat diagonally across the photo", "Adjust size, opacity and colour", "Text scales with the photo size"],
    },
    adjust: {
      title: "Adjust a Photo", desc: "Tune brightness, contrast, saturation and more", category: "Edit",
      metaTitle: "Adjust a Photo — Brightness, Contrast, Saturation, Black and White",
      long: "Tune brightness, contrast and saturation, or turn the photo black and white or sepia. Tap one of six presets to apply it at once, or set each slider yourself. The original is left alone and only the result is saved.",
      features: ["Brightness, contrast, saturation, mono, sepia, blur", "Six presets to start from", "Set each slider yourself", "Reset everything in one tap"],
    },
    frame: {
      title: "Add a Border", desc: "Pad a photo out to a square or a tall ratio", category: "Edit",
      metaTitle: "Add a Border — Fit a Photo to a Square or 4:5 Ratio",
      long: "Adds padding around a photo so it fits a square, 4:5 or another ratio. Use it when a tall photo would otherwise get cropped on Instagram. The photo itself is never enlarged — only padding is added, so nothing is lost to resampling.",
      features: ["1:1, 4:5, 3:4, 16:9 and 9:16 ratios", "Adjustable border thickness and colour", "The photo is never enlarged", "The photo always sits centred"],
    },
    round: {
      title: "Round the Corners", desc: "Round off a photo for a profile picture", category: "Edit",
      metaTitle: "Round the Corners — Crop a Photo into a Circle for a Profile",
      long: "Rounds off the corners of a photo. At 100% it becomes a full circle, ready to use as a profile picture. The area outside the rounding has to be transparent, so the result is always saved as a PNG.",
      features: ["Roundness from 0 to 100%", "A full circle at 100%", "Crop to a square first", "Saved as a transparent PNG"],
    },
    split: {
      title: "Split a Photo", desc: "Cut a photo into a grid for an Instagram feed", category: "Edit",
      metaTitle: "Split a Photo — Cut Into a Grid for an Instagram Feed",
      long: "Cuts a photo into a grid of separate images. Useful for hanging one large picture across an Instagram profile. When the size does not divide evenly the leftover pixels are handed out one per tile, so putting the pieces back together gives you exactly the original size.",
      features: ["2×1, 3×1, 2×2, 3×3, 1×2 and 1×3 grids", "Numbered left to right, top row first", "Save one piece or all of them", "Reassembles to the exact original size"],
    },
    favicon: {
      title: "Favicon Generator", desc: "One image, every icon size a site needs", category: "Size",
      metaTitle: "Favicon Generator — Browser Tab, iOS and Android Icons at Once",
      long: "Upload one image and it produces the browser-tab icons (16, 32, 48), the iOS home screen icon (180) and the Android web app icons (192, 512) in one go. It also gives you the lines to paste into your head tag and the contents of site.webmanifest, and the filenames in those match the files it actually made.",
      features: ["The six sizes each platform actually looks for", "Head tags and manifest included", "Non-square images are cropped from the centre", "Saved as transparent PNG"],
    },
  },

  es: {
    compress: {
      title: 'Comprimir imagen', desc: 'Reduce el peso de una foto bajando la calidad', category: 'Tamaño',
      metaTitle: 'Comprimir imagen — Reducir el peso de una foto gratis',
      long: 'Para cuando el archivo adjunto pasa del límite. Baja la calidad paso a paso, compara el original con el resultado lado a lado y mira exactamente qué porcentaje has ahorrado. La foto se procesa dentro del navegador y no se sube a ningún sitio.',
      features: ['Control de calidad para fijar la compresión', 'El ahorro en porcentaje al instante', 'Original y resultado lado a lado', 'Guardar en JPG o WebP'],
    },
    resize: {
      title: 'Redimensionar imagen', desc: 'Cambia el ancho y el alto a los píxeles que quieras', category: 'Tamaño',
      metaTitle: 'Redimensionar imagen — Cambiar el tamaño de una foto en píxeles',
      long: 'Escribe el ancho y el alto directamente o reduce por porcentaje, y bloquea la proporción para que la foto no se deforme. Los tamaños de siempre — publicación de Instagram, miniatura de YouTube, foto de perfil — están a un botón.',
      features: ['Escribe píxeles o reduce por porcentaje', 'Bloquea la proporción', 'Ajustes para los tamaños más usados', 'Vista previa del peso resultante'],
    },
    convert: {
      title: 'Convertir formato de imagen', desc: 'Pasa de JPG a PNG o WebP y al contrario', category: 'Tamaño',
      metaTitle: 'Convertir imagen — JPG, PNG y WebP en los dos sentidos',
      long: 'Para subir algo a un sitio que no acepta WebP, o al contrario cuando lo que quieres es un archivo más ligero. Un PNG con fondo transparente pierde esa transparencia al pasar a JPG, así que aquí eliges con qué color se rellena.',
      features: ['JPG, PNG y WebP en cualquier dirección', 'Control de calidad en los formatos con pérdida', 'Elige el color que rellena la transparencia', 'Peso antes y después'],
    },
    crop: {
      title: 'Recortar imagen', desc: 'Deja solo la parte que necesitas', category: 'Editar',
      metaTitle: 'Recortar imagen — Recortar una foto por área o proporción',
      long: 'Arrastra sobre la foto para quedarte solo con lo que te interesa. Bloquea 1:1, 16:9 o una proporción de perfil si tienes que cumplir una medida, o déjalo libre y recorta como quieras.',
      features: ['Arrastra para fijar el área de recorte', 'Bloquea 1:1, 4:3, 16:9 y más', 'El tamaño recortado se ve en vivo', 'Se guarda con la calidad original'],
    },
    rotate: {
      title: 'Girar y voltear imagen', desc: 'Endereza una foto tumbada, refléjala en espejo', category: 'Editar',
      metaTitle: 'Girar y voltear imagen — Rotar una foto, reflejarla',
      long: 'Endereza en pasos de 90° una foto que se guardó tumbada, y deshaz el efecto espejo de un selfie con un volteo horizontal. También puedes mover el ángulo de grado en grado para nivelar un horizonte.',
      features: ['Girar 90° a izquierda o derecha', 'Voltear en horizontal o vertical', 'Ajuste fino del ángulo de 1 en 1', 'Elige el color que rellena las esquinas'],
    },
    mosaic: {
      title: 'Pixelar y difuminar foto', desc: 'Pinta sobre caras o direcciones para taparlas', category: 'Editar',
      metaTitle: 'Pixelar una foto — Tapar caras y datos personales',
      long: 'Pinta con el dedo o el ratón sobre lo que necesites tapar — la dirección en una foto de venta, la cara de otra persona en una foto de grupo — y solo ese trozo se pixela. Nada se sube, así que puedes trabajar tranquilo con capturas que llevan datos personales.',
      features: ['Pixela solo donde pintas', 'Grosor de pincel ajustable', 'Tapar del todo con negro sólido', 'Deshacer solo el trazo que te salió mal'],
    },
    merge: {
      title: 'Unir imágenes', desc: 'Junta varias fotos en una, en vertical o en horizontal', category: 'Editar',
      metaTitle: 'Unir imágenes — Juntar varias fotos en una sola',
      long: 'Para pegar capturas de una conversación en una sola imagen, o poner un antes y un después uno al lado del otro. Las fotos de anchos distintos se alinean solas, y tú decides el espacio entre ellas y el color del fondo.',
      features: ['En vertical o en horizontal', 'Los anchos distintos se alinean solos', 'Ajusta el espacio y el color de fondo', 'Cambia el orden de las fotos'],
    },
    palette: {
      title: 'Extraer colores de una imagen', desc: 'Saca los colores dominantes de una foto en HEX', category: 'Analizar',
      metaTitle: 'Extraer colores de una imagen — Códigos HEX desde una foto',
      long: 'Cuando quieres reutilizar el ambiente de una foto que te gusta, esto saca los colores que más aparecen y te da los códigos HEX y RGB. Toca cualquier punto de la foto y obtienes el color exacto de ahí.',
      features: ['La paleta dominante extraída por ti', 'Cuánto ocupa cada color en la imagen', 'Cuentagotas para el punto que elijas', 'Copiar un HEX con un clic'],
    },
    watermark: {
      title: "Añadir marca de agua", desc: "Superpón una marca de agua de texto", category: "Editar",
      metaTitle: "Añadir marca de agua — Poner texto sobre una foto",
      long: "Pone una marca de agua de texto sobre tu foto. Eliges la posición, el tamaño, la opacidad y el color, y puedes repetirla en diagonal por toda la imagen para que no se pueda recortar sin más. La foto se procesa en tu navegador y nunca se sube.",
      features: ["Nueve posiciones para elegir", "Repetir en diagonal por toda la foto", "Ajusta tamaño, opacidad y color", "El texto escala con el tamaño de la foto"],
    },
    adjust: {
      title: "Ajustar una foto", desc: "Retoca brillo, contraste, saturación y más", category: "Editar",
      metaTitle: "Ajustar una foto — Brillo, contraste, saturación, blanco y negro",
      long: "Retoca el brillo, el contraste y la saturación, o pasa la foto a blanco y negro o sepia. Toca uno de los seis ajustes rápidos para aplicarlo de golpe, o mueve cada control tú mismo. El original queda intacto y solo se guarda el resultado.",
      features: ["Brillo, contraste, saturación, mono, sepia, desenfoque", "Seis ajustes rápidos de partida", "Mueve cada control tú mismo", "Restablece todo de un toque"],
    },
    frame: {
      title: "Añadir borde", desc: "Rellena una foto hasta un cuadrado o formato vertical", category: "Editar",
      metaTitle: "Añadir borde — Ajustar una foto a cuadrado o 4:5",
      long: "Añade relleno alrededor de una foto para que encaje en un cuadrado, 4:5 u otra proporción. Úsalo cuando una foto vertical se recortaría en Instagram. La foto nunca se agranda: solo se añade relleno, así que no se pierde calidad.",
      features: ["Proporciones 1:1, 4:5, 3:4, 16:9 y 9:16", "Grosor y color del borde ajustables", "La foto nunca se agranda", "La foto siempre queda centrada"],
    },
    round: {
      title: "Redondear esquinas", desc: "Redondea una foto para usarla de perfil", category: "Editar",
      metaTitle: "Redondear esquinas — Recortar una foto en círculo para el perfil",
      long: "Redondea las esquinas de una foto. Al 100% se convierte en un círculo completo, listo para usar como foto de perfil. La zona fuera del redondeo tiene que ser transparente, así que el resultado siempre se guarda como PNG.",
      features: ["Redondez del 0 al 100%", "Círculo completo al 100%", "Recortar a cuadrado primero", "Se guarda como PNG transparente"],
    },
    split: {
      title: "Dividir una foto", desc: "Corta una foto en cuadrícula para el feed", category: "Editar",
      metaTitle: "Dividir una foto — Cortar en cuadrícula para el feed de Instagram",
      long: "Corta una foto en una cuadrícula de imágenes separadas. Sirve para colgar una imagen grande a lo largo de un perfil de Instagram. Cuando el tamaño no se divide exacto, los píxeles sobrantes se reparten de uno en uno, así que al volver a juntar las piezas obtienes exactamente el tamaño original.",
      features: ["Cuadrículas 2×1, 3×1, 2×2, 3×3, 1×2 y 1×3", "Numeradas de izquierda a derecha, fila superior primero", "Guarda una pieza o todas", "Al juntarlas da el tamaño original exacto"],
    },
    favicon: {
      title: "Generador de favicon", desc: "Una imagen, todos los tamaños de icono", category: "Tamaño",
      metaTitle: "Generador de favicon — Iconos de pestaña, iOS y Android de una vez",
      long: "Sube una imagen y produce de una vez los iconos de pestaña del navegador (16, 32, 48), el de la pantalla de inicio de iOS (180) y los de aplicación web de Android (192, 512). También te da las líneas para pegar en tu etiqueta head y el contenido de site.webmanifest, y los nombres de archivo coinciden con los que realmente creó.",
      features: ["Los seis tamaños que cada plataforma busca", "Incluye etiquetas head y manifest", "Las imágenes no cuadradas se recortan desde el centro", "Se guarda como PNG transparente"],
    },
  },

  'pt-br': {
    compress: {
      title: 'Comprimir imagem', desc: 'Reduz o peso de uma foto abrindo mão de qualidade', category: 'Tamanho',
      metaTitle: 'Comprimir imagem — Reduzir o peso de uma foto grátis',
      long: 'Para quando o anexo passa do limite. Abaixe a qualidade aos poucos, compare o original com o resultado lado a lado e veja exatamente quantos por cento você economizou. A foto é processada dentro do navegador e não é enviada para nenhum servidor.',
      features: ['Controle de qualidade para definir a compressão', 'A economia em porcentagem na hora', 'Original e resultado lado a lado', 'Salvar em JPG ou WebP'],
    },
    resize: {
      title: 'Redimensionar imagem', desc: 'Mude largura e altura para os pixels que quiser', category: 'Tamanho',
      metaTitle: 'Redimensionar imagem — Mudar o tamanho de uma foto em pixels',
      long: 'Digite a largura e a altura direto ou reduza por porcentagem, e trave a proporção para a foto não esticar. Os tamanhos de sempre — post do Instagram, thumbnail do YouTube, foto de perfil — estão a um botão.',
      features: ['Digite pixels ou reduza por porcentagem', 'Trave a proporção', 'Atalhos para os tamanhos mais usados', 'Prévia do peso final'],
    },
    convert: {
      title: 'Converter formato de imagem', desc: 'Passe de JPG para PNG ou WebP e vice-versa', category: 'Tamanho',
      metaTitle: 'Converter imagem — JPG, PNG e WebP nos dois sentidos',
      long: 'Para enviar a um site que não aceita WebP, ou o contrário quando você quer um arquivo mais leve. Um PNG com fundo transparente perde essa transparência ao virar JPG, então aqui você escolhe com que cor ela é preenchida.',
      features: ['JPG, PNG e WebP em qualquer direção', 'Controle de qualidade nos formatos com perda', 'Escolha a cor que preenche a transparência', 'Peso antes e depois'],
    },
    crop: {
      title: 'Recortar imagem', desc: 'Fica só com a parte que você precisa', category: 'Editar',
      metaTitle: 'Recortar imagem — Recortar uma foto por área ou proporção',
      long: 'Arraste sobre a foto para ficar só com o que interessa. Trave em 1:1, 16:9 ou uma proporção de perfil quando tiver uma medida a cumprir, ou deixe livre e recorte como quiser.',
      features: ['Arraste para definir a área de recorte', 'Trave em 1:1, 4:3, 16:9 e mais', 'O tamanho recortado aparece ao vivo', 'Salvo na qualidade original'],
    },
    rotate: {
      title: 'Girar e espelhar imagem', desc: 'Endireita uma foto deitada, espelha da esquerda para a direita', category: 'Editar',
      metaTitle: 'Girar e espelhar imagem — Rotacionar uma foto, espelhar',
      long: 'Endireite em passos de 90° uma foto que salvou deitada, e desfaça o espelhamento de uma selfie com um giro horizontal. Você também pode mexer no ângulo de grau em grau para nivelar um horizonte.',
      features: ['Girar 90° para a esquerda ou direita', 'Espelhar na horizontal ou vertical', 'Ajuste fino do ângulo de 1 em 1', 'Escolha a cor que preenche os cantos'],
    },
    mosaic: {
      title: 'Desfocar e pixelar foto', desc: 'Passe o pincel em rostos ou endereços para esconder', category: 'Editar',
      metaTitle: 'Pixelar uma foto — Esconder rostos e dados pessoais',
      long: 'Passe o dedo ou o mouse sobre o que precisa esconder — o endereço numa foto de anúncio, o rosto de outra pessoa numa foto de grupo — e só aquele pedaço é pixelado. Nada é enviado, então dá para trabalhar em prints com dados pessoais sem preocupação.',
      features: ['Pixela só onde você passa o pincel', 'Espessura do pincel ajustável', 'Cobrir de vez com preto sólido', 'Desfazer só o traço que saiu errado'],
    },
    merge: {
      title: 'Juntar imagens', desc: 'Une várias fotos em uma, na vertical ou lado a lado', category: 'Editar',
      metaTitle: 'Juntar imagens — Unir várias fotos em uma só',
      long: 'Para emendar prints de conversa em uma única imagem, ou colocar um antes e um depois um do lado do outro. Fotos de larguras diferentes são alinhadas para você, e você define o espaço entre elas e a cor do fundo.',
      features: ['Na vertical ou lado a lado', 'Larguras diferentes alinhadas automaticamente', 'Defina o espaço e a cor do fundo', 'Mude a ordem das fotos'],
    },
    palette: {
      title: 'Extrair cores de uma imagem', desc: 'Tira as cores dominantes de uma foto em HEX', category: 'Analisar',
      metaTitle: 'Extrair cores de uma imagem — Códigos HEX de uma foto',
      long: 'Quando você quer reaproveitar o clima de uma foto que gostou, isto tira as cores que mais aparecem e entrega os códigos HEX e RGB. Toque em qualquer ponto da foto e você recebe a cor exata dali.',
      features: ['A paleta dominante extraída para você', 'Quanto cada cor ocupa da imagem', 'Conta-gotas para o ponto que você escolher', 'Copiar um HEX com um clique'],
    },
    watermark: {
      title: "Adicionar marca d’água", desc: "Coloque uma marca d’água de texto na foto", category: "Editar",
      metaTitle: "Adicionar marca d’água — Colocar texto sobre uma foto",
      long: "Coloca uma marca d’água de texto na sua foto. Você escolhe a posição, o tamanho, a opacidade e a cor, e pode repeti-la na diagonal por toda a imagem para que não dê para simplesmente recortar. A foto é processada no seu navegador e nunca é enviada.",
      features: ["Nove posições para escolher", "Repetir na diagonal por toda a foto", "Ajuste tamanho, opacidade e cor", "O texto acompanha o tamanho da foto"],
    },
    adjust: {
      title: "Ajustar uma foto", desc: "Regule brilho, contraste, saturação e mais", category: "Editar",
      metaTitle: "Ajustar uma foto — Brilho, contraste, saturação, preto e branco",
      long: "Regule brilho, contraste e saturação, ou passe a foto para preto e branco ou sépia. Toque em uma das seis predefinições para aplicar de uma vez, ou ajuste cada controle você mesmo. O original fica intacto e só o resultado é salvo.",
      features: ["Brilho, contraste, saturação, mono, sépia, desfoque", "Seis predefinições para começar", "Ajuste cada controle você mesmo", "Redefina tudo com um toque"],
    },
    frame: {
      title: "Adicionar borda", desc: "Complete a foto até um quadrado ou formato vertical", category: "Editar",
      metaTitle: "Adicionar borda — Ajustar uma foto a quadrado ou 4:5",
      long: "Adiciona preenchimento ao redor da foto para que ela caiba num quadrado, 4:5 ou outra proporção. Use quando uma foto vertical seria cortada no Instagram. A foto nunca é ampliada: só se adiciona preenchimento, então nada se perde.",
      features: ["Proporções 1:1, 4:5, 3:4, 16:9 e 9:16", "Espessura e cor da borda ajustáveis", "A foto nunca é ampliada", "A foto fica sempre centralizada"],
    },
    round: {
      title: "Arredondar cantos", desc: "Arredonde uma foto para usar como perfil", category: "Editar",
      metaTitle: "Arredondar cantos — Recortar uma foto em círculo para o perfil",
      long: "Arredonda os cantos de uma foto. A 100% ela vira um círculo completo, pronta para usar como foto de perfil. A área fora do arredondamento precisa ser transparente, então o resultado é sempre salvo como PNG.",
      features: ["Arredondamento de 0 a 100%", "Círculo completo a 100%", "Recortar em quadrado primeiro", "Salvo como PNG transparente"],
    },
    split: {
      title: "Dividir uma foto", desc: "Corte uma foto em grade para o feed", category: "Editar",
      metaTitle: "Dividir uma foto — Cortar em grade para o feed do Instagram",
      long: "Corta uma foto em uma grade de imagens separadas. Serve para pendurar uma imagem grande ao longo de um perfil do Instagram. Quando o tamanho não divide exato, os pixels que sobram são distribuídos um por peça, então juntar tudo devolve exatamente o tamanho original.",
      features: ["Grades 2×1, 3×1, 2×2, 3×3, 1×2 e 1×3", "Numeradas da esquerda para a direita, primeira linha antes", "Salve uma peça ou todas", "Ao juntar dá exatamente o tamanho original"],
    },
    favicon: {
      title: "Gerador de favicon", desc: "Uma imagem, todos os tamanhos de ícone", category: "Tamanho",
      metaTitle: "Gerador de favicon — Ícones de aba, iOS e Android de uma vez",
      long: "Envie uma imagem e ele produz de uma vez os ícones de aba do navegador (16, 32, 48), o da tela inicial do iOS (180) e os de app web do Android (192, 512). Também fornece as linhas para colar na sua tag head e o conteúdo do site.webmanifest, e os nomes de arquivo batem com os que ele realmente criou.",
      features: ["Os seis tamanhos que cada plataforma procura", "Tags head e manifest incluídos", "Imagens não quadradas são recortadas pelo centro", "Salvo como PNG transparente"],
    },
  },

  ja: {
    compress: {
      title: '画像圧縮', desc: '画質を落としてファイルを軽くする', category: 'サイズ',
      metaTitle: '画像圧縮 — 写真のファイルサイズを無料で小さく',
      long: '添付ファイルの上限を超えてしまったときに。画質を少しずつ下げながら、元の写真と結果を並べて見比べ、何パーセント減ったかをその場で確認できます。写真はブラウザの中だけで処理され、どこにもアップロードされません。',
      features: ['スライダーで圧縮の強さを決める', '削減率をその場で表示', '元の写真と結果を並べて比較', 'JPGまたはWebPで保存'],
    },
    resize: {
      title: '画像サイズ変更', desc: '縦横を好きなピクセル数に合わせる', category: 'サイズ',
      metaTitle: '画像サイズ変更 — 写真の縦横をピクセル指定で',
      long: '幅と高さを直接入力するか、パーセントで縮小します。縦横比を固定すれば写真が伸びません。Instagramの投稿、YouTubeのサムネイル、プロフィール画像といったよく使う規格はボタン一つです。',
      features: ['ピクセル入力とパーセント縮小', '縦横比を固定', 'よく使う規格のプリセット', '変換後のファイルサイズを先に確認'],
    },
    convert: {
      title: '画像形式変換', desc: 'JPG・PNG・WebPを相互に変換', category: 'サイズ',
      metaTitle: '画像形式変換 — JPG・PNG・WebPを相互に',
      long: 'WebPを受け付けない場所にアップロードするとき、あるいは逆にファイルを軽くしたいときに。透過PNGをJPGにすると透明部分が塗りつぶされるので、その色も選べます。',
      features: ['JPG・PNG・WebPをどの向きにも', '非可逆形式では画質を指定', '透明部分を埋める色を選ぶ', '変換前後のファイルサイズ'],
    },
    crop: {
      title: '画像切り抜き', desc: '必要な部分だけを残す', category: '編集',
      metaTitle: '画像切り抜き — 写真を範囲や比率で切り抜く',
      long: '写真の上をドラッグして、必要なところだけを残します。規格に合わせるなら1:1・16:9・プロフィール比率に固定でき、自由のままなら好きな形で切り抜けます。',
      features: ['ドラッグで切り抜き範囲を決める', '1:1・4:3・16:9などに固定', '切り抜き後のサイズをその場で表示', '元の画質のまま保存'],
    },
    rotate: {
      title: '画像回転・反転', desc: '横向きに保存された写真を起こす、左右を反転する', category: '編集',
      metaTitle: '画像回転・反転 — 写真を回す、鏡像にする',
      long: '横倒しで保存された写真を90°ずつ回して起こします。鏡像になった自撮りは左右反転で戻せます。1°ずつの微調整もできるので、傾いた水平線をまっすぐにするのにも使えます。',
      features: ['左右に90°回転', '左右反転・上下反転', '1°単位の角度微調整', '角に残る余白の色を選ぶ'],
    },
    mosaic: {
      title: '写真のモザイク・ぼかし', desc: '顔や住所をなぞって隠す', category: '編集',
      metaTitle: '写真をモザイク処理 — 顔や個人情報を隠す',
      long: '隠したいところを指やマウスでなぞると、その部分だけにモザイクがかかります。フリマ出品写真の住所、集合写真に写った他人の顔など。アップロードは一切ないので、個人情報が写ったスクリーンショットもそのまま扱えます。',
      features: ['なぞった場所だけモザイク', 'ブラシの太さを調整', '黒で完全に塗りつぶす', '失敗した一筆だけを取り消す'],
    },
    merge: {
      title: '画像結合', desc: '複数の写真を縦か横に並べて一枚にする', category: '編集',
      metaTitle: '画像結合 — 複数の写真を一枚にまとめる',
      long: 'チャットのスクリーンショットを一枚につなげたり、ビフォーアフターを並べたりするときに。幅の違う写真は自動で揃えられ、写真の間隔と背景色も決められます。',
      features: ['縦に積む・横に並べる', '幅の違う写真を自動で揃える', '間隔と背景色を指定', '写真の順番を入れ替える'],
    },
    palette: {
      title: '画像から色を抽出', desc: '写真の主要な色をHEXで取り出す', category: '解析',
      metaTitle: '画像から色を抽出 — 写真からHEXコードを取得',
      long: '気に入った写真の雰囲気をそのまま使いたいとき、よく使われている色を取り出してHEXとRGBのコードで渡します。写真のどこかを押せば、その一点の色を正確に拾えます。',
      features: ['主要な配色を自動で抽出', '色ごとの画像内の占有率', '好きな一点を拾えるスポイト', 'HEXコードをワンクリックでコピー'],
    },
    watermark: {
      title: "透かしを入れる", desc: "写真に文字の透かしを重ねます", category: "編集",
      metaTitle: "透かしを入れる — 写真に文字の透かしを重ねる",
      long: "写真に文字の透かしを入れます。位置・大きさ・不透明度・色を選べ、写真全体に斜めに繰り返して切り取られにくくすることもできます。写真はブラウザの中だけで処理され、アップロードされません。",
      features: ["9つの位置から選べます", "写真全体に斜めに繰り返す", "大きさ・不透明度・色を調整", "文字の大きさが写真に合わせて変わる"],
    },
    adjust: {
      title: "写真の補正", desc: "明るさ・コントラスト・彩度などを調整", category: "編集",
      metaTitle: "写真の補正 — 明るさ・コントラスト・彩度・白黒",
      long: "明るさ・コントラスト・彩度を調整し、白黒やセピアにもできます。6つのプリセットを押せば一度に適用でき、スライダーで自分で合わせることもできます。元の写真はそのままで、結果だけを保存します。",
      features: ["明るさ・コントラスト・彩度・白黒・セピア・ぼかし", "6つのプリセット", "スライダーで自分で調整", "ワンタップで全部戻す"],
    },
    frame: {
      title: "枠をつける", desc: "余白を足して正方形や縦長比率に", category: "編集",
      metaTitle: "枠をつける — 写真を正方形や4:5に合わせる",
      long: "写真の周りに余白を足して、正方形や4:5などの比率に合わせます。縦長の写真がインスタグラムで切れてしまうときに使います。写真そのものは拡大しないので、画質が落ちることはありません。",
      features: ["1:1・4:5・3:4・16:9・9:16の比率", "枠の太さと色を調整", "写真は拡大されません", "写真は常に中央に置かれます"],
    },
    round: {
      title: "角を丸くする", desc: "プロフィール写真用に角を丸くします", category: "編集",
      metaTitle: "角を丸くする — プロフィール用に写真を円形に切る",
      long: "写真の角を丸くします。100%にすると完全な円になり、そのままプロフィール写真に使えます。丸めた外側は透明でなければならないので、結果は必ずPNGで保存されます。",
      features: ["0〜100%の丸み", "100%で完全な円", "先に正方形に切る", "透明なPNGで保存"],
    },
    split: {
      title: "写真の分割", desc: "格子に切ってインスタのグリッドに", category: "編集",
      metaTitle: "写真の分割 — 格子に切ってインスタのグリッドを作る",
      long: "写真を格子状に切って複数枚に分けます。インスタグラムのプロフィールに大きな絵を並べるときに使います。割り切れないときは余ったピクセルを1枚に1つずつ配るので、つなぎ直すと元の大きさぴったりになります。",
      features: ["2×1・3×1・2×2・3×3・1×2・1×3", "左上から順に番号がつきます", "1枚ずつでも全部でも保存", "つなぐと元の大きさぴったり"],
    },
    favicon: {
      title: "ファビコン作成", desc: "1枚の画像から必要なアイコンをすべて", category: "サイズ",
      metaTitle: "ファビコン作成 — ブラウザのタブ・iOS・Androidのアイコンを一度に",
      long: "画像を1枚アップロードすると、ブラウザのタブ用（16・32・48）、iOSのホーム画面用（180）、Androidウェブアプリ用（192・512）を一度に作ります。headに貼り付ける行とsite.webmanifestの中身も出力し、そこに書かれたファイル名は実際に作るファイルと一致します。",
      features: ["各プラットフォームが実際に探す6つの大きさ", "headのタグとマニフェストも一緒に", "正方形でない画像は中央を切り取ります", "透明なPNGで保存"],
    },
  },

  de: {
    compress: {
      title: 'Bild komprimieren', desc: 'Fotodatei kleiner machen, auf Kosten der Qualität', category: 'Größe',
      metaTitle: 'Bild komprimieren — Fotogröße kostenlos verkleinern',
      long: 'Für den Anhang, der über dem Limit liegt. Senke die Qualität schrittweise, vergleiche Original und Ergebnis nebeneinander und sieh genau, wie viel Prozent du gespart hast. Dein Foto wird im Browser verarbeitet und nie hochgeladen.',
      features: ['Qualitätsregler für die Kompression', 'Ersparnis sofort in Prozent', 'Original und Ergebnis nebeneinander', 'Als JPG oder WebP speichern'],
    },
    resize: {
      title: 'Bildgröße ändern', desc: 'Breite und Höhe auf beliebige Pixelmaße bringen', category: 'Größe',
      metaTitle: 'Bildgröße ändern — Fotomaße in Pixeln anpassen',
      long: 'Gib Breite und Höhe direkt ein oder skaliere prozentual, und sperre das Seitenverhältnis, damit das Foto nicht verzerrt. Die üblichen Maße — Instagram-Post, YouTube-Thumbnail, Profilbild — liegen auf einem Knopf.',
      features: ['Pixel eingeben oder prozentual skalieren', 'Seitenverhältnis sperren', 'Vorlagen für gängige Maße', 'Resultierende Dateigröße vorab sehen'],
    },
    convert: {
      title: 'Bildformat umwandeln', desc: 'Zwischen JPG, PNG und WebP wechseln', category: 'Größe',
      metaTitle: 'Bild umwandeln — JPG, PNG und WebP in beide Richtungen',
      long: 'Für den Upload dort, wo WebP nicht angenommen wird — oder umgekehrt, wenn die Datei kleiner werden soll. Ein PNG mit transparentem Hintergrund verliert diese Transparenz als JPG, deshalb wählst du hier die Füllfarbe selbst.',
      features: ['JPG, PNG und WebP in jede Richtung', 'Qualitätsregelung bei verlustbehafteten Formaten', 'Farbe für die Transparenzfüllung wählen', 'Dateigröße vorher und nachher'],
    },
    crop: {
      title: 'Bild zuschneiden', desc: 'Nur den Teil behalten, den du brauchst', category: 'Bearbeiten',
      metaTitle: 'Bild zuschneiden — Foto nach Bereich oder Verhältnis',
      long: 'Zieh über das Foto und behalte nur, was du willst. Sperre auf 1:1, 16:9 oder ein Profilverhältnis, wenn eine Vorgabe zu erfüllen ist — oder lass es frei und schneide, wie es dir passt.',
      features: ['Ziehen, um den Bereich festzulegen', 'Auf 1:1, 4:3, 16:9 und mehr sperren', 'Zugeschnittene Maße live sichtbar', 'In Originalqualität gespeichert'],
    },
    rotate: {
      title: 'Bild drehen und spiegeln', desc: 'Ein quer gespeichertes Foto aufrichten, links-rechts spiegeln', category: 'Bearbeiten',
      metaTitle: 'Bild drehen und spiegeln — Foto drehen, spiegeln',
      long: 'Richte ein quer gespeichertes Foto in 90°-Schritten wieder auf, und nimm das Spiegelbild eines Selfies mit einer waagerechten Spiegelung zurück. Den Winkel kannst du auch gradweise nachziehen, um einen schiefen Horizont zu begradigen.',
      features: ['90° nach links oder rechts drehen', 'Waagerecht oder senkrecht spiegeln', 'Feinjustierung um 1°', 'Farbe für die leeren Ecken wählen'],
    },
    mosaic: {
      title: 'Foto verpixeln', desc: 'Über Gesichter oder Adressen pinseln, um sie zu verdecken', category: 'Bearbeiten',
      metaTitle: 'Foto verpixeln — Gesichter und persönliche Daten verdecken',
      long: 'Pinsle mit Finger oder Maus über alles, was verdeckt sein soll — die Adresse auf einem Verkaufsfoto, das Gesicht einer anderen Person auf einem Gruppenbild — und nur diese Stelle wird verpixelt. Es wird nichts hochgeladen, also kannst du auch Screenshots mit persönlichen Daten gefahrlos bearbeiten.',
      features: ['Verpixelt nur dort, wo du pinselst', 'Pinselgröße einstellbar', 'Vollständig mit Schwarz abdecken', 'Nur den misslungenen Strich zurücknehmen'],
    },
    merge: {
      title: 'Bilder zusammenfügen', desc: 'Mehrere Fotos zu einem verbinden, unter- oder nebeneinander', category: 'Bearbeiten',
      metaTitle: 'Bilder zusammenfügen — Mehrere Fotos zu einem Bild',
      long: 'Um Chat-Screenshots zu einem Bild zu nähen oder ein Vorher und Nachher nebeneinander zu stellen. Fotos verschiedener Breite werden für dich ausgerichtet, und du bestimmst den Abstand dazwischen und die Hintergrundfarbe.',
      features: ['Senkrecht oder waagerecht', 'Unterschiedliche Breiten automatisch ausgerichtet', 'Abstand und Hintergrundfarbe festlegen', 'Reihenfolge der Fotos ändern'],
    },
    palette: {
      title: 'Farben aus Bild auslesen', desc: 'Die vorherrschenden Farben eines Fotos als HEX', category: 'Analysieren',
      metaTitle: 'Farben aus Bild auslesen — HEX-Codes aus einem Foto',
      long: 'Wenn du die Stimmung eines Fotos übernehmen willst, holt das hier die am häufigsten vorkommenden Farben heraus und gibt dir HEX- und RGB-Codes. Tippe irgendwo auf das Foto und du bekommst genau die Farbe an dieser Stelle.',
      features: ['Vorherrschende Palette automatisch ausgelesen', 'Anteil jeder Farbe am Bild', 'Pipette für jeden Punkt, den du wählst', 'HEX-Code mit einem Klick kopieren'],
    },
    watermark: {
      title: "Wasserzeichen hinzufügen", desc: "Lege ein Text-Wasserzeichen über dein Foto", category: "Bearbeiten",
      metaTitle: "Wasserzeichen hinzufügen — Text über ein Foto legen",
      long: "Legt ein Text-Wasserzeichen über dein Foto. Du wählst Position, Größe, Deckkraft und Farbe, und du kannst es diagonal über das ganze Bild wiederholen, damit es sich nicht einfach wegschneiden lässt. Das Foto wird im Browser verarbeitet und nie hochgeladen.",
      features: ["Neun Positionen zur Auswahl", "Diagonal über das ganze Foto wiederholen", "Größe, Deckkraft und Farbe einstellen", "Der Text skaliert mit der Fotogröße"],
    },
    adjust: {
      title: "Foto anpassen", desc: "Helligkeit, Kontrast, Sättigung und mehr", category: "Bearbeiten",
      metaTitle: "Foto anpassen — Helligkeit, Kontrast, Sättigung, Schwarzweiß",
      long: "Stelle Helligkeit, Kontrast und Sättigung ein oder mache das Foto schwarzweiß oder sepia. Tippe eine der sechs Voreinstellungen an, um sie auf einmal anzuwenden, oder stelle jeden Regler selbst. Das Original bleibt unangetastet, gespeichert wird nur das Ergebnis.",
      features: ["Helligkeit, Kontrast, Sättigung, Mono, Sepia, Weichzeichnen", "Sechs Voreinstellungen als Ausgangspunkt", "Jeden Regler selbst einstellen", "Alles mit einem Tipp zurücksetzen"],
    },
    frame: {
      title: "Rahmen hinzufügen", desc: "Ein Foto auf ein Quadrat oder Hochformat auffüllen", category: "Bearbeiten",
      metaTitle: "Rahmen hinzufügen — Ein Foto auf Quadrat oder 4:5 bringen",
      long: "Fügt Rand um ein Foto hinzu, damit es in ein Quadrat, 4:5 oder ein anderes Verhältnis passt. Nützlich, wenn ein hochformatiges Foto auf Instagram sonst beschnitten würde. Das Foto selbst wird nie vergrößert — es kommt nur Rand hinzu, es geht also keine Qualität verloren.",
      features: ["Verhältnisse 1:1, 4:5, 3:4, 16:9 und 9:16", "Rahmenstärke und -farbe einstellbar", "Das Foto wird nie vergrößert", "Das Foto sitzt immer mittig"],
    },
    round: {
      title: "Ecken abrunden", desc: "Rundet ein Foto für ein Profilbild ab", category: "Bearbeiten",
      metaTitle: "Ecken abrunden — Ein Foto für ein Profil kreisrund zuschneiden",
      long: "Rundet die Ecken eines Fotos ab. Bei 100% wird daraus ein voller Kreis, fertig für ein Profilbild. Der Bereich außerhalb der Rundung muss durchsichtig sein, deshalb wird das Ergebnis immer als PNG gespeichert.",
      features: ["Rundung von 0 bis 100%", "Bei 100% ein voller Kreis", "Zuerst quadratisch zuschneiden", "Als transparentes PNG gespeichert"],
    },
    split: {
      title: "Foto zerteilen", desc: "Ein Foto in ein Raster für den Instagram-Feed schneiden", category: "Bearbeiten",
      metaTitle: "Foto zerteilen — In ein Raster für den Instagram-Feed schneiden",
      long: "Schneidet ein Foto in ein Raster einzelner Bilder. Nützlich, um ein großes Bild über ein Instagram-Profil zu spannen. Geht die Größe nicht glatt auf, werden die übrigen Pixel einzeln auf die Teile verteilt — zusammengesetzt ergibt sich exakt die Originalgröße.",
      features: ["Raster 2×1, 3×1, 2×2, 3×3, 1×2 und 1×3", "Nummeriert von links nach rechts, oberste Reihe zuerst", "Ein Teil oder alle speichern", "Zusammengesetzt exakt die Originalgröße"],
    },
    favicon: {
      title: "Favicon-Generator", desc: "Ein Bild, alle Icon-Größen einer Website", category: "Größe",
      metaTitle: "Favicon-Generator — Browser-Tab-, iOS- und Android-Icons auf einmal",
      long: "Lade ein Bild hoch, und es erzeugt in einem Durchgang die Browser-Tab-Icons (16, 32, 48), das iOS-Startbildschirm-Icon (180) und die Android-Web-App-Icons (192, 512). Es gibt dir auch die Zeilen für dein head-Tag und den Inhalt von site.webmanifest — und die dortigen Dateinamen stimmen mit den erzeugten Dateien überein.",
      features: ["Die sechs Größen, die jede Plattform wirklich sucht", "Head-Tags und Manifest inklusive", "Nicht quadratische Bilder werden aus der Mitte beschnitten", "Als transparentes PNG gespeichert"],
    },
  },

  fr: {
    compress: {
      title: 'Compresser une image', desc: 'Allège le fichier d’une photo en cédant de la qualité', category: 'Taille',
      metaTitle: 'Compresser une image — Réduire le poids d’une photo gratuitement',
      long: 'Pour la pièce jointe qui dépasse la limite. Baisse la qualité par paliers, compare l’original et le résultat côte à côte, et vois exactement le pourcentage gagné. Ta photo est traitée dans le navigateur et n’est jamais envoyée.',
      features: ['Curseur de qualité pour régler la compression', 'Le gain affiché en pourcentage tout de suite', 'Original et résultat côte à côte', 'Enregistrer en JPG ou WebP'],
    },
    resize: {
      title: 'Redimensionner une image', desc: 'Change la largeur et la hauteur au pixel près', category: 'Taille',
      metaTitle: 'Redimensionner une image — Changer les dimensions d’une photo',
      long: 'Saisis la largeur et la hauteur directement ou réduis en pourcentage, et verrouille les proportions pour que la photo ne s’étire pas. Les formats habituels — publication Instagram, vignette YouTube, photo de profil — sont à un bouton.',
      features: ['Saisir des pixels ou réduire en pourcentage', 'Verrouiller les proportions', 'Préréglages pour les formats courants', 'Aperçu du poids obtenu'],
    },
    convert: {
      title: 'Convertir le format d’une image', desc: 'Passe de JPG à PNG ou WebP et inversement', category: 'Taille',
      metaTitle: 'Convertir une image — JPG, PNG et WebP dans les deux sens',
      long: 'Pour un site qui refuse le WebP, ou l’inverse quand tu veux un fichier plus léger. Un PNG à fond transparent perd cette transparence en JPG, alors tu choisis ici la couleur qui la remplit.',
      features: ['JPG, PNG et WebP dans tous les sens', 'Réglage de qualité pour les formats avec perte', 'Choisir la couleur qui remplit la transparence', 'Poids avant et après'],
    },
    crop: {
      title: 'Recadrer une image', desc: 'Ne garde que la partie utile', category: 'Retoucher',
      metaTitle: 'Recadrer une image — Rogner une photo par zone ou ratio',
      long: 'Fais glisser sur la photo pour ne garder que ce qui t’intéresse. Verrouille en 1:1, 16:9 ou un ratio de profil quand il y a une contrainte, ou laisse libre et découpe comme tu veux.',
      features: ['Glisser pour définir la zone', 'Verrouiller en 1:1, 4:3, 16:9 et plus', 'Les dimensions recadrées en direct', 'Enregistré à la qualité d’origine'],
    },
    rotate: {
      title: 'Faire pivoter et retourner une image', desc: 'Redresse une photo couchée, applique un effet miroir', category: 'Retoucher',
      metaTitle: 'Faire pivoter une image — Tourner une photo, la retourner',
      long: 'Redresse par pas de 90° une photo enregistrée de travers, et annule l’effet miroir d’un selfie avec un retournement horizontal. Tu peux aussi ajuster l’angle degré par degré pour remettre un horizon d’aplomb.',
      features: ['Pivoter de 90° à gauche ou à droite', 'Retourner horizontalement ou verticalement', 'Ajustement fin de l’angle au degré', 'Choisir la couleur qui remplit les coins'],
    },
    mosaic: {
      title: 'Flouter et pixeliser une photo', desc: 'Passe le pinceau sur les visages ou les adresses', category: 'Retoucher',
      metaTitle: 'Pixeliser une photo — Masquer visages et données personnelles',
      long: 'Passe le doigt ou la souris sur ce que tu veux masquer — l’adresse sur une photo d’annonce, le visage de quelqu’un d’autre sur une photo de groupe — et seul cet endroit est pixelisé. Rien n’est envoyé, donc tu peux travailler sans crainte sur des captures contenant des données personnelles.',
      features: ['Pixelise seulement là où tu passes', 'Taille de pinceau réglable', 'Masquer complètement en noir', 'Annuler seulement le trait raté'],
    },
    merge: {
      title: 'Assembler des images', desc: 'Réunit plusieurs photos en une, à la verticale ou côte à côte', category: 'Retoucher',
      metaTitle: 'Assembler des images — Réunir plusieurs photos en une',
      long: 'Pour recoudre des captures de conversation en une seule image, ou placer un avant et un après côte à côte. Les photos de largeurs différentes sont alignées pour toi, et tu règles l’écart entre elles et la couleur de fond.',
      features: ['À la verticale ou côte à côte', 'Largeurs différentes alignées automatiquement', 'Régler l’écart et la couleur de fond', 'Changer l’ordre des photos'],
    },
    palette: {
      title: 'Extraire les couleurs d’une image', desc: 'Sort les couleurs dominantes d’une photo en HEX', category: 'Analyser',
      metaTitle: 'Extraire les couleurs d’une image — Codes HEX depuis une photo',
      long: 'Quand tu veux réutiliser l’ambiance d’une photo qui te plaît, ceci sort les couleurs qui reviennent le plus et te donne les codes HEX et RGB. Touche n’importe quel point de la photo et tu obtiens la couleur exacte de cet endroit.',
      features: ['La palette dominante extraite pour toi', 'La part de l’image occupée par chaque couleur', 'Pipette pour le point que tu choisis', 'Copier un code HEX en un clic'],
    },
    watermark: {
      title: "Ajouter un filigrane", desc: "Posez un filigrane texte sur votre photo", category: "Retoucher",
      metaTitle: "Ajouter un filigrane — Poser du texte sur une photo",
      long: "Pose un filigrane texte sur votre photo. Vous choisissez la position, la taille, l’opacité et la couleur, et vous pouvez le répéter en diagonale sur toute l’image pour qu’on ne puisse pas simplement le rogner. La photo est traitée dans votre navigateur et n’est jamais envoyée.",
      features: ["Neuf positions au choix", "Répéter en diagonale sur toute la photo", "Réglez taille, opacité et couleur", "Le texte suit la taille de la photo"],
    },
    adjust: {
      title: "Ajuster une photo", desc: "Réglez luminosité, contraste, saturation et plus", category: "Retoucher",
      metaTitle: "Ajuster une photo — Luminosité, contraste, saturation, noir et blanc",
      long: "Réglez la luminosité, le contraste et la saturation, ou passez la photo en noir et blanc ou en sépia. Touchez l’un des six préréglages pour l’appliquer d’un coup, ou réglez chaque curseur vous-même. L’original reste intact et seul le résultat est enregistré.",
      features: ["Luminosité, contraste, saturation, mono, sépia, flou", "Six préréglages pour démarrer", "Réglez chaque curseur vous-même", "Tout réinitialiser d’un geste"],
    },
    frame: {
      title: "Ajouter un cadre", desc: "Complétez une photo en carré ou en format vertical", category: "Retoucher",
      metaTitle: "Ajouter un cadre — Mettre une photo au carré ou en 4:5",
      long: "Ajoute une marge autour d’une photo pour qu’elle entre dans un carré, un 4:5 ou un autre format. Utile quand une photo verticale serait rognée sur Instagram. La photo elle-même n’est jamais agrandie : on n’ajoute que de la marge, rien n’est perdu.",
      features: ["Formats 1:1, 4:5, 3:4, 16:9 et 9:16", "Épaisseur et couleur du cadre réglables", "La photo n’est jamais agrandie", "La photo est toujours centrée"],
    },
    round: {
      title: "Arrondir les coins", desc: "Arrondissez une photo pour un avatar", category: "Retoucher",
      metaTitle: "Arrondir les coins — Rogner une photo en cercle pour un profil",
      long: "Arrondit les coins d’une photo. À 100 %, elle devient un cercle complet, prête à servir de photo de profil. La zone hors de l’arrondi doit être transparente, donc le résultat est toujours enregistré en PNG.",
      features: ["Arrondi de 0 à 100 %", "Cercle complet à 100 %", "Rogner en carré d’abord", "Enregistré en PNG transparent"],
    },
    split: {
      title: "Découper une photo", desc: "Coupez une photo en grille pour un feed", category: "Retoucher",
      metaTitle: "Découper une photo — Couper en grille pour un feed Instagram",
      long: "Coupe une photo en une grille d’images séparées. Utile pour étaler une grande image sur un profil Instagram. Quand la taille ne se divise pas exactement, les pixels restants sont distribués un par morceau : en les remettant ensemble, on retrouve exactement la taille d’origine.",
      features: ["Grilles 2×1, 3×1, 2×2, 3×3, 1×2 et 1×3", "Numérotés de gauche à droite, rangée du haut d’abord", "Enregistrez un morceau ou tous", "Recollés, exactement la taille d’origine"],
    },
    favicon: {
      title: "Générateur de favicon", desc: "Une image, toutes les tailles d’icône d’un site", category: "Taille",
      metaTitle: "Générateur de favicon — Icônes onglet, iOS et Android d’un coup",
      long: "Envoyez une image et il produit d’un coup les icônes d’onglet (16, 32, 48), celle de l’écran d’accueil iOS (180) et celles d’application web Android (192, 512). Il vous donne aussi les lignes à coller dans votre balise head et le contenu de site.webmanifest, et les noms de fichiers y correspondent aux fichiers réellement créés.",
      features: ["Les six tailles que chaque plateforme cherche vraiment", "Balises head et manifest inclus", "Les images non carrées sont rognées au centre", "Enregistré en PNG transparent"],
    },
  },

  hi: {
    compress: {
      title: 'इमेज कंप्रेस करें', desc: 'क्वालिटी थोड़ी घटाकर फ़ोटो की फ़ाइल हल्की करें', category: 'आकार',
      metaTitle: 'इमेज कंप्रेस करें — फ़ोटो का फ़ाइल साइज़ मुफ़्त में घटाएँ',
      long: 'जब अटैचमेंट तय सीमा से बड़ा हो जाए। क्वालिटी धीरे-धीरे घटाइए, मूल फ़ोटो और नतीजे को साथ रखकर देखिए, और कितने प्रतिशत की बचत हुई यह तुरंत जान लीजिए। फ़ोटो ब्राउज़र के अंदर ही प्रोसेस होती है, कहीं अपलोड नहीं होती।',
      features: ['क्वालिटी स्लाइडर से कंप्रेशन तय करें', 'बचत तुरंत प्रतिशत में', 'मूल और नतीजा साथ-साथ', 'JPG या WebP में सेव करें'],
    },
    resize: {
      title: 'इमेज का आकार बदलें', desc: 'चौड़ाई और ऊँचाई मनचाहे पिक्सेल पर लाएँ', category: 'आकार',
      metaTitle: 'इमेज का आकार बदलें — फ़ोटो के पिक्सेल नाप बदलें',
      long: 'चौड़ाई-ऊँचाई सीधे लिखिए या प्रतिशत में घटाइए, और अनुपात लॉक कर दीजिए ताकि फ़ोटो खिंचे नहीं। रोज़ के नाप — इंस्टाग्राम पोस्ट, यूट्यूब थंबनेल, प्रोफ़ाइल फ़ोटो — एक बटन दूर हैं।',
      features: ['पिक्सेल लिखें या प्रतिशत में घटाएँ', 'अनुपात लॉक करें', 'आम नापों के प्रीसेट', 'बनने वाली फ़ाइल का साइज़ पहले देखें'],
    },
    convert: {
      title: 'इमेज फ़ॉर्मेट बदलें', desc: 'JPG, PNG और WebP के बीच बदलें', category: 'आकार',
      metaTitle: 'इमेज कनवर्टर — JPG, PNG और WebP दोनों तरफ़',
      long: 'जहाँ WebP नहीं चलता वहाँ अपलोड करने के लिए, या उलटा — जब फ़ाइल हल्की चाहिए। पारदर्शी बैकग्राउंड वाला PNG जब JPG बनता है तो वह पारदर्शिता भर जाती है, इसलिए भरने वाला रंग भी आप चुनते हैं।',
      features: ['JPG, PNG और WebP किसी भी दिशा में', 'लॉसी फ़ॉर्मेट में क्वालिटी नियंत्रण', 'पारदर्शिता भरने वाला रंग चुनें', 'पहले और बाद का फ़ाइल साइज़'],
    },
    crop: {
      title: 'इमेज क्रॉप करें', desc: 'सिर्फ़ ज़रूरी हिस्सा रखें', category: 'संपादन',
      metaTitle: 'इमेज क्रॉप करें — फ़ोटो को क्षेत्र या अनुपात से काटें',
      long: 'फ़ोटो पर खींचकर सिर्फ़ वही हिस्सा रखिए जो चाहिए। कोई नाप पूरी करनी हो तो 1:1, 16:9 या प्रोफ़ाइल अनुपात पर लॉक कर दीजिए, वरना खुला छोड़कर जैसा मन हो वैसा काटिए।',
      features: ['खींचकर क्रॉप क्षेत्र तय करें', '1:1, 4:3, 16:9 और अन्य पर लॉक', 'कटा हुआ नाप साथ-साथ दिखता है', 'मूल क्वालिटी में सेव'],
    },
    rotate: {
      title: 'इमेज घुमाएँ और पलटें', desc: 'तिरछी सेव हुई फ़ोटो सीधी करें, बाएँ-दाएँ पलटें', category: 'संपादन',
      metaTitle: 'इमेज घुमाएँ और पलटें — फ़ोटो को घुमाना, मिरर करना',
      long: 'लेटी हुई सेव हो गई फ़ोटो को 90° के कदमों में सीधा कीजिए, और मिरर हुई सेल्फ़ी को बाएँ-दाएँ पलटकर ठीक कीजिए। कोण को एक-एक डिग्री खिसकाकर टेढ़ा क्षितिज भी सीधा किया जा सकता है।',
      features: ['बाएँ या दाएँ 90° घुमाएँ', 'क्षैतिज या लंबवत पलटें', '1° की बारीक कोण सेटिंग', 'कोनों में बचे खाली हिस्से का रंग चुनें'],
    },
    mosaic: {
      title: 'फ़ोटो धुँधली करें या पिक्सेल करें', desc: 'चेहरों या पतों पर ब्रश चलाकर छिपाएँ', category: 'संपादन',
      metaTitle: 'फ़ोटो पिक्सेल करें — चेहरे और निजी जानकारी छिपाएँ',
      long: 'जो छिपाना है उस पर उँगली या माउस से ब्रश चलाइए — बिक्री की फ़ोटो में लिखा पता, ग्रुप फ़ोटो में किसी और का चेहरा — और सिर्फ़ वही जगह पिक्सेल हो जाती है। कुछ भी अपलोड नहीं होता, इसलिए निजी जानकारी वाले स्क्रीनशॉट भी बेफ़िक्र संभाले जा सकते हैं।',
      features: ['सिर्फ़ ब्रश चलाई जगह पिक्सेल होती है', 'ब्रश की मोटाई बदलें', 'गाढ़े काले से पूरी तरह ढकें', 'गलत पड़ा एक स्ट्रोक ही वापस लें'],
    },
    merge: {
      title: 'इमेज जोड़ें', desc: 'कई फ़ोटो को खड़े या आड़े जोड़कर एक बनाएँ', category: 'संपादन',
      metaTitle: 'इमेज जोड़ें — कई फ़ोटो को एक में मिलाएँ',
      long: 'चैट के स्क्रीनशॉट को एक ही तस्वीर में सिलने के लिए, या पहले-बाद वाली दो फ़ोटो साथ रखने के लिए। अलग-अलग चौड़ाई की फ़ोटो अपने आप सीधी कर दी जाती हैं, और बीच का अंतर तथा बैकग्राउंड का रंग आप तय करते हैं।',
      features: ['खड़े या आड़े जोड़ें', 'अलग चौड़ाई अपने आप संतुलित', 'अंतर और बैकग्राउंड का रंग तय करें', 'फ़ोटो का क्रम बदलें'],
    },
    palette: {
      title: 'इमेज से रंग निकालें', desc: 'फ़ोटो के मुख्य रंग HEX में निकालें', category: 'विश्लेषण',
      metaTitle: 'इमेज से रंग निकालें — फ़ोटो से HEX कोड पाएँ',
      long: 'पसंद आई फ़ोटो का मिज़ाज दोबारा इस्तेमाल करना हो, तो यह उसमें सबसे ज़्यादा दिखने वाले रंग निकालकर HEX और RGB कोड देता है। फ़ोटो पर कहीं भी दबाइए और उस एक बिंदु का ठीक रंग मिल जाता है।',
      features: ['मुख्य रंगों की पैलेट अपने आप', 'हर रंग तस्वीर का कितना हिस्सा है', 'चुने हुए बिंदु के लिए ड्रॉपर', 'HEX कोड एक क्लिक में कॉपी'],
    },
    watermark: {
      title: "वॉटरमार्क जोड़ें", desc: "अपनी फ़ोटो पर पाठ वॉटरमार्क लगाएँ", category: "संपादन",
      metaTitle: "वॉटरमार्क जोड़ें — फ़ोटो पर पाठ लगाएँ",
      long: "आपकी फ़ोटो पर पाठ वॉटरमार्क लगाता है। आप स्थान, आकार, अपारदर्शिता और रंग चुनते हैं, और इसे पूरी छवि पर तिरछा दोहरा सकते हैं ताकि इसे यूँ ही काटा न जा सके। फ़ोटो आपके ब्राउज़र में ही संसाधित होती है और कभी अपलोड नहीं होती।",
      features: ["चुनने के लिए नौ स्थान", "पूरी फ़ोटो पर तिरछा दोहराएँ", "आकार, अपारदर्शिता और रंग समायोजित करें", "पाठ फ़ोटो के आकार के साथ बदलता है"],
    },
    adjust: {
      title: "फ़ोटो समायोजित करें", desc: "चमक, कंट्रास्ट, संतृप्ति और बहुत कुछ", category: "संपादन",
      metaTitle: "फ़ोटो समायोजित करें — चमक, कंट्रास्ट, संतृप्ति, श्वेत-श्याम",
      long: "चमक, कंट्रास्ट और संतृप्ति समायोजित करें, या फ़ोटो को श्वेत-श्याम या सेपिया बनाएँ। छह पूर्व-निर्धारित में से एक दबाकर एक साथ लागू करें, या हर स्लाइडर स्वयं सेट करें। मूल फ़ोटो अछूती रहती है और केवल परिणाम सहेजा जाता है।",
      features: ["चमक, कंट्रास्ट, संतृप्ति, श्वेत-श्याम, सेपिया, धुंधलापन", "शुरू करने के लिए छह पूर्व-निर्धारित", "हर स्लाइडर स्वयं सेट करें", "एक बार में सब रीसेट करें"],
    },
    frame: {
      title: "बॉर्डर जोड़ें", desc: "फ़ोटो को वर्ग या लंबे अनुपात तक भरें", category: "संपादन",
      metaTitle: "बॉर्डर जोड़ें — फ़ोटो को वर्ग या 4:5 में फ़िट करें",
      long: "फ़ोटो के चारों ओर जगह जोड़ता है ताकि वह वर्ग, 4:5 या किसी और अनुपात में फ़िट हो जाए। जब लंबी फ़ोटो इंस्टाग्राम पर कट जाती, तब इसका उपयोग करें। फ़ोटो कभी बड़ी नहीं की जाती — केवल जगह जोड़ी जाती है, इसलिए गुणवत्ता नहीं घटती।",
      features: ["1:1, 4:5, 3:4, 16:9 और 9:16 अनुपात", "बॉर्डर की मोटाई और रंग समायोज्य", "फ़ोटो कभी बड़ी नहीं की जाती", "फ़ोटो हमेशा बीच में रहती है"],
    },
    round: {
      title: "कोने गोल करें", desc: "प्रोफ़ाइल फ़ोटो के लिए कोने गोल करें", category: "संपादन",
      metaTitle: "कोने गोल करें — प्रोफ़ाइल के लिए फ़ोटो को वृत्त में काटें",
      long: "फ़ोटो के कोने गोल करता है। 100% पर यह पूरा वृत्त बन जाता है, प्रोफ़ाइल फ़ोटो के लिए तैयार। गोलाई के बाहर का हिस्सा पारदर्शी होना चाहिए, इसलिए परिणाम हमेशा PNG के रूप में सहेजा जाता है।",
      features: ["0 से 100% तक गोलाई", "100% पर पूरा वृत्त", "पहले वर्ग में काटें", "पारदर्शी PNG के रूप में सहेजा गया"],
    },
    split: {
      title: "फ़ोटो बाँटें", desc: "इंस्टाग्राम फ़ीड के लिए फ़ोटो को ग्रिड में काटें", category: "संपादन",
      metaTitle: "फ़ोटो बाँटें — इंस्टाग्राम फ़ीड के लिए ग्रिड में काटें",
      long: "फ़ोटो को अलग-अलग छवियों की ग्रिड में काटता है। इंस्टाग्राम प्रोफ़ाइल पर एक बड़ी तस्वीर फैलाने के काम आता है। जब आकार ठीक-ठीक नहीं बँटता, बचे हुए पिक्सेल एक-एक करके टुकड़ों में बाँटे जाते हैं, इसलिए टुकड़े जोड़ने पर बिलकुल मूल आकार मिलता है।",
      features: ["2×1, 3×1, 2×2, 3×3, 1×2 और 1×3 ग्रिड", "बाएँ से दाएँ, ऊपरी पंक्ति पहले, क्रमांकित", "एक टुकड़ा या सब सहेजें", "जोड़ने पर बिलकुल मूल आकार"],
    },
    favicon: {
      title: "फ़ेविकॉन जनरेटर", desc: "एक छवि, साइट के लिए ज़रूरी हर आइकॉन आकार", category: "आकार",
      metaTitle: "फ़ेविकॉन जनरेटर — ब्राउज़र टैब, iOS और एंड्रॉइड आइकॉन एक साथ",
      long: "एक छवि अपलोड करें और यह एक ही बार में ब्राउज़र टैब के आइकॉन (16, 32, 48), iOS होम स्क्रीन का आइकॉन (180) और एंड्रॉइड वेब ऐप के आइकॉन (192, 512) बना देता है। यह आपकी head टैग में चिपकाने की पंक्तियाँ और site.webmanifest की सामग्री भी देता है, और उनमें लिखे फ़ाइल नाम वास्तव में बनाई गई फ़ाइलों से मेल खाते हैं।",
      features: ["हर प्लेटफ़ॉर्म जो छह आकार वास्तव में खोजता है", "head टैग और मैनिफ़ेस्ट शामिल", "गैर-वर्ग छवियाँ बीच से काटी जाती हैं", "पारदर्शी PNG के रूप में सहेजा गया"],
    },
  },
  'zh-hans': {
    compress: {
      title: '图片压缩', desc: '牺牲一点画质，把照片文件变小', category: '大小',
      metaTitle: '图片压缩 — 免费缩小照片文件大小',
      long: '附件超过大小限制时用。一档一档往下调画质，把原图和结果并排比，还能看到省下了百分之几。照片在浏览器里处理，绝不上传。',
      features: ['用滑块定压缩程度', '立刻显示省了百分之几', '原图和结果并排看', '存成JPG或WebP'],
    },
    resize: {
      title: '图片尺寸调整', desc: '把宽高改成任意像素大小', category: '大小',
      metaTitle: '图片尺寸调整 — 按像素改照片尺寸',
      long: '直接填宽和高，或者按百分比缩放，还能锁住长宽比让照片不被拉变形。常用尺寸 — Instagram贴文、YouTube缩略图、头像 — 都是一按就好。',
      features: ['填像素或按百分比缩放', '锁住长宽比', '常用尺寸预设', '预览成品的文件大小'],
    },
    convert: {
      title: '图片格式转换', desc: '在JPG、PNG和WebP之间转', category: '大小',
      metaTitle: '图片转换器 — JPG、PNG和WebP双向转',
      long: '要传到不收WebP的地方时用，或者反过来 — 想把文件弄小的时候。透明背景的PNG转成JPG时那块背景会被填上，所以填什么颜色也可以自己挑。',
      features: ['JPG、PNG、WebP任意方向互转', '有损格式可调画质', '挑填补透明的颜色', '转换前后的文件大小'],
    },
    crop: {
      title: '图片裁剪', desc: '只留下需要的那一块', category: '编辑',
      metaTitle: '图片裁剪 — 按任意区域或比例裁照片',
      long: '在照片上拖一下，只留你要的那块。要对上规格就锁成1:1、16:9或者头像比例；不想锁就自由拖，想裁成什么形状都行。',
      features: ['拖动决定裁剪范围', '可锁1:1、4:3、16:9等等', '实时显示裁完的尺寸', '按原画质保存'],
    },
    rotate: {
      title: '图片旋转与翻转', desc: '把躺倒的照片扶正，或者左右镜像', category: '编辑',
      metaTitle: '图片旋转与翻转 — 转正照片、做镜像',
      long: '存下来变成横躺的照片，按90°一档一档转回来；自拍被镜像了，用水平翻转翻回去。也能一度一度微调角度，把地平线摆平。',
      features: ['左转或右转90°', '水平或垂直翻转', '按1°微调角度', '挑填补边角的颜色'],
    },
    mosaic: {
      title: '照片模糊与马赛克', desc: '在脸或地址上涂一下就挡住', category: '编辑',
      metaTitle: '给照片打码或模糊 — 挡住人脸和个人信息',
      long: '用手指或鼠标在要挡的地方涂一下 — 二手交易照片里的地址、合影里别人的脸 — 只有涂过的地方会打上马赛克。什么都不上传，所以带个人信息的截图也能放心处理。',
      features: ['只在涂过的地方打码', '笔刷大小可调', '用纯黑整块盖掉', '只撤销涂错的那一笔'],
    },
    merge: {
      title: '图片拼接', desc: '把几张照片竖着或横着拼成一张', category: '编辑',
      metaTitle: '图片拼接 — 把几张照片合成一张',
      long: '把聊天截图接成一整张，或者把前后对比摆在一起时用。宽度不一样的照片会自动对齐，中间的间距和背景色也能自己定。',
      features: ['竖着拼或横着拼', '宽度不同会自动对齐', '设定间距和背景色', '调整照片顺序'],
    },
    palette: {
      title: '图片取色', desc: '把照片里的主色抽成HEX码', category: '分析',
      metaTitle: '图片取色 — 从照片拿到HEX色码',
      long: '想借用一张喜欢的照片的调子时，它会把用得最多的几个颜色抽出来，给你HEX和RGB的码。在照片上点哪儿，就拿到那一点的颜色。',
      features: ['自动抽出主色色板', '每个颜色占画面的比例', '任意点取色的吸管', '一键复制HEX码'],
    },
    watermark: {
      title: "添加水印", desc: "在照片上叠加文字水印", category: "编辑",
      metaTitle: "添加水印 — 在照片上叠加文字",
      long: "在照片上加文字水印。位置、大小、不透明度和颜色都能选，还可以斜着铺满整张图，让人无法简单裁掉。照片只在浏览器里处理，不会上传。",
      features: ["九个位置任选", "斜着铺满整张照片", "调整大小、不透明度和颜色", "文字大小随照片尺寸变化"],
    },
    adjust: {
      title: "照片调整", desc: "调节亮度、对比度、饱和度等", category: "编辑",
      metaTitle: "照片调整 — 亮度、对比度、饱和度、黑白",
      long: "调节亮度、对比度和饱和度，也可以把照片变成黑白或棕褐色。点一下六个预设就能一次应用，也可以自己拖动每个滑块。原图保持不变，只保存结果。",
      features: ["亮度、对比度、饱和度、黑白、棕褐、模糊", "六个预设可作起点", "每个滑块都能自己调", "一键全部重置"],
    },
    frame: {
      title: "添加边框", desc: "补白边把照片凑成正方形或竖版比例", category: "编辑",
      metaTitle: "添加边框 — 把照片凑成正方形或 4:5",
      long: "在照片四周补上留白，让它符合正方形、4:5 或其他比例。竖版照片在 Instagram 上会被裁掉时就用这个。照片本身不会被放大，只是加了留白，所以画质不会变差。",
      features: ["1:1、4:5、3:4、16:9、9:16 比例", "边框粗细和颜色可调", "照片不会被放大", "照片始终居中"],
    },
    round: {
      title: "圆角处理", desc: "把照片做成圆角，用作头像", category: "编辑",
      metaTitle: "圆角处理 — 把照片裁成圆形做头像",
      long: "把照片的角变圆。设为 100% 就成为完整的圆，可以直接当头像用。圆角之外的部分必须是透明的，所以结果始终保存为 PNG。",
      features: ["0 到 100% 的圆角程度", "100% 时是完整的圆", "先裁成正方形", "保存为透明 PNG"],
    },
    split: {
      title: "照片分割", desc: "把照片切成格子做 Instagram 拼图", category: "编辑",
      metaTitle: "照片分割 — 切成格子做 Instagram 九宫格",
      long: "把照片切成一格一格的独立图片，用来在 Instagram 主页上拼一张大图。尺寸除不尽时，多出来的像素会一格分一个，所以把这些块拼回去正好是原始尺寸。",
      features: ["2×1、3×1、2×2、3×3、1×2、1×3 格", "从左上角开始依次编号", "可以单独保存或全部保存", "拼回去正好是原始尺寸"],
    },
    favicon: {
      title: "网站图标生成器", desc: "一张图，生成网站需要的全部图标尺寸", category: "大小",
      metaTitle: "网站图标生成器 — 浏览器标签页、iOS 与安卓图标一次搞定",
      long: "上传一张图片，一次生成浏览器标签页图标（16、32、48）、iOS 主屏幕图标（180）和安卓网页应用图标（192、512）。同时给出可以粘贴进 head 的代码和 site.webmanifest 的内容，其中的文件名与实际生成的文件一致。",
      features: ["各平台真正会找的六个尺寸", "附带 head 代码和清单文件", "非正方形图片会从中间裁切", "保存为透明 PNG"],
    },
  },
  'zh-hant': {
    compress: {
      title: '圖片壓縮', desc: '犧牲一點畫質，把照片檔案變小', category: '大小',
      metaTitle: '圖片壓縮 — 免費縮小照片檔案大小',
      long: '附件超過大小限制時用。一檔一檔往下調畫質，把原圖和結果並排比，還能看到省下了百分之幾。照片在瀏覽器裡處理，絕不上傳。',
      features: ['用滑桿定壓縮程度', '立刻顯示省了百分之幾', '原圖和結果並排看', '存成JPG或WebP'],
    },
    resize: {
      title: '圖片尺寸調整', desc: '把寬高改成任意像素大小', category: '大小',
      metaTitle: '圖片尺寸調整 — 按像素改照片尺寸',
      long: '直接填寬和高，或者按百分比縮放，還能鎖住長寬比讓照片不被拉變形。常用尺寸 — Instagram貼文、YouTube縮圖、大頭貼 — 都是一按就好。',
      features: ['填像素或按百分比縮放', '鎖住長寬比', '常用尺寸預設', '預覽成品的檔案大小'],
    },
    convert: {
      title: '圖片格式轉換', desc: '在JPG、PNG和WebP之間轉', category: '大小',
      metaTitle: '圖片轉換器 — JPG、PNG和WebP雙向轉',
      long: '要傳到不收WebP的地方時用，或者反過來 — 想把檔案弄小的時候。透明背景的PNG轉成JPG時那塊背景會被填上，所以填什麼顏色也可以自己挑。',
      features: ['JPG、PNG、WebP任意方向互轉', '有損格式可調畫質', '挑填補透明的顏色', '轉換前後的檔案大小'],
    },
    crop: {
      title: '圖片裁切', desc: '只留下需要的那一塊', category: '編輯',
      metaTitle: '圖片裁切 — 按任意區域或比例裁照片',
      long: '在照片上拖一下，只留你要的那塊。要對上規格就鎖成1:1、16:9或者大頭貼比例；不想鎖就自由拖，想裁成什麼形狀都行。',
      features: ['拖動決定裁切範圍', '可鎖1:1、4:3、16:9等等', '即時顯示裁完的尺寸', '按原畫質儲存'],
    },
    rotate: {
      title: '圖片旋轉與翻轉', desc: '把躺倒的照片扶正，或者左右鏡像', category: '編輯',
      metaTitle: '圖片旋轉與翻轉 — 轉正照片、做鏡像',
      long: '存下來變成橫躺的照片，按90°一檔一檔轉回來；自拍被鏡像了，用水平翻轉翻回去。也能一度一度微調角度，把地平線擺平。',
      features: ['左轉或右轉90°', '水平或垂直翻轉', '按1°微調角度', '挑填補邊角的顏色'],
    },
    mosaic: {
      title: '照片模糊與馬賽克', desc: '在臉或地址上塗一下就擋住', category: '編輯',
      metaTitle: '給照片打碼或模糊 — 擋住人臉和個人資訊',
      long: '用手指或滑鼠在要擋的地方塗一下 — 二手交易照片裡的地址、合照裡別人的臉 — 只有塗過的地方會打上馬賽克。什麼都不上傳，所以帶個人資訊的截圖也能放心處理。',
      features: ['只在塗過的地方打碼', '筆刷大小可調', '用純黑整塊蓋掉', '只復原塗錯的那一筆'],
    },
    merge: {
      title: '圖片拼接', desc: '把幾張照片豎著或橫著拼成一張', category: '編輯',
      metaTitle: '圖片拼接 — 把幾張照片合成一張',
      long: '把聊天截圖接成一整張，或者把前後對比擺在一起時用。寬度不一樣的照片會自動對齊，中間的間距和背景色也能自己定。',
      features: ['豎著拼或橫著拼', '寬度不同會自動對齊', '設定間距和背景色', '調整照片順序'],
    },
    palette: {
      title: '圖片取色', desc: '把照片裡的主色抽成HEX碼', category: '分析',
      metaTitle: '圖片取色 — 從照片拿到HEX色碼',
      long: '想借用一張喜歡的照片的調子時，它會把用得最多的幾個顏色抽出來，給你HEX和RGB的碼。在照片上點哪兒，就拿到那一點的顏色。',
      features: ['自動抽出主色色票', '每個顏色占畫面的比例', '任意點取色的滴管', '一鍵複製HEX碼'],
    },
    watermark: {
      title: "加入浮水印", desc: "在照片上疊加文字浮水印", category: "編輯",
      metaTitle: "加入浮水印 — 在照片上疊加文字",
      long: "在照片上加文字浮水印。位置、大小、不透明度與顏色都能選，還可以斜著鋪滿整張圖，讓人無法簡單裁掉。照片只在瀏覽器裡處理，不會上傳。",
      features: ["九個位置任選", "斜著鋪滿整張照片", "調整大小、不透明度與顏色", "文字大小隨照片尺寸變化"],
    },
    adjust: {
      title: "照片調整", desc: "調節亮度、對比度、飽和度等", category: "編輯",
      metaTitle: "照片調整 — 亮度、對比度、飽和度、黑白",
      long: "調節亮度、對比度與飽和度，也可以把照片變成黑白或棕褐色。點一下六個預設就能一次套用，也可以自己拖動每個滑桿。原圖保持不變，只儲存結果。",
      features: ["亮度、對比度、飽和度、黑白、棕褐、模糊", "六個預設可作起點", "每個滑桿都能自己調", "一鍵全部重設"],
    },
    frame: {
      title: "加入邊框", desc: "補白邊把照片湊成正方形或直式比例", category: "編輯",
      metaTitle: "加入邊框 — 把照片湊成正方形或 4:5",
      long: "在照片四周補上留白，讓它符合正方形、4:5 或其他比例。直式照片在 Instagram 上會被裁掉時就用這個。照片本身不會被放大，只是加了留白，所以畫質不會變差。",
      features: ["1:1、4:5、3:4、16:9、9:16 比例", "邊框粗細與顏色可調", "照片不會被放大", "照片始終置中"],
    },
    round: {
      title: "圓角處理", desc: "把照片做成圓角，用作大頭貼", category: "編輯",
      metaTitle: "圓角處理 — 把照片裁成圓形做大頭貼",
      long: "把照片的角變圓。設為 100% 就成為完整的圓，可以直接當大頭貼用。圓角之外的部分必須是透明的，所以結果始終儲存為 PNG。",
      features: ["0 到 100% 的圓角程度", "100% 時是完整的圓", "先裁成正方形", "儲存為透明 PNG"],
    },
    split: {
      title: "照片分割", desc: "把照片切成格子做 Instagram 拼圖", category: "編輯",
      metaTitle: "照片分割 — 切成格子做 Instagram 九宮格",
      long: "把照片切成一格一格的獨立圖片，用來在 Instagram 首頁上拼一張大圖。尺寸除不盡時，多出來的像素會一格分一個，所以把這些塊拼回去正好是原始尺寸。",
      features: ["2×1、3×1、2×2、3×3、1×2、1×3 格", "從左上角開始依序編號", "可以單獨儲存或全部儲存", "拼回去正好是原始尺寸"],
    },
    favicon: {
      title: "網站圖示產生器", desc: "一張圖，產生網站需要的全部圖示尺寸", category: "大小",
      metaTitle: "網站圖示產生器 — 瀏覽器分頁、iOS 與安卓圖示一次搞定",
      long: "上傳一張圖片，一次產生瀏覽器分頁圖示（16、32、48）、iOS 主畫面圖示（180）與安卓網頁應用圖示（192、512）。同時給出可以貼進 head 的程式碼與 site.webmanifest 的內容，其中的檔名與實際產生的檔案一致。",
      features: ["各平台真正會找的六個尺寸", "附帶 head 程式碼與資訊清單", "非正方形圖片會從中間裁切", "儲存為透明 PNG"],
    },
  },
};

/**
 * 언어별 분류 순서.
 *
 * 분류 이름을 번역하면 한국어 순서 배열로는 아무것도 못 걸러낸다 — 색상 섹션에서
 * 그 실수로 허브에서 도구 두 개가 조용히 사라졌다. 여기 문자열은 위 category와
 * 글자까지 같아야 한다.
 */
export const IMAGE_CATEGORY_ORDER: Record<ImageIntlLang, string[]> = {
  en: ['Size', 'Edit', 'Analyse'],
  es: ['Tamaño', 'Editar', 'Analizar'],
  'pt-br': ['Tamanho', 'Editar', 'Analisar'],
  ja: ['サイズ', '編集', '解析'],
  de: ['Größe', 'Bearbeiten', 'Analysieren'],
  fr: ['Taille', 'Retoucher', 'Analyser'],
  hi: ['आकार', 'संपादन', 'विश्लेषण'],
  'zh-hans': ['大小', '编辑', '分析'],
  'zh-hant': ['大小', '編輯', '分析'],
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function imageToolsIntl(lang: ImageIntlLang): ImageTool[] {
  return IMAGE_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findImageToolIntl(lang: ImageIntlLang, slug: string): ImageTool | undefined {
  return imageToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedImageToolsIntl(lang: ImageIntlLang, slug: string, count = 4): ImageTool[] {
  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 전에는 `[...same, ...rest].slice(0, count)`였고, 그러면 갈래의 앞에서
   * 넉 개만 뽑혀 뒤쪽 도구에 **들어오는 링크가 0**이 됐다 — 여덟 섹션에서
   * 열두 도구가 그 상태였고 열 언어이므로 120쪽이었다.
   */
  return relatedBySlug(imageToolsIntl(lang), slug, count, (a, b) => a.category === b.category);
}

/**
 * 라우트가 그대로 쓰는 메타데이터.
 *
 * 문구를 page.tsx에 박아 두면 언어 일곱 개 × 도구 여덟 개로 쉰여섯 벌이 생기고,
 * 여기 문구를 고쳤을 때 <title>만 옛 문구로 남는다. 페이지는 이 함수를 부른다.
 */
export function imageMetaIntl(lang: ImageIntlLang, slug: string) {
  const t = findImageToolIntl(lang, slug);
  if (!t) throw new Error(`image-tools-intl: 도구가 없다 — ${slug}`);
  return withCard({
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/image/${slug}`),
      languages: alternateLanguages10(`/image/${slug}`),
    },
  });
}

export function imageHubMetaIntl(lang: ImageIntlLang) {
  const ui = IMAGE_SHELL_UI[lang];
  return withCard({
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/image'),
      languages: alternateLanguages10('/image'),
    },
  });
}

/** 셸·허브 UI 문구 */
export const IMAGE_SHELL_UI: Record<ImageIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Image tools',
    canDo: 'What this tool does', others: 'Other image tools',
    notice: '🔒 Your photo is processed in the browser and never uploaded.',
    footNote: 'Very large photos may take a moment, and can be heavy on older phones.',
    hubTitle: 'Image Tools — Compress, Resize, Crop, Blur',
    hubDesc: 'Free image tools that run in your browser: compress, resize, convert format, crop, rotate, pixelate faces, combine photos and extract colours. Nothing is uploaded.',
    hubLead: 'Compress, crop and edit photos — nothing leaves your browser.',
    hubFoot: 'Free image tools', eyebrow: 'Image',
  },
  es: {
    home: 'Inicio', section: 'Herramientas de imagen',
    canDo: 'Qué hace esta herramienta', others: 'Otras herramientas de imagen',
    notice: '🔒 Tu foto se procesa en el navegador y no se sube a ningún sitio.',
    footNote: 'Las fotos muy grandes tardan un momento y pueden pesar en móviles antiguos.',
    hubTitle: 'Herramientas de imagen — Comprimir, redimensionar, recortar, pixelar',
    hubDesc: 'Herramientas de imagen gratis que funcionan en tu navegador: comprimir, redimensionar, convertir formato, recortar, girar, pixelar caras, unir fotos y extraer colores. No se sube nada.',
    hubLead: 'Comprime, recorta y edita fotos — nada sale de tu navegador.',
    hubFoot: 'Herramientas de imagen gratis', eyebrow: 'Imagen',
  },
  'pt-br': {
    home: 'Início', section: 'Ferramentas de imagem',
    canDo: 'O que esta ferramenta faz', others: 'Outras ferramentas de imagem',
    notice: '🔒 Sua foto é processada no navegador e não é enviada para nenhum servidor.',
    footNote: 'Fotos muito grandes demoram um instante e podem pesar em celulares antigos.',
    hubTitle: 'Ferramentas de imagem — Comprimir, redimensionar, recortar, pixelar',
    hubDesc: 'Ferramentas de imagem grátis que rodam no navegador: comprimir, redimensionar, converter formato, recortar, girar, pixelar rostos, juntar fotos e extrair cores. Nada é enviado.',
    hubLead: 'Comprima, recorte e edite fotos — nada sai do seu navegador.',
    hubFoot: 'Ferramentas de imagem grátis', eyebrow: 'Imagem',
  },
  ja: {
    home: 'ホーム', section: '画像ツール',
    canDo: 'このツールでできること', others: 'ほかの画像ツール',
    notice: '🔒 写真はブラウザの中で処理され、どこにもアップロードされません。',
    footNote: 'とても大きな写真は少し時間がかかり、古いスマートフォンでは重くなることがあります。',
    hubTitle: '画像ツール — 圧縮・サイズ変更・切り抜き・モザイク',
    hubDesc: 'ブラウザで動く無料の画像ツール：圧縮、サイズ変更、形式変換、切り抜き、回転、顔のモザイク、画像結合、色の抽出。アップロードは一切ありません。',
    hubLead: '圧縮・切り抜き・編集まで — 写真はブラウザから出ません。',
    hubFoot: '無料の画像ツール', eyebrow: 'Image',
  },
  de: {
    home: 'Start', section: 'Bildwerkzeuge',
    canDo: 'Was dieses Werkzeug macht', others: 'Weitere Bildwerkzeuge',
    notice: '🔒 Dein Foto wird im Browser verarbeitet und nie hochgeladen.',
    footNote: 'Sehr große Fotos brauchen einen Moment und können ältere Handys belasten.',
    hubTitle: 'Bildwerkzeuge — Komprimieren, Größe ändern, Zuschneiden, Verpixeln',
    hubDesc: 'Kostenlose Bildwerkzeuge direkt im Browser: komprimieren, Größe ändern, Format umwandeln, zuschneiden, drehen, Gesichter verpixeln, Fotos zusammenfügen und Farben auslesen. Es wird nichts hochgeladen.',
    hubLead: 'Komprimieren, zuschneiden, bearbeiten — nichts verlässt deinen Browser.',
    hubFoot: 'Kostenlose Bildwerkzeuge', eyebrow: 'Bild',
  },
  fr: {
    home: 'Accueil', section: 'Outils d’image',
    canDo: 'Ce que fait cet outil', others: 'Autres outils d’image',
    notice: '🔒 Ta photo est traitée dans le navigateur et n’est jamais envoyée.',
    footNote: 'Les très grandes photos prennent un instant et peuvent peser sur les vieux téléphones.',
    hubTitle: 'Outils d’image — Compresser, redimensionner, recadrer, pixeliser',
    hubDesc: 'Outils d’image gratuits qui tournent dans le navigateur : compresser, redimensionner, convertir le format, recadrer, faire pivoter, pixeliser des visages, assembler des photos et extraire des couleurs. Rien n’est envoyé.',
    hubLead: 'Compresser, recadrer, retoucher — rien ne quitte ton navigateur.',
    hubFoot: 'Outils d’image gratuits', eyebrow: 'Image',
  },
  hi: {
    home: 'होम', section: 'इमेज उपकरण',
    canDo: 'यह उपकरण क्या करता है', others: 'अन्य इमेज उपकरण',
    notice: '🔒 आपकी फ़ोटो ब्राउज़र में ही प्रोसेस होती है, कहीं अपलोड नहीं होती।',
    footNote: 'बहुत बड़ी फ़ोटो में एक पल लगता है और पुराने फ़ोन पर भारी पड़ सकती है।',
    hubTitle: 'इमेज उपकरण — कंप्रेस, आकार, क्रॉप, पिक्सेल',
    hubDesc: 'ब्राउज़र में चलने वाले मुफ़्त इमेज उपकरण: कंप्रेस, आकार बदलना, फ़ॉर्मेट बदलना, क्रॉप, घुमाना, चेहरे पिक्सेल करना, फ़ोटो जोड़ना और रंग निकालना। कुछ भी अपलोड नहीं होता।',
    hubLead: 'कंप्रेस, क्रॉप और संपादन — फ़ोटो ब्राउज़र से बाहर नहीं जाती।',
    hubFoot: 'मुफ़्त इमेज उपकरण', eyebrow: 'इमेज',
  },
  'zh-hans': {
    home: '首页',
    section: '图片工具',
    canDo: '这个工具做什么',
    others: '其他图片工具',
    notice: '🔒 照片在浏览器里处理，绝不上传。',
    footNote: '很大的照片会慢一点，旧手机上会比较吃力。',
    hubTitle: '图片工具 — 压缩、调整尺寸、裁剪、打码',
    hubDesc: '在浏览器里跑的免费图片工具：压缩、调整尺寸、转格式、裁剪、旋转、给人脸打码、拼接照片、抽取颜色。什么都不上传。',
    hubLead: '压缩、裁剪、修图 — 什么都不会离开你的浏览器。',
    hubFoot: '免费图片工具',
    eyebrow: '图片',
  },
  'zh-hant': {
    home: '首頁',
    section: '圖片工具',
    canDo: '這個工具做什麼',
    others: '其他圖片工具',
    notice: '🔒 照片在瀏覽器裡處理，絕不上傳。',
    footNote: '很大的照片會慢一點，舊手機上會比較吃力。',
    hubTitle: '圖片工具 — 壓縮、調整尺寸、裁切、打碼',
    hubDesc: '在瀏覽器裡跑的免費圖片工具：壓縮、調整尺寸、轉格式、裁切、旋轉、給人臉打碼、拼接照片、抽取顏色。什麼都不上傳。',
    hubLead: '壓縮、裁切、修圖 — 什麼都不會離開你的瀏覽器。',
    hubFoot: '免費圖片工具',
    eyebrow: '圖片',
  },
};
