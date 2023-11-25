import { QuillHelpItem } from "@shared/types/interface.post";
import { QuillToolbarConfig } from "ngx-quill";

export const EMPTY_QUILL = {
  "ops": [{"insert": "\n"}]
};

export const QUILL_CONTAINER: string | string[] | QuillToolbarConfig = [
  ['bold'],
  ['blockquote', 'code-block'],
  [{ 'header': 2 }, { 'header': 3 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['undo' , 'redo'],
  ['link', 'image', 'video'],
];

export const HEADER_3_QUILL_ICON: string = `<svg viewBox="0 0 18 18">
<path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,
1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,
1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,
.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,
1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,
10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
</svg>`;

export const QUILL_HELP_ITEMS: QuillHelpItem[] = [
  {
    icon: 'fas fa-bold',
    label: 'Negrita'
  },
  {
    icon: 'fas fa-quote-right',
    label: 'Cita (Blockquote)',
    class: 'ql-blockquote'
  },
  {
    icon: 'fas fa-code',
    label: 'Código',
    class: 'ql-code-block'
  },
  {
    icon: 'fas fa-heading',
    label: 'Encabezado',
    class: 'ql-header'
  },
  {
    icon: 'fas fa-list-ol',
    label: 'Lista numerada',
    class: 'ql-list'
  },
  {
    icon: 'fas fa-list-ul',
    label: 'Lista desordenada',
    class: 'ql-list'
  },
  {
    icon: 'fas fa-undo',
    label: 'Deshacer',
  },
  {
    icon: 'fas fa-redo',
    label: 'Rehacer',
  },
  {
    icon: 'fas fa-link',
    label: 'Insertar enlace',
    class: 'ql-link'
  },
  {
    icon: 'fas fa-image',
    label: 'Insertar imagen',
    class: 'ql-image'
  },
  {
    icon: 'fas fa-photo-video',
    label: 'Insertar vídeo',
    class: 'ql-video'
  },
];


