<template>
  <div class="bg-white">
    <Comp_HomeHeader></Comp_HomeHeader>
    <Suspense>
      <template #default>
        <Comp_CardListeHome></Comp_CardListeHome>
      </template>
      <template #fallback>
        <div class="flex justify-center">
          <div class="">
            <img src="../assets/icons/loading.svg" alt="" />
            <h1 class="text-center text-4xl font-bold overline">Loading...</h1>
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Comp_CardListeHome from '../components/Comp_CardListeHome.vue';
import Comp_HomeHeader from '../components/Comp_HomeHeader.vue';
</script>
