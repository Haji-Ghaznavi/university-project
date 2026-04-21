<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-autocomplete
          v-model="payload.customer_id"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-outline"
          label="مشتری"
          :items="customers"
          :loading="loadingCustomer"
          :item-title="e => e.name + ' ' + e.last_name"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-autocomplete
          v-model="payload.product_id"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cart-outline"
          label="محصول"
          :items="products"
          item-title="name"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.quantity"
          type="number"
          prepend-icon="mdi-counter"
          :rules="[requiredValidator]"
          label="تعداد"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.unit"
          :rules="[requiredValidator]"
          prepend-icon="mdi-ruler"
          label="واحد اندازه گیری"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.currency"
          :rules="[requiredValidator]"
          prepend-icon="mdi-currency-usd"
          label="واحد پولی"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.price_per_unit"
          :rules="[requiredValidator]"
          prepend-icon="mdi-currency-usd-circle"
          label="قیمت هر واحد"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const customers = ref([])
const products = ref([])
const loadingCustomer = ref(false)
const loadingProduct = ref(false)



const validate = async () => {
  const val = await formRef.value.validate()
  if (val.valid) {
    return true
  } else {
    return false
  }
}

const fetchCustomers = async () => {
  try {
    loadingCustomer.value = true
    const res = await axios.get('customers')
    customers.value = res.data
    console.log('customers', customers.value)
  } catch (error) {
    console.log('error in fetching customers', error)
  }
  loadingCustomer.value = false
}

const fetchProducts = async () => {
  try {
    loadingProduct.value = true
    const res = await axios.get('products')
    products.value = res.data
  } catch (error) {
    console.log('error in fetching products', error)
  }
  loadingProduct.value = false
}

const onLoad = () => {
  fetchCustomers()
  fetchProducts()
}
defineExpose({
  validate,
  onLoad,
})
</script>
