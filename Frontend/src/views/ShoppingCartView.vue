<template>
  <div class="bg-white" v-if="productsNeu.length > 0">
    <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
            <li v-for="product in productsNeu" :key="product.id" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img
                  :src="product.link_thumbnail"
                  :alt="product.titel"
                  class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
              </div>

              <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a class="font-medium text-gray-700 hover:text-gray-800">
                          {{ product.titel }}
                        </a>
                      </h3>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ product.preis }}€</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <div class="absolute top-0 right-0">
                      <button
                        type="button"
                        class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <XIcon class="h-5 w-5" aria-hidden="true" @click="removeProduct(product)" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- <p class="mt-4 flex text-sm text-gray-700 space-x-2">
                  <CheckIcon
                    v-if="product.inStock"
                    class="flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                  <ClockIcon
                    v-else
                    class="flex-shrink-0 h-5 w-5 text-gray-300"
                    aria-hidden="true"
                  />
                  <span>{{ product.inStock ? 'In stock' : `Ships in ${product.leadTime}` }}</span>
                </p> -->
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">{{ subTotal }}€</dd>
            </div>
            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping</span>
              </dt>
              <dd class="text-sm font-medium text-gray-900">8.00€</dd>
            </div>
            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">{{ subTotal + 5 }}€</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
             @click="router.push('/checkout')"
              class="w-full bg-teal-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
  <div v-else>
    <div class="text-center mt-12">
      <EmojiSadIcon class="mx-auto h-12 w-12 text-gray-900"></EmojiSadIcon>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No products</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by adding one to your basket</p>
      <div class="mt-6">
        <button
          @click="router.push('/')"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Shop products
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon, PlusIcon, EmojiSadIcon } from '@heroicons/vue/solid';
import { ref, onMounted, computed } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();

let productsNeu = ref([]);

onMounted(() => {
  try {
    //Warenkorb aus dem LS holen
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'));
    console.log('warenkorb', warenkorb);
    productsNeu.value = warenkorb;

    console.log(productsNeu.value);
  } catch (e) {
    console.error(e.message);
  }
});

function removeProduct(product) {
  console.log('removeProduct', product);
  productsNeu.value = productsNeu.value.filter((p) => p.p_id != product.p_id);
  localStorage.setItem('Warenkorb', JSON.stringify(productsNeu.value));
}

let subTotal = computed(() => {
  let sum = 0;
  productsNeu.value.forEach((product) => {
    sum += Number(product.preis);
  });
  return sum;
});
</script>
