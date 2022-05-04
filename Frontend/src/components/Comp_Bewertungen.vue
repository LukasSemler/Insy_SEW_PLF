<template>
  <div class="bg-gray-50">
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
            href="#"
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
                  <h4 class="text-sm font-bold text-gray-900">{{ review.vorname }}</h4>
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
                <h3 class="text-sm font-medium text-gray-900">{{ review.title }}</h3>

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
import { StarIcon } from '@heroicons/vue/solid';
import axios from 'axios';

import { ref } from 'vue';

let bewertungen = ref([]);
let stats = ref([]);
let anzahlBewertungen = ref(0);
let durchschnittBewertung = ref(0);

// Props definieren
const props = defineProps({
  id: Number,
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
</script>
