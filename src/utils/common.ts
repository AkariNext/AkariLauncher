
export const randomBackgroundImage = `https://raw.githubusercontent.com/AkariNext/HeliosLauncher/master/app/assets/images/backgrounds/${Math.floor(Math.random() * 8)}.jpg`


export type PickType<T, K extends keyof T> = T[K];
