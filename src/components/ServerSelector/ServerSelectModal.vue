<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import Server from './Server.vue';
import { ref } from 'vue';

defineProps<{
    title?: string
}>()

const emit = defineEmits<{
    (e: 'confirm'): void,
    (e: 'close'): void
}>()

const servers = ref<{
    serverName: string
    mcVersion: string
    packVersion: string,
    packDescription: string,
    packIconUrl?: string,
}[]>([
    {
        serverName: "test",
        mcVersion: "1.12.1",
        packVersion: "1.0.0",
        packDescription: "これはテスト用です",
    },
    {
        serverName: "test1",
        mcVersion: "1.12.1",
        packVersion: "1.0.0",
        packDescription: "これはテスト用です",
    },
    {
        serverName: "test2",
        mcVersion: "1.12.1",
        packVersion: "1.0.0",
        packDescription: "これはテスト用です",
    }

])

const selectedServer = ref<string>("test2")
</script>

<template>
    <VueFinalModal overlay-transition="vfm-fade" content-transition="vfm-fade" class="flex justify-center items-center"
        content-class="w-full" overlay-style="filter: blur(10px)">
        <div class="w-full flex flex-col items-center">
            <h3 class="text-white text-xl font-bold mb-4">Avaliable Servers</h3>
            <div class="flex flex-col items-center gap-2 w-full overflow-y-scroll max-h-72 max-w-md">
                <Server v-for="server in servers" :key="server.serverName" :server="server"
                    :opacity="server.serverName === selectedServer ? 1 : 0.6"
                    @select="(serverName) => selectedServer = serverName" />
            </div>
            <div class="flex flex-col">
                <button class="mt-4 max-w-sm text-white text-sm px-1 border rounded-sm" @click="emit('confirm')">
                    Select
                </button>

                <button class="text-white text-[10px] mt-1" @click="emit('close')">
                    Cancel
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0.632);
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background-color: rgb(204, 204, 204);
}
</style>