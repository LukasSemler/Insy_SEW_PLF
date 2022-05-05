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
                <p class="text-sm font-medium text-gray-900">Successfully added!</p>
                <p class="mt-1 text-sm text-gray-500">You sent successfully added the product!</p>
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

  <main class="relative -mt-32">
    <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <aside class="py-6 lg:col-span-3">
            <nav class="space-y-1">
              <a
                @click="router.push(item.link)"
                v-for="item in subNavFilter"
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
            <h1 class="text-center text-3xl mt-3 mb-3">Change a product</h1>

            <form class="space-y-8 mx-3">
              <div class="space-y-8">
                <div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                      <label for="titel" class="block text-sm font-medium text-gray-700">
                        Titel
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input
                          v-model="state.titel"
                          type="text"
                          name="titel"
                          id="titel"
                          class="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p
                        v-if="v$.titel.$invalid"
                        class="mt-2 text-sm text-red-600"
                        id="email-error"
                      >
                        {{ v$.titel.$silentErrors[0].$message }}
                      </p>
                    </div>

                    <div class="sm:col-span-6">
                      <label for="about" class="block text-sm font-medium text-gray-700">
                        Beschreibung
                      </label>
                      <div class="mt-1">
                        <textarea
                          v-model="state.beschreibung"
                          id="beschreibung"
                          name="beschreibung"
                          rows="3"
                          class="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                        <p class="mt-2 text-sm text-gray-500">Describe the new product</p>
                        <p
                          v-if="v$.beschreibung.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.beschreibung.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label for="cover-photo" class="block text-sm font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      >
                        <div v-if="!image" class="space-y-1 text-center">
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              class="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                class="sr-only"
                                @change="onFileChanged"
                              />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>

                        <div v-else>
                          <div class="flex justify-center">
                            <img
                              crossorigin="anonymous"
                              class="object-scale-down h-48 w-96 mt-3"
                              :src="image"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="image" class="flex justify-center">
                        <button
                          @click="image = null"
                          type="button"
                          class="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        >
                          <!-- <TrashIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> -->
                          Bild entfernen
                        </button>
                      </div>
                      <p v-if="!image" class="mt-2 text-sm text-red-600" id="email-error">
                        Value is required
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-8">
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-2">
                      <label for="preis" class="block text-sm font-medium text-gray-700">
                        Preis
                      </label>
                      <div class="mt-1">
                        <input
                          v-model="state.preis"
                          type="number"
                          name="preis"
                          id="preis"
                          class="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <p
                          v-if="v$.preis.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.preis.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="country" class="block text-sm font-medium text-gray-700">
                        Kategorie
                      </label>
                      <div class="mt-1">
                        <select
                          v-model="state.kategorie"
                          id="kategorie"
                          name="kategorie"
                          class="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option v-for="cat of kategorien" :key="cat.k_id">
                            {{ cat.titel }}
                          </option>
                        </select>
                      </div>
                      <p
                        v-if="v$.kategorie.$invalid"
                        class="mt-2 text-sm text-red-600"
                        id="email-error"
                      >
                        {{ v$.kategorie.$silentErrors[0].$message }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-5">
                <div class="flex justify-center mb-4">
                  <button
                    v-if="!checkError"
                    @click="submit"
                    class="w-20 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Save
                  </button>
                  <button
                    v-else
                    :disabled="checkError"
                    class="w-20 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {{ id }}
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  CogIcon,
  KeyIcon,
  UserCircleIcon,
  ReplyIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  XIcon,
} from '@heroicons/vue/outline';
import { computed, ref, onMounted, reactive } from 'vue';
import { PiniaStore } from '../../Store/store.js';
import axios from 'axios';
// Vuelidate Imports
import useValidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

const store = PiniaStore();

const router = useRouter();
const kategorien = ref([]);
const show = ref(false);
const showError = ref(false);

const props = defineProps({
  id: String,
});

const state = reactive({
  titel: '',
  beschreibung: '',
  preis: null,
  kategorie: null,
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    titel: { required },
    beschreibung: { required },
    preis: { required, numeric },
    kategorie: { required },
  };
});

const v$ = useValidate(rules, state);

let image = ref(null);
let imageSchicken = ref(null);
let datentyp = ref(null);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:2410/categories');
  kategorien.value = data;
  console.log(data);

  const res = await axios.get(`http://localhost:2410/products/${props.id}`);
  console.log(res.data);
});

async function submit(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      // Schauen ob ein Image vorhanden ist
      if (image.value) {
        // Bild senden
        await sendImage();
        await sendData();
      }
    } else {
      console.log('Fehler');
    }

    e.preventDefault();
  } catch (error) {
    e.preventDefault();
    console.log(error.message);
  } finally {
    e.preventDefault();
  }
}

//#region Bild

async function sendData() {
  const res = await axios.post('http://localhost:2410/product', {
    titel: state.titel,
    beschreibung: state.beschreibung,
    preis: state.preis,
    kategorie: getFullKategorie.value[0],
    link_thumbnail: `http://localhost:2410/images/${state.titel}.${datentyp.value}`,
  });

  if (res.status == 200) {
    felderClearen();
    show.value = true;
  } else show.value = false;

  setTimeout(() => {
    show.value = false;
    showError.value = false;
  }, 5000);
}

//Bild hochladen
function onFileChanged(event) {
  {
    // Reference to the DOM input element
    let input = event.target;
    imageSchicken.value = event.target.files[0];

    const name = imageSchicken.value.name;

    if (name.includes('.jpg')) {
      datentyp.value = 'jpg';
    } else if (name.includes('.png')) {
      datentyp.value = 'png';
    } else if (name.includes('.jpeg')) {
      datentyp.value = 'jpeg';
    }

    // Ensure that you have a file before attempting to read it
    if (input.files && input.files[0]) {
      // create a new FileReader to read this image and convert to base64 format
      let reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        image.value = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(input.files[0]);
    }
  }
}

//Daten + Bild an Backend schicken
async function sendImage() {
  let formData = new FormData();
  formData.append('image', imageSchicken.value);
  formData.append('titel', state.titel);
  formData.append('datentyp', datentyp.value);
  const res = await axios.post(`http://localhost:2410/thumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (res.status != 200) showError.value = true;

  setTimeout(() => {
    showError.value = false;
  }, 5000);
}
//#endregion

const subNavFilter = computed(() => {
  let admin = [
    {
      name: 'Übersicht',
      href: '#',
      icon: UserCircleIcon,
      current: false,
      link: '/account',
    },
    {
      name: 'Add Product',
      href: '#',
      icon: PlusCircleIcon,
      current: true,
      link: '/account/addProduct',
    },
    {
      name: 'Change Product',
      href: '#',
      icon: CogIcon,
      current: false,
      link: '/account/changeProduct',
    },
    {
      name: 'Delete Product',
      href: '#',
      icon: MinusCircleIcon,
      current: false,
      link: '/account/delProduct',
    },
  ];
  let user = [
    {
      name: 'Übersicht',
      href: '#',
      icon: UserCircleIcon,
      current: true,
      link: '/account',
    },
    {
      name: 'Account',
      href: '#',
      icon: CogIcon,
      current: false,
      link: '/account/account',
    },
    {
      name: 'Password',
      href: '#',
      icon: KeyIcon,
      current: false,
      link: '/account/password',
    },
    {
      name: 'Bestell-Historie',
      href: '#',
      icon: ReplyIcon,
      current: false,
      link: '/account/history',
    },
  ];

  if (store.getAktivenUser.isAdmin == true) {
    return admin;
  } else return user;
});

const checkError = computed(() => {
  if (v$.value.$invalid == true) {
    return true;
  } else {
    if (image.value) return false;
    return true;
  }
});

const getFullKategorie = computed(() => {
  return kategorien.value.filter((kategorie) => kategorie.titel == state.kategorie);
});

function felderClearen() {
  state.titel = '';
  state.beschreibung = '';
  state.preis = null;
  state.kategorie = null;
  image.value = null;
  imageSchicken.value = null;
  datentyp.value = null;
}
</script>
