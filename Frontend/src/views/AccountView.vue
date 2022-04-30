<template>
  <div>
    <Disclosure as="div" class="relative bg-teal-500 pb-32 overflow-hidden" v-slot="{ open }">
      <div
        aria-hidden="true"
        :class="[
          open ? 'bottom-0' : 'inset-y-0',
          'absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0',
        ]"
      >
        <div class="absolute inset-0 flex">
          <div class="h-full w-1/2" style="background-color: #0f766e" />
          <div class="h-full w-1/2" style="background-color: #0d9488" />
        </div>
        <div class="relative flex justify-center">
          <svg
            class="flex-shrink-0"
            width="1750"
            height="308"
            viewBox="0 0 1750 308"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#14b8a6" />
            <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#0d9488" />
            <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0f766e" />
            <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#14b8a6" />
          </svg>
        </div>
      </div>
      <header class="relative py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">Account</h1>
        </div>
      </header>
    </Disclosure>

    <router-view></router-view>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Disclosure } from '@headlessui/vue';


import { RouterView } from 'vue-router';


</script>
