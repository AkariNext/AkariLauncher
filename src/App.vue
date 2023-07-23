<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Landing from './components/Landing/Landing.vue'
import { Profiles } from '../electron/common';
import { useProfilesStore } from './store/profiles';
import Signin from './components/Signin.vue'

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
  <component v-bind:is="currentComponent" />
</template>


<style>
body {
  user-select: none;
  -webkit-user-select: none;
}
</style>
