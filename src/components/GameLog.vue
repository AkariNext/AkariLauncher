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

const lightRedTextColor = '\x1b[91m';
const purpleTextColor = '\x1b[38;2;255;200;255m';

const resetTextColor = '\x1b[0m';

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

    term.attachCustomKeyEventHandler((event) => {
        if (event.ctrlKey && event.code == 'KeyC' || event.ctrlKey && event.shiftKey && event.code == 'KeyC') {
            const text = window.getSelection()?.toString();
            if (text) {
                navigator.clipboard.writeText(text);
            }
        }

        return false;
    })

    window.electron.ipcRenderer.on('logWindow.data', (_, data) => {
        term.writeln(data);
    });

    window.electron.ipcRenderer.on('logWindow.close', (_, data) => {
        term.write(purpleTextColor + data + resetTextColor);
    });

    window.electron.ipcRenderer.on('logWindow.error', (_, data) => {
        term.write(lightRedTextColor + data + resetTextColor);
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
