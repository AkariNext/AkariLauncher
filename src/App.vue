<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Landing from './components/Landing/Landing.vue'
import { Profiles } from '../electron/common';
import { useProfilesStore } from './store/profiles';
import Signin from './components/Signin.vue'
import {randomBackgroundImage} from "./utils/common"

const profileStore = useProfilesStore()
const currentComponent = ref(Signin)


onMounted(async () => {
  const profiles: Profiles = await window.electron.ipcRenderer.invoke('getProfiles')
  currentComponent.value = Object.keys(profiles).length === 0 ? Signin : Landing
  profileStore.$state = profiles

})

profileStore.$subscribe((_, state) => {
  console.log('updated', state)
  currentComponent.value = Object.keys(state.accounts).length === 0 ? Signin : Landing
})
</script>

<template>

  <div :class="$style.bg" :style="{backgroundImage: `url(${randomBackgroundImage})`}">
    <XyzTransitionGroup class="item-group" xyz="fade">
    <div :class="$style.main">
    <component v-bind:is="currentComponent" class="xyz-in" />
  </div>
  </XyzTransitionGroup>
</div>
</template>


<style module>
.main {
  height: 100vh;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
  width: 100%;
  position: absolute;
  z-index: 10;
}

.bg {
  height: 100vh;
  background-position: center center fixed;
  background-repeat: no-repeat;
  transition: background-image 1s ease;
  background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAPwBwAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8VooopDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=);
  background-size: cover;
}

body {
  -webkit-user-select: none;
  user-select: none;
}
</style>
