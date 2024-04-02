<script setup lang="ts">
import { ref } from 'vue';

const SETTINGS: { name?: string, to?: string }[] = [{
    name: "Minecraft",
    to: ""
}, {
    name: "Mods",
    to: ""
}, {
    name: "Java",
    to: ""
}, {
    name: "Launcher",
    to: ""
}, {}, {
    name: "About",
    to: ""
}, {
    name: "Updates",
    to: ""
}]

const currentSetting = ref("Minecraft")
</script>

<template>
    <div id="setting-layout" class="grid grid-cols-12">
        <div class="col-start-2 col-span-2 w-full mt-12">
            <div class="flex items-center flex-col">
                <h1 class="text-white text-xl">Settings</h1>
                <ul class="px-4 mt-8 text-gray-400 text-sm">
                    <li v-for="setting in SETTINGS" :key="setting.name" :class="currentSetting === setting.name ? 'text-white' : 'text-zinc-400'">{{ setting.name }}</li>
                    <div class="mt-10 border-t border-zinc-500 h-1 w-full"></div>
                </ul>
                <button class="mt-4 text-white text-sm">
                    <RouterLink to="/">
                    Done
                </RouterLink>
                </button>
            </div>
        </div>
        <div class="col-start-4 col-end-11 w-full">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
#setting-layout {
    background: rgba(0, 0, 0, 0.50);
    @apply h-full
}

li:not(:empty) {
    @apply mt-1 cursor-pointer;
}

li:empty {
    @apply mt-4;
}
</style>