<template>
  <v-dialog
    v-model="showDialog"
    persistent
    transition="dialog-top-transition"
  >
    <Steper
      :steps="steps"
      @onClose="closeDialog"
      @onSubmit="submit"
      :onDone="onDone"
      :loading="loading"
      :steperTitle="steperTitle"
    ></Steper>
  </v-dialog>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { markRaw, ref } from 'vue'
import DoneStep from '../commons/DoneStep.vue'
import Steper from '../commons/Steper.vue'
import Step1 from './ProductSalesStep1.vue'
import Step2 from './ProductSalesStep2.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const secondStep = markRaw(Step2)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد فروش محصول')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  customer_id: null,
  product_id: null,
  quantity: null,
  unit: '',
  currency: '',
  price_per_unit: null,
  currency_price_in_afg: null,
  date: '',
  shop_name: '',
  paid_amount: null,
  description: '',
})

const payload = ref(defaultPayload())

const steps = ref([
  {
    component: firstStep,
    payload,
  },
  {
    component: secondStep,
    payload,
  },
  {
    component: doneStep,
  },
])

const showDialog = ref(false)

const submit = async () => {
  try {
    loading.value = true
    if (payload.value.id) {
      const res = await axios.put('product-sales/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('product-sales', payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    }
    emit('fetchRecord')
  } catch (error) {
    console.log('error while submiting the form', error)
  }
  loading.value = false
}

const openDialog = () => {
  showDialog.value = true
}

const openEditDialog = record => {
  showDialog.value = true
  steperTitle.value = 'ویرایش فروش محصول'
  payload.value.id = record.id
  payload.value.customer_id = record.customer_id
  payload.value.product_id = record.product_id
  payload.value.quantity = record.quantity
  payload.value.unit = record.unit
  payload.value.currency = record.currency
  payload.value.price_per_unit = record.price_per_unit
  payload.value.date = record.date
  payload.value.shop_name = record.shop_name
  payload.value.paid_amount = record.paid_amount
  payload.value.description = record.description
  payload.value.currency_price_in_afg = record.currency_price_in_afg
}

const closeDialog = () => {
  showDialog.value = false
  loading.value = false
  payload.value = defaultPayload()
  onDone.value = false
}

defineExpose({
  openDialog,
  openEditDialog,
})
</script>
