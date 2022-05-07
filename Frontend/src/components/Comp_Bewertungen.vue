<template>
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
                <p class="text-sm font-medium text-gray-900">Sorry</p>
                <p class="mt-1 text-sm text-gray-500">
                  You can't write a review for this product. To write a review you have to buy the
                  product.
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
          v-if="showSuccess"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Successfully Sent!</p>
                <p class="mt-1 text-sm text-gray-500">You sent successfully the message</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="showSuccess = false"
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

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = true">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <form class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1">
                    <!-- Header -->
                    <div class="bg-teal-400 px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between space-x-3">
                        <div class="space-y-1">
                          <DialogTitle class="text-2xl font-bold text-gray-900">
                            Neue Bewertung
                          </DialogTitle>
                          <div class="mt-3">
                            <p class="text-black">Bewerten Sie jetzt ein Produkt</p>
                          </div>
                        </div>
                        <div class="flex h-7 items-center">
                          <button
                            type="button"
                            class="text-gray-400 hover:text-gray-500"
                            @click="open = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XIcon class="h-6 w-6 text-black" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Divider container -->
                    <div class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                      <!-- Project name -->
                      <div
                        class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="project-name"
                            class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Titel
                          </label>
                        </div>
                        <div class="sm:col-span-2">
                          <input
                            v-model="variablen.titel"
                            type="text"
                            name="project-name"
                            id="project-name"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                          />
                          <!-- <p
                            v-if="v$.titel.$invalid"
                            class="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {{ v$.titel.$silentErrors[0].$message }}
                          </p> -->
                        </div>
                      </div>

                      <!-- Project description -->
                      <div
                        class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="project-description"
                            class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Bewertung
                          </label>
                        </div>
                        <div class="sm:col-span-2">
                          <textarea
                            v-model="variablen.beschreibung"
                            id="project-description"
                            name="project-description"
                            rows="3"
                            class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                          />
                          <!-- <p
                            v-if="v$.beschreibung.$invalid"
                            class="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {{ v$.beschreibung.$silentErrors[0].$message }}
                          </p> -->
                        </div>
                      </div>

                      <!-- Privacy -->

                      <fieldset>
                        <div
                          class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                        >
                          <div>
                            <legend class="text-sm font-medium text-gray-900">
                              Bewertung des Produkts
                            </legend>
                          </div>

                          <div class="space-y-5 sm:col-span-2">
                            <div class="space-y-5 sm:mt-0">
                              <!-- 1 Stern -->
                              <div class="relative flex items-start">
                                <div class="absolute flex h-5 items-center">
                                  <input
                                    value="1"
                                    v-model="variablen.rating"
                                    id="public-access"
                                    name="privacy"
                                    aria-describedby="public-access-description"
                                    type="radio"
                                    class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                  />
                                </div>
                                <div class="pl-7 text-sm">
                                  <div class="flex items-center">
                                    <StarIcon
                                      v-for="rating in [0, 1, 2, 3, 4]"
                                      :key="rating"
                                      :class="[
                                        1 > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0',
                                      ]"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- 2. Sterne -->
                              <div class="relative flex items-start">
                                <div class="absolute flex h-5 items-center">
                                  <input
                                    value="2"
                                    v-model="variablen.rating"
                                    id="restricted-access"
                                    name="privacy"
                                    aria-describedby="restricted-access-description"
                                    type="radio"
                                    class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                  />
                                </div>
                                <div class="pl-7 text-sm">
                                  <div class="flex items-center">
                                    <StarIcon
                                      v-for="rating in [0, 1, 2, 3, 4]"
                                      :key="rating"
                                      :class="[
                                        2 > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0',
                                      ]"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- 3. Sterne -->
                              <div class="relative flex items-start">
                                <div class="absolute flex h-5 items-center">
                                  <input
                                    value="3"
                                    v-model="variablen.rating"
                                    id="private-access"
                                    name="privacy"
                                    aria-describedby="private-access-description"
                                    type="radio"
                                    class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                  />
                                </div>
                                <div class="pl-7 text-sm">
                                  <div class="flex items-center">
                                    <StarIcon
                                      v-for="rating in [0, 1, 2, 3, 4]"
                                      :key="rating"
                                      :class="[
                                        3 > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0',
                                      ]"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- 4. Sterne -->
                              <div class="relative flex items-start">
                                <div class="absolute flex h-5 items-center">
                                  <input
                                    value="4"
                                    v-model="variablen.rating"
                                    id="private-access"
                                    name="privacy"
                                    aria-describedby="private-access-description"
                                    type="radio"
                                    class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                  />
                                </div>
                                <div class="pl-7 text-sm">
                                  <div class="flex items-center">
                                    <StarIcon
                                      v-for="rating in [0, 1, 2, 3, 4]"
                                      :key="rating"
                                      :class="[
                                        4 > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0',
                                      ]"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- 5. Sterne -->
                              <div class="relative flex items-start">
                                <div class="absolute flex h-5 items-center">
                                  <input
                                    value="5"
                                    v-model="variablen.rating"
                                    id="private-access"
                                    name="privacy"
                                    aria-describedby="private-access-description"
                                    type="radio"
                                    class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                  />
                                </div>
                                <div class="pl-7 text-sm">
                                  <div class="flex items-center">
                                    <StarIcon
                                      v-for="rating in [0, 1, 2, 3, 4]"
                                      :key="rating"
                                      :class="[
                                        5 > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0',
                                      ]"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- <p
                              v-if="v$.rating.$invalid"
                              class="mt-2 text-sm text-red-600"
                              id="email-error"
                            >
                              {{ v$.rating.$silentErrors[0].$message }}
                            </p> -->
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <!-- Action buttons -->
                  <div class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div class="flex justify-end space-x-3">
                      <button
                        type="button"
                        class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        @click="open = false"
                      >
                        Cancel
                      </button>
                      <button
                        @click="submit"
                        class="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div class="bg-white">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8"
    >
      <div class="lg:col-span-4">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Customer Reviews</h2>

        <div class="mt-3 flex items-center">
          <div>
            <div class="flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[
                  durchschnittBewertung > rating ? 'text-yellow-400' : 'text-gray-300',
                  'flex-shrink-0 h-5 w-5',
                ]"
                aria-hidden="true"
              />
            </div>
            <p class="sr-only">{{ durchschnittBewertung }} out of 5 stars</p>
          </div>
          <p class="ml-2 text-sm text-gray-900">Based on {{ anzahlBewertungen }} reviews</p>
        </div>

        <div class="mt-6">
          <h3 class="sr-only">Review data</h3>

          <dl class="space-y-3">
            <div v-for="count in aufteilung" :key="count.rating" class="flex items-center text-sm">
              <dt class="flex-1 flex items-center">
                <p class="w-3 font-medium text-gray-900">
                  {{ count.rating }}<span class="sr-only"> star reviews</span>
                </p>
                <div aria-hidden="true" class="ml-1 flex-1 flex items-center">
                  <StarIcon
                    :class="[
                      count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                      'flex-shrink-0 h-5 w-5',
                    ]"
                    aria-hidden="true"
                  />

                  <div class="ml-3 relative flex-1">
                    <div class="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                    <div
                      v-if="count.count > 0"
                      class="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                      :style="{ width: `calc(${count.count} / ${anzahlBewertungen} * 100%)` }"
                    />
                  </div>
                </div>
              </dt>
              <dd class="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                {{ Math.round((count.count / anzahlBewertungen) * 100) }}%
              </dd>
            </div>
          </dl>
        </div>

        <div class="mt-10">
          <h3 class="text-lg font-medium text-gray-900">Share your thoughts</h3>
          <p class="mt-1 text-sm text-gray-600">
            If you’ve used this product, share your thoughts with other customers
          </p>

          <a
            @click="showBewerten"
            class="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >Write a review</a
          >
        </div>
      </div>

      <div class="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
        <h3 class="sr-only">Recent reviews</h3>

        <div class="flow-root">
          <div class="-my-12 divide-y divide-gray-200">
            <div v-for="review in bewertungen" :key="review.id" class="py-12">
              <div class="flex items-center">
                <img
                  crossorigin="anonymous"
                  src="../assets/icons/placeholderProfil.png"
                  :alt="`${review.vorname}.`"
                  class="h-12 w-12 rounded-full"
                />
                <div class="ml-4">
                  <h4 class="text-sm font-bold text-gray-900">
                    {{ review.vorname }} {{ review.nachname }}
                  </h4>
                  <div class="mt-1 flex items-center">
                    <StarIcon
                      v-for="rating in [0, 1, 2, 3, 4]"
                      :key="rating"
                      :class="[
                        review.anzahl_sterne > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                  </div>
                  <p class="sr-only">{{ review.anzahl_sterne }} out of 5 stars</p>
                </div>
              </div>

              <div class="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                <h3 class="text-sm font-medium text-gray-900 mt-3">{{ review.titel }}</h3>

                <div class="mt-4 space-y-6 text-base italic text-gray-600">
                  {{ review.beschreibung }}
                </div>
              </div>

              <!-- <div class="mt-4 space-y-6 text-base italic text-gray-600">
                {{ review.beschreibung }}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon, XIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/vue/solid';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

// Vuelidate Imports
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import axios from 'axios';

import { ref, onMounted, computed, reactive } from 'vue';
import { PiniaStore } from '../Store/Store.js';

const store = PiniaStore();

let bewertungen = ref([]);
let stats = ref([]);
let anzahlBewertungen = ref(0);
let durchschnittBewertung = ref(0);

let open = ref(false);
let showError = ref(false);
let showSuccess = ref(false);

// Vuelidate
// Inputs
let variablen = reactive({
  titel: '',
  beschreibung: '',
  rating: null,
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    rating: { required },
    titel: { required },
    beschreibung: { required },
  };
});

const v$ = useValidate(rules, variablen);

// Props definieren
const props = defineProps({
  id: Number,
});

onMounted(() => {
  window.scrollTo(0, 0);
});

// Bewertungen vom Server holen
const { data } = await axios.get(`http://localhost:2410/productBewertung/${props.id}`);
bewertungen.value = data.bewertungen;
stats.value = data.stats;

//Anzahl der Bewertungen berechnen
for (let index = 0; index < stats.value.length; index++) {
  anzahlBewertungen.value += Number(stats.value[index].Sum);
}

// Durchschnitt von allen Bewertungen berechen
durchschnittBewertung.value += Number(stats.value[0].Sum) * 1;
durchschnittBewertung.value += Number(stats.value[1].Sum) * 2;
durchschnittBewertung.value += Number(stats.value[2].Sum) * 3;
durchschnittBewertung.value += Number(stats.value[3].Sum) * 4;
durchschnittBewertung.value += Number(stats.value[4].Sum) * 5;

durchschnittBewertung.value /= 5;
durchschnittBewertung.value = Math.round(durchschnittBewertung.value);

// Aufteilung erstellen
let aufteilung = ref([
  { rating: 5, count: stats.value[0].Sum },
  { rating: 4, count: stats.value[1].Sum },
  { rating: 3, count: stats.value[2].Sum },
  { rating: 2, count: stats.value[3].Sum },
  { rating: 1, count: stats.value[4].Sum },
]);

async function showBewerten(e) {
  e.preventDefault();

  // console.log(props.id, store.getAktivenUser.knd_id);

  try {
    const res = await axios.get(
      `http://localhost:2410/productBewertung/${props.id}?knd_id=${store.getAktivenUser.knd_id}`,
    );
    if (res.status == 200) open.value = true;
  } catch (error) {
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  }

  e.preventDefault();
}

async function submit(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$invalid) {
      const res = await axios.post(`http://localhost:2410/productBewertung/${props.id}`, {
        titel: variablen.titel,
        beschreibung: variablen.beschreibung,
        rating: variablen.rating,
        knd_id: store.getAktivenUser.knd_id,
      });

      if (res.status == 200) {
        showSuccess.value = true;
        open.value = false;
        bewertungen.value.push(res.data);
      }
      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    } else {
      console.log('Fehler');
    }

    e.preventDefault();
  } catch (error) {
    e.preventDefault();
    console.log(error.message);
    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    e.preventDefault();
  }
}
</script>
