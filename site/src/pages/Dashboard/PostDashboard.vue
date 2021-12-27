<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      as="div"
      @close="closeModal"
    >
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <ThreadPreview />
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div>
    <div>
      <h1 class=" text-4xl text-top-left text-1 tracking-wider mt-6 mb-3 ml-2">
        Dashboard Post
      </h1>
    </div>
    <TabGroup vertical>
      <TabList>
        <Tab
          v-slot="{ selected }"
          as="template"
        >
          <button
            class="py-5 px-10 my-5 ml-4 rounded-l-xl"
            :class="[selected ? 'bg-blue-500 text-white' : 'bg-white text-black']"
          >
            Posts
          </button>
        </Tab>
        <Tab
          v-slot="{ selected }"
          as="template"
        >
          <button
            class="py-5 px-10 my-5"
            :class="[selected ? 'bg-blue-500 text-white' : 'bg-white text-black']"
          >
            Users
          </button>
        </Tab>
        <Tab
          v-slot="{ selected }"
          as="template"
        >
          <button
            class="py-5 px-10 my-5 rounded-r-xl"
            :class="[selected ? 'bg-blue-500 text-white' : 'bg-white text-black']"
          >
            Notifications
          </button>
        </Tab>
      </TabList>
      <!-- // ! Top of the page before tables  -->
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
        <div>
          <div
            date-rangepicker
            class="flex items-center"
          >
            <!-- // ! https://flowbite.com/docs/plugins/datepicker/#datepicker-example -->
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                /></svg>
              </div>
              <input
                name="start"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start"
              >
            </div>
            <span class="mx-4 text-gray-500">
              to
            </span>
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                /></svg>
              </div>
              <input
                name="end"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end"
              >
            </div>
          </div>
        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <!-- // ! Table for large windows -->
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
                    <div
                      class="flex items-center space-x-3"
                    >
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
                  v-for="(post, i) in posts"
                  :key="i"
                  class="relative hover:bg-pink-200 hover:opacity-50"
                  :class="{'bg-pink-500 opacity-30 text-pink-900': selectedRows.includes(post.postId)}"
                >
                  <td
                    v-for="(col, colName) in columns"
                    :key="colName"
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5"
                    :class="{ hidden: !selectedCols.includes(colName)}"
                  >
                    <input
                      v-model="selectedRows"
                      :value="post.postId"
                      type="checkbox"
                      class="appearance-none w-full h-full absolute top-0 left-0 cursor-pointer"
                    >
                    <div v-if="colName==='STATUS'">
                      <div :class="{ 'status-marker-sucess': post.state, 'status-marker-failure': !post.state}" />
                    </div>
                    <div v-else-if="colName==='SELECT'">
                      <i class="ri-check-line" />
                    </div>
                    <tags-list
                      v-else-if="colName==='TAGS'"
                      :tags="post.tags"
                    />
                    <div
                      v-else-if="colName==='ACTIONS'"
                      class="relative"
                    >
                      <button
                        class="button"
                        @click.stop="openModal"
                      >
                        {{ col.value(post) }}
                      </button>
                    </div>
                    <div v-else>
                      {{ col.value(post) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- // ! Table for reduced windows -->
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
                <div v-if="colName==='STATUS'">
                  <div :class="{ 'status-marker-sucess': post.state, 'status-marker-failure': !post.state}" />
                </div>
                <div v-else-if="colName==='SELECT'">
                  <i class="ri-check-line" />
                </div>
                <tags-list
                  v-else-if="colName==='TAGS'"
                  :tags="post.tags"
                />
                <div
                  v-else-if="colName==='ACTIONS'"
                  class="relative"
                >
                  <button
                    class="button"
                    @click.stop="openModal"
                  >
                    {{ col.value(post) }}
                  </button>
                </div>
                <div v-else>
                  {{ col.value(post) }}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          Content 2
        </TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="js">
import { ref, defineComponent } from 'vue'
import TagsList from '@/components/List/TagsList.vue'
import ThreadPreview from '@/components/ThreadPreview.vue'
import SelectMultiCheckbox from '@/components/Input/SelectMultiCheckbox.vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@headlessui/vue'
export default defineComponent({
  name: 'AdminSide',
  components: {
    ThreadPreview: ThreadPreview,
    SelectMultiCheckbox,
    TagsList,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel
  },
  props: {
    threads: {
      type: Array,
      default: () => []
    },
    camelPosts: {
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
  setup () {
    const isOpen = ref(false)
    return {
      isOpen,
      closeModal () {
        isOpen.value = false
      },
      openModal () {
        isOpen.value = true
      }
    }
  },
  data () {
    return {
      selectedCols: ['SELECT', 'VOTES', 'STATUS', 'TITLE', 'OP', 'LAST ACTIVITY', 'CREATED AT', 'TYPE', 'TAGS', 'ACTIONS'],
      selectedRows: [],
      check: false,
      ascending: false,
      sortColumn: '',
      threadPreviewComponent: null,
      posts: this.camelPosts,
      columns: {
        SELECT: { value: (post) => post.postId, sort: 0 },
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
