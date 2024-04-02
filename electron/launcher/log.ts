import { BrowserWindow } from "electron";
import { VITE_DEV_SERVER_URL } from "../main";
import path from 'node:path'

// todo: GameLog.vueをいい感じに出す場所
export function createGameLogWindow() {
    const logWindow = new BrowserWindow({
        title: 'Game Log',
        backgroundMaterial: 'mica',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            sandbox: false,
            contextIsolation: true
          },
    })

    logWindow.setMenuBarVisibility(false)

    if (VITE_DEV_SERVER_URL) {
        logWindow.loadURL(VITE_DEV_SERVER_URL + '#/gamelog')
    } else {
        logWindow.loadFile(path.join(process.env.DIST, 'index.html'), {hash: 'gamelog'})
    }

    return logWindow
}

