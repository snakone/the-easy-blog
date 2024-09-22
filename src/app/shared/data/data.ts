import { IconList, ActionList, TextList, FQAItem } from '@shared/types/interface.app';
import { Post, SearchResultAmount } from '@shared/types/interface.post';
import { CheckStatusList } from '@shared/types/interface.server';
import { DraftStatusEnum, DraftTypeEnum } from '@shared/types/types.enums';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SearchResult } from '@shared/types/interface.user';

export const CARROUSEL_OPTS: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  margin: 20,
  lazyLoad: true,
  responsiveRefreshRate: 100,
  fluidSpeed: true,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    992: { items: 3 }
  }
};

export const DUMMY_POST: Post[] = [
  {
    _id: '1',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING.',
    category: 'Ciéncia',
    author: 'Elisa Park',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/05-img.jpg',
    status: DraftStatusEnum.NOT_SEEN,
    type: DraftTypeEnum.POST,
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum. Integer sem dui, porttitor ac mi in, consequat imperdiet lacus. Maecenas ornare orci sit amet leo dictum, a aliquet magna cursus. Curabitur et ligula gravida, dapibus lectus et, gravida eros. Aenean lacinia sapien vel tortor dignissim, commodo tincidunt dolor eleifend. Vestibulum tempor semper ipsum, nec tincidunt eros consectetur quis. Curabitur luctus ex at massa tincidunt, sit amet tincidunt libero dapibus. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum.' 
  },
  {
    _id: '2',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Ingeniería',
    author: 'Marisa Hudson',
    createdAt: new Date('Sep, 06 2019'),
    status: DraftStatusEnum.NOT_SEEN,
    type: DraftTypeEnum.POST,
    cover: 'assets/images/05-img.jpg',
    user: '62262ead2aed27b93083e607',
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum. Integer sem dui, porttitor ac mi in, consequat imperdiet lacus. Maecenas ornare orci sit amet leo dictum, a aliquet magna cursus. Curabitur et ligula gravida, dapibus lectus et, gravida eros. Aenean lacinia sapien vel tortor dignissim, commodo tincidunt dolor eleifend. Vestibulum tempor semper ipsum, nec tincidunt eros consectetur quis. Curabitur luctus ex at massa tincidunt, sit amet tincidunt libero dapibus. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum.' 
  },
  {
    _id: '3',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Otro',
    author: 'Jhone Albert',
    createdAt: new Date('Sep, 07 2019'),
    status: DraftStatusEnum.PENDING,
    type: DraftTypeEnum.POST,
    cover: 'assets/images/05-img.jpg'
  },
  {
    _id: '4',
    title: 'Sed quis sollicitudin eros, non lobortis purus.',
    category: 'Videojuegos',
    author: 'Albert Jhone',
    createdAt: new Date('Sep, 08 2019'),
    status: DraftStatusEnum.APPROVED,
    type: DraftTypeEnum.POST,
    cover: 'assets/images/05-img.jpg'
  },
  {
    _id: '5',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Ciéncia',
    author: 'Alfred Hannog',
    createdAt: new Date('Sep, 09 2019'),
    status: DraftStatusEnum.SEEN,
    type: DraftTypeEnum.POST,
    cover: 'assets/images/05-img.jpg'
  }
];

export const USER_INDEX: IconList[] = [
  { icon: 'far fa-user-circle', label: 'Perfil', route: './' },
  { icon: 'fab fa-ioxhost', label: 'Artículos', route: 'posts' },
  { icon: 'fas fa-file-signature', label: 'Bocetos', route: 'drafts' },
  { icon: 'far fa-star', label: 'Favoritos', route: 'favorites'},
  { icon: 'fas fa-users', label: 'Amigos', route: 'friends' },
  { icon: 'fas fa-cog', label: 'Ajustes', route: 'settings' }
];

export const CREATE_ACTION_LIST: ActionList[] = [
  { icon: 'fas fa-plus', label: 'Nuevo...', action: 'new' },
  { icon: 'far fa-eye', label: 'Previsualizar', action: 'preview' },
  { icon: 'fas fa-broom', label: 'Limpiar', action: 'clean' },
  { icon: 'far fa-trash-alt', label: 'Eliminar', action: 'delete' },
  { icon: 'fas fa-cloud-download-alt', label: 'Descargar en HTML', action: 'download' },
];


export const POST_CATEGORIES: TextList[] = [
  { label: 'Actualidad', key: 'news' },
  { label: 'Naturaleza', key: 'nature' },
  { label: 'Cultura', key: 'culture' },
  { label: 'Ciéncia', key: 'science' },
  { label: 'Política', key: 'politics' },
  { label: 'Ingeniería', key: 'engine' },
  { label: 'Humor', key: 'fun' },
  { label: 'Internet', key: 'internet' },
  { label: 'Videojuegos', key: 'games' },
  { label: 'Filosofía', key: 'filosofy' },
  { label: 'Otras...', key: 'others' }
];

export const POST_ICONS: ActionList[] = [
  { 
    icon: 'far fa-envelope',
    label: 'Mensaje',
    action: 'message'
  },
  { 
    icon: 'fas fa-cloud-download-alt',
    label: 'Descargar',
    action: 'download'
  },
];

export const DRAFT_ICONS: ActionList[] = [
  { 
    icon: 'fas fa-pen-fancy',
    label: 'Editar',
    action: 'edit'
  },
  { 
    icon: 'fas fa-external-link-alt',
    label: 'Previsualizar',
    action: 'preview'
  },
  { 
    icon: 'fas fa-cloud-download-alt',
    label: 'Descargar',
    action: 'download'
  },
  { 
    icon: 'fas fa-trash',
    label: 'Eliminar',
    action: 'delete'
  }
];

export const NAVBAR_MENU: IconList[] = [
  {label: 'Home', route: '/home', _id: 1},
  {label: 'About us', route: '/home', _id: 2},
  {label: 'Contacto', route: '/contact', _id: 3},
  {label: 'Políticas', route: '/conditions', _id: 4}
];

export const NAVBAR_ICONS: IconList[]  = [
  { icon: 'far fa-file-alt', route: '/news', _id: 1 },
  { icon: 'fas fa-question', route: '/help', _id: 2 }
];

// DRAFT CHECK
export const CHECKSTATUS: CheckStatusList[] = [
  {
    name: 'Título',
    hint: 'Título claro y conciso.',
    icon: 'fas fa-hashtag',
    prop: 'title',
    checkProp: 'hasGoodTitle',
    checkMessage: 'El boceto cumple con los requisitos de un buen <strong>título</strong>.',
    cause: '¿Por qué el título no cumple los requisitos?',
    desc: `<p>
              Un buen <strong>título</strong> es corto y descriptivo. Solo con leerlo deberías
              ser capaz de identificar que tipo de contenido vas a encontrar dentro.
              También puedes dar una idea del título con una pregunta. "¿Es la ciberseguridad una
              opción segura?", "¿Es ChatGPT el futuro?". No olvides que el lector decide si seguir
              leyendo después de leer el título.
           </p>`
  },
  {
    name: 'Categoría',
    hint: 'Categoría acorde al tema.',
    icon: 'far fa-folder',
    prop: 'category',
    checkProp: 'hasGoodCategory',
    checkMessage: 'El boceto tiene una <strong>categoría</strong> relacionada.',
    cause: '¿Por qué la categoría no cumple los requisitos?',
    desc: `<p>
              Después de echar un ojo al boceto podrás decidir si la <strong>categoría</strong>
              corresponde con la proporcionada. Ten en cuenta que es posible que un tema
              abarque dos o más categorías, intenta aprobar la más acorde.
           </p>`
  },
  {
    name: 'Imagen',
    hint: 'Formato de la imagen correcto.',
    icon: 'far fa-image',
    prop: 'cover',
    checkProp: 'hasGoodCover',
    checkMessage: 'El boceto tiene una buena <strong>imagen</strong> de portada y pesa menos de <strong>150kb</strong>.',
    cause: '¿Por qué la imagen no cumple los requisitos?',
    desc: `<p>
            ¿Te gusta la <strong>imagen</strong> que ves? Esta imagen se usará como portada para el Artículo
            y será lo primero que verá el lector. Es muy importante que esté relacionada
            con el boceto de alguna manera. Además no podrá superar los 100kb. Esto es
            así para que la página cargue lo más rápido posible.
          </p>`
  },
  {
    name: 'Introducción',
    hint: 'Introducción cumple los requisitos.',
    icon: 'fas fa-address-card',
    prop: 'intro',
    checkProp: 'hasGoodIntro',
    checkMessage: 'El boceto tiene una <strong>introducción</strong> correcta.',
    cause: '¿Por qué la introducción no cumple los requisitos?',
    desc: `<p>
            Escribir una buena <strong>introducción</strong> es esencial para que el lector haga
            click en el Artículo para leerlo entero. Son las primeras letras del Artículo, así
            que tienen que atraer al lector de una manera rápida y directa.
          </p>`
  }
];

export const FQA_ITEMS: FQAItem[] = [
  {
    label: '¿Qué es Formatted Blog?',
    content: [
      `The Formatted Blog es una aplicación web para crear y compartir contenido de una manera rápida y elegante. 
      La premisa es fácil, imagina esta aplicación como tu propio cuaderno en línea. También puedes pensar que sirve como
      tu propia biblioteca personal. Los administradores se encargarán de decidir que textos se puede añadir al catálogo 
      existente de artículos. Es como introducir un nuevo ejemplar de un libro en una biblioteca. Una vez dentro, cualquier persona tendrá acceso a esta información.`
    ]
  },
  {
    label: '¿Cuál es el origen de Formatted Blog?',
    content: [
      `Me alegra que hayas abierto este elemento ya que la pregunta es bien interesante. Es una historia muy larga y 
      personalmente espero que esta aplicación sea la definitiva.`,
      `¿A qué me refiero con esto? Pues se podría decir que <b>The Formatted Blog</b> es el nieto e incluso me atrevería 
      a decir - bisnieto de lo que un día fué la idea original detrás de todo esto.`,
      `No es lugar para contar historias, aunque en resumen, siempre me ha gustado la escritura. Suma esto a que la tecnología es
      increíble y mas o menos tenemos una pequeña idea.`
    ]
  },
  {
    label: '¿Puedo crear contenido en Formatted Blog?',
    content: [
      `¡Por supuesto! Tan solo necesitas registrarte en la aplicación. No te llevará más de 30 segundos. Una vez registrado, tendrás 
      acceso completo a todas las características que ofrecemos. incluyendo la posibilidad de empezar a crear tus primeros bocetos. Simplemente utiliza el boton
      <i class="fas fa-feather-alt"></i> que se encuentra en la barra de navegación una vez ya estés dentro del sistema con tu usuario.`,
      `Dentro de esta página encontrarás un listado de tus bocetos (si es tu primera vez, estará vacío) para que puedas cambiar de uno a otro rapidamente.
      Además está la parte más importante, la hoja de papel dónde pasará todo.`,
      `Lo que has escrito se guarda automáticamente cada ciertos segundos. Simplemente fíjate en este icono cuando estés escribiendo, 
      <i class="fas fa-check"></i>, significa que todo ha ido bien y tus cambios se han guardado. No olvides cambiar el título, añadir una categoría y otra información útil
      que nos sirve a la hora de compartir de contenido de una manera más elegante y ordenada. Para ello pulsa el botón 
      <i class="fab fa-wpforms"></i> situado en la barra inferior.`,
      `Ten en cuenta que hasta que el formulario no sea válido, los cambios de la información del artículo no se guardarán 
      (El mensaje principal se guarda aunque no esté toda la información añadida).` 
    ]
  },
  {
    label: '¿Por qué el boceto que he creado no aparece en la página de artículos?',
    content: [
      `Contando con la posibilidad de que cualquier persona registrada puede crear contenido, debemos asegurarnos de tener alguna especie de filtro 
      para evitar contenido inhadecuado. Para más información puedes visitar la página de <b>Políticas</b>. Es por esto que los bocetos que creas no 
      pasan directamente a estar al alcance de todo el mundo. Mientras lo que hayas creado sea considerado boceto o no artículo, solamente tu tendrás acceso a él. 
      Los administradores se reservan el derecho de poder aprobar boceto para que se conviertan en artículos y así puedan ser vistos, leidos y disfrutados por todos y todas.`,
      `Llegados a este punto, solo queda esperar. Los administradores harán lo que puedan para revisar los bocetos lo antes posible. Si crees que tardan mucho o 
      su criterio no lo encuentras del todo correcto a la hora de revisar, siempre puedes
      ponerte en contacto con nosotros en <a href="mailto:theformattedblog@gmail.com">theformattedblog@gmail.com</a>.`,
      `Los administradores podrán darte indicaciones de qué está fallando en tu boceto, para que sepas con certeza que es lo que se necesita corregir. 
      Recuerda visitar tus bocetos amenudo para comprobar el estado de los mismos y si alguno necesita actualizarse siguiendo las indicaciones sugeridas 
      por los administradores.`,
      `Subscríbete a las notificaciones para enterarte de todo este proceso en tiempo real. Te avisaremos cuando uno de tus bocetos sea aprobado.`
    ]
  },
  {
    label: '¿Qué diferencia hay entre un boceto y un artículo?',
    content: [
      `Lo principal es que a diferencia de los artículos, los bocetos son exclusivamente tuyos, nadie más puede verlos. 
      Hasta que algún administrador no apruebe alguno de tus bocetos, no podrá ser consultado por todo el mundo. Hacemos esto para evitar mostrar 
      contenido inhadecuado como hemos explicado en puntos anteriores.`,
      `Recuerda que existe 'feedback' directo con los administradores para saber que aspectos hay que mejorar en el boceto. No olvides visitar la 
       página de tus bocetos amenudo para estar atento a los últimos cambios.`
    ]
  },
  {
    label: '¿Qué en un artículo temportal?',
    content: [
      `Así como existe la posibilidad de que un boceto se convierta en artículo, también tenemos la otra cara de la moneda. ¿No has pensado que cabe 
      la posibilidad que de un artículo ya publicado tenga que ser editado? Un artículo <b>temporal</b> es eso; Un artículo que necesita ser editado.`,
      `Sabiendo esto, un artículo temporal cuenta con una serie de características únicas que lo hacen diferente al resto:`,
      `<ol>
      <li>Son temporales. Significa que si refrescas la aplicación, perderás este estado y tendrás que volver a confirmar su edición.</li>
      <li>Si un artículo temporal es editado, automáticamente pasará a convertirse en boceto y dejará de ser público.</li>
      <li>Un artículo temporal que ha pasado a boceto, debe volver a ser revisado por los administradores para comprobar que los nuevos cambios
      siguien cumpliendo lo establecido en nuestras <b>Políticas</b>.</li>
      </ol>`,
      `Hablando de edición. Para editar un artículo simplemente selecciona el icono de edición <i class="fas fa-pen-fancy"></i> que aparecerá 
      solamente en aquellos artículos públicos que sean tuyos. No te preocupes, te avisaremos si estás seguro de querer editar un artículo 
      que luego se convertirá de nuevo en boceto.`
    ]
  },
  {
    label: '¿Cuánto tarda un boceto es ser aprobado?',
    content: [
      `Depende, si es un boceto con todo lo necesario y sin contenido inhadecuado, puede ser aprobado en cuestión de pocas horas, simplemente echando un 
      ojo por encima al boceto. Ten en cuenta que los administradores no están para corregir faltas de ortografía, sino mas bien para asegurar que no hay nada fuera 
      de lo común y permitido.`,
      `Asi que gran parte del tiempo que puede tardar un boceto en ser aprobado depende de ti. ¡Ayúdanos poniéndonoslo fácil! Escribir textos bien redactados, con foto 
      de portada, con una buena categoría acorde al tema y una introducción atrayente... nos ayuda mucho, así que con todo esto, aprobar el boceto puede ser coser y cantar.`
    ]
  },
  {
    label: 'Uno de mis bocetos está pendiente ¿Qué significa?',
    content: [
      `Un administrador puede marca un boceto como 'pendiente' siempre que lo vea necesario. Esto significa que el administrador ve bien el boceto, 
      aunque necesita más tiempo para revisarlo. Mientras el boceto esté en este estado, el autor no podrá editarlo. Esto sirve para que el administrador no 
      tenga que estar revisando a cada nuevo cambio del autor.`,
      `En resumen, si ves que alguno de tus bocetos esta en 'pendiente', es por que un adminitrador lo está revisando y ha bloqueado la edición para que no
      haya nuevos cambios y pueda revisar el boceto tranquilamente.`
    ]
  },
  {
    label: '¿Qué otras características ofrece The Formatted Blog a parte de crear contenido?',
    content: [
      `El principal objetivo de la aplicación consiste en eso, crear contenido. Aunque eso no significa que no se puedan hacer otras cosas. Recuerda que estas características 
      pueden cambiar con el tiempo y se pueden añadir, en la mayoría de los casos y/o también eliminar, en casos muy concretos. A parte de lo mencionado, The Formatted Blog 
      dispone de las siguientes características:`,
      `<ul>
       <li>Tener tu propia cuenta y página de perfil.</li>
       <li>Un menú de configuración para cambiar la aplicación a tu gusto.</li>
       <li>La posibilidad de contactar con otras personas y hacer amistades.</li>
       <li>Sistema de puntuaciones, likes y visitas. ¿Quién llegará a la cima?</li>
       <li>Estar subscrito a las notificaciones para no perderte nada.</li>
       <li>Apartado de noticias con lo más relevante de la actualidad.</li>
       </ul>`,
       `Si tienes alguna sugerencia de otras características que podamos añadir, no lo dudes y escríbenos a <a href="mailto:theformattedblog@gmail.com">theformattedblog@gmail.com</a> 
       con tu propuesta, estaremos encantados de escucharla.` 
    ]
  }
];

export const EMPTY_RECENT_POST: Post[] = [
  {
    title: 'Beauty of Nature',
    author: 'Rick Allenson',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/06-img.jpg',
    _id: "1"
  },
  {
    title: 'Beauty of Nature',
    author: 'Rick Allenson',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/07-img.jpg',
    _id: "2"
  },
  {
    title: 'Beauty of Nature',
    author: 'Rick Allenson',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/08-img.jpg',
    _id: "3"
  },
  {
    title: 'Beauty of Nature',
    author: 'Rick Allenson',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/09-img.jpg',
    _id: "4"
  },
  {
    title: 'Beauty of Nature',
    author: 'Rick Allenson',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/12-img.jpg',
    _id: "5"
  },
  {
    title: 'Beauty of Nature',
    author: 'Rick Allenson',
    createdAt: new Date('Sep, 05 2019'),
    cover: 'assets/images/13-img.jpg',
    _id: "6"
  },
];

export const STATS_LIST: IconList[] = [
  { label: 'views', icon: 'far fa-eye' },
  { label: 'likes', icon: 'far fa-heart' },
  { label: 'friends', icon: 'fas fa-user-friends' }
];

export const SOCIAL_LIST: IconList[] = [
  { label: 'twitter', icon: 'fab fa-twitter' },
  { label: 'github', icon: 'fab fa-github' },
  { label: 'portfolio', icon: 'fas fa-link' },
];

export const SEARCH_DEFAULT_PLACEHOLDER = 'Busca por título, categoría, autor, estado del boceto...';

export const SEARCH_RESULT_AMOUNT_LIST= (result: SearchResult) => [
  { name: 'Artículos', icon: 'far fa-newspaper', amount: result.posts.length || 0 },
  { name: 'Bocetos', icon: 'far fa-paper-plane', amount: result.drafts.length || 0 },
  { name: 'Usuarios', icon: 'fas fa-user', amount: result.users.length || 0 },
  { name: 'Amigos', icon: 'fas fa-users', amount: result.friends.length || 0 },
];