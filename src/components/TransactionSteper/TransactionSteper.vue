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
import Step1 from './TransactionStep1.vue'
import Step2 from './TransactionStep2.vue'


const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const secondStep = markRaw(Step2)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ثبت دریافت و پرداخت')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  transaction_type: '',
  amount: null,
  currency: '',
  description: '',
  name: '',
  father_name: '',
  phone_number: '',
  address: '',
  payment_reason:null
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
      const res = await axios.put('credits-and-debets/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('credits-and-debets', payload.value)
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
  steperTitle.value = 'ویرایش دریافت و پرداخت'
  payload.value.id = record.id
  payload.value.transaction_type = record.transaction_type
  payload.value.amount = record.amount
  payload.value.currency = record.currency
  payload.value.description = record.description
  payload.value.name = record.name
  payload.value.father_name = record.father_name
  payload.value.phone_number = record.phone_number
  payload.value.address = record.address
  payload.value.payment_reason = record.payment_reason
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
