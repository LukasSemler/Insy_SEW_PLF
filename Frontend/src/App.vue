<script setup>
import { RouterView } from 'vue-router';
import CompFooter from './components/CompFooter.vue';
import CompNavBar from './components/CompNavBar.vue';
</script>

<template>
  <CompNavBar></CompNavBar>
  <div>
    <RouterView></RouterView>
  </div>
  <CompFooter></CompFooter>
</template>
