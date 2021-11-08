<template>
  <div>
    <!-- {{ selectedCols }} -->
    <select-multi-checkbox
      v-model="selectedCols"
      :filters="Object.keys(columns)"
    />
    <div
      class="hidden md:block"
    >
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  v-for="(col, colName) in columns"
                  :key="colName"
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  :class="{ hidden: !selectedCols.includes(colName) }"
                >
                  <p>
                    {{ colName }}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="post in posts"
                :key="post"
              >
                <td
                  v-for="(col, colName) in columns"
                  :key="colName"
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                  :class="{ hidden: !selectedCols.includes(colName) }"
                  @click="showPreview"
                >
                  <tags-list
                    v-if="colName==='TAGS'"
                    :tags="post.tags"
                  />
                  <div v-else>
                    {{ col.display(post) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="md:hidden">
      <div
        v-for="post in posts"
        :key="post"
        class="flex flex-col card my-4"
      >
        <div
          v-for="(col, colName) in columns"
          :key="colName"
          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
          :class="{ hidden: !selectedCols.includes(colName) }"
          @click="showPreview"
        >
          <div v-if="colName==='TAGS'">
            TAGS:
            <tags-list
              :tags="post.tags"
            />
          </div>
          <div v-else>
            {{ colName }} : {{ col.display(post) }}
          </div>
        </div>
      </div>
    </div>

    <component
      :is="threadPreviewComponent"
      v-if="popup"
      @click.stop="() => {}"
    />
  </div>
</template>

<script lang="js">
import TagsList from '@/components/List/TagsList.vue'
import ThreadPreview from '@/components/ThreadPreview.vue'
import { defineComponent } from 'vue'
import SelectMultiCheckbox from '@/components/Input/SelectMultiCheckbox.vue'
export default defineComponent({
  name: 'AdminSide',
  components: {
    ThreadPreview,
    SelectMultiCheckbox,
    TagsList
  },
  props: {
    threads: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => ({
        VOTES: { display: (post) => post.upvotes - post.downvotes },
        STATUS: { display: (post) => post.state },
        TITLE: { display: (post) => post.title },
        OP: { display: (post) => post.author.username },
        'LAST ACTIVITY': { display: (post) => post.updatedAt },
        'CREATED AT': { display: (post) => post.createdAt },
        TYPE: { display: (post) => post.type },
        TAGS: { display: (post) => post.tags },
        ACTIONS: { display: () => 'Show' }
      })
    }
  },
  data () {
    return {
      selectedCols: Object.keys(this.columns),
      ascending: false,
      sortColumn: '',
      popup: false,
      threadPreviewComponent: null,
      posts: [
        { postId: 101, type: 3, locked: false, opened: false, solved: false, tags: [{ name: 'émargement' }, { name: 'présence' }, { name: 'promo:l2' }, { name: 'cours' }, { name: 'importance:moyenne' }, { name: 'fréquence:régulier' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Problème observé: les étudiants sont parfois notés absents à des cours auxquels ils sont présents (particulièrement en ligne)"}]},{"type":"paragraph","content":[{"type":"text","text":"Solution potentielle: mettre en place un système d’émargement électronique officiel"}]}]}', title: 'Problème avec le système d\'émargement en L2', author: { username: 'Sophie H.', avatar: require('@/assets/img/landing/girl_1.jpg'), reputation: 50200 }, favorites: 33, upvotes: 243, views: 44653, downvotes: 3, createdAt: '2021-10-18T13:51:36.631Z', updatedAt: '2021-10-18T13:51:36.631Z' },
        { postId: 2201, type: 2, locked: false, opened: true, solved: true, tags: [{ name: 'terrasse' }, { name: 'promo:toutes' }, { name: 'matériel' }, { name: 'importance:moyenne' }, { name: 'difficulté:facile' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Les poufs sur la terrasse au dessus du fab lab sont laissés en extérieur la nuit ce qui les salit quand il pleut."}]},{"type":"paragraph","content":[{"type":"text","text":"Peut-être que les étudiants pourraient être autorisés et encourager à les ranger dans le hall du Bât. C ou dans le Bât. A les soirs de pluie ?"}]}]}', title: 'Rangement des poufs sur la terrasse du Bât. I', author: { username: 'Jean R.', avatar: require('@/assets/img/landing/guy_1.jpg'), reputation: 2021 }, favorites: 104, upvotes: 1255, views: 27553, downvotes: 3, createdAt: '2021-10-15T13:51:36.631Z', updatedAt: '2021-10-17T13:51:36.631Z' },
        { postId: 3032, type: 1, locked: true, opened: false, solved: true, tags: [{ name: 'pave' }, { name: 'déclaration pave' }, { name: 'promo:toutes' }, { name: 'urgence:haute' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"J\'ai entendu dire qu\'il y\'avait besoin de remplir une déclaration de PAVE pour avoir ses points pour un semestre donné, mais je ne la connais pas."}]},{"type":"paragraph","content":[{"type":"text","text":"Est-ce quelqu\'un pourrait me montrer comment faire, étape par étape ?"}]}]}', title: 'Comment déclarer sa PAVE ?', author: { username: 'Emma L.', avatar: require('@/assets/img/landing/girl_2.jpg'), reputation: 1234 }, favorites: 95, upvotes: 1004, views: 16993, downvotes: 3, createdAt: '2021-10-01T13:51:36.631Z', updatedAt: '2021-10-08T13:51:36.631Z' },
        { postId: 11093, type: 4, locked: false, opened: true, solved: false, tags: [{ name: 'stage' }, { name: 'sopra steria' }, { name: 'promo:m1' }, { name: 'expérience' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonjour à tous ! J\'ai reçu une proposition de stage chez Sopra, mais j\'hésite encore à l\'accepter"}]},{"type":"paragraph","content":[{"type":"text","text":"Pour ceux qui ont déjà fait un stage chez eux, comment fut votre expérience là-bas ? Avez-vous des conseils ?"}]}]}', title: 'Retour d\'expérience Sopra Steria', author: { username: 'Stéphane M.', avatar: require('@/assets/img/landing/guy_2.jpg'), reputation: 234 }, favorites: 12, upvotes: 430, views: 4683, downvotes: 3, createdAt: '2021-02-04T13:51:36.631Z', updatedAt: '2021-03-04T13:51:36.631Z' }
      ]
    }
  },
  mounted () {
    this.threadPreviewComponent = 'threadPreview'
    this.emitter.on('toggleModal', () => {
      console.log('modal toggled', this.popup)
      if (this.popup) {
        this.popup = false
      }
    })
  },
  methods: {
    showPreview: function () {
      this.popup = !this.popup
      if (this.popup) {
        this.emitter.emit('toggleModal')
      }
    },
    sortTable: function sortTable (col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending
      } else {
        this.ascending = true
        this.sortColumn = col
      }

      var ascending = this.ascending

      this.rows.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0
      })
    }
  }
})
</script>

<style scoped>
.tab-title {
  @apply px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider;
}
.tab-item {
  @apply border-b border-gray-200 bg-white text-sm max-h-16 overflow-hidden;
}
</style>
