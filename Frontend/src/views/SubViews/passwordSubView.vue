<template>
  <!-- Success Ding anzeigen -->
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-40"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Successfully changed!</p>
                <p class="mt-1 text-sm text-gray-500">You changed successfully your password</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="show = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- ----------------------------------------------------------------------------------------------------------- -->

  <!-- Error dings anzeigen -->
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-40"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showError"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-6 w-6 text-red-500" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Error</p>
                <p class="mt-1 text-sm text-gray-500">
                  There was an error when sending your message
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="showError = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- ------------------------------------------------------------------------------------------------------------------------------------------------ -->

  <main class="relative -mt-32">
    <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <aside class="py-6 lg:col-span-3">
            <nav class="space-y-1">
              <a
                @click="router.push(item.link)"
                v-for="item in subNavigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                  'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-teal-500 group-hover:text-teal-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                <span class="truncate">
                  {{ item.name }}
                </span>
              </a>
            </nav>
          </aside>

          <div class="divide-y divide-gray-200 lg:col-span-9">
            <h1 class="text-center text-3xl mt-3">Change Password</h1>

            <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
              <div class="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
                <form class="space-y-6">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div class="mt-1">
                      <input
                        v-model="state.password"
                        id="password"
                        name="password"
                        type="password"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                      <p
                        v-if="v$.password.$invalid"
                        class="mt-2 text-sm text-red-600"
                        id="email-error"
                      >
                        {{ v$.password.$silentErrors[0].$message }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label for="c_password" class="block text-sm font-medium text-gray-700">
                      Confirm new Password
                    </label>
                    <div class="mt-1">
                      <input
                        v-model="state.c_password"
                        id="c_password"
                        name="c_password"
                        type="password"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />

                      <p
                        v-if="v$.c_password.$invalid"
                        class="mt-2 text-sm text-red-600"
                        id="email-error"
                      >
                        {{ v$.c_password.$silentErrors[0].$message }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      v-if="!checkError"
                      @click="changePW"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Change Password
                    </button>

                    <button
                      :disabled="checkError"
                      v-else
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';
import { CogIcon, KeyIcon, UserCircleIcon, ReplyIcon } from '@heroicons/vue/outline';
import { ref, reactive, computed } from 'vue';

import useValidate from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Store imports
import { PiniaStore } from '../../Store/Store.js';
const store = PiniaStore();

const router = useRouter();

const subNavigation = [
  { name: 'Übersicht', href: '#', icon: UserCircleIcon, current: false, link: '/account' },
  { name: 'Account', href: '#', icon: CogIcon, current: false, link: '/account/account' },
  { name: 'Password', href: '#', icon: KeyIcon, current: true, link: '/account/password' },
  {
    name: 'Bestell-Historie',
    href: '#',
    icon: ReplyIcon,
    current: false,
    link: '/account/history',
  },
];

let show = ref(false);
let showError = ref(false);

//Vuelidate
const state = reactive({
  password: '',
  c_password: '',
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    password: { required, minLength: minLength(6) },
    c_password: { required, minLength: minLength(6), sameAs: sameAs(state.password) },
  };
});

const v$ = useValidate(rules, state);

async function changePW(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      // Passwort changen
      const res = await axios.patch(
        `http://localhost:2410/changePW/${store.getAktivenUser.knd_id}`,
        { password: state.password, c_password: state.password },
      );

      if (res.status == 201) {
        //Felder leeren
        state.password = '';
        state.c_password = '';

        //Success meldung anzeigen
        show.value = true;

        //Timeout für die Meldung
        setTimeout(() => {
          show.value = false;
          showError.value = false;
        }, 5000);
      }
    }

    e.preventDefault();
  } catch (error) {
    console.log(error.message);
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    e.preventDefault();
  }
}

const checkError = computed(() => {
  return v$.value.$invalid == true ? true : false;
});
</script>
