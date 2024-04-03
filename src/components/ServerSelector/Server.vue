<script setup lang="ts">
import { PickType } from "../../utils/common";
import {IModPackManifest} from "../../modpack.ts";


const props = defineProps({
    server: {
        type: Object as () => PickType<IModPackManifest, 'servers'>[0],
        required: true
    },
    modpack: Object as () => IModPackManifest,
    opacity: { type: Number, default: 0.6 }
});

const emit = defineEmits<{
    (e: 'select', selectedServer: PickType<IModPackManifest, 'servers'>[0]): void,
}>()

</script>

<template>
    <div class="max-w-sm text-white w-96 px-1 py-1 flex gap-4 items-center hover:bg-red-600"
        @click="emit('select', server)" style="background: rgba(131, 131, 131, 0.25); opacity: 0.6;"
        v-bind:style="{ opacity: props.opacity }">
        <img src="/vite.svg" class="border flex-shrink-0 w-14 h-14" />
        <div>
            <h4 class="text-lg">{{ props.server.name }}</h4>
            <p class="text-[10px]">{{ props.modpack?.name }}</p>
            <div id="server-tags" class="flex gap-2">
                <p class="text-[10px] bg-emerald-700 rounded-sm w-fit px-1">{{ props.modpack?.gameVersion }}</p>
                <p class="text-[10px]">{{ props.modpack?.versions[0] }}</p>
            </div>
        </div>
    </div>
</template>
