<script setup lang="ts">
const props = defineProps({
    serverName: { type: String, required: true },
    mcVersion: { type: String, required: true },
    packVersion: String,
    packDescription: String,
    packIconUrl: String,
})
</script>

<template>
    <div class="max-w-sm flex text-white w-full px-1 py-1 gap-4 items-center"
        style="background: rgba(131, 131, 131, 0.25);">
        <img src="/vite.svg" class="border flex-shrink-0 w-14 h-14" />
        <div>
            <h4 class="text-lg">{{ props.serverName }}</h4>
            <p class="text-[10px]">{{ props.packDescription }}</p>
            <div id="server-tags" class="flex gap-2">
                <p class="text-[10px] bg-emerald-700 rounded-sm w-fit px-1">{{ props.mcVersion }}</p>
                <p class="text-[10px]">{{ props.packVersion }}</p>
            </div>
        </div>
    </div>
</template>
