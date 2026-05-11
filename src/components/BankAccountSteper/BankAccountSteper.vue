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
import Step1 from './BankAccountStep1.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد حساب بانکی')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  user_name: '',
  bank_name: '',
  account_number: '',
  currency: '',
  amount: '',
  produced_date: '',
  expired_date: '',
  taken_amount: '',
  taken_date: '',
  added_amount: '',
  added_date: '',
})

const payload = ref(defaultPayload())

const steps = ref([
  {
    component: firstStep,
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
      const res = await axios.put('bank-accounts/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('bank-accounts', payload.value)
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
  steperTitle.value = 'ویرایش نمودن حساب بانکی '
  payload.value.id = record.id
  payload.value.user_name = record.user_name
  payload.value.bank_name = record.bank_name
  payload.value.account_number = record.account_number
  payload.value.currency = record.currency
  payload.value.amount = record.amount
  payload.value.produced_date = record.produced_date
  payload.value.expired_date = record.expired_date
  payload.value.taken_amount = record.taken_amount
  payload.value.taken_date = record.taken_date
  payload.value.added_amount = record.added_amount
  payload.value.added_date = record.added_date
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
