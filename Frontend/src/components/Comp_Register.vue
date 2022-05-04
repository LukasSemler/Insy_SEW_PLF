<template>
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
                  There is already a user with this email address. Pleas take take another email
                  address.
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

  <!-- ----------------------------------------------------------------------------------------------- -->

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="../assets/icons/Logo_klein.png" alt="Electronic City" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6">
          <div>
            <div>
              <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700"
                    >Vorname</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.vorname"
                      type="text"
                      id="first-name"
                      name="first-name"
                      autocomplete="given-name"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p
                      v-if="v$.vorname.$invalid"
                      class="mt-2 text-sm text-red-600"
                      id="email-error"
                    >
                      {{ v$.vorname.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700"
                    >Nachname</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.nachname"
                      type="text"
                      id="last-name"
                      name="last-name"
                      autocomplete="family-name"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p
                      v-if="v$.nachname.$invalid"
                      class="mt-2 text-sm text-red-600"
                      id="email-error"
                    >
                      {{ v$.nachname.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="company" class="block text-sm font-medium text-gray-700">Email</label>
                  <div class="mt-1">
                    <input
                      v-model="state.email"
                      type="email"
                      name="email"
                      id="email"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p v-if="v$.email.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                      {{ v$.email.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700"
                    >Strasse + Hausnummer</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.strasse_hnr"
                      type="text"
                      name="address"
                      id="address"
                      autocomplete="street-address"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p
                      v-if="v$.strasse_hnr.$invalid"
                      class="mt-2 text-sm text-red-600"
                      id="email-error"
                    >
                      {{ v$.strasse_hnr.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div>
                  <label for="postal-code" class="block text-sm font-medium text-gray-700"
                    >Postal code</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.plz"
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autocomplete="postal-code"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p v-if="v$.plz.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                      {{ v$.plz.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">Stadt</label>
                  <div class="mt-1">
                    <input
                      v-model="state.stadt"
                      type="text"
                      name="city"
                      id="city"
                      autocomplete="address-level2"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p v-if="v$.stadt.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                      {{ v$.stadt.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="password" class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.password"
                      type="password"
                      name="password"
                      id="password"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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

                <div class="sm:col-span-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700"
                    >Confirm Password</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.c_password"
                      type="password"
                      name="c_password"
                      id="c_password"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                @click="router.push('/loginregister')"
                class="font-medium text-teal-600 hover:text-teal-500 underline"
              >
                Zu Login
              </a>
            </div>
          </div>

          <div>
            <button
              v-if="!checkError"
              @click="register"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Register
            </button>

            <button
              v-else
              :disabled="checkError"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';

import { useRouter } from 'vue-router';
import { reactive, computed, ref } from 'vue';

import useValidate from '@vuelidate/core';
import { required, email, numeric, minLength, sameAs } from '@vuelidate/validators';
import axios from 'axios';

const router = useRouter();
let showError = ref(false);

// Variablen for input erstellen
const state = reactive({
  vorname: '',
  nachname: '',
  email: '',
  strasse_hnr: '',
  stadt: '',
  plz: '',
  password: '',
  c_password: '',
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    vorname: { required },
    nachname: { required },
    email: { required, email },
    strasse_hnr: { required },
    stadt: { required },
    plz: { required, numeric },
    password: { required, minLength: minLength(6) },
    c_password: { required, minLength: minLength(6), sameAs: sameAs(state.password) },
  };
});

const v$ = useValidate(rules, state);

async function register(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      // Register erledigen
      const res = await axios.post('http://localhost:2410/register', {
        vorname: state.vorname,
        nachname: state.nachname,
        email: state.email,
        strasse_hnr: state.strasse_hnr,
        stadt: state.stadt,
        plz: state.plz,
        password: state.password,
      });

      if (res.status == 201) {
        router.push('/loginregister');
      }
    }

    e.preventDefault();
  } catch (error) {
    e.preventDefault();

    console.log(error.message);

    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);

    felderClearen();
  } finally {
    e.preventDefault();
  }
}

const checkError = computed(() => {
  return v$.value.$invalid == true ? true : false;
});

function felderClearen() {
  state.vorname = '';
  state.nachname = '';
  state.email = '';
  state.strasse_hnr = '';
  state.stadt = '';
  state.plz = '';
  state.telefon = '';
  state.password = '';
  state.c_password = '';
}
</script>
