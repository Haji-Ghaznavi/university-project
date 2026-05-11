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
import Step1 from './RawMaterialStep1.vue'
import step2 from './RawMaterialStep2.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const secondStep = markRaw(step2)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد مواد خام')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  name: '',
  quantity: null,
  unit: '',
  price_per_unit: null,
  currency: '',
  bill_number: '',
  buyer_name: '',
  sealer_name: '',
  sealer_phone_number: '',
  company_name: '',
  date: '',
  description: '',
  currency_price_in_afg: null,
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
      const res = await axios.put('raw-materials/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('raw-materials', payload.value)
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
  steperTitle.value = ' ویرایش مواد خام'
  payload.value.id = record.id
  payload.value.name = record.name
  payload.value.quantity = record.quantity
  payload.value.unit = record.unit
  payload.value.price_per_unit = record.price_per_unit
  payload.value.currency = record.currency
  payload.value.bill_number = record.bill_number
  payload.value.buyer_name = record.buyer_name
  payload.value.sealer_name = record.sealer_name
  payload.value.sealer_phone_number = record.sealer_phone_number
  payload.value.company_name = record.company_name
  payload.value.date = record.date
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
