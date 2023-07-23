<script setup lang="ts">
import { useProfilesStore } from '../../store/profiles';
import { randomBackgroundImage } from "../../utils/common"
import LandingLower from './LandingLower.vue';
import { IconBrandDiscordFilled } from '@tabler/icons-vue';
import { IconBrandGithubFilled } from '@tabler/icons-vue';
import { IconSettingsFilled } from '@tabler/icons-vue';
const profileStore = useProfilesStore()
const useProfileId = profileStore.$state.selectedAccountId!
const userUUUID = profileStore.$state.accounts[useProfileId].minecraft.profile!.id
const username = profileStore.$state.accounts[useProfileId].minecraft.profile!.name
</script>

<template>
    <div :style="{ backgroundImage: `url(${randomBackgroundImage})`, backgroundSize: 'cover', }" class="h-screen">
        <div :class="$style.upper">
            <div :class="$style.left">
                <div :class="$style.launcher_logo">
                    <img src="https://avatars.githubusercontent.com/u/75864607" class="rounded-full border border-white" />
                    <div :class="$style.updateAvaliableTooltip"> Update Available
                    </div>
                </div>
            </div>
            <div :class="$style.content">

            </div>
            <div :class="$style.right">
                <div :class="$style.rightContainer">
                    <div :class="$style.user_content">
                        <span :class="$style.user_text" class="text-white">{{ username }}</span>
                        <div :class="$style.avatarContainer"
                            :style="{ backgroundImage: `url(https://mc-heads.net/body/${userUUUID}/right)` }">
                        </div>
                    </div>
                    <div :class="$style.mediaContent">
                        <IconSettingsFilled :class="$style.mediaIcon" />
                        <div :class="$style.mediaDivider"></div>
                        <div :class="$style.mediaContainer">
                            <IconBrandDiscordFilled :class="[$style.mediaDiscordIcon, $style.mediaIcon]" />
                        </div>
                        <div :class="$style.mediaContainer">
                            <IconBrandGithubFilled :class="[$style.mediaGitHubIcon, $style.mediaIcon]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LandingLower />
    </div>
</template>

<style module>
.mediaIcon {
    color: white;
    width: 20px;
    transition: 0.25s ease;
}

.mediaIcon:hover {
    transform: scale(1.2);
}

.mediaDiscordIcon:hover {
    color: #5865F2;
}

.mediaGitHubIcon:hover {
    color: #2a2a2a;
}

.upper {
    position: relative;
    transition: top 2s ease;
    top: 0px;
    height: 77%;
    display: flex;
}

.left {
    display: inline-flex;
    width: 15%;
    height: 100%;
    justify-content: flex-end;
}

.launcher_logo {
    position: relative;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-top: 50px;
}

.updateAvaliableTooltip {
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    width: 100px;
    height: 15px;
    background-color: rgb(0, 0, 0);
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 2px;
    position: absolute;
    z-index: 1;
    top: 115%;
    left: -17.5px;
    font-family: 'Avenir Medium';
    font-size: 12px;
    transition: visibility 0s linear 0.25s, opacity 0.25s ease;
}

.updateAvaliableTooltip::after {
    content: " ";
    position: absolute;
    left: 50%;
    bottom: 100%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent rgb(0, 0, 0) transparent;
}

.content {
    display: inline-flex;
    width: 70%;
    height: 100%;
}

.user_content {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
}

.user_text {
    font-size: 12px;
    min-width: 135px;
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow: 0px 0px 20px black;
    position: absolute;
    right: 95px;
    text-align: right;
    -webkit-user-select: initial;
}

.avatarContainer {
    border-radius: 50%;
    border: 2px solid #cad7e1;
    box-sizing: border-box;
    background: rgba(1, 2, 1, 0.5);
    height: 70px;
    width: 70px;
    box-shadow: 0px 0px 10px 0px rgb(0, 0, 0);
    overflow: hidden;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

.mediaContent {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    height: calc(100% - 95px);
    width: 70px;
    align-items: center;
}

.mediaContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 27px;
}

.right {
    display: inline-flex;
    width: 15%;
    height: 100%;
}

.rightContainer {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 50px;
    align-items: flex-start;
    height: calc(100% - 50px);
}

.mediaDivider {
    height: 1px;
    width: 14px;
    background: rgb(255, 255, 255);
    margin: 10px 0px;
}
</style>