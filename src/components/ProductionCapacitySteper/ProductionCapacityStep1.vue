<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-autocomplete
          v-model="payload.product_id"
          :rules="[requiredValidator]"
          :loading="loadingProduct"
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
          v-model="payload.amount"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-outline"
          label="مقدار"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
         <v-select
          v-model="payload.unit"
          :rules="[requiredValidator]"
          :items="units"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-lock-outline"
          label="واحد"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="تاریخ"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.description"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="توضیحات"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { onMounted, ref } from 'vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const products = ref([])
const loadingProduct = ref(false)
const units = ref([
  {
    id: 'کیلوگرم',
    name: 'کیلوگرم',
  },
  {
    id: 'لیتر',
    name: 'لیتر',
  },
  {
    id: 'متر',
    name: 'متر',
  },
  {
    id: 'تن',
    name: 'تن',
  },
  {
    id: 'بسته',
    name: 'بسته',
  },
  {
    id: 'عدد',
    name: 'عدد',
  },
])

const validate = async () => {
  const val = await formRef.value.validate()
  if (val.valid) {
    return true
  } else {
    return false
  }
}

const fetchProducts = async () => {
  try {
    loadingProduct.value = true
    const res = await axios.get('products/list')
    products.value = res.data
  } catch (error) {
    console.log('error in fetching products', error)
  }
  loadingProduct.value = false
}

const onLoad = () => {}
defineExpose({
  validate,
  onLoad,
})

onMounted(() => {
  fetchProducts()
})
</script>
