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
                <p class="text-sm font-medium text-gray-900">Successfully deleted</p>
                <p class="mt-1 text-sm text-gray-500">You successfully deleted the product</p>
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

  <!-- Main content -->
  <ul
    role="list"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3 mt-4"
  >
    <li
      v-for="product in products"
      :key="product.p_id"
      class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div class="flex-1 flex flex-col p-8">
        <img
          crossorigin="anonymous"
          class="w-full h-full object-center object-cover"
          :src="product.link_thumbnail"
          alt=""
        />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ product.name }}</h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Title</dt>
          <dd class="text-gray-500 text-sm truncate">{{ product.titel }}</dd>
          <dt class="sr-only">Preis</dt>
          <dd class="text-gray-500 text-sm">{{ product.preis }}€</dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex">
          <div class="w-0 flex-1 flex justify-center">
            <!-- <a
              class="bg-red-500 relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-black font-medium border border-transparent rounded-bl-lg hover:text-white"
            >
              <TrashIcon class="w-5 h-5 text-black" aria-hidden="true" />
              <span class="ml-3">Delete</span>
            </a> -->
            <button
              @click="deleteProduct(product)"
              :class="`my-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white ${color} ${colorHover} `"
            >
              {{ textButton }}
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { CheckCircleIcon, XIcon } from '@heroicons/vue/outline';
import axios from 'axios';
import { ref } from 'vue';
import router from '../../../Backend/Router/routes';

const props = defineProps({
  color: String,
  textButton: String,
  colorHover: String,
  status: String,
});

let products = ref([]);
let show = ref(false);

const { data } = await axios.get('http://localhost:2410/products');
products.value = data;

async function deleteProduct(product) {
  try {
    // Schauen ob der Status Delete ist
    if (props.status == 'delete') {
      const res = await axios.delete(`http://localhost:2410/product/${product.p_id}`);
      if (res.status == 200) {
        products.value = products.value.filter((p) => p.p_id !== product.p_id);
        show.value = true;

        setTimeout(() => {
          show.value = false;
        }, 5000);
      }
    } else {
      console.log('Change a Product');
      router.push('/account/changeproductForm');
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
