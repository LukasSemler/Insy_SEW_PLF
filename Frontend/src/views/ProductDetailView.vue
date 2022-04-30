<template>
  <div v-if="!productNeu">Nicht geladen</div>
  <div v-else class="bg-gray-50">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8"
    >
      <!-- Product details -->
      <div class="lg:max-w-lg lg:self-end">
        <div class="mt-4">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ productNeu.titel }}
          </h1>
        </div>

        <section aria-labelledby="information-heading" class="mt-4">
          <h2 id="information-heading" class="sr-only">Product information</h2>

          <div class="flex items-center">
            <p class="text-lg text-gray-900 sm:text-xl">{{ productNeu.preis }}€</p>

            <div class="ml-4 pl-4 border-l border-gray-300">
              <h2 class="sr-only">Reviews</h2>
              <div class="flex items-center">
                <div>
                  <div class="flex items-center">
                    <StarIcon
                      v-for="rating in [0, 1, 2, 3, 4]"
                      :key="rating"
                      :class="[
                        durchschnittBewertung > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                  </div>
                  <p class="sr-only">{{ durchschnittBewertung }} out of 5 stars</p>
                </div>
                <p class="ml-2 text-sm text-gray-500">{{ anzahlBewertungen }} reviews</p>
              </div>
            </div>
          </div>

          <div class="mt-4 space-y-6">
            <p class="text-base text-gray-500">{{ productNeu.beschreibung }}</p>
          </div>

          <div class="mt-6 flex items-center">
            <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
            <p class="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
          </div>
        </section>
      </div>

      <!-- Product image -->
      <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <img
            :src="productNeu.link_thumbnail"
            :alt="productNeu.titel"
            class="w-full h-full object-center object-cover"
          />
        </div>
      </div>

      <!-- Product form -->
      <div class="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
        <section aria-labelledby="options-heading">
          <h2 id="options-heading" class="sr-only">Product options</h2>

          <div class="sm:flex sm:justify-between"></div>
          <div class="mt-10">
            <button
              @click="addToCart(productNeu)"
              class="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
            >
              Add to bag
            </button>
          </div>
          <div class="mt-6 text-center">
            <a href="#" class="group inline-flex text-base font-medium">
              <ShieldCheckIcon
                class="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span class="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
            </a>
          </div>
        </section>
      </div>
    </div>
    <div class="bg-white">
      <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-lg font-medium text-gray-900">Recent reviews</h2>
        <div
          class="mt-6 pb-10 border-t border-b border-gray-200 divide-y divide-gray-200 space-y-10"
        >
          <Suspense>
            <template #default>
              <Comp_Bewertungen :id="productNeu.p_id"></Comp_Bewertungen>
            </template>
            <template #fallback>
              <h1 class="text-center text-3xl">Loading...</h1>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

// Tailwind Imports
import { CheckIcon, StarIcon } from '@heroicons/vue/solid';
import { ShieldCheckIcon } from '@heroicons/vue/outline';

// Component Imports
import Comp_Bewertungen from '../components/Comp_Bewertungen.vue';

// Store imports
import { PiniaStore } from '../Store/Store.js';
const store = PiniaStore();

let productNeu = ref(null);
let bewertungen = ref([]);
let stats = ref([]);
let anzahlBewertungen = ref(0);
let durchschnittBewertung = ref(0);

onMounted(async () => {
  try {
    // Produkt aus dem LS holen
    let product = JSON.parse(localStorage.getItem('productDetail'));
    productNeu.value = product;

    // Bewertungen vom Server holen
    const { data } = await axios.get(
      `http://localhost:2410/productBewertung/${productNeu.value.p_id}`,
    );
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
  } catch (error) {
    console.error(error.message);
  }
});

function addToCart(product) {
  if (!store.getAktivenUser) console.log('nicht angemeldet');
  else {
    try {
      //Warenkorb vom LS holen
      let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'));

      //Produkt in den Warenkorb legen
      warenkorb.push(product);

      //Neuen Warenkorb im LS speichern
      localStorage.setItem('Warenkorb', JSON.stringify(warenkorb));
    } catch (error) {
      console.log(error);

      //Warenkorb mit Produkt erstellen
      let warenkorb = [
        {
          product,
        },
      ];

      //Warenklog im LS speichern
      localStorage.setItem('Warenkorb', JSON.stringify(warenkorb));
    }
  }
}
</script>
