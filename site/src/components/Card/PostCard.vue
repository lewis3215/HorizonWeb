<template>
    <div>
        <div
            v-if="post"
            class="card flex flex-col w-full group"
        >
            <div class="flex w-full gap-4">
                <div class="w-1/12 text-1 flex flex-col items-center gap-2 pt-1 pb-2 rounded-l-lg">
                    <i class="ri-arrow-up-s-line ri-lg hover:cursor-pointer" />
                    <div class="font-medium">
                        {{ abbrNumbers(post.upvotes - post.downvotes) }}
                    </div>
                    <i class="ri-arrow-down-s-line ri-lg marker:hover:cursor-pointer" />
                    <div />

                    <i class="mt-2 ri-star-line mouse-icon ri-lg invisible group-hover:visible hover:cursor-pointer hover:text-yellow-500 " />
                    <i class="mt-2 ri-notification-2-line ri-lg mouse-icon invisible group-hover:visible hover:cursor-pointer hover:text-blue-500" />
                </div>

                <div class="h-full w-full flex flex-col gap-2">
                    <div class="text-xl font-medium flex items-center gap-2">
                        <i :class="headerTypes[post.type].icon " />
                        {{ headerTypes[post.type].type }}
                        :
                        {{ post.title }}
                        <i
                            v-if="post.locked || post.closed"
                            class="ri-lock-2-line text-gray-500"
                        />
                        <i
                            v-if="post.solved"
                            class="ri-check-line text-green-500 ri-lg"
                        />
                    </div>
                    <CarouselTags :tags="post.tags" />
                    <div class="text-sm text-2 line-clamp-3">
                        {{ extractTextFromJSONBody(JSON.parse(post.body)) }}
                    </div>
                </div>
            </div>
            <div class="flex gap-4 w-full">
                <div class="w-1/12" />
                <div class="w-full pt-2 border-t-2 flex justify-between text-2">
                    <div class="flex gap-2 items-center ">
                        <div class="relative hidden w-12 h-12 rounded-full md:block">
                            <img
                                class="object-cover w-full h-full rounded-full"
                                :src="post.author.avatar?? default_avatar"
                                :alt="post.author.username"
                                loading="lazy"
                            >
                        </div>
                        <div class="whitespace-nowrap  text-sm">
                            {{ post.author.username }}
                        </div>

                        <div class="text-sm">
                            - Posté {{ timeAgo(post.createdAt) }}
                        </div>

                        <div class="text-sm">
                            - 3 Réponses
                        </div>
                    </div>
                    <div class="flex items-center invisible group-hover:visible gap-2 cursor-pointer">
                        <i class="ri-arrow-go-back-line" />
                        Répondre
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="bg-0 rounded-lg flex space-x-2 py-3 px-5 font-semibold"
        >
            <p class="text-lg text-0">
                Erreur: Ce post est vide.
            </p>

            <!-- TODO: Bug report pages -->
            <router-link
                :to="`/report-bug/posts`"
                class="text-lg font-semibold link-blue line-clamp-1"
            >
                Signalez ce bug !
            </router-link>
        </div>
    </div>
</template>

<script lang="js">
import default_avatar from '@/assets/img/default_avatars/user.png'
import { abbrNumbers } from '@/utils/abbrNumbers'
import { timeAgo } from '@/utils/timeAgo'
import { extractTextFromJSONBody } from '@/utils/extractTextFromHTML'
import CarouselTags from '../List/CarouselTags.vue'

export default {
    components: {
        CarouselTags
    },
    props: {
        post: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            headerTypes: {
                0: { type: 'Question', icon: 'ri-questionnaire-line' },
                1: { type: 'Suggestion', icon: 'ri-lightbulb-line' },
                2: { type: 'Problème', icon: 'ri-error-warning-line' },
                3: { type: 'Discussion', icon: 'ri-discuss-line' }
            },
            default_avatar
        }
    },
    methods: {
        abbrNumbers,
        timeAgo,
        extractTextFromJSONBody
    }
}
</script>
