import * as fs from 'fs'
import { sysRoot, RawProfile, Profiles } from "../common";
import { checkFileExists } from '../utils/dir';


const profilePath = sysRoot.concat('/profiles.json')
export class UserStorage {
    profiles: Profiles

    constructor() {
        this.profiles = {accounts: {}, selectedAccountId: null}
    }

    async getProfile(id: string) {
        return this.profiles.accounts[id]
    }

    async getProfiles() {
        const checkProfileExists = await checkFileExists(profilePath)
        if (checkProfileExists) {
            try {
            const data = fs.readFileSync(profilePath)
                this.profiles = JSON.parse(data.toString()) as Profiles
                return this.profiles
            } catch (e) {console.log('user storage error: ', e)}
            return this.profiles
        }
    }


    async addAccount(profile: RawProfile) {
        if (Object.keys(this.profiles.accounts).length === 0) {
            this.profiles.selectedAccountId = profile.minecraft.profile!.id
        }
        this.profiles.accounts = {[profile.minecraft.profile!.id]: profile, ...this.profiles.accounts}

        fs.writeFile(profilePath, JSON.stringify(this.profiles), (err) => {
            if (err) {
                console.log(err)
            }
        })
        return this.profiles
    }
}

export const useUserStorage = new UserStorage()