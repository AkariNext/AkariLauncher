import { Xbox, Minecraft } from "msmc";
import path from 'node:path'

const basePath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
export const sysRoot = path.join(basePath!, 'akarilauncher').toString()

export interface RawXbox {
    parent: Pick<Xbox, 'parent'>;
    msToken: Pick<Xbox, 'msToken'>;
    xblToken: Pick<Xbox, 'xblToken'>;
    exp: number;
}

export interface RawProfile {
    xbox: RawXbox;
    minecraft: Minecraft
}

export interface Profiles {
    accounts: {[key: string]: RawProfile}
    selectedAccountId: string | null
}