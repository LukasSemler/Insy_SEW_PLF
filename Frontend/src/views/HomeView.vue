<template>
  <div>
    <h1>Hello</h1>
    <Suspense>
      <template #default>
        <Comp_CardListeHome></Comp_CardListeHome>
      </template>
      <template #fallback>
        <h1>Loading</h1>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Comp_CardListeHome from '../components/Comp_CardListeHome.vue';
</script>
