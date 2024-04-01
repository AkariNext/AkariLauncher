import { Profiles } from "../../electron/common"
import { defineStore } from "pinia"

export const useProfilesStore = defineStore('profiles', {
    state: (): Profiles => ({accounts: {}, selectedAccountId: null})
})
