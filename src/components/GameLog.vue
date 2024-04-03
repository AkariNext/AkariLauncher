<script setup lang="ts">
import { ElectronAPI } from "@electron-toolkit/preload";
import { Terminal } from '@xterm/xterm'
import { WebglAddon } from '@xterm/addon-webgl'
import { onMounted, ref } from 'vue';
import { FitAddon } from 'xterm-addon-fit';
import '@xterm/xterm/css/xterm.css'

const terminal = ref<HTMLElement>();

interface ElectronWindow extends Window {
    electron: ElectronAPI
}
declare const window: ElectronWindow;

onMounted(() => {
    const term = new Terminal({
        rows: 30,
        fontFamily: '\'MoralerspaceNeonHWNF-Regular\', monospace',

    });
    const webglAddon = new WebglAddon();
    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);

    webglAddon.onContextLoss(_ => {
        webglAddon.dispose();
    });
    
    term.open(terminal.value!);

    term.loadAddon(webglAddon);

    fitAddon.fit();

    

    window.electron.ipcRenderer.on('logWindow.data', (_, data) => {
        term.write(data);
    });
});
</script>

<template>
    <div ref="terminal"></div>
</template>

<style>
@font-face {
    font-family: 'MoralerspaceNeonHWNF-Regular';
    src: url('../assets/fonts/moralerspace/MoralerspaceNeonNF-Regular.ttf');
}
</style>
