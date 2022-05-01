<script setup>
import { RouterView } from 'vue-router';
import CompFooter from './components/CompFooter.vue';
import CompNavBar from './components/CompNavBar.vue';
import { onMounted } from 'vue';

import { PiniaStore } from './Store/Store.js';
const store = PiniaStore();

onMounted(() => {
  if (localStorage.getItem(store.$id)) {
    store.$state = JSON.parse(localStorage.getItem(store.$id));
  }
});
</script>

<template>
  <CompNavBar></CompNavBar>
  <div>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </RouterView>
  </div>
  <CompFooter></CompFooter>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
