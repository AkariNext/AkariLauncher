import nodeFetch from "node-fetch";
import path from 'node:path'
import url from 'node:url'

import { IFileStore, IModPack } from ".";
import { createWriteStream } from "fs";
import { sysRoot } from "../common";
import fs from 'fs'
import { checkFileExists, syncCheckFileExists } from "../utils/dir";

export async function downloader(repository: string, modpack: IModPack, name: string) {
    const instance = path.join(sysRoot, 'instances', name)
    // fs.writeFileSync(path.join(instance, 'pack.json'), JSON.stringify(modpack))
    const modsFolder = path.join(sysRoot, 'instances', name, 'mods')
    const configFolder = path.join(sysRoot, 'instances', name, 'config')
    //if (await checkFileExists(modsFolder)) {
        fs.mkdirSync(modsFolder, {recursive: true})
        fs.mkdirSync(configFolder, {recursive: true})
        //mkdirp.sync(modsFolder)
    //}
    const filesBase = `${repository}/store/files`
    const filesRes = await nodeFetch(`${filesBase}/files.json`)
    const files = await filesRes.json() as IFileStore
    for (const fileKey of Object.keys(modpack)) {
        const packData = modpack[fileKey]
        const fileData = files[packData.key]
        const file = `${filesBase}/${packData.key}`
        const target = path.join(instance, fileData.to)
        const targetPath = path.dirname(target)
        if (!syncCheckFileExists(targetPath)) {
            fs.mkdirSync(targetPath, {recursive: true})
        }

        if (packData.kind == 'mod' || packData.kind == 'resource') {
            console.log(fileData, target, targetPath, file)
            const dest = createWriteStream(target)
            const res = await nodeFetch(file)
            res.body.pipe(dest);
        } else {
            throw new Error(`Unknown kind: ${packData.kind}`)
        }
    }
}