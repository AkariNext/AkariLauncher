<script setup lang="ts">

const props = defineProps({
    server: {
        type: Object as () => {
            serverName: string,
            mcVersion: string,
            packVersion?: string,
            packDescription: string,
            packIconUrl?: string,
        },
        required: true
    },
    opacity: { type: Number, default: 0.6 }
})

const emit = defineEmits<{
    (e: 'select', selectedServerName: string): void,
}>()

</script>

<template>
    <div class="max-w-sm flex text-white w-full px-1 py-1 gap-4 items-center hover:bg-red-600" @click="emit('select', server.serverName)"
        style="background: rgba(131, 131, 131, 0.25); opacity: 0.6;" v-bind:style="{ opacity: props.opacity }">
        <img src="/vite.svg" class="border flex-shrink-0 w-14 h-14" />
        <div>
            <h4 class="text-lg">{{ props.server.serverName }}</h4>
            <p class="text-[10px]">{{ props.server.packDescription }}</p>
            <div id="server-tags" class="flex gap-2">
                <p class="text-[10px] bg-emerald-700 rounded-sm w-fit px-1">{{ props.server.mcVersion }}</p>
                <p class="text-[10px]">{{ props.server.packVersion }}</p>
            </div>
        </div>
    </div>
</template>
