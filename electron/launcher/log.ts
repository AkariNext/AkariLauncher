import { BrowserWindow } from "electron";
import { VITE_DEV_SERVER_URL } from "../main";
import path from 'node:path'

export function createGameLogWindow(opts: { profileName: string }) {
    const logWindow = new BrowserWindow({
        icon: path.join(process.env.PUBLIC, 'vite.svg'),
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
        // setTitleがindex.htmlのtitleで上書きされる対策 https://github.com/electron/electron/issues/2543#issuecomment-876309955
        logWindow.loadURL(VITE_DEV_SERVER_URL + '#/gamelog').then(() => logWindow.setTitle(`AkariLauncher - ${opts.profileName} Log`))
    } else {
        logWindow.loadFile(path.join(process.env.DIST, 'index.html'), { hash: 'gamelog' }).then(() => logWindow.setTitle(`AkariLauncher - ${opts.profileName} Log`))
    }

    return logWindow
}
