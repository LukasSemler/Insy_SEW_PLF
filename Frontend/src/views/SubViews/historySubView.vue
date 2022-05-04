<template>
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
            <div class="py-16 sm:py-24">
              <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
                <div class="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                  <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Order history
                  </h1>
                  <p class="mt-2 text-sm text-gray-500">
                    Check the status of recent orders, manage returns, and discover similar
                    products.
                  </p>
                </div>
              </div>

              <div class="mt-16" v-if="formatiert.length > 0">
                <h2 class="sr-only">Recent orders</h2>
                <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
                  <div class="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                    <div
                      v-for="(order, i) in formatiert"
                      :key="i"
                      class="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                    >
                      <h3 class="sr-only">
                        Order placed on
                        <time :datetime="order.bestelldatum">{{ order.bestelldatum }}</time>
                      </h3>

                      <div
                        class="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6"
                      >
                        <dl
                          class="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2"
                        >
                          <div>
                            <dt class="font-medium text-gray-900">Order number</dt>
                            <dd class="mt-1 text-gray-500">
                              {{ order.bs_id }}
                            </dd>
                          </div>
                          <div class="hidden sm:block">
                            <dt class="font-medium text-gray-900">Date placed</dt>
                            <dd class="mt-1 text-gray-500">
                              <time :datetime="order.bestelldatum">{{ order.bestelldatum }}</time>
                            </dd>
                          </div>
                          <div>
                            <dt class="font-medium text-gray-900">Total amount</dt>
                            <dd class="mt-1 font-medium text-gray-900">
                              {{ order.bestell_summe }}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <!-- Products -->
                      <h4 class="sr-only">Items</h4>
                      <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="product in order.produkte" :key="product.id" class="p-4 sm:p-6">
                          <div class="flex items-center sm:items-start">
                            <div
                              class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40"
                            >
                              <img
                              crossorigin="anonymous"
                                :src="product.link_thumbnail"
                                :alt="product.title"
                                class="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div class="flex-1 ml-6 text-sm">
                              <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>
                                  {{ product.title }}
                                </h5>
                                <p class="mt-2 sm:mt-0">
                                  {{ product.preis }}
                                </p>
                              </div>
                              <p class="hidden text-gray-500 sm:block sm:mt-2">
                                {{ product.beschreibung }}
                              </p>
                            </div>
                          </div>

                          <div class="mt-6 sm:flex sm:justify-between">
                            <div class="flex items-center">
                              <CheckCircleIcon class="w-5 h-5 text-green-500" aria-hidden="true" />
                              <p class="ml-2 text-sm font-medium text-gray-500">Delivered</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <h1>Leider noch keine Bestellungen vorhanden</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';
import {
  CogIcon,
  KeyIcon,
  UserCircleIcon,
  ReplyIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/vue/outline';

import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import { PiniaStore } from '../../Store/store.js';
const store = PiniaStore();

const router = useRouter();

const subNavFilter = computed(() => {
  let admin = [
    { name: 'Übersicht', href: '#', icon: UserCircleIcon, current: true, link: '/account' },
    {
      name: 'Add Product',
      href: '#',
      icon: PlusCircleIcon,
      current: false,
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
    { name: 'Übersicht', href: '#', icon: UserCircleIcon, current: false, link: '/account' },
    { name: 'Account', href: '#', icon: CogIcon, current: false, link: '/account/account' },
    { name: 'Password', href: '#', icon: KeyIcon, current: false, link: '/account/password' },
    {
      name: 'Bestell-Historie',
      href: '#',
      icon: ReplyIcon,
      current: true,
      link: '/account/history',
    },
  ];

  if (store.getAktivenUser.isAdmin == true) {
    return admin;
  } else return user;
});

let alleBestellungen = ref([]);

onMounted(async () => {
  const { data } = await axios.get(`http://localhost:2410/orders/${store.getAktivenUser.knd_id}`);
  console.log('data', data);

  alleBestellungen.value = data;
});

const formatiert = computed(() => {
  let copy = alleBestellungen.value;
  for (const iterator of copy) {
    console.log('iterator', iterator);
    //datum neu formatieren
    let datum = iterator.bestelldatum;
    let data = new Date(datum);

    let neuesDatum = `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}`;
    console.log(neuesDatum);
    iterator.bestelldatum = neuesDatum;
  }

  return copy;
});

console.log(formatiert.value);
</script>
