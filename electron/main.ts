import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { authManager } from './msmc'
import { RawProfile } from './common'
import {useUserStorage} from "./storage/user"
import { launch } from './launcher/launch'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')



let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    //backgroundMaterial: 'mica',
    backgroundMaterial: 'mica',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true
    },
  })

  win.setMenuBarVisibility(false)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'), {hash: 'home'})
  }

}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  throw Error('多重起動しています。')
  // app.quit();
}

// 全てのウィンドウを閉じたらelectronを落とす
app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.whenReady().then(createWindow)


ipcMain.handle('doAuth', async () => {
  async function doAuth() {
    const xbox = await authManager.launch('raw')
    const minecraft = await xbox.getMinecraft()
    const profile = {xbox, minecraft}
    return profile
  }
  return await doAuth()
})

ipcMain.handle('addAccount', async (event, profile: RawProfile) => {
  const updatedProfiles = useUserStorage.addAccount(profile)
  return updatedProfiles
})

ipcMain.handle('getProfiles', async(event) => {

    const profiles = await useUserStorage.getProfiles()
    return profiles
})

ipcMain.handle('gameLaunch', async(event) => {
  console.log('[Launch]: start')
  return await launch()
})