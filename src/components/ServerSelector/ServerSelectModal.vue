<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import Server from './Server.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
import {IModPackManifest} from "../../modpack.ts";
import { PickType } from '../../utils/common';

defineProps<{
    title?: string
}>()

const modpacks = ref<IModPackManifest[]>()

onMounted(async () => {
    modpacks.value = await window.electron.ipcRenderer.invoke('getModPacks')
});

const emit = defineEmits<{
    (e: 'selected', selectedServer: PickType<IModPackManifest, 'servers'>[0] | undefined): void,
    (e: 'close'): void
}>()

const selectedServer = ref<PickType<IModPackManifest, 'servers'>[0]>()
</script>

<template>
    <VueFinalModal overlay-transition="vfm-fade" content-transition="vfm-fade" class="flex justify-center items-center"
        content-class="w-full" overlay-style="filter: blur(10px)">
        <div class="w-full flex flex-col items-center">
            <h3 class="text-white text-xl font-bold mb-4">Avaliable Servers</h3>
            <div class="flex flex-col items-center gap-2 w-full overflow-y-scroll max-h-72 max-w-md">
                <div v-for="modpack in modpacks">
                <Server v-for="server in modpack.servers" :key="server.name" :server="server"
                    :opacity="server.name === selectedServer?.name ? 1 : 0.6"
                    @select="(serverName) => selectedServer = serverName" :modpack="modpack" />
                </div>
            </div>
            <div class="flex flex-col">
                <button class="mt-4 max-w-sm text-white text-sm px-1 border rounded-sm" @click="emit('selected', selectedServer)">
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