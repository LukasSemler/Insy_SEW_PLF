<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto px-3">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="../assets/icons/Logo_klein.png"
              alt="Electronic City"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="../assets/icons/Logo2.png"
              alt="Electronic City"
            />
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <a
              @click="router.push('/')"
              class="border-transparent text-gray-500 hover:border-teal-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Shop
            </a>
            <a
              @click="router.push('/aboutus')"
              class="border-transparent text-gray-500 hover:border-teal-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              About Us
            </a>
            <a
              @click="router.push('/faq')"
              class="border-transparent text-gray-500 hover:border-teal-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              FAQ
            </a>
            <a
              @click="router.push('/contact')"
              class="border-transparent text-gray-500 hover:border-teal-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Contact Us
            </a>
            <a
              v-if="store.getAktivenUser"
              @click="router.push('/shoppingCart')"
              class="border-transparent text-gray-500 hover:border-teal-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Shopping Cart
              <ShoppingCartIcon class="ml-2 w-5 h-5"></ShoppingCartIcon>
            </a>
          </div>
        </div>
        <div class="grow"></div>
        <div class="flex items-center">
          <div v-if="store.getAktivenUser == null" class="flex-shrink-0">
            <button
              @click="anmelden"
              type="button"
              class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <span>Anmelden</span>
            </button>
          </div>
          <div v-else class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="../assets/icons/placeholderProfil.png"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                class="z-40"
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <a
                      @click="router.push('/Account')"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Your Profile</a
                    >
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <a
                      @click="logout"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Sign out</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <DisclosureButton
          as="a"
          @click="router.push('/')"
          class="bg-teal-50 border-teal-500 text-teal-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >Shop</DisclosureButton
        >
        <DisclosureButton
          as="a"
          @click="router.push('/aboutus')"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >About Us</DisclosureButton
        >
        <DisclosureButton
          as="a"
          @click="router.push('/faq')"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >FAQ</DisclosureButton
        >
        <DisclosureButton
          as="a"
          @click="router.push('/contact')"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >Contact Us</DisclosureButton
        >
        <DisclosureButton
          as="a"
          @click="router.push('/shoppingCart')"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >Shopping Cart
        </DisclosureButton>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4 sm:px-6">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="../assets/icons/placeholderProfil.png"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {{ store.getAktivenUser.vorname }} {{ store.getAktivenUser.nachname }}
            </div>
            <div class="text-sm font-medium text-gray-500">{{ store.getAktivenUser.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="a"
            @click="router.push('/Account')"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
            >Your Profile</DisclosureButton
          >
          <DisclosureButton
            @click="logout"
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
//Tailwind Imports
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/vue/outline';

// Vue Imports

// Router imports
import { useRouter } from 'vue-router';

// Store imports
import { PiniaStore } from '../Store/Store.js';
const store = PiniaStore();

const router = useRouter();

function anmelden() {
  router.push('/loginregister');
}

function logout() {
  store.deleteAktivenUser();
  router.push('/');
}
</script>
