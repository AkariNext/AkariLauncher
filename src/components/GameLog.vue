<script setup lang="ts">
import { ElectronAPI } from "@electron-toolkit/preload";
import { Terminal } from '@xterm/xterm'
import { WebglAddon } from '@xterm/addon-webgl'
import { onMounted, ref } from 'vue';
import { FitAddon } from 'xterm-addon-fit';

const terminal = ref<HTMLElement>();

interface ElectronWindow extends Window {
    electron: ElectronAPI
}
declare const window: ElectronWindow;

onMounted(() => {
    const term = new Terminal();
    const webglAddon = new WebglAddon();
    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);

    term.open(terminal.value!);
    webglAddon.onContextLoss(_ => {
        webglAddon.dispose();
    });

    term.loadAddon(webglAddon);

    fitAddon.fit();

    window.electron.ipcRenderer.on('logWindow.data', (_, data) => {
        term.write(data);
    });
});
</script>

<template>
    <div>
    <div class="h-96 w-full" ref="terminal"></div>
</div>
</template>
