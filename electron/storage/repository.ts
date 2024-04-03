import ElectronStore from "electron-store";



class RepositoryStorage {
    repositories: ElectronStore<{
        repositories: { distribution_url: string }[]
    }>
    constructor() {
        this.repositories = new ElectronStore<{
            repositories: {
                distribution_url: string
            }[]
        }
        >({ name: "repositories", defaults: {repositories: []} })
    }

    async getRepositories() {
        return this.repositories.get('repositories')
    }

    async addRepository(distribution_url: string) {
        this.repositories.set('repositories', [...this.repositories, { distribution_url }])
        return this.repositories
    }
}

export const useRepositoryStorage = new RepositoryStorage()