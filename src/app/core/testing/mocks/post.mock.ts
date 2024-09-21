import { Post } from "@shared/types/interface.post"
import { DraftTypeEnum } from "@shared/types/types.enums"
import { DeltaStatic } from "quill";


export const MOCK_DRAFT: Post = {
  _id: 'test-id',
  active: false,
  adminSeenOnce: false,
  author: 'test',
  category: "Actualidad",
  likes: 2,
  temporal: false,
  type: DraftTypeEnum.DRAFT,
  title: 'test-draft',
  views: 1,
  slug: 'test-draft',
  user: 'test-id',
  message: {
    "ops": [
        {
            "insert": "HELLO THIS IS A TEST MESSAGE\n"
        }
    ]
  } as DeltaStatic
}

export const MOCK_POST: Post = {
  _id: 'test-id',
  active: false,
  adminSeenOnce: false,
  author: 'test',
  category: "Actualidad",
  likes: 1,
  temporal: false,
  type: DraftTypeEnum.POST,
  title: 'test-post',
  views: 4,
  slug: 'test-post',
  user: 'test-user',
  message: {
    "ops": [
        {
            "insert": "HELLO THIS IS A TEST MESSAGE\n"
        }
    ]
  } as DeltaStatic
}

export const MOCK_POST_MESSAGE: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nisi culpa pariatur vitae? Eligendi hic adipisci
consectetur delectus numquam temporibus ad ullam nobis? Nesciunt animi cupiditate nemo inventore, blanditiis itaque aut
repellendus, delectus recusandae expedita doloremque ipsum possimus impedit temporibus. Corrupti, quo impedit quisquam
facilis ullam libero alias? Unde iste dolore officiis magnam? Aspernatur maxime recusandae cum deserunt quidem similique
voluptate, molestiae hic necessitatibus est facere consequatur tenetur veritatis repellendus ratione earum. Deserunt
amet veniam ratione maiores, temporibus repellat? Repellat aliquid minus, nemo praesentium nihil obcaecati ratione.
Sapiente illo, inventore necessitatibus ullam cumque maiores distinctio, sunt voluptatibus nulla enim illum dolorum
aliquid, provident saepe eum beatae minima at corrupti tempora. Sapiente nam, corrupti culpa magnam, distinctio
inventore quae laborum animi doloribus alias temporibus iure nostrum id beatae totam! Alias vel error similique
repellendus porro deleniti, consequuntur obcaecati facilis est vitae eum sed harum, modi sunt dignissimos? Libero, quod
quam laborum impedit voluptates ea beatae accusamus dolore natus officiis atque enim ratione odio doloribus. Rem commodi
esse fugit doloremque molestias, suscipit nesciunt harum voluptatibus obcaecati similique maxime labore quas eius
quaerat qui quasi repudiandae. Sapiente laborum, incidunt fuga natus quas saepe dicta numquam pariatur doloribus
repudiandae explicabo accusamus possimus totam dolores repellat nobis quia nostrum accusantium! Libero impedit nobis
fugiat, ad voluptas sapiente adipisci. Excepturi enim quae illum voluptate incidunt facere, beatae, similique ut magni
aspernatur nisi quibusdam consequuntur distinctio minima vitae error accusantium eius hic aliquam! Quidem expedita sequi
deleniti illum dolores a provident vel non hic, autem aperiam. Consequatur, quasi iusto expedita totam sed a enim non
excepturi et quidem deserunt, accusantium repudiandae nemo ad natus alias hic reiciendis tempora, tenetur facilis illo
corrupti minus. Vero, doloribus illo minima, facere voluptatem consectetur dolores vel accusantium excepturi sequi quia
consequuntur hic nulla ut fugiat dolorum blanditiis reiciendis eos placeat dolore pariatur? Odit impedit earum tempora,
eveniet laborum nihil repellendus ea aliquam eum dicta placeat sed dolor quod omnis minus nemo reprehenderit veritatis
nam error temporibus ducimus dolore. Alias molestias blanditiis facere, consequatur nemo laboriosam unde, maxime
explicabo temporibus error repellat rem quisquam voluptatem tempora aliquid illum, omnis aliquam ipsa vitae dolor fugit
atque ad nisi possimus. Optio libero asperiores obcaecati autem deserunt perferendis esse labore veniam quia maxime
impedit ex maiores ducimus recusandae minus rem quisquam ipsam, sapiente, dicta quasi neque? Explicabo praesentium
reprehenderit, asperiores doloremque dolore vero et nulla error mollitia fugiat eligendi, doloribus recusandae aperiam
omnis atque veritatis?`;
