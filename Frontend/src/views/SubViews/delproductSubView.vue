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
            <h1 class="text-center text-3xl mt-3">Delete a product</h1>
            <Suspense>
              <template #default><CompCardListDeleteChange color="bg-red-500" colorHover="hover:bg-red-600" textButton="Delete" status="delete"></CompCardListDeleteChange></template>
              <template #fallback><h1 class="text-center text-3xl">Loading...</h1></template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
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
} from '@heroicons/vue/outline';
import { computed } from 'vue';
import { PiniaStore } from '../../Store/store.js';
import CompCardListDeleteChange from '../../components/CompCardListDeleteChange.vue';

const store = PiniaStore();

const router = useRouter();

const subNavFilter = computed(() => {
  let admin = [
    { name: 'Übersicht', href: '#', icon: UserCircleIcon, current: false, link: '/account' },
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
      current: true,
      link: '/account/delProduct',
    },
  ];
  let user = [
    { name: 'Übersicht', href: '#', icon: UserCircleIcon, current: true, link: '/account' },
    { name: 'Account', href: '#', icon: CogIcon, current: false, link: '/account/account' },
    { name: 'Password', href: '#', icon: KeyIcon, current: false, link: '/account/password' },
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
</script>
