<script setup lang="ts">
import { useProfilesStore } from "../store/profiles";
import { RawProfile } from "../../electron/common";
import IconMicrosoft from "../assets/images/HeliosLauncher/icons/microsoft.svg";
import IconMojang from "../assets/images/HeliosLauncher/icons/mojang.svg";
import {randomBackgroundImage} from "../utils/common"
import { ElectronAPI } from "@electron-toolkit/preload";

interface ElectronWindow extends Window {
  electron: ElectronAPI
}
declare const window: ElectronWindow;

const signin = async () => {
  const raw_profile: RawProfile = await window.electron.ipcRenderer.invoke('doAuth')
  const profiles = await window.electron.ipcRenderer.invoke('addAccount', raw_profile)

    const profileStore = useProfilesStore()
    profileStore.$patch(profiles)
}

</script>

<template>
    <div class="h-screen w-full justify-center items-center flex"
        :style="{ background: `url(${randomBackgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }">
        <div>
            <h2 class="text-center text-2xl mb-4 text-white font-bold">Login Options</h2>
            <div style="row-gap: 10px; display: flex; flex-direction: column;">
            <div>
                <button type="button" @click="async () => await signin()" :class="$style.loginButton">
                    <IconMicrosoft class="h-6 w-6" />

                    Login with Microsoft
                </button>
            </div>
            <div>
                <button type="button" :class="$style.loginButton" style="">
                    <IconMojang IconMicrosoft class="h-6 w-6" />

                    Login with Mojang
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<style module>
.loginButton {
    color: white;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(126, 126, 126, 0.57);
    border-radius: 3px;
    height: 50px;
    width: 100%;
    text-align: left;
    padding: 0px 25px;
    cursor: pointer;
    outline: none;
    transition: 0.25s ease;
    display: flex;
    align-items: center;
    column-gap: 5px;
}

.loginButton:hover {
    background: rgba(54, 54, 54, 0.25)
}
</style>