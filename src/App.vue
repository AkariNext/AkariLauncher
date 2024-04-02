<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useProfilesStore } from './store/profiles';
import { onMounted } from 'vue';
import { Profiles } from '../electron/common';
import { router } from './routes';
import { ModalsContainer } from 'vue-final-modal';

const profileStore = useProfilesStore()

const checkRequiredSignin = (profiles: Object) => {
  if (Object.keys(profiles).length === 0) {
    router.push('signin');
  };
};

onMounted(async () => {
  const profiles: Profiles = await window.electron.ipcRenderer.invoke('getProfiles')
  checkRequiredSignin(profiles);
  profileStore.$state = profiles;

});

profileStore.$subscribe((_, state) => {
  console.log('updated', state);
  checkRequiredSignin(state.accounts);
});

</script>
<template>
  <RouterView v-slot="{ Component, route }">
    <Transition mode="default" enter-active-class="duration-100	" leave-active-class="duration-100	"
      enter-from-class="blur-sm" leave-to-class="blur-sm">
      <div :key="route.fullPath">
        <component :is="Component" />
        <ModalsContainer></ModalsContainer>
      </div>
    </Transition>
  </RouterView>
</template>
