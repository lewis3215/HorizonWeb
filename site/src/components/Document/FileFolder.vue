<template>
    <div
        class="flex gap-2 items-center p-1 hover:bg-2-light hover:dark:bg-2-dark rounded"
        @click="$emit('path', [folderName]), toggleChildren()"
    >
        <font-awesome-icon
            class="text-1"
            size="sm"
            :class="[children.length == 0 ? 'invisible' : '']"
            :icon="showChildren ? 'chevron-down' : 'chevron-right'"
        />
        <font-awesome-icon class="text-1" :icon="'folder'" />

        <div>
            {{ folderName }}
        </div>
    </div>
    <transition name="fade">
        <div v-if="showChildren" class="flex flex-col p-1 ml-2 border-l">
            <FileFolder
                v-for="(child, i) in children"
                :key="i"
                :folder-name="child.name"
                :children="child.children"
                @path="$emit('path', [folderName, ...$event])"
            />
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        folderName: {
            type: String,
            required: true,
        },
        children: {
            type: Array,
            default() {
                return []
            },
        },
    },
    emits: ['path'],
    data() {
        return { showChildren: false }
    },
    methods: {
        toggleChildren() {
            if (this.children.length > 0) {
                this.showChildren = !this.showChildren
            }
        },
    },
}
</script>
