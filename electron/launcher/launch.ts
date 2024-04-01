import { sysRoot } from "../common";
import path from 'node:path'
import { useUserStorage } from "../storage/user";
import { Launch } from "@akarinext/minecraft-java-core";
import {  createWriteStream } from "fs";
import { checkFileExists, recreateDir } from "../utils/dir";
import nFetch from 'node-fetch'
import { IAuth, ILauncherOptions } from "node_modules/@akarinext/minecraft-java-core/build/Launch";
import { updateRepositories } from "../downloader";
import { minecraftProcesses } from "../utils/state";
import { createGameLogWindow } from "./log";
import { BrowserWindow } from "electron";

(async () => {
    updateRepositories()
    // await useUserStorage.getProfiles()
    // await launch()
})()

async function downloadForge(forge: string) {
    await recreateDir(path.join(sysRoot, 'test_mc'))
    const isForge = await checkFileExists(forge)
    console.log(isForge)
    if (isForge) {
        const url = "https://maven.minecraftforge.net/net/minecraftforge/forge/1.7.10-10.13.4.1614-1.7.10/forge-1.7.10-10.13.4.1614-1.7.10-universal.jar";
        const dest = createWriteStream(forge);
        const res = await nFetch(url)
        await res.body.pipe(dest);
    }
    
}

export async function launch() {
    const client = new Launch()

    const userStorage = useUserStorage
    //ここをなんかいい感じに
    const profile = await userStorage.getProfile(userStorage.profiles.selectedAccountId!)
    const minecraft = profile.minecraft
    // if (!mcTokenToolbox.validate(minecraft)) {
        // const a = mcTokenToolbox.fromToken(authManager, minecraft., true)
        // }
    let auth: IAuth = {
        access_token: minecraft.mcToken,
        client_token: getUUID(),
        uuid: minecraft.profile!.id,
        name: minecraft.profile!.name,
        "user_properties": "{}",
        meta: {
            type: 'XBox',
            demo: minecraft.profile!.demo,
            // @ts-ignore
            xuid: minecraft.xuid,
            // clientId:
        },
    }
    
    let opts: ILauncherOptions = {
        authenticator: auth,
        downloadFileMultiple: 8,
        path: path.join(sysRoot, 'test_mc'),
        version: '1.7.10',
        detached: false,

        loader: {
            type: 'forge',
            build: 'latest',
            enable: true
        },

        verify: true,        
        ignored: [
            'config',
            'essential',
            'logs',
            'resourcepacks',
            'saves',
            'screenshots',
            'shaderpacks',
            'W-OVERFLOW',
            'options.txt',
            'optionsof.txt'
        ],
        JVM_ARGS: [],
        GAME_ARGS: [],

        memory: {
            min: '2G',
            max: '2G'
        }
    }

    // TODO: ここを今後そのプロファイルから自動で取得できるようにするべき
    const PROFILE_NAME = "Enter a your secure password"

    const currentProcesses = minecraftProcesses.get()
    const foundProcesses = currentProcesses.find((profile) => profile.profileName == PROFILE_NAME)

    console.log(currentProcesses, foundProcesses)

    let logWindow: BrowserWindow | null
    if (!foundProcesses) {
        minecraftProcesses.set([...currentProcesses, {profileName: PROFILE_NAME}])
        logWindow = createGameLogWindow()
        await client.Launch(opts)
    } else {
        // ここからrenderの方に何か飛ばすようにする
    }

    client.on('extract', (extract: any) => {
        console.log(extract);
    });

    client.on('progress', (progress: number, size: number, element: any) => {
        console.log(`Downloading ${element} ${Math.round((progress / size) * 100)}%`);
    });

    client.on('check', (progress: number, size: number, element: any) => {
        console.log(`Checking ${element} ${Math.round((progress / size) * 100)}%`);
    });

    client.on('estimated', (time: number) => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = Math.floor(time - hours * 3600 - minutes * 60);
        console.log(`${hours}h ${minutes}m ${seconds}s`);

    })

    client.on('speed', (speed: number) => {
        console.log(`${(speed / 1067008).toFixed(2)} Mb/s`)
    })

    client.on('patch', (patch: any) => {
        console.log(patch);
    });

    client.on('data', (e: any) => {
        logWindow?.webContents.send('logWindow.data', e)
        console.log(e);
    })

    client.on('close', (code: any) => {
        console.log(code);
        // 現在のプロファイルを一覧から削除する
        const currentProcesses = minecraftProcesses.get().filter((profile) => profile.profileName !== PROFILE_NAME)

        minecraftProcesses.set(currentProcesses)
    });

    client.on('error', (err: any) => {
        console.log(err);
    });
    // client.on('progress', (e) => console.log(e))
    // client.on('progress', function (e) {
        // console.log("======> ", e.task, " is ", e.total-1);
    // });
      
    // client.on('download-status', function (e) {
        // console.log(e.name, ">", e.current, " is ", e.total);
    // });
}

// start from MSMC code
function getUUID() {
    var result = "";
    for (var i = 0; i <= 4; i++) {
        result += (Math.floor(Math.random() * 16777216) + 1048576).toString(16);
        if (i < 4) result += "-";
    }
    return result;
}
// end
