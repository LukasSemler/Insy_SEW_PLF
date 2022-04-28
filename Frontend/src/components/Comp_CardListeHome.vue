<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div
        class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <a
          v-for="product in products"
          :key="product.id"
          :href="product.href"
          class="group"
          @click="productDetail(product)"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.link_thumbnail"
              :alt="product.titel"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ product.titel }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ product.preis }}€</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let products = ref([]);

const { data } = await axios.get('http://localhost:2410/products');
products.value = data;

function productDetail(product) {
  try {
    localStorage.removeItem('productDetail');
    localStorage.setItem('productDetail', JSON.stringify(product));

    router.push('/ProductDetail');
  } catch (error) {
    console.log(error);
    localStorage.setItem('productDetail', JSON.stringify(product));

    router.push('/ProductDetail');
  }
}
</script>
