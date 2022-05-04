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
            <div v-if="store.getAktivenUser.isAdmin" class="mx-3 mt-3">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
              <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div
                  v-for="item in stats"
                  :key="item.name"
                  class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                >
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    {{ item.name }}
                  </dt>
                  <dd class="mt-1 text-3xl font-semibold text-gray-900">
                    {{ item.stat }}
                  </dd>
                </div>
              </dl>
            </div>
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

const store = PiniaStore();

const router = useRouter();

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
];

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
