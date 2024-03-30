import * as fs from 'fs'

export async function saveJson(path: string, data: object | Array<any>) {
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err)
        }
    })
}

export function getOrCreateJson(path: string, defaultJson: any): any {
    const isFileExists = syncCheckFileExists(path)
        if (isFileExists) {
            try {
                const data = fs.readFileSync(path)
                return JSON.parse(data.toString())
            } catch (e) {
                fs.writeFileSync(path, JSON.stringify(defaultJson))
            }
        } else {
            fs.writeFileSync(path, JSON.stringify(defaultJson))
        }
        return defaultJson

}

export function syncCheckFileExists(path: string): boolean {
    try {
        fs.accessSync(path, fs.constants.F_OK)
        return true
    } catch (err) {
        return false
    }
}

export async function checkFileExists(path: string): Promise<boolean> {
    try {
        fs.access(path, fs.constants.F_OK, (err) => { console.log(err) })
        return true
    } catch (err) {
        return false
    }
}

export async function recreateDir(path: string): Promise<void> {
    if (await checkFileExists(path)) {
        fs.rmdir(path, (err) => { console.log(err) })
    }
    fs.mkdir(path, (err) => { console.log(err) })
}