import * as fs from 'fs'

export async function checkFileExists(path: string): Promise<boolean> {
    try {
        fs.access(path, fs.constants.F_OK, (err) => { console.log(err) })
        return true
    } catch (err) {
        return false
    }
}
