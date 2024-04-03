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
    servers: {
        name: string;
        address: string;
        port: number;
    }[];
    gameVersion: string;
    modLoader: {
        modLoaderType: "forge";
        modLoaderVersion: string;
    }
    iconUrl: string | null;
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

async function fetchModpackManifest(repository: string, name: string, dryRun: boolean=false) {
    const url = `${repository}/modpacks/${name}/manifest.json`
    const res = await nodeFetch(url)
    const modpackManifest = await res.json() as IModPackManifest

    if (dryRun === false) {
        for (const version of modpackManifest.versions) {
            const versionData = await fetchModPack(repository, name, version)
            //console.log(versionData)
            downloader(repository, versionData, name)
        }
    }
    return modpackManifest
}

async function fetchDistribution(url: string, dryRun: boolean=false) {
    const res = await nodeFetch(url)
    const data = await res.json() as IDsitribution
    console.log('name: ', data.name)
    console.log('found modpack(s)', data.modpacks.length)

    const modpacks = []
    for (const modpack of data.modpacks) {
        console.log('=>', modpack)
        modpacks.push(await fetchModpackManifest(data.base_url, modpack, dryRun))
    }
    return modpacks;
}

export async function updateRepositories(dryRun: boolean=false) {
    const repositories = await useRepositoryStorage.getRepositories()
    let result: IModPackManifest[] = []
    for (const repository of repositories) {
        result = [...result, ...await fetchDistribution(repository.distribution_url, dryRun)];
    }
    return result;
}




