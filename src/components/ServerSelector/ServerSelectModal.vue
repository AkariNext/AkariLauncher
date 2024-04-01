<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import Server from './Server.vue';

defineProps<{
    title?: string
}>()

const emit = defineEmits<{
    (e: 'confirm'): void,
    (e: 'close'): void
}>()
</script>

<template>
    <VueFinalModal overlay-transition="vfm-fade" content-transition="vfm-fade" class="flex justify-center items-center"
        content-class="w-full">
        <div class="w-full flex flex-col items-center">
            <h3 class="text-white text-xl font-bold mb-4">Avaliable Servers</h3>
            <div class="flex flex-col items-center gap-2 w-full overflow-y-scroll max-h-72 max-w-md">
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
                <Server server-name="aaa" pack-description="これはテスト用です" mc-version="1.12.1" pack-version="1.0.0" />
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
    width:5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(204, 204, 204);
}
</style>