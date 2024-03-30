<script setup lang="ts">
async function func() {
    await window.electron.ipcRenderer.invoke('gameLaunch')
}
</script>

<template>
    <div :class="$style.lower">
        <div :class="$style.lower_left">
            <div>
                <div :class="$style.lower_left_content">
                    <div :class="$style.server_status_wrapper">
                        <span :class="$style.bot_label">SERVER</span>
                        <span :class="$style.player_count">OFFLINE</span>
                    </div>
                    <div :class="$style.bot_divider"></div>
                    <div :class="$style.mojangStatusWrapper">
                        <span :class="$style.bot_label">MOJANG STATUS</span>
                        <span :class="$style.mojang_status_icon" style="color: rgb(165, 195, 37);">・</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.lower_center">

        </div>
        <div :class="$style.lower_right">
            <div>
                <div :class="$style.launch_content">
                    <button :class="$style.launch_button" class="text-white" @click="async () => await func()">PLAY</button>
                    <div :class="$style.bot_divider"></div>
                    <button :class="[$style.server_selection_button, $style.bot_label]" class="text-white">・Demo (Minecraft
                        1.19.4)</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.mojang_status_icon {
    font-size: 30px;
    color: #848484;
    margin-left: 15px;
    font-family: 'sans-serif';
}

.mojangStatusWrapper {
    position: relative;
    display: flex;
    cursor: pointer;
}

.server_selection_button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    line-height: 24px;
    padding: 0px;
    transition: 0.25s ease;
}

.server_selection_button:hover {
    text-shadow: 0px 0px 20px #fff, 0px 0px 20px #fff, 0px 0px 20px #fff;

}

.launch_button {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 900;
    letter-spacing: 2px;
    text-shadow: 0px 0px 0px #bebcbb;
    font-size: 20px;
    padding: 0px;
    transition: 0.25s ease;
    outline: none;
}

.launch_button:hover {
    text-shadow: 0px 0px 20px #fff, 0px 0px 20px #fff;
}

.launch_content {
    position: relative;
    top: 25px;
    display: inline-flex;
}

.bot_divider {
    height: 25px;
    width: 2px;
    background: rgba(107, 105, 105, 0.7);
    margin-left: 20px;
    margin-right: 20px;
}

.player_count {
    color: #949494;
    font-size: 8px;
    font-weight: 900;
    text-shadow: 0px 0px 20px #949494;
    margin-left: 10px;
}

.bot_label {
    font-size: 9px;
    letter-spacing: 1px;
    font-weight: bold;
    text-shadow: 0px 0px 0px #bebcbb;
    color: #ffffff;
}

.server_status_wrapper {
    display: inline-flex;
    width: 75px;
}

.lower {
    height: 23%;
    display: flex;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.lower_left {
    position: relative;
    transition: top 2s ease;
    top: 0px;
    height: 100%;
    width: 33%;
    display: inline-flex;
    justify-content: center;
}

.lower_left_content {
    position: relative;
    top: 25px;
    display: inline-flex;
    line-height: 24px;
    left: 50px;
}

.lower_center {

    position: relative;
    transition: top 2s ease;
    top: 0px;
    height: 100%;
    width: 34%;
    display: inline-flex;
    justify-content: center;

}

.lower_right {
    position: relative;
    transition: top 2s ease;
    top: 0px;
    height: 100%;
    width: 33%;
    display: inline-flex;

}
</style>


