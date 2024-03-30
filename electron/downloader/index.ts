import { useRepositoryStorage } from "../storage/repository";
import nodeFetch from "node-fetch";
import { downloader } from "./downloader";

interface IDsitribution {
    name: string;
    modpacks: string[];
    repository_type: "github" | "gitlab" | "s3"
    format_version: string;
    base_url: string;
}

/**
 * mods.jsonとresources.jsonの型
 */
export interface IFileStore {
    
    [key: string]: {
        original_name: string;
        hash: string;
        to: string;
    };
}

interface IModPackManifest {
    name: string;
    server: {
        serverHost: string;
        serverPort: number;
    };
    gameVersion: string;
    modLoader: {
        modLoaderType: "forge";
        modLoaderVersion: string;
    }
    versions: string[]
}

export interface IModPack {
    [key: string]: {
    kind: "mod" | "resource"
    type: "file"
    key: string;
    }
}

async function fetchModPack(repository: string, name: string, version: string) {
    const url = `${repository}/modpacks/${name}/versions/${version}.json`
    const res = await nodeFetch(url)
    return await res.json() as IModPack
}

async function fetchModpackManifest(repository: string, name: string) {
    const url = `${repository}/modpacks/${name}/manifest.json`
    const res = await nodeFetch(url)
    const modpackManifest = await res.json() as IModPackManifest
    for (const version of modpackManifest.versions) {
        const versionData = await fetchModPack(repository, name, version)
        //console.log(versionData)
        downloader(repository, versionData, name)
    }
    return modpackManifest
}

async function fetchDistribution(url: string) {
    const res = await nodeFetch(url)
    const data = await res.json() as IDsitribution
    console.log('name: ', data.name)
    console.log('found modpack(s)', data.modpacks.length)
    for (const modpack of data.modpacks) {
        console.log('=>', modpack)
        await fetchModpackManifest(data.base_url, modpack)
    }
    return data.modpacks;
}

export async function updateRepositories() {
    const repositories = await useRepositoryStorage.getRepositories()
    for (const repository of repositories) {
        await fetchDistribution(repository.distribution_url)
    }
}




