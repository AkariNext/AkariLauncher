import { sysRoot } from "../common";
import path from 'node:path'
import { useUserStorage } from "../storage/user";
import { Client, ILauncherOptions, IUser } from "minecraft-launcher-core";
import { mcTokenToolbox } from "msmc";
import { authManager } from "../msmc";



export async function launch() {
    const client = new Client()

    const userStorage = useUserStorage
    //ここをなんかいい感じに
    const profile = await userStorage.getProfile('33ea278815b9401fa9d83629aad48fee')
    const minecraft = profile.minecraft
    // if (!mcTokenToolbox.validate(minecraft)) {
        // const a = mcTokenToolbox.fromToken(authManager, minecraft., true)
        // }
        let auth: IUser = {
        access_token: minecraft.mcToken,
        client_token: getUUID(),
        uuid: minecraft.profile!.id,
        name: minecraft.profile!.name,
        meta: {
            type: 'msa',
            demo: minecraft.profile!.demo
        },
        user_properties: {}
    }
    
    let opts: ILauncherOptions = {
        authorization: auth,
        root: path.join(sysRoot, 'test_mc'),
        version: {
            type: 'release',
            number: '1.7.10'
        },
        memory: {
            min: '2G',
            max: '2G'
        }  
    }

    client.launch(opts)
    
    client.on('data', (e) => console.log(e))
}

// start from MSMC code
function getUUID() {
    var result = "";
    for (var i = 0; i <= 4; i++) {
        result += (Math.floor(Math.random() * 16777216) + 1048576).toString(16);
        if (i < 4) result += "-";
    }
    return result;
}
// end
