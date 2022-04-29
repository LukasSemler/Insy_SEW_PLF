<template>
  <div class="bg-gray-50">
    <Comp_HomeHeader></Comp_HomeHeader>
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
import Comp_HomeHeader from '../components/Comp_HomeHeader.vue';
</script>
