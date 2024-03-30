import { sysRoot } from "../common";
import { getOrCreateJson, saveJson } from "../utils/dir";
const repositoryPath = sysRoot.concat('/repository.json')


class RepositoryStorage {
    repositories: {distribution_url: string, base_url: string}[]
    constructor() {
        this.repositories = getOrCreateJson(repositoryPath, []);
    }

    async getRepositories() {
        return this.repositories
    }

    async addRepository(distribution_url: string, base_url: string) {
        this.repositories = [...this.repositories, {distribution_url, base_url}]
        await this.save()

        return this.repositories
    }

    async save() {
        await saveJson(repositoryPath, this.repositories)
    }
}

export const useRepositoryStorage = new RepositoryStorage()