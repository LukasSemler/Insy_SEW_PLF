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
    <RouterView></RouterView>
  </div>
  <CompFooter></CompFooter>
</template>
