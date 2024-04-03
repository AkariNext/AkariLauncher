export interface IModPackManifest {
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