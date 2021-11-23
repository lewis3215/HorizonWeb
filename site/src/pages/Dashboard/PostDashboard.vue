<template>
  <div>
    <div>
      <h1 class=" text-4xl text-top-left text-1 tracking-wider mt-6 mb-3 ml-2">
        Dashboard Post
      </h1>
    </div>
    <div class="flex flex-row pb-4">
      <div class="px-4">
        <select-multi-checkbox
          v-model="selectedCols"
          class="absolute justify-center"
          :filters="Object.keys(columns)"
        />
      </div>
      <div class="px-40">
        <div class="relative">
          <input
            class="h-10 w-102 pr-8 pl-5 rounded focus:shadow focus:outline-none"
            type="text"
            placeholder="Search for by any order parameter..."
          >
        </div>
      </div>
    </div>
    <div
      class="hidden md:block"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              v-for="(col, colName) in columns"
              :key="colName"
              class="px-6 py-3 border-b border-gray-200 bg-gray-90 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider "
              :class="{ hidden: !selectedCols.includes(colName) }"
            >
              <div class="flex items-center space-x-3">
                <p>
                  {{ colName }}
                </p>
                <div
                  v-if="columns[colName].sort !== undefined"
                  class="flex flex-col"
                  @click="sortTable(colName)"
                >
                  <i
                    class="ri-arrow-up-s-line"
                    :class="{ hidden: !ascending }"
                  />
                  <i
                    class="ri-arrow-down-s-line"
                    :class="{ hidden: ascending }"
                  />
                </div>
              </div>
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
              :class="{ hidden: !selectedCols.includes(colName)}"
            >
              <div v-if="colName==='STATUS'">
                <div :class="{ 'status-marker-sucess': post.state, 'status-marker-failure': !post.state}" />
              </div>
              <tags-list
                v-else-if="colName==='TAGS'"
                :tags="post.tags"
              />
              <button
                v-else-if="colName==='ACTIONS'"
                class="button"
                @click="emitter.emit('togglePreview')"
              >
                {{ col.value(post) }}
              </button>
              <div v-else>
                {{ col.value(post) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
          class="px-6 py-4 whitespace-no-wrap border-b border-grey-200 text-sm leading-5 text-gray-500"
          :class="{ hidden: !selectedCols.includes(colName) }"
          @click="emitter.emit('togglePreview')"
        >
          <div v-if="colName==='TAGS'">
            TAGS:
            <tags-list
              :tags="post.tags"
            />
          </div>
          <div v-else>
            {{ colName }} : {{ col.value(post) }}
          </div>
        </div>
      </div>
    </div>
    <component
      :is="threadPreviewComponent"
      :class="{hidden: showPreview}"
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
    _posts: {
      type: Array,
      default: () => [

        { postId: 101, type: 3, locked: false, opened: false, state: false, tags: [{ name: 'émargement' }, { name: 'présence' }, { name: 'promo:l2' }, { name: 'cours' }, { name: 'importance:moyenne' }, { name: 'fréquence:régulier' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Problème observé: les étudiants sont parfois notés absents à des cours auxquels ils sont présents (particulièrement en ligne)"}]},{"type":"paragraph","content":[{"type":"text","text":"Solution potentielle: mettre en place un système d’émargement électronique officiel"}]}]}', title: 'Problème avec le système d\'émargement en L2', author: { username: 'Sophie H.', avatar: require('@/assets/img/landing/girl_1.jpg'), reputation: 50200 }, favorites: 33, upvotes: 243, views: 44653, downvotes: 3, createdAt: '2021-10-18\n13:51:36.631Z', updatedAt: '2021-10-18\n13:51:36.631Z' },
        { postId: 2201, type: 2, locked: false, opened: true, state: true, tags: [{ name: 'terrasse' }, { name: 'promo:toutes' }, { name: 'matériel' }, { name: 'importance:moyenne' }, { name: 'difficulté:facile' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Les poufs sur la terrasse au dessus du fab lab sont laissés en extérieur la nuit ce qui les salit quand il pleut."}]},{"type":"paragraph","content":[{"type":"text","text":"Peut-être que les étudiants pourraient être autorisés et encourager à les ranger dans le hall du Bât. C ou dans le Bât. A les soirs de pluie ?"}]}]}', title: 'Rangement des poufs sur la terrasse du Bât. I', author: { username: 'Jean R.', avatar: require('@/assets/img/landing/guy_1.jpg'), reputation: 2021 }, favorites: 104, upvotes: 1255, views: 27553, downvotes: 3, createdAt: '2021-10-15\n13:51:36.631Z', updatedAt: '2021-10-17\n13:51:36.631Z' },
        { postId: 3032, type: 1, locked: true, opened: false, state: true, tags: [{ name: 'pave' }, { name: 'déclaration pave' }, { name: 'promo:toutes' }, { name: 'urgence:haute' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"J\'ai entendu dire qu\'il y\'avait besoin de remplir une déclaration de PAVE pour avoir ses points pour un semestre donné, mais je ne la connais pas."}]},{"type":"paragraph","content":[{"type":"text","text":"Est-ce quelqu\'un pourrait me montrer comment faire, étape par étape ?"}]}]}', title: 'Comment déclarer sa PAVE ?', author: { username: 'Emma L.', avatar: require('@/assets/img/landing/girl_2.jpg'), reputation: 1234 }, favorites: 95, upvotes: 1004, views: 16993, downvotes: 3, createdAt: '2021-10-01\n13:51:36.631Z', updatedAt: '2021-10-08\n13:51:36.631Z' },
        { postId: 11093, type: 4, locked: false, opened: true, state: false, tags: [{ name: 'stage' }, { name: 'sopra steria' }, { name: 'promo:m1' }, { name: 'expérience' }], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonjour à tous ! J\'ai reçu une proposition de stage chez Sopra, mais j\'hésite encore à l\'accepter"}]},{"type":"paragraph","content":[{"type":"text","text":"Pour ceux qui ont déjà fait un stage chez eux, comment fut votre expérience là-bas ? Avez-vous des conseils ?"}]}]}', title: 'Retour d\'expérience Sopra Steria', author: { username: 'Stéphane M.', avatar: require('@/assets/img/landing/guy_2.jpg'), reputation: 234 }, favorites: 12, upvotes: 430, views: 4683, downvotes: 3, createdAt: '2021-02-0413:51:36.631Z', updatedAt: '2021-03-04\n13:51:36.631Z' }
      ]
    },
    showPreview: {
      type: Boolean,
      default: () => false
    }
  },
  emits: [
    'togglePreview'
  ],
  data () {
    return {
      selectedCols: [],
      ascending: false,
      sortColumn: '',
      popup: false,
      threadPreviewComponent: null,
      posts: this._posts,
      columns: {

        VOTES: { value: (post) => post.upvotes - post.downvotes, sort: 0 },
        STATUS: { value: (post) => post.state, sort: 0 },
        TITLE: { value: (post) => post.title, sort: 0 },
        OP: { value: (post) => post.author.username, sort: 0 },
        'LAST ACTIVITY': { value: (post) => post.updatedAt, sort: 0 },
        'CREATED AT': { value: (post) => post.createdAt, sort: 0 },
        TYPE: { value: (post) => post.type, sort: 0 },
        TAGS: { value: (post) => post.tags, sort: 0 },
        ACTIONS: { value: () => 'Show' }
      }
    }
  },
  mounted () {
    this.threadPreviewComponent = 'threadPreview'
  },
  methods: {
    sortTable: function sortTable (colName) {
      if (this.sortColumn === colName) {
        this.columns[colName].sort = !this.columns[colName].sort
      } else {
        this.columns[colName].sort = true
        this.sortColumn = colName
      }

      var sort = this.columns[colName].sort

      this.posts.sort((a, b) => {
        a = this.columns[colName].value(a)
        b = this.columns[colName].value(b)
        if (a > b) {
          return sort ? 1 : -1
        } else if (a < b) {
          return sort ? -1 : 1
        }
        return 0
      })
      console.log(this.posts)
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

.status-marker-sucess {
  @apply rounded-full bg-green-500 h-2 w-2;
}
.status-marker-failure {
  @apply rounded-full bg-red-700 h-2 w-2;
}
</style>
