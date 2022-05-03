<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Payment successful
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet
                    labore.
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm"
                @click="$router.push('/account')"
              >
                Go back to dashboard
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- ------------------------------------------------------------------------------ -->

  <div class="bg-white">
    <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Checkout</h2>

      <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <div>
            <h2 class="text-lg font-medium text-gray-900">Contact information</h2>

            <div class="mt-4">
              <label for="email-address" class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <input
                  v-model="state.email"
                  type="email"
                  id="email-address"
                  name="email-address"
                  autocomplete="email"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                <p v-if="v$.email.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                  {{ v$.email.$silentErrors[0].$message }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>

            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label for="first-name" class="block text-sm font-medium text-gray-700"
                  >First name</label
                >
                <div class="mt-1">
                  <input
                    v-model="state.vorname"
                    type="text"
                    id="first-name"
                    name="first-name"
                    autocomplete="given-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.vorname.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.vorname.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div>
                <label for="last-name" class="block text-sm font-medium text-gray-700"
                  >Last name</label
                >
                <div class="mt-1">
                  <input
                    v-model="state.nachname"
                    type="text"
                    id="last-name"
                    name="last-name"
                    autocomplete="family-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.nachname.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.nachname.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                <div class="mt-1">
                  <input
                    v-model="state.company"
                    type="text"
                    name="company"
                    id="company"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.company.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.company.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <div class="mt-1">
                  <input
                    v-model="state.address"
                    type="text"
                    name="address"
                    id="address"
                    autocomplete="street-address"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.address.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.address.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <div class="mt-1">
                  <input
                    v-model="state.stadt"
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.stadt.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.stadt.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div>
                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <div class="mt-1">
                  <select
                    v-model="state.land"
                    id="country"
                    name="country"
                    autocomplete="country-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  >
                    <option>Oesterreich</option>
                    <option>Deutschland</option>
                    <option>Schweiz</option>
                  </select>
                  <p v-if="v$.land.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.land.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div>
                <label for="postal-code" class="block text-sm font-medium text-gray-700"
                  >Postal code</label
                >
                <div class="mt-1">
                  <input
                    v-model="state.plz"
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.plz.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.plz.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <div class="mt-1">
                  <input
                    v-model="state.phone"
                    type="text"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.phone.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.phone.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <RadioGroup v-model="selectedDeliveryMethod">
              <RadioGroupLabel class="text-lg font-medium text-gray-900">
                Delivery method
              </RadioGroupLabel>

              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <RadioGroupOption
                  as="template"
                  v-for="deliveryMethod in deliveryMethods"
                  :key="deliveryMethod.id"
                  :value="deliveryMethod"
                  v-slot="{ checked, active }"
                >
                  <div
                    :class="[
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'ring-2 ring-teal-500' : '',
                      'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
                    ]"
                  >
                    <div class="flex-1 flex">
                      <div class="flex flex-col">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">
                          {{ deliveryMethod.title }}
                        </RadioGroupLabel>
                        <RadioGroupDescription
                          as="span"
                          class="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {{ deliveryMethod.turnaround }}
                        </RadioGroupDescription>
                        <RadioGroupDescription
                          as="span"
                          class="mt-6 text-sm font-medium text-gray-900"
                        >
                          {{ deliveryMethod.price }}
                        </RadioGroupDescription>
                      </div>
                    </div>
                    <CheckCircleIcon
                      v-if="checked"
                      class="h-5 w-5 text-teal-600"
                      aria-hidden="true"
                    />
                    <div
                      :class="[
                        active ? 'border' : 'border-2',
                        checked ? 'border-teal-500' : 'border-transparent',
                        'absolute -inset-px rounded-lg pointer-events-none',
                      ]"
                      aria-hidden="true"
                    />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>

          <!-- Payment -->
          <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">Payment</h2>

            <fieldset class="mt-4">
              <legend class="sr-only">Payment type</legend>

              <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                <div
                  v-for="(paymentMethod, paymentMethodIdx) in paymentMethods"
                  :key="paymentMethod.id"
                  class="flex items-center"
                >
                  <input
                    v-if="paymentMethodIdx === 0"
                    :id="paymentMethod.id"
                    name="payment-type"
                    type="radio"
                    checked=""
                    class="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                  />
                  <input
                    v-else
                    :id="paymentMethod.id"
                    name="payment-type"
                    type="radio"
                    class="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                  />
                  <label
                    :for="paymentMethod.id"
                    class="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {{ paymentMethod.title }}
                  </label>
                </div>
              </div>
            </fieldset>

            <div class="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
              <div class="col-span-4">
                <label for="card-number" class="block text-sm font-medium text-gray-700"
                  >Card number</label
                >
                <div class="mt-1">
                  <input
                    v-model="state.card_number"
                    type="text"
                    id="card-number"
                    name="card-number"
                    autocomplete="cc-number"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p
                    v-if="v$.card_number.$invalid"
                    class="mt-2 text-sm text-red-600"
                    id="email-error"
                  >
                    {{ v$.card_number.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div class="col-span-4">
                <label for="name-on-card" class="block text-sm font-medium text-gray-700"
                  >Name on card</label
                >
                <div class="mt-1">
                  <input
                    v-model="state.name_on_card"
                    type="text"
                    id="name-on-card"
                    name="name-on-card"
                    autocomplete="cc-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p
                    v-if="v$.name_on_card.$invalid"
                    class="mt-2 text-sm text-red-600"
                    id="email-error"
                  >
                    {{ v$.name_on_card.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div class="col-span-3">
                <label for="expiration-date" class="block text-sm font-medium text-gray-700"
                  >Expiration date (MM/YY)</label
                >
                <div class="mt-1">
                  <input
                    v-model="state.expiration_date"
                    type="text"
                    name="expiration-date"
                    id="expiration-date"
                    autocomplete="cc-exp"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p
                    v-if="v$.expiration_date.$invalid"
                    class="mt-2 text-sm text-red-600"
                    id="email-error"
                  >
                    {{ v$.expiration_date.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>

              <div>
                <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                <div class="mt-1">
                  <input
                    v-model="state.cvc"
                    type="text"
                    name="cvc"
                    id="cvc"
                    autocomplete="csc"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  <p v-if="v$.cvc.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ v$.cvc.$silentErrors[0].$message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
          <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

          <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 class="sr-only">Items in your cart</h3>
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="product in checkout" :key="product.p_id" class="flex py-6 px-4 sm:px-6">
                <div class="flex-shrink-0">
                  <img :src="product.link_thumbnail" :alt="product.titel" class="w-20 rounded-md" />
                </div>

                <div class="ml-6 flex-1 flex flex-col">
                  <div class="flex">
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm">
                        <a class="font-medium text-gray-700 hover:text-gray-800">
                          {{ product.titel }}
                        </a>
                      </h4>
                    </div>

                    <div class="ml-4 flex-shrink-0 flow-root">
                      <button
                        type="button"
                        class="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                      ></button>
                    </div>
                  </div>

                  <div class="flex-1 pt-2 flex items-end justify-between">
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ product.preis }}€</p>
                  </div>
                </div>
              </li>
            </ul>
            <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
              <div class="flex items-center justify-between">
                <dt class="text-sm">Subtotal</dt>
                <dd class="text-sm font-medium text-gray-900">{{ subtotal }}€</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm">Shipping</dt>
                <dd class="text-sm font-medium text-gray-900">{{ shipping }}€</dd>
              </div>
              <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt class="text-base font-medium">Total</dt>
                <dd class="text-base font-medium text-gray-900">{{ total }}€</dd>
              </div>
            </dl>

            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <button
                @click="submitCheckout"
                class="w-full bg-teal-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/solid';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/outline';

import { PiniaStore } from '../Store/Store.js';

// Vuelidate Imports
import useValidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';

const store = PiniaStore();

const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '€5.00' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '€16.00' },
];

const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
];

const selectedDeliveryMethod = ref(deliveryMethods[0]);

let checkout = ref([]);
let open = ref(false);
// Vuelidate --------------------------------------------------------------------------

let state = reactive({
  email: '',
  vorname: '',
  nachname: '',
  company: '',
  address: '',
  stadt: '',
  land: 'Deutschland',
  plz: '',
  phone: '',
  card_number: '',
  name_on_card: '',
  expiration_date: '',
  cvc: '',
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    email: { required, email },
    vorname: { required },
    nachname: { required },
    company: {},
    address: { required },
    stadt: { required },
    land: { required },
    plz: { required },
    phone: { required },
    card_number: { required },
    name_on_card: { required },
    expiration_date: { required },
    cvc: { required },
  };
});

const v$ = useValidate(rules, state);

// -----------------------------------------------------------------------------------

async function submitCheckout(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      e.preventDefault();

      console.log('success'); // Object zum senden bauen
      let objSenden = {
        contact_info: state,
        aktiverUser: store.getAktivenUser,
        total: total.value,
        produkte: checkout.value,
      };

      const res = await axios.post('http://localhost:2410/checkout', objSenden);

      if (res.status == 201) {
        //Warenkorb leeren
        checkout.value = [];
        localStorage.removeItem('Warenkorb');
        localStorage.setItem('Warenkorb', JSON.stringify([]));

        //Dialog öffnen
        open.value = true;
      }
    } else {
      e.preventDefault();
      console.log(v$.value.$error);
      console.log('Fehler');
    }

    e.preventDefault();
  } catch (error) {
    e.preventDefault();
    console.log(error.message);
  } finally {
    e.preventDefault();
  }
}

onMounted(() => {
  try {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'));
    console.log(warenkorb);
    checkout.value = warenkorb;
  } catch (error) {
    console.log(error.message);
  }
});

const subtotal = computed(() => {
  let subtotal = 0;
  checkout.value.forEach((product) => {
    subtotal += parseFloat(product.preis);
  });
  return subtotal;
});

const shipping = computed(() => {
  let shipping = 0;
  if (selectedDeliveryMethod.value.id === 1) {
    shipping = 5;
  } else if (selectedDeliveryMethod.value.id === 2) {
    shipping = 16;
  }
  return shipping;
});

const total = computed(() => {
  return subtotal.value + shipping.value;
});
</script>
